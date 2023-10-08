"use client";

import Image from "next/image";
import { DeleteOutline } from "@mui/icons-material";
import RemoveFromCart from "../ui/buttons/removeFromCartButton";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartProduct({ item, secretKey, onItemChange }) {
    return (
        <div className="bg-white flex m-2 shadow">
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
                        Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-[#323232]">
                        Price: ${item.price * item.quantity}
                    </p>
                </div>
            </Link>
            <RemoveFromCart
                item={item}
                secretKey={secretKey}
                onItemRemove={onItemChange}
            />
        </div>
    );
}
