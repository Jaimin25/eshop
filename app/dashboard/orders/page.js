import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import OrderListComponent from "@/app/components/pages/dashboard/orderListComponent";
import { base_url } from "@/app/lib/baseUrl";
import { getServerSession } from "next-auth";

export default async function OrderListPage() {
    const secretKey = process.env.protection_secret;
    const session = await getServerSession(authOptions);
    const userid = session.user.userid.toString();

    async function getUserOrder() {
        const data = await fetch(
            `${base_url}/api/account/user/order?userId=${userid}&secretKey=${encodeURIComponent(
                secretKey
            )}`
        );
        const res = await data.json();
        return res.result;
    }
    const ordersList = await getUserOrder();

    return (
        <OrderListComponent
            secretKey={secretKey}
            ordersList={ordersList}
        />
    );
}
