import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from "../types";
import patients from "../data/patients.json";
import { v4 as uuid } from 'uuid';

export const getAllSecretPatients = (): Array<NonSensitivePatientEntry> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export const addPatient = (entry: NewPatientEntry): PatientEntry => {
    const id: string = uuid();
    const newPatientEntry = {
        id: id,
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export const findPatientById = (id: string): PatientEntry | undefined => {
    const patient = patients.find(p => p.id === id);
    if (!patient) {
        return undefined;
    } else if (!('entries' in patient)) {
        const patientEntries = { ...patient, entries: [] };
        return patientEntries;
    }
    return patient;
};