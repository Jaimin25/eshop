"use client";
import { useEffect, useState } from "react";
import CartProduct from "../../cards/cartProductsCard";
import RemoveFromCart from "../../ui/buttons/removeFromCartButton";
import EmptyCart from "./emptyCart";
import { useSession } from "next-auth/react";
import { base_url } from "@/app/lib/baseUrl";
import Loader from "../../ui/loader";
import PlaceOrderButton from "../../ui/buttons/placeOrderButton";

export default function CartSection({ secretKey }) {
    const { data: session } = useSession();
    const sessionUser = session ? session.user : null;

    const [loading, setLoading] = useState(false);
    const [itemRemoved, setItemRemoved] = useState("");
    const [filteredCart, setFilteredCart] = useState([]);

    let sumTotal = 0;

    useEffect(() => {
        if (itemRemoved === "") {
            setLoading(true);
            getUserCart();
        }
    }, [session, itemRemoved]);

    const getUserCart = async () => {
        try {
            const res = await fetch(
                `${base_url}/api/account/user/cart?userId=${
                    sessionUser.userid
                }&secretKey=${encodeURIComponent(secretKey)}`
            );
            if (res.ok) {
                const result = await res.json();
                const cart = result.result.cart;

                const cartProducts = await Promise.all(
                    cart.map(async (item) => {
                        const productDetail = await getProductDetails(
                            item.productid,
                            item.quantity,
                            item._id
                        );
                        return productDetail;
                    })
                );

                setLoading(false);
                setFilteredCart(cartProducts);
            }
            setLoading(false);
            return;
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const getProductDetails = async (id, quantity, cartid) => {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const result = await res.json();
        result.quantity = quantity;
        result._id = cartid;
        return result;
    };

    useEffect(() => {
        if (itemRemoved !== "true") {
            const newFilteredCart = filteredCart.filter(
                (item) => item._id !== itemRemoved
            );
            setFilteredCart(newFilteredCart);
        } else {
            setFilteredCart({});
        }
        if (itemRemoved !== "") {
            setLoading(false);
        }
    }, [itemRemoved]);

    return (
        <div className="w-full flex justify-center">
            {loading ? <Loader /> : null}
            {filteredCart.length > 0 ? (
                <div className="w-full">
                    {filteredCart.map((item, index) => (
                        <CartProduct
                            item={item}
                            key={index}
                            secretKey={secretKey}
                            onItemChange={setItemRemoved}
                        />
                    ))}
                    <div className="bg-white shadow flex flex-col p-2 mx-2">
                        <p className="text-end">
                            Total:{" "}
                            {filteredCart.map((item, index) => {
                                let totalPrice = item.price * item.quantity;
                                sumTotal += totalPrice;
                            })}
                            ${sumTotal}
                        </p>
                        <hr className="border-b my-2" />
                        <PlaceOrderButton
                            filteredCart={filteredCart}
                            secretKey={secretKey}
                            onItemRemove={setItemRemoved}
                            orderTotal={sumTotal}
                            setLoading={setLoading}
                        />
                    </div>
                </div>
            ) : !loading ? (
                <EmptyCart />
            ) : null}
        </div>
    );
}
