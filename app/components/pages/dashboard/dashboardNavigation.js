import Link from "next/link";

export default function DashboardNavigation() {
    return (
        <div className="hidden lg:flex md:flex flex-col items-center text-center bg-white p-2 text-sm pt-3 w-1/2">
            <p className="font-semibold border w-full px-[10px] py-[8px]">
                Account
            </p>
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
    );
}
