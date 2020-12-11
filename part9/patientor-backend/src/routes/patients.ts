/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express = require('express');
import { addPatient, findPatientById, getAllSecretPatients } from '../services/patientService';
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

router.get('/:id', (req, res) => {
    const patient = findPatientById(req.params.id);
    if (patient) {
        res.json(patient);
    } else {
        res.status(404).send({ error: 'Not found' });
    }
});

export default router;