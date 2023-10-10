import mongoose from "mongoose";

const WishlistModel = new mongoose.Schema(
    {
        userid: String,
        productid: String,
    },
    { timestamps: true }
);

export const UserWishlist =
    mongoose.models.userswishlist ||
    mongoose.model("userswishlist", WishlistModel);
