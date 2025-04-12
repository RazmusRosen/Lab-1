
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
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
  const {name, ingredients, preparationSteps, cookingTime, origin, spiceLevel} = dish
  try {
    
    const database = client.db('lab1')
    const collection = database.collection('dish')
    // Create a dish to insert
    const dish = {
      name: name,
      ingredients: ingredients,
      preparationSteps: preparationSteps,
      cookingTime: cookingTime,
      origin: origin,
      spiceLevel: spiceLevel
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
  const dishes = await collection.find().toArray()
  return dishes
}

export async function updateDish(id, dish) {
  const database = client.db('lab1')
  const collection = database.collection('dish')
  try {
    console.log('ID:', id)
    console.log('ID type:', typeof id)
  const result = await collection.updateOne({_id: new ObjectId(id)}, {$set: dish})
  return result
  }catch (error) {
    console.error('Error updating dish:', error)
    throw error
  }
}

export async function getDishByName(name) {
  const database = client.db('lab1')
  const collection = database.collection('dish')
  console.log("in mongoDB.js getDishByName")
  console.log('Name:', name)
  if (name === '') {
    const dish = await collection.find().toArray()
    return dish
  }
  const dish = await collection.find({ name:{$regex: name}}).toArray()
  console.log('Dish:', dish)
  return dish
}

export async function getDishById(id) {
  const database = client.db('lab1')
  const collection = database.collection('dish')
  console.log("in mongoDB.js getDishById")
  console.log('ID:', id)
  console.log('ID type:', typeof id)
  const dish = await collection.findOne({_id: new ObjectId(id)}) //tried without the 'new' but it didn't work
  return dish
}

export async function deleteDish(id) {
  const database = client.db('lab1')
  const collection = database.collection('dish')
  const result = await collection.deleteOne({_id: new ObjectId(id)})
  return result
}