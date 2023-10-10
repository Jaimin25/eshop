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
    const [productIsFav, setProductIsFav] = useState(false);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setProductIsFav(isFav);
    }, [isFav]);
    const isFavClass = productIsFav
        ? "text-red-500 hover:text-red-700"
        : "text-gray-400 hover:text-red-500";
    const classAtts = `flex top-2 right-2 p-2 ${isFavClass} `;

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
                    setProductIsFav(true);
                } else {
                    setProductIsFav(false);
                }
                setLoading(false);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            {loading ? <Loader /> : null}
            <button
                className={classAtts}
                onClick={addToWishlist}>
                <FavoriteIcon />
            </button>
        </div>
    );
}
