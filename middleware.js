export { default } from "next-auth/middleware";

export const config = {
    matcher: ["/dashboard", "/dashboard/:path*", "/order", "/order/:path*"],
};
