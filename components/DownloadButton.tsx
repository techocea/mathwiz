"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

interface DownloadButtonProps {
  publicId: string;
  fileName: string;
  variant:
    | "link"
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | null;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  publicId,
  fileName,
  variant,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const url = `/api/download?public_id=${encodeURIComponent(
        publicId
      )}&filename=${encodeURIComponent(fileName)}`;

      window.open(url, "_blank");
      console.log("fileUrl passed to download:", url);
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download file. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isDownloading}
      variant={variant}
      className="cursor-pointer"
    >
      {isDownloading ? (
        "Downloading..."
      ) : (
        <div className="flex items-center justify-center gap-2">
          <Download className="w-4 h-4" />
          Download
        </div>
      )}
    </Button>
  );
};

export default DownloadButton;
