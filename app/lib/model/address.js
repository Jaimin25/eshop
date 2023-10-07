import mongoose from "mongoose";

const addressModel = new mongoose.Schema(
    {
        userid: String,
        address: String,
        city: String,
        state: String,
        country: String,
        zipcode: String,
    },
    { timestamp: true }
);

export const UserAddress =
    mongoose.models.addresses || mongoose.model("addresses", addressModel);
