"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Surface } from "@/components/ui/surface";
import {
  proAffiliations,
  releaseVersions,
  serviceOptions,
  type IntakeRouteResponse,
  type IntakeSubmission,
  type ServiceOption,
  type ValidationResult,
  type ValidationRouteResponse,
} from "@/lib/types";

type FormState = {
  artistName: string;
  email: string;
  phone: string;
  proAffiliation: IntakeSubmission["proAffiliation"];
  proIpiNumber: string;
  songTitle: string;
  primaryArtist: string;
  featuredArtists: string;
  producers: string;
  genre: string;
  releaseVersion: IntakeSubmission["releaseVersion"];
  totalWriters: string;
  artistSplit: string;
  producerSplit: string;
  otherWritersSplit: string;
  wavFileUrl: string;
  coverArtUrl: string;
  lyrics: string;
  distributor: string;
  requestedReleaseDate: string;
  servicesNeeded: ServiceOption[];
  rightsConfirmed: boolean;
};

const initialFormState: FormState = {
  artistName: "",
  email: "",
  phone: "",
  proAffiliation: "BMI",
  proIpiNumber: "",
  songTitle: "",
  primaryArtist: "",
  featuredArtists: "",
  producers: "",
  genre: "",
  releaseVersion: "Explicit",
  totalWriters: "",
  artistSplit: "",
  producerSplit: "",
  otherWritersSplit: "",
  wavFileUrl: "",
  coverArtUrl: "",
  lyrics: "",
  distributor: "",
  requestedReleaseDate: "",
  servicesNeeded: [],
  rightsConfirmed: false,
};

function toPayload(form: FormState): Partial<IntakeSubmission> {
  return {
    artistName: form.artistName.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    proAffiliation: form.proAffiliation,
    proIpiNumber: form.proIpiNumber.trim(),
    songTitle: form.songTitle.trim(),
    primaryArtist: form.primaryArtist.trim(),
    featuredArtists: form.featuredArtists.trim(),
    producers: form.producers.trim(),
    genre: form.genre.trim(),
    releaseVersion: form.releaseVersion,
    totalWriters: form.totalWriters ? Number(form.totalWriters) : undefined,
    artistSplit: form.artistSplit ? Number(form.artistSplit) : undefined,
    producerSplit: form.producerSplit ? Number(form.producerSplit) : undefined,
    otherWritersSplit: form.otherWritersSplit
      ? Number(form.otherWritersSplit)
      : undefined,
    wavFileUrl: form.wavFileUrl.trim(),
    coverArtUrl: form.coverArtUrl.trim(),
    lyrics: form.lyrics.trim(),
    distributor: form.distributor.trim(),
    requestedReleaseDate: form.requestedReleaseDate,
    servicesNeeded: form.servicesNeeded,
    rightsConfirmed: form.rightsConfirmed,
  };
}

function FormField({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="form-field" htmlFor={htmlFor}>
      <span>{label}</span>
      {children}
      {error ? <small className="field-error">{error}</small> : null}
    </label>
  );
}

