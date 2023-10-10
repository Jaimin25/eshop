"use client";
import { base_url } from "@/app/lib/baseUrl";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Loader from "../loader";

export default function AddToWishlistButton({
    isFav,
    user,
    secretKey,
    productid,
}) {
    const userid = user ? user.userid : null;
    const [productIsFav, setProductIsFav] = useState(isFav);

    const [loading, setLoading] = useState(false);
    const isFavClass =
        productIsFav === true
            ? productIsFav
            : isFav
            ? "text-red-500 hover:text-red-700"
            : "text-gray-400 hover:text-red-500";
    const classAtts = `flex top-2 right-2 p-2 ${isFavClass} `;

    function addToWishlist() {
        setLoading(true);
        if (productIsFav) {
            removeProductFromFav();
        } else {
            addProductToFav();
        }
    }

    const addProductToFav = async () => {
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
            console.log(await res.json());
            if (res.ok) {
                setLoading(false);
                setProductIsFav(true);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const removeProductFromFav = async () => {
        try {
            const res = await fetch(`${base_url}/api/account/user/wishlist`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userid: userid,
                    productid: productid,
                    secretKey: secretKey,
                }),
            });
            console.log(await res.json());
            if (res.ok) {
                setLoading(false);
                setProductIsFav(false);
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
