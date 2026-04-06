"use client";

import { useState, useTransition } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRightIcon,
  ChecklistIcon,
  ShieldCheckIcon,
  SparkChartIcon,
} from "@/components/ui/icons";
import { Surface } from "@/components/ui/surface";
import { getReleaseWindowLabel } from "@/lib/utils";
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

const servicePresets: Record<string, ServiceOption[]> = {
  "basic-upload": ["Distribution Upload"],
  "full-admin": ["Full Admin", "Publishing Registration"],
  "label-services": ["Distribution Upload", "Publishing Registration", "Full Admin"],
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

function getReadinessTone(score: number) {
  if (score >= 86) return "emerald" as const;
  if (score >= 65) return "gold" as const;
  if (score >= 40) return "slate" as const;
  return "rose" as const;
}

function getReadinessLabel(score: number) {
  if (score >= 86) return "Launch-ready";
  if (score >= 65) return "Needs final review";
  if (score >= 40) return "Work in progress";
  return "Needs cleanup";
}

function FormField({
  label,
  htmlFor,
  helper,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  helper?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="form-field" htmlFor={htmlFor}>
      <div className="field-label-row">
        <span>{label}</span>
        {error ? <small className="field-error">{error}</small> : null}
      </div>
      {helper ? <p className="field-helper">{helper}</p> : null}
      {children}
    </label>
  );
}

function SectionCard({
  step,
  title,
  description,
  aside,
  children,
}: {
  step: string;
  title: string;
  description: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Surface className="intake-section-card">
      <div className="section-card-header">
        <div>
          <p className="eyebrow">{step}</p>
          <h2>{title}</h2>
          <p className="section-copy section-card-copy">{description}</p>
        </div>
        {aside ? <div>{aside}</div> : null}
      </div>
      {children}
    </Surface>
  );
}

function ValidationBucket({
  title,
  tone,
  emptyState,
  items,
}: {
  title: string;
  tone: "rose" | "gold" | "slate";
  emptyState: string;
  items: string[];
}) {
  return (
    <div className="validation-bucket">
      <div className="validation-bucket-header">
        <Badge tone={tone}>{title}</Badge>
      </div>
      {items.length ? (
        <ul className="check-list compact">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="empty-copy">{emptyState}</p>
      )}
    </div>
  );
}

function ValidationPanel({
  result,
  onValidate,
  isPending,
  helperMessage,
  readinessScore,
}: {
  result: ValidationResult | null;
  onValidate: () => void;
  isPending: boolean;
  helperMessage: string;
  readinessScore: number;
}) {
  const readinessTone = getReadinessTone(readinessScore);

  return (
    <Surface className="validation-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Free Audit</p>
          <h2>Release readiness review</h2>
        </div>
        <Badge tone={result?.mode === "ai-enhanced" ? "emerald" : "violet"}>
          {result?.mode === "ai-enhanced" ? "AI + operator rules" : "Operator rules"}
        </Badge>
      </div>

      <p className="section-copy">
        Run the audit before you submit. Ghost flags missing data, split issues,
        asset gaps, and release pressure so the intake lands cleaner.
      </p>

      <div className="validation-readiness">
        <div>
          <span>Readiness score</span>
          <strong>{readinessScore}</strong>
          <p>{getReadinessLabel(readinessScore)}</p>
        </div>
        <div className="readiness-meter">
          <div
            className={`readiness-meter-fill readiness-meter-${readinessTone}`}
            style={{ width: `${readinessScore}%` }}
          />
        </div>
      </div>

      <Button
        type="button"
        onClick={onValidate}
        disabled={isPending}
        icon={<SparkChartIcon />}
      >
        {isPending ? "Reviewing release..." : result ? "Re-run Free Audit" : "Run Free Audit"}
      </Button>

      <p className="validation-helper" aria-live="polite">
        {helperMessage}
      </p>

      {result ? (
        <div className="validation-results-grid">
          <ValidationBucket
            title="Blocking issues"
            tone="rose"
            emptyState="No blocking issues flagged right now."
            items={result.errors}
          />
          <ValidationBucket
            title="Warnings"
            tone="gold"
            emptyState="No warning signals flagged."
            items={result.warnings}
          />
          <ValidationBucket
            title="Recommendations"
            tone="slate"
            emptyState="No extra recommendations at the moment."
            items={result.recommendations}
          />
        </div>
      ) : null}
    </Surface>
  );
}

export function IntakeForm({ servicePresetKey }: { servicePresetKey?: string }) {
  const presetServices = servicePresets[servicePresetKey ?? ""] ?? [];
  const blankFormState = {
    ...initialFormState,
    servicesNeeded: presetServices,
  };

  const [form, setForm] = useState<FormState>(blankFormState);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[] | undefined>>({});
  const [statusMessage, setStatusMessage] = useState("");
  const [statusTone, setStatusTone] = useState<"success" | "error" | "neutral">(
    "neutral",
  );
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [validationMessage, setValidationMessage] = useState(
    "Run the free audit to preview readiness before you submit.",
  );
  const [submissionId, setSubmissionId] = useState("");
  const [isSubmitting, startSubmitTransition] = useTransition();
  const [isValidating, startValidateTransition] = useTransition();

  const splitTotal =
    Number(form.artistSplit || 0) +
    Number(form.producerSplit || 0) +
    Number(form.otherWritersSplit || 0);

  const intakeSignals = [
    {
      label: "Contact profile",
      complete: Boolean(form.artistName && form.email && form.phone),
      detail: "Client and release owner information.",
    },
    {
      label: "Release package",
      complete: Boolean(form.songTitle && form.primaryArtist && form.distributor),
      detail: "Song metadata, artist naming, and delivery target.",
    },
    {
      label: "Rights coverage",
      complete: Boolean(form.totalWriters && splitTotal === 100 && form.rightsConfirmed),
      detail: "Split totals, writer count, and control confirmation.",
    },
    {
      label: "Assets and scope",
      complete: Boolean(
        form.wavFileUrl &&
          form.coverArtUrl &&
          form.requestedReleaseDate &&
          form.servicesNeeded.length,
      ),
      detail: "Files, release timing, and Ghost service scope.",
    },
  ];

  const completedSignals = intakeSignals.filter((item) => item.complete).length;
  const baselineReadiness = Math.round((completedSignals / intakeSignals.length) * 100);
  const readinessScore = validationResult?.readiness_score ?? Math.max(baselineReadiness, 18);
  const readinessTone = getReadinessTone(readinessScore);
  const getError = (field: keyof FormState) => fieldErrors[field]?.[0];

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
      try {
        setValidationMessage("Reviewing your current intake for setup and launch risk...");

        const response = await fetch("/api/validate-intake", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(toPayload(form)),
        });

        const payload = (await response.json()) as ValidationRouteResponse;

        if (!payload.ok) {
          setValidationResult(null);
          setValidationMessage(payload.error);
          return;
        }

        setValidationResult(payload.data);
        setValidationMessage(
          payload.message ??
            "Audit complete. Review the issues and recommendations before submitting.",
        );
      } catch {
        setValidationResult(null);
        setValidationMessage("Validation is temporarily unavailable. Please try again.");
      }
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startSubmitTransition(async () => {
      try {
        setStatusMessage("Submitting your intake to Ghost Creators...");
        setStatusTone("neutral");
        setFieldErrors({});
        setSubmissionId("");

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

        setForm(blankFormState);
        setFieldErrors({});
        setValidationResult(null);
        setValidationMessage("Run the free audit to preview readiness before you submit.");
        setStatusMessage(payload.message);
        setStatusTone("success");
        setSubmissionId(payload.submissionId);
      } catch {
        setStatusMessage("We could not submit the intake right now. Please try again.");
        setStatusTone("error");
      }
    });
  };

  const contactSection = (
    <SectionCard
      step="Stage 01"
      title="Artist and contact profile"
      description="Start with the person or team behind the release so Ghost knows who owns approvals and where follow-up should go."
    >
      <div className="form-grid">
        <FormField
          label="Artist Name"
          htmlFor="artistName"
          helper="Use the client-facing name Ghost should use in correspondence and setup."
          error={getError("artistName")}
        >
          <input
            id="artistName"
            name="artistName"
            placeholder="Avery Lane"
            value={form.artistName}
            onChange={handleInputChange}
          />
        </FormField>

        <FormField
          label="Email"
          htmlFor="email"
          helper="Primary inbox for release updates, missing-item requests, and approvals."
          error={getError("email")}
        >
          <input
            id="email"
            name="email"
            type="email"
            placeholder="artist@clientmail.com"
            value={form.email}
            onChange={handleInputChange}
          />
        </FormField>

        <FormField
          label="Phone"
          htmlFor="phone"
          helper="Use the best number for time-sensitive release questions."
          error={getError("phone")}
        >
          <input
            id="phone"
            name="phone"
            placeholder="(555) 555-0109"
            value={form.phone}
            onChange={handleInputChange}
          />
        </FormField>

        <FormField
          label="PRO Affiliation"
          htmlFor="proAffiliation"
          helper="Ghost uses this to assess registration and rights readiness."
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
          helper="Required when a PRO affiliation is selected."
          error={getError("proIpiNumber")}
        >
          <input
            id="proIpiNumber"
            name="proIpiNumber"
            placeholder="IPI or CAE number"
            value={form.proIpiNumber}
            onChange={handleInputChange}
          />
        </FormField>
      </div>
    </SectionCard>
  );

  const releaseSection = (
    <SectionCard
      step="Stage 02"
      title="Release details"
      description="Capture the release naming, contributor data, and metadata Ghost needs before delivery work starts."
    >
      <div className="form-grid">
        <FormField
          label="Song Title"
          htmlFor="songTitle"
          helper="Use the exact song title that should appear across DSPs and registrations."
          error={getError("songTitle")}
        >
          <input
            id="songTitle"
            name="songTitle"
            placeholder="Northside Echo"
            value={form.songTitle}
            onChange={handleInputChange}
          />
        </FormField>

        <FormField
          label="Primary Artist"
          htmlFor="primaryArtist"
          helper="Main artist name shown on the release."
          error={getError("primaryArtist")}
        >
          <input
            id="primaryArtist"
            name="primaryArtist"
            placeholder="Jordan Price"
            value={form.primaryArtist}
            onChange={handleInputChange}
          />
        </FormField>

        <FormField
          label="Featured Artists"
          htmlFor="featuredArtists"
          helper="Separate multiple names with commas so credits are easier to verify."
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

        <FormField
          label="Producers"
          htmlFor="producers"
          helper="List each producer exactly as they should be credited."
          error={getError("producers")}
        >
          <input
            id="producers"
            name="producers"
            placeholder="Comma separated if multiple"
            value={form.producers}
            onChange={handleInputChange}
          />
        </FormField>

        <FormField
          label="Genre"
          htmlFor="genre"
          helper="Genre helps shape DSP positioning and metadata QA."
          error={getError("genre")}
        >
          <input
            id="genre"
            name="genre"
            placeholder="Alt R&B"
            value={form.genre}
            onChange={handleInputChange}
          />
        </FormField>

        <FormField
          label="Explicit or Clean"
          htmlFor="releaseVersion"
          helper="Select the release version Ghost should prepare for distribution."
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
    </SectionCard>
  );

  const rightsSection = (
    <SectionCard
      step="Stage 03"
      title="Rights and splits"
      description="This is where most expensive release mistakes happen. Lock the percentages and writer count before Ghost moves the project forward."
      aside={<Badge tone={splitTotal === 100 ? "emerald" : "gold"}>Split total: {splitTotal}%</Badge>}
    >
      <div className="form-grid split-grid">
        <FormField
          label="Total Writers"
          htmlFor="totalWriters"
          helper="Include all writers contributing to the composition."
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
          helper="Percentage owned by the primary artist or artist entity."
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
          helper="Percentage controlled by producer contributors."
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
          helper="Include any remaining writers not covered above."
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
    </SectionCard>
  );

  const assetsSection = (
    <SectionCard
      step="Stage 04"
      title="Assets and distribution timing"
      description="Give Ghost the files and timing context needed to assess launch risk before the project enters production review."
    >
      <div className="form-grid">
        <FormField
          label="WAV file URL"
          htmlFor="wavFileUrl"
          helper="Use the final asset link if it is ready. Placeholder text is allowed for a draft audit."
          error={getError("wavFileUrl")}
        >
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
          helper="Link the artwork Ghost should validate for DSP readiness."
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

        <FormField
          label="Lyrics"
          htmlFor="lyrics"
          helper="Optional, but useful for downstream admin and monetization checks."
          error={getError("lyrics")}
        >
          <textarea
            id="lyrics"
            name="lyrics"
            rows={5}
            placeholder="Paste lyrics if available"
            value={form.lyrics}
            onChange={handleInputChange}
          />
        </FormField>

        <FormField
          label="Distributor"
          htmlFor="distributor"
          helper="Current or intended distribution partner."
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
          helper="Ghost uses this to identify schedule pressure and launch risk."
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
    </SectionCard>
  );

  const scopeSection = (
    <SectionCard
      step="Stage 05"
      title="Service scope and rights confirmation"
      description="Select the Ghost services you want attached to this release so the operator team can route the project correctly."
    >
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
    </SectionCard>
  );

  return (
    <div className="intake-layout">
      <form className="intake-form" onSubmit={handleSubmit}>
        {contactSection}
        {releaseSection}
        {rightsSection}
        {assetsSection}
        {scopeSection}

        <div className="form-submit-row">
          <div aria-live="polite">
            {statusMessage ? (
              <p className={`form-alert form-alert-${statusTone}`}>{statusMessage}</p>
            ) : null}
          </div>

          <Button type="submit" disabled={isSubmitting} icon={<ArrowUpRightIcon />}>
            {isSubmitting ? "Submitting..." : "Submit Intake for Review"}
          </Button>
        </div>
      </form>

      <div className="intake-sidebar">
        <ValidationPanel
          result={validationResult}
          onValidate={handleValidate}
          isPending={isValidating}
          helperMessage={validationMessage}
          readinessScore={readinessScore}
        />

        <Surface className="status-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Review Rail</p>
              <h2>Operator snapshot</h2>
            </div>
            <Badge tone={readinessTone}>{getReadinessLabel(readinessScore)}</Badge>
          </div>

          <div className="status-kpi-grid">
            <div className="status-kpi-card">
              <span>Services selected</span>
              <strong>{form.servicesNeeded.length || 0}</strong>
              <p>Scope determines the Ghost review path.</p>
            </div>
            <div className="status-kpi-card">
              <span>Release window</span>
              <strong>{getReleaseWindowLabel(form.requestedReleaseDate)}</strong>
              <p>Timing pressure affects delivery confidence.</p>
            </div>
          </div>

          <div className="selection-summary">
            {form.servicesNeeded.length ? (
              form.servicesNeeded.map((service) => (
                <Badge key={service} tone="slate">
                  {service}
                </Badge>
              ))
            ) : (
              <p className="empty-copy">Choose services to shape the Ghost scope.</p>
            )}
          </div>

          <div className="status-checklist">
            {intakeSignals.map((item) => (
              <div key={item.label} className="status-row">
                <span className="icon-badge icon-badge-muted" aria-hidden="true">
                  {item.complete ? <ShieldCheckIcon /> : <ChecklistIcon />}
                </span>
                <div>
                  <strong>{item.label}</strong>
                  <p>{item.detail}</p>
                </div>
                <Badge tone={item.complete ? "emerald" : "gold"}>
                  {item.complete ? "Ready" : "Pending"}
                </Badge>
              </div>
            ))}
          </div>
        </Surface>

        {statusTone === "success" ? (
          <Surface className="success-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Submission secured</p>
                <h2>Ghost has your release.</h2>
              </div>
              <Badge tone="emerald">In review</Badge>
            </div>
            <p className="section-copy">
              Your intake has been pushed into the review queue. Ghost will validate
              the details, confirm service scope, and follow up if anything blocks
              release readiness.
            </p>
            {submissionId ? (
              <p className="success-id">
                Submission ID: <strong>{submissionId}</strong>
              </p>
            ) : null}
            <ul className="check-list compact">
              <li>Metadata, rights, and assets are reviewed first.</li>
              <li>Service scope is confirmed before the project moves forward.</li>
              <li>Ghost follows up if anything needs cleanup before launch.</li>
            </ul>
          </Surface>
        ) : null}
      </div>
    </div>
  );
}
