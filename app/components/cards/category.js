import Image from "next/image";
import Link from "next/link";

async function getImageURLFromProduct(category) {
    const res = await fetch(
        `https://dummyjson.com/products/category/${category}?limit=1`
    );
    const data = await res.json();
    return data.products[0].thumbnail;
}

export default async function Category({ categoryName }) {
    const imgUrl = await getImageURLFromProduct(categoryName);

    return (
        <div>
            <Link
                href={{
                    pathname: "/products",
                    query: { category: categoryName },
                }}>
                <div className="flex p-2 shadow-md flex-col w-auto h-[200px] rounded-sm bg-slate-50 justify-center items-center hover:shadow-lg">
                    <div className="flex justify-center h-[100px]">
                        <Image
                            src={imgUrl}
                            height={75}
                            width={100}
                            alt={categoryName}
                            className="object-contain w-full"
                        />
                    </div>
                    <h1 className="text-md font-semibold mt-4 text-[#9BBEDC]">
                        {categoryName.charAt(0).toUpperCase() +
                            categoryName.substring(1, categoryName.length)}
                    </h1>
                </div>
            </Link>
        </div>
    );
}
