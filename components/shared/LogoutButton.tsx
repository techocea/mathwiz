"use client";

import axios from "axios";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout", {}, { withCredentials: true });
      router.push("/");
    } catch (error) {
      console.log("Error in logging out session: ", error);
      toast.error("Failed to logout user");
    }
  };
  return (
    <Button onClick={handleLogout} variant="destructive">
      Logout <LogOut />
    </Button>
  );
};

export default LogoutButton;
