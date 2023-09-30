import { Rating } from "@material-tailwind/react";

export default function Ratings({ rating }) {
    return (
        <div className="h-min p-4 px-6 w-11/12 md:w-2/5 lg:w-4/12 m-2 bg-white rounded shadow">
            <h1 className="p-1 mt-2 text-base font-semibold text-[#262626]">
                Rating
            </h1>
            <Rating
                readonly={true}
                value={5}
            />
        </div>
    );
}
