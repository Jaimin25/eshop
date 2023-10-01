"use client";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
} from "@material-tailwind/react";

export default function SignInPage() {
    return (
        <div className="flex justify-center w-full mt-[32px]">
            <div className="flex flex-col bg-white p-4 px-8 mx-8 gap-4 w-full lg:w-1/3 md:w-1/2">
                <p className="text-xl font-semibold">Login</p>
                <Input label="Email" />
                <Input
                    label="Password"
                    type="password"
                />

                <Typography
                    variant="small"
                    className="flex justify-center">
                    Don&apos;t have an account?
                    <Typography
                        as="a"
                        href="/auth/register"
                        variant="small"
                        color="blue-gray"
                        className="ml-1 font-bold">
                        Sign up
                    </Typography>
                </Typography>
                <button className="border px-8 py-2 hover:bg-[#00000020] transition">
                    Sign In
                </button>
            </div>
        </div>
    );
}
