"use server"
import bcrypt from "bcryptjs";
import {MongoClient} from "mongodb";
import {getServerSession} from "next-auth";
import {authOptions} from "../lib/auth";
import {getSession} from "next-auth/react";
const MONGODB_URI = process.env.MONGODB_URI ;

export const purchase = async (values: any) => {
    function processDerived(newItem) {
        let sum = Number(newItem.quantity) * Number(newItem.cost)
        newItem.total = sum
        return newItem
    }
    const { username, password, recipient, gift, quantity, cost } = values;

    try {
        const dbConnect = new MongoClient(MONGODB_URI as string);
        await dbConnect.connect().then(() => console.log("Connected to Purchase"));
        const connection = dbConnect.db("cs4241").collection("users");
        let userFound = await connection.findOne({ username,password });
        let parsedPurchases = JSON.parse(JSON.stringify(userFound)).purchases


        console.log(username)
        console.log(password)
        console.log(userFound)
        //const hashedPassword = await bcrypt.hash(password, 10);
        let newItem = {

            recipient: recipient,
            gift: gift,
            quantity: quantity,
            cost: cost
        }

        newItem = processDerived(newItem)
        console.log(newItem)
        const result = await connection.updateOne(
            {"username": username, "password": password},
            {$push:
                    {"purchases": newItem}
            }
        );
        userFound = await connection.findOne({"username": username, "password": password})
        parsedPurchases = JSON.parse(JSON.stringify(userFound)).purchases

        const session = await getSession();
        if (session) {
            console.log(session)
            // Update session with new purchase data (you may need a custom session handler)
            session.user.purchases = parsedPurchases;
        }
        return {
            username: username,
            password: password,
            purchases: parsedPurchases

        }

    }catch(e){
        console.log(e);
    }
}
