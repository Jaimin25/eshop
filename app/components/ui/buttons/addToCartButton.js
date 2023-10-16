"use client";

import { base_url } from "@/app/lib/baseUrl";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Toast } from "../toast";

export default function AddToCartButton({ productDetail, secretKey }) {
    const { data: session } = useSession();
    const sessionUser = session ? session.user : null;

    const [quantity, setQuantity] = useState(1);

    const [cartUpdated, setCartUpdated] = useState(false);
    const [error, setError] = useState(null);

    const addToCartSubmit = async (e) => {
        const res = await fetch(`${base_url}/api/account/user/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userid: sessionUser.userid,
                productid: productDetail.id,
                quantity,
                secretKey: secretKey,
            }),
        });

        if (res.ok) {
            setCartUpdated(true);
            reloadSession();
        }
    };

    const reloadSession = () => {
        const event = new Event("visibilitychange");
        document.dispatchEvent(event);
    };
    function addToCart() {
        if (sessionUser) {
            setCartUpdated(false);
            addToCartSubmit();
        } else {
            setError("Not authenticated!");
        }
        setError(null);
    }
    return (
        <>
            {cartUpdated ? (
                <Toast
                    msg={"Cart updated successfully!"}
                    type={"success"}
                />
            ) : null}
            {error ? (
                <Toast
                    msg={error}
                    type={"error"}
                />
            ) : null}
            <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="p-2 ml-5 border rounded-sm w-3/4 outline-none"></input>
            <div className="flex m-4 justify-center">
                <button
                    className="text-sm flex justify-center items-center shadow p-2"
                    onClick={addToCart}>
                    <img
                        className="h-7 p-1"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACrUlEQVR4nO2ZO4xMURjHf1YyjalorAqVkXg0VuFViA2xGla2oGIlXhGroluFR8Go6GzhHatCRWM7q/Co2MSuhFgVjV2yEhn55H/lkp2559wZe7+IX3KSyZzv/93/yb333O+cA/+pSwnoAW4Cr4AJNft9Q30W45qdwBhQy2ijwA4cMhuopow+BQ4DFWCOWkX/PUvFnZPWDVUZ+wrsAWY1iG0DehWbDMbN41QDvgBrInRrU4PZTsGUUu+E3YlY9kn7uugJoCf1TtgjE4tpniuH3dnCuCUTh5rIcUQ5rlMgIzKxpIkcS5XDvjOF8Vkmyk3kKCuH5SqM5HvgJc+/P5DJgHJjptpk3kHMc2C+9kebm2cgKwNmk5l6tEbUvyJP8m0SP2jCQChZeR6qvytP8oMSD9Tp35gyYL/zEpJnQP3mKZqzEvfX6R9NGbBaKS8heU6q/0yeC1yT2Eru6XiXMvA2zwUi8vSq3zxFMyRxZ53+LTJhF9+c5wIReTrlxTxF86YFdVSrqMiLLRmiy+upFtRRraIsL99ilwsLJPyIHz7JU3uMaLVEtujxwgt56sizDr+LH+7JU3eM6JhEF/HDJXnqixFdkOg4fjghT7b1FMwdiXbhh93yNBgjeiLROvywXp6GY0QfJFqIHxbJ03iowDbKvqt52jUvxfparJG/xx/j8mZ3J5MNCn6MP4blzd6X4NnhNv4YjJlNk/n6PP6oxnzfki/oUfzRF1Nx3Fewx6Oxbnmzuiu4ylyFPzpiqvKk7p+PP9pD10nJSmwq58HN36YtdOWarI1ti8YrYyF7CcluxSP8MiSPmxoF7VXQFfxyNeTwtV9Bp/DL6Ywd0N/2WPfjlwPyeJmAXe+t+KUr4JTg51mIBS3DL8vl8WWjoAkHp1K1wGZep8XjUVtW+3UU9wNY5IVjWCP9OAAAAABJRU5ErkJggg=="
                    />
                    Add To Bag
                </button>
            </div>
        </>
    );
}
