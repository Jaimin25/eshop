"use client";

import { Changa } from "next/font/google";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../../ui/loader";
import Ratings from "./ratingSection";
import ProductInfoSection from "./productInfoSection";
import Review from "./reviewSection";

export default function ProductDetails({ productDetail, imageList }) {
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState("");
    const [imgUrl, setImgUrl] = productDetail.thumbnail
        ? useState(productDetail.thumbnail)
        : null;
    const shareQuote = `I ♥ this product on eShop\n${productDetail.description}\n\n${url}`;

    useEffect(() => {
        setUrl(window.location.href);
    }, []);

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
            />
            <div className="product-container flex flex-col mx-auto px-4 md:flex-row lg:flex-row justify-center">
                <Ratings rating={productDetail.rating} />
                <Review />
            </div>
        </div>
    );
}
