import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function BaseIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </BaseIcon>
  );
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 3l7 3v5c0 4.5-2.8 8.4-7 10-4.2-1.6-7-5.5-7-10V6l7-3z" />
      <path d="M9.4 12.1l1.7 1.8 3.7-4.2" />
    </BaseIcon>
  );
}

export function WaveIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M3 13c1.3 0 1.3-4 2.7-4s1.3 8 2.6 8 1.4-12 2.7-12 1.3 14 2.7 14 1.3-9 2.6-9 1.4 5 2.7 5" />
    </BaseIcon>
  );
}

export function LayersIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 4l8 4-8 4-8-4 8-4z" />
      <path d="M4 12l8 4 8-4" />
      <path d="M4 16l8 4 8-4" />
    </BaseIcon>
  );
}

export function SparkChartIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 18h16" />
      <path d="M6 15l3-4 3 2 5-6" />
      <path d="M17 7h2v2" />
    </BaseIcon>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M7.5 3v4" />
      <path d="M16.5 3v4" />
      <path d="M3.5 9.5h17" />
    </BaseIcon>
  );
}

export function ChecklistIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M9 7h9" />
      <path d="M9 12h9" />
      <path d="M9 17h9" />
      <path d="M4.5 7l1 1 2-2" />
      <path d="M4.5 12l1 1 2-2" />
      <path d="M4.5 17l1 1 2-2" />
    </BaseIcon>
  );
}

export function HeadphonesIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5 13v4a2 2 0 0 0 2 2h1v-8H7a2 2 0 0 0-2 2z" />
      <path d="M19 13v4a2 2 0 0 1-2 2h-1v-8h1a2 2 0 0 1 2 2z" />
      <path d="M5 13a7 7 0 0 1 14 0" />
    </BaseIcon>
  );
}

export function FolderIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M3.5 7.5A2.5 2.5 0 0 1 6 5h4l2 2h6a2.5 2.5 0 0 1 2.5 2.5V17A2.5 2.5 0 0 1 18 19.5H6A2.5 2.5 0 0 1 3.5 17V7.5z" />
    </BaseIcon>
  );
}

export function DiamondIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M7 4.5h10l4 5.5-9 10-9-10 4-5.5z" />
      <path d="M9 4.5l3 15.5 3-15.5" />
      <path d="M3 10h18" />
    </BaseIcon>
  );
}
