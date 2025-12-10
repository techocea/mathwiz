"use client";

import BlurGradient from "@/components/BlurGradient";
import { useTimer } from "@/app/providers/TimerContext";
import DashboardNavbar from "@/components/DashboardNavbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { INSTRUCTIONS } from "@/lib/constants";
import axios from "axios";
import { format } from "date-fns";
import { Clock, FileText, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PaperProps {
  _id: string;
  title: string;
  durationMinutes: number;
  paperUrl: string;
  uploadDeadline: string;
}

interface StudentProps {
  name: string;
  year: string;
}

const StudentDashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [papers, setPapers] = useState<PaperProps[]>([]);
  const { isRunning, currentExamId, startTimer } = useTimer();
  const [studentData, setStudentData] = useState<StudentProps>();

  useEffect(() => {
    const fetchStudentData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/login", { withCredentials: true });
        setStudentData(res.data);
      } catch (error) {
        console.error("Failed to fetch Student data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentData();
  }, []);

  useEffect(() => {
    const fetchAllPapers = async () => {
      setLoading(true);
      try {
        const resStudent = await axios.get("/api/login", {
          withCredentials: true,
        });
        const studentYear = resStudent.data.year;

        const resPapers = await axios.get(
          `/api/admin/paper?year=${studentYear}`
        );
        setPapers(resPapers.data.papers);
      } catch (error) {
        console.log("Failed to fetch papers: ", error);
        router.push("/dashboard/student");
      } finally {
        setLoading(false);
      }
    };
    fetchAllPapers();
  }, [router]);

  if (loading)
    return (
      <div className="min-h-lvh flex items-center justify-center w-full">
        Please Wait <Loader2 className="animate-spin transition-all" />
      </div>
    );

  const handleStartExam = (paperId: string, durationMinutes: number) => {
    if (isRunning && currentExamId !== paperId) {
      // toast.error("You already have a paper going on!");

      router.push(`/dashboard/student/paper/${paperId}`);
      return;
    }

    const examStartTime = new Date().toISOString();
    localStorage.setItem(`examStartTime_${paperId}`, examStartTime);
    startTimer(durationMinutes, paperId);
    router.push(`/dashboard/student/paper/${paperId}`);
  };

  const isExpired = (uploadDeadline: string) => {
    return new Date(uploadDeadline) < new Date();
  };

  return (
    <>
      <DashboardNavbar dashboardType="student" />
      <BlurGradient />
      <div className="min-h-screen flex-1 container lg:max-w-6xl mx-auto p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between w-full">
            <div>
              <h1 className="text-xl font-bold uppercase pb-2.5">
                Exam Instructions
              </h1>
              {INSTRUCTIONS.map((ins, idx) => (
                <p
                  key={idx}
                  className="text-sm leading-6.5 text-muted-foreground"
                >
                  {ins}
                </p>
              ))}
            </div>

            <div>
              <h2 className="font-bold text-4xl text-black">
                {studentData?.year}
              </h2>
            </div>
          </div>

          <Card className="mt-6 rounded-md border bg-white/80 py-2 px-4 backdrop-blur-sm shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paper</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Submit Deadline</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {papers && papers.length > 0 ? (
                  papers.map((paper) => {
                    const expired = isExpired(paper.uploadDeadline);
                    return (
                      <TableRow
                        key={paper._id}
                        className={expired ? "opacity-70" : ""}
                      >
                        <TableCell className="font-medium flex items-center gap-2">
                          <FileText size={18} className="text-primary" />
                          {paper.title}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock
                              size={16}
                              className="text-muted-foreground"
                            />
                            {Math.floor(paper.durationMinutes / 60) > 0 &&
                              `${Math.floor(paper.durationMinutes / 60)}h `}
                            {paper.durationMinutes % 60}m
                          </div>
                        </TableCell>
                        <TableCell>
                          {format(new Date(paper.uploadDeadline), "PP")}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            disabled={isRunning}
                            onClick={() =>
                              handleStartExam(paper._id, paper.durationMinutes)
                            }
                            size="sm"
                          >
                            Start Exam
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      No papers found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
