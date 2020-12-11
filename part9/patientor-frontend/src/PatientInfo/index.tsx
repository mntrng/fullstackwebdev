import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { Icon } from 'semantic-ui-react';

const PatientInfo: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = React.useState<Patient | undefined>();

    React.useEffect(() => {
        const getPatientInfo = async () => {
            try {
                const patientInfo = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                setPatient(patientInfo.data);
            } catch (e) {
                console.log(e.message);
            }
        };

        getPatientInfo();
    }, [id]);

    if (!patient) {
        return null;
    } else {
        return (
            <div>
                <h1>
                    {patient.name} {' '}
                    <Icon
                        name={
                            patient.gender === 'male' ? 'mars' : 
                            patient.gender === 'female' ? 'venus' : 'user'
                        }
                    />
                </h1>
                <p>
                    <b>SSN</b>: {patient.ssn} <br />
                    <b>Occupation</b>: {patient.occupation}
                </p>
            </div>
        );
    }
};

export default PatientInfo;