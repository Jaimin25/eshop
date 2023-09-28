import Image from "next/image";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProductCard({ item }) {
    return (
        <div className="flex flex-col card rounded-sm shadow font-normal bg-white">
            <div className="flex h-[150px] bg-gray-100">
                <Image
                    src={item.thumbnail}
                    height={100}
                    width={150}
                    alt={item.title}
                    className="object-contain w-full"
                />
            </div>

            <div className="flex-1 p-2">
                <p className="ml-2 font-medium">{item.title}</p>
                <p className="text-[#808081] text-xs capitalize ml-2">
                    by <span className="text-[#323232]">{item.brand}</span>
                </p>
            </div>

            <div className="flex w-full text-xl m-1 justify-center items-center">
                <p className="p-1 text-[#323232] flex-1">${item.price}</p>
                <p className="text-[#323232] text-base m-2">{item.rating}</p>
                <FontAwesomeIcon
                    icon={faStar}
                    className="text-[#ffb302] h-3 mr-3"
                />
            </div>
        </div>
    );
}
