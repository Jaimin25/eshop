import SignUpForm from "@/app/components/forms/signupForm";

export default function SignUpPage() {
    return (
        <div className="flex justify-center w-full mt-[32px]">
            <div className="flex flex-col lg:flex-row md:flex-row mx-6 w-full justify-center">
                <SignUpForm />
                <div className="divider flex lg:flex-col md:flex-col bg-white justify-center items-center px-8 lg:px-4 md:px-4 py-6">
                    <div className="lg:border-r-2 md:border-r-2 border-b-2 flex-1"></div>
                    <p className="my-2 mx-3 text-sm font-medium">Or</p>
                    <div className="lg:border-r-2 md:border-r-2 border-b-2 flex-1"></div>
                </div>
                <div className="flex flex-col justify-center gap-2 items-center bg-white px-8 pb-6">
                    <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none disabled:cursor-not-allowed disabled:opacity-60">
                        <img
                            src="https://www.svgrepo.com/show/512317/github-142.svg"
                            alt="GitHub"
                            className="h-[18px] w-[18px] "
                        />
                        Continue with GitHub
                    </button>
                    <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none  disabled:cursor-not-allowed disabled:opacity-60">
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
            </div>
        </div>
    );
}
