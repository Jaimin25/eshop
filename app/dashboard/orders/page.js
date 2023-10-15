import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import OrderListComponent from "@/app/components/pages/dashboard/orderListComponent";
import { base_url } from "@/app/lib/baseUrl";
import { getServerSession } from "next-auth";

export default async function OrderListPage() {
    const secretKey = process.env.protection_secret;

    return <OrderListComponent secretKey={secretKey} />;
}
