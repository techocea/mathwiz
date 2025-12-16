export type ResourceType =
  | "paper"
  | "mini-exam"
  | "worksheet"
  | "homework"
  | "speed-paper";

export type ActiveTabTypes = "activities" | "marked-papers" | "marking-schemes";

export interface ResourceFilters {
  year: string;
  medium: string;
  type: ResourceType;
}

export interface ResourceProps {
  type: ResourceType;
  resources: {
    _id: string;
    title: string;
    year?: string;
    medium?: string;
    paperUrl: string;
    submissions: string[];
    uploadDeadline: string;
    durationMinutes?: number;
  }[];
}

export interface MarkingProps {
  markings: {
    _id: string;
    title: string;
    year: string;
    medium: string;
    createdAt: string;
    markingSchemeUrl: string;
  }[];
}

export interface SubmissionProps {
  submissions: {
    _id: string;
    submissionPublicId: string;
    startTime: string;
    submittedAt: string;
    studentId: {
      firstName: string;
      lastName: string;
    };
    paperId: {
      title: string;
    };
  }[];
}
