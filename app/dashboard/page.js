import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

export default function Dashboard() {
    const secret = process.env.protection_secret;

    const getUserDetails = async (e) => {
        const session = await getServerSession(authOptions);
        const user = session ? session.user : null;
        const res = await fetch(
            `http://localhost:3000//api/user?email=${
                user.email
            }&secret=${encodeURIComponent(secret)}`
        );

        const userData = await res.json();
        console.log(userData);
    };
    getUserDetails();

    return <div></div>;
}
