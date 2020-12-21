export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[];
}

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface Discharge {
    date: string;
    criteria: string;
}

interface SickLeave {
    startDate: string;
    endDate: string;
}

export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;
export type NewPatientEntry = Omit<PatientEntry, 'id'>;
export type NewHospitalEntry = Omit<HospitalEntry, "id">;
export type NewHealthCheckEntry = Omit<HealthCheckEntry, "id">;
export type NewOccupationalEntry = Omit<OccupationalHealthcareEntry, "id">;

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

export type NewEntry =
    | NewHealthCheckEntry
    | NewHospitalEntry
    | NewOccupationalEntry;