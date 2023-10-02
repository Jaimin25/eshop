import { User } from "@/app/lib/model/user";
import mongoose from "mongoose";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                },
                email: {
                    label: "Email",
                    type: "email",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await mongoose.connect(connectionSrv);
                const user = await User.find(credentials.email);
                const hashedPassword = await bcrypt.hash(
                    credentials.password,
                    10
                );
                if (
                    credentials.email === user.email &&
                    hashedPassword === user.password
                ) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/signIn",
    },
};
