import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import AccountDetails from "../components/dashboard/accountDetails";

export default function Dashboard() {
    return (
        <div className="flex justify-center w-full">
            <AccountDetails />
        </div>
    );
}
