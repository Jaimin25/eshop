import Image from "next/image";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProductCard({ item }) {
    return (
        <div className="flex flex-col card rounded-md shadow-sm items-center p-2 font-semibold">
            <div className="flex justify-center h-[150px]">
                <Image
                    src={item.thumbnail}
                    height={100}
                    width={150}
                    alt={item.title}
                    className="object-contain w-full"
                />
            </div>

            <p>{item.title}</p>
            <div className="flex w-full text-sm">
                <p className="p-1">${item.price}</p>
            </div>
        </div>
    );
}
