import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cors from 'cors';
import sequelize from './app/config/db.js'
import userRoutes from './app/routes/userRoutes.js'
import orderRoutes from './app/routes/orderRoutes.js'
import './app/models/associations.js'

dotenv.config()

const app = express()
const PORT = process.env.NODE_DOCKER_PORT

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json())
app.use(cors())//No sé que url se vaya a poner en el front

app.use('/toystore', userRoutes)
app.use('/toystore', orderRoutes)

async function start() {
  try {
    await sequelize.sync({ force: true})
    console.log('Conexión a la base de datos establecida correctamente.')
  } catch (error) {
    console.error('Error al conectar a la base de datos', error)
  }
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${process.env.NODE_LOCAL_PORT}`)
  console.log('a')
})

start()
