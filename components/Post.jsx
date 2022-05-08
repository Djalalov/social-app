import React from "react";

const Post = ({ post, id, postPage }) => {
	return (
		<div className="p-3 flex cursor-pointer border-b border-gray-700">
			{!postPage && (
				<img
					src={post?.userImg}
					alt=""
					className="h-11 w-11 rounded-full mr-4"
				/>
			)}

			<div className="flex flex-col space-y-2 w-ful">
				<div className={`flex ${!postPage && "justify-between"}`}>
					{postPage && (
						<img
							src={post?.userImg}
							alt="Profile image"
							className="h-11 w-11 rounded-full mr-4"
						/>
					)}
					<div className="text-slate-400">
						<div className="inline-block group">
							<h4
								className={`font-bold text-slate-200 sm:text-base text-[15px] group-hover:underline ${
									!postPage && "inline-block"
								}`}
							>
								{post?.username}
							</h4>
							<span className={`text-sm sm:text-[15px] ${!postPage && "ml-2"}`}>
								@{post?.tag}
							</span>
						</div>{" "}
						.{" "}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;
