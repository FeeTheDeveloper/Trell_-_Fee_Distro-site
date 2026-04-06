import { NextResponse } from "next/server";
import { ZodError } from "zod";

import {
  getAiValidationFeedback,
  isOpenAIConfigured,
  mergeValidationResults,
} from "@/lib/openai";
import { buildRulesValidation, intakeDraftSchema } from "@/lib/validations";
import type { ValidationRouteResponse } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = intakeDraftSchema.parse(body);
    const rules = buildRulesValidation(payload);

    if (!isOpenAIConfigured()) {
      return NextResponse.json<ValidationRouteResponse>({
        ok: true,
        data: rules,
        message:
          "OPENAI_API_KEY is not configured, so this result is based on deterministic release checks only.",
      });
    }

    const aiResult = await getAiValidationFeedback(payload, rules);
    const merged = mergeValidationResults(rules, aiResult);

    return NextResponse.json<ValidationRouteResponse>({
      ok: true,
      data: merged,
      message:
        merged.mode === "ai-enhanced"
          ? "AI validation complete."
          : "Rules-based validation complete.",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json<ValidationRouteResponse>(
        {
          ok: false,
          error: "The validation request had invalid field formats.",
        },
        { status: 400 },
      );
    }

    return NextResponse.json<ValidationRouteResponse>(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Validation is temporarily unavailable.",
      },
      { status: 500 },
    );
  }
}
