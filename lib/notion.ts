import type { DashboardSnapshot, IntakeSubmission, LeadRecord, LeadStatus } from "@/lib/types";
import { buildDashboardSnapshot } from "@/lib/mock-data";

const NOTION_API_BASE = "https://api.notion.com/v1";
const NOTION_VERSION = "2025-09-03";

type NotionRichText = {
  plain_text?: string;
  text?: {
    content?: string;
  };
};

type NotionPropertyDefinition = {
  type: string;
  select?: {
    options?: Array<{ name: string }>;
  };
  multi_select?: {
    options?: Array<{ name: string }>;
  };
  status?: {
    options?: Array<{ name: string }>;
  };
};

type NotionPropertyValue = {
  type: string;
  title?: NotionRichText[];
  rich_text?: NotionRichText[];
  email?: string | null;
  phone_number?: string | null;
  url?: string | null;
  number?: number | null;
  date?: {
    start: string;
  } | null;
  select?: {
    name: string;
  } | null;
  status?: {
    name: string;
  } | null;
  multi_select?: Array<{
    name: string;
  }>;
  checkbox?: boolean;
};

type NotionDataSourceResponse = {
  id: string;
  properties: Record<string, NotionPropertyDefinition>;
};

type NotionPageResponse = {
  id: string;
  url?: string;
  created_time: string;
  properties: Record<string, NotionPropertyValue>;
};

function getAuthHeaders() {
  return {
    Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
    "Content-Type": "application/json",
    "Notion-Version": NOTION_VERSION,
  };
}

async function notionRequest<T>(path: string, init?: RequestInit) {
  const response = await fetch(`${NOTION_API_BASE}${path}`, {
    ...init,
    headers: {
      ...getAuthHeaders(),
      ...init?.headers,
    },
    cache: "no-store",
  });

  const payload = (await response.json()) as T & { message?: string };

  if (!response.ok) {
    throw new Error(
      payload.message ??
        "Notion rejected the request. Confirm the integration is shared to the target data source.",
    );
  }

  return payload;
}

function getConfiguredId() {
  return process.env.NOTION_DATABASE_ID;
}

export function isNotionConfigured() {
  return Boolean(process.env.NOTION_API_KEY && getConfiguredId());
}

function textNode(content: string) {
  return [
    {
      type: "text",
      text: {
        content: content.slice(0, 1900),
      },
    },
  ];
}

function firstPropertyKeyByType(
  properties: Record<string, NotionPropertyDefinition>,
  type: string,
) {
  return Object.entries(properties).find(([, definition]) => definition.type === type)?.[0];
}

function findPropertyKey(
  properties: Record<string, NotionPropertyDefinition>,
  candidates: string[],
) {
  const loweredCandidates = candidates.map((candidate) => candidate.toLowerCase());

  return Object.keys(properties).find((key) =>
    loweredCandidates.includes(key.toLowerCase()),
  );
}

function matchOption(
  definition: NotionPropertyDefinition,
  value: string,
  kind: "select" | "multi_select" | "status",
) {
  const options = definition[kind]?.options ?? [];

  if (!options.length) {
    return value;
  }

  return options.find((option) => option.name.toLowerCase() === value.toLowerCase())?.name;
}

function buildFieldPayload(
  definition: NotionPropertyDefinition,
  value: string | number | boolean | string[],
) {
  switch (definition.type) {
    case "rich_text":
      return { rich_text: textNode(String(value)) };
    case "email":
      return { email: String(value) };
    case "phone_number":
      return { phone_number: String(value) };
    case "url":
      return { url: String(value) };
    case "number":
      return { number: Number(value) };
    case "checkbox":
      return { checkbox: Boolean(value) };
    case "date":
      return { date: { start: String(value) } };
    case "select": {
      const option = matchOption(definition, String(value), "select");
      return option ? { select: { name: option } } : null;
    }
    case "status": {
      const option = matchOption(definition, String(value), "status");
      return option ? { status: { name: option } } : null;
    }
    case "multi_select": {
      const selected = Array.isArray(value) ? value : [String(value)];
      const mapped = selected
        .map((item) => matchOption(definition, item, "multi_select") ?? item)
        .map((item) => ({ name: item }));
      return { multi_select: mapped };
    }
    default:
      return null;
  }
}

async function getDataSource() {
  const id = getConfiguredId();

  if (!id) {
    throw new Error("NOTION_DATABASE_ID is missing.");
  }

  return notionRequest<NotionDataSourceResponse>(`/data_sources/${id}`);
}

