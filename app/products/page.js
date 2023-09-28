import Link from "next/link";
import CategoryFilter from "../components/filters/categoryFilter";
import ProductCard from "../components/cards/productsCard";
import RatingFilter from "../components/filters/ratingFilter";
import Loader from "../components/ui/loader";
import PriceFilter from "../components/filters/priceFilter";

async function getProductsFromCategory(category) {
    const url =
        category === "all" || category === undefined
            ? `https://dummyjson.com/products?limit=0`
            : `https://dummyjson.com/products/category/${category}?limit=0`;

    const data = await fetch(url);
    const products = await data.json();

    return products.products;
}

async function getCategories() {
    const data = await fetch("https://dummyjson.com/products/categories");
    const category = await data.json();
    return category;
}

export default async function Products(res) {
    const categoryName = res.searchParams.category;
    const productsList = await getProductsFromCategory(categoryName);

    const categoryList = await getCategories();
    return (
        <div className="p-3 flex flex-col lg:flex-row justify-center ">
            <div className="p-1 lg:w-1/5 md:w-full justify-center ">
                <div className="rounded border-[1px] bg-[#fff] mt-1 justify-center ">
                    <h1 className="font-medium bg-[#00000008] p-3 border-b-[1px]">
                        Category
                    </h1>
                    <div className="p-1 justify-center">
                        <CategoryFilter
                            categoryList={categoryList}
                            categoryName={categoryName}
                        />
                    </div>
                </div>
                <div className="rounded border-[1px] bg-[#fff] mt-1 justify-center ">
                    <h1 className="font-medium bg-[#00000008] p-3 border-b-[1px]">
                        Ratings
                    </h1>
                    <RatingFilter items={productsList} />
                </div>
                <div className="rounded border-[1px] bg-[#fff] mt-1 justify-center ">
                    <h1 className="font-medium bg-[#00000008] p-3 border-b-[1px]">
                        Price
                    </h1>
                    <PriceFilter items={productsList} />
                </div>
                <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Apply
                </button>
            </div>
            <div className="lg:w-4/5 md:w-full p-1 grid grid-flow-row-dense grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4">
                {productsList ? (
                    productsList.map((item, index) => (
                        <ProductCard
                            item={item}
                            key={index}
                        />
                    ))
                ) : (
                    <Loader />
                )}
            </div>
        </div>
    );
}
