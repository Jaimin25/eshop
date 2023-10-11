"use client";
import { base_url } from "@/app/lib/baseUrl";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loader from "../loader";

export default function AddToWishlistButton({
    isFav,
    user,
    secretKey,
    productid,
}) {
    const userid = user ? user.userid : null;
    const [loading, setLoading] = useState(false);
    const [classAttr, setClassAttr] = useState(null);
    const [productIsFav, setProductIsFav] = useState(null);

    useEffect(() => {
        if (productIsFav) {
            setClassAttr("flex top-2 right-2 p-2 text-red-500");
        } else {
            setClassAttr("flex top-2 right-2 p-2 text-gray-400");
        }
        setProductIsFav(null);
    }, [productIsFav, user]);

    useEffect(() => {
        if (isFav) {
            setClassAttr("flex top-2 right-2 p-2 text-red-500");
        } else {
            setClassAttr("flex top-2 right-2 p-2 text-gray-400");
        }
    }, [isFav, user]);

    function addToWishlist() {
        if (userid) {
            setLoading(true);
            toggleProductToFav();
        }
    }

    const toggleProductToFav = async () => {
        try {
            const res = await fetch(`${base_url}/api/account/user/wishlist`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userid: userid,
                    productid: productid,
                    secretKey: secretKey,
                }),
            });
            if (res.ok) {
                const result = await res.json();

                if (result.result === "Added to wishlist!") {
                    reloadSession();
                } else {
                    reloadSession();
                }
                setLoading(false);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const reloadSession = () => {
        const event = new Event("visibilitychange");
        document.dispatchEvent(event);
    };

    return (
        <div>
            {loading ? <Loader /> : null}
            <button
                className={classAttr}
                onClick={addToWishlist}>
                <FavoriteIcon />
            </button>
        </div>
    );
}
