import React, {ChangeEvent, useState} from 'react';

const DocumentUploadForm: React.FC<{ propertyId: number; userId: number }> = ({ propertyId, userId }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [documentType, setDocumentType] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [uploadedBy, setUploadedBy] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [size, setSize] = useState<number>(0);
    const [url, setUrl] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setSelectedFile(files[0]);
        }
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (selectedFile) {
            //onUpload(selectedFile, documentType, title, uploadedBy, date, size, url);
            setSelectedFile(null);
            setDocumentType('');
            setTitle('');
            setUploadedBy('');
            setDate('');
            setSize(0);
            setUrl('');
        }
    };

    return (
        <div className="h-screen">
            <div className="bg-sky-100 min-h-screen p-5">
                <h6 className="text-blue-800 font-semibold text-lg mb-6">Document Upload</h6>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="fileInput" className="block mb-2">Select a file:</label>
                    <input
                        type="file"
                        id="fileInput"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="border border-gray-300 px-3 py-2 rounded-md mb-4"
                    />
                    <div className="flex flex-col mb-4">
                        <label htmlFor="documentTypeInput" className="text-sm font-bold text-blue-700 mb-2">Document Type:</label>
                        <input
                            type="text"
                            id="documentTypeInput"
                            value={documentType}
                            onChange={(e) => setDocumentType(e.target.value)}
                            className="border border-gray-300 px-3 py-2 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="titleInput" className="text-sm font-bold text-blue-700 mb-2">Title:</label>
                        <input
                            type="text"
                            id="titleInput"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border border-gray-300 px-3 py-2 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="uploadedByInput" className="text-sm font-bold text-blue-700 mb-2">Uploaded By:</label>
                        <input
                            type="text"
                            id="uploadedByInput"
                            value={uploadedBy}
                            onChange={(e) => setUploadedBy(e.target.value)}
                            className="border border-gray-300 px-3 py-2 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="dateInput" className="text-sm font-bold text-blue-700 mb-2">Date:</label>
                        <input
                            type="text"
                            id="dateInput"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="border border-gray-300 px-3 py-2 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="sizeInput" className="text-sm font-bold text-blue-700 mb-2">Size:</label>
                        <input
                            type="number"
                            id="sizeInput"
                            value={size}
                            onChange={(e) => setSize(Number(e.target.value))}
                            className="border border-gray-300 px-3 py-2 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="urlInput" className="text-sm font-bold text-blue-700 mb-2">URL:</label>
                        <input
                            type="text"
                            id="urlInput"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="border border-gray-300 px-3 py-2 rounded-md"
                        />
                    </div>
                    <div className="text-red-500 mb-4">{/* Display error message here if needed */}</div>
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Upload
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DocumentUploadForm;
