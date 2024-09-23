import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { useSelector, useDispatch } from "react-redux";
import { updateStart, updateSuccess, updateFailure } from "../slices/userSlice";

const checkImageLink = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};

const ImageWithFallback = ({ src, alt, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    const validateImage = async () => {
      const isValid = await checkImageLink(src);
      if (!isValid) {
        setImgSrc(null);
      }
    };
    validateImage();
  }, [src]);

  return (
    <div className="w-10 h-10 flex items-center justify-center mx-auto">
      {imgSrc ? (
        <img src={imgSrc} alt={alt} {...props} className="w-full h-full object-cover" />
      ) : null}
    </div>
  );
};

function DashUploadExcel() {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        dispatch(updateStart());
        try {
          // Simulating an update action
          dispatch(updateSuccess(currentUser));
        } catch (error) {
          dispatch(updateFailure(error.message));
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch, currentUser]);

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [filePreview, setFilePreview] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadProgress(0);
      setMessage("");
      previewExcel(selectedFile);
    }
  };

  const previewExcel = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 }).slice(0, 16);
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
      toast.success("File uploaded successfully");
    } catch (error) {
      setMessage("Error uploading file");
      toast.error("Error uploading file");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(88vh)] px-4 py-8">
      <div className="bg-white rounded-xl shadow-2xl border-2 p-6 md:p-8 w-full max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-6">
          Upload Excel File
        </h1>
        <div
          className={`border-2 border-dashed ${
            isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
          } rounded-lg flex flex-col gap-2 p-6 items-center cursor-pointer mb-6`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
        >
          <FileIcon className="w-12 h-12 text-blue-500" />
          <span className="text-sm font-medium text-gray-600 text-center">
            {file ? file.name : "Drag and drop a file or click to browse"}
          </span>
          <span className="text-xs text-gray-500">Excel files (.xlsx, .xls)</span>
        </div>
        {file && (
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Selected file: {file.name}
            </p>
            <div className="bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{uploadProgress}% uploaded</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="mb-6">
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
            className="w-full py-3 rounded-xl bg-blue-600 text-white text-lg font-bold transition-all hover:bg-blue-700 active:scale-[.98]"
          >
            Upload
          </button>
        </form>
        {message && <p className="text-center text-green-500 mb-6">{message}</p>}
      </div>

      {filePreview.length > 0 && (
        <div className="bg-white rounded-lg border-2 shadow-xl p-4 md:p-6 w-full max-w-[96rem] mx-auto overflow-hidden">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-blue-600">File Preview</h3>
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      {filePreview[0].map((col, index) => (
                        <th key={index} scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filePreview.slice(1, 16).map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => {
                          const isLinkColumn = filePreview[0][cellIndex].toLowerCase().includes('link');
                          return (
                            <td key={cellIndex} className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {isLinkColumn ? (
                                cell ? (
                                  <ImageWithFallback
                                    src={cell}
                                    alt="Preview"
                                    className="w-10 h-10 object-cover cursor-pointer"
                                    onClick={() => setSelectedImage(cell)}
                                  />
                                ) : null
                              ) : (
                                cell
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {filePreview.length > 16 && (
            <p className="text-sm text-gray-500 mt-4 text-center">
              Showing first 15 rows out of {filePreview.length - 1} total rows.
            </p>
          )}
        </div>
      )}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Full size" className="max-w-full max-h-full" />
        </div>
      )}
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