function buildSubmissionProperties(
  schema: NotionDataSourceResponse,
  payload: IntakeSubmission,
) {
  const properties: Record<string, unknown> = {};

  const titleKey = firstPropertyKeyByType(schema.properties, "title");
  if (!titleKey) {
    throw new Error("The target Notion data source needs a title property.");
  }

  properties[titleKey] = {
    title: textNode(`${payload.artistName} - ${payload.songTitle}`),
  };

  const propertyAssignments: Array<{
    candidates: string[];
    value: string | number | boolean | string[];
  }> = [
    { candidates: ["Artist Name", "Artist"], value: payload.artistName },
    { candidates: ["Email"], value: payload.email },
    { candidates: ["Phone"], value: payload.phone },
    { candidates: ["PRO Affiliation"], value: payload.proAffiliation },
    { candidates: ["PRO IPI Number", "IPI Number"], value: payload.proIpiNumber },
    { candidates: ["Song Title"], value: payload.songTitle },
    { candidates: ["Primary Artist"], value: payload.primaryArtist },
    { candidates: ["Featured Artists"], value: payload.featuredArtists },
    { candidates: ["Producers"], value: payload.producers },
    { candidates: ["Genre"], value: payload.genre },
    { candidates: ["Explicit or Clean", "Release Version"], value: payload.releaseVersion },
    { candidates: ["Total Writers"], value: payload.totalWriters },
    { candidates: ["Artist Split %"], value: payload.artistSplit },
    { candidates: ["Producer Split %"], value: payload.producerSplit },
    { candidates: ["Other Writers %"], value: payload.otherWritersSplit },
    { candidates: ["WAV File URL"], value: payload.wavFileUrl },
    { candidates: ["Cover Art URL"], value: payload.coverArtUrl },
    { candidates: ["Lyrics"], value: payload.lyrics },
    { candidates: ["Distributor"], value: payload.distributor },
    { candidates: ["Requested Release Date"], value: payload.requestedReleaseDate },
    { candidates: ["Services Needed", "Services"], value: payload.servicesNeeded },
    { candidates: ["Rights Confirmed"], value: payload.rightsConfirmed },
    { candidates: ["Status"], value: "Pending Review" },
  ];

  propertyAssignments.forEach(({ candidates, value }) => {
    const propertyKey = findPropertyKey(schema.properties, candidates);

    if (!propertyKey) {
      return;
    }

    const assignment = buildFieldPayload(schema.properties[propertyKey], value);

    if (assignment) {
      properties[propertyKey] = assignment;
    }
  });

  return properties;
}

function buildSubmissionChildren(payload: IntakeSubmission) {
  const sections = [
    {
      title: "Artist Info",
      items: [
        `Artist Name: ${payload.artistName}`,
        `Email: ${payload.email}`,
        `Phone: ${payload.phone}`,
        `PRO Affiliation: ${payload.proAffiliation}`,
        `PRO IPI Number: ${payload.proIpiNumber || "Not provided"}`,
      ],
    },
    {
      title: "Release Info",
      items: [
        `Song Title: ${payload.songTitle}`,
        `Primary Artist: ${payload.primaryArtist}`,
        `Featured Artists: ${payload.featuredArtists || "None listed"}`,
        `Producers: ${payload.producers}`,
        `Genre: ${payload.genre}`,
        `Version: ${payload.releaseVersion}`,
      ],
    },
    {
      title: "Rights and Splits",
      items: [
        `Total Writers: ${payload.totalWriters}`,
        `Artist Split: ${payload.artistSplit}%`,
        `Producer Split: ${payload.producerSplit}%`,
        `Other Writers Split: ${payload.otherWritersSplit}%`,
      ],
    },
    {
      title: "Assets and Distribution",
      items: [
        `WAV: ${payload.wavFileUrl}`,
        `Cover Art: ${payload.coverArtUrl}`,
        `Lyrics: ${payload.lyrics || "Not provided"}`,
        `Distributor: ${payload.distributor}`,
        `Requested Release Date: ${payload.requestedReleaseDate}`,
      ],
    },
    {
      title: "Services Needed",
      items: payload.servicesNeeded,
    },
  ];

  return sections.flatMap((section) => [
    {
      object: "block",
      type: "heading_2",
      heading_2: {
        rich_text: textNode(section.title),
      },
    },
    ...section.items.map((item) => ({
      object: "block",
      type: "bulleted_list_item",
      bulleted_list_item: {
        rich_text: textNode(item),
      },
    })),
  ]);
}

