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

export async function POST(req) {
    const { address, city, state, country, zipcode, secretKey, userId } =
        await req.json();
    const secretCheck = process.env.protection_secret;
    let result = {};

    if (secretCheck === secretKey) {
        try {
            await mongoose.connect(connectionSrv);
            await UserAddress.create({
                userid: userId,
                address,
                city,
                state,
                country,
                zipcode,
            });
            result = { result: "Added address successfully", success: true };
        } catch (error) {
            console.log(error);
            result = { result: error, success: false };
        }
    } else {
        result = { result: "You don't have access!", success: false };
    }
    return NextResponse.json(result);
}

export async function PUT(req) {
    const {
        address,
        city,
        state,
        country,
        zipcode,
        secretKey,
        addressId,
        userId,
    } = await req.json();
    const secretCheck = process.env.protection_secret;

    let result = {};

    if (secretCheck === secretKey) {
        try {
            await mongoose.connect(connectionSrv);
            const filter = { _id: addressId };
            const update = {
                userid: userId,
                address: address,
                city: city,
                state: state,
                country: country,
                zipcode: zipcode,
            };
            const doc = await UserAddress.findOneAndUpdate(filter, update, {
                new: true,
            });
            console.log(doc);
            result = { result: "Address updated!", succes: true };
        } catch (error) {
            result = { result: error, success: false };
        }
    } else {
        result = { result: "You don't have access!", success: false };
    }
    return NextResponse.json(result);
}
