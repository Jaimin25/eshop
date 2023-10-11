"use client";

import { useState, useEffect } from "react";
import CartProduct from "../../cards/cartProductsCard";
import Loader from "../../ui/loader";
import { useSession } from "next-auth/react";
import { base_url } from "@/app/lib/baseUrl";
import WishlistProduct from "../../cards/wishlistProductsCard";

export default function WishlistComponent({ secret }) {
    const { data: session } = useSession();
    const sessionUser = session ? session.user : null;

    const [loading, setLoading] = useState(false);
    const [itemRemoved, setItemRemoved] = useState("");
    const [filteredCart, setFilteredCart] = useState([]);

    useEffect(() => {
        setItemRemoved("");
        if (itemRemoved === "") {
            setLoading(true);
            getUserWishlist();
        }
    }, [session, itemRemoved]);

    const getUserWishlist = async () => {
        try {
            const res = await fetch(
                `${base_url}/api/account/user/wishlist?userId=${
                    sessionUser.userid
                }&secretKey=${encodeURIComponent(secret)}`
            );
            if (res.ok) {
                const result = await res.json();
                const wishlist = result.result.wishlist;

                const wishlistProducts = await Promise.all(
                    wishlist.map(async (item) => {
                        const productDetail = await getProductDetails(
                            item.productid,
                            item._id,
                            item.createdAt
                        );
                        return productDetail;
                    })
                );

                setLoading(false);
                setFilteredCart(wishlistProducts);
            }
            setLoading(false);
            return;
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const getProductDetails = async (id, wishlistid, addedDate) => {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const result = await res.json();
        result._id = wishlistid;
        result.addedAt = addedDate;
        return result;
    };

    useEffect(() => {
        const newFilteredCart = filteredCart.filter(
            (item) => item._id !== itemRemoved
        );
        setFilteredCart(newFilteredCart);
        if (itemRemoved !== "") {
            setLoading(false);
        }
    }, [itemRemoved]);

    return (
        <div className="w-full flex flex-col justify-center">
            {loading ? <Loader /> : null}
            <p className="text-base font-bold p-2 text-[#262626]">
                Your Wishlist
            </p>
            <hr className="border-b-1 m-2" />
            {filteredCart.length > 0 ? (
                <div className="w-full">
                    {filteredCart.map((item, index) => (
                        <WishlistProduct
                            item={item}
                            key={index}
                            secretKey={secret}
                            onItemChange={setItemRemoved}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-1 justify-center">
                    <p className="p-2">
                        You have no items in your wishlist yet.
                    </p>
                </div>
            )}
        </div>
    );
}
