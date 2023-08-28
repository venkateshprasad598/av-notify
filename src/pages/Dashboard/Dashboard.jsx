import React from "react";
import { Formik } from "formik";
import TextField from "@mui/material/TextField";
import InputField from "../../components/common/InputField";
import * as yup from "yup";
import {
  Wizard,
  WizardStep,
} from "../../components/MutltiStepForm/MultiStepForm";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
});

const validationSchemaEmail = yup.object({
  email: yup.string().required("Email is required"),
});

const Dashboard = () => {
  const handleFormSubmit = (values) => {
    console.log({ values });
  };
  return (
    <div className="av-notify-dashboard">
      {" "}
      <div className="av-notify-mulltistep">
        <Wizard
          initialValues={{ name: "", email: "" }}
          onSubmit={(values, { setSubmitting }) => {
            handleFormSubmit(values);
            alert(JSON.stringify(values, null, 2));
          }}
        >
          <WizardStep
            stepName="Person"
            onSubmit={(values, { setSubmitting }) => {
              handleFormSubmit(values);
              alert(JSON.stringify(values, null, 2));
            }}
            validationSchema={validationSchema}
          >
            <InputField name="name" label="Name" />
          </WizardStep>
          <WizardStep
            stepName="Email"
            onSubmit={(values, { setSubmitting }) => {
              handleFormSubmit(values);
              alert(JSON.stringify(values, null, 2));
            }}
            validationSchema={validationSchemaEmail}
          >
            <InputField name="email" label="Email" />
          </WizardStep>
        </Wizard>
      </div>
    </div>
  );
};

export default Dashboard;
