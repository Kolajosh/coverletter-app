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
