import { connectionSrv } from "@/app/lib/dbConnection";
import { User } from "@/app/lib/model/user";
import mongoose from "mongoose";
import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req) {
    const email = new URL(req.url).searchParams.get("email");

    let data = [];
    let result = {};
    try {
        await mongoose.connect(connectionSrv);
        data = await User.findOne({ email }).select("_id");
        if (data) {
            result = { result: data, success: true };
        } else {
            result = { result: data, success: false };
        }
    } catch (error) {
        result = { result: error, success: false };
    }
    return NextResponse.json(result);
}
