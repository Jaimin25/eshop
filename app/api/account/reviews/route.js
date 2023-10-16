import { connectionSrv } from "@/app/lib/dbConnection";
import { UserReview } from "@/app/lib/model/reviews";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
    const url_secret = new URL(req.url).searchParams.get("secretKey");
    const secret = process.env.protection_secret;

    let result = {};

    if (url_secret == secret) {
        const productid = new URL(req.url).searchParams.get("productId");
        await mongoose.connect(connectionSrv);
        const data = await UserReview.find({ productid: productid });

        if (data) {
            result = { result: { reviews: data }, success: true };
        } else {
            result = { result: data, success: false };
        }
    } else {
        result = { result: "You don't have access!", success: false };
    }
    return NextResponse.json(result);
}

export async function POST(req) {
    const { secretKey, userid, productid, username, review, rating, status } =
        await req.json();

    const secret = process.env.protection_secret;

    let result = {};

    if (secretKey == secret) {
        await mongoose.connect(connectionSrv);
        const checkIfExists = await UserReview.findOne({
            userid: userid,
            productid: productid,
        });

        if (checkIfExists) {
            result = { result: "User have already reviewd!", success: false };
        } else {
            const data = await UserReview.create({
                productid,
                userid,
                username,
                review,
                rating,
                status,
            });

            if (data) {
                result = { result: "Submitted review!", succes: true };
            } else {
                result = { result: "Problem adding to cart", success: false };
            }
        }
    } else {
        result = { result: "You don't have access!", success: false };
    }
    return NextResponse.json(result);
}
