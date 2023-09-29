import NavBar from "@/app/components/ui/navbar/navbar";
import Image from "next/image";
import img from "../public/img.jpg";
import Link from "next/link";
import CategoryCard from "./components/cards/categoryCard";

async function getCategories() {
    const data = await fetch("https://dummyjson.com/products/categories");
    const category = await data.json();
    return category;
}

export default async function Home() {
    const categoryList = await getCategories();

    return (
        <main>
            <div className="landing-cont flex p-2 h-[100vh] justify-center items-center bg-white shadow">
                <div className="flex-col justify-center w-full lg:w-1/2 md:w-1/2">
                    <p className="p-2 font-black text-[48px]">
                        <span className="text-[#56c1d6]">Welcome</span> to our{" "}
                        <span className="text-[#FFAE3E]">new online</span> store
                        <span className="text-[#FF4546]">.</span>
                    </p>
                    <p className="text-sm p-2">
                        Sit do ipsum sit anim sunt reprehenderit id ut velit
                        reprehenderit adipisicing nulla irure. Proident culpa
                        sit nulla esse veniam ea nulla cillum.
                    </p>
                    <Link href="/shop">
                        <button className="m-2 p-2 w-36 bg-[#284B83] text-white font-semibold rounded-md">
                            Shop now
                        </button>
                    </Link>
                </div>
                <Image
                    src={img}
                    className="w-[400px] h-[300px] rounded-lg hidden lg:block md:block"
                    alt="img"
                />
            </div>
            <div
                className="flex-col h-auto"
                id="products">
                <h1 className="text-center text-3xl m-10 text-[#284B83] font-bold">
                    Categories
                </h1>
                <div className="p-2 grid grid-flow-row-dense grid-cols-1 gap-4 md:grid-cols-3 lg:grid-col-3">
                    {categoryList.map((item, index) =>
                        index < 7 ? (
                            <CategoryCard
                                categoryName={item}
                                key={index}
                            />
                        ) : null
                    )}
                </div>
            </div>
        </main>
    );
}
