import Image from "next/image";
import Loader from "../../ui/loader";
import {
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from "next-share";
import AddToCartButton from "../../ui/buttons/addToCartButton";
export default function ProductInfoSection({
    loading,
    imgUrl,
    productDetail,
    imageList,
    changeImage,
    shareQuote,
    setLoading,
    secretKey,
}) {
    return (
        <div className="product-container flex flex-col mx-auto px-4 md:flex-row lg:flex-row justify-center items-center">
            {loading ? <Loader /> : null}
            <div className="img-container h-auto w-11/12 md:w-2/5 lg:w-4/12 m-2 p-2 mb-0 pb-0">
                <div className="h-[300px] flex justify-center shadow p-4 bg-white">
                    <Image
                        src={imgUrl}
                        width={300}
                        height={400}
                        alt={productDetail.title}
                        className="object-contain w-full"
                        onLoad={() => setLoading(false)}
                    />
                </div>
                <div className="flex p-2 mt-2 justify-center items-center">
                    {imageList.map((item, index) => (
                        <div
                            key={index}
                            className="p-1 m-1 h-[60px] bg-white rounded-sm shadow-sm flex justify-center cursor-pointer hover:shadow-md">
                            <Image
                                src={item}
                                width={50}
                                height={50}
                                onClick={() => changeImage(item)}
                                className="object-contain w-full cursor-pointer"
                                alt={item}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="product-details-container w-11/12 md:w-7/12 lg:w-3/5 bg-white m-2 rounded shadow">
                <p className="p-1 mx-4 mt-4 text-lg">{productDetail.title}</p>
                <p className="p-1 mx-4 mb-4 text-xs text-[#323232]">
                    {productDetail.brand}
                </p>
                <hr className="border mx-6" />
                <p className="m-4 p-1 text-[#323232] text-sm">
                    {productDetail.description}
                </p>
                <p className="p-1 m-4 text-xl">${productDetail.price}</p>
                <p className="p-1 m-4 mb-0">Quantity</p>

                <AddToCartButton
                    productDetail={productDetail}
                    secretKey={secretKey}
                />
                <div className="share-container flex gap-2 m-4">
                    <FacebookShareButton quote={shareQuote}>
                        <FacebookIcon
                            size={32}
                            round
                        />
                    </FacebookShareButton>
                    <TwitterShareButton title={shareQuote}>
                        <TwitterIcon
                            size={32}
                            round
                        />
                    </TwitterShareButton>
                    <WhatsappShareButton title={shareQuote}>
                        <WhatsappIcon
                            size={32}
                            round
                        />
                    </WhatsappShareButton>
                </div>
            </div>
        </div>
    );
}
