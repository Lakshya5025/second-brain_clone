import { DocIcon } from "../icons/DocIcon";
import { HashTagIcon } from "../icons/HashTagIcon";
import { LinkIcon } from "../icons/LinkIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { Logo } from "./Logo";
import { SideBarItem } from "./SideBarItem";

export function SideBar() {
  return (
    <div>
      <Logo />
      <div className="mt-15">
        <SideBarItem logo={<TwitterIcon />} name="Tweets" />
        <SideBarItem logo={<YoutubeIcon />} name="Videos" />
        <SideBarItem logo={<DocIcon />} name="Documents" />
        <SideBarItem logo={<LinkIcon />} name="Links" />
        <SideBarItem logo={<HashTagIcon />} name="Tags" />
      </div>
    </div>
  );
}
