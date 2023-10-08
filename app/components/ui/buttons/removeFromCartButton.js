"use client";
import { base_url } from "@/app/lib/baseUrl";
import { DeleteOutline } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Loader from "../loader";

export default function RemoveFromCart({ item, secretKey }) {
    const { data: session } = useSession();
    const sessionUser = session ? session.user : null;
    const [loading, setLoading] = useState(false);
    const submitRemoveFromCart = async () => {
        const res = await fetch(`${base_url}/api/account/user/cart`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userid: sessionUser.userid,
                cartProductId: item._id,
                secretKey: secretKey,
            }),
        });

        if (res.ok) {
            setLoading(false);
            reloadSession();
        }

        if (res.error) {
            reloadSession();
            setLoading(false);
        }
    };
    function removeFromCart() {
        setLoading(true);
        submitRemoveFromCart();
    }

    const reloadSession = () => {
        const event = new Event("visibilitychange");
        document.dispatchEvent(event);
    };
    return (
        <>
            {loading ? <Loader /> : null}
            <div className="flex justify-start items-start text-start pt-4 px-2 ">
                <DeleteOutline
                    onClick={removeFromCart}
                    className="hover:cursor-pointer text-red-400 hover:text-red-700"
                />
            </div>
        </>
    );
}
