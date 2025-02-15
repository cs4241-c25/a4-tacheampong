"use server"
import bcrypt from "bcryptjs";
import {MongoClient} from "mongodb";
const MONGODB_URI = process.env.MONGODB_URI ;

export const remove = async (values: any) => {

    const { username, password, selectValue } = values;

    try {
        const dbConnect = new MongoClient(MONGODB_URI as string);
        await dbConnect.connect().then(() => console.log("Connected to delete"));
        const connection = dbConnect.db("cs4241").collection("users");
        let userFound = await connection.findOne({ username,password });
        let parsedPurchases = JSON.parse(JSON.stringify(userFound)).purchases

        //const hashedPassword = await bcrypt.hash(password, 10);

        const result   = await connection.updateOne(
            {"username": username, "password": password},
            {$pull:
                    {"purchases": {
                            "recipient": selectValue
                        }}
            }
        );
        userFound = await connection.findOne({"username": username, "password": password})
        parsedPurchases = JSON.parse(JSON.stringify(userFound)).purchases
        return {
            username: username,
            password: password,
            purchases: parsedPurchases

        }

    }catch(e){
        console.log(e);
    }
}