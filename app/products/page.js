import Link from "next/link";
import CategoryFilter from "../components/ui/categoryFilter";
import ProductCard from "../components/cards/productsCard";

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
        <div className="p-2 flex justify-center">
            <div className="p-1 w-1/5 justify-center ">
                <div className="rounded border-[1px] bg-[#fff] mt-1">
                    <h1 className="font-medium bg-[#00000008] p-3 border-b-[1px]">
                        Category
                    </h1>
                    <div className="p-1">
                        <CategoryFilter
                            categoryList={categoryList}
                            categoryName={categoryName}
                        />
                    </div>
                </div>
            </div>
            <div className="w-4/5 p-2 grid grid-flow-row-dense grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {productsList.map((item, index) => (
                    <ProductCard
                        item={item}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
}
