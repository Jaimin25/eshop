import { connectionSrv } from "@/app/lib/dbConnection";
import { UserAddress } from "@/app/lib/model/address";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
    const userId = new URL(req.url).searchParams.get("userId");
    const url_secret = new URL(req.url).searchParams.get("secretKey");
    const secretCheck = process.env.protection_secret;

    let data = [];
    let result = {};

    if (url_secret == secretCheck) {
        try {
            await mongoose.connect(connectionSrv);
            data = await UserAddress.findOne({ userid: userId });

            if (data) {
                result = { result: { user: data }, success: true };
            } else {
                result = { result: data, success: false };
            }
        } catch (error) {
            result = { result: error, success: false };
        }
    } else {
        result = { result: "You don't have access!", success: false };
    }
    return NextResponse.json(result);
}
