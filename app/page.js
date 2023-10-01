import NavBar from "@/app/components/ui/navbar/navbar";
import Image from "next/image";
import img from "../public/img.jpg";
import sale1 from "../public/sale1.jpg";
import sale3 from "../public/sale3.jpg";
import Link from "next/link";
import Promo from "./components/pages/promo";

export default function Home() {
    return (
        <main>
            <div className="landing-cont flex p-2 pt-10 h-auto lg:min-h-screen justify-center items-center bg-white shadow">
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
                className="flex flex-col lg:flex-row h-auto w-full p-6 lg:px-[100px] justify-center items-center "
                id="products">
                <div className="mt-6 flex h-[22rem] lg:w-5/6 justify-center items-center lg:mr-3">
                    <Promo />
                </div>

                <div className="mt-6 lg:mt-6 flex flex-col lg:h-[22rem] lg:w-[192px] justify-center items-center">
                    <Image
                        src={sale1}
                        className="lg:h-44 lg:w-[192px] object-cover lg:object-cover pb-6 lg:pb-2"
                    />
                    <Image
                        src={sale3}
                        className="lg:h-44 lg:w-[192px] object-cover lg:object-cover lg:pt-2"
                    />
                </div>
            </div>
        </main>
    );
}
