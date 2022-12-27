import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import "./Enquiryform.css";
import * as emailjs from 'emailjs-com';

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
    return (
        <div>
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    acceptedTerms: false, // added for our checkbox
                }}
                validationSchema={Yup.object({
                    firstName: Yup.string()
                        .max(15, "Must be 15 characters or less")
                        .required("Required"),
                    lastName: Yup.string()
                        .max(20, "Must be 20 characters or less")
                        .required("Required"),
                    email: Yup.string()
                        .email("Invalid email addresss`")
                        .required("Required"),
                    acceptedTerms: Yup.boolean()
                        .required("Required")
                        .oneOf([true], "You must accept the terms and conditions."),
                    message: Yup.string()
                        .max(1000, "Must be 20 characters or less")
                        .required("Required")

                })}
                onSubmit={async (values, { setSubmitting }) => {
                    try{
                        emailjs.send(process.env.REACT_APP_SERVICE_ID , process.env.REACT_APP_TEMPLATE_ID, values, process.env.REACT_APP_USER_ID)
                          .then(() => {
                            console.log("Sent successful")});
                       }
                       catch {
                        console.log("Error")
                      }
                    
                    setSubmitting(false);
                    console.log("values====0,",values)
                }}
            > 
                <Form>
                    <MyTextInput
                        label="First Name"
                        name="firstName"
                        type="text"
                        placeholder="Jane"
                    />
                    <MyTextInput
                        label="Last Name"
                        name="lastName"
                        type="text"
                        placeholder="Doe"
                    />
                    <MyTextInput
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="jane@formik.com"
                    />
                    <MyTextAreaInput
                        label="Message"
                        name="message"
                        type="textarea"
                        placeholder="Enter your message here...!"
                        rows="4" 
                        cols="50"
                    />
                    <MyCheckbox name="acceptedTerms">
                        I accept the terms and conditions
                    </MyCheckbox>

                    <button disabled={false} type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    );
};

export default Enquiryform