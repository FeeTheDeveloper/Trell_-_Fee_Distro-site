export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function sumSplits(
  artistSplit: number,
  producerSplit: number,
  otherWritersSplit: number,
) {
  return artistSplit + producerSplit + otherWritersSplit;
}

export function formatDate(date?: string) {
  if (!date) {
    return "TBD";
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function getDaysUntil(date?: string) {
  if (!date) {
    return null;
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  parsed.setHours(0, 0, 0, 0);

  return Math.round((parsed.getTime() - today.getTime()) / 86_400_000);
}

export function getReleaseWindowLabel(date?: string) {
  const daysUntil = getDaysUntil(date);

  if (daysUntil === null) {
    return "Date pending";
  }

  if (daysUntil < 0) {
    return `${Math.abs(daysUntil)}d overdue`;
  }

  if (daysUntil === 0) {
    return "Today";
  }

  if (daysUntil === 1) {
    return "Tomorrow";
  }

  return `In ${daysUntil} days`;
}

export function uniqueValues(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

export function isLikelyUrl(value: string) {
  return /^https?:\/\/\S+$/i.test(value);
}

export function isFutureDate(value: string) {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return parsed >= today;
}

export function getInitials(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function formatServices(services: string[]) {
  return services.join(", ");
}
