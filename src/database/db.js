import { MongoClient } from "mongodb";


const mongoClient = new MongoClient(process.env.MONGO_URI);

export default async function mongo() {
  try {
    const connect = mongoClient.db("backtothedisc");
    return connect;
  } catch (error) {
    console.log(error);
    return error;
  }
}
