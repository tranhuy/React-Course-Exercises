import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";

import { Entry, healthCheckRating } from "../types";
import { DiagnosisSelection, HealthCheckRatingOption, SelectField, TextField } from "../AddPatientModal/FormField";

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type EntryFormValues =  UnionOmit<Entry, 'id'>;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

const healthCheckRatingsOptions: HealthCheckRatingOption[] = [    
    { value: healthCheckRating.Healthy, label: `${healthCheckRating.Healthy} - ${healthCheckRating[healthCheckRating.Healthy]}` },
    { value: healthCheckRating.LowRisk, label: `${healthCheckRating.LowRisk} - ${healthCheckRating[healthCheckRating.LowRisk]}` },
    { value: healthCheckRating.HighRisk, label: `${healthCheckRating.HighRisk} - ${healthCheckRating[healthCheckRating.HighRisk]}` },
    { value: healthCheckRating.CriticalRisk, label: `${healthCheckRating.CriticalRisk} - ${healthCheckRating[healthCheckRating.CriticalRisk]}` }
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagonses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                description: "",
                date: "",
                specialist: "",
                diagnosisCodes: undefined,
                type: "HealthCheck",
                healthCheckRating: 0             
            }}
            onSubmit={ values => {
                onSubmit(values as EntryFormValues);       
            }}
            validate={values => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};

                if (!values.description) {                
                    errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }

                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Field 
                            label="Description"
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
                            name="specialist"
                            component={TextField}
                        />
                        {/* <Field
                            label="HealthCheckRating"
                            name="healthCheckRating"
                            component={NumberField}
                            min={0}
                            max={3}
                        /> */}
                        <SelectField 
                            label="Health Check Rating"
                            name="healthCheckRating"
                            options={healthCheckRatingsOptions}
                            setFieldValue={setFieldValue}
                        />
                        <DiagnosisSelection 
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagonses)}
                        />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">Cancel</Button>
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