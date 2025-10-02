import { DocIcon } from "../icons/DocIcon";
import { ImageIcon } from "../icons/ImageIcon";
import { SpeakerIcon } from "../icons/SpeakerIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { Logo } from "./Logo";
import { SideBarItem } from "./SideBarItem";
// const contentType = ["image", "doc", "video", "audio", "tweet"];

export function SideBar({
  setVisibleContentType,
}: {
  setVisibleContentType: (e: string) => void;
}) {
  return (
    <div>
      <Logo />
      <div className="mt-15">
        <SideBarItem
          type="tweet"
          setVisibleContentType={setVisibleContentType}
          logo={<TwitterIcon />}
          name="Tweets"
        />
        <SideBarItem
          type="video"
          setVisibleContentType={setVisibleContentType}
          logo={<YoutubeIcon />}
          name="Videos"
        />
        <SideBarItem
          type="doc"
          setVisibleContentType={setVisibleContentType}
          logo={<DocIcon />}
          name="Documents"
        />
        <SideBarItem
          type="image"
          setVisibleContentType={setVisibleContentType}
          logo={<ImageIcon />}
          name="Images"
        />
        <SideBarItem
          type="audio"
          setVisibleContentType={setVisibleContentType}
          logo={<SpeakerIcon />}
          name="Audio"
        />
      </div>
    </div>
  );
}
