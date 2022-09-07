import PericiaImg from "../../components/pericia/pericia-img/pericia-img.component";
import PDFGenerator from "../../components/pdf/pdf.component";
import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import PericiaTable from "../../components/table/table.component";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  PericiaContext,
  PericiaContextProps,
} from "../../contexts/pericia.context";
import { getCostumers, Costumer } from "../../utils/supabase/supabase.utils";

const Pericia = () => {
  const [costumers, setCostumers] = useState<Costumer[]>([]);
  const [costumer, setCostumer] = useState<Costumer>();
  const periciaContext = useContext(PericiaContext) as PericiaContextProps;
  const { date } = periciaContext;

  useEffect(() => {
    const fetchCostumers = async () => {
      const costumers = await getCostumers();
      setCostumers(costumers);
    };
    fetchCostumers();
  }, []);

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
          Cadastro de Pericia
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3, mb: 5 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={costumers.map((costumer) => ({
                  label: costumer.name,
                  id: costumer.id,
                }))}
                onChange={(e, value) => {
                  if (!value) return;
                  setCostumer({ name: value.label, id: value.id });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Cliente"
                    required
                    fullWidth
                    id="costumerName"
                    autoFocus
                    variant="standard"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                id="placa"
                label="Placa"
                name="placa"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                id="brand"
                label="Marca"
                name="brand"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                name="model"
                label="Modelo"
                id="model"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                name="date"
                label="Data"
                id="date"
                variant="standard"
                value={date.toLocaleDateString("pt-BR")}
                disabled
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Adicionar
          </Button>
        </Box>
        <Typography component="h1" variant="h5">
          Pericia
        </Typography>
        <PericiaImg />
        <Typography component="h1" variant="h5" sx={{ mt: 5, mb: 3 }}>
          Tabela
        </Typography>
        <PericiaTable />
        <PDFGenerator />
        <Button fullWidth variant="contained">
          Salvar Pericia
        </Button>
      </Box>
    </Container>
  );
};

export default Pericia;
