export type ResourceType =
  | "paper"
  | "mini-exam"
  | "worksheet"
  | "homework"
  | "speed-paper";

export type ActiveTabTypes = "activities" | "marked-papers" | "marking-schemes";

export type StatusTypes = "pending" | "approved" | "rejected" | "banned";

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
    cloudinaryPublicId: string;
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

export interface TuitionTypeProps {
  theory: boolean;
  revision: boolean;
  paper: boolean;
}

export interface StudentProps {
  students: {
    _id: string;
    firstName: string;
    lastName: string;
    school: string;
    email: string;
    year: string;
    medium: string;
    contact: number;
    tuitionType: TuitionTypeProps;
    status: StatusTypes;
  }[];
}

export interface PaymentProps {
  payments: {
    _id: string;
    referenceId: string;
    name: string;
    year: string;
    createdAt: string;
    cloudinaryPublicId: string;
    paymentSlipUrl: string;
  }[];
}
