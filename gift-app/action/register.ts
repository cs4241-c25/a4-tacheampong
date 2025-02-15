"use server"
import bcrypt from "bcryptjs";
import {MongoClient} from "mongodb";
const MONGODB_URI = process.env.MONGODB_URI ;

export const register = async (values: any) => {
    const { username, password } = values;

    try {
        const dbConnect = new MongoClient(MONGODB_URI as string);
        await dbConnect.connect().then(() => console.log("Connected"));
        const connection = dbConnect.db("cs4241").collection("users");
        const userFound = await connection.findOne({ username,password });
        if(userFound){
            return {
                error: 'Email already exists!'
            }
        }
        //const hashedPassword = await bcrypt.hash(password, 10);
        let newUser = {

            username: username,
            password: password,
            purchases: []
        }
        const result = await connection.insertOne(newUser);
        return {
            username: username,
            password: password,
        }

    }catch(e){
        console.log(e);
    }
}