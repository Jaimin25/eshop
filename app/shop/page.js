import { getSession } from "next-auth/react";
import ShopPage from "../components/pages/shop";
import { getServerSession } from "next-auth";

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

export default async function Shop() {
    const productsList = await getProducts();
    const categoryList = await getCategories();
    const secretKey = process.env.protection_secret;
    return (
        <ShopPage
            categoryList={categoryList}
            productsList={productsList}
            secretKey={secretKey}
        />
    );
}
