import { DotsHorizontalIcon } from "@heroicons/react/outline";
import Image from "next/image";

function Trending({ result }) {
	return (
		<div className="hover:bg-white hover:bg-opacity-[0.05] py-1 cursor-pointer transition duration-200 ease-out flex flex-col-reverse items-center justify-between">
			<div className="space-y-0.5">
				<p className="text-slate-500 text-sm font-medium pt-2 px-4">
					{result.heading}
				</p>
				<h6 className="font-bold px-4 text-sm">{result.description}</h6>
				<p className="text-slate-500 text-xs font-medium max-w-[300px] pt-4  px-4 ">
					{result.tags.map((tag, index) => (
						<span className="tag " key={index}>
							{tag}
						</span>
					))}
				</p>
			</div>

			{result.img ? (
				<Image
					src={result.img}
					width={400}
					height={150}
					objectFit="cover"
					alt=""
				/>
			) : (
				<div className="icon group">
					<DotsHorizontalIcon className="h-5 text-slate-500 group-hover:text-[#1d9bf0]" />
				</div>
			)}
		</div>
	);
}

export default Trending;
