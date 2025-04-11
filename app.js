import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import * as mongoDB from './database/mongoDB.js'

dotenv.config()

const app = express()
app.use(cors())

app.use(express.static('public'))

const port = process.env.PORT

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${port}`)
  })

//const router = express.Router()
//app.use('/api', router)
  
app.use(express.json())


app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'index.html'))
})

app.post('/api/dishes', async (req, res) => {
    console.log('POST request received')
    const dish = req.body
    console.log(dish)
    const result = await mongoDB.insert(dish)
    res.status(201).json({data: 'Dish inserted:', dish})
    console.log(dish)
})

app.get('/api/dishes', async (req, res) => {
    const dishes = await mongoDB.getAllDishes()
    res.json(dishes)
})

app.get('/api/dishes/:id', async (req, res) => {
    const dishId = req.params.id
    try {
      const dish = await mongoDB.getDishById(dishId)
      if (!dish) {
        return res.status(404).send('Dish not found')
      }
      res.json(dish)
    }catch (error) {
      res.status(500).send('Internal Server Error')
    }
})

app.put('/api/dishes/:id', async (req, res) => {
    const dishId = req.params.id
    try {
      const result = await mongoDB.updateDish(dishId, req.body)
      if(result.modifiedCount === 0) {
        return res.status(404).send('Dish not found')
      }
      res.status(200).json({data: 'Dish updated:', dishId})
    } catch (error) {
        console.error('Error updating dish:', error)
        res.status(500).send('Internal Server Error')
    }
  })

app.delete('/api/dishes/:id', async (req, res) => {
    const dishId = req.params.id
    try {
      const result = await mongoDB.deleteDish(dishId)
      if (result.deletedCount === 0) {
        return res.status(404).send('Dish not found')
      }
      res.status(200).json({data: 'Dish deleted:', dishId})
    } catch (error) {
        console.error('Error deleting dish:', error)
        res.status(500).send('Internal Server Error')
    }
})
