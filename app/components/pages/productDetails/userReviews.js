"use client";

import StarIcon from "@mui/icons-material/Star";

export default function UserReviewsSection({ reviewsList }) {
    return reviewsList.length > 0 ? (
        <div>
            {reviewsList.map((item, index) => {
                const randomColor = `#${Math.floor(
                    Math.random() * 16777215
                ).toString(16)}`;
                console.log(item.status);
                return item.status != "pending" ? (
                    <div
                        key={index}
                        className="shadow bg-white mt-2 rounded">
                        <div className="p-2 items-center flex">
                            <div>
                                <div
                                    className="flex justify-center m-2 items-center text-white rounded-full h-[50px] w-[50px] "
                                    style={{ backgroundColor: randomColor }}>
                                    <p>
                                        {item.username
                                            .substring(0, 1)
                                            .toUpperCase()}
                                    </p>
                                </div>
                            </div>
                            <div className="w-full m-1">
                                <div className="flex">
                                    <h1 className="flex-1 text-[#262626] font-medium">
                                        {item.username}
                                    </h1>
                                    <div className="flex">
                                        <p>{item.rating}</p>
                                        <StarIcon
                                            className="text-[#ffb302]"
                                            fontSize="medium"
                                        />
                                    </div>
                                </div>
                                <p className="text-xs text-[#323232]">
                                    {new Date(item.createdAt).toLocaleString(
                                        "en-GB",
                                        {
                                            weekday: "long",
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        }
                                    )}
                                </p>
                                <div>
                                    <p>{item.review}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null;
            })}
        </div>
    ) : null;
}
