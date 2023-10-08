import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { base_url } from "../lib/baseUrl";
import CartSection from "../components/pages/cart/cartSection";

export default async function Cart() {
    const secretKey = process.env.protection_secret;

    return (
        <div className="flex mt-[32px] w-full h-full md:p-4 lg:p-4 pt-0 justify-center items-center">
            <div className="flex lg:w-5/6 md:w-5/6 w-full justify-center">
                <CartSection secretKey={secretKey} />
            </div>
        </div>
    );
}
