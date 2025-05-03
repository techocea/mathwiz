import { Award, Layers, UsersRound } from "lucide-react";

export type Paper = {
  id: string;
  title: string;
  subject: string;
  durationMinutes: number;
  fileUrl: string;
  uploadDeadline: string;
};

export const NAV_ITEMS = [
  {
    id: 1,
    label: "Home",
    href: "#home",
  },
  {
    id: 2,
    label: "About",
    href: "#about",
  },
  {
    id: 3,
    label: "Top Rankers",
    href: "#top-rankers",
  },
  {
    id: 4,
    label: "Contact",
    href: "#contact",
  },
];

export const HIGHLIGHTS = [
  {
    id: 1,
    icon: Award,
    label: "7+",
    description: "years experience",
    bgColor: "bg-blue-200",
    shadowColor: "blue-200",
    itemColor: "text-blue-600",
    textColor: "text-blue-600",
  },
  {
    id: 2,
    icon: UsersRound,
    label: "200+",
    description: "students enrolled",
    bgColor: "bg-green-200",
    shadowColor: "green-200",
    itemColor: "text-green-600",
    textColor: "text-green-600",
  },
  {
    id: 3,
    icon: Layers,
    label: "150+",
    description: "papers written",
    bgColor: "bg-red-200",
    shadowColor: "red-200",
    itemColor: "text-red-600",
    textColor: "text-red-600",
  },
];

export const TIMETABLE = [
  {
    id: 1,
    city: "Negombo",
    type: "Theory - 2026",
    day1: "Monday",
    day1Start: "8:00AM",
    day1Finish: "10:00AM",
    day2: "Thursday",
    day2Start: "8:00AM",
    day2Finish: "10:00AM",
  },
  {
    id: 2,
    city: "Negombo",
    type: "Revision - 2026",
    day1: "Monday",
    day1Start: "8:00AM",
    day1Finish: "10:00AM",
    day2: "Thursday",
    day2Start: "8:00AM",
    day2Finish: "10:00AM",
  },
  {
    id: 3,
    city: "Negombo",
    type: "Paper - 2026",
    day1: "Monday",
    day1Start: "8:00AM",
    day1Finish: "10:00AM",
    day2: "Thursday",
    day2Start: "8:00AM",
    day2Finish: "10:00AM",
  },
];

export const MOCK_PAPERS = [
  {
    id: "paper-1",
    title: "Pure Mathematics Paper 1",
    subject: "Mathematics",
    durationMinutes: 1,
    fileUrl: "/papers/pure-math-1.pdf",
    uploadDeadline: "2025-05-10T00:00:00Z",
  },
  {
    id: "paper-2",
    title: "Applied Mathematics Paper 1",
    subject: "Mathematics",
    durationMinutes: 1,
    fileUrl: "/papers/applied-math-1.pdf",
    uploadDeadline: "2025-05-15T00:00:00Z",
  },
  {
    id: "paper-3",
    title: "Pure Mathematics Paper 2",
    subject: "Mathematics",
    durationMinutes: 1,
    fileUrl: "/papers/pure-math-2.pdf",
    uploadDeadline: "2025-05-20T00:00:00Z",
  },
  {
    id: "paper-4",
    title: "Applied Mathematics Paper 2",
    subject: "Mathematics",
    durationMinutes: 1,
    fileUrl: "/papers/applied-math-2.pdf",
    uploadDeadline: "2025-05-05T00:00:00Z",
  },
  {
    id: "paper-5",
    title: "Model Paper - Combined Mathematics",
    subject: "Mathematics",
    durationMinutes: 1,
    fileUrl: "/papers/model-paper.pdf",
    uploadDeadline: "2025-05-25T00:00:00Z",
  },
];
