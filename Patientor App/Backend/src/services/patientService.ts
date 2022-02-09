import patientData from '../../data/patients';
import { PatientData, NonSensitivePatientData, NewPatientData } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Array<PatientData> = patientData as Array<PatientData>;
const patientsWithEntries: Array<PatientData> = patients.map(p => {
                                                    if (!p.entries) {
                                                        return { ...p, entries: [] };
                                                    }
                                                    
                                                    return p;
                                                });

const getAll = (): Array<PatientData> => {
    return patients;
}

const getNonSensitive = () : Array<NonSensitivePatientData> => {
    const nonSensitivePatients = patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));

    return nonSensitivePatients;
}

const getPatientData = (id: string): PatientData => {
    const patient = patientsWithEntries.find(p => p.id === id);

    if (!patient) {
        throw new Error('Patient not found');
    }

    return patient;
}

const addPatient = (patient : NewPatientData): PatientData => {
    const newPatient = {
        id: uuid(),
        entries: [],
        ...patient
    };

    patients.push(newPatient);
    return newPatient;
}

export default {
    getAll, getNonSensitive, getPatientData, addPatient
};