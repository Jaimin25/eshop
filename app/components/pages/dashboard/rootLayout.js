"use client";

import Link from "next/link";
import { useEffect } from "react";

import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";

export default function Layout({ children }) {
    const data = [
        {
            label: "Account Details",
            value: "account",
        },
        {
            label: "Address",
            value: "addresss",
        },
        {
            label: "Orders",
            value: "order",
        },
        {
            label: "Wishlist",
            value: "wishlist",
        },
    ];

    return (
        <main className="flex w-full justify-center mt-8 px-10">
            <div className="flex shadow w-full lg:w-4/5">
                <div className="flex flex-col items-center text-center bg-white p-2 text-sm pt-3 w-1/2">
                    <p className="font-semibold border w-full px-[10px] py-[8px]">
                        Account
                    </p>
                    <button className="border w-full px-[10px] py-[8px]">
                        <Link href="/dashboard">Account Details</Link>
                    </button>
                    <Link
                        href="/dashboard/address"
                        className="border w-full px-[10px] py-[8px]">
                        <button>Address</button>
                    </Link>
                    <Link
                        href="/dashboard/orders"
                        className="border w-full px-[10px] py-[8px]">
                        <button>Orders</button>
                    </Link>
                    <Link
                        href="/dashboard/wishlist"
                        className="border w-full px-[10px] py-[8px]">
                        <button>Wishlist</button>
                    </Link>
                </div>
                <div className="w-full flex justify-center bg-white">
                    {children}
                </div>
            </div>
        </main>
    );
}
