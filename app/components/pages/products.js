"use client";
import { useState, useEffect } from "react";
import ProductCard from "../cards/productsCard";
import CategoryFilter from "../filters/categoryFilter";
import PriceFilter from "../filters/priceFilter";
import RatingFilter from "../filters/ratingFilter";
import Loader from "../ui/loader";

export default function ProductsPage({ categoryList, productsList }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(10);

    const totalPages = [...Array(Math.ceil(filteredProducts.length / 10))];

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

        setLoading(true);

        setTimeout(() => {
            setFilteredProducts(filtered);
            setCurrentPage(0);
            setStartIndex(0);
            setEndIndex(10);
            setLoading(false);
        }, 250);
    };

    function handlePageChange(newPage) {
        setCurrentPage(newPage);
        setStartIndex(startIndex + 10);
        setEndIndex(
            endIndex +
                (endIndex + 10 > filteredProducts.length
                    ? filteredProducts.length - endIndex
                    : 10)
        );
    }
    console.log(startIndex, endIndex);
    useEffect(() => {
        filterProducts();
    }, [selectedRating, selectedPrice, selectedCategory]);

    return (
        <div className="p-3 flex flex-col lg:flex-row justify-center ">
            <div className="p-1 lg:w-1/5 md:w-full justify-center ">
                <div className="rounded border-[1px] bg-[#fff] mt-1 justify-center ">
                    <h1 className="font-medium bg-[#00000011] p-3 border-b-[1px]">
                        Category
                    </h1>
                    <div className="p-1 justify-center">
                        <CategoryFilter
                            categoryList={categoryList}
                            setSelectedCategory={setSelectedCategory}
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
            <div className="flex flex-col md:w-full lg:w-4/5 h-auto justify-center">
                <div className="bg-[#fff] p-3 text-sm my-2 mx-1 rounded-sm shadow">
                    Showing: {startIndex + 1}-{endIndex} products of{" "}
                    {filteredProducts.length}
                </div>
                {loading ? (
                    <div className="flex h-auto w-auto flex-1 items-center justify-center">
                        <Loader />
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="flex flex-1 flex-col justify-center items-center">
                        <div className="p-1 w-full h-full grid grid-flow-row-dense grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4">
                            {filteredProducts
                                .slice(startIndex, endIndex)
                                .map((item, index) => (
                                    <ProductCard
                                        item={item}
                                        key={index}
                                    />
                                ))}
                        </div>
                        {totalPages.length > 1 ? (
                            <div>
                                <button className="p-1">Prev</button>
                                {totalPages.map((item, index) => (
                                    <button className="p-1">{index + 1}</button>
                                ))}
                                <button
                                    className="p-1"
                                    onClick={() =>
                                        handlePageChange(currentPage + 1)
                                    }>
                                    Next{" "}
                                </button>
                            </div>
                        ) : null}
                    </div>
                ) : (
                    <div className="h-auto w-auto flex flex-1 items-center justify-center">
                        <p>No products match the selected filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
