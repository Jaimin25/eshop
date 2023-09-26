import {
  faCartShopping,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavBar() {
  return (
    <nav className="flex shadow-md h-[64px] items-center">
      <div className="flex w-full justify-center items-center">
        <div className="flex items-center p-2">
          <FontAwesomeIcon
            className="h-[28px] text-green-600"
            icon={faCartShopping}
          />
          <span className="h-full ml-1 text-lg font-black italic text-green-600 ">
            eShop
          </span>
        </div>
        <ul className="flex gap-4 p-2 w-full justify-end">
          <li>Home</li>
          <li>Products</li>
          <li>About</li>
        </ul>
      </div>
    </nav>
  );
}
