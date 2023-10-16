import axios from "axios";
import { OpenAI } from "openai";
import React, { useState } from "react";
import { ToastNotify } from "../../components/reusables/helpers/ToastNotify";

const useOpenApiRequest = () => {
  const openai = new OpenAI({
    baseURL: "https://api.nova-oss.com/v1/",
    apiKey: process.env.REACT_APP_NOVA_AI,
    dangerouslyAllowBrowser: true,
  });

  const [prompt, setPrompt] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCoverLetterRequest = async (payload) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.nova-oss.com/v1/chat/completions",
        {
          model: "gpt-4-0613",
          messages: [
            { role: "system", content: payload },
            { role: "user", content: "prompt" },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_NOVA_AI}`,
          },
        }
      );
      setApiResponse(response?.data?.choices[0]?.message?.content);
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
