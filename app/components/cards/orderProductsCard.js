import Image from "next/image";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import AddToWishlistButton from "../ui/buttons/addToWishlistButton";

export default function OrderProductCard({ item }) {
    return (
        <>
            <hr className="border-b border-[#e4e6eb] mb-3" />

            <div className="flex card font-normal my-3 p-2">
                <div className="flex h-[110px] w-[150px]">
                    <Image
                        src={item.thumbnail}
                        height={100}
                        width={150}
                        alt={item.title}
                        className="object-contain w-full"
                    />
                </div>
                <div className="flex flex-col w-full p-2">
                    <div className="flex p-4 text-sm  w-full">
                        <div className="flex w-full gap-4 flex-col lg:flex-row md:flex-row">
                            <div className="flex-1 mx-1 ">
                                <Link
                                    href={{
                                        pathname: `/product/${item.title}`,
                                        query: { id: item.id },
                                    }}>
                                    <p className="font-medium text-base text-blue-500 cursor-pointer hover:underline hover:transition">
                                        {item.title}
                                    </p>
                                </Link>
                                <p className=" flex-1 text-sm">${item.price}</p>
                            </div>
                            <div className="text-center mx-1 gap-2 flex flex-row lg:flex-col md:flex-col">
                                <p className="">Status</p>
                                <p className="font-medium">{item.status}</p>
                            </div>
                            <div className="text-center mx-1 gap-2 flex flex-row lg:flex-col md:flex-col">
                                <p className="">Quantity</p>
                                <p className="font-medium">{item.quantity}</p>
                            </div>

                            <div className="text-center mx-1 gap-2 flex flex-row lg:flex-col md:flex-col">
                                <p className="">Total Price</p>
                                <p className="font-medium text-[#323232]">
                                    $
                                    {parseInt(item.quantity) *
                                        parseInt(item.price)}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button className="border border-[#e4e6eb] px-3 py-1 text-sm">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
