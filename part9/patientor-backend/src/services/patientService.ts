import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry, Entry, NewEntry } from "../types";
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

export const addMedicalEntry = (entry: NewEntry, patientId: string): Entry => {
    const patient = findPatientById(patientId);
    if (patient) {
        const id: string = uuid();
        const newMedicalEntry: Entry = {
            id: id,
            ...entry
        };
        patient.entries.push(newMedicalEntry);
        return newMedicalEntry;
    } else {
        throw new Error('Patient not found');
    }
};

export const findPatientById = (id: string): PatientEntry | undefined => {
    return patients.find(p => p.id === id);
};