"use client";

import { useState } from "react";

export default function PlaceOrderButton({
    filteredCart,
    secretKey,
    onItemRemove,
}) {
    function onPlaceOrderClick() {
        onItemRemove("true");
        console.log(
            filteredCart.map((item) => {
                return {
                    id: item.id,
                    quantity: item.quantity,
                    status: "not processed",
                };
            })
        );
    }

    return (
        <button
            onClick={onPlaceOrderClick}
            className="self-end px-2 py-1 border m-1 text-base">
            Place Order
        </button>
    );
}
