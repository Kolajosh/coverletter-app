import axios from "axios";
import { OpenAI } from "openai";
import React, { useState } from "react";

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
          model: "gpt-3.5-turbo",
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
      console.log(error);
      setLoading(false);
    }
  };

  return { handleCoverLetterRequest, prompt, setPrompt, apiResponse, loading };
};

export default useOpenApiRequest;
