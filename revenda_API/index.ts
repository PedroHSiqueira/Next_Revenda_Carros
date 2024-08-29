import express from 'express'
import marcasRoutes from './routes/marcas'
import carrosRoutes from './routes/carros'
import cors from 'cors'
const app = express()
const port = 3004

app.use(express.json())
app.use(cors())
app.use("/marcas", marcasRoutes)
app.use("/carros", carrosRoutes)

app.get('/', (req, res) => {
  res.send('API: Sistema de Revenda de Carros')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})