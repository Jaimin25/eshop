import { connectionSrv } from "@/app/lib/dbConnection";
import { User } from "@/app/lib/model/user";
import mongoose from "mongoose";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

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
                try {
                    const { email, password } = credentials;

                    await mongoose.connect(connectionSrv);
                    const user = await User.findOne({ email });

                    if (!user) {
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if (!passwordMatch) {
                        return null;
                    }

                    return user;
                } catch (error) {
                    console.log("Error: ", error);
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session(session, user) {
            await mongoose.connect(connectionSrv);
            const userData = await User.findOne({
                email: session.session.user.email,
            });
            if (userData) {
                session.session.user.name = userData.username;
            }
            return session.session;
        },
    },
    pages: {
        signIn: "/auth/signIn",
    },
};
