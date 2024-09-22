import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import * as XLSX from "xlsx"; // Import xlsx to parse the excel file

function DashUploadExcel() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [filePreview, setFilePreview] = useState([]); // State to hold the preview data
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadProgress(0);
      setMessage("");
      previewExcel(selectedFile); // Preview the excel file upon selection
    }
  };

  const previewExcel = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 }).slice(0, 15); // Get top 5 rows
      setFilePreview(rows);
    };
    reader.readAsArrayBuffer(file);
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
      setMessage("");
      previewExcel(droppedFile);
    } else {
      setMessage("Please drop a valid Excel file (.xlsx or .xls)");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file");
      setMessage("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/questions/upload-excel", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });
      setMessage("File uploaded successfully");
    } catch (error) {
      setMessage("Error uploading file");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  px-4 md:px-10 min-h-[48.5rem] ">
      <div className="bg-white shadow-md rounded-lg p-6 md:p-10 m-5 space-y-4 w-full max-w-md md:max-w-lg lg:max-w-2xl">
        <div
          className={`border-2 border-dashed ${
            isDragging ? "border-orange-500 bg-orange-50" : "border-gray-200"
          } rounded-lg flex flex-col gap-1 p-6 items-center cursor-pointer`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
        >
          <FileIcon className="w-12 h-12 text-gray-400" />
          <span className="text-sm font-medium text-gray-500 text-center">
            {file ? file.name : "Drag and drop a file or click to browse"}
          </span>
          <span className="text-xs text-gray-500">Excel files (.xlsx, .xls)</span>
        </div>
        {file && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700">
              Selected file: {file.name}
            </p>
            <div className="mt-2 bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-orange-500 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{uploadProgress}% uploaded</p>
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
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
          >
            Upload
          </button>
        </form>
        {message && <p className="text-center text-green-500">{message}</p>}
        {filePreview.length > 0 && (
          <div className="mt-6 bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">File Preview (Top 15 Rows):</h3>
            <div className="overflow-x-auto max-w-full" style={{ maxHeight: 'calc(100vh - 400px)' }}>
              <table className="table-auto w-full text-left border-collapse border border-gray-300 shadow-lg">
                <thead>
                  <tr className="bg-orange-100">
                    {filePreview[0].map((col, index) => (
                      <th key={index} className="border border-gray-300 px-3 py-2 text-xs md:text-sm font-semibold text-gray-700">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filePreview.slice(1).map((row, rowIndex) => (
                    <tr key={rowIndex} className="bg-white hover:bg-orange-50 transition-colors duration-200">
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="border border-gray-300 px-3 py-2 text-xs md:text-sm">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
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
