"use client";
import { useState } from "react";
import Loader from "../loader";
import { signIn } from "next-auth/react";

export default function SocialSignIn() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e, provider) => {
        try {
            const res = await signIn(provider, {
                redirect: false,
            });

            if (res.ok) {
                setLoading(false);
            }
            if (res.error) {
                setLoading(false);
                return;
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    function continueWithGoogle(e) {
        setLoading(true);
        handleSubmit(e, "google");
    }
    return (
        <div className="flex flex-col justify-center gap-2 items-center bg-white px-8 pb-6">
            {loading ? <Loader /> : null}

            <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none disabled:cursor-not-allowed disabled:opacity-60">
                <img
                    src="https://www.svgrepo.com/show/512317/github-142.svg"
                    alt="GitHub"
                    className="h-[18px] w-[18px] "
                />
                Continue with GitHub
            </button>
            <button
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none  disabled:cursor-not-allowed disabled:opacity-60"
                onClick={continueWithGoogle}>
                <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="h-[18px] w-[18px] "
                />
                Continue with Google
            </button>
            <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none  disabled:cursor-not-allowed disabled:opacity-60">
                <img
                    src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                    alt="Google"
                    className="h-[18px] w-[18px] "
                />
                Continue with FaceBook
            </button>
        </div>
    );
}
