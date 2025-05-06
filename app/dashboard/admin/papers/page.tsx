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
import { useState } from "react";
import { ADMIN_MOCK_PAPERS } from "@/lib/constants";

const DisplayPapersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [papers, setPapers] = useState(ADMIN_MOCK_PAPERS);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      setPapers(ADMIN_MOCK_PAPERS);
    } else {
      const FILTERED_PAPERS = ADMIN_MOCK_PAPERS.filter((paper) =>
        paper.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setPapers(FILTERED_PAPERS);
    }
  };

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

            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Paper
            </Button>
          </div>

          <div className="rounded-lg border bg-card mb-8">
            <div className="p-4">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search papers..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="border-0 focus-visible:ring-0 bg-transparent"
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paper Title</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Time Limit</TableHead>
                  <TableHead>Submissions</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {papers.length > 0 ? (
                  papers.map((paper) => (
                    <TableRow key={paper.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          {paper.title}
                        </div>
                      </TableCell>
                      <TableCell>{paper.createdAt}</TableCell>
                      <TableCell>{paper.timeLimit} mins</TableCell>
                      <TableCell>{paper.submissions}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            paper.status === "active"
                              ? "bg-green-50 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {paper.status.charAt(0).toUpperCase() +
                            paper.status.slice(1)}
                        </span>
                      </TableCell>
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
