import { LoadingButton } from "@mui/lab";
import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Costumer } from "../../shared/interfaces/pericia.interface";
import { createCostumer } from "../../utils/supabase/supabase.utils";

const initialCostumer: Costumer = {
  id: "",
  name: "",
  address: "",
  email: "",
  phone: "",
  phone2: "",
};

const AddCostumer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [costumer, setCostumer] = useState<Costumer>({} as Costumer);
  const { name, address, email, phone, phone2 } = costumer;

  const handleCostumerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCostumer({ ...costumer, [name]: value });
  };

  const handleAddCostumer = async () => {
    setIsLoading(true);
    try {
      const res = await createCostumer(costumer);
      console.log("res", res);
      setCostumer(initialCostumer);
      setIsLoading(false);
      toast.success("Cliente adicionado com sucesso!");
    } catch (err) {
      setIsLoading(false);
      toast.error("Erro ao adicionar cliente");
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Adicionar cliente
        </Typography>
        <Grid component="form" sx={{ mt: 3, mb: 5 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                id="costumer-name"
                label="Cliente"
                name="name"
                variant="standard"
                onChange={handleCostumerChange}
                value={name}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                id="costumer-address"
                label="Endereço"
                name="address"
                variant="standard"
                onChange={handleCostumerChange}
                value={address}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                id="costumer-email"
                label="Email"
                name="email"
                variant="standard"
                type={"email"}
                onChange={handleCostumerChange}
                value={email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="phone"
                label="Phone"
                id="costumer-phone"
                variant="standard"
                onChange={handleCostumerChange}
                value={phone}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="phone2"
                label="Phone 2"
                id="costumer-phone-2"
                variant="standard"
                onChange={handleCostumerChange}
                value={phone2}
              />
            </Grid>
          </Grid>
        </Grid>
        <LoadingButton
          onClick={handleAddCostumer}
          fullWidth
          variant="contained"
          disabled={isLoading}
          loading={isLoading}
        >
          Adicionar Cliente
        </LoadingButton>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default AddCostumer;
