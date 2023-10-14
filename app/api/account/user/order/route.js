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

        if (userId === null) {
            const orderId = new URL(req.url).searchParams.get("orderId");

            if (mongoose.Types.ObjectId.isValid(orderId)) {
                const data = await UserOrder.findById(orderId).exec();
                if (data) {
                    result = { result: data, success: true };
                } else {
                    result = { result: data, success: false };
                }
            } else {
                result = { result: null, success: false };
            }
        } else {
            const data = await UserOrder.find({ userid: userId }).exec();
            if (data) {
                result = { result: data, success: true };
            } else {
                result = { result: data, success: false };
            }
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
            tax: 0,
            shipping: 0,
        });

        if (data) {
            result = {
                result: { msg: "Placed your successfully!", id: data._id },
                succes: true,
            };
        } else {
            result = {
                result: "Problem placing your order",
                success: false,
            };
        }
    }
    return NextResponse.json(result);
}

export async function DELETE(req) {
    const { userid, orderid, secretKey } = await req.json();
    const secretCheck = process.env.protection_secret;
    let result = {};
    if (secretCheck === secretKey) {
        await mongoose.connect(connectionSrv);
        const data = await UserOrder.deleteOne({
            _id: orderid,
            userid: userid,
        });
        if (data.acknowledged === true) {
            result = { result: "Order cancelled!", success: true };
        } else {
            result = { result: "Error cancelling order", success: false };
        }
    } else {
        result = { result: "You don't have access!", success: false };
    }

    return NextResponse.json(result);
}
