import { connectionSrv } from "@/app/lib/dbConnection";
import { UserOrder } from "@/app/lib/model/order";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
    const url_secret = new URL(req.url).searchParams.get("secretKey");
    const secret = process.env.protection_secret;

    let result = {};

    if (url_secret == secret) {
        const userId = new URL(req.url).searchParams.get("userId");
        await mongoose.connect(connectionSrv);
        const data = await UserOrder.find({ userid: userId });
        if (data) {
            result = { result: { orders: data }, success: true };
        } else {
            result = { result: data, success: false };
        }
    } else {
        result = { result: "You don't have access!", success: false };
    }
    return NextResponse.json(result);
}

export async function POST(req) {
    const secret = process.env.protection_secret;
    const { userId, secretKey, status, products, orderTotal } =
        await req.json();
    let result = {};
    if (secret === secretKey) {
        await mongoose.connect(connectionSrv);
        const data = await UserOrder.create({
            userid: userId,
            products: products,
            status: status,
            orderTotal: orderTotal,
        });
        if (data) {
            result = { result: "Placed your successfully!", succes: true };
        } else {
            result = {
                result: "Problem placing your order",
                success: false,
            };
        }
    }
    return NextResponse.json(result);
}
