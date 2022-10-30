import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";
import { object, string } from "yup";
import { LoadingButton } from "@mui/lab";
import { Box, Container, Grid, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { inviteUserByEmail } from "../../../utils/supabase/supabase.utils";
import { FormTextField } from "../../../components/form/form-input/form-input.component";

let costumerSchema = object({
  email: string()
    .email("Este email não é válido")
    .required("Email é obrigatório"),
});

interface FormValues {
  email: string;
}

const initialValues: FormValues = {
  email: "",
};

const AddUser = () => {
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
          style={{ alignSelf: "center" }}
          initialValues={initialValues}
          validationSchema={costumerSchema}
          enableReinitialize
          onSubmit={(
            values: FormValues,
            formikHelpers: FormikHelpers<FormValues>
          ) => {
            const formkiCreateUser = async () => {
              try {
                const { email } = values;
                const res = await inviteUserByEmail(email);
                if (res?.error) {
                  formikHelpers.setSubmitting(false);
                  return toast.error(res.error.message);
                }
                formikHelpers.setSubmitting(false);
                toast.success("Técnico adicionado com sucesso!");
                formikHelpers.resetForm();
              } catch (err) {
                toast.error("Erro ao adicionar Técnico");
                formikHelpers.setSubmitting(false);
              }
            };
            formkiCreateUser();
          }}
        >
          {(formikProps: FormikProps<FormValues>) => (
            <Form
              noValidate
              autoComplete="off"
              style={{ width: "100%", padding: "0 16px" }}
            >
              <Grid container spacing={2} mt="5">
                <Grid item xs={12} md={8} mt={5}>
                  <Field
                    name="email"
                    label="Email"
                    size="small"
                    required
                    fullWidth
                    component={FormTextField}
                  />
                </Grid>
                <Grid item xs={12} md={4} mt={6}>
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

export default AddUser;
