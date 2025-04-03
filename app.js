import express from 'express'
import dotenv from 'dotenv'
import * as mongoDB from './mongoDB.js'

dotenv.config()

const app = express()

const port = process.env.PORT

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${port}`)
  })

const router = express.Router()
app.use('/api', router)
  
app.use(express.json())

router.get('/dishes', async (req, res) => {
    const dishes = await mongoDB.getAllDishes()
    res.json(dishes)
})
