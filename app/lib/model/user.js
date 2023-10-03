import mongoose from "mongoose";
const userModel = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        provider: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const User = mongoose.models.users || mongoose.model("users", userModel);
