"use client";

import Image from "next/image";
import Link from "next/link";
import RemoveFromWishlist from "../ui/buttons/removeFromWishlist";

export default function WishlistProduct({ item, secretKey, onItemChange }) {
    const date = new Date(item.addedAt);
    return (
        <div className="bg-white flex m-2 border rounded">
            <Link
                href={{
                    pathname: `/product/${item.title}`,
                    query: { id: item.id },
                }}
                className="flex w-full">
                <div className="flex h-[110px] w-[150px] px-2">
                    <Image
                        src={item.thumbnail}
                        height={100}
                        width={100}
                        alt={item.title}
                        className="object-contain w-full"
                    />
                </div>
                <div className="flex flex-col flex-1 px-2 justify-center">
                    <p>{item.title}</p>
                    <p className="text-sm text-[#323232]">
                        Price: ${item.price}
                    </p>
                    <p className="text-sm text-[#323232]">
                        Wishlist added on{" "}
                        {date.toLocaleString("en-GB", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </p>
                </div>
            </Link>
            <RemoveFromWishlist
                item={item}
                secretKey={secretKey}
                onItemRemove={onItemChange}
            />
        </div>
    );
}
