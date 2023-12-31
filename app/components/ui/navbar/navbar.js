"use client";

import { faCartShopping, faShop } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import AccountBtn from "./accountBtn";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import { Badge } from "@material-tailwind/react";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { base_url } from "@/app/lib/baseUrl";

export default function NavBar({ secret }) {
    const [count, setCount] = useState(0);
    const { data: session } = useSession();
    const sessionUser = session ? session.user : null;

    useEffect(() => {
        if (sessionUser) {
            getUserCart();
        }
    }, [sessionUser]);

    const getUserCart = async (e) => {
        const res = await fetch(
            `${base_url}/api/account/user/cart?userId=${
                sessionUser.userid
            }&secretKey=${encodeURIComponent(secret)}`
        );
        let cartList = await res.json();
        cartList = cartList.result;
        setCount(cartList.cart.length);
    };
    return (
        <nav className="flex shadow-md h-[64px] items-center backdrop-blur-sm sticky top-0 z-50 bg-white/80">
            <div className="flex w-full justify-center items-center">
                <div className="flex flex-1 items-center p-2">
                    <Link
                        href="/"
                        className="flex justify-center items-center">
                        <FontAwesomeIcon
                            className="h-[30px] text-[#56c1d6]"
                            icon={faCartShopping}
                        />

                        <span className="h-full ml-1 text-2xl font-black italic text-[#56c1d6] ">
                            eShop
                        </span>
                    </Link>
                </div>
            </div>

            <div className="items-center text-center mr-4">
                <div className="flex justify-center items-center gap-2 font-semibold text-center">
                    {count > 0 ? (
                        <Badge
                            content={count}
                            overlap="circular"
                            color="blue">
                            <Link href="/cart">
                                <ShoppingBagOutlinedIcon
                                    className="lg:mr-2 md:mr-2"
                                    fontSize="medium"
                                />
                            </Link>
                        </Badge>
                    ) : (
                        <Link href="/cart">
                            <ShoppingBagOutlinedIcon
                                className="lg:mr-2 md:mr-2"
                                fontSize="medium"
                            />
                        </Link>
                    )}
                    <Link href="/shop">
                        <div className="hidden lg:flex md:flex">Shop</div>
                        <div className="flex lg:hidden md:hidden">
                            <StoreOutlinedIcon />
                        </div>
                    </Link>
                    <AccountBtn user={sessionUser} />
                </div>
            </div>
        </nav>
    );
}
