import express = require('express');
import { getAllDiagnoses } from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.status(200).send(getAllDiagnoses());
});

export default router;