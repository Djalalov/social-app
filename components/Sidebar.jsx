import React from "react";
import Image from "next/image";
import SidebarLink from "./SidebarLink";
import { HomeIcon } from "@heroicons/react/solid";
import { GoSignOut } from "react-icons/go";
import logo from "../public/logo.jpg";
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
				<Image alt="logo" src={logo} width={40} height={40} />
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
				Comment
			</button>

			<div
				className="text-[#d9d9d9] xl:ml-24 flex items-center justify-between rounded-full hover:bg-[#d9d9d9] hover:bg-opacity-10 cursor-pointer transition duration-200 ease-out mt-auto min-w-[70%] relative"
				onClick={signOut}
			>
				<div className="flex align-center justify-center gap-2">
					<Image
						className="rounded-full "
						src={session.user.image}
						alt=""
						width={50}
						height={50}
					/>

					<div className="hidden xl:inline b">
						<h4 className="font-bold">{session.user.name}</h4>
						<p className="text-slate-400 ">@{session.user.tag}</p>
					</div>
				</div>

				<GoSignOut
					onClick={e => {
						e.stopPropagation();
					}}
					className="xl:inline hidden h-6 w-6 group text-slate-300 xl:mr-2"
				/>
			</div>
		</div>
	);
};

export default Sidebar;
