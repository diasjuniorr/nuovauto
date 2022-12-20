import { useNavigate } from "react-router-dom";
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";
import { object, string } from "yup";
import { LoadingButton } from "@mui/lab";
import { Box, Container, Grid, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { recoverPassword } from "../../../utils/supabase/supabase.utils";
import { FormTextField } from "../../../components/form/form-input/form-input.component";

let resetPasswordSchema = object({
  email: string().required("Email é obrigatória").email("Email inválido"),
});

interface FormValues {
  email: string;
}

const initialValues: FormValues = {
  email: "",
};

const ResetPassword = () => {
  const navigate = useNavigate();

  const redirect = () =>
    setTimeout(() => {
      navigate("/");
    }, 3000);

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
          Recuperar Senha
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={resetPasswordSchema}
          enableReinitialize
          onSubmit={(
            values: FormValues,
            formikHelpers: FormikHelpers<FormValues>
          ) => {
            const email = values.email;
            const formkiRecoverPassword = async () => {
              try {
                const res = await recoverPassword(email);
                if (res?.error) {
                  formikHelpers.setSubmitting(false);
                  return toast.error(res.error.message);
                }
                toast.success("Email enviado com sucesso");
                formikHelpers.setSubmitting(false);
                formikHelpers.resetForm();
                redirect();
              } catch (err) {
                toast.error("Erro ao enviar email");
              }
            };
            formkiRecoverPassword();
          }}
        >
          {(formikProps: FormikProps<FormValues>) => (
            <Form noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <Field
                    type="email"
                    fullWidth
                    name="email"
                    label="Email"
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
                    Enviar Email
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

export default ResetPassword;
