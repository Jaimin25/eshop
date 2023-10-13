import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { base_url } from "@/app/lib/baseUrl";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function OrderDetailsPage(params) {
    const secretKey = process.env.protection_secret;
    const session = await getServerSession(authOptions);
    const orderId = params.params.id.toString();
    const userid = session.user.userid.toString();

    async function getUserOrder() {
        const data = await fetch(
            `${base_url}/api/account/user/order?secretKey=${encodeURIComponent(
                secretKey
            )}&orderId=${orderId}`
        );
        const res = await data.json();
        return res.result;
    }

    async function getProductDetails(productid, quantity, status) {
        const data = await fetch(`https://dummyjson.com/products/${productid}`);
        const product = await data.json();
        product.quantity = quantity;
        product.status = status;
        return product;
    }

    const order = await getUserOrder();
    const productDetails = [];
    for (const index in order.products) {
        productDetails.push(
            await getProductDetails(
                order.products[index].id,
                order.products[index].quantity,
                order.products[index].status
            )
        );
    }
    console.log(productDetails);

    const date = new Date(order.createdAt);
    return (
        <div className="flex w-4/5 self-center p-1 m-2">
            <div className="w-full">
                <h1 className="text-lg font-bold my-3">Order Details</h1>
                <hr className="border-b" />
                <div className="flex my-3">
                    <div className="flex flex-col flex-1">
                        <div className="flex">
                            <p className="flex-1">Order ID </p>
                            <p className="flex-1 text-start">{order._id}</p>
                        </div>
                        <div className="flex">
                            <p className="flex-1">Order Date </p>
                            <p className="flex-1 text-start">
                                {date.toLocaleString("en-GB", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </p>
                        </div>
                    </div>

                    <div className="w-2/5 flex justify-end py-2">
                        <button className="border border-[#e4e6eb] text-sm px-3 py-1">
                            Cancel Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
