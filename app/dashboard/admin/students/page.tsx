"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ban, UserPlus, Loader2, Check, X } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface TuitionTypeProps {
  theory: boolean;
  revision: boolean;
  paper: boolean;
}

interface StudentProps {
  _id: string;
  firstName: string;
  lastName: string;
  school: string;
  email: string;
  year: string;
  medium: string;
  contact: number;
  tuitionType: TuitionTypeProps;
  status: "pending" | "approved" | "rejected" | "banned";
}

const DisplayStudentsPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState<StudentProps[]>([]);

  useEffect(() => {
    const fetchAllStudents = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/admin/students");
        setStudents(res.data.students);
      } catch (error) {
        console.log("Failed to fetch student data:", error);
        router.push("/dashboard/admin");
      } finally {
        setLoading(false);
      }
    };

    fetchAllStudents();
  }, [router]);

  const updateStatus = async (
    studentId: string,
    newStatus: StudentProps["status"]
  ) => {
    try {
      await axios.put("/api/admin/update-status", {
        studentId,
        newStatus,
      });

      setStudents((prev) =>
        prev.map((student) =>
          student._id === studentId
            ? { ...student, status: newStatus }
            : student
        )
      );

      toast.success(`Student status update to ${newStatus}`);
    } catch (error) {
      console.log("Error updating status: ", error);
      toast.error("Failed to update status");
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-50 text-green-700";
      case "rejected":
        return "bg-red-50 text-red-700";
      case "banned":
        return "bg-red-50 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading)
    return (
      <div className="min-h-lvh flex items-center justify-center w-full">
        Please Wait <Loader2 className="animate-spin transition-all" />
      </div>
    );

  return (
    <main className="min-h-screen flex-1 container lg:max-w-6xl mx-auto p-6">
      <div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Student Management</h1>
            <p className="text-muted-foreground">
              Manage students in your A/L Combined Mathematics class
            </p>
          </div>

          <Button
            size="lg"
            onClick={() => router.push("/dashboard/admin/students/create")}
            className="cursor-pointer"
          >
            <UserPlus className="mr-1 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      {/* <div className="rounded-lg border bg-card mb-8">
          <div className="p-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                // value={searchQuery}
                // onChange={handleSearch}
                className="border-0 focus-visible:ring-0 bg-transparent"
              />
            </div>
          </div>
        </div> */}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>School</TableHead>
            <TableHead>Medium</TableHead>
            <TableHead>Tuition Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students && students.length > 0 ? (
            students.map((student) => (
              <TableRow key={student?._id}>
                <TableCell className="font-medium">
                  {student?.firstName} {student?.lastName}
                </TableCell>
                <TableCell>{student?.email}</TableCell>
                <TableCell>{student?.contact}</TableCell>
                <TableCell>{student?.year}</TableCell>
                <TableCell>{student?.school}</TableCell>
                <TableCell className="capitalize">{student?.medium}</TableCell>
                <TableCell>
                  {student?.tuitionType
                    ? [
                      student.tuitionType.theory ? "Theory" : null,
                      student.tuitionType.revision ? "Revision" : null,
                      student.tuitionType.paper ? "Paper" : null,
                    ]
                      .filter(Boolean)
                      .join(", ") || "None"
                    : "None"}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                      student.status
                    )}`}
                  >
                    {student.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {student.status === "pending" ? (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={loading}
                          onClick={() => updateStatus(student._id, "approved")}
                        >
                          <Check className="text-green-600 h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={loading}
                          onClick={() => updateStatus(student._id, "rejected")}
                        >
                          <X className="text-destructive h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={loading}
                        onClick={() => updateStatus(student._id, "banned")}
                      >
                        <Ban className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-6">
                No students found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </main>
  );
};

export default DisplayStudentsPage;
