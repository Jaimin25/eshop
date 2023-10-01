import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
export default function Cart() {
    return (
        <div className="flex mt-[32px] w-full h-full p-4 justify-center">
            <div className="mx-2 flex flex-col bg-white justify-center items-center w-[350px] h-[350px] shadow">
                <FontAwesomeIcon
                    icon={faCartShopping}
                    size="2x"
                />
                <p className="m-2 text-base text-center">
                    Oops! Your cart is empty.
                </p>
                <Link href="/shop">
                    <button className="border px-[20px] py-[8px] m-1 text-sm hover:bg-[#2962ff] hover:text-white text-[13px] transition rounded-sm">
                        Start Shopping
                    </button>
                </Link>
            </div>
        </div>
    );
}
