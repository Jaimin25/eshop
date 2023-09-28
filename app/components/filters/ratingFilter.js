"use client";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function RatingFilter({ items }) {
    const [rating, setRating] = useState(4);
    function onChange(e) {
        const rating = e.target.value;
        setRating(e.target.value);

        console.log(items.filter((item) => item.rating >= rating));
    }
    return (
        <div className="p-1 justify-center">
            <input
                id="default-range"
                type="range"
                defaultValue={4}
                max={5}
                onChange={(e) => onChange(e)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex items-center p-2">
                <FontAwesomeIcon
                    icon={faStar}
                    className="text-[#ffb302] h-3 mr-1"
                />
                <p>{rating}</p>
            </div>
        </div>
    );
}
