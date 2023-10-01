"use client";
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    CardHeader,
    CardBody,
    CardFooter,
} from "@material-tailwind/react";

export default function RegistrationPage() {
    return (
        <div className="flex justify-center w-full mt-[32px]">
            <div className="flex flex-col bg-white p-4 px-8 mx-8 gap-4 w-full lg:w-1/3 md:w-1/2">
                <p className="text-xl font-semibold">Create An Account</p>
                <Input label="Username" />
                <Input label="Email" />
                <Input
                    label="Password"
                    type="password"
                />
                <Input
                    label="Confirm Password"
                    type="password"
                />
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
                <button className="border px-8 py-2 hover:bg-[#00000020] transition">
                    Register
                </button>
            </div>
        </div>
    );
}
