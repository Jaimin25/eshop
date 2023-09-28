import Link from "next/link";
import CategoryFilter from "../components/filters/categoryFilter";
import ProductCard from "../components/cards/productsCard";
import RatingFilter from "../components/filters/ratingFilter";
import Loader from "../components/ui/loader";
import PriceFilter from "../components/filters/priceFilter";
import ProductsPage from "../components/pages/products";

async function getProducts() {
    const url = `https://dummyjson.com/products?limit=0`;

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
    const productsList = await getProducts();

    const categoryList = await getCategories();
    return (
        <ProductsPage
            categoryList={categoryList}
            productsList={productsList}
        />
    );
}
