import express = require('express');
import { getAllSecretPatients } from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.status(200).send(getAllSecretPatients());
});

export default router;