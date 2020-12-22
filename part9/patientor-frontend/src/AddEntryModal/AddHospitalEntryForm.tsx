import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection } from "./FormField";
import { Entry, EntryOption } from "../types";
import { useStateValue } from "../state";
import moment from "moment";

export type HospitalEntryFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: HospitalEntryFormValues) => void;
  onCancel: () => void;
}

export const AddHospitalEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosisList }] = useStateValue();
  
  return (
    <Formik
      initialValues={{
        type: EntryOption.Hospital,
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        discharge: {
          date: "",
          criteria: ""
        }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = (input: string) => `Field ${input} is required!`;        
        const errors: { [field: string]: string } = {};
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
        if (!values.discharge.date) {
          errors.dischargeDate = requiredError('discharge date');
        } else if (!moment(values.discharge.date, 'YYYY-MM-DD', true).isValid()) {
          errors.dischargeDate = 'Must be in the form YYYY-MM-DD';
        }
        if (!values.discharge.criteria) {
          errors.dischargeCriteria = requiredError('discharge criteria');
        }
        return errors;
      }}
    >

      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
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
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Criteria"
              placeholder="Criteria"
              name="discharge.criteria"
              component={TextField}
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

export default AddHospitalEntryForm;