import { DiagnoseEntry } from "../types";
import diagnoses from "../data/diagnoses.json";

export const getAllDiagnoses = (): Array<DiagnoseEntry> => {
    return diagnoses;
};