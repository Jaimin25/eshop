"use client";

import { Carousel } from "@material-tailwind/react";
import salePic1 from "../../../public/salePic1.jpg";
import salePic2 from "../../../public/salePic2.jpg";
import Image from "next/image";

export default function Promo() {
    return (
        <Carousel className="h-[22rem] w-full">
            <Image
                src={salePic1}
                alt="image1"
                className="h-[22rem] w-full object-cover md:object-fill lg:object-fill"
            />
            <Image
                src={salePic2}
                alt="image 2"
                className="h-[22rem] w-full object-cover md:object-fill lg:object-fill"
            />
        </Carousel>
    );
}
