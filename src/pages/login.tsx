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
  email: string;
  password: string;
}

const initialValues: PersonDetails = {
  email: "",
  password: "",
};

export default function Login() {
  const [message, setMessage] = useState<any>(null);
  async function handleLogin(loginEmail: string, loginPassword: string) {
    const resp = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
      }),
    });
    const json = await resp.json();
    setMessage(json);
  }
  return (
    <Card>
      <CardContent>
        {message ? JSON.stringify(message) : ""}
        <Formik
          validationSchema={object({
            email: string().required().email(),
            password: string().required().min(6).max(24),
          })}
          initialValues={initialValues}
          onSubmit={(values, formikHelpers) => {
            console.log(values);
            console.log(formikHelpers);
            handleLogin(values.email, values.password);
          }}
        >
          {({ values, errors, isSubmitting, isValidating }) => (
            <Form>
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
                Submit
              </Button>

              <pre>{JSON.stringify(errors, null, 4)}</pre>
              <pre>{JSON.stringify(values, null, 4)}</pre>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
