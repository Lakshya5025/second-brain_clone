import { useState } from "react";
import { Button } from "../components/Button";
import { EyeOpen } from "../icons/EyeOpen";
import { EyeClose } from "../icons/EyeClose";

interface InputProps {
  placeholder: string;
  type?: string;
  setValue: (e: string) => void;
}

function Input({ placeholder, type = "text", setValue }: InputProps) {
  return (
    <div className="my-2">
      <input
        onChange={(e) => setValue(e.target.value)}
        className="bg-grey-200 w-full rounded-md py-2 pl-2"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}

export function Signin() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passType, setPassType] = useState("password");
  function onSignup() {
    console.log(userName, password);
  }
  function handelVisibility() {
    if (passType == "text") setPassType("password");
    else if (passType == "password") setPassType("text");
  }
  return (
    <div className="bg-purple-100 h-screen w-screen  flex justify-center items-center">
      <div className="bg-white w-80 rounded-lg px-5 py-7">
        <div className="relative">
          <Input placeholder="Username" setValue={setUserName} />
          <Input
            placeholder="password"
            setValue={setPassword}
            type={passType}
          />
          {password ? (
            <div
              className="absolute right-2 bottom-2 hover:cursor-pointer"
              onClick={handelVisibility}>
              {passType == "text" ? <EyeClose /> : <EyeOpen />}
            </div>
          ) : null}
        </div>
        <div className="flex mt-7 justify-center">
          <Button
            onClick={onSignup}
            varient="primary"
            customCSS="w-full flex justify-center"
            text="Submit"
          />
        </div>
      </div>
    </div>
  );
}
