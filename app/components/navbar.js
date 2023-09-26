import {
    faCartShopping,
    faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="flex shadow-md h-[64px] items-center backdrop-blur-sm sticky top-0">
            <div className="flex w-full justify-center items-center">
                <Link href="/">
                    <div className="flex items-center p-2">
                        <FontAwesomeIcon
                            className="h-[28px] text-[#56c1d6]"
                            icon={faCartShopping}
                        />

                        <span className="h-full ml-1 text-lg font-black italic text-[#56c1d6] ">
                            eShop
                        </span>
                    </div>
                </Link>
                <ul className="flex gap-4 p-2 w-full justify-end">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>Products</li>
                    <li>About</li>
                </ul>
            </div>
        </nav>
    );
}
