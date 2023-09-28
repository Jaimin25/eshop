"use client";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function PriceFilter({ onPriceChange, disabled }) {
    const [price, setPrice] = useState(2000);
    function onChange(e) {
        const price = e.target.value;
        setPrice(e.target.value);
        onPriceChange(price);
    }
    return (
        <div className="p-1 justify-center">
            <input
                id="default-range"
                type="range"
                defaultValue={price}
                max={2000}
                step={10}
                disabled={disabled}
                onChange={(e) => onChange(e)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex items-center p-2">
                <p>$0-${price}</p>
            </div>
        </div>
    );
}
