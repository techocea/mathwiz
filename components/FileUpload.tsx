"use client";

import { UploadDropzone } from "@/lib/uploadthing";

const FileUpload = () => {
  return (
    <main>
      <UploadDropzone
        endpoint="pdfUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
};

export default FileUpload;
