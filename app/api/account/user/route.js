import { connectionSrv } from "@/app/lib/dbConnection";
import { User } from "@/app/lib/model/user";
import mongoose from "mongoose";
import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req) {
    const url_secret = new URL(req.url).searchParams.get("secretKey");
    const secret = process.env.protection_secret;

    let result = {};

    if (url_secret == secret) {
        const email = new URL(req.url).searchParams.get("email");

        let data = [];
        try {
            await mongoose.connect(connectionSrv);
            data = await User.findOne(
                { email },
                { email: 1, fullname: 1, provider: 1, createdAt: 1 }
            );
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

export async function PUT(req) {
    const { fullname, secretKey, userId } = await req.json();
    const secretCheck = process.env.protection_secret;

    let result = {};

    if (secretCheck === secretKey) {
        try {
            await mongoose.connect(connectionSrv);
            const filter = { _id: userId };
            const update = { fullname: fullname };

            const doc = await User.findOneAndUpdate(filter, update, {
                new: true,
            });
            result = { result: "Details updated!", succes: true };
        } catch (error) {
            result = { result: error, success: false };
        }
    } else {
        result = { result: "You don't have access!", success: false };
    }
    return NextResponse.json(result);
}
