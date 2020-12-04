/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express = require('express');
import { addPatient, getAllSecretPatients } from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.status(200).send(getAllSecretPatients());
});

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const newPatient = addPatient(newPatientEntry);
        res.status(201).json(newPatient);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

export default router;