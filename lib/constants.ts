import { Award, Target, UsersRound } from "lucide-react";

export const NAV_ITEMS = [
  {
    id: 1,
    label: "Home",
    href: "/",
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
  {
    id: 5,
    label: "Pay Online",
    href: "/pay-online",
  },
];

export const FOOTER_SOCIALS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/__chamiya_._95/",
  },
  {
    name: "Facebook",
    href: "https://web.facebook.com/chamoda.jasenthuliyana.2025",
  },
  {
    name: "Tiktok",
    href: "https://www.tiktok.com/@mathwiz00?is_from_webapp=1&sender_device=pc",
  },
  {
    name: "YouTube",
    href: "http://www.youtube.com/@mathwiz_chamodaliyanage",
  },
];

export const FOOTER_LINKS = [
  {
    title: "Site Map",
    links: [
      { label: "Home", href: "#home" },
      { label: "Lead Tutor", href: "#about" },
      { label: "Timetable", href: "#time-table" },
      { label: "Success Stories", href: "#testimonials" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Wattala, Sri Lanka", href: null },
      { label: "Negombo, Sri Lanka", href: null },
      {
        label: "info@mathwiz.lk",
        href: "mailto:info@mathwiz.lk",
      },
    ],
  },
];

export const ADMIN_NAV_ITEMS = [
  {
    name: "Worksheets",
    path: "/dashboard/admin/activities/worksheet",
  },
  {
    name: "Homework",
    path: "/dashboard/admin/activities/homework",
  },
  {
    name: "Mini Exam",
    path: "/dashboard/admin/activities/mini-exam",
  },
  {
    name: "Speed Paper",
    path: "/dashboard/admin/activities/speed-paper",
  },
  {
    name: "Paper Class",
    path: "/dashboard/admin/activities/paper",
  },
  {
    name: "Marking Schemes",
    path: "/dashboard/admin/marking",
  },
  {
    name: "Submissions",
    path: "/dashboard/admin/submissions",
  },
];

export const HIGHLIGHTS = [
  {
    id: 1,
    icon: Award,
    label: "8+",
    description: "Years of Excellence",
    bgColor: "bg-amber-100",
    shadowColor: "amber-100",
    itemColor: "text-amber-600",
    textColor: "text-slate-900",
  },
  {
    id: 2,
    icon: UsersRound,
    label: "200+",
    description: "Students Enrolled",
    bgColor: "bg-green-100",
    shadowColor: "green-200",
    itemColor: "text-green-600",
    textColor: "text-green-900",
  },
  {
    id: 3,
    icon: Target,
    label: "98%",
    description: "Pass Rate (2023)",
    bgColor: "bg-blue-100",
    shadowColor: "blue-100",
    itemColor: "text-blue-600",
    textColor: "text-slate-900",
  },
];

export const TIMETABLE = [
  // 2028 Batch
  {
    id: 1,
    city: "ACBS - Negombo (English Medium)",
    type: "AL 2028 - Theory",
    day1: "Thursday",
    day1Start: "08.30 AM",
    day1Finish: "12.30 PM",
    isTemporary: true,
  },
  {
    id: 2,
    city: "ACBS - Negombo (Sinhala Medium)",
    type: "AL 2028 - Theory",
    day1: "Wednesday",
    day1Start: "08.30 AM",
    day1Finish: "12.30 PM",
    isTemporary: true,
  },
  {
    id: 3,
    city: "Farade - Wattala (English Medium)",
    type: "AL 2028 - Theory",
    day1: "Sunday",
    day1Start: "02.30 PM",
    day1Finish: "05.30 PM",
  },
  // 2027 Batch
  {
    id: 4,
    city: "ACBS - Negombo (English Medium)",
    type: "AL 2027 - Theory",
    day1: "Saturday",
    day1Start: "02.00 PM",
    day1Finish: "07.00 PM",
  },
  {
    id: 5,
    city: "ACBS - Negombo (Sinhala Medium)",
    type: "AL 2027 - Theory",
    day1: "Saturday",
    day1Start: "08.00 AM",
    day1Finish: "01.00 PM",
  },
  {
    id: 6,
    city: "Farade - Wattala (English Medium)",
    type: "AL 2027 - Theory",
    day1: "Sunday",
    day1Start: "09.00 AM",
    day1Finish: "02.00 PM",
  },
  {
    id: 7,
    city: "Online",
    type: "AL 2027 - Online Sessions",
    day1: "Tuesday",
    day1Start: "08.30 PM",
    day1Finish: "10.30 PM",
    day2: "Friday",
    day2Start: "08.30 PM",
    day2Finish: "10.30 PM",
  },
];

export const PAPER_CLASS_FEATURES = [
  {
    title: "Speed Papers",
    description:
      "Intensive rapid-fire testing sessions designed to build split-second decision-making for Pure Mathematics MCQ and structured essay sections under pressure.",
    icon: "⚡",
  },
  {
    title: "Predictive Model Papers",
    description:
      "Exclusive full-length papers crafted based on 15 years of exam trend analysis, focusing on high-probability Applied Mathematics mechanics and complex derivations.",
    icon: "🎯",
  },
  {
    title: "Marking Scheme Discussion",
    description:
      "Detailed step-by-step breakdown of how to earn maximum marks through precise logical derivations and correct mathematical notation used by GCE examiners.",
    icon: "📝",
  },
  {
    title: "Time Management Matrix",
    description:
      "Specific strategies to help you navigate Combined Maths Paper I and II efficiently, ensuring you have enough time for high-mark structured questions.",
    icon: "⏰",
  },
];

export const TESTIMONIALS = [
  {
    id: "1",
    videoUrl:
      "https://res.cloudinary.com/didspg6kj/video/upload/v1770713697/testimonials/tharindu_dwxawx.mp4",
    // thumbnail: "/1.png",
  },
  {
    id: "2",
    videoUrl:
      "https://res.cloudinary.com/didspg6kj/video/upload/v1770713647/testimonials/aashif_acfihc.mp4",
    // thumbnail: "/2.png",
  },
  {
    id: "3",
    videoUrl:
      "https://res.cloudinary.com/didspg6kj/video/upload/v1770713625/testimonials/evan_xq3zhm.mp4",
    // thumbnail: "/3.png",
  },
  {
    id: "4",
    videoUrl:
      "https://res.cloudinary.com/didspg6kj/video/upload/v1770713475/testimonials/tashani_clxgcn.mp4",
    // thumbnail: "/3.png",
  },
];

export const INSTRUCTIONS = [
  "Read the instructions before the starting the paper",
  "Prepare yourself before starting the paper",
  "The timer starts off right away once you start the exam",
  "You have 2h 40min to complete the paper and 15 min to upload the answer sheet(you have to upload a PDF file)",
  "If you face any issues when uploading the answer sheet you can send it through WhatsApp",
];

export const ASSESSMENT_TYPES = [
  { value: "paper", label: "Papers", icon: "📄" },
  { value: "mini-exam", label: "Mini Exams", icon: "📝" },
  { value: "worksheet", label: "Worksheets", icon: "📋" },
  { value: "homework", label: "Homework", icon: "📚" },
  { value: "speed-paper", label: "Speed Papers", icon: "⚡" },
];
