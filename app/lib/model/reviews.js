import mongoose from "mongoose";

const ReviewModel = new mongoose.Schema(
    {
        productid: String,
        userid: String,
        username: String,
        review: String,
        rating: String,
        status: String,
    },
    { timestamps: true }
);

export const UserReview =
    mongoose.models.userreviews || mongoose.model("userreviews", ReviewModel);
