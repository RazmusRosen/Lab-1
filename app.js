import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import * as mongoDB from './mongoDB.js'

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

app.get('/api/dishes', async (req, res) => {
    const dishes = await mongoDB.getAllDishes()
    res.json(dishes)
})

