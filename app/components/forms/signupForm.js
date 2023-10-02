"use client";
import { Typography, Input } from "@material-tailwind/react";
import { useState } from "react";
import Loader from "../ui/loader";
import * as EmailValidator from "email-validator";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        try {
            const checkUserExists = await fetch(
                `../api/userExists?email=${email}`
            );
            const user = await checkUserExists.json();

            if (user.result !== null) {
                setLoading(false);
                setError("User already exists with that email");
                return;
            }

            const res = await fetch("../api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });
            const result = await res.json();
            if (result.result === "Account created!") {
                router.push("/auth/signIn");

                setLoading(false);
            } else {
                setLoading(false);
                setError("User registration failed.");
            }
        } catch (error) {
            setError(error);
        }
    };

    function onRegister() {
        if (!email || !username || !password || !confirmPassword) {
            setError("All fields are required!");
            return;
        } else {
            setError(null);
            if (password !== confirmPassword) {
                setError("Password not matching");
                return;
            }
            if (!EmailValidator.validate(email)) {
                setError("Invalid Email");
                return;
            }
        }
        setLoading(true);
        handleSubmit();
    }

    return (
        <div className="flex flex-col bg-white p-4 px-8 gap-4 w-full lg:w-1/3 md:w-1/2">
            {loading ? <Loader /> : null}
            <p className="text-xl font-semibold">Create An Account</p>
            <Input
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={error && !username ? true : false}
            />
            <Input
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error && !email ? true : false}
            />
            <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={
                    error && !password
                        ? true
                        : error && password !== confirmPassword
                        ? true
                        : false
                }
            />
            <Input
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={
                    error && !confirmPassword
                        ? true
                        : error && password !== confirmPassword
                        ? true
                        : false
                }
            />
            {error && (
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    {error}
                </span>
            )}
            <Typography
                variant="small"
                className="flex justify-center">
                Already have an account?
                <Typography
                    as="a"
                    href="/auth/signIn"
                    variant="small"
                    color="blue-gray"
                    className="ml-1 font-bold">
                    Sign in
                </Typography>
            </Typography>
            <button
                onClick={onRegister}
                className="border px-8 py-2 hover:bg-[#00000020] transition">
                Register
            </button>
        </div>
    );
}
