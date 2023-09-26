import {
    faCartShopping,
    faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Dropdown from "./dropdown";

export default function NavBar() {
    return (
        <nav className="flex shadow-md h-[64px] items-center backdrop-blur-sm sticky top-0 bg-white/80">
            <div className="flex w-full justify-center items-center">
                <Link
                    href="/"
                    className="flex-1">
                    <div className="flex items-center p-2">
                        <FontAwesomeIcon
                            className="h-[30px] text-[#56c1d6]"
                            icon={faCartShopping}
                        />

                        <span className="h-full ml-1 text-2xl font-black italic text-[#56c1d6] ">
                            eShop
                        </span>
                    </div>
                </Link>
                <ul className="hidden md:flex lg:flex gap-4 p-2 w-full justify-end text-[#284B83] font-semibold">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>Products</li>
                    <li>About</li>
                </ul>
                <Dropdown />
            </div>
        </nav>
    );
}
