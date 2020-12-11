import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from "../types";
import patients from "../data/patients";
import { v4 as uuid } from 'uuid';

export const getAllSecretPatients = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
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
    return patients.find(p => p.id === id);
};