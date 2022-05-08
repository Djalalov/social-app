import { signIn } from "next-auth/react";
import logo from "../public/twitter-logo.png";
import Image from "next/image";

const Login = ({ providers }) => {
	return (
		<div className="flex flex-col items-center space-y-10 pt-40">
			<Image alt="" src={logo} width={300} height={300} objectFit="contain" />
			<div>
				{Object.values(providers).map(provider => (
					<div key={provider.name}>
						<button
							className="relative inline-flex items-center justify-start px-5 py-3 overflow-hidden font-medium transition-all bg-sky-600 rounded-full hover:bg-white group"
							onClick={() => signIn(provider.id, { callbackUrl: "/" })}
						>
							<span className="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>

							<span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-sky-600">
								Sign In with {provider.name}
							</span>
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Login;
