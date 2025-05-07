"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import DashboardNavbar from "@/components/DashboardNavbar";
import BlurGradient from "@/components/BlurGradient";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Users, Clock, Calendar, Loader2 } from "lucide-react";
import { ADMIN_MOCK_PAPERS, MOCK_STUDENTS } from "@/lib/constants";

const TOTAL_STUDENTS = MOCK_STUDENTS.length;
const TOTAL_PAPERS = ADMIN_MOCK_PAPERS.length;

const AdminDashboardPage = () => {
  const router = useRouter();
  const [adminData, setAdminData] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/admin", { withCredentials: true });
      setAdminData(res.data);
    } catch (error) {
      console.error("Failed to fetch admin data:", error);
      router.push("/admin");
    } finally {
      setLoading(false);
    }
  };

  // const handleLogout = async () => {
  //   await axios.post("/api/admin/logout");
  //   router.push("/admin");
  // };

  useEffect(() => {
    fetchAdminData();
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome, Admin!</h1>
            <p className="text-muted-foreground">
              Here's an overview of your A/L Combined Mathematics class
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Students
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{TOTAL_STUDENTS}</div>
                <p className="text-xs text-muted-foreground pt-1">
                  Active student accounts
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Papers
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{TOTAL_PAPERS}</div>
                <p className="text-xs text-muted-foreground pt-1">
                  Papers created
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Recent activity from your class
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">
                        Dasun Silva submitted Paper 03
                      </p>
                      <p className="text-sm text-muted-foreground">
                        2 hours ago
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">
                        Paper 04 deadline approaching
                      </p>
                      <p className="text-sm text-muted-foreground">
                        6 hours remaining
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">
                        Malini Perera started Paper 05
                      </p>
                      <p className="text-sm text-muted-foreground">
                        30 minutes ago
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Frequently used admin actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <Button
                    size="lg"
                    onClick={() => router.push("/dashboard/admin/papers")}
                    className="w-full justify-start cursor-pointer"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Manage Papers
                  </Button>
                  <Button
                    size="lg"
                    onClick={() =>
                      router.push("/dashboard/admin/students")
                    }
                    className="w-full justify-start cursor-pointer"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Manage Students
                  </Button>
                  <Button
                    disabled
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Upload Marksheet (coming soon)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminDashboardPage;
