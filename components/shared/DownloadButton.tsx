import { toast } from "sonner";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

interface DownloadButtonProps {
  variant:
  | "link"
  | "default"
  | "outline"
  | "secondary"
  | "ghost"
  | "destructive"
  | null;
  publicId: string;
  fileName: string;
  enableIcon: boolean;
}

const DownloadButton = ({
  publicId,
  fileName,
  variant,
  enableIcon,
}: DownloadButtonProps) => {
  const handleDownload = async () => {
    try {
      const url = `/api/download?public_id=${encodeURIComponent(
        publicId
      )}&filename=${encodeURIComponent(fileName)}`;

      window.open(url, "_blank");
      console.log("fileUrl passed to download:", url);
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download file. Please try again.");
    }
  };

  return (
    <Button
      size="sm"
      variant={variant}
      onClick={handleDownload}
      className="cursor-pointer p-4 flex items-center text-sm font-normal text-center justify-center gap-2"
    >
      {enableIcon ? <Download className="w-4 h-4" /> : null} Download
    </Button>
  );
};

export default DownloadButton;
