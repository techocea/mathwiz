import {
  Award,
  Layers,
  UsersRound,
  LayoutDashboard,
  FileText,
  Users,
} from "lucide-react";
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

export const ADMIN_NAV_ITEMS = [
  {
    name: "Dashboard",
    path: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Papers",
    path: "/dashboard/admin/papers",
    icon: FileText,
  },
  {
    name: "Students",
    path: "/dashboard/admin/students",
    icon: Users,
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

export const ADMIN_MOCK_PAPERS = [
  {
    id: "paper-1",
    title: "2023 Combined Maths Paper 1",
    createdAt: "2023-06-15",
    timeLimit: 180, // minutes
    submissions: 87,
    status: "active",
  },
  {
    id: "paper-2",
    title: "2023 Combined Maths Paper 2",
    createdAt: "2023-06-28",
    timeLimit: 120, // minutes
    submissions: 65,
    status: "active",
  },
  {
    id: "paper-3",
    title: "2023 Combined Maths Paper 3",
    createdAt: "2023-07-10",
    timeLimit: 150, // minutes
    submissions: 72,
    status: "active",
  },
  {
    id: "paper-4",
    title: "2022 Combined Maths Model Paper",
    createdAt: "2022-11-20",
    timeLimit: 180, // minutes
    submissions: 124,
    status: "archived",
  },
  {
    id: "paper-5",
    title: "2022 Combined Maths Past Paper",
    createdAt: "2022-09-05",
    timeLimit: 150, // minutes
    submissions: 98,
    status: "archived",
  },
];

export const MOCK_STUDENTS = [
  {
    id: "student-1",
    name: "Dasun Silva",
    email: "dasun@example.com",
    joinDate: "2023-01-15",
    completedPapers: 8,
    status: "active",
  },
  {
    id: "student-2",
    name: "Malini Perera",
    email: "malini@example.com",
    joinDate: "2023-02-03",
    completedPapers: 7,
    status: "active",
  },
  {
    id: "student-3",
    name: "Rajitha Fernando",
    email: "rajitha@example.com",
    joinDate: "2023-01-20",
    completedPapers: 6,
    status: "active",
  },
  {
    id: "student-4",
    name: "Dilshan Jayawardena",
    email: "dilshan@example.com",
    joinDate: "2023-03-12",
    completedPapers: 5,
    status: "inactive",
  },
  {
    id: "student-5",
    name: "Savini Mendis",
    email: "savini@example.com",
    joinDate: "2023-02-18",
    completedPapers: 8,
    status: "active",
  },
];