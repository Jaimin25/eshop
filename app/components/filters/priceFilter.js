"use client";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function PriceFilter({ items }) {
    const [price, setPrice] = useState(100);
    function onChange(e) {
        const price = e.target.value;
        setPrice(e.target.value);

        console.log(items.filter((item) => item.price <= price));
    }
    return (
        <div className="p-1 justify-center">
            <input
                id="default-range"
                type="range"
                defaultValue={100}
                max={2000}
                onChange={(e) => onChange(e)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex items-center p-2">
                <p>$0-${price}</p>
            </div>
        </div>
    );
}
