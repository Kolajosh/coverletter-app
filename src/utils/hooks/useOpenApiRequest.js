import React, { useState } from "react";
import axios from "axios";
import { OpenAI } from "openai";
import { v4 as uuidv4 } from "uuid"; // Import the uuid library
import { ToastNotify } from "../../components/reusables/helpers/ToastNotify";
import { GoogleGenerativeAI } from "@google/generative-ai";

const useOpenApiRequest = () => {
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_BARD_AI);

  const [prompt, setPrompt] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCoverLetterRequest = async (payload) => {
    setLoading(true);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = payload;

    try {
      const result = await model.generateContent(prompt);
      const response = await result?.response;
      const text = response?.text()
      setApiResponse(text);
      setLoading(false);
    } catch (error) {
      ToastNotify({
        type: "error",
        message: "Server Down, Try again later",
        position: "top-right",
      });
      setLoading(false);
    }
  };

  return { handleCoverLetterRequest, prompt, setPrompt, apiResponse, loading };
};

export default useOpenApiRequest;
