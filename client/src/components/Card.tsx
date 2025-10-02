import { useState } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { BinIcon } from "../icons/BinIcon";
import { SpinnerIcon } from "../icons/SpinnerIcon";
import { DocIcon } from "../icons/DocIcon";
import axios from "axios";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { ImageIcon } from "../icons/ImageIcon";
import { SpeakerIcon } from "../icons/SpeakerIcon";
import { LinkIcon } from "../icons/LinkIcon";
const apiUrl = import.meta.env.VITE_API_URL;

type ContentType = "image" | "doc" | "video" | "audio" | "tweet";

interface CardProps {
  id: string;
  link: string;
  title: string;
  description?: string;
  updateUI: boolean;
  setUpdateUI: (v: boolean) => void;
  type: ContentType;
}

const CardContent = ({
  type,
  link,
  title,
}: {
  type: ContentType;
  link: string;
  title: string;
}) => {
  switch (type) {
    case "video":
      try {
        const url = new URL(link);
        const videoId = url.searchParams.get("v");
        if (!videoId)
          return <p className="p-4 text-red-500">Invalid YouTube URL</p>;
        return (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
        );
      } catch (error) {
        console.log(error);
        return <p className="p-4 text-red-500">Invalid YouTube URL</p>;
      }
    case "tweet":
      link = link.replace("x.com", "twitter.com");
      return (
        <blockquote className="twitter-tweet">
          <a href={link}></a>
        </blockquote>
      );
    case "image":
      return <img src={link} alt={title} className="w-full h-auto" />;
    case "audio":
      return (
        <audio controls src={link} className="w-full">
          Your browser does not support the audio element.
        </audio>
      );
    case "doc":
      if (link.toLowerCase().endsWith(".pdf")) {
        return (
          <iframe
            src={link}
            title={title}
            className="w-full h-full min-h-64"></iframe>
        );
      } else {
        return (
          <div className="p-4 text-center">
            <DocIcon />
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-blue-600 hover:underline break-all">
              View Document
            </a>
          </div>
        );
      }
    default:
      return <p className="p-4">Unsupported content type.</p>;
  }
};

export function Card({
  link,
  title,
  description,
  id,
  type,
  updateUI,
  setUpdateUI,
}: CardProps) {
  const getContentIcon = (type: ContentType) => {
    switch (type) {
      case "video":
        return <YoutubeIcon />;
      case "tweet":
        return <TwitterIcon />;
      case "doc":
        return <DocIcon />;
      case "image":
        return <ImageIcon />;
      case "audio":
        return <SpeakerIcon />;
      default:
        return <LinkIcon />;
    }
  };
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  async function handleDeleteBtn() {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this content?"
    );
    if (!isConfirmed) return;

    setIsDeleting(true);
    setDeleteError(null);
    try {
      await axios.delete(`${apiUrl}/content/${id}`, { withCredentials: true });
      console.log("deleted successfully");
      setUpdateUI(!updateUI);
    } catch (err) {
      setDeleteError("Failed to delete. Please try again.");
      console.error("failed to delete ", err);
    } finally {
      setIsDeleting(false);
    }
  }

  const handelDeleteBtn = handleDeleteBtn;

  return (
    <div className="bg-white w-[354px] rounded-md border-2 border-black-200 overflow-y-auto max-h-80 mb-5">
      <div className="flex justify-between px-3 pt-3 items-center ">
        <div className="flex items-center gap-7">
          <div className="text-black-200"> {getContentIcon(type)}</div>
          <div className="font-medium">{title}</div>
        </div>
        <div className="flex gap-4">
          <div className="text-black-200 hover:cursor-pointer">
            {<ShareIcon />}
          </div>
          <div
            className="text-black-200 hover:cursor-pointer"
            onClick={isDeleting ? undefined : handelDeleteBtn}>
            {isDeleting ? <SpinnerIcon /> : <BinIcon />}
          </div>
        </div>
      </div>

      {deleteError && (
        <div className="px-3 pt-2 text-sm text-center text-red-500">
          {deleteError}
        </div>
      )}

      <div className=" py-3 px-2 ">
        <div className="overflow-y-auto max-h-80">
          <CardContent title={title} type={type} link={link} />
        </div>
      </div>

      <div className="px-3 pb-3">{description}</div>
    </div>
  );
}
