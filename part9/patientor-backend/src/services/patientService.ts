import { NonSensitivePatientEntry } from "../types";
import patients from "../data/patients.json";

export const getAllSecretPatients = (): Array<NonSensitivePatientEntry> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};