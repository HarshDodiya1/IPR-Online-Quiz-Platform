import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function AdminUploadExcel() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const { token } = useSelector((state) => state.auth);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("File uploaded successfully");
    } catch (error) {
      console.log("Full error object:", error);
      console.log("Upload error:", error.response?.data || error.message);
      setMessage(
        `Error uploading file: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Upload Excel Sheet</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <input
            type="file"
            onChange={handleFileChange}
            accept=".xlsx, .xls"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Upload
          </button>
        </div>
      </form>
      {message && <p className="text-center text-green-500">{message}</p>}
    </div>
  );
}

export default AdminUploadExcel;
