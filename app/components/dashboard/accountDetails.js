"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function AccountDetails() {
    let userData = {};

    const { data: session } = useSession();

    const sessionUser = session ? session.user : null;

    useEffect(() => {
        userData = async (e) => {
            try {
                const secret = process.env.protection_secret;
                const res = await fetch(
                    `https://eshop-gilt-tau.vercel.app/api/user?email=${
                        sessionUser.email
                    }&secret=${encodeURIComponent(secret)}`
                );

                userData = await res.json();
                return userData.result.user;
            } catch (error) {
                console.log(error);
                return null;
            }
        };
    }, []);
    console.log(sessionUser);
    return (
        <div className="flex justify-center w-full">
            {userData ? userData.username : null}
        </div>
    );
}
