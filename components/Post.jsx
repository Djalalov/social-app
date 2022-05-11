import {
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	orderBy,
	query,
	setDoc,
} from "@firebase/firestore";
import {
	ChartBarIcon,
	ChatIcon,
	DotsHorizontalIcon,
	HeartIcon,
	ShareIcon,
	SwitchHorizontalIcon,
	TrashIcon,
} from "@heroicons/react/outline";
import {
	HeartIcon as HeartIconFilled,
	ChatIcon as ChatIconFilled,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atoms/modalAtom";
import { db } from "../firebase";

const Post = ({ post, id, postPage }) => {
	const { data: session } = useSession();
	const [isOpen, setIsOpen] = useRecoilState(modalState);
	const [postId, setPostId] = useRecoilState(postIdState);
	const [comments, setComments] = useState([]);
	const [likes, setLikes] = useState([]);
	const [liked, setLiked] = useState(false);
	const router = useRouter();

	useEffect(
		() =>
			onSnapshot(
				query(
					collection(db, "posts", id, "comments"),
					orderBy("timestamp", "desc")
				),
				snapshot => setComments(snapshot.docs)
			),
		[id]
	);

	useEffect(
		() =>
			onSnapshot(collection(db, "posts", id, "likes"), snapshot =>
				setLikes(snapshot.docs)
			),
		[id]
	);

	useEffect(
		() =>
			setLiked(likes.findIndex(like => like.id === session?.user?.uid) !== -1),
		[likes, session.user.uid]
	);

	const likePost = async () => {
		if (liked) {
			await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
		} else {
			await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
				username: session.user.name,
			});
		}
	};

	return (
		<div
			className="p-3 flex cursor-pointer border-b border-gray-700"
			onClick={() => router.push(`/${id}`)}
		>
			{!postPage && (
				<img
					src={post?.userImg}
					alt=""
					className="h-11 w-11 rounded-full mr-4"
				/>
			)}

			<div className="flex flex-col space-y-4 w-full">
				<div className={`flex ${!postPage && "justify-between"}`}>
					{postPage && (
						<img
							src={post?.userImg}
							alt="Profile image"
							className="h-11 w-11 rounded-full mr-4"
						/>
					)}
					<div className="text-slate-500">
						<div className="inline-block group">
							<h4
								className={`font-bold text-slate-300 sm:text-base text-[15px] group-hover:underline ${
									!postPage && "inline-block"
								}`}
							>
								{post?.username}
							</h4>
							<span className={`text-sm sm:text-[15px] ${!postPage && "ml-2"}`}>
								@{post?.tag}
							</span>
						</div>{" "}
						<span className="m-2"> ● </span>{" "}
						<span className="hover:underline text-sm sm:text-[15px]">
							<Moment fromNow>{post?.timestamp?.toDate()}</Moment>
						</span>
						{!postPage && (
							<p className="text-slate-300 sm:text-base mt-0.5">{post?.text}</p>
						)}
					</div>
					<div className="icon group flex-shrink-0 ml-auto">
						<DotsHorizontalIcon className="h-5 text-slate-300 group-hover:text-[#028ce8]" />
					</div>
				</div>
				{postPage && (
					<p className="text-slate-600 text-[15px] sm:text-base ">
						{post?.text}
					</p>
				)}

				<img
					src={post?.image}
					alt=""
					className="rounded-2xl max-h-[700px] object-cover mr-2 mt-4"
				/>

				<div
					className={`text-slate-600 flex justify-between w-10/12 ${
						postPage && "mx-auto"
					}`}
				>
					<div
						className="flex items-center space-x-1 group"
						onClick={e => {
							e.stopPropagation();
							setPostId(id);
							setIsOpen(true);
						}}
					>
						<div className="icon group-hover:bg-sky-500 group-hover:bg-opacity-10">
							<ChatIcon className="h-5 group-hover:text-sky-500" />
						</div>
						{comments.length > 0 && (
							<span className="group-hover:text-sky-500 text-sm">
								{comments.length}
							</span>
						)}
					</div>

					{session.user.uid === post?.id ? (
						<div
							className="flex items-center space-x-1 group"
							onClick={e => {
								e.stopPropagation();
								deleteDoc(doc(db, "posts", id));
								router.push("/");
							}}
						>
							<div className="icon group-hover:bg-red-600/10">
								<TrashIcon className="h-5 group-hover:text-red-600" />
							</div>
						</div>
					) : (
						<div className="flex items-center space-x-1 group">
							<div className="icon group-hover:bg-green-600/10">
								<SwitchHorizontalIcon className="h-5 group-hover:text-green-600" />
							</div>
						</div>
					)}

					<div
						className="flex items-center space-x-1 group"
						onClick={e => {
							e.stopPropagation();
							likePost();
						}}
					>
						<div className="icon group-hover:bg-pink-600/10">
							{liked ? (
								<HeartIconFilled className="h-5 text-pink-600" />
							) : (
								<HeartIcon className="h-5 group-hover:text-pink-600" />
							)}
						</div>
						{likes.length > 0 && (
							<span
								className={`icon group-hover:text-pink-600 text-sm ${
									liked && "text-pink-600"
								}`}
							>
								{likes.length}
							</span>
						)}
					</div>

					<div className="icon group">
						<ShareIcon className="h-5 group-hover:text-sky-500" />
					</div>
					<div className="icon group">
						<ChatIcon className="h-5 group-hover:text-sky-500" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;
