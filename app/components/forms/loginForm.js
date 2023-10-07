"use client";

import { Typography, Input } from "@material-tailwind/react";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import Loader from "../ui/loader";
import { useRouter } from "next/navigation";
import { base_url } from "@/app/lib/baseUrl";

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        try {
            const checkUserExists = await fetch(
                `${base_url}/api/account/userExists?email=${email}`
            );
            const user = await checkUserExists.json();

            if (user.result === null) {
                setLoading(false);
                setError(`No account found with that email!`);
                return;
            }

            if (user.result.provider !== "credentials") {
                setLoading(false);
                setError(
                    `That email is already use in with ${user.result.provider}`
                );
                return;
            }

            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            setLoading(false);

            if (res.error) {
                setError("Invalid credentials!");
                return;
            }
            router.push("/");
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };
    function signInUser(event) {
        event.preventDefault();
        setLoading(true);
        handleSubmit();
    }
    return (
        <div className="flex flex-col bg-white p-4 px-8 gap-4 w-full lg:w-1/3 md:w-1/2">
            {loading ? <Loader /> : null}
            <p className="text-xl font-semibold">Login</p>
            <form
                onSubmit={signInUser}
                className="flex flex-col bg-white gap-4 w-full">
                <Input
                    label="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    label="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Typography
                    variant="small"
                    className="flex justify-center">
                    Don&apos;t have an account?
                    <Typography
                        as="a"
                        href="/auth/signUp"
                        variant="small"
                        color="blue-gray"
                        className="ml-1 font-bold">
                        Sign up
                    </Typography>
                </Typography>
                {error && (
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {error}
                    </span>
                )}
                <button
                    type="submit"
                    onClick={signInUser}
                    className="border px-8 py-2 hover:bg-[#00000020] transition">
                    Sign In
                </button>
            </form>
        </div>
    );
}
