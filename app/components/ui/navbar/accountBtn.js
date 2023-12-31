"use client";
import Link from "next/link";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import React, { useState } from "react";
import { signOut } from "next-auth/react";

export default function AccountBtn({ user }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <div
                onClick={toggleDropdown}
                className="hover:cursor-pointer">
                <div className="hidden lg:flex md:flex">
                    {user ? String(user.name).split(" ")[0] : "Hello!"}
                </div>

                <div className="flex lg:hidden md:hidden">
                    <AccountCircleOutlinedIcon />
                </div>
            </div>

            {isOpen &&
                (!user ? (
                    <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <ul
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu">
                            <li>
                                <Link
                                    href="/auth/signIn"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={closeDropdown}>
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/auth/signUp"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={closeDropdown}>
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <ul
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu">
                            <li>
                                <Link
                                    href="/dashboard"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => {
                                        closeDropdown();
                                    }}>
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => {
                                        closeDropdown();
                                        signOut();
                                    }}>
                                    Sign Out
                                </Link>
                            </li>
                        </ul>
                    </div>
                ))}
        </div>
    );
}
