import {
	CalendarIcon,
	ChartBarIcon,
	EmojiHappyIcon,
	PhotographIcon,
	XIcon,
} from "@heroicons/react/outline";
import React, { useState, useRef } from "react";
import { db, storage } from "../firebase";
import {
	addDoc,
	collection,
	doc,
	serverTimestamp,
	updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

const Input = () => {
	const { data: session } = useSession();

	const [active, setActive] = useState("");
	const [input, setInput] = useState("");
	const [selectedFile, setSelectedFile] = useState(null);
	const [showEmojis, setShowEmojis] = useState(false);
	const [loading, setLoading] = useState(false);
	const filePickerRef = useRef(null);

	const sendPost = async () => {
		if (loading) return;
		setLoading(true);

		const docRef = await addDoc(collection(db, "posts"), {
			id: session.user.uid,
			username: session.user.name,
			userImg: session.user.image,
			tag: session.user.tag,
			text: input,
			timestamp: serverTimestamp(),
		});

		const imageRef = ref(storage, `posts/${docRef.id}/image`);

		if (selectedFile) {
			await uploadString(imageRef, selectedFile, "data_url").then(async () => {
				const downloadURL = await getDownloadURL(imageRef);
				await updateDoc(doc(db, "posts", docRef.id), {
					image: downloadURL,
				});
			});
		}

		setLoading(false);
		setInput("");
		setSelectedFile(null);
		setShowEmojis(false);
	};

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
	};

	return (
		<div
			className={`boder-b border-gray-700 p-3 flex space-x-3  overflow-y-scroll ${
				loading && "opacity-60" //When loading's true background shoud be black
			}`}
		>
			<img
				src={session.user.image}
				alt=""
				className="h-11 w-11 rounded-full cursor-pointer"
			/>

			<div className="w-full divide-y divide-gray-700">
				<div className={`${selectedFile && "pb-7"} ${input && "sapce-y-3"}`}>
					<textarea
						onChange={e => {
							setInput(e.target.value);
						}}
						value={input}
						rows="2"
						className="bg-transparent outline-none text-slate-200 text-lg tracking-wide w-full min-h-[60px]  placeholder:italic placeholder:text-gray-700 placeholder:opacity-80"
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

				{/************ MAKE SURE ITS NOT																																																																																																																																																																																																																																																																					 LOADING *************/}

				{!loading && (
					<div className="flex items-center justify-between pt-2.5 ">
						<div className="flex items-center">
							{/************ PHOTO UPLOAD ICON *************/}
							<div
								className={`icon ${active === "photoIcon" ? "active" : ""}`}
								onClick={() => {
									filePickerRef.current.click();
									setActive("photoIcon");
								}}
							>
								<PhotographIcon className="h-[22px] text-sky-600" />
								<input
									hidden
									type="file"
									onChange={addImageToPost}
									ref={filePickerRef}
								/>
							</div>
							<div
								className={`icon rotate-90 ${
									active === "chartIcon" ? "active" : ""
								}`}
								onClick={() => {
									setActive("chartIcon");
								}}
							>
								<ChartBarIcon className="text-sky-600 h-[22px]" />
							</div>
							{/************ EMOJI ICON *************/}
							<div
								className={`icon ${active === "emojiIcon" ? "active" : ""}`}
								onClick={() => {
									setShowEmojis(!showEmojis);
									setActive("emojiIcon");
								}}
							>
								<EmojiHappyIcon className="text-sky-600 h-[22px] " />
							</div>
							{/************ CALENDAR *************/}
							<div
								className={`icon ${active === "calendarIcon" ? "active" : ""}`}
							>
								<CalendarIcon
									className="text-sky-600 h-[22px]"
									onClick={() => {
										setActive("calendarIcon");
									}}
								/>
							</div>
							{showEmojis && active === "emojiIcon" && (
								<Picker
									onEmojiClick={addEmoji}
									pickerStyle={{
										position: "absolute",
										marginTop: "370px",
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

						<button
							className="buttonStyle px-4 py-1.5"
							disabled={!input.trim() && !selectedFile}
							onClick={sendPost}
						>
							Comment
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Input;
