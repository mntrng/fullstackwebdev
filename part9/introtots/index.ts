import { calculateBmi } from './bmiCalculator';
import express from 'express'
const app = express()

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  try {
    const weight = Number(req.query.weight)
    const height = Number(req.query.height)
    const bmi = calculateBmi(weight, height)
    res.json({ weight, height, bmi })
  } catch {
    res.json({ error: "malformatted parameters" })
  }
})

const PORT = process.env.PORT || 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})