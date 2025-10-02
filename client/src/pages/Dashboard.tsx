import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { PlusIcon } from "../icons/PlusIcon";
import { CreateContentModel } from "../components/CreateContentModel";
import { SideBar } from "../components/Sidebar";

interface ContentItem {
  _id: string;
  title: string;
  description: string;
  link: string;
  type: "image" | "doc" | "video" | "audio" | "tweet";
}

export default function Dashboard() {
  const [showContentModel, setShowContentModel] = useState(false);
  const [updateUI, setUpdateUI] = useState(false);
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`${apiUrl}/content`, {
          withCredentials: true,
        });
        setContents(response.data.message);
        setError(null);
      } catch (err) {
        setError("Failed to fetch content. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [updateUI]);

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
            <div className="text-3xl font-bold">All Brains</div>
            <div className="flex">
              <div className="mr-5"></div>
              <Button
                text="Add Content"
                startIcon={<PlusIcon />}
                varient="primary"
                onClick={() => setShowContentModel((v) => !v)}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 py-10 gap-6">
            {isLoading ? (
              <p>Loading your notes...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <>
                {contents.length > 0 ? (
                  contents.map((item) => (
                    <Card
                      type={item.type}
                      updateUI={updateUI}
                      setUpdateUI={setUpdateUI}
                      id={item._id}
                      key={item._id}
                      link={item.link}
                      title={item.title}
                      description={item.description}
                    />
                  ))
                ) : (
                  <p>
                    You haven't added any content yet. Click "Add Content" to
                    start!
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {showContentModel ? (
        <CreateContentModel
          updateUI={updateUI}
          setUpdateUI={setUpdateUI}
          onClose={() => setShowContentModel(false)}
        />
      ) : null}
    </div>
  );
}
