import express = require('express');
import cors = require('cors');
import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
    res.send('Ping ping pong!');
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});