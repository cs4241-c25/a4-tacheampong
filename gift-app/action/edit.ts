"use server"
import bcrypt from "bcryptjs";
import {MongoClient} from "mongodb";
const MONGODB_URI = process.env.MONGODB_URI ;

export const edit = async (values: any) => {
    function processDerived(newItem) {
        let sum = Number(newItem.quantity) * Number(newItem.cost)
        newItem.total = sum
        return newItem
    }
    const { username, password, gift, recipient, quantity, cost, selectValue } = values;

    try {
        const dbConnect = new MongoClient(MONGODB_URI as string);
        await dbConnect.connect().then(() => console.log("Connected to edit"));
        const connection = dbConnect.db("cs4241").collection("users");
        let userFound = await connection.findOne({ username,password });
        let parsedPurchases = JSON.parse(JSON.stringify(userFound)).purchases
        //const hashedPassword = await bcrypt.hash(password, 10);

        let newItem = {

            recipient: recipient,
            gift: gift,
            quantity: quantity,
            cost: cost
        }
        const result   =
            await connection.updateOne(

                {"username": username, "password": password, "purchases.recipient": selectValue},
                {
                    $set:
                        {
                            "purchases.$.gift": gift,
                            "purchases.$.quantity": quantity,
                            "purchases.$.cost": cost,
                            "purchases.$.total": processDerived(newItem).total
                        }
                }
            )
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