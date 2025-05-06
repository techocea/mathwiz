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
import { Search, Eye, Mail, Ban, UserPlus } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { useState } from "react";
import { MOCK_STUDENTS } from "@/lib/constants";

const DisplayStudentsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState(MOCK_STUDENTS);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      setStudents(MOCK_STUDENTS);
    } else {
      const FILTERED_STUDENTS = MOCK_STUDENTS.filter(
        (student) =>
          student.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          student.email.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setStudents(FILTERED_STUDENTS);
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
              <h1 className="text-3xl font-bold mb-2">Student Management</h1>
              <p className="text-muted-foreground">
                Manage students in your A/L Combined Mathematics class
              </p>
            </div>

            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add New Student
            </Button>
          </div>
        </div>

        <div className="rounded-lg border bg-card mb-8">
          <div className="p-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
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
                <TableHead>Student Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Completed Papers</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.length > 0 ? (
                students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      {student.name}
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.joinDate}</TableCell>
                    <TableCell>{student.completedPapers}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          student.status === "active"
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {student.status.charAt(0).toUpperCase() +
                          student.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          // onClick={() => handleViewStudent(student.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          // onClick={() => handleContactStudent(student.email)}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          // onClick={() => toggleStudentStatus(student.id)}
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    No students found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  );
};

export default DisplayStudentsPage;
