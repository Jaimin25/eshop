import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { base_url } from "@/app/lib/baseUrl";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function OrderSuccessPage(params) {
    const secretKey = process.env.protection_secret;
    const session = await getServerSession(authOptions);
    const orderId = params.params.id.toString();
    const userid = session.user.userid.toString();
    async function getUserOrder() {
        const data = await fetch(
            `${base_url}/api/account/user/order?userId=${userid}&secretKey=${encodeURIComponent(
                secretKey
            )}&orderId=${orderId}`
        );
        const res = await data.json();
        return res.result;
    }

    const order = await getUserOrder();

    return (
        <div className="mt-6 justify-center flex">
            {order !== null ? (
                <div className="flex flex-col justify-center text-center gap-3 bg-white shadow mx-4 lg:p-8 md:p-8 py-8 px-2 lg:w-2/3 md:w-2/3">
                    <h1 className="text-lg font-semibold">
                        Thank you for your order.{" "}
                    </h1>
                    <p className="text-sm">
                        Order{" "}
                        <Link
                            href={"/order/" + orderId}
                            className="text-[#65676b] hover:text-black font-medium transition">
                            #{orderId}
                        </Link>{" "}
                        is complete.
                    </p>
                    <p className="text-sm">
                        A confirmation email will be sent to you shortly.
                    </p>
                    <div className="flex justify-center gap-3 text-sm">
                        <button className="border px-3 py-2">
                            Manage Orders
                        </button>
                        <Link href="/shop">
                            <button className="border px-3 py-2">
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center">
                    <p>No Order Found!</p>
                </div>
            )}
        </div>
    );
}
