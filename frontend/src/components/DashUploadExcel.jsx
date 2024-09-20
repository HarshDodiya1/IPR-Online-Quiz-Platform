import React, { useState, useRef } from "react";
import axios from "axios";

function DashUploadExcel() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadProgress(0);
      setMessage(""); // Clear message on new file selection
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (
      droppedFile &&
      (droppedFile.name.endsWith(".xlsx") || droppedFile.name.endsWith(".xls"))
    ) {
      setFile(droppedFile);
      setUploadProgress(0);
      setMessage(""); // Clear message on new file drop
    } else {
      setMessage("Please drop a valid Excel file (.xlsx or .xls)");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "/api/questions/upload-excel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );
      console.log("This is the response while upload excel : ", response);
      setMessage("File uploaded successfully");
    } catch (error) {
      setMessage("Error uploading file");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 space-y-4 w-full max-w-md">
        <div
          className={`border-2 border-dashed ${
            isDragging ? "border-blue-500 bg-blue-50" : "border-gray-200"
          } rounded-lg flex flex-col gap-1 p-6 items-center cursor-pointer`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
        >
          <FileIcon className="w-12 h-12 text-gray-400" />
          <span className="text-sm font-medium text-gray-500">
            {file ? file.name : "Drag and drop a file or click to browse"}
          </span>
          <span className="text-xs text-gray-500">
            Excel files (.xlsx, .xls)
          </span>
        </div>
        {file && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700">
              Selected file: {file.name}
            </p>
            <div className="mt-2 bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {uploadProgress}% uploaded
            </p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            id="file"
            type="file"
            onChange={handleFileChange}
            accept=".xlsx, .xls"
            className="hidden"
            ref={fileInputRef}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
          >
            Upload
          </button>
        </form>
        {message && <p className="text-center text-green-500">{message}</p>}
      </div>
    </div>
  );
}

function FileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

export default DashUploadExcel;
