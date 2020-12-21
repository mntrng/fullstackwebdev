/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express = require('express');
import { addMedicalEntry, addPatient, findPatientById, getAllSecretPatients } from '../services/patientService';
import { toNewPatientEntry, toNewEntry } from '../utils';
import { Entry } from '../types';

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

router.post('/:id/entries', (req, res) => {
    try {
        const id = req.params.id;
        const medicalEntry = toNewEntry(req.body) as Entry;
        const newMedicalEntry = addMedicalEntry(medicalEntry, id);
        res.status(201).json(newMedicalEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

export default router;