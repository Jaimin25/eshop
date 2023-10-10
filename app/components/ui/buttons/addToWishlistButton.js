"use client";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSession } from "next-auth/react";

export default function AddToWishlistButton() {
    function addToWishlist() {
        console.log("Added");
    }
    return (
        <button
            className="flex top-2 right-2 p-2 text-gray-400 hover:text-red-500"
            onClick={addToWishlist}>
            <FavoriteIcon />
        </button>
    );
}
