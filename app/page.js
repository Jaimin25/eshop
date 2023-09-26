import NavBar from "@/app/components/navbar";
import Image from "next/image";
import img from "../public/img.jpg";
export default function Home() {
    return (
        <main className="h-full">
            <NavBar />
            <div className="landing-cont flex p-2 h-full justify-center items-center">
                <div className="flex-col justify-center w-full lg:w-1/2 md:w-1/2">
                    <p className="p-2 font-black text-[48px]">
                        <span className="text-[#56c1d6]">Welcome</span> to our{" "}
                        <span className="text-[#56c1d6]">new online</span> store
                        <span className="text-[#56c1d6]">.</span>
                    </p>
                    <p className="text-sm p-2">
                        Sit do ipsum sit anim sunt reprehenderit id ut velit
                        reprehenderit adipisicing nulla irure. Proident culpa
                        sit nulla esse veniam ea nulla cillum.
                    </p>
                </div>
                <Image
                    src={img}
                    className="w-[400px] h-[300px] rounded-lg hidden lg:block md:block"
                    alt="img"
                />
            </div>
        </main>
    );
}
