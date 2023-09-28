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
            <h1>Dropdown Select Example</h1>
            <select
                value={categoryName}
                onChange={handleSelectChange}>
                <option
                    value="all"
                    selected>
                    all
                </option>
                {categoryList.map((item, index) => (
                    <option value={item}>{item}</option>
                ))}
            </select>
        </div>
    );
}
