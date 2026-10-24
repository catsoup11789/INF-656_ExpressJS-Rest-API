const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const dbName = process.env.DB_NAME || 'witchingWonder';

let client;
let db;

const connectDB = async () => {
  if (db) {
    return db;
  }

  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();
  db = client.db(dbName);

  console.log(`Connected to MongoDB database: ${dbName}`);
  return db;
};

const getDb = () => {
  if (!db) {
    throw new Error('Database not initialized. Call connectDB() before using the database.');
  }

  return db;
};

const closeDB = async () => {
  if (client) {
    await client.close();
    db = null;
    client = null;
  }
};

module.exports = {
  connectDB,
  getDb,
  closeDB,
};

