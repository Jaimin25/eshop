import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    const user = session ? session.user : null;
    const secret = process.env.protection_secret;
    let userData = {};
    const getUserDetails = async (e) => {
        try {
            const res = await fetch(
                `http://localhost:3000//api/user?email=${
                    user.email
                }&secret=${encodeURIComponent(secret)}`
            );

            userData = await res.json();
            return userData.result.user;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    userData = await getUserDetails();
    return (
        <div className="flex justify-center w-full">
            {userData ? userData.username : null}
        </div>
    );
}
