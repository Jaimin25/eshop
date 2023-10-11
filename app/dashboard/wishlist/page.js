import WishlistComponent from "@/app/components/pages/dashboard/wishlistComponent";

export default function WishlistPage() {
    const secret = process.env.protection_secret;
    return <WishlistComponent secret={secret} />;
}
