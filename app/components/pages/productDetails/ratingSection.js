import { Rating } from "@material-tailwind/react";

export default function Ratings({ rating }) {
    return (
        <div className="h-min p-4 px-6 w-11/12 md:w-2/5 lg:w-4/12 m-2 bg-white rounded shadow">
            <h1 className="p-1 mt-2 text-base font-semibold text-[#262626]">
                Rating
            </h1>
            <div className="flex gap-2 my-2 items-center text-[#323232]">
                <Rating
                    value={5}
                    readonly={true}
                />
                <p className="text-sm">based on {3} reviews</p>
            </div>
            <hr className="border-t-4" />
            <div className="flex items-center mt-4">
                <p className="text-sm font-medium">5 star</p>
                <div className="flex-1 h-5 mx-4 bg-[#f1f1f1]">
                    <div className="h-5 bg-[#4caf50] w-[100%]" />
                </div>
                <span className="text-sm w-7 text-right font-medium">100%</span>
            </div>
            <div className="flex items-center mt-4">
                <p className="text-sm font-medium">4 star</p>
                <div className="flex-1 h-5 mx-4 bg-[#f1f1f1]">
                    <div className="h-5 bg-[#4caf50] w-[0%]" />
                </div>
                <span className="text-sm w-7 text-right font-medium ">0%</span>
            </div>
            <div className="flex items-center mt-4">
                <p className="text-sm font-medium">3 star</p>
                <div className="flex-1 h-5 mx-4 bg-[#f1f1f1]">
                    <div className="h-5 bg-[#4caf50] w-[0%]" />
                </div>
                <span className="text-sm w-7 text-right font-medium ">0%</span>
            </div>
            <div className="flex items-center mt-4">
                <p className="text-sm font-medium">2 star</p>
                <div className="flex-1 h-5 mx-4 bg-[#f1f1f1]">
                    <div className="h-5 bg-[#4caf50] w-[0%]" />
                </div>
                <span className="text-sm w-7 text-right font-medium ">0%</span>
            </div>
            <div className="flex items-center mt-4">
                <p className="text-sm font-medium">1 star</p>
                <div className="flex-1 w-1/3 h-5 mx-4 bg-[#f1f1f1]">
                    <div className="h-5 bg-[#4caf50] w-[0%]" />
                </div>
                <span className="text-sm w-7 text-right font-medium ">0%</span>
            </div>
        </div>
    );
}
