import CartProduct from "../../cards/cartProductsCard";
import RemoveFromCart from "../../ui/buttons/removeFromCartButton";

export default function CartSection({ cartProducts }) {
    let sumTotal = 0;

    return (
        <div className="w-full">
            {cartProducts.map((item, index) => (
                <CartProduct
                    item={item}
                    key={index}
                />
            ))}
            <div className="bg-white shadow flex flex-col p-2 mx-2">
                <p className="text-end">
                    Total:{" "}
                    {cartProducts.map((item, index) => {
                        let totalPrice = item.price * item.quantity;
                        sumTotal += totalPrice;
                    })}
                    ${sumTotal}
                </p>
            </div>
        </div>
    );
}
