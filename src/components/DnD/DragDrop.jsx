import React, { useState, useRef } from "react";
import { ReactComponent as Dnd } from "../../assets/svg/dnd.svg";
import { ToastNotify } from "../reusables/helpers/ToastNotify";

const DragDrop = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    // Handle the dropped file here
    setSelectedFile(file);
    onFileSelect(file); // Call the callback function with the selected file
  };

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 1048576) {
      // File size exceeds 1MB
      ToastNotify({
        type: "warning",
        message: "File size exceeds the maximum limit of 1MB.",
        position: "top-right",
      });

      setSelectedFile(null);
      return;
    }
    // Handle the uploaded file here
    setSelectedFile(file);
    onFileSelect(file); // Call the callback function with the selected file
  };

  const handleRemove = () => {
    setSelectedFile(null);
    onFileSelect(null); // Call the callback function with null to indicate removal of the file
  };

  return (
    <div className="flex gap-10 justify-between">
      <div
        className={`w-full font-jarkata bg-[#434141] relative flex flex-col items-center justify-center py-16 border border-[#939393] rounded-3xl ${
          isDragging ? "border-blue-500" : "border-white"
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e)}
      >
        {selectedFile ? (
          <div className="text-center text-lg text-white">
            <p>File selected: {selectedFile.name}</p>
            <button
              className="mt-4 px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
              onClick={handleRemove}
            >
              Remove File
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <Dnd />
            </div>
            <div className="text-lg text-white">
              <span
                className="text-[#ffffff] cursor-pointer"
                onClick={handleUpload}
              >
                Click to select file
              </span>{" "}
            </div>
            <input
              id="file-upload"
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileInputChange}
            />
          </div>
        )}
      </div>
      <div className="w-full flex flex-col justify-end font-jarkata text-xl">
        File Requirements
        <ul className="space-y-3 mt-4 list-disc text-sm">
          <li>Square cover art</li>
          <li>JPG or PNG format</li>
          <li>At least 2048 X 2048 pixel size</li>
        </ul>
      </div>
    </div>
  );
};

export default DragDrop;
