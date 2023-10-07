import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { base_url } from "../lib/baseUrl";

async function getUserCart(userid, secretKey) {
    const res = await fetch(
        `${base_url}/api/account/user/cart?userId=${userid}&secretKey=${encodeURIComponent(
            secretKey
        )}`
    );
    const result = await res.json();
    const cart = result.result.cart;
    const productDetails = [];

    for (const item of cart) {
        const productDetail = await getProductDetails(item.productid);
        productDetails.push(productDetail);
    }

    return productDetails;
}

async function getProductDetails(id) {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const result = await res.json();
    return result;
}

export default async function Cart() {
    const session = await getServerSession(authOptions);
    const secretKey = process.env.protection_secret;
    const userid = session.user.userid.toString();

    const cartProducts = await getUserCart(userid, secretKey);

    return (
        <div className="flex mt-[32px] w-full h-full p-4 justify-center">
            {cartProducts.length > 0 ? null : (
                <div className="mx-2 flex flex-col bg-white justify-center items-center w-[350px] h-[350px] shadow">
                    <FontAwesomeIcon
                        icon={faCartShopping}
                        size="2x"
                    />
                    <p className="m-2 text-base text-center">
                        Oops! Your cart is empty.
                    </p>
                    <Link href="/shop">
                        <button className="border px-[20px] py-[8px] m-1 text-sm hover:bg-[#2962ff] hover:text-white text-[13px] transition rounded-sm">
                            Start Shopping
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}
