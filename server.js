import express from 'express'

const app = express()
const PORT = process.env.NODE_DOCKER_PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${process.env.NODE_LOCAL_PORT}`)
  console.log('a')
})
