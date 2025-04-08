import { useState } from "react";
import { ToastNotify } from "../../components/reusables/helpers/ToastNotify";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Define payload interface
interface CoverLetterPayload {
  fullname: string;
  contactEmail: string;
  jobRole: string;
  experience: string;
  company: string;
  skills?: string;
}

const useOpenApiRequest = () => {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_BARD_AI as string);

  const [prompt, setPrompt] = useState<string>("");
  const [apiResponse, setApiResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleCoverLetterRequest = async (
    payload: CoverLetterPayload
  ): Promise<void> => {
    setLoading(true);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Dear Hiring Manager,
      I am excited to apply for the Operations Manager position at your organization, as advertised on your page. With over 7 years of experience in streamlining processes, improving efficiency, and reducing operational costs, I have a proven track record of delivering measurable results that enhance organizational performance.
      In my previous role at ABC, I led a cross-functional team to redesign the supply chain process, which resulted in annual cost savings of (mention the amount). Additionally, I implemented a new inventory management system that reduced waste by 15% and improved delivery times by 20%. I am confident that my ability to identify inefficiencies, optimize workflows, and lead teams would make a significant impact at your organization.
      Thank you for considering my application. I would welcome the opportunity to discuss how my skills and achievements align with your operational goals. Please feel free to contact me at your phone number or your email address.
      Best regards,
      Your Full Name

      Hi, Please I need you to help me create a cover letter following the example above.
      Details below:
      Full name: ${payload.fullname},
      My Contact Email: ${payload.contactEmail},
      The Role I am Applying for: ${payload.jobRole},
      I have ${payload.experience} years of experience as a ${payload.jobRole},
      The Company I am applying to: ${payload.company},
      ${payload.skills ? `These are the skills I have: ${payload.skills}` : ""}

      PS: Make it at least two paragraphs long, and make it sound humane and professional
    `;

    try {
      const result = await model.generateContent(prompt);
      if (result?.response) {
        const response = result.response;
        const text = await response.text();
        setApiResponse(text);
      }
    } catch (error) {
      ToastNotify({
        type: "error",
        message: "Server Down, Try again later",
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    handleCoverLetterRequest,
    prompt,
    setPrompt,
    apiResponse,
    loading,
  };
};

export default useOpenApiRequest;
