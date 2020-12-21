import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../types';
import React from 'react';
import { Icon, Label } from 'semantic-ui-react';
import { HealthEntryRating } from './HealthEntryRating';

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <div>
        <h3>{entry.date} <Icon name="hospital" /></h3>
        <p> <i>{entry.description}</i> </p>
        <Label color='teal'>Discharged {entry.discharge.date}</Label>
        <Label>{entry.discharge.criteria}</Label>
    </div>
  );  
};

const OccupationalHealthcare: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <div>
        <h3>{entry.date} <Icon name="stethoscope" /></h3>
        <p> <i>{entry.description}</i> </p>
        <Label color='black'>Employer: {entry.employerName}</Label>
        {entry.sickLeave && (
          <div>
            <Label>Sick Leave from <i>{entry.sickLeave.startDate}</i> to <i>{entry.sickLeave.endDate}</i></Label>
          </div>
        )}
    </div>
  );  
};

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <div>
        <h3>{entry.date} <Icon name="user md" /></h3>
        <p><i>{entry.description}</i></p>
        <HealthEntryRating healthRating={entry.healthCheckRating} />
    </div>
  );  
};

const EntryInfo: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case 'Hospital':
        return <Hospital entry={entry} />;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcare entry={entry} />;
      case 'HealthCheck':
        return <HealthCheck entry={entry} />;
      default:
        return null;
    }
};
  
export default EntryInfo;