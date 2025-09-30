import { Cross } from "../icons/Cross";
import { Button } from "./Button";

function Input({ placeholder }: { placeholder: string }) {
  return (
    <div className="my-2">
      <input
        className="bg-grey-200 w-full rounded-md py-2 pl-2"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
}

export function CreateContentModel({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute top-0 text-white h-full w-full flex items-center justify-center opacity-100 bg-black-100">
      <div className="bg-white h-80 w-80 text-purple-500 rounded-lg p-4">
        <div className="">
          <div className="flex justify-between mt-3 mb-7 ">
            <div className="font-medium text-xl">Add Content</div>
            <div className="hover:cursor-pointer" onClick={onClose}>
              <Cross />
            </div>
          </div>
          <div>
            <Input placeholder="Title" />
            <Input placeholder="Link" />
            <Input placeholder="Description" />
          </div>
          <div className="flex mt-7 justify-center">
            <Button
              varient="primary"
              customCSS="w-full flex justify-center"
              text="Submit"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
