import { connectionSrv } from "@/app/lib/dbConnection";
import { User } from "@/app/lib/model/user";
import mongoose from "mongoose";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                fullname: {
                    label: "fullname",
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
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === "google") {
                const { name, email } = user;

                try {
                    await mongoose.connect(connectionSrv);
                    const userExists = await User.findOne({ email });
                    const { password, provider } = {
                        password: "",
                        provider: "google",
                    };

                    if (!userExists) {
                        const res = await fetch(
                            "http://localhost:3000/api/register",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    fullname: name,
                                    email,
                                    password,
                                    provider,
                                }),
                            }
                        );
                        if (res.ok) {
                            return user;
                        } else {
                            return null;
                        }
                    }
                } catch (error) {
                    console.log(error);
                }

                return user;
            } else if (account.provider === "credentials") {
                return user;
            }
        },
        async session(session, user) {
            await mongoose.connect(connectionSrv);
            const userData = await User.findOne({
                email: session.session.user.email,
            });
            if (userData) {
                session.session.user.name = userData.fullname;
            }
            return session.session;
        },
    },
    pages: {
        signIn: "/auth/signIn",
    },
};
