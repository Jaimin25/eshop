import mongoose from "mongoose";

const cartModel = new mongoose.Schema(
    {
        userid: String,
        productid: String,
        quantity: String,
    },
    { timestamps: true }
);

export const UserCart =
    mongoose.models.userscart || mongoose.model("userscart", cartModel);
