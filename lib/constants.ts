import {
  Award,
  Layers,
  UsersRound,
  LayoutDashboard,
  FileText,
  Users,
  Files,
  SquareCheckBig,
} from "lucide-react";

// export type Paper = {
//   id: string;
//   title: string;
//   subject: string;
//   durationMinutes: number;
//   fileUrl: string;
//   uploadDeadline: string;
// };

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
    label: "Time Table",
    href: "#time-table",
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
  {
    name: "Submissions",
    path: "/dashboard/admin/submissions",
    icon: Files,
  },
  {
    name: "Inquiries",
    path: "/dashboard/admin/inquiries",
    icon: SquareCheckBig,
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
    city: "ACBS Negombo",
    type: "Theory - 2025",
    day1: "Sunday",
    day1Start: "2.00PM",
    day1Finish: "7.00PM",
  },
  {
    id: 2,
    city: "ACBS Negombo",
    type: "Theory - 2026",
    day1: "Monday",
    day1Start: "3.00PM",
    day1Finish: "7.00PM",
    day2: "Wednesday",
    day2Start: "3.00PM",
    day2Finish: "7.00PM",
  },
  {
    id: 3,
    city: "Farade Education - Wattala",
    type: "Theory - 2027",
    day1: "Saturday",
    day1Start: "8:30AM",
    day1Finish: "12:30PM",
    day2: "Saturday",
    day2Start: "1:30PM",
    day2Finish: "5:30PM",
    day3: "Sunday",
    day3Start: "9:00AM",
    day3Finish: "12:00PM",
  },
  {
    id: 4,
    city: "ACBS Negombo",
    type: "සිද්ධාන්ත - 2026",
    day1: "අගහරුවාදා",
    day1Start: "ප.ව. 3.00",
    day1Finish: "ප.ව. 7.00",
  },
];

export const INSTRUCTIONS = [
  "Read the instructions before the starting the paper",
  "Prepare yourself before starting the paper",
  "The timer starts off right away once you start the exam",
  "You have 2h 40min to complete the paper and 15 min to upload the answer sheet(you have to upload a PDF file)",
  "If you face any issues when uploading the answer sheet you can send it through WhatsApp",
];
