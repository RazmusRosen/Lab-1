import express from 'express'
import dotenv from 'dotenv'
import * as mongoDB from './mongoDB.js'

dotenv.config()

const app = express()

const port = process.env.PORT

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${port}`)
  })
  

mongoDB.insert({
  id: 1,
  name: 'Pasta',
  ingredients: ['pasta', 'water', 'salt'],
  preparationSteps: ['boil water', 'add pasta', 'cook for 10 minutes'],
  CookingTime: 10,
  origin: 'Italy'
})
