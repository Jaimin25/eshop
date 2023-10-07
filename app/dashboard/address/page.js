import AddressLayout from "@/app/components/pages/dashboard/addressComponent";

export default function Page() {
    const secret = process.env.protection_secret;
    return <AddressLayout secret={secret} />;
}
