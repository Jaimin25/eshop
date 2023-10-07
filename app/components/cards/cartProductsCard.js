import Image from "next/image";

export default function CartProduct({ item }) {
    return (
        <div className="bg-white flex m-2 shadow items-center">
            <div className="flex h-[110px] w-[150px] px-2">
                <Image
                    src={item.thumbnail}
                    height={100}
                    width={100}
                    alt={item.title}
                    className="object-contain w-full"
                />
            </div>
            <div className="flex flex-col px-2">
                <p>{item.title}</p>
                <p className="text-sm text-[#323232]">
                    Quantity: {item.quantity}
                </p>
                <p className="text-sm text-[#323232]">
                    Price: ${item.price * item.quantity}
                </p>
            </div>
        </div>
    );
}
