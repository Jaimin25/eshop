"use client";
import {
    FacebookIcon,
    FacebookShareButton,
    InstagramIcon,
    InstapaperShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    PinterestIcon,
    PinterestShareButton,
    TwitterIcon,
    TwitterShareButton,
} from "next-share";

export default function Footer() {
    return (
        <div className="border-t bg-white h-auto pb-6 mt-6">
            <div className="p-4 flex flex-col md:flex-row lg:flex-row justify-center text-center md:text-left lg:text-left">
                <div className="about-container mr-4 border-b md:border-r lg:border-r md:border-b-0 lg:border-b-0 p-6">
                    <h1 className=" font-medium text-base mb-3 mx-1">ABOUT</h1>
                    <p className="text-[#65676b] text-sm m-1">Contact Us</p>
                    <p className="text-[#65676b] text-sm m-1">About Us</p>
                    <p className="text-[#65676b] text-sm m-1">Careers</p>
                </div>
                <div className="help-container mr-4 border-b md:border-r lg:border-r md:border-b-0 lg:border-b-0 p-6">
                    <h1 className=" font-medium text-base mb-3 mx-1">HELP</h1>
                    <p className="text-[#65676b] text-sm m-1">Payments</p>
                    <p className="text-[#65676b] text-sm m-1">FAQ</p>
                    <p className="text-[#65676b] text-sm m-1">
                        Cancellation & Returns
                    </p>
                </div>
                <div className="newsletter-container mr-4 p-6 flex flex-col">
                    <h1 className=" font-medium text-base mb-1 mx-1">
                        NEWSLETTER
                    </h1>
                    <p className="text-[#323232] text-sm my-2 mx-1">
                        Sign Up for Our Newsletter
                    </p>
                    <input
                        type="email"
                        placeholder="Please Enter Your Email"
                        className="h-[45px] focus:text-[#000] focus:outline-none border border-[#e4e6eb] p-2 mx-1 text-sm cursor-text"
                        required />
                    <button className="hover:bg-[#2962ff] outline-none transition py-[10px] px-[16px] min-w-[135px] mx-1 mt-[10px] text-[#323232] text-[13px] font-medium hover:text-white border rounded-sm">
                        Subscribe
                    </button>
                </div>
            </div>
            <div className="flex w-auto justify-center m-4 text-sm font-medium">
                © 2023 eShop
            </div>
            <div className="flex justify-center w-auto gap-2 m-1">
                <FacebookShareButton blankTarget>
                    <FacebookIcon
                        size={42}
                        round
                    />
                </FacebookShareButton>
                <LinkedinShareButton blankTarget>
                    <LinkedinIcon
                        size={42}
                        round
                    />
                </LinkedinShareButton>
                <TwitterShareButton blankTarget>
                    <TwitterIcon
                        size={42}
                        round
                    />
                </TwitterShareButton>
                <PinterestShareButton blankTarget>
                    <PinterestIcon
                        size={42}
                        round
                    />
                </PinterestShareButton>
            </div>
        </div>
    );
}
