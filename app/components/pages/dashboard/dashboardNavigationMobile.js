"use client";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Collapse,
    Button,
    Card,
    Typography,
    CardBody,
} from "@material-tailwind/react";
import Link from "next/link";
import { useState } from "react";
export default function DashboardNavigationMobile() {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen((cur) => !cur);
    return (
        <div className="bg-white lg:hidden md:hidden my-2 shadow p-2">
            <button
                onClick={toggleOpen}
                className="text-center border p-2 w-full text-md font-semibold text-[#323232]">
                Dashboard Menu
            </button>
            <Collapse open={open}>
                <div className="flex flex-col text-center text-sm">
                    <Link
                        className="border w-full px-[10px] py-[8px]"
                        href="/dashboard">
                        <button>Account Details</button>
                    </Link>
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
            </Collapse>
        </div>
    );
}
