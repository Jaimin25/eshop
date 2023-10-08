"use client";
import { useEffect, useState } from "react";
import CartProduct from "../../cards/cartProductsCard";
import RemoveFromCart from "../../ui/buttons/removeFromCartButton";

export default function CartSection({ cartProducts, secretKey }) {
    let sumTotal = 0;

    const [itemRemoved, setItemRemoved] = useState("");
    const [filteredCart, setFilteredCart] = useState(cartProducts);
    useEffect(() => {
        const newFilteredCart = filteredCart.filter(
            (item) => item._id !== itemRemoved
        );
        console.log(newFilteredCart);
        setFilteredCart(newFilteredCart);
    }, [itemRemoved]);

    return (
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
                    {cartProducts.map((item, index) => {
                        let totalPrice = item.price * item.quantity;
                        sumTotal += totalPrice;
                    })}
                    ${sumTotal}
                </p>
            </div>
        </div>
    );
}
