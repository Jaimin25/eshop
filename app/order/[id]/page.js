import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import OrderProductCard from "@/app/components/cards/orderProductsCard";
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

    const date = new Date(order.createdAt);
    return (
        <div className="mt-6 justify-center flex">
            {order !== null ? (
                <div className="flex flex-col w-full lg:w-10/12 md:w-10/12 self-center p-1 m-2">
                    <div className="w-full bg-white shadow px-3 mb-3">
                        <h1 className="text-lg font-bold my-3">
                            Order Details
                        </h1>
                        <hr className="border-b border-[#e4e6eb]" />

                        <div className="flex flex-col lg:flex-row md:flex-row my-3 text-sm">
                            <div className="flex flex-col flex-1">
                                <div className="flex">
                                    <p className="flex-1">Order ID </p>
                                    <p className="flex-1 text-start">
                                        {order._id}
                                    </p>
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
                    <div className="flex flex-col lg:flex-row">
                        <div className="w-full lg:w-5/6 lg:mr-4 pt-2 px-3 bg-white shadow">
                            <h1 className="text-lg font-bold my-3">
                                Order Items
                            </h1>
                            <hr className="border-b border-[#e4e6eb]" />

                            {productDetails.map((item) => (
                                <OrderProductCard item={item} />
                            ))}
                        </div>
                        <div className="h-1/2 w-full lg:w-2/5 p-2 bg-white shadow">
                            <h1 className="text-lg font-bold my-3">
                                Order Summary
                            </h1>
                            <hr className="border-b border-[#e4e6eb]" />
                            <div className="flex my-2">
                                <p className="flex-1">Subtotal </p>
                                <p className="">${order.orderTotal}</p>
                            </div>
                            <div className="flex my-2">
                                <p className="flex-1">Tax </p>
                                <p className="">${order.tax}</p>
                            </div>
                            <div className="flex my-2">
                                <p className="flex-1">Shipping </p>
                                <p className="">${order.shipping}</p>
                            </div>

                            <hr className="border-b border-[#e4e6eb] my-2" />
                            <div className="flex my-2">
                                <p className="flex-1">Total</p>
                                <p>
                                    $
                                    {parseInt(order.orderTotal) +
                                        parseInt(order.tax) +
                                        parseInt(order.shipping)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center">
                    <p>No Order Found!</p>
                </div>
            )}
        </div>
    );
}
