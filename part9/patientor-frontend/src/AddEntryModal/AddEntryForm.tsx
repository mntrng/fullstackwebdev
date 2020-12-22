import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, EntrySelection, DiagnosisSelection, NumberField } from "./FormField";
import { Entry, EntryOption } from "../types";
import { useStateValue } from "../state";
import moment from "moment";

export type EntryFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryOptions: EntrySelection[] = [
  { value: EntryOption.HealthCheck, label: "Health Check" },
  { value: EntryOption.Hospital, label: "Hospitalization" },
  { value: EntryOption.OccupationalHealthcare, label: "Occupational Healthcare" },
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosisList }] = useStateValue();
  
  return (
    <Formik
      initialValues={{
        type: EntryOption.HealthCheck,
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: ""
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = (input: string) => `Field ${input} is required!`;        
        const errors: { [field: string]: string } = {};

        if (!values.type) {
          errors.type = requiredError('type');
        }
        if (!values.description) {
          errors.description = requiredError('description');
        }
        if (!values.date) {
          errors.date = requiredError('date');
        } else if (!moment(values.date, 'YYYY-MM-DD', true).isValid()) {
          errors.date = 'Must be in the form YYYY-MM-DD';
        }
        if (!values.specialist) {
          errors.specialist = requiredError('specialist');
        }
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError('health check rating');          
        } else if (Number(values.healthCheckRating) < 0 || Number(values.healthCheckRating) > 3) {
          errors.healthCheckRating = 'Must be an integer between 0 and 3!'; 
        }
        return errors;
      }}
    >

      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Visit Type"
              name="visitType"
              options={entryOptions}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosisList)}
            />
            <Field
              label="Health Rating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />
            
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;