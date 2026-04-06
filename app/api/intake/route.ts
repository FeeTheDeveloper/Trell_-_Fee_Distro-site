import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { createNotionIntakeEntry, isNotionConfigured } from "@/lib/notion";
import { flattenFieldErrors, intakeSubmissionSchema } from "@/lib/validations";
import type { IntakeRouteResponse } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = intakeSubmissionSchema.parse(body);

    if (!isNotionConfigured()) {
      return NextResponse.json<IntakeRouteResponse>(
        {
          ok: false,
          error:
            "Notion integration is not configured. Add NOTION_API_KEY and NOTION_DATABASE_ID before submitting live intakes.",
        },
        { status: 503 },
      );
    }

    const created = await createNotionIntakeEntry(payload);

    return NextResponse.json<IntakeRouteResponse>({
      ok: true,
      message: "Submission received and saved to Notion for review.",
      submissionId: created.id,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json<IntakeRouteResponse>(
        {
          ok: false,
          error: "Please correct the highlighted fields and try again.",
          fieldErrors: flattenFieldErrors(error),
        },
        { status: 400 },
      );
    }

    const message =
      error instanceof Error
        ? error.message
        : "We could not save the intake to Notion right now.";

    return NextResponse.json<IntakeRouteResponse>(
      {
        ok: false,
        error: message,
      },
      { status: 500 },
    );
  }
}
