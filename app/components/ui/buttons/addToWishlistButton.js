"use client";
import { base_url } from "@/app/lib/baseUrl";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loader from "../loader";
import { Toast } from "../toast";

export default function AddToWishlistButton({
    isFav,
    user,
    secretKey,
    productid,
    productList,
}) {
    const userid = user ? user.userid : null;
    const [loading, setLoading] = useState(false);
    const [productIsFav, setProductIsFav] = useState(isFav || false);
    const [wishlistUpdated, setWishlistUpdated] = useState(false);

    useEffect(() => {
        setProductIsFav(isFav);
    }, [isFav, productid]);

    const likedButtonClass = productIsFav
        ? "flex top-2 right-2 p-2 text-red-500"
        : "flex top-2 right-2 p-2 text-gray-400";

    function addToWishlist() {
        if (userid) {
            setWishlistUpdated(false);
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

                    productList.filter((item) => {
                        if (item.id === productid)
                            return (item.wishlist = true);
                    });
                    setWishlistUpdated(true);
                } else {
                    setProductIsFav(false);
                    productList.filter((item) => {
                        if (item.id === productid)
                            return (item.wishlist = false);
                    });
                    setWishlistUpdated(true);
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
            {wishlistUpdated ? (
                <Toast
                    msg={"Wishlist updated successfully!"}
                    type="success"
                />
            ) : null}
            <button
                className={likedButtonClass}
                onClick={addToWishlist}>
                <FavoriteIcon />
            </button>
        </div>
    );
}
