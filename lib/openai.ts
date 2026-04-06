import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

import type { IntakeSubmission, ValidationResult } from "@/lib/types";
import { uniqueValues } from "@/lib/utils";

const aiValidationSchema = z.object({
  readiness_score: z.number().int().min(0).max(100),
  errors: z.array(z.string()),
  warnings: z.array(z.string()),
  recommendations: z.array(z.string()),
});

function getClient() {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

function trimForAI(payload: Partial<IntakeSubmission>) {
  return {
    ...payload,
    lyrics: payload.lyrics ? payload.lyrics.slice(0, 2000) : "",
  };
}

export function isOpenAIConfigured() {
  return Boolean(process.env.OPENAI_API_KEY);
}

export async function getAiValidationFeedback(
  payload: Partial<IntakeSubmission>,
  rules: ValidationResult,
) {
  const client = getClient();

  if (!client) {
    return null;
  }

  const response = await client.responses.parse({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text:
              "You are a release-readiness analyst for a premium music publishing admin platform. Review the intake carefully, do not invent facts, keep feedback concise, and only flag issues supported by the submission. Use errors for blocking launch issues, warnings for suspicious metadata or formatting issues, and recommendations for polish or next steps.",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: JSON.stringify(
              {
                business_context:
                  "This platform handles publishing, distribution, monetization, and rights management.",
                rule_based_findings: rules,
                submission: trimForAI(payload),
              },
              null,
              2,
            ),
          },
        ],
      },
    ],
    text: {
      format: zodTextFormat(aiValidationSchema, "intake_validation"),
    },
  });

  const parsed = response.output_parsed;

  if (!parsed) {
    return null;
  }

  return {
    readiness_score: parsed.readiness_score,
    errors: uniqueValues(parsed.errors),
    warnings: uniqueValues(parsed.warnings),
    recommendations: uniqueValues(parsed.recommendations),
    mode: "ai-enhanced" as const,
  };
}

export function mergeValidationResults(
  rules: ValidationResult,
  ai: ValidationResult | null,
): ValidationResult {
  if (!ai) {
    return rules;
  }

  return {
    readiness_score: Math.min(rules.readiness_score, ai.readiness_score),
    errors: uniqueValues([...rules.errors, ...ai.errors]),
    warnings: uniqueValues([...rules.warnings, ...ai.warnings]),
    recommendations: uniqueValues([
      ...rules.recommendations,
      ...ai.recommendations,
    ]),
    mode: "ai-enhanced",
  };
}
