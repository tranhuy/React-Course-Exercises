import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useStateValue, AddPatient } from "../state";
import { apiBaseUrl } from "../constants";
import { Gender, Patient } from "../types";
import { Icon } from "semantic-ui-react";

const PatientDetailsPage = () => {
    const { id } = useParams<{ id: string}>();
    const [ { patients }, dispatch ] = useStateValue();
    const [ patient, setPatient ] = useState<Patient>(); 
    
    useEffect(() => {
        void fetchPatientData();
    }, [dispatch]);

    const fetchPatientData = async () => {
        try {
            if (!patients[id]) {
                const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`); 
                setPatient(patient);
                dispatch(AddPatient(patient));
            } else {
                setPatient(patients[id]);
            }
           
        } catch (e: unknown) {
            if (axios.isAxiosError(e) && e.response) {
                console.log(e.response?.data);
            }           
        }
    };

    const getGenderIcon = (gender: Gender): JSX.Element => {
        switch (gender) {
            case Gender.Male: 
                return <Icon name='mars' />;
            case Gender.Female:
                return <Icon name='venus' />;
            default:
                return <Icon name='genderless' />;
        }
    };

    if (!patient) {
        return <div>Patient Not Found</div>;
    }

    return (
        <div>
            <h2>{patient.name} {getGenderIcon(patient.gender)}</h2>
            <div>ssn: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
        </div>
    );
};

export default PatientDetailsPage;