"use client";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function PriceFilter({ onPriceChange }) {
    const [price, setPrice] = useState(2000);
    function onChange(e) {
        const price = e.target.value;
        setPrice(e.target.value);
        onPriceChange(price);
    }
    return (
        <div className="p-1 m-1 justify-center">
            <input
                id="default-range"
                type="number"
                defaultValue={price}
                onChange={(e) => onChange(e)}
                min="0"
                max="2000"
                className="w-full p-1 bg-gray-100 rounded"
            />
        </div>
    );
}
