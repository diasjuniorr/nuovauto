import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";
import { object, ref, string } from "yup";
import { LoadingButton } from "@mui/lab";
import { Box, Container, Grid, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import {
  signOut,
  signUpWithEmail,
} from "../../../utils/supabase/supabase.utils";
import { FormTextField } from "../../../components/form/form-input/form-input.component";

let costumerSchema = object({
  name: string().required("Nome é obrigatório"),
  phone: string().required("Telefone é obrigatório"),
  nationality: string().nullable(),
  password: string()
    .required("Senha é obrigatória")
    .min(6, "Mínimo 6 caracteres"),
  confirmPassword: string()
    .required("Confirmação de senha é obrigatória")
    .min(6, "Mínimo 6 caracteres")
    .oneOf([ref("password"), null], "Senhas não conferem"),
});

interface FormValues {
  name: string;
  phone: string;
  nationality: string;
  password: string;
  confirmPassowrd: string;
}

const initialValues: FormValues = {
  name: "",
  phone: "",
  nationality: "",
  password: "",
  confirmPassowrd: "",
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
          justifyContent: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Cadastro
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

                toast.success("Senha alterada com sucesso!");
                formikHelpers.setSubmitting(false);
                formikHelpers.resetForm();

                const err = signOut();
                if (err) {
                  console.log(err);
                }
              } catch (err) {
                toast.error("Erro ao alterar senha");
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
                    autoComplete={"off"}
                    name="nationality"
                    label="Nacionalidade"
                    size="small"
                    component={FormTextField}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Field
                    type="password"
                    fullWidth
                    name="password"
                    label="Senha"
                    size="small"
                    component={FormTextField}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Field
                    type="password"
                    fullWidth
                    name="confirmPassword"
                    label="Confirmar senha"
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
                    Finalizar cadastro
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
