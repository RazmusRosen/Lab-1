
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv'

dotenv.config()

const url = process.env.MONGODB

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function insert(dish) {
  const {id, name, ingredients, preparationSteps, CookingTime, origin} = dish
  try {
    
    const database = client.db('lab1')
    const collection = database.collection('dish')
    // Create a dish to insert
    const dish = {
      id: id,
      name: name,
      ingredients: ingredients,
      preparationSteps: preparationSteps,
      CookingTime: CookingTime,
      origin: origin
    }
    const result = await collection.insertOne(dish)
    console.log(`A document was inserted with the _id: ${result.insertedId}`)
    return result.insertedId
  } catch (error) {
    console.error('Error inserting dish:', error)
    throw error
  }
}

export async function getAllDishes() {
  const database = client.db('lab1')
  const collection = database.collection('dish')
  const dishes = await collection.find({}).toArray()
  return dishes
}

export async function updateDish(id, dish) {
  const database = client.db('lab1')
  const collection = database.collection('dish')
  const result = await collection.updateOne({id: id}, {$set: dish})
  return result
}

export async function getDishById(id) {
  const database = client.db('lab1')
  const collection = database.collection('dish')
  const dish = await collection.findOne({id: parseInt(id)})
  return dish
}