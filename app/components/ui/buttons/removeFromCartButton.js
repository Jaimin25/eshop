"use client";
import { base_url } from "@/app/lib/baseUrl";
import { DeleteOutline } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Loader from "../loader";
import { Toast } from "../toast";

export default function RemoveFromCart({ item, secretKey, onItemRemove }) {
    const { data: session } = useSession();
    const sessionUser = session ? session.user : null;
    const [loading, setLoading] = useState(false);
    const [cartUpdated, setCartUpdated] = useState(false);

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
                emptyCart: false,
            }),
        });

        if (res.ok) {
            setCartUpdated(true);
            setLoading(false);
            setTimeout(() => {
                onItemRemove(item._id);
                reloadSession();
            }, 500);
        }

        if (res.error) {
            reloadSession();
            setLoading(false);
        }
    };

    function removeFromCart() {
        setCartUpdated(false);
        setLoading(true);
        submitRemoveFromCart();
    }

    const reloadSession = () => {
        const event = new Event("visibilitychange");
        document.dispatchEvent(event);
    };

    return (
        <div>
            {loading ? <Loader /> : null}
            {cartUpdated ? (
                <Toast
                    msg={"Cart updated successfully!"}
                    type={"success"}
                />
            ) : null}
            <div className="flex justify-start items-start text-start pt-4 px-2 ">
                <div
                    onClick={removeFromCart}
                    className="hover:cursor-pointer text-red-400 hover:text-red-700">
                    <DeleteOutline />
                </div>
            </div>
        </div>
    );
}