function ValidationPanel({
  result,
  onValidate,
  isPending,
  helperMessage,
}: {
  result: ValidationResult | null;
  onValidate: () => void;
  isPending: boolean;
  helperMessage: string;
}) {
  return (
    <Surface className="validation-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">AI Assistant</p>
          <h2>Validate My Submission</h2>
        </div>
        {result ? (
          <Badge tone={result.mode === "ai-enhanced" ? "emerald" : "slate"}>
            {result.mode === "ai-enhanced" ? "AI + rules" : "Rules only"}
          </Badge>
        ) : null}
      </div>

      <p className="section-copy">
        Review missing information, metadata risks, and release readiness before
        you submit.
      </p>

      <Button type="button" onClick={onValidate} disabled={isPending}>
        {isPending ? "Reviewing..." : "Validate My Submission"}
      </Button>

      <p className="validation-helper" aria-live="polite">
        {helperMessage}
      </p>

      {result ? (
        <div className="validation-results">
          <div className="readiness-card">
            <span>Readiness score</span>
            <strong>{result.readiness_score}</strong>
          </div>

          <div className="validation-column">
            <strong>Errors</strong>
            {result.errors.length ? (
              <ul className="check-list compact">
                {result.errors.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="empty-copy">No blocking errors flagged.</p>
            )}
          </div>

          <div className="validation-column">
            <strong>Warnings</strong>
            {result.warnings.length ? (
              <ul className="check-list compact">
                {result.warnings.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="empty-copy">No warning signals flagged.</p>
            )}
          </div>

          <div className="validation-column">
            <strong>Recommendations</strong>
            {result.recommendations.length ? (
              <ul className="check-list compact">
                {result.recommendations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="empty-copy">No extra recommendations right now.</p>
            )}
          </div>
        </div>
      ) : null}
    </Surface>
  );
}

export function IntakeForm() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[] | undefined>>({});
  const [statusMessage, setStatusMessage] = useState("");
  const [statusTone, setStatusTone] = useState<"success" | "error" | "neutral">(
    "neutral",
  );
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [validationMessage, setValidationMessage] = useState(
    "Run a preflight check before you submit.",
  );
  const [isSubmitting, startSubmitTransition] = useTransition();
  const [isValidating, startValidateTransition] = useTransition();

  const splitTotal =
    Number(form.artistSplit || 0) +
    Number(form.producerSplit || 0) +
    Number(form.otherWritersSplit || 0);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const target = event.target;
    const { name, value } = target;

    setForm((current) => ({
      ...current,
      [name]:
        target instanceof HTMLInputElement && target.type === "checkbox"
          ? target.checked
          : value,
    }));
  };

  const handleServiceToggle = (service: ServiceOption) => {
    setForm((current) => {
      const nextServices = current.servicesNeeded.includes(service)
        ? current.servicesNeeded.filter((item) => item !== service)
        : [...current.servicesNeeded, service];

      return {
        ...current,
        servicesNeeded: nextServices,
      };
    });
  };

  const handleValidate = () => {
    startValidateTransition(async () => {
      setValidationMessage("Reviewing your current intake...");

      const response = await fetch("/api/validate-intake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(toPayload(form)),
      });

      const payload = (await response.json()) as ValidationRouteResponse;

      if (!payload.ok) {
        setValidationMessage(payload.error);
        setStatusTone("error");
        return;
      }

      setValidationResult(payload.data);
      setValidationMessage(
        payload.message ??
          "Validation complete. Review the assistant notes before submitting.",
      );
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startSubmitTransition(async () => {
      setStatusMessage("Submitting your intake...");
      setStatusTone("neutral");
      setFieldErrors({});

      const response = await fetch("/api/intake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(toPayload(form)),
      });

      const payload = (await response.json()) as IntakeRouteResponse;

      if (!payload.ok) {
        setStatusMessage(payload.error);
        setStatusTone("error");
        setFieldErrors(payload.fieldErrors ?? {});
        return;
      }

      setForm(initialFormState);
      setFieldErrors({});
      setValidationResult(null);
      setValidationMessage("Run a preflight check before you submit.");
      setStatusMessage(payload.message);
      setStatusTone("success");
    });
  };

  const getError = (field: keyof FormState) => fieldErrors[field]?.[0];

  return (
    <div className="intake-layout">
      <form className="intake-form" onSubmit={handleSubmit}>
        <Surface>
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Section 1</p>
              <h2>Artist Info</h2>
            </div>
          </div>

          <div className="form-grid">
            <FormField label="Artist Name" htmlFor="artistName" error={getError("artistName")}>
              <input
                id="artistName"
                name="artistName"
                value={form.artistName}
                onChange={handleInputChange}
              />
            </FormField>

            <FormField label="Email" htmlFor="email" error={getError("email")}>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleInputChange}
              />
            </FormField>

            <FormField label="Phone" htmlFor="phone" error={getError("phone")}>
              <input
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleInputChange}
              />
            </FormField>

            <FormField
              label="PRO Affiliation"
              htmlFor="proAffiliation"
              error={getError("proAffiliation")}
            >
              <select
                id="proAffiliation"
                name="proAffiliation"
                value={form.proAffiliation}
                onChange={handleInputChange}
              >
                {proAffiliations.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField
              label="PRO IPI Number"
              htmlFor="proIpiNumber"
              error={getError("proIpiNumber")}
            >
              <input
                id="proIpiNumber"
                name="proIpiNumber"
                value={form.proIpiNumber}
                onChange={handleInputChange}
              />
            </FormField>
          </div>
        </Surface>

        <Surface>
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Section 2</p>
              <h2>Release Info</h2>
            </div>
          </div>

          <div className="form-grid">
            <FormField label="Song Title" htmlFor="songTitle" error={getError("songTitle")}>
              <input
                id="songTitle"
                name="songTitle"
                value={form.songTitle}
                onChange={handleInputChange}
              />
            </FormField>

            <FormField
              label="Primary Artist"
              htmlFor="primaryArtist"
              error={getError("primaryArtist")}
            >
              <input
                id="primaryArtist"
                name="primaryArtist"
                value={form.primaryArtist}
                onChange={handleInputChange}
              />
            </FormField>

            <FormField
              label="Featured Artists"
              htmlFor="featuredArtists"
              error={getError("featuredArtists")}
            >
              <input
                id="featuredArtists"
                name="featuredArtists"
                placeholder="Comma separated if multiple"
                value={form.featuredArtists}
                onChange={handleInputChange}
              />
            </FormField>

            <FormField label="Producers" htmlFor="producers" error={getError("producers")}>
              <input
                id="producers"
                name="producers"
                placeholder="Comma separated if multiple"
                value={form.producers}
                onChange={handleInputChange}
              />
            </FormField>

            <FormField label="Genre" htmlFor="genre" error={getError("genre")}>
              <input
                id="genre"
                name="genre"
                value={form.genre}
                onChange={handleInputChange}
              />
            </FormField>

            <FormField
              label="Explicit or Clean"
              htmlFor="releaseVersion"
              error={getError("releaseVersion")}
            >
              <select
                id="releaseVersion"
                name="releaseVersion"
                value={form.releaseVersion}
                onChange={handleInputChange}
              >
                {releaseVersions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </FormField>
          </div>
        </Surface>

        <Surface>
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Section 3</p>
              <h2>Rights and Splits</h2>
            </div>
            <Badge tone={splitTotal === 100 ? "emerald" : "gold"}>
              Split total: {splitTotal}%
            </Badge>
          </div>

          <div className="form-grid">
            <FormField
              label="Total Writers"
              htmlFor="totalWriters"
              error={getError("totalWriters")}
            >
              <input
                id="totalWriters"
                name="totalWriters"
                type="number"
                min="0"
                value={form.totalWriters}
                onChange={handleInputChange}
              />
            </FormField>

            <FormField
              label="Artist Split %"
              htmlFor="artistSplit"
              error={getError("artistSplit")}
            >
              <input
                id="artistSplit"
                name="artistSplit"
                type="number"
                min="0"
                max="100"
                value={form.artistSplit}
                onChange={handleInputChange}
              />
            </FormField>

            <FormField
              label="Producer Split %"
              htmlFor="producerSplit"
              error={getError("producerSplit")}
            >
              <input
                id="producerSplit"
                name="producerSplit"
                type="number"
                min="0"
                max="100"
                value={form.producerSplit}
                onChange={handleInputChange}
              />
            </FormField>

            <FormField
              label="Other Writers %"
              htmlFor="otherWritersSplit"
              error={getError("otherWritersSplit")}
            >
              <input
                id="otherWritersSplit"
                name="otherWritersSplit"
                type="number"
                min="0"
                max="100"
                value={form.otherWritersSplit}
                onChange={handleInputChange}
              />
            </FormField>
          </div>
        </Surface>

        <Surface>
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Section 4</p>
              <h2>Assets</h2>
            </div>
          </div>

          <div className="form-grid">
            <FormField label="WAV file URL" htmlFor="wavFileUrl" error={getError("wavFileUrl")}>
              <input
                id="wavFileUrl"
                name="wavFileUrl"
                placeholder="https:// or placeholder text"
                value={form.wavFileUrl}
                onChange={handleInputChange}
              />
            </FormField>

            <FormField
              label="Cover art URL"
              htmlFor="coverArtUrl"
              error={getError("coverArtUrl")}
            >
              <input
                id="coverArtUrl"
                name="coverArtUrl"
                placeholder="https:// or placeholder text"
                value={form.coverArtUrl}
                onChange={handleInputChange}
              />
            </FormField>

            <FormField label="Lyrics" htmlFor="lyrics" error={getError("lyrics")}>
              <textarea
                id="lyrics"
                name="lyrics"
                rows={5}
                value={form.lyrics}
                onChange={handleInputChange}
              />
            </FormField>
          </div>
        </Surface>

        <Surface>
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Section 5</p>
              <h2>Distribution</h2>
            </div>
          </div>

          <div className="form-grid">
            <FormField
              label="Distributor"
              htmlFor="distributor"
              error={getError("distributor")}
            >
              <input
                id="distributor"
                name="distributor"
                placeholder="DistroKid, TuneCore, UnitedMasters, etc."
                value={form.distributor}
                onChange={handleInputChange}
              />
            </FormField>

            <FormField
              label="Requested Release Date"
              htmlFor="requestedReleaseDate"
              error={getError("requestedReleaseDate")}
            >
              <input
                id="requestedReleaseDate"
                name="requestedReleaseDate"
                type="date"
                value={form.requestedReleaseDate}
                onChange={handleInputChange}
              />
            </FormField>
          </div>
        </Surface>

        <Surface>
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Section 6</p>
              <h2>Services Needed</h2>
            </div>
          </div>

          <fieldset className="checkbox-grid">
            <legend className="sr-only">Services Needed</legend>
            {serviceOptions.map((service) => (
              <label key={service} className="service-option">
                <input
                  type="checkbox"
                  checked={form.servicesNeeded.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                />
                <span>{service}</span>
              </label>
            ))}
          </fieldset>
          {getError("servicesNeeded") ? (
            <small className="field-error">{getError("servicesNeeded")}</small>
          ) : null}
        </Surface>

        <Surface>
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Section 7</p>
              <h2>Agreement</h2>
            </div>
          </div>

          <label className="agreement-row">
            <input
              type="checkbox"
              name="rightsConfirmed"
              checked={form.rightsConfirmed}
              onChange={handleInputChange}
            />
            <span>
              I confirm that I control or have authority to submit the rights for
              this release.
            </span>
          </label>
          {getError("rightsConfirmed") ? (
            <small className="field-error">{getError("rightsConfirmed")}</small>
          ) : null}
        </Surface>

        <div className="form-submit-row">
          <div aria-live="polite">
            {statusMessage ? (
              <p className={`form-alert form-alert-${statusTone}`}>{statusMessage}</p>
            ) : null}
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Intake"}
          </Button>
        </div>
      </form>

      <div className="intake-sidebar">
        <ValidationPanel
          result={validationResult}
          onValidate={handleValidate}
          isPending={isValidating}
          helperMessage={validationMessage}
        />

        <Surface>
          <p className="eyebrow">Why this matters</p>
          <h2>Bad setup costs artists real money.</h2>
          <p className="section-copy">
            Publishing, metadata, and monetization mistakes lead to missed royalties
            and preventable cleanup work. This intake is designed to catch those
            issues early.
          </p>
        </Surface>
      </div>
    </div>
  );
}
