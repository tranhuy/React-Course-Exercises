export interface DiagnosisData {
    code: string;
    name: string;
    latin?: string;
}

export interface Entry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: string[];
}

export interface PatientData {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type NonSensitivePatientData = Omit<PatientData, 'ssn' | 'entries'>;

export type NewPatientData = Omit<PatientData, 'id'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}