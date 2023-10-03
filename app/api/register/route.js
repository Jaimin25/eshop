import { connectionSrv } from "@/app/lib/dbConnection";
import { User } from "@/app/lib/model/user";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
export async function POST(req) {
    let result = {};

    try {
        const { fullname, email, password, provider } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        await mongoose.connect(connectionSrv);
        await User.create({
            fullname,
            email,
            password: hashedPassword,
            provider,
        });
        result = { result: "Account created!", succes: true };
    } catch (error) {
        console.log(error);
        result = { result: error, success: false };
    }

    return NextResponse.json(result);
}
