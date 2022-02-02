import patientData from '../../data/patients.json';
import { PatientData, NonSensitivePatientData, NewPatientData } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Array<PatientData> = patientData as Array<PatientData>;

const getAll = (): Array<PatientData> => {
    return patients;
}

const getNonSensitive = () : Array<NonSensitivePatientData> => {
    const nonSensitivePatients = patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));

    return nonSensitivePatients;
}

const addPatient = (patient : NewPatientData): PatientData => {
    const newPatient = {
        id: uuid(),
        ...patient
    };

    patients.push(newPatient);
    return newPatient;
}

export default {
    getAll, getNonSensitive, addPatient
};