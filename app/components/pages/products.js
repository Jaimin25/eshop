"use client";
import { useState, useEffect } from "react";
import ProductCard from "../cards/productsCard";
import CategoryFilter from "../filters/categoryFilter";
import PriceFilter from "../filters/priceFilter";
import RatingFilter from "../filters/ratingFilter";
import Loader from "../ui/loader";

export default function ProductsPage({
    categoryList,
    categoryName,
    productsList,
}) {
    const [selectedRating, setSelectedRating] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const filterProducts = () => {
        let filtered = [...productsList];

        if (selectedRating) {
            filtered = filtered.filter((item) => item.rating >= selectedRating);
        }

        if (selectedPrice) {
            filtered = filtered.filter((item) => item.price <= selectedPrice);
        }

        setLoading(true);

        setTimeout(() => {
            setFilteredProducts(filtered);
            setLoading(false);
        }, 250);
    };

    useEffect(() => {
        filterProducts();
    }, [selectedRating, selectedPrice]);

    return (
        <div className="p-3 flex flex-col lg:flex-row justify-center ">
            <div className="p-1 lg:w-1/5 md:w-full justify-center ">
                <div className="rounded border-[1px] bg-[#fff] mt-1 justify-center ">
                    <h1 className="font-medium bg-[#00000008] p-3 border-b-[1px]">
                        Category
                    </h1>
                    <div className="p-1 justify-center">
                        <CategoryFilter
                            categoryList={categoryList}
                            categoryName={categoryName}
                            disabled={loading}
                        />
                    </div>
                </div>
                <div className="rounded border-[1px] bg-[#fff] mt-1 justify-center ">
                    <h1 className="font-medium bg-[#00000008] p-3 border-b-[1px]">
                        Ratings
                    </h1>
                    <RatingFilter
                        items={productsList}
                        onRatingChange={setSelectedRating}
                        disabled={loading}
                    />
                </div>
                <div className="rounded border-[1px] bg-[#fff] mt-1 justify-center ">
                    <h1 className="font-medium bg-[#00000008] p-3 border-b-[1px]">
                        Price
                    </h1>
                    <PriceFilter
                        items={productsList}
                        onPriceChange={setSelectedPrice}
                        disabled={loading}
                    />
                </div>
            </div>
            {loading ? (
                <div className="md:w-full lg:w-4/5 h-auto flex items-center justify-center">
                    <Loader />
                </div>
            ) : filteredProducts.length > 0 ? (
                <div className="lg:w-4/5 md:w-full p-1 grid grid-flow-row-dense grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4">
                    {filteredProducts.map((item, index) => (
                        <ProductCard
                            item={item}
                            key={index}
                        />
                    ))}
                </div>
            ) : (
                <div className="md:w-full lg:w-4/5 h-auto flex items-center justify-center">
                    <p>No products match the selected filters.</p>
                </div>
            )}
        </div>
    );
}
