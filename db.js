//functii generale de acces la baza de date

const DB  = require('mongodb');
const DB_URL = process.env.MONGO_URL;
require("dotenv").config();

async function addUser(DB_NAME, user){
    const client = new DB(DB_URL);
    try{
        await client.connect();
        const db = client.db(DB_NAME);
        const result = await db.collection("users").insertOne(user);
        return result;
    }
    catch (e) {
        console.log(e);
    }
    finally {
        client.close();
    }
}