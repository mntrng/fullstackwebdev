/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, NewPatientEntry } from "./types";

const toNewPatientEntry = (object: any): NewPatientEntry => {
    const newPatientEntry: NewPatientEntry = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOcc(object.occupation),
        entries: []
    };
    return newPatientEntry;
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect or missing name:  ${name}`);
    }
    return name;
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing date: ${date}`);
    }
    return date;
};

const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error(`Incorrect or missing ssn: + ${ssn}`);
    }
    return ssn;
};


const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender: ${gender}`);
    }
    return gender;
};

const parseOcc = (occ: any): string => {
    if (!occ || !isString(occ)) {
        throw new Error(`Incorrect or missing occupation: ${occ}`);
    }
    return occ;
};

export default toNewPatientEntry;