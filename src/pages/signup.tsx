import {
  TextField,
  FormGroup,
  Box,
  Card,
  CardContent,
  Button,
} from "@material-ui/core";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { object, string } from "yup";
import { useState } from "react";

export interface PersonDetails {
  name: string;
  email: string;
  password: string;
}

const initialValues: PersonDetails = {
  name: "",
  email: "",
  password: "",
};

export default function Signup() {
  const [message, setMessage] = useState<any>(null);
  async function handleLogin(
    registerName: string,
    registerEmail: string,
    registerPassword: string
  ) {
    const resp = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      }),
    });
    const json = await resp.json();
    setMessage(json);
  }
  return (
    <Card>
      <CardContent>
        <h1>Create a new user</h1>
        {message ? JSON.stringify(message) : ""}
        <Formik
          validationSchema={object({
            name: string().required().min(3).max(26),
            email: string().required().email(),
            password: string().required().min(6).max(24),
          })}
          initialValues={initialValues}
          onSubmit={(values, formikHelpers) => {
            console.log(values);
            console.log(formikHelpers);
            handleLogin(values.name, values.email, values.password);
          }}
        >
          {({ values, errors, isSubmitting, isValidating }) => (
            <Form>
              <Box marginBottom={2}>
                <FormGroup>
                  <Field name="name" type="text" as={TextField} label="Name" />
                  <ErrorMessage name="name" />
                </FormGroup>
              </Box>
              <Box marginBottom={2}>
                <FormGroup>
                  <Field
                    name="email"
                    type="email"
                    as={TextField}
                    label="Email"
                  />
                  <ErrorMessage name="email" />
                </FormGroup>
              </Box>
              <Box marginBottom={2}>
                <FormGroup>
                  <Field
                    name="password"
                    type="password"
                    as={TextField}
                    label="Password"
                  />
                  <ErrorMessage name="password" />
                </FormGroup>
              </Box>

              <Button type="submit" disabled={isSubmitting || isValidating}>
                Create
              </Button>
              {/**
	       * 
        //       <pre>{JSON.stringify(errors, null, 4)}</pre>
        //       <pre>{JSON.stringify(values, null, 4)}</pre>
	       */}
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
