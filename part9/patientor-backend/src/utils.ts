import { Gender, NewPatientEntry, NewEntry, BaseEntry, HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry, Discharge, DiagnoseEntry, HealthCheckRating } from "./types";
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

export const toNewPatientEntry = (object: any): NewPatientEntry => {
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

export const toNewEntry = (object: any): NewEntry => {
    if (!isBaseEntry(object)) {
        throw new Error('Missing basic input');
    } else {
        if (isHealthCheckEntry(object)) {
            return object;
        } else if (isHospitalEntry(object)) {
            return object;
        } else if (isOccupationalHealthcareEntry(object)) {
            return object;
        }
        throw new Error('Missing specific entry type input');
    }
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

const isBaseEntry = (entry: any): entry is BaseEntry => {
    if (entry.diagnosisCodes) {
        if (!parseDiagnosisCodes(entry.diagnosisCodes)) { 
            throw new Error('Invalid diagnosis code');
        }
    } else {
        if (!isString(entry.description) || !isDate(entry.date) || !isString(entry.specialist)) {
            throw new Error('Missing input');
        }
    }
    return entry;
};

const isHospitalEntry = (entry: any): entry is HospitalEntry => {
    if (entry.discharge && isDischarge(entry.discharge)) {
        return true;
    }
    return false;
};

const isHealthCheckEntry = (entry: any): entry is HealthCheckEntry => {
    return Object.values(HealthCheckRating).includes(entry.healthCheckRating);
};

const isOccupationalHealthcareEntry = (entry: any): entry is OccupationalHealthcareEntry => {
    if (entry.employerName && isString(entry.employerName)) {
        return true;
    }
    return false;
};

const isDischarge = (discharge: any): discharge is Discharge => {
    if (discharge.date && isDate(discharge.date) && discharge.criteria && isString(discharge.criteria)) {
        return true;
    }
    return false;
};

// const parseEntries = (entries: any): Entry[] => {
//     return entries.map((entry: any) => {
//         if (!isBaseEntry(entry)) {
//             throw new Error('Missing basic input');
//         }
//         if (isHealthCheckEntry(entry)) {
//             return entry;
//         } else if (isHospitalEntry(entry)) {
//             return entry;
//         } else if (isOccupationalHealthcareEntry(entry)) {
//             return entry;
//         } else {
//             throw new Error('Wrong entry type!');
//         }
//     });
// };

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect or missing name: ${name}`);
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
        throw new Error(`Incorrect or missing SSN: + ${ssn}`);
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

// const parseDescription = (description: any): string => {
//     if (!description || !isString(description)) {
//         throw new Error(`Incorrect or missing description: ${description}`);
//     }
//     return description;    
// };

// const parseDischarge = (discharge: any): Discharge => {
//     if (!discharge || !isDischarge(discharge)) {
//         throw new Error(`Incorrect or missing discharge: ${discharge}`);
//     }
//     return discharge;
// };

// const parseSpecialist = (specialist: any): string => {
//     if (!specialist || !isString(specialist)) {
//         throw new Error(`Incorrect or missing specialist: ${specialist}`);
//     }
//     return specialist;
// };

// const parseEmployer  = (employer: any): string => {
//     if (!employer || !isString(employer)) {
//         throw new Error(`Incorrect or missing employer: ${employer}`);
//     }
//     return employer;
// };

// const parseHealthRating = (rating: any): string => {
//     if (!rating || !isString(rating)) {
//         throw new Error(`Incorrect or missing rating: ${rating}`);
//     }
//     return rating;
// };

const parseDiagnosisCodes = (diagnosisCodes: [any]): Array<DiagnoseEntry['code']> => {
    if (!diagnosisCodes) {
        return [];
    } else {
        const invalidDiagnosisCodes = diagnosisCodes.filter(c => !isString(c));
        if (invalidDiagnosisCodes.length > 0) {
            throw new Error('Invalid diagnosis code(s)');
        }
    }
    return diagnosisCodes;
};