function extractPlainText(property?: NotionPropertyValue) {
  if (!property) {
    return "";
  }

  if (property.type === "title") {
    return (property.title ?? [])
      .map((item) => item.plain_text ?? item.text?.content ?? "")
      .join("");
  }

  if (property.type === "rich_text") {
    return (property.rich_text ?? [])
      .map((item) => item.plain_text ?? item.text?.content ?? "")
      .join("");
  }

  if (property.type === "email") {
    return property.email ?? "";
  }

  if (property.type === "phone_number") {
    return property.phone_number ?? "";
  }

  if (property.type === "url") {
    return property.url ?? "";
  }

  if (property.type === "select") {
    return property.select?.name ?? "";
  }

  if (property.type === "status") {
    return property.status?.name ?? "";
  }

  if (property.type === "number") {
    return property.number?.toString() ?? "";
  }

  return "";
}

function extractDate(property?: NotionPropertyValue) {
  if (!property || property.type !== "date") {
    return "";
  }

  return property.date?.start ?? "";
}

function extractMultiSelect(property?: NotionPropertyValue) {
  if (!property || property.type !== "multi_select") {
    return [];
  }

  return (property.multi_select ?? []).map((option) => option.name);
}

function getFirstMatchingValue(
  page: NotionPageResponse,
  candidates: string[],
) {
  const lowered = candidates.map((candidate) => candidate.toLowerCase());
  const key = Object.keys(page.properties).find((propertyKey) =>
    lowered.includes(propertyKey.toLowerCase()),
  );

  return key ? page.properties[key] : undefined;
}

function mapPageToLead(page: NotionPageResponse): LeadRecord {
  const services = extractMultiSelect(
    getFirstMatchingValue(page, ["Services Needed", "Services"]),
  );
  const statusValue = extractPlainText(getFirstMatchingValue(page, ["Status"])) as LeadStatus;

  return {
    id: page.id,
    clientName:
      extractPlainText(getFirstMatchingValue(page, ["Artist Name", "Artist", "Name"])) ||
      "Unknown artist",
    email: extractPlainText(getFirstMatchingValue(page, ["Email"])),
    songTitle: extractPlainText(getFirstMatchingValue(page, ["Song Title"])) || "Untitled release",
    primaryArtist:
      extractPlainText(getFirstMatchingValue(page, ["Primary Artist"])) ||
      extractPlainText(getFirstMatchingValue(page, ["Artist Name", "Artist"])),
    status: statusValue || "Pending Review",
    packageName: services.includes("Full Admin")
      ? "Full Admin"
      : services[0] || "Publishing Registration",
    servicesNeeded:
      services.length > 0
        ? (services as LeadRecord["servicesNeeded"])
        : ["Publishing Registration"],
    requestedReleaseDate: extractDate(
      getFirstMatchingValue(page, ["Requested Release Date"]),
    ),
    createdAt: page.created_time,
    readinessScore: Number(
      extractPlainText(getFirstMatchingValue(page, ["Readiness Score"])) || 80,
    ),
    notes:
      extractPlainText(getFirstMatchingValue(page, ["Notes"])) ||
      "Submitted through the Ghost Creators intake flow.",
    source: "live",
  };
}

export async function createNotionIntakeEntry(payload: IntakeSubmission) {
  if (!isNotionConfigured()) {
    throw new Error(
      "Notion integration is not configured. Add NOTION_API_KEY and NOTION_DATABASE_ID.",
    );
  }

  const schema = await getDataSource();
  const dataSourceId = getConfiguredId();

  if (!dataSourceId) {
    throw new Error("NOTION_DATABASE_ID is missing.");
  }

  const response = await notionRequest<NotionPageResponse>("/pages", {
    method: "POST",
    body: JSON.stringify({
      parent: {
        data_source_id: dataSourceId,
      },
      properties: buildSubmissionProperties(schema, payload),
      children: buildSubmissionChildren(payload),
    }),
  });

  return {
    id: response.id,
    url: response.url,
  };
}

export async function getLiveDashboardSnapshot(): Promise<DashboardSnapshot> {
  if (!isNotionConfigured()) {
    throw new Error("Notion integration is not configured.");
  }

  const dataSourceId = getConfiguredId();

  if (!dataSourceId) {
    throw new Error("NOTION_DATABASE_ID is missing.");
  }

  const response = await notionRequest<{ results: NotionPageResponse[] }>(
    `/data_sources/${dataSourceId}/query`,
    {
      method: "POST",
      body: JSON.stringify({
        page_size: 25,
        sorts: [
          {
            timestamp: "created_time",
            direction: "descending",
          },
        ],
      }),
    },
  );

  const submissions = response.results.map(mapPageToLead);

  return buildDashboardSnapshot(submissions, "live");
}
