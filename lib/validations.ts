import { z } from "zod";

import {
  proAffiliations,
  releaseVersions,
  serviceOptions,
  type IntakeSubmission,
  type ValidationResult,
} from "@/lib/types";
import { clamp, isFutureDate, isLikelyUrl, sumSplits, uniqueValues } from "@/lib/utils";

const requiredString = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required.`);

const nonNegativeNumber = (label: string) =>
  z.coerce.number().min(0, `${label} must be 0 or greater.`);

export const intakeSubmissionSchema = z
  .object({
    artistName: requiredString("Artist Name"),
    email: z.string().trim().email("Enter a valid email address."),
    phone: requiredString("Phone"),
    proAffiliation: z.enum(proAffiliations),
    proIpiNumber: z.string().trim(),
    songTitle: requiredString("Song Title"),
    primaryArtist: requiredString("Primary Artist"),
    featuredArtists: z.string().trim(),
    producers: requiredString("Producers"),
    genre: requiredString("Genre"),
    releaseVersion: z.enum(releaseVersions),
    totalWriters: nonNegativeNumber("Total Writers").int(),
    artistSplit: z.coerce.number().min(0).max(100),
    producerSplit: z.coerce.number().min(0).max(100),
    otherWritersSplit: z.coerce.number().min(0).max(100),
    wavFileUrl: requiredString("WAV file URL or placeholder"),
    coverArtUrl: requiredString("Cover art URL or placeholder"),
    lyrics: z.string().trim(),
    distributor: requiredString("Distributor"),
    requestedReleaseDate: requiredString("Requested Release Date"),
    servicesNeeded: z
      .array(z.enum(serviceOptions))
      .min(1, "Select at least one service."),
    rightsConfirmed: z
      .boolean()
      .refine((value) => value, {
        message: "You must confirm ownership or control of the rights.",
      }),
  })
  .superRefine((payload, context) => {
    const splitTotal = sumSplits(
      payload.artistSplit,
      payload.producerSplit,
      payload.otherWritersSplit,
    );

    if (splitTotal !== 100) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["artistSplit"],
        message: "Artist, producer, and other writer splits must equal 100%.",
      });
    }

    if (payload.proAffiliation !== "None" && !payload.proIpiNumber.trim()) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["proIpiNumber"],
        message: "PRO IPI Number is required when a PRO affiliation is selected.",
      });
    }
  });

export const intakeDraftSchema = z.object({
  artistName: z.string().trim().optional(),
  email: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  proAffiliation: z.enum(proAffiliations).optional(),
  proIpiNumber: z.string().trim().optional(),
  songTitle: z.string().trim().optional(),
  primaryArtist: z.string().trim().optional(),
  featuredArtists: z.string().trim().optional(),
  producers: z.string().trim().optional(),
  genre: z.string().trim().optional(),
  releaseVersion: z.enum(releaseVersions).optional(),
  totalWriters: z.coerce.number().optional(),
  artistSplit: z.coerce.number().optional(),
  producerSplit: z.coerce.number().optional(),
  otherWritersSplit: z.coerce.number().optional(),
  wavFileUrl: z.string().trim().optional(),
  coverArtUrl: z.string().trim().optional(),
  lyrics: z.string().trim().optional(),
  distributor: z.string().trim().optional(),
  requestedReleaseDate: z.string().trim().optional(),
  servicesNeeded: z.array(z.enum(serviceOptions)).optional(),
  rightsConfirmed: z.boolean().optional(),
});

export function getSplitTotal(payload: Partial<IntakeSubmission>) {
  return sumSplits(
    Number(payload.artistSplit ?? 0),
    Number(payload.producerSplit ?? 0),
    Number(payload.otherWritersSplit ?? 0),
  );
}

export function buildRulesValidation(
  payload: Partial<IntakeSubmission>,
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const recommendations: string[] = [];

  const requiredFields: Array<[keyof IntakeSubmission, string]> = [
    ["artistName", "Artist name is missing."],
    ["email", "Email is missing or invalid."],
    ["phone", "Phone number is missing."],
    ["songTitle", "Song title is missing."],
    ["primaryArtist", "Primary artist is missing."],
    ["producers", "Producer credits are missing."],
    ["genre", "Genre is missing."],
    ["wavFileUrl", "A WAV file link or placeholder is required."],
    ["coverArtUrl", "A cover art link or placeholder is required."],
    ["distributor", "Distributor is missing."],
    ["requestedReleaseDate", "Requested release date is missing."],
  ];

  requiredFields.forEach(([field, message]) => {
    const value = payload[field];
    if (typeof value !== "string" || !value.trim()) {
      errors.push(message);
    }
  });

  if (!payload.servicesNeeded?.length) {
    errors.push("At least one service must be selected.");
  }

  if (!payload.rightsConfirmed) {
    errors.push("Rights ownership confirmation has not been accepted.");
  }

  if (
    payload.proAffiliation &&
    payload.proAffiliation !== "None" &&
    !payload.proIpiNumber?.trim()
  ) {
    errors.push("PRO IPI Number is required when a PRO affiliation is selected.");
  }

  const splitTotal = getSplitTotal(payload);
  const hasAnySplit = [
    payload.artistSplit,
    payload.producerSplit,
    payload.otherWritersSplit,
  ].some((value) => value !== undefined && value !== null && `${value}` !== "");

  if (hasAnySplit && splitTotal !== 100) {
    errors.push("Split percentages must total exactly 100%.");
  }

  if (payload.totalWriters !== undefined && Number(payload.totalWriters) <= 0) {
    warnings.push("Total writers should be greater than zero.");
  }

  if (payload.requestedReleaseDate && !isFutureDate(payload.requestedReleaseDate)) {
    warnings.push(
      "Requested release date is in the past or too close for a safe admin setup window.",
    );
  }

  if (payload.wavFileUrl && !isLikelyUrl(payload.wavFileUrl)) {
    warnings.push("WAV field looks like a placeholder. Replace it with a final asset URL.");
  }

  if (payload.coverArtUrl && !isLikelyUrl(payload.coverArtUrl)) {
    warnings.push(
      "Cover art field looks like a placeholder. Replace it with a final artwork URL.",
    );
  }

  if (payload.featuredArtists && !payload.featuredArtists.includes(",")) {
    recommendations.push(
      "Format featured artists as a comma-separated list so credits are easier to verify.",
    );
  }

  if (payload.producers && !payload.producers.includes(",")) {
    recommendations.push(
      "List multiple producers with commas for cleaner metadata handling.",
    );
  }

  if (!payload.lyrics?.trim()) {
    recommendations.push(
      "Add lyrics if available so downstream admin and monetization checks are more complete.",
    );
  }

  if (
    payload.servicesNeeded?.includes("Full Admin") &&
    !payload.servicesNeeded.includes("Publishing Registration")
  ) {
    recommendations.push(
      "Full Admin usually benefits from including Publishing Registration in scope.",
    );
  }

  const scorePenalty =
    errors.length * 18 + warnings.length * 8 + recommendations.length * 4;

  return {
    readiness_score: clamp(98 - scorePenalty, 12, 98),
    errors: uniqueValues(errors),
    warnings: uniqueValues(warnings),
    recommendations: uniqueValues(recommendations),
    mode: "rules-only",
  };
}

export function flattenFieldErrors(error: z.ZodError) {
  const flattened = error.flatten().fieldErrors as Record<string, string[] | undefined>;

  return Object.fromEntries(
    Object.entries(flattened).map(([key, value]) => [key, value?.filter(Boolean)]),
  );
}
