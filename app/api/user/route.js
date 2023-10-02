import { connectionSrv } from "@/app/lib/dbConnection";
import { User } from "@/app/lib/model/user";
import mongoose from "mongoose";
import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req) {
    const url_secret = new URL(req.url).searchParams.get("secret");
    const secret = process.env.protection_secret;

    let result = {};

    if (url_secret == secret) {
        const email = new URL(req.url).searchParams.get("email");

        let data = [];
        try {
            await mongoose.connect(connectionSrv);
            data = await User.findOne(
                { email },
                { email: 1, username: 1, createdAt: 1 }
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
