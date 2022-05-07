import {
	CalendarIcon,
	ChartBarIcon,
	EmojiHappyIcon,
	PhotographIcon,
	XIcon,
} from "@heroicons/react/outline";

import React, { useState, useRef, useEffect } from "react";

import dynamic from "next/dynamic";

const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

const Input = () => {
	const [input, setInput] = useState("");
	const [selectedFile, setSelectedFile] = useState(null);
	const filePickerRef = useRef(null);
	const [showEmojis, setShowEmojis] = useState(false);

	const addImageToPost = e => {
		const reader = new FileReader();
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		}

		reader.onload = readerEvent => {
			setSelectedFile(readerEvent.target.result);
		};
	};

	const addEmoji = (e, emojiObject) => {
		setShowEmojis(emojiObject);
		setInput(prevInput => prevInput + emojiObject.emoji);
		setShowEmojis(false);
	};

	return (
		<div
			className={`boder-b border-gray-700 p-3 flex space-x-3  overflow-y-scroll `}
		>
			<img src="" alt="" className="h-11 w-11 rounded-full cursor-pointer" />

			<div className="w-full divide-y divide-gray-700">
				<div className={``}>
					<textarea
						onChange={e => {
							setInput(e.target.value);
						}}
						value={input}
						rows="2"
						className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[60px]"
						placeholder="What's happening"
					/>

					{selectedFile && (
						<div className="relative">
							<div
								className="absolute h-8 w-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
								onClick={() => setSelectedFile(null)}
							>
								<XIcon className="text-white h-5" />
							</div>
							<img
								src={selectedFile}
								alt=""
								className="rounded-2xl m-h-80 object-contain"
							/>
						</div>
					)}
				</div>

				<div className="flex items-center justify-between pt-2.5 ">
					<div className="flex items-center">
						<div className="icon" onClick={() => filePickerRef.current.click()}>
							<PhotographIcon className="h-[22px] text-[#1d9bf0]" />
							<input
								hidden
								type="file"
								onChange={addImageToPost}
								ref={filePickerRef}
							/>
						</div>

						<div className="icon rotate-90">
							<ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
						</div>

						<div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
							<EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
						</div>

						<div className="icon">
							<CalendarIcon className="text-[#1d9bf0] h-[22px]" />
						</div>

						{showEmojis && (
							<Picker
								onEmojiClick={addEmoji}
								pickerStyle={{
									position: "absolute",
									marginTop: "400px",
									marginLeft: -40,
									maxWidth: "320px",
									borderRadius: "20px",
									shadowRadius: "0px",
									color: "#000",
									background: "#d9d9d9",
									boxShadow: "0 0 0 #000",
								}}
								theme="dark"
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Input;
