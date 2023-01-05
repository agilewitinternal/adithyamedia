import React, { useState } from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import "./Enquiryform.css";
import * as emailjs from "emailjs-com";
import { createUseStyles } from "react-jss";

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};
const MyTextAreaInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <label className="checkbox">
        <input {...field} {...props} type="checkbox" />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

// And now we can use these
const Enquiryform = () => {
  const classes = styles();
  const [status, setStatus] = useState("");
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    acceptedTerms: false, // added for our
    message: "",
  };
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string().email("Invalid email addresss`").required("Required"),
    contactnumber: Yup.number()
      .max(10, "Must be 10 digits")
      .required("Required"),
    acceptedTerms: Yup.boolean()
      .required("Required")
      .oneOf([true], "You must accept the terms and conditions."),
    message: Yup.string()
      .max(1000, "Must be 20 characters or less")
      .required("Required"),
  });
  const onSubmit = async (values, { setSubmitting }) => {
    setStatus("Sending...");
    const { firstName, lastName, email, message } = values;
    let details = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      message: message,
    };
    let response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });
    let result = await response.json();
    setStatus(result);
    setSubmitting(false);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <MyTextInput
                label="First Name"
                name="firstName"
                type="text"
                placeholder="Jane"
                autocomplete="off"
              />
              <MyTextInput
                label="Last Name"
                name="lastName"
                type="text"
                placeholder="Doe"
                autocomplete="off"
              />
              <MyTextInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="jane@gmail.com"
                autocomplete="off"
              />
              <MyTextInput
                label="Contact Number"
                name="contactnumber"
                type="text"
                placeholder="123-456-7890"
                autocomplete="off"
              />
              <MyTextAreaInput
                label="Message"
                name="message"
                type="textarea"
                placeholder="Enter your message here...!"
                rows="4"
                cols="50"
                autocomplete="off"
              />
              <MyCheckbox name="acceptedTerms">
                I accept the terms and conditions
              </MyCheckbox>
              <button
                disabled={!formik.isValid}
                className={!formik.isValid ? classes.disableSubmitButton : ""}
                type="submit"
              >
                Submit
              </button>
              <label>{status}</label>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Enquiryform;

const styles = createUseStyles({
  disableSubmitButton: {
    opacity: "50%",
  },
});
