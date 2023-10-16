"use client";
import { Button, Rating } from "@material-tailwind/react";
import Select from "react-select";
import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { base_url } from "@/app/lib/baseUrl";

const options = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
];

export default function Review({ secretKey, productid }) {
    const { data: session } = useSession();
    const sessionUser = session ? session.user : null;
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);

    async function onSubmit(event) {
        event.preventDefault();
        try {
            const res = await fetch(`${base_url}/api/account/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    secretKey: secretKey,
                    userid: sessionUser.userid,
                    productid: productid,
                    username: sessionUser.name,
                    review: review,
                    rating: rating,
                    status: "pending",
                }),
            });
            if (res.ok) {
                const data = await res.json();
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="p-4 bg-white rounded shadow">
            <h1 className="p-1 mt-2 text-base font-semibold text-[#262626]">
                Add Review
            </h1>
            <form
                onSubmit={onSubmit}
                className="flex flex-col">
                <p className="p-1 mt-2">Comment</p>
                <textarea
                    type="text"
                    placeholder="Write comment"
                    rows="5"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className=" w-full resize-y text-sm px-[10px] py-[8px] border rounded-sm cursor-text outline-none"
                    required></textarea>
                <p className="p-1 mt-2">Rating</p>

                <Rating
                    className="mx-[2px]"
                    onChange={(count) => setRating(count)}
                    required
                />

                <Button
                    type="submit"
                    size="sm"
                    variant="outlined"
                    className="my-4"
                    ripple={false}>
                    Submit
                </Button>
            </form>
        </div>
    );
}
