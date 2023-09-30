"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CategoryFilter({
    categoryList,
    setSelectedCategory,
    selected_option,
}) {
    const [selectedOption, setSelectedOption] = useState(selected_option);

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
        setSelectedCategory(event.target.value);
        localStorage.setItem("category", event.target.value);
    };

    return (
        <div className="w-1/2">
            <select
                value={selectedOption}
                onChange={handleSelectChange}
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
