import "../styles/globals.css";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<SessionProvider session={session}>
			<RecoilRoot>
				<Component {...pageProps} />
			</RecoilRoot>
		</SessionProvider>
	);
}
