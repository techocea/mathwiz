"use client";

import DashboardNavbar from "@/components/DashboardNavbar";
import BlurGradient from "@/components/BlurGradient";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

interface InquiryProps {
  _id: string;
  name: string;
  email: string;
  contact: string;
  message: string;
  createdAt: string;
}

const InquiryPage = () => {
  const [loading, setLoading] = useState(false);
  const [inquiries, setInquiries] = useState<InquiryProps[] | null>(null);

  useEffect(() => {
    const fetchAllInquiries = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/contact");
        setInquiries(res.data.inquiries);
      } catch (error) {
        console.log("Failed to fetch inquiries: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllInquiries();
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
              <h1 className="text-3xl font-bold mb-2">Inquiry Management</h1>
              <p className="text-muted-foreground">
                Manage your class inquiries
              </p>
            </div>
          </div>

          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>email</TableHead>
                  <TableHead>contact</TableHead>
                  <TableHead>message</TableHead>
                  <TableHead
                    className="flex items-center justify-center"
                    align="justify"
                  >
                    Submitted date
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inquiries && inquiries.length > 0 ? (
                  inquiries.map((inquiry) => (
                    <TableRow key={inquiry._id}>
                      <TableCell>{inquiry.name}</TableCell>
                      <TableCell>{inquiry.contact}</TableCell>
                      <TableCell>{inquiry.email}</TableCell>
                      <TableCell>{inquiry.message}</TableCell>
                      <TableCell
                        className="flex items-center justify-center"
                        align="justify"
                      >
                        {format(new Date(inquiry.createdAt), "PPP")}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      No inquiries found
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

export default InquiryPage;
