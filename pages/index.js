import Head from "next/head";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import { getProviders, getSession, useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import Login from "../components/Login";
import Widgets from "../components/Widgets";
import Modal from "../components/Modal";
import { modalState } from "../atoms/modalAtom";

export default function Home({ trendingResults, followResults, providers }) {
	const { data: session } = useSession();
	const [isOpen, setIsOpen] = useRecoilState(modalState);

	if (!session) return <Login providers={providers} />;

	return (
		<div className="">
			<Head>
				<title>Social app</title>
			</Head>

			<main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
				<Sidebar />
				<Feed />
				<Widgets
					trendingResults={trendingResults}
					followResults={followResults}
				/>

				{isOpen && <Modal />}
			</main>
		</div>
	);
}

export async function getServerSideProps(context) {
	const trendingResults = await fetch("https://jsonkeeper.com/b/MUEF").then(
		res => res.json()
	);

	const followResults = await fetch("https://jsonkeeper.com/b/8HVV").then(res =>
		res.json()
	);
	const providers = await getProviders();
	const session = await getSession(context);

	return {
		props: {
			trendingResults,
			followResults,
			providers,
			session,
		},
	};
}
