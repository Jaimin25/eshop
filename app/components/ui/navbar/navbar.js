"use client";

import { faCartShopping, faShop } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import AccountBtn from "./accountBtn";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import { Badge } from "@material-tailwind/react";

export default function NavBar() {
    return (
        <nav className="flex shadow-md h-[64px] items-center backdrop-blur-sm sticky top-0 z-50 bg-white/80">
            <div className="flex w-full justify-center items-center">
                <Link
                    href="/"
                    className="flex-1">
                    <div className="flex justify-center lg:justify-start md:justify-start items-center p-2">
                        <FontAwesomeIcon
                            className="h-[30px] text-[#56c1d6]"
                            icon={faCartShopping}
                        />

                        <span className="h-full ml-1 text-2xl font-black italic text-[#56c1d6] ">
                            eShop
                        </span>
                    </div>
                </Link>
            </div>

            <div className="items-center text-center mr-4">
                <ul className="flex justify-center items-center gap-2 font-semibold text-center">
                    <Badge
                        content="5"
                        overlap="circular"
                        color="blue">
                        <ShoppingBagOutlinedIcon
                            className="lg:mr-2 md:mr-2"
                            fontSize="medium"
                        />
                    </Badge>
                    <Link href="/shop">
                        <li className="hidden lg:flex md:flex">Shop</li>
                        <StoreOutlinedIcon className="flex lg:hidden md:hidden" />
                    </Link>
                    <AccountBtn />
                </ul>
            </div>
        </nav>
    );
}
