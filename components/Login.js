import { signIn } from "next-auth/react";
import logo from "../public/logo.jpg";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

const Login = ({ providers }) => {
	return (
		<div className="flex flex-col items-center space-y-10 pt-40">
			<Image alt="" src={logo} width={300} height={300} objectFit="contain" />
			<div>
				{Object.values(providers).map(provider => (
					<div key={provider.name}>
						<button
							className="w-60 relative inline-flex items-center justify-start px-5 py-3 overflow-hidden text-sky-600 hover:text-slate-300 rounded-full group"
							onClick={() => signIn(provider.id, { callbackUrl: "/" })}
						>
							<FcGoogle fontSize={30} className="absolute z-50 mr-20" />

							{/* Top glass gradient */}
							<span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
							{/* <!-- Bottom gradient --> */}
							<span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
							{/* <!-- Left gradient --> */}
							<span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
							{/* <!-- Right gradient --> */}
							<span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
							<span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-5 rotate-12 group-hover:-translate-x-64 ease "></span>

							<span className="absolute inset-0 w-full h-full border border-white hover:border-sky-600 rounded-full opacity-10"></span>
							<span className="font-semibold ml-12 w-full text-left  transition-colors duration-200 ease-in-out">
								Sign in with {provider.name}
							</span>
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Login;

{
}
