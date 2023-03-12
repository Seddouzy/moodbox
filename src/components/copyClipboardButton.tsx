import { ClipboardIcon } from "@heroicons/react/24/outline";
import React from "react";
import { toast } from "react-toastify";

interface CopyButtonProps {
  text: string;
}

const CopyButton = ({ text }: CopyButtonProps) => {
  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");
        toast.success("Clipboard loaded! 👌");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        toast.error("Error copying to Clipboard. 🤯");
      });
  };

  return (
    <button className="btn" onClick={handleCopyClick}>
      <ClipboardIcon className="flex h-10 w-10 shrink-0 items-center justify-center sm:h-7 sm:w-7" />
      Copy
    </button>
  );
};

export default CopyButton;
