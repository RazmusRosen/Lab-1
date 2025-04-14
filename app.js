import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import {router as dishRoute} from './routes/dishRoutes.js'

dotenv.config()

const app = express()
app.use(cors()) //had this when i used go Live extension in VSCode, because it ran on different ports

app.use(express.static('public'))

const port = process.env.PORT

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${port}`)
  })
  
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'index.html'))
})

app.use('/', dishRoute)
