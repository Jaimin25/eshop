"use client";

import { Changa } from "next/font/google";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../../ui/loader";
import Ratings from "./ratingSection";
import ProductInfoSection from "./productInfoSection";
import Review from "./reviewSection";
import { base_url } from "@/app/lib/baseUrl";
import UserReviewsSection from "./userReviews";

export default function ProductDetails({
    productDetail,
    imageList,
    secretKey,
}) {
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState("");
    const [imgUrl, setImgUrl] = productDetail.thumbnail
        ? useState(productDetail.thumbnail)
        : null;

    const shareQuote = `I ♥ this product on eShop\n${productDetail.description}\n\n${url}`;

    const [reviewsList, setReviewsList] = useState([]);

    useEffect(() => {
        setUrl(window.location.href);
        getReviews();
    }, []);

    const getReviews = async () => {
        try {
            const res = await fetch(
                `${base_url}/api/account/reviews?productId=${
                    productDetail.id
                }&secretKey=${encodeURIComponent(secretKey)}`
            );
            if (res.ok) {
                const data = await res.json();
                setReviewsList(data.result.reviews);
            }
        } catch (error) {
            console.log(error);
        }
    };

    function changeImage(url) {
        if (imgUrl !== url) {
            setLoading(true);
            setImgUrl(url);
        }
    }

    return (
        <div>
            <ProductInfoSection
                loading={loading}
                imgUrl={imgUrl}
                productDetail={productDetail}
                imageList={imageList}
                changeImage={changeImage}
                shareQuote={shareQuote}
                setLoading={setLoading}
                secretKey={secretKey}
            />
            <div className="product-container flex flex-col mx-auto px-4 md:flex-row lg:flex-row justify-center items-center lg:items-start md:items-start">
                <Ratings rating={productDetail.rating} />
                <div className="flex flex-col w-11/12 md:w-7/12 lg:w-3/5 m-2">
                    <Review
                        secretKey={secretKey}
                        productid={productDetail.id}
                    />
                    <UserReviewsSection reviewsList={reviewsList} />
                </div>
            </div>
        </div>
    );
}
