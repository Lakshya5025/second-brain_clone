import { useState } from "react";
import { Cross } from "../icons/Cross";
import { Button } from "./Button";

function Input({
  placeholder,
  type = "text",
}: {
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="my-2">
      <input
        className="bg-grey-200 w-full rounded-md py-2 pl-2"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}

const buttonData = [
  { text: "image", type: "image" },
  { text: "doc", type: "doc" },
  { text: "video", type: "video" },
  { text: "audio", type: "audio" },
  { text: "tweet", type: "tweet" },
];
export function CreateContentModel({ onClose }: { onClose: () => void }) {
  const [activeType, setActiveType] = useState<string | null>(null);
  const renderInputs = () => {
    switch (activeType) {
      case "image":
      case "video":
      case "doc":
      case "audio":
        return (
          <>
            <Input placeholder="Title" />
            <Input placeholder="Link (e.g., https://...)" />
            <Input placeholder="Description" />
          </>
        );
      case "tweet":
        return (
          <>
            <Input placeholder="Link to Tweet" />
            <Input placeholder="Description (optional)" />
          </>
        );
      default:
        return (
          <div className="text-center text-gray-400 my-10">
            Please select a content type above.
          </div>
        );
    }
  };

  return (
    <div className="absolute top-0 text-white h-full w-full flex items-center justify-center opacity-100 bg-black-100">
      <div className="bg-white h-90 w-90 text-purple-500 rounded-lg p-4">
        <div className="">
          <div className="flex justify-between mt-3 mb-5 ">
            <div className="font-medium text-xl">Add Content</div>
            <div className="hover:cursor-pointer" onClick={onClose}>
              <Cross />
            </div>
          </div>
          <div className="flex justify-between mb-3">
            {buttonData.map((button, i) => (
              <Button
                key={i}
                varient="primary"
                text={button.text}
                isActive={activeType === button.type}
                onClick={() => setActiveType(button.type)}
              />
            ))}
          </div>
          <div>{renderInputs()}</div>
          {activeType && (
            <div className="flex mt-7 justify-center">
              <Button
                varient="primary"
                customCSS="w-full flex justify-center"
                text="Submit"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
