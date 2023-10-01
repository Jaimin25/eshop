import { connectionSrv } from "@/app/lib/dbConnection";
import { User } from "@/app/lib/model/user";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
export async function POST(req) {
    let result = {};
    try {
        const { name, email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        await mongoose.connect(connectionSrv);
        await User.create({ name, email, password: hashedPassword });
        result = { result: "Account created!", succes: true };
    } catch (error) {
        result = { result: error, success: false };
    }

    return NextResponse.json(result);
}
