import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";
import { object, string } from "yup";
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { signInWithPassword } from "../../../utils/supabase/supabase.utils";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { FormTextField } from "../../../components/form/form-input/form-input.component";
import { Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../contexts/user/user.context";

let costumerSchema = object({
  email: string().required("Email é obrigatório").email("Email inválido"),
  password: string()
    .required("Senha é obrigatória")
    .min(6, "Mínimo 6 caracteres"),
});

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: "",
  password: "",
};

const SignIn = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  if (user) return <Navigate to="/pericias/add" />;

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          minHeight: "72vh",
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          algignContent: "center",
          justifyContent: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" mb={2}>
          Sign in
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
                const { email, password } = values;
                const res = await signInWithPassword(email, password);
                if (res?.error) {
                  formikHelpers.setSubmitting(false);
                  return toast.error(res.error.message);
                }
                formikHelpers.setSubmitting(false);
                formikHelpers.resetForm();
                navigate("/pericias/add");
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
                    name="email"
                    label="Email"
                    size="small"
                    required
                    fullWidth
                    component={FormTextField}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Field
                    type="password"
                    required
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
                    SIGN IN
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

export default SignIn;
