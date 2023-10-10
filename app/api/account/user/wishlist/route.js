import { UserWishlist } from "@/app/lib/model/wishlist";

export async function GET(req) {
    const url_secret = new URL(req.url).searchParams.get("secretKey");
    const secret = process.env.protection_secret;

    let result = {};

    if (url_secret == secret) {
        const userId = new URL(req.url).searchParams.get("userId");
        await mongoose.connect(connectionSrv);
        const data = await UserWishlist.find({ userid: userId });
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
