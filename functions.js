//functii de prelucrare/validare a datelor
//JWT...

const DB  = require('mongodb');
const DB_URL = process.env.MONGO_URL;
require("dotenv").config();

async function fetchUsers(DB_NAME) {
    const client = new MongoClient(DB_URL);
    try {
      await client.connect();
      const db = client.db(DB_NAME);
      const users = await db.collection("users").find({}).toArray();
      return users;
    } catch (e) {
      console.log(e);
    } finally {
      client.close();
    }
}

async function findUserByUsername(DB_NAME, username){
    let users = await fetchUsers(DB_NAME);
    let user = users.find((user) => user.username === username);
    return user;
}

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