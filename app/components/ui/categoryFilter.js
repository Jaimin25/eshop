"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CategoryFilter({ categoryList, categoryName }) {
    const [selectedOption, setSelectedOption] = useState("");

    const router = useRouter();
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
        router.push(`/products?category=${event.target.value}`);
    };

    return (
        <div>
            <select
                value={categoryName}
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
