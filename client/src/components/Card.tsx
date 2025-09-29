import type { ReactElement } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { BinIcon } from "../icons/BinIcon";

interface CardProps {
  type: "youtube" | "twitter";
  link: string;
  title: string;
  startIcon: ReactElement;
}

export function Card({ type, link, title, startIcon }: CardProps) {
  let videoId, tweetLink;
  if (type == "youtube") {
    const youtubeUrl = link;

    const url = new URL(youtubeUrl);

    const params = new URLSearchParams(url.search);
    videoId = params.get("v");
  }
  if (type == "twitter") {
    tweetLink = link.replace("x", "twitter");
  }
  console.log(videoId);
  return (
    <div className="bg-white w-64">
      <div className="flex justify-between px-3 items-center ">
        <div className="flex items-center gap-7">
          <div className="text-black-200"> {startIcon}</div>
          <div className="font-medium">{title}</div>
        </div>
        <div className="flex gap-4">
          <div className="text-black-200">{<ShareIcon />}</div>
          <div className="text-black-200">{<BinIcon />}</div>
        </div>
      </div>
      <div className="px-2 py-3">
        {type == "youtube" ? (
          <iframe
            className="w-full"
            height="h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="The Job Market Has Changed... Again?| What Are My Bets for 2025-26"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen></iframe>
        ) : (
          <blockquote className="twitter-tweet">
            <a href={`${tweetLink}`}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
}
