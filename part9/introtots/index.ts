import { calculateExercises } from './exerciseCalculator';
import { calculateBmi } from './bmiCalculator';
import express from 'express';
const app = express();
app.use(express.json());

interface Body {
  target: number;
  daily_exercises: number[];
}

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    const bmi = calculateBmi(weight, height);
    res.status(200).json({ weight, height, bmi });
  } catch {
    res.status(400).json({ error: "malformatted parameters" });
  }
});


app.post('/exercises', (req, res) => {
  const { target, daily_exercises }: Body = req.body as Body;
  if (!target || !daily_exercises) {
    res.status(400).json({ error: "parameters missing" });
  } else {
    try {
      const results =  calculateExercises(daily_exercises, target);
      res.status(200).send(results);
    } catch {
      res.status(400).json({ error: "malformatted parameters" });
    }
  }
});

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});