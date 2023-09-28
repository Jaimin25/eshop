"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CategoryFilter({ categoryList, setSelectedCategory }) {
    const [selectedOption, setSelectedOption] = useState("");

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
        setSelectedCategory(event.target.value);
    };

    return (
        <div className="w-1/2">
            <select
                value={selectedOption}
                onChange={handleSelectChange}
                defaultValue="all"
                className="flex p-1 w-full justify-center items-center">
                <option value="all">all</option>
                {categoryList.map((item, index) => (
                    <option
                        value={item}
                        key={index}>
                        {item}
                    </option>
                ))}
            </select>
        </div>
    );
}
