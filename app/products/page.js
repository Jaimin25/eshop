import Link from "next/link";
import CategoryFilter from "../components/ui/categoryFilter";

async function getProductsFromCategory(category) {
    console.log(category);
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
            products
            <CategoryFilter categoryList={categoryList} />
            {productsList.map((item, index) => (
                <p>{item.title}</p>
            ))}
        </div>
    );
}
