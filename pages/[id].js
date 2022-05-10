import { getProviders, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
//import Widgets from "../components/Widgets";
import Post from "../components/Post";
import { db } from "../firebase";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import Comment from "../components/Comment";
import Head from "next/head";

import {
	collection,
	doc,
	onSnapshot,
	orderBy,
	query,
} from "@firebase/firestore";
import Login from "../components/Login";

const PostPage = ({ trendingResults, followResults, providers }) => {
	const { data: session } = useSession();
	const [isOpen, setIsOpen] = useRecoilState(modalState);
	const [post, setPost] = useState();
	const [comments, setComments] = useState([]);
	router = useRouter();
	const { id } = router.query;

	useEffect(
		() =>
			onSnapshot(doc(db, "posts", id), snapshot => {
				setPost(snapshot.data());
			}),
		[id]
	);

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

	if (!session) return <Login providers={providers} />;

	return (
		<div>
			<Head>
				<title>
					{post?.username} on Twitter: {post?.text}
				</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
				<Sidebar />

				<Modal />
			</main>
		</div>
	);
};

export default PostPage;
