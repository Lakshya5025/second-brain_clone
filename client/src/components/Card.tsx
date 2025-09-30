import type { ReactElement } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { BinIcon } from "../icons/BinIcon";

interface CardProps {
  link: string;
  title: string;
  startIcon: ReactElement;
  description?: string;
}
type contentType = "youtube" | "twitter";

export function Card({ link, title, startIcon, description }: CardProps) {
  let videoId, tweetLink;
  let type: contentType;
  if (link.includes("youtube.com")) type = "youtube";
  else if (link.includes("x.com") || link.includes("twitter.com"))
    type = "twitter";
  else {
    return <div>Invalid type</div>;
  }
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
    <div className="bg-white w-[354px] rounded-md border-2 border-black-200 overflow-y-auto max-h-80">
      <div className="flex justify-between px-3 pt-3 items-center ">
        <div className="flex items-center gap-7">
          <div className="text-black-200"> {startIcon}</div>
          <div className="font-medium">{title}</div>
        </div>
        <div className="flex gap-4">
          <div className="text-black-200">{<ShareIcon />}</div>
          <div className="text-black-200">{<BinIcon />}</div>
        </div>
      </div>
      <div className=" py-3 px-2 ">
        <div className="overflow-y-auto max-h-80  ">
          {type == "youtube" ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="The Job Market Has Changed... Again?| What Are My Bets for 2025-26"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen></iframe>
          ) : (
            <blockquote className="twitter-tweet w-full  h-full">
              <a href={`${tweetLink}`}></a>
            </blockquote>
          )}
        </div>
      </div>
      <div className="px-3 pb-3">{description}</div>
    </div>
  );
}
