"use client";
import { useState, useEffect } from "react";
import ProductCard from "../cards/productsCard";
import CategoryFilter from "../filters/categoryFilter";
import PriceFilter from "../filters/priceFilter";
import RatingFilter from "../filters/ratingFilter";
import ProductsSection from "./pagination";

export default function ShopPage({ categoryList, productsList }) {
    const [selectedRating, setSelectedRating] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState(productsList);
    const storedCategory =
        typeof window !== "undefined" && window.localStorage
            ? localStorage.getItem("category")
            : null;

    const [selectedCategory, setSelectedCategory] = useState(storedCategory);

    const filterProducts = () => {
        let filtered = [...productsList];

        if (selectedCategory) {
            filtered = filtered.filter(
                (item) => item.category == selectedCategory
            );
            if (selectedCategory == "all") {
                filtered = productsList;
            }
        }

        if (selectedRating) {
            filtered = filtered.filter((item) => item.rating >= selectedRating);
        }

        if (selectedPrice) {
            filtered = filtered.filter((item) => item.price <= selectedPrice);
        }

        setFilteredProducts(filtered);
    };

    return (
        <div className="p-3 flex flex-col lg:flex-row justify-center ">
            <div className="p-1 lg:w-1/5 lg:mr-1 md:mr-1 md:w-full justify-center ">
                <div className="rounded border-[1px] bg-[#fff] mt-1 justify-center ">
                    <h1 className="font-medium bg-[#00000011] p-3 border-b-[1px]">
                        Category
                    </h1>
                    <div className="p-1 justify-center">
                        <CategoryFilter
                            categoryList={categoryList}
                            setSelectedCategory={setSelectedCategory}
                            selected_option={storedCategory}
                        />
                    </div>
                </div>
                <div className="rounded border-[1px] bg-[#fff] mt-1 justify-center ">
                    <h1 className="font-medium bg-[#00000011] p-3 border-b-[1px]">
                        Ratings
                    </h1>
                    <RatingFilter
                        items={productsList}
                        onRatingChange={setSelectedRating}
                    />
                </div>
                <div className="rounded border-[1px] bg-[#fff] mt-1 justify-center ">
                    <h1 className="font-medium bg-[#00000011] p-3 border-b-[1px]">
                        Price
                    </h1>
                    <PriceFilter
                        items={productsList}
                        onPriceChange={setSelectedPrice}
                    />
                </div>
            </div>
            <ProductsSection
                filteredProducts={filteredProducts}
                filterProducts={filterProducts}
                selectedCategory={selectedCategory}
                selectedRating={selectedRating}
                selectedPrice={selectedPrice}
            />
        </div>
    );
}
