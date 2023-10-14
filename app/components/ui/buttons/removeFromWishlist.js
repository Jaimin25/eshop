"use client";
import { base_url } from "@/app/lib/baseUrl";
import { DeleteOutline } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Loader from "../loader";
import { Toast } from "../toast";

export default function RemoveFromWishlist({ item, secretKey, onItemRemove }) {
    const { data: session } = useSession();
    const sessionUser = session ? session.user : null;
    const [loading, setLoading] = useState(false);
    const [wishlistUpdated, setWishlistUpdated] = useState(false);

    const submitRemoveFromWishlist = async () => {
        const res = await fetch(`${base_url}/api/account/user/wishlist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userid: sessionUser.userid,
                productid: item.id,
                secretKey: secretKey,
            }),
        });

        if (res.ok) {
            setWishlistUpdated(true);
            setLoading(false);
            setTimeout(() => {
                onItemRemove(item._id);
            }, 300);
        }

        if (res.error) {
            setLoading(false);
        }
    };

    function removeFromWishlist() {
        setLoading(true);
        setWishlistUpdated(false);
        submitRemoveFromWishlist();
    }

    const reloadSession = () => {
        const event = new Event("visibilitychange");
        document.dispatchEvent(event);
    };
    return (
        <div>
            {loading ? <Loader /> : null}
            {wishlistUpdated ? (
                <Toast
                    msg={"Wishlist updated successfully!"}
                    type="success"
                />
            ) : null}
            <div className="flex justify-start items-start text-start pt-4 px-2 ">
                <div
                    onClick={removeFromWishlist}
                    className="hover:cursor-pointer text-red-400 hover:text-red-700">
                    <DeleteOutline />
                </div>
            </div>
        </div>
    );
}
