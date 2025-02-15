import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";

import {JWT} from "next-auth/jwt";
import {Session} from "next-auth";

// MongoDB URI (Ensure it is defined correctly in your config or environment variables)
const MONGODB_URI = process.env.MONGODB_URI ;
interface Credentials {
    username: string;
    password: string;
}
console.log("authenticattinggg")

export const authOptions: NextAuthOptions = {
    providers: [
        credentials({
            name: "Credentials",
            id: "credentials",
            credentials: {
                username: { label: "Username", type: "username" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials:Credentials) {
                // Check if credentials are provided
                console.log("username: " + credentials?.username)
                console.log("password: " + credentials?.password)

                if (!credentials?.username || !credentials?.password) {
                    throw new Error("Missing credentials");
                }

                try {
                    // Connect to MongoDB
                    const dbConnect = new MongoClient(MONGODB_URI as string);
                    await dbConnect.connect().then(() => console.log("Connected"));
                    const connection = dbConnect.db("cs4241").collection("users");

                    // Find user by username
                    const user = await connection.findOne(
                        { username: credentials.username, password: credentials.password }

                    );
                    const parsedPassword = JSON.parse(JSON.stringify(user)).password
                    const parsedUser = JSON.parse(JSON.stringify(user)).username
                    const parsedPurchases = JSON.parse(JSON.stringify(user)).purchases
                    console.log("this is the user: " + JSON.parse(JSON.stringify(user)).password)
                    console.log("this is the user id?: " + JSON.stringify(user))



                    if (!user) {
                        throw new Error("Wrong Username");
                    }


                    ///come back to change so that it checks the hashhhhh
                    console.log(credentials.password === parsedPassword)
                    const passwordMatch = (credentials.password ===  parsedPassword);
                    console.log("the password match is: " + passwordMatch)
                    if (!passwordMatch) {
                        throw new Error("Wrong Password");

                    }

                    // Return a plain user object (only return necessary fields)
                    return {
                        id: user._id.toString(), // Ensure _id is a string
                        username: parsedUser,
                        password: parsedPassword,
                        purchases: parsedPurchases,
                    };
                } catch (error) {
                    console.log("about to through an error at you")
                    throw Error(error.message);
                }
            },
        }),
    ],
    session: {
        strategy: "jwt", // Use JWT session strategy
    },
    callbacks: {
        async jwt({token, user} ){
            if(user){
                token.username = user.username
                token.password = user.password
                token.purchases = user.purchases

            }
            return token
        },
        async session({ session, token }: {session: any; token: any}) {

            if(token) {
                session.user.username = token.username
                session.user.password = token.password
                session.user.purchases = token.purchases
            }

            // Store the session properties you want available on the client
            return session;
        },

    },


 /*   pages: {
        signIn: "/auth/signin", // Optional: Customize the login page
    },*/
};
