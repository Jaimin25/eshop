"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import DashboardNavigation from "./dashboardNavigation";
import DashboardNavigationMobile from "./dashboardNavigationMobile";

export default function Layout({ children }) {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen((cur) => !cur);

    return (
        <main className="flex flex-col lg:flex-row md:flex-row w-full justify-center mt-4 px-6">
            <DashboardNavigationMobile />

            <div className="flex shadow w-full lg:w-4/5">
                <DashboardNavigation />
                <div className="w-full flex justify-center bg-white">
                    {children}
                </div>
            </div>
        </main>
    );
}
