"use client";

import { base_url } from "@/app/lib/baseUrl";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PlaceOrderButton({
    filteredCart,
    secretKey,
    onItemRemove,
    orderTotal,
    setLoading,
}) {
    const { data: session } = useSession();
    const sessionUser = session ? session.user : null;

    const router = useRouter();

    const placeOrderSubmit = async () => {
        const res = await fetch(`${base_url}/api/account/user/order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: sessionUser.userid,
                secretKey: secretKey,
                status: "Not Processed",
                products: filteredCart.map((item) => {
                    return {
                        id: item.id,
                        quantity: item.quantity,
                        status: "not processed",
                    };
                }),
                orderTotal: orderTotal,
            }),
        });
        const data = await res.json();

        if (data.ok) {
            setLoading(false);
        }
        setLoading(false);

        if (data.result.msg === "Placed your successfully!") {
            setLoading(true);

            const res = await fetch(`${base_url}/api/account/user/cart`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userid: sessionUser.userid,
                    secretKey: secretKey,
                    emptyCart: true,
                }),
            });

            if (res.ok) {
                setLoading(false);
                reloadSession();
                onItemRemove("true");
                router.push(`/order/success/${data.result.id}`);
            }

            if (res.error) {
                setLoading(false);
                reloadSession();
            }
        }
    };

    function onPlaceOrderClick() {
        setLoading(true);
        placeOrderSubmit();
    }

    const reloadSession = () => {
        const event = new Event("visibilitychange");
        document.dispatchEvent(event);
    };

    return (
        <button
            onClick={onPlaceOrderClick}
            className="self-end px-2 py-1 border m-1 text-base">
            Place Order
        </button>
    );
}
