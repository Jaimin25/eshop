import { connectionSrv } from "@/app/lib/dbConnection";
import { User } from "@/app/lib/model/user";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
export async function POST(req) {
    let result = {};

    try {
        const { username, email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log({ username, email, password });
        await mongoose.connect(connectionSrv);
        await User.create({ username, email, password: hashedPassword });
        result = { result: "Account created!", succes: true };
    } catch (error) {
        console.log(error);
        result = { result: error, success: false };
    }

    return NextResponse.json(result);
}
