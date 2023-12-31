import mongoose from "mongoose";

const ProductOrderModel = new mongoose.Schema({
    id: String,
    quantity: String,
    status: String,
});

const OrderModel = new mongoose.Schema(
    {
        userid: String,
        products: [ProductOrderModel],
        status: String,
        orderTotal: String,
        tax: String,
        shipping: String,
    },
    { timestamps: true }
);

export const UserOrder =
    mongoose.models.userorders || mongoose.model("userorders", OrderModel);
