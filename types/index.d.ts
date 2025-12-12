export type ResourceType =
  | "paper"
  | "mini-exam"
  | "worksheet"
  | "homework"
  | "speed-paper";

export interface ResourceFilters {
  year: string;
  medium: string;
  type: ResourceType;
}

export interface ResourceProps {
  resources: {
    _id: string;
    title: string;
    durationMinutes?: number;
    year?: string;
    medium?: string;
    paperUrl: string;
    submissions: string[];
    uploadDeadline: string;
  }[];
}
