import { useState, type ChangeEvent } from "react";
import axios from "axios";
import { Cross } from "../icons/Cross";
import { Button } from "./Button";

const apiUrl = import.meta.env.VITE_API_URL;
interface Content {
  _id: string;
  title: string;
  description?: string;
}

interface EditContentModalProps {
  content: Content;
  onClose: () => void;
  setUpdateUI: (value: boolean) => void;
  updateUI: boolean;
}

interface FormData {
  title: string;
  description: string;
}

export function EditContentModal({
  content,
  onClose,
  setUpdateUI,
  updateUI,
}: EditContentModalProps) {
  const [formData, setFormData] = useState<FormData>({
    title: content.title,
    description: content.description || "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`${apiUrl}/content/${content._id}`, formData, {
        withCredentials: true,
      });
      setUpdateUI(!updateUI);
      onClose();
    } catch (error) {
      console.error("Failed to update content:", error);
      alert("There was an error updating your content.");
    }
  };

  return (
    <div className="absolute top-0 left-0 text-white h-full w-full flex items-center justify-center bg-black-100 z-50">
      <div className="bg-white h-auto w-96 text-purple-500 rounded-lg p-6 shadow-xl">
        <div className="flex justify-between items-center mb-5">
          <div className="font-medium text-xl">Edit Content</div>
          <div className="hover:cursor-pointer p-1" onClick={onClose}>
            <Cross />
          </div>
        </div>

        <label htmlFor="title" className="text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Title"
          className="bg-gray-100 w-full rounded-md py-2 px-3 text-black my-2 border border-gray-300 focus:ring-purple-500 focus:border-purple-500"
        />

        <label
          htmlFor="description"
          className="text-sm font-medium text-gray-700 mt-4 block">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
          rows={4}
          className="bg-gray-100 w-full rounded-md py-2 px-3 text-black my-2 border border-gray-300 focus:ring-purple-500 focus:border-purple-500"
        />

        <div className="flex mt-7 justify-center">
          <Button
            varient="primary"
            customCSS="w-full flex justify-center"
            text="Save Changes"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
