import React, { useState, useRef } from "react";
import { ReactComponent as Dnd } from "../../assets/svg/dnd.svg";
import { ToastNotify } from "../reusables/helpers/ToastNotify";

const DragDropMp3 = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const audioInputRef = useRef(null);

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
    const audioFile = e.dataTransfer.files[0];

    if (audioFile.type !== "audio/mpeg" && audioFile.type !== "audio/wav") {
      ToastNotify({
        type: "warning",
        message: "Only MP3 and WAV audio formats are allowed.",
        position: "top-right",
      });
      return;
    }

    setSelectedAudio(audioFile);
    onFileSelect(audioFile); // Call the callback function with the selected audio file
  };

  const handleUpload = () => {
    audioInputRef.current.click();
  };

  const handleAudioInputChange = (e) => {
    const audioFile = e.target.files[0];

    if (audioFile.type !== "audio/mpeg" && audioFile.type !== "audio/wav") {
      ToastNotify({
        type: "warning",
        message: "Only MP3 and WAV audio formats are allowed.",
        position: "top-right",
      });
      setSelectedAudio(null);
      return;
    }

    setSelectedAudio(audioFile);
    onFileSelect(audioFile); // Call the callback function with the selected audio file
  };

  const handleRemove = () => {
    setSelectedAudio(null);
    onFileSelect(null); // Call the callback function with null to indicate removal of the audio file
  };

  return (
    <div className="">
      <div
        className={`w-full font-jarkata bg-[#434141] relative flex flex-col items-center justify-center py-16 border border-[#939393] rounded-3xl ${
          isDragging ? "border-blue-500" : "border-white"
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e)}
      >
        {selectedAudio ? (
          <div className="text-center text-lg text-white">
            <p>File selected: {selectedAudio.name}</p>
            <button
              className="mt-4 px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
              onClick={handleRemove}
            >
              Remove File
            </button>
          </div>
        ) : (
          <div className="flex gap-5 text-center">
            <div className="mb-3">
              <Dnd />
            </div>
            <div className="text-lg text-white">
              <span
                className="text-[#ffffff] cursor-pointer"
                onClick={handleUpload}
              >
                Click to select file (MP3 or WAV)
              </span>{" "}
            </div>
            <input
              id="file-upload"
              type="file"
              ref={audioInputRef}
              className="hidden"
              onChange={handleAudioInputChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DragDropMp3;
