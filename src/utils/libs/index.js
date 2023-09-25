import { ToastNotify } from "../../components/reusables/helpers/ToastNotify";

/**
 * Fallback for older browsers for copy to clipboard
 *
 * @param {string} text Item to be copied
 */
export const fallbackCopyTextToClipboard = (text) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  document.body.removeChild(textArea);
};

/**
 * Copy to clipboard action
 *
 * @param {string} text Text string
 * @param {Event} event Event object
 */
export const copyToClipboard = (text, event) => {
  const link = text || event?.getAttribute("data-clipboard-text");

  ToastNotify({
    type: "success",
    message: "Copied",
    position: "top-right",
  });

  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(link);
    return;
  }
  navigator.clipboard.writeText(link);
};

export const responseMessageHandler = ({ response, error }) => {
  if (error) {
    if (error.code === "ECONNABORTED") {
      return "There seems to be a connection timeout, please try again.";
    }

    if (error?.response?.status >= 500) {
      return "Oops! Something went wrong. Please try again.";
      // return error;
    }

    if (error.response?.data?.concatenatedErrors) {
      return error.response?.data?.concatenatedErrors;
    }
    if (error?.response?.data?.message) {
      return error?.response?.data?.message;
    }
    if (error?.response?.data?.errors) {
      return error?.response?.data?.errors?.join(", ");
    }
    if (error?.response?.data?.messages?.length) {
      return error?.response?.data?.messages?.join(", ");
    }

    if (typeof error === "string") {
      const errorResponse = JSON.parse(error);
      return errorResponse?.message;
    }

    if (error?.response?.data?.data?.message) {
      return error?.response?.data?.data?.message;
    }

    return (
      error?.response?.data?.message ||
      error?.response?.data?.data ||
      error?.response?.data?.title ||
      error?.response?.data ||
      error?.response?.data?.data?.message ||
      error?.response?.data?.errorMessage ||
      (error?.response?.status === 413 &&
        "File too large, please upload a smaller file") ||
      (error?.response?.status === 200 &&
        error?.response?.data?.data?.message) ||
      "An error occurred. Please try again."
    );
  }

  if (response?.data?.messages?.length) {
    return response?.data?.messages?.join(", ");
  }

  if (response?.data?.concatenatedErrors) {
    return response?.data?.concatenatedErrors;
  }

  if (response?.data?.message) {
    return response?.data?.message;
  }

  return response?.data?.message || response?.data?.data?.message || "Success";
};
