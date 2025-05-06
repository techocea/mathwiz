"use client";

import BlurGradient from "@/components/BlurGradient";
import { useTimer } from "@/components/contexts/TimerContext";
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
import { MOCK_PAPERS } from "@/lib/constants";
import { Clock, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const StudentDashboard = () => {
  const { isRunning, currentExamId, startTimer } = useTimer();
  const router = useRouter();

  const handleStartExam = (paperId: string, durationMinutes: number) => {
    if (isRunning && currentExamId !== paperId) {
      toast.error("You already have a paper going on!");
      return;
    }

    startTimer(durationMinutes, paperId);
    router.push(`/dashboard/student/paper/${paperId}`);
  };
  return (
    <>
      <DashboardNavbar dashboardType="student" />
      <BlurGradient />
      <div className="min-h-screen flex-1 container lg:max-w-6xl mx-auto p-6">
        <div className="flex flex-col space-y-4">
          <div>
            <h1 className="text-3xl font-bold">Your Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Browse and start your exams. Remember, once you start, the timer
              cannot be paused.
            </p>
          </div>

          <Card className="mt-6 rounded-md border bg-white/80 py-2 px-4 backdrop-blur-sm shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paper</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_PAPERS.map((paper) => {
                  //   const isExpired = isPaperExpired(paper.uploadDeadline);
                  const deadlineDate = new Date(paper.uploadDeadline);

                  return (
                    <TableRow
                      key={paper.id}
                      //   className={isExpired ? "opacity-70" : ""}
                    >
                      <TableCell className="font-medium flex items-center gap-2">
                        <FileText size={18} className="text-primary" />
                        {paper.title}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock size={16} className="text-muted-foreground" />
                          {paper.durationMinutes} minutes
                        </div>
                      </TableCell>
                      <TableCell
                      // className={isExpired ? "text-destructive" : ""}
                      >
                        {/* {formatDistanceToNow(deadlineDate, { addSuffix: true })} */}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          onClick={() =>
                            handleStartExam(paper.id, paper.durationMinutes)
                          }
                          size="sm"
                          //   disabled={isExpired}
                        >
                          Start Exam
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
