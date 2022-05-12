import React from "react";
import Image from "next/image";
import SidebarLink from "./SidebarLink";
import { HomeIcon } from "@heroicons/react/solid";

import {
	HashtagIcon,
	BellIcon,
	InboxIcon,
	BookmarkIcon,
	ClipboardListIcon,
	UserIcon,
	DotsCircleHorizontalIcon,
	DotsHorizontalIcon,
} from "@heroicons/react/outline";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Sidebar = () => {
	const { data: session } = useSession();

	return (
		<div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
			<div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
				<Image
					alt="logo"
					src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Twitter-logo.svg"
					width={40}
					height={40}
				/>
			</div>

			<div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
				<SidebarLink text="Home" Icon={HomeIcon} active />
				<SidebarLink text="Explore" Icon={HashtagIcon} />
				<SidebarLink text="Notifications" Icon={BellIcon} />
				<SidebarLink text="Messages" Icon={InboxIcon} />
				<SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
				<SidebarLink text="Lists" Icon={ClipboardListIcon} />
				<SidebarLink text="Profile" Icon={UserIcon} />
				<SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />
			</div>

			<button className="hidden xl:inline ml-auto text-lg w-56 h-[52px] buttonStyle">
				Tweet
			</button>

			<div className=""></div>

			<div
				className="text-[#d9d9d9] flex items-center justify-center hoverAnimation xl:mx-auto mt-auto xl:ml-20"
				onClick={signOut}
			>
				<Image
					className="rounded-full "
					src={session.user.image}
					alt=""
					width={40}
					height={40}
				/>
				<div className="hidden xl:inline leading-5 ml-4">
					<h4 className="font-bold">{session.user.name}</h4>
					<p className="text-slate-400 ">@{session.user.tag}</p>
				</div>

				<div className="icon group ml-10">
					<DotsHorizontalIcon
						onClick={e => {
							e.stopPropagation();
						}}
						className="hidden xl:inline h-5 text-slate-300 group-hover:text-[#028ce8]"
					/>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
