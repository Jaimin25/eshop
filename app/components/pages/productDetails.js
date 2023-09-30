"use client";
import {
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from "next-share";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetails({ productDetail, imageList }) {
    const [url, setUrl] = useState("");
    const shareQuote = `I ♥ this product on eShop\n${productDetail.description}\n\n${url}`;
    useEffect(() => {
        setUrl(window.location.href);
        // You can now use the current URL
        // ...
    }, [window.location.href]);
    return (
        <div className="product-container flex flex-col mx-auto px-4 md:flex-row lg:flex-row justify-center items-center">
            <div className="img-container w-11/12 md:w-4/12 lg:w-4/12 m-2 p-2 mb-0 pb-0">
                <Image
                    src={productDetail.thumbnail}
                    width={300}
                    height={400}
                    alt={productDetail.title}
                    className="object-contain w-full"
                />
                <div className="flex p-2 justify-center items-center">
                    {imageList.map((item, index) => (
                        <div
                            key={index}
                            className="p-1 h-[60px] flex justify-center">
                            <Image
                                src={item}
                                width={50}
                                height={50}
                                className="object-contain w-full"
                                alt={item}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="product-details-container w-11/12 md:w-7/12 lg:w-3/5 bg-white m-2 rounded shadow">
                <p className="p-1 mx-4 mt-4 text-lg">{productDetail.title}</p>
                <p className="p-1 mx-4 mb-4 text-xs text-[#323232]">
                    {productDetail.brand}
                </p>
                <hr className="border mx-6" />
                <p className="m-4 p-1 text-[#323232] text-sm">
                    {productDetail.description}
                </p>
                <p className="p-1 m-4 text-xl">${productDetail.price}</p>
                <p className="p-1 m-4 mb-0">Quantity</p>
                <input
                    type="number"
                    value="1"
                    className="p-1 ml-5 border rounded w-3/4"></input>
                <div className="flex m-4 justify-center">
                    <button className="text-sm flex justify-center items-center shadow p-2">
                        <img
                            className="h-7 p-1"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACrUlEQVR4nO2ZO4xMURjHf1YyjalorAqVkXg0VuFViA2xGla2oGIlXhGroluFR8Go6GzhHatCRWM7q/Co2MSuhFgVjV2yEhn55H/lkp2559wZe7+IX3KSyZzv/93/yb333O+cA/+pSwnoAW4Cr4AJNft9Q30W45qdwBhQy2ijwA4cMhuopow+BQ4DFWCOWkX/PUvFnZPWDVUZ+wrsAWY1iG0DehWbDMbN41QDvgBrInRrU4PZTsGUUu+E3YlY9kn7uugJoCf1TtgjE4tpniuH3dnCuCUTh5rIcUQ5rlMgIzKxpIkcS5XDvjOF8Vkmyk3kKCuH5SqM5HvgJc+/P5DJgHJjptpk3kHMc2C+9kebm2cgKwNmk5l6tEbUvyJP8m0SP2jCQChZeR6qvytP8oMSD9Tp35gyYL/zEpJnQP3mKZqzEvfX6R9NGbBaKS8heU6q/0yeC1yT2Eru6XiXMvA2zwUi8vSq3zxFMyRxZ53+LTJhF9+c5wIReTrlxTxF86YFdVSrqMiLLRmiy+upFtRRraIsL99ilwsLJPyIHz7JU3uMaLVEtujxwgt56sizDr+LH+7JU3eM6JhEF/HDJXnqixFdkOg4fjghT7b1FMwdiXbhh93yNBgjeiLROvywXp6GY0QfJFqIHxbJ03iowDbKvqt52jUvxfparJG/xx/j8mZ3J5MNCn6MP4blzd6X4NnhNv4YjJlNk/n6PP6oxnzfki/oUfzRF1Nx3Fewx6Oxbnmzuiu4ylyFPzpiqvKk7p+PP9pD10nJSmwq58HN36YtdOWarI1ti8YrYyF7CcluxSP8MiSPmxoF7VXQFfxyNeTwtV9Bp/DL6Ywd0N/2WPfjlwPyeJmAXe+t+KUr4JTg51mIBS3DL8vl8WWjoAkHp1K1wGZep8XjUVtW+3UU9wNY5IVjWCP9OAAAAABJRU5ErkJggg=="
                        />
                        Add To Bag
                    </button>
                </div>
                <div className="share-container flex gap-2 m-4">
                    <FacebookShareButton quote={shareQuote}>
                        <FacebookIcon
                            size={32}
                            round
                        />
                    </FacebookShareButton>
                    <TwitterShareButton title={shareQuote}>
                        <TwitterIcon
                            size={32}
                            round
                        />
                    </TwitterShareButton>
                    <WhatsappShareButton title={shareQuote}>
                        <WhatsappIcon
                            size={32}
                            round
                        />
                    </WhatsappShareButton>
                </div>
            </div>
        </div>
    );
}
