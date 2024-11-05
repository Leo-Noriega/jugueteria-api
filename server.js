import express from 'express'
import dotenv from 'dotenv'
import sequelize from './app/config/db.js'
import userRoutes from './app/routes/userRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.NODE_DOCKER_PORT

app.use(express.json())

app.use('/toystore', userRoutes)

async function start() {
  try {
    await sequelize.sync({ alter: true})
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
