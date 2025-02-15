import {DefaultSession} from "next-auth";
declare module "next-auth" {
    interface Session {
        user: {
            username: string;
            password: string;
            purchases: Object[];
        } & DefaultSession["user"]
    }
     interface JWT {
        username: string;
        password: string;
        purchases: Object[];
    }
}




