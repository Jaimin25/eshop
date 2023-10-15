"use client";

import { base_url } from "@/app/lib/baseUrl";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "../../ui/loader";

export default function OrderListComponent({ secretKey }) {
    const { data: session } = useSession();
    const sessionUser = session ? session.user : null;
    const [loading, setLoading] = useState(true);
    const [ordersList, setOrdersList] = useState([]);

    useEffect(() => {
        setLoading(true);
        getUserOrders();
    }, [sessionUser]);

    const getUserOrders = async () => {
        try {
            const data = await fetch(
                `${base_url}/api/account/user/order?userId=${
                    sessionUser.userid
                }&secretKey=${encodeURIComponent(secretKey)}`
            );

            if (data.ok) {
                const res = await data.json();
                setOrdersList(res.result);
                setLoading(false);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="w-full p-2">
            <p className="text-base font-bold p-2 text-[#262626]">
                Your Orders
            </p>
            {loading ? <Loader /> : null}
            <hr className="border-b border-[#e4e6eb]" />

            {ordersList.length > 0 ? (
                <div className="flex flex-col">
                    <p className="p-2">{ordersList.length} orders</p>
                    <div>
                        {ordersList.map((item, index) => (
                            <Link
                                href={"/order/" + item._id}
                                key={index}>
                                <div className="flex flex-col border border-[#e4e6eb] p-2 rounded shadow gap-1 hover:bg-[#00000008] hover:transition cursor-pointer text-sm">
                                    <p>
                                        Order{" "}
                                        <span className="text-[#323232] font-semibold">
                                            #{item._id}
                                        </span>
                                    </p>
                                    <p>
                                        Status{" "}
                                        <span className="text-[#323232] font-semibold">
                                            {item.status}
                                        </span>
                                    </p>
                                    <p>
                                        Ordered on{" "}
                                        <span className="text-[#323232] font-semibold">
                                            {new Date(
                                                item.createdAt
                                            ).toLocaleString("en-GB", {
                                                weekday: "long",
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </p>
                                    <p>
                                        Order Total{" "}
                                        <span className="text-[#323232] font-semibold">
                                            $
                                            {parseInt(item.orderTotal) +
                                                parseInt(item.tax) +
                                                parseInt(item.shipping)}
                                        </span>
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="w-full flex justify-center">
                    <p className="p-2">You have no orders yet.</p>
                </div>
            )}
        </div>
    );
}
