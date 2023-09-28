import Link from "next/link";
import CategoryFilter from "../components/filters/categoryFilter";
import ProductCard from "../components/cards/productsCard";
import RatingFilter from "../components/filters/ratingFilter";
import Loader from "../components/ui/loader";
import PriceFilter from "../components/filters/priceFilter";
import ProductsPage from "../components/pages/products";

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
        <ProductsPage
            categoryList={categoryList}
            categoryName={categoryName}
            productsList={productsList}
        />
    );
}
