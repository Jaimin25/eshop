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
        <div>
            <CategoryFilter
                categoryList={categoryList}
                categoryName={categoryName}
            />
            <div className="p-2 grid grid-flow-row-dense grid-cols-2 gap-4 md:grid-cols-3 lg:grid-col-3">
                {productsList.map((item, index) => (
                    <ProductCard item={item} />
                ))}
            </div>
        </div>
    );
}
