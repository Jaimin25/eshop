"use client";
import { useState, useEffect } from "react";
import ProductCard from "../cards/productsCard";
import PaginationButton from "../ui/buttons/paginationButtons";

export default function ProductsSection({
    filteredProducts,
    filterProducts,
    selectedCategory,
    selectedPrice,
    selectedRating,
}) {
    const [currentPage, setCurrentPage] = useState(5);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(10);

    const totalPages = [...Array(Math.ceil(filteredProducts.length / 10))];

    function handlePageChange(newPage) {
        setCurrentPage(newPage);
        const newStartIndex = (newPage - 1) * 10;
        const newEndIndex =
            newStartIndex +
            (newStartIndex + 10 > filteredProducts.length
                ? filteredProducts.length - endIndex
                : 10);
        setStartIndex(newStartIndex);
        setEndIndex(newEndIndex);
    }

    useEffect(() => {
        filterProducts();

        setCurrentPage(1);
        setStartIndex(0);
        setEndIndex(10);
    }, [selectedRating, selectedPrice, selectedCategory]);

    return (
        <div className="products flex flex-col md:w-full lg:w-4/5 h-auto justify-center">
            <div className="bg-[#fff] p-3 text-sm my-2 mx-1 rounded-sm shadow">
                Showing: {startIndex + 1}-{endIndex} products of{" "}
                {filteredProducts.length}
            </div>

            {filteredProducts.length > 0 ? (
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
                        <div className="mt-3">
                            <PaginationButton
                                onClick={() =>
                                    handlePageChange(currentPage - 1)
                                }
                                disabled={currentPage === 1}
                                value="Prev"
                            />

                            {totalPages.map((item, index) => (
                                <PaginationButton
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    currentPage={currentPage}
                                    value={index + 1}
                                />
                            ))}
                            <PaginationButton
                                onClick={() =>
                                    handlePageChange(currentPage + 1)
                                }
                                disabled={currentPage === totalPages.length}
                                value="Next"
                            />
                        </div>
                    ) : null}
                </div>
            ) : (
                <div className="h-auto w-auto flex flex-1 items-center justify-center">
                    <p>No products match the selected filters.</p>
                </div>
            )}
        </div>
    );
}
