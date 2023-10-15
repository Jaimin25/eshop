"use client";

import { base_url } from "@/app/lib/baseUrl";
import { useRouter } from "next/navigation";

import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

export default function CancelOrderButton({ order, userid, secretKey }) {
    const router = useRouter();

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);

    const cancelOrderSubmit = async () => {
        const res = await fetch(`${base_url}/api/account/user/order`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userid: userid,
                orderid: order._id,
                secretKey: secretKey,
            }),
        });

        if (res.ok) {
            const data = await res.json();

            if (data.result === "Order cancelled!") {
                router.push("/dashboard/orders").then(() => {
                    window.location.reload();
                });
            }
        }

        if (res.error) {
            console.log(res.error);
        }
    };

    function onCancelClick() {
        handleOpen();
        cancelOrderSubmit();
    }
    return (
        <>
            <button
                onClick={handleOpen}
                className="border border-[#e4e6eb] text-sm px-3 py-1">
                Cancel Order
            </button>
            <Dialog
                open={open}
                handler={handleOpen}>
                <DialogHeader>Confirm Cancellation</DialogHeader>
                <DialogBody className="text-[#323232]">
                    Are you sure you want to cancel order{" "}
                    <span className="text-black">#{order._id}</span>?
                </DialogBody>
                <DialogFooter className="text-black">
                    <button
                        onClick={handleOpen}
                        className="mr-1 text-red-600 text-md font-semibold hover:bg-red-50 hover:transition-all px-2 py-1">
                        <span>Cancel</span>
                    </button>
                    <button
                        className=" text-green-600 text-md font-semibold hover:bg-green-50 hover:transition-all px-2 py-1"
                        onClick={onCancelClick}>
                        <span>Confirm</span>
                    </button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
