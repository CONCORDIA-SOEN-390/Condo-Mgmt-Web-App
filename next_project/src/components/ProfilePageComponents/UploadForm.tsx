"use client";
import React, { useState } from "react";
import "./UploadForm.css";

function UploadForm() {
  const [fileSelected, setfileSelected] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setfileSelected(file);
    } else {
      setfileSelected(null);
      alert("Please select a PDF file.");
    }
  };

  const handleUpload = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (fileSelected) {
      console.log("File uploaded:", fileSelected);
      // Add backend
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button type="submit" className="UploadButton">
        Upload
      </button>
    </form>
  );
}

export default UploadForm;
