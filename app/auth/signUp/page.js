"use client";
import SignUpForm from "@/app/components/forms/signupForm";
import SocialSignIn from "@/app/components/ui/buttons/socialSignInButtons";
import Loader from "@/app/components/ui/loader";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignUpPage() {
    const { data: session } = useSession();

    const sessionUser = session ? session.user : null;
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (sessionUser) {
            router.push("/");
        }
    }, [sessionUser]);
    return (
        <div className="flex justify-center w-full mt-[32px]">
            <div className="flex flex-col lg:flex-row md:flex-row mx-6 w-full justify-center">
                <SignUpForm />
                <div className="divider flex lg:flex-col md:flex-col bg-white justify-center items-center px-8 lg:px-4 md:px-4 py-6">
                    <div className="lg:border-r-2 md:border-r-2 border-b-2 flex-1" />
                    <p className="my-2 mx-3 text-sm font-medium">Or</p>
                    <div className="lg:border-r-2 md:border-r-2 border-b-2 flex-1" />
                </div>
                <SocialSignIn />
            </div>
        </div>
    );
}
