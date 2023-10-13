import ProductDetails from "@/app/components/pages/productDetails/productDetails";
import Image from "next/image";

async function getProduct(id) {
    const data = await fetch(`https://dummyjson.com/products/${id}`);
    const product = await data.json();
    return product;
}

export default async function ProductDetail(res) {
    const param = res.searchParams.id;

    const productDetail = await getProduct(param);
    const imageList = productDetail.images;

    const secret = process.env.protection_secret;

    return (
        <ProductDetails
            productDetail={productDetail}
            imageList={imageList}
            secretKey={secret}
        />
    );
}
