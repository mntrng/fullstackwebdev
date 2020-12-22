import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Entry, HealthCheckEntry, HospitalEntry, Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { Button, Icon, List, Segment } from 'semantic-ui-react';
import EntryInfo from '../components/EntryInfo';
import { HealthCheckEntryFormValues } from '../AddEntryModal/AddHealthCheckEntryForm';
import { addEntry, useStateValue } from "../state";
import { AddHealthCheckEntryModal, AddHospitalEntryModal } from '../AddEntryModal';
import { HospitalEntryFormValues } from '../AddEntryModal/AddHospitalEntryForm';

const PatientInfo: React.FC = () => {
    const [{ diagnosisList }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = React.useState<Patient | undefined>();

    const [error, setError] = React.useState<string | undefined>();
    const [entries, setEntries] = React.useState<Entry[]>();
  
    const [modalHCOpen, setHCModalOpen] = React.useState<boolean>(false);
    const openHCModal = (): void => setHCModalOpen(true);
    const closeHCModal = (): void => {
      setHCModalOpen(false);
      setError(undefined);
    };

    const [modalHOpen, setHModalOpen] = React.useState<boolean>(false);
    const openHModal = (): void => setHModalOpen(true);
    const closeHModal = (): void => {
      setHModalOpen(false);
      setError(undefined);
    };

    React.useEffect(() => {
        const getPatientInfo = async () => {
            try {
                const { data: patientInfo } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                setPatient(patientInfo);
                setEntries(patientInfo.entries);
            } catch (e) {
                console.log(e.message);
            }
        };

        getPatientInfo();
    }, [id]);

    const addNewHealthCheckEntry = async (values: HealthCheckEntryFormValues) => {
        try {
          const { data: newEntry } = await axios.post<HealthCheckEntry>(
            `${apiBaseUrl}/patients/${id}/entries`,
            values
          );
          dispatch(addEntry(newEntry));
          if (entries) {
            entries.push(newEntry);
            setEntries(entries);
          }
          closeHCModal();
        } catch (e) {
          setError(e.response.data.error);
        }
    };

    const addNewHospitalEntry = async (values: HospitalEntryFormValues) => {
        try {
          const { data: newEntry } = await axios.post<HospitalEntry>(
            `${apiBaseUrl}/patients/${id}/entries`,
            values
          );
          dispatch(addEntry(newEntry));
          if (entries) {
            entries.push(newEntry);
            setEntries(entries);
          }
          closeHModal();
        } catch (e) {
          setError(e.response.data.error);
        }
    };
    
    if (!patient || !diagnosisList) {
        return null;
    } else {
        const styling = {
            marginBottom: "15px"
        };

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
                <AddHealthCheckEntryModal
                    modalOpen={modalHCOpen}
                    onSubmit={addNewHealthCheckEntry}
                    error={error}
                    onClose={closeHCModal}
                />
                <AddHospitalEntryModal
                    modalOpen={modalHOpen}
                    onSubmit={addNewHospitalEntry}
                    error={error}
                    onClose={closeHModal}
                />
                <Button color='orange' style={styling} onClick={() => openHCModal()}>Add Health Check Entry</Button>
                <Button color='teal' style={styling} onClick={() => openHModal()}>Add Hospital Entry</Button>
                <div>
                    {patient.entries.map((entry: Entry) => (
                        <div key={entry.id} style={styling}>
                            <Segment>
                                <EntryInfo entry={entry}/>
                                <List>
                                    {entry.diagnosisCodes?.map(code =>
                                        <List.Item key={code}>
                                            <List.Icon name='emergency' />
                                            <List.Content>
                                                <b>{code}</b> {': '} 
                                                {Object.values(diagnosisList).filter(d => d.code === code)[0].name}
                                            </List.Content>
                                        </List.Item>
                                    )}
                                </List>
                            </Segment>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

export default PatientInfo;