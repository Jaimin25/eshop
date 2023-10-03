"use client";

import { base_url } from "@/app/lib/baseUrl";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AccountDetails({ secret }) {
    let [userData, setUserData] = useState([]);

    const { data: session } = useSession();

    const sessionUser = session ? session.user : null;

    useEffect(() => {
        getUserDetails();
    }, [sessionUser]);

    const getUserDetails = async (e) => {
        try {
            const res = await fetch(
                `${base_url}/api/user?email=${
                    sessionUser?.email
                }&secret=${encodeURIComponent(secret)}`
            );

            if (res.ok) {
                const userData = await res.json();
                setUserData(userData.result.user);
            } else {
                console.error("Failed to fetch data:", res.statusText);
            }
            return;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    return (
        <div className="flex justify-center w-full">
            user
            {userData ? userData.fullname : null}
        </div>
    );
}
