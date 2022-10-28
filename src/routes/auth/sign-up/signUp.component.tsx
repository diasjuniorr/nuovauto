import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";
import { object, string } from "yup";
import { LoadingButton } from "@mui/lab";
import { Box, Container, Grid, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import {
  createUser,
  signUpWithEmail,
} from "../../../utils/supabase/supabase.utils";
import { FormTextField } from "../../../components/form/form-input/form-input.component";
import { useEffect } from "react";

let costumerSchema = object({
  name: string().required("Nome é obrigatório"),
  phone: string().required("Telefone é obrigatório"),
  email: string()
    .email("Este email não é válido")
    .required("Email é obrigatório"),
  nationality: string().nullable(),
  password: string().required("Senha é obrigatória"),
});

const genRand = (len: number) => {
  return Math.random()
    .toString(36)
    .substring(2, len + 2);
};

interface FormValues {
  name: string;
  phone: string;
  email: string;
  nationality: string;
  password: string;
}

const initialValues: FormValues = {
  name: "",
  phone: "",
  email: "",
  nationality: "",
  password: genRand(8),
};

const SignUP = () => {
  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          minHeight: "72vh",
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Adicionar técnico
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={costumerSchema}
          enableReinitialize
          onSubmit={(
            values: FormValues,
            formikHelpers: FormikHelpers<FormValues>
          ) => {
            const formkiCreateUser = async () => {
              try {
                const res = await signUpWithEmail(values);
                if (res?.error) {
                  formikHelpers.setSubmitting(false);
                  return toast.error(res.error.message);
                }

                formikHelpers.setSubmitting(false);
                toast.success("Técnico adicionado com sucesso!");
                formikHelpers.resetForm();
              } catch (err) {
                toast.error("Erro ao adicionar Técnico");
              }
            };
            formkiCreateUser();
          }}
        >
          {(formikProps: FormikProps<FormValues>) => (
            <Form noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Field
                    name="name"
                    label="Nome"
                    size="small"
                    required
                    fullWidth
                    component={FormTextField}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Field
                    fullWidth
                    required
                    name="email"
                    label="Email"
                    size="small"
                    component={FormTextField}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    required
                    fullWidth
                    name="phone"
                    label="Phone"
                    size="small"
                    component={FormTextField}
                    autoComplete={"off"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    fullWidth
                    name="nationality"
                    label="Nacionalidade"
                    size="small"
                    component={FormTextField}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Field
                    disabled
                    fullWidth
                    name="password"
                    label="Senha"
                    size="small"
                    component={FormTextField}
                  />
                </Grid>
                <Grid item xs={12} mt={3}>
                  <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    loading={formikProps.isSubmitting}
                    disabled={formikProps.isSubmitting}
                  >
                    Adicionar técnico
                  </LoadingButton>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default SignUP;