import { useState } from "react";
import { Cross } from "../icons/Cross";
import { Button } from "./Button";

interface ShareModalProps {
  link: string;
  onClose: () => void;
}

export function ShareModal({ link, onClose }: ShareModalProps) {
  const [copyText, setCopyText] = useState("Copy Link");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopyText("Copied!");
      setTimeout(() => {
        setCopyText("Copy Link");
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      setCopyText("Failed to Copy");
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black-100 bg-opacity-50 transition-opacity">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
          aria-label="Close modal">
          <Cross />
        </button>

        <h3 className="mb-4 text-lg font-semibold text-gray-800">Share Link</h3>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={link}
            readOnly
            className="w-full rounded-md border border-gray-300 bg-gray-100 p-2 text-gray-700 focus:outline-none"
          />
        </div>

        <Button
          varient={"primary"}
          text={copyText}
          customCSS="mt-2 w-full flex justify-center"
          onClick={handleCopy}
        />
      </div>
    </div>
  );
}
