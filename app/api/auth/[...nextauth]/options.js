import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "jsmith",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const user = { id: 9, name: "cj12", password: "test" };

                if (
                    credentials.username === user.name &&
                    credentials.password === user.password
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
