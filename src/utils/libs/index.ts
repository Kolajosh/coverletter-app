import { ToastNotify } from "../../components/reusables/helpers/ToastNotify";

/**
 * Fallback for older browsers for copy to clipboard
 *
 * @param {string} text Item to be copied
 */
export const fallbackCopyTextToClipboard = (text: string): void => {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand("copy");

  document.body.removeChild(textArea);
};

/**
 * Copy to clipboard action
 *
 * @param {string} text Text string
 * @param {Event | null} event Optional event object
 */
export const copyToClipboard = (text: string, event?: Event | null): void => {
  const link =
    text ||
    (event?.target as HTMLElement)?.getAttribute("data-clipboard-text") ||
    "";

  ToastNotify({
    type: "success",
    message: "Copied",
    position: "top-right",
  });

  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(link);
    return;
  }

  navigator.clipboard
    .writeText(link)
    .catch(() => fallbackCopyTextToClipboard(link));
};

interface ErrorResponse {
  response?: {
    status?: number;
    data?: {
      concatenatedErrors?: string;
      message?: string;
      errors?: string[];
      messages?: string[];
      data?: {
        message?: string;
      };
      title?: string;
      errorMessage?: string;
    };
  };
  code?: string;
}

interface ResponseData {
  data?: {
    messages?: string[];
    concatenatedErrors?: string;
    message?: string;
    data?: {
      message?: string;
    };
  };
}

interface ResponseMessageHandlerProps {
  response?: ResponseData;
  error?: ErrorResponse | string;
}
export const responseMessageHandler = ({
  response,
  error,
}: ResponseMessageHandlerProps): string => {
  if (error) {
    if (typeof error === "string") {
      try {
        const errorResponse = JSON.parse(error);
        return typeof errorResponse?.message === "string"
          ? errorResponse.message
          : "An error occurred.";
      } catch {
        return "An error occurred.";
      }
    }

    if (error.code === "ECONNABORTED") {
      return "There seems to be a connection timeout, please try again.";
    }

    const errorData = error?.response?.data;

    if (error?.response?.status && error?.response?.status >= 500) {
      return "Oops! Something went wrong. Please try again.";
    }

    if (typeof errorData?.concatenatedErrors === "string") {
      return errorData.concatenatedErrors;
    }

    if (typeof errorData?.message === "string") {
      return errorData.message;
    }

    if (Array.isArray(errorData?.errors)) {
      return errorData.errors.join(", ");
    }

    if (Array.isArray(errorData?.messages)) {
      return errorData.messages.join(", ");
    }

    if (typeof errorData?.data?.message === "string") {
      return errorData.data.message;
    }

    return (
      (typeof errorData?.message === "string" && errorData.message) ||
      (typeof errorData?.title === "string" && errorData.title) ||
      (typeof errorData?.errorMessage === "string" && errorData.errorMessage) ||
      (error?.response?.status === 413 &&
        "File too large, please upload a smaller file") ||
      (error?.response?.status === 200 &&
        typeof errorData?.data?.message === "string" &&
        errorData.data.message) ||
      "An error occurred. Please try again."
    );
  }

  if (Array.isArray(response?.data?.messages)) {
    return response.data.messages.join(", ");
  }

  if (typeof response?.data?.concatenatedErrors === "string") {
    return response.data.concatenatedErrors;
  }

  return typeof response?.data?.message === "string"
    ? response.data.message
    : typeof response?.data?.data?.message === "string"
    ? response.data.data.message
    : "Success";
};
