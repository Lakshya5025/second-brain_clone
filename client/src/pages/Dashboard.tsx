import { useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { CreateContentModel } from "../components/CreateContentModel";
import { SideBar } from "../components/Sidebar";

export default function Dashboard() {
  const [showContentModel, setShowContentModel] = useState(false);
  let lowOpacity: string;
  if (showContentModel) lowOpacity = "opacity-60";
  else lowOpacity = "";
  return (
    <div className="relative">
      <div
        className={
          "flex jusify-between relative  h-screen w-screen " + lowOpacity
        }>
        <div className=" h-screen basis-1/4 w-full p-6">
          <SideBar />
        </div>
        <div className="bg-grey-200 h-screen basix-3/4 w-full px-15">
          <div className="flex justify-between items-center  py-10">
            <div className="text-3xl font-bold">All Notes</div>
            <div className="flex">
              <div className="mr-5">
                <Button
                  text="Share Brain"
                  startIcon={<ShareIcon />}
                  varient="secondary"
                />
              </div>
              <Button
                text="Add Content"
                startIcon={<PlusIcon />}
                varient="primary"
                onClick={() => setShowContentModel((v) => !v)}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 py-10">
            <Card
              link="https://www.youtube.com/watch?v=54w5Okqb4c0"
              startIcon={<YoutubeIcon />}
              title={"First brain"}
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the"
            />
            <Card
              link="https://x.com/AtknSolana/status/1972294105523961895"
              startIcon={<YoutubeIcon />}
              title={"second brain"}
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the"
            />
          </div>
        </div>
      </div>
      {showContentModel ? (
        <CreateContentModel onClose={() => setShowContentModel(false)} />
      ) : null}
    </div>
  );
}
