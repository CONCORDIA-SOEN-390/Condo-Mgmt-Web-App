import React, { ChangeEvent, useState } from "react";
import { UploadButton } from "@/utils/uploadthing";

const DocumentUploadForm: React.FC<{ propertyId: number; userId: number }> = ({ propertyId, userId }) => {
const [title, setTitle] = useState<string>("");
const [url, setUrl] = useState<string>("");
const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
        const response = await fetch("/api/addDocument", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ propertyId, title, url }),
        });
        const data = await response.json();
        console.log(data);
        setFormSubmitted(true);
        setTimeout(() => {
            setFormSubmitted(false);
        }, 5000);
    } catch (error) {
        console.error(error);
    }
};

return (
    <div>
        <div className="bg-sky-100 min-h-screen p-5">
            <h6 className="text-blue-800 font-semibold text-lg mb-6">Document Upload</h6>
            <form onSubmit={handleSubmit}>
                <label htmlFor="fileInput" className="block mb-2">
                    Select a file:
                </label>
                <UploadButton
                    appearance={{
                        button({ ready, isUploading }) {
                            return {
                                fontSize: "1rem",
                                color: "black",
                                ...(ready && { color: "#ecfdf5" }),
                                ...(isUploading && { color: "#d1d5db" }),
                            };
                        },
                        container: {
                            marginTop: "1rem",
                        },
                        allowedContent: {
                            color: "#a1a1aa",
                        },
                    }}
                    content={{
                        button({ ready }) {
                            if (ready) return <div>Document</div>;
                            return "Loading...";
                        },
                        allowedContent({ ready, fileTypes, isUploading }) {
                            if (!ready) return "Checking what you allow";
                            if (isUploading) return "Seems like stuff is uploading";
                            return `Max 4MB: ${fileTypes.join(", ")}`;
                        },
                    }}
                    endpoint="pdfUploader"
                    onClientUploadComplete={(res) => {
                        // Do something with the response
                        console.log(res[0]["url"]);
                        setUrl(res[0]["url"]);
                        alert("Upload Completed");
                    }}
                    onUploadError={(error: Error) => {
                        // Do something with the error.
                        alert(`ERROR! ${error.message}`);
                    }}
                />

                <div className="flex flex-col mb-4">
                    <label htmlFor="titleInput" className="text-sm font-bold text-blue-700 mb-2">
                        Title:
                    </label>
                    <input type="text" id="titleInput" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-gray-300 px-3 py-2 rounded-md" />
                </div>
                <div className="flex justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto">
                        Upload
                    </button>
                </div>
                {formSubmitted && (
                    <div className="text-green-500 mb-4  text-center">Document submitted</div>
                )}
            </form>
        </div>
    </div>
);
};

export default DocumentUploadForm;
