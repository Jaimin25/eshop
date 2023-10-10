"use client";
import { useState, useEffect } from "react";
import ProductCard from "../cards/productsCard";
import CategoryFilter from "../filters/categoryFilter";
import PriceFilter from "../filters/priceFilter";
import RatingFilter from "../filters/ratingFilter";
import ProductsSection from "./pagination";
import { useSession } from "next-auth/react";
import { base_url } from "@/app/lib/baseUrl";

export default function ShopPage({ categoryList, productsList, secretKey }) {
    const { data: session } = useSession();
    const sessionUser = session ? session.user : null;

    const [selectedRating, setSelectedRating] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState(productsList);
    const storedCategory =
        typeof window !== "undefined" && window.localStorage
            ? localStorage.getItem("category")
            : null;

    const [selectedCategory, setSelectedCategory] = useState(storedCategory);

    const [updatedProducts, setUpdatedProducts] = useState(filteredProducts);
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

    useEffect(() => {
        if (sessionUser) {
            getUserWishlist();
        }
    }, [filteredProducts, sessionUser]);

    const getUserWishlist = async () => {
        const res = await fetch(
            `${base_url}/api/account/user/wishlist?userId=${
                sessionUser.userid
            }&secretKey=${encodeURIComponent(secretKey)}`
        );

        if (res.ok) {
            const data = await res.json();
            const wishlist = data.result.wishlist;
            const updatedProducts = filteredProducts.map((product) => {
                if (
                    wishlist.some(
                        (wishlistItem) =>
                            wishlistItem.productid === product.id.toString()
                    )
                ) {
                    return { ...product, wishlist: true };
                } else {
                    return { ...product, wishlist: false };
                }
                return product;
            });

            setUpdatedProducts(updatedProducts);
        }
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
                filteredProducts={
                    sessionUser ? updatedProducts : filteredProducts
                }
                filterProducts={filterProducts}
                selectedCategory={selectedCategory}
                selectedRating={selectedRating}
                selectedPrice={selectedPrice}
                user={sessionUser}
                secretKey={secretKey}
            />
        </div>
    );
}
