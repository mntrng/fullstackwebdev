import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddHealthCheckEntryForm, { HealthCheckEntryFormValues } from './AddHealthCheckEntryForm';
import AddHospitalEntryForm, { HospitalEntryFormValues } from './AddHospitalEntryForm';

interface HealthCheckProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: HealthCheckEntryFormValues) => void;
  error?: string;
}

interface HospitalCheckProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: HospitalEntryFormValues) => void;
  error?: string;
}

export const AddHealthCheckEntryModal = ({ modalOpen, onClose, onSubmit, error }: HealthCheckProps) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new health check entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export const AddHospitalEntryModal = ({ modalOpen, onClose, onSubmit, error }: HospitalCheckProps) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new hospital entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);