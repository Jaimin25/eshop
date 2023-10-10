import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function EmptyCart() {
    return (
        <div className="mx-6 flex flex-col bg-white justify-center items-center w-[350px] h-[350px] shadow">
            <div>
                <ShoppingCartIcon fontSize="large" />
            </div>
            <p className="m-2 text-base text-center">
                Oops! Your cart is empty.
            </p>
            <Link href="/shop">
                <button className="border px-[20px] py-[8px] m-1 text-sm hover:bg-[#2962ff] hover:text-white text-[13px] transition rounded-sm">
                    Start Shopping
                </button>
            </Link>
        </div>
    );
}
