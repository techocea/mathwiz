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

