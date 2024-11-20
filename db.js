// db.js
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

//blogposts
const uri = process.env.MONGO_URL;

const client = new MongoClient(uri);

let db;

async function connectDB() {
  if (db) return db;
  try {
    await client.connect();
    const dbName = process.env.DATABASE_NAME || 'insurance-blog-platform';
    db = client.db(dbName);
    console.log(`Connected to database: ${dbName}`);
    return db;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    throw error;
  }
}

async function createDocument(collectionName, data) {
  const db = await connectDB();
  const result = await db.collection(collectionName).insertOne(data);
  return result.insertedId;
}

async function readDocuments(collectionName, query = {}) {
  const db = await connectDB();
  const documents = await db.collection(collectionName).find(query).toArray();
  return documents;
}

// db.js
async function updateDocument(collectionName, id, updateData) {
    const db = await connectDB();
    if ('_id' in updateData) {
      delete updateData._id;
    }
    const result = await db.collection(collectionName).updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    return result.modifiedCount;
  }
  

async function deleteDocument(collectionName, id) {
  const db = await connectDB();
  const result = await db.collection(collectionName).deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount;
}

module.exports = {
  createDocument,
  readDocuments,
  updateDocument,
  deleteDocument,
};
