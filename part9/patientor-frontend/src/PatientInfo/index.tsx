import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Diagnosis, Entry, Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { Icon } from 'semantic-ui-react';

const PatientInfo: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = React.useState<Patient | undefined>();
    const [diagnosisList, setDiagnosisList] = React.useState<Diagnosis[] | undefined>();

    React.useEffect(() => {
        const getPatientInfo = async () => {
            try {
                const { data: patientInfo } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                setPatient(patientInfo);
            } catch (e) {
                console.log(e.message);
            }
        };
        
        const getDiagnosisList = async () => {
            try {
                const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
                    `${apiBaseUrl}/diagnoses`
                );
                setDiagnosisList(diagnosisListFromApi);
            } catch (e) {
                console.error(e);
            }
        };

        getPatientInfo();
        getDiagnosisList();

    }, [id]);
    
    if (!patient || !diagnosisList) {
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
                <h3>Entries</h3>
                <div>
                    {patient.entries.map((entry: Entry) => (
                        <div key={entry.id}>
                            <p>{entry.date} {': '} <i>{entry.description}</i></p>
                            <ul>
                                {entry.diagnosisCodes?.map((code: string) => <li key={code}><b>{code}</b> {': '} { diagnosisList.filter(d => d.code === code)[0].name }</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

export default PatientInfo;