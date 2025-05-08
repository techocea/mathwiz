"use client";

import DashboardNavbar from "@/components/DashboardNavbar";
import BlurGradient from "@/components/BlurGradient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Plus, Search, Edit, Trash, Eye } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import { ADMIN_MOCK_PAPERS } from "@/lib/constants";
import { useRouter } from "next/navigation";
import axios from "axios";

interface PaperProps {
  _id: string;
  title: string;
  durationMinutes: number;
  paperUrl: string;
  uploadDeadline: string;
  createdAt: string;
}

const DisplayPapersPage = () => {
  const router = useRouter();
  const [papers, setPapers] = useState<PaperProps[] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAllPapers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/paper");
      setPapers(res.data.papers);
    } catch (error) {
      console.log("Failed to fetch papers: ", error);
      router.push("/dashboard/admin");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPapers();
  }, []);

  return (
    <>
      <BlurGradient />
      <DashboardNavbar dashboardType="admin" />
      <main className="min-h-screen flex-1 container lg:max-w-6xl mx-auto p-6">
        <div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Paper Management</h1>
              <p className="text-muted-foreground">
                Create and manage A/L Combined Mathematics papers
              </p>
            </div>

            <Button
              size="lg"
              onClick={() => router.push("/dashboard/admin/papers/create")}
              className="cursor-pointer"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Paper
            </Button>
          </div>

          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paper Title</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Time Limit</TableHead>
                  <TableHead>Submissions</TableHead>
                  {/* <TableHead>Status</TableHead> */}
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {papers && papers.length > 0 ? (
                  papers.map((paper) => (
                    <TableRow key={paper?._id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          {paper?.title}
                        </div>
                      </TableCell>
                      <TableCell>{paper?.createdAt}</TableCell>
                      <TableCell>{paper?.durationMinutes} mins</TableCell>
                      <TableCell>{"paper?.submissions"}</TableCell>

                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            //   onClick={() => handleView(paper.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            //   onClick={() => handleEdit(paper.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            //   onClick={() => handleDelete(paper.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
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

export default DisplayPapersPage;
