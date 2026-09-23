import express from 'express'
import usersRouter from './routers/users.routers.js'

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Aula07 - Dockerizando API com docker-compose')
})

app.use('/api/users', usersRouter)

app.listen(port, () => {
  console.log(`Servidor subiu na porta ${port}`)
})