import { connectionSrv } from "@/app/lib/dbConnection";
import { UserWishlist } from "@/app/lib/model/wishlist";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
    const url_secret = new URL(req.url).searchParams.get("secretKey");
    const secret = process.env.protection_secret;

    let result = {};

    if (url_secret == secret) {
        const userId = new URL(req.url).searchParams.get("userId");
        await mongoose.connect(connectionSrv);
        const data = await UserWishlist.find({ userid: userId });

        if (data) {
            result = { result: { wishlist: data }, success: true };
        } else {
            result = { result: data, success: false };
        }
    } else {
        result = { result: "You don't have access!", success: false };
    }
    return NextResponse.json(result);
}

export async function POST(req) {
    const { userid, productid, secretKey } = await req.json();
    const secretCheck = process.env.protection_secret;
    let result = {};
    if (secretCheck === secretKey) {
        await mongoose.connect(connectionSrv);
        const data = await UserWishlist.create({ userid, productid });
        if (data) {
            result = { result: "Added to wishlist!", succes: true };
        } else {
            result = { result: "Problem adding to wishlist", success: false };
        }
    } else {
        result = { result: "You don't have access!", success: false };
    }

    return NextResponse.json(result);
}

export async function DELETE(req) {
    const { userid, productid, secretKey } = await req.json();
    const secretCheck = process.env.protection_secret;
    let result = {};
    if (secretCheck === secretKey) {
        await mongoose.connect(connectionSrv);
        const data = await UserWishlist.deleteOne({
            userid: userid,
            productid: productid,
        });
        if (data.acknowledged === true) {
            result = { result: "Removed from wishlist!", success: true };
        } else {
            result = { result: "Error removing from wishlist", success: false };
        }
    } else {
        result = { result: "You don't have access!", success: false };
    }

    return NextResponse.json(result);
}
