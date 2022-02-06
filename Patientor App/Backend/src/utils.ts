import { NewPatientData, Gender, Entry } from "./types";

type Fields = { 
    name: unknown;
    dateOfBirth: unknown;
    ssn: unknown;
    gender: unknown;
    occupation: unknown;
    entries: unknown;
}

export const toNewPatientData = ({ name, dateOfBirth, ssn, gender, occupation, entries }: Fields): NewPatientData => {
    const newPatient: NewPatientData = {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: parseEntries(entries)
    }

    return newPatient;
}

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing patient name');
    }

    return name;
}

const parseDateOfBirth = (dob: unknown): string => {
    if (!dob || !isString(dob) || !isDate(dob)) {
        throw new Error('Incorrect or missing patient date of birth');
    }

    return dob
}

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing patient ssn');
    }

    return ssn;
}

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing patient occupation');
    }

    return occupation;
}

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing patient gender');
    }

    return gender;
}

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text  instanceof String;
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
}

const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
}

const parseEntries = (entries: unknown): Entry[] => {
    if (!entries) {
        return [];
    }

    return [];
}