import { useNavigate } from "react-router-dom";
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";
import { object, ref, string } from "yup";
import { LoadingButton } from "@mui/lab";
import { Box, Container, Grid, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { updatePassword } from "../../../utils/supabase/supabase.utils";
import { FormTextField } from "../../../components/form/form-input/form-input.component";

let resetPasswordSchema = object({
  password: string()
    .required("Senha é obrigatória")
    .min(6, "Mínimo 6 caracteres"),
  confirmPassword: string()
    .required("Confirmação de senha é obrigatória")
    .min(6, "Mínimo 6 caracteres")
    .oneOf([ref("password"), null], "Senhas não conferem"),
});

interface FormValues {
  password: string;
  confirmPassowrd: string;
}

const initialValues: FormValues = {
  password: "",
  confirmPassowrd: "",
};

const UpdatePassword = () => {
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
          Nova Senha
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={resetPasswordSchema}
          enableReinitialize
          onSubmit={(
            values: FormValues,
            formikHelpers: FormikHelpers<FormValues>
          ) => {
            const password = values.password;
            const formkiUpdatePassword = async () => {
              try {
                const res = await updatePassword(password);
                if (res?.error) {
                  formikHelpers.setSubmitting(false);
                  return toast.error(res.error.message);
                }
                toast.success("Senha alterada com sucesso!");
                formikHelpers.setSubmitting(false);
                formikHelpers.resetForm();
                redirect();
              } catch (err) {
                toast.error("Erro ao alterar senha");
              }
            };
            formkiUpdatePassword();
          }}
        >
          {(formikProps: FormikProps<FormValues>) => (
            <Form noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <Field
                    type="password"
                    fullWidth
                    name="password"
                    label="Senha nova"
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
                    Atualizar senha
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

export default UpdatePassword;
