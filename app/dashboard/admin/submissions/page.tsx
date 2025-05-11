"use client";

import DashboardNavbar from "@/components/DashboardNavbar";
import BlurGradient from "@/components/BlurGradient";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Download, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

interface Submission {
  _id: string;
  file: string;
  submittedAt: string;
  studentId: {
    firstName: string;
    lastName: string;
    contact: string;
  };
  paperId: {
    title: string;
  };
}

const DisplaySubmissionsPage = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/submissions");
        setSubmissions(res.data.submissions);
      } catch (error) {
        console.log("Failed to fetch submissions: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading)
    return (
      <div className="min-h-lvh flex items-center justify-center w-full">
        Please Wait <Loader2 className="animate-spin transition-all" />
      </div>
    );

  return (
    <>
      <BlurGradient />
      <DashboardNavbar dashboardType="admin" />
      <main className="min-h-screen flex-1 container lg:max-w-6xl mx-auto p-6">
        <div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Student Submissions</h1>
              <p className="text-muted-foreground">
                View and manage all student examination submissions
              </p>
            </div>
          </div>

          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Contact Number</TableHead>
                  <TableHead>Paper Title</TableHead>
                  <TableHead>View Paper</TableHead>
                  <TableHead className="text-right">Submission Time</TableHead>
                  {/* <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.length > 0 ? (
                  submissions.map((submission) => (
                    <TableRow key={submission?._id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center capitalize gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          {submission?.studentId?.firstName}{" "}
                          {submission?.studentId?.lastName}
                        </div>
                      </TableCell>
                      <TableCell>{submission?.studentId?.contact}</TableCell>
                      <TableCell>{submission?.paperId?.title}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="link"
                          className="cursor-pointer"
                          onClick={() =>
                            toast.success(
                              `downloading ${submission?.paperId?.title}`
                            )
                          }
                        >
                          <Download className="h-4 w-4" />

                          <a href={submission?.file}>Download</a>
                        </Button>
                      </TableCell>
                      <TableCell className="text-right">
                        {new Date(submission.submittedAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      No papers found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </>
  );
};

export default DisplaySubmissionsPage;
