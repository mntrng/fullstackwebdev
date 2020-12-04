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