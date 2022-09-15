import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";
import { object, string } from "yup";
import { LoadingButton } from "@mui/lab";
import { Box, Container, Grid, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { createCostumer } from "../../../utils/supabase/supabase.utils";
import { FormTextField } from "../../../components/form/form-input/form-input.component";

let costumerSchema = object({
  name: string().required("Nome é obrigatório"),
  address: string()
    .url("Este link é inválido")
    .required("Endereço é obrigatório"),
  phone: string().required("Telefone é obrigatório"),
  phone2: string().nullable(),
  email: string().email("Este email não é válido").nullable(),
});

interface FormValues {
  name: string;
  address: string;
  phone: string;
  phone2: string;
  email: string;
}

const initialValues: FormValues = {
  name: "",
  address: "",
  phone: "",
  phone2: "",
  email: "",
};

const AddCostumer = () => {
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
          Adicionar cliente
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={costumerSchema}
          onSubmit={(
            values: FormValues,
            formikHelpers: FormikHelpers<FormValues>
          ) => {
            const formkiCreateCostumer = async () => {
              try {
                await createCostumer(values);
                formikHelpers.setSubmitting(false);
                toast.success("Cliente adicionado com sucesso!");
                formikHelpers.resetForm();
              } catch (err) {
                toast.error("Erro ao adicionar cliente");
              }
            };
            formkiCreateCostumer();
          }}
        >
          {(formikProps: FormikProps<FormValues>) => (
            <Form noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Field
                    name="name"
                    label="Cliente"
                    size="small"
                    required
                    fullWidth
                    component={FormTextField}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Field
                    required
                    fullWidth
                    name="address"
                    label="Endereço (Google Maps link)"
                    size="small"
                    component={FormTextField}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Field
                    required
                    fullWidth
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
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    required
                    fullWidth
                    name="phone2"
                    label="Phone2"
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
                    Adicionar Cliente
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

export default AddCostumer;
