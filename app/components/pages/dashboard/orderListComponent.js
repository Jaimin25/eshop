import Link from "next/link";

export default function OrderListComponent({ secretKey, ordersList }) {
    return (
        <div className="w-full p-2">
            <p className="text-base font-bold p-2 text-[#262626]">
                Your Orders
            </p>

            <hr className="border-b border-[#e4e6eb]" />
            {ordersList.length > 0 ? (
                <div className="flex flex-col">
                    <p className="p-2">{ordersList.length} orders</p>
                    <div>
                        {ordersList.map((item, index) => (
                            <Link href={"/order/" + item._id}>
                                <div className="flex flex-col border border-[#e4e6eb] p-2 rounded shadow gap-1 hover:bg-[#00000008] hover:transition cursor-pointer text-sm">
                                    <p>
                                        Order{" "}
                                        <span className="text-[#323232] font-semibold">
                                            #{item._id}
                                        </span>
                                    </p>
                                    <p>
                                        Status{" "}
                                        <span className="text-[#323232] font-semibold">
                                            {item.status}
                                        </span>
                                    </p>
                                    <p>
                                        Ordered on{" "}
                                        <span className="text-[#323232] font-semibold">
                                            {new Date(
                                                item.createdAt
                                            ).toLocaleString("en-GB", {
                                                weekday: "long",
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </p>
                                    <p>
                                        Order Total{" "}
                                        <span className="text-[#323232] font-semibold">
                                            $
                                            {parseInt(item.orderTotal) +
                                                parseInt(item.tax) +
                                                parseInt(item.shipping)}
                                        </span>
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="w-full flex justify-center">
                    You have no orders yet.
                </div>
            )}
        </div>
    );
}
