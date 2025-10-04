import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { PlusIcon } from "../icons/PlusIcon";
import { CreateContentModel } from "../components/CreateContentModel";
import { SideBar } from "../components/Sidebar";
import { Profile } from "../components/Profile";

const apiUrl = import.meta.env.VITE_API_URL;

interface Tag {
  _id: string;
  title: string;
}

interface ContentItem {
  _id: string;
  title: string;
  description: string;
  link: string;
  type: "image" | "doc" | "video" | "audio" | "tweet";
  tags: Tag[];
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [showContentModel, setShowContentModel] = useState(false);
  const [updateUI, setUpdateUI] = useState(false);
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleContentType, setVisibleContentType] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const handleLogout = async () => {
    try {
      await axios.post(`${apiUrl}/logout`, {}, { withCredentials: true });
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/content`, {
          withCredentials: true,
          params: {
            search: searchTerm,
            sortBy,
            sortOrder,
          },
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

    const handler = setTimeout(() => {
      fetchContent();
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [updateUI, searchTerm, sortBy, sortOrder]);

  const filteredContent = useMemo(() => {
    if (visibleContentType === "") {
      return contents;
    }
    return contents.filter((e) => e.type === visibleContentType);
  }, [visibleContentType, contents]);

  let lowOpacity: string;
  if (showContentModel) lowOpacity = "opacity-60";
  else lowOpacity = "";
  return (
    <div className="relative">
      <div
        className={
          "flex jusify-between relative h-screen w-screen " + lowOpacity
        }>
        <div className="h-screen basis-1/4 w-full p-6 border-r border-gray-200">
          <SideBar setVisibleContentType={setVisibleContentType} />
        </div>
        <div className="bg-grey-200 h-screen basis-3/4 w-full px-10 overflow-y-auto">
          <div className="flex justify-between items-center py-10 sticky top-0 bg-grey-200 z-10">
            <div className="text-3xl font-bold">All Brains</div>
            <div className="flex items-center gap-4">
              <Button
                text="Add Content"
                startIcon={<PlusIcon />}
                varient="primary"
                onClick={() => setShowContentModel((v) => !v)}
              />

              <Button
                text="Profile"
                onClick={() => setShowProfile(!showProfile)}
                varient="secondary"
              />
              <Button
                text="Logout"
                varient="secondary"
                onClick={handleLogout}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border rounded-md">
              <option value="createdAt">Sort by Date</option>
              <option value="title">Sort by Title</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="p-2 border rounded-md">
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-6">
            {isLoading ? (
              <p>Loading your notes...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <>
                {filteredContent.length > 0 ? (
                  filteredContent.map((item) => (
                    <Card
                      key={item._id}
                      id={item._id}
                      title={item.title}
                      description={item.description}
                      link={item.link}
                      type={item.type}
                      tags={item.tags}
                      updateUI={updateUI}
                      setUpdateUI={setUpdateUI}
                    />
                  ))
                ) : (
                  <p>
                    {searchTerm
                      ? `No results found for "${searchTerm}".`
                      : `You haven't added any content yet. Click "Add Content" to start!`}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {showProfile && <Profile setShowProfile={setShowProfile} />}

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
