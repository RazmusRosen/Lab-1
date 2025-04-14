import * as mongoDB from '../database/mongoDB.js'
import express from 'express'

export const router = express.Router()

router.post('/api/dishes', async (req, res) => {
    console.log('POST request received')
    const dish = req.body
    console.log(dish)
    const result = await mongoDB.insert(dish)
    res.status(201).json({data: 'Dish inserted:', dish})
    console.log(dish)
})

router.get('/api/dishes', async (req, res) => {
    const dishes = await mongoDB.getAllDishes()
    res.json(dishes)
})

router.get("/api/dishes/search", async (req, res) => {
  const dishname = ""
  try {
      const dish = await mongoDB.getDishByName(dishname)
      res.json(dish)

  } catch (error) {
      console.error('Error fetching dish by name:', error)
      res.status(500).send('Internal Server Error')
  }
})

router.get("/api/dishes/search/:dishname", async (req, res) => {
  const dishname = req.params.dishname
  try {
      const dish = await mongoDB.getDishByName(dishname)
      res.json(dish)

  } catch (error) {
      console.error('Error fetching dish by name:', error)
      res.status(500).send('Internal Server Error')
  }
})

router.get('/api/dishes/:id', async (req, res) => {
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

router.put('/api/dishes/:id', async (req, res) => {
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

router.delete('/api/dishes/:id', async (req, res) => {
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