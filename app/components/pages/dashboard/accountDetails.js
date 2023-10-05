"use client";

import { base_url } from "@/app/lib/baseUrl";
import { Input } from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loader from "../../ui/loader";

export default function AccountDetails({ secret }) {
    let [userData, setUserData] = useState([]);

    const { data: session } = useSession();

    const sessionUser = session ? session.user : null;

    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

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
                const userdata = await res.json();
                setUserData(userdata.result.user);

                setFirstName(
                    userdata.result.user
                        ? String(userdata.result.user.fullname).split(" ")[0]
                        : ""
                );
                setLastName(
                    userdata.result.user
                        ? String(userdata.result.user.fullname).split(" ")[1]
                        : ""
                );
            } else {
                console.error("Failed to fetch data:", res.statusText);
            }
            return;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        try {
            const userId = userData._id;
            const fullname = firstName + " " + lastName;

            const secretKey = secret;

            const res = await fetch(`${base_url}/api/user`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullname,
                    secretKey,
                    userId,
                }),
            });
            if (res.ok) {
                setLoading(false);
            }

            if (res.error) {
                setLoading(false);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    function saveChanges() {
        setLoading(true);
        handleSubmit();
    }

    return (
        <div className="flex flex-col w-full p-2">
            {loading ? <Loader /> : null}
            <p className="text-base font-semibold p-2">Account Details</p>
            <hr className="border-b-1 m-2" />
            <p className="p-2 text-sm text-[#323232] mt-1">
                Logged in with {userData ? userData.provider : null}
            </p>
            <div className="flex gap-2 mt-2 text-[#323232]">
                <div className="flex-col p-2 text-sm">
                    <p className="mb-2">First Name</p>
                    <input
                        placeholder="Enter your first name"
                        type="text"
                        className="outline-none p-2 border"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="flex-col p-2 text-sm">
                    <p className="mb-2">Last Name</p>
                    <input
                        placeholder="Enter your last name"
                        type="text"
                        className="outline-none p-2 border"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
            </div>
            <div className="p-2 mt-2 text-sm text-[#323232]">
                <button
                    className="p-2 border outline-none"
                    onClick={saveChanges}>
                    Save Changes
                </button>
            </div>
        </div>
    );
}
