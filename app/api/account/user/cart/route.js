import { connectionSrv } from "@/app/lib/dbConnection";
import { UserCart } from "@/app/lib/model/cart";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
    const url_secret = new URL(req.url).searchParams.get("secretKey");
    const secret = process.env.protection_secret;

    let result = {};

    if (url_secret == secret) {
        const userId = new URL(req.url).searchParams.get("userId");
        await mongoose.connect(connectionSrv);
        const data = await UserCart.find({ userid: userId });
        if (data) {
            result = { result: { cart: data }, success: true };
        } else {
            result = { result: data, success: false };
        }
    } else {
        result = { result: "You don't have access!", success: false };
    }
    return NextResponse.json(result);
}

export async function POST(req) {
    const { userid, productid, quantity, secretKey } = await req.json();
    const secretCheck = process.env.protection_secret;
    let result = {};
    if (secretCheck === secretKey) {
        await mongoose.connect(connectionSrv);
        const data = await UserCart.findOne({
            userid: userid,
            productid: productid,
        });

        if (data) {
            const filter = {
                userid: userid,
                productid: productid,
            };
            const update = {
                quantity: quantity,
            };

            const data = await UserCart.findOneAndUpdate(filter, update, {
                new: true,
            });
            if (data) {
                result = { result: "Cart updated!", succes: true };
            } else {
                result = { result: "Problem updating cart", success: false };
            }
        } else {
            const data = await UserCart.create({ userid, productid, quantity });

            if (data) {
                result = { result: "Added to cart!", succes: true };
            } else {
                result = { result: "Problem adding to cart", success: false };
            }
        }
    } else {
        result = { result: "You don't have access!", success: false };
    }

    return NextResponse.json(result);
}
