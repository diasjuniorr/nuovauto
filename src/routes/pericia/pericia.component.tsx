import PericiaImg from "../../components/pericia/pericia-img/pericia-img.component";
import PDFGenerator from "../../components/pdf/pdf.component";
import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import PericiaTable from "../../components/table/table.component";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  PericiaContext,
  PericiaContextProps,
} from "../../contexts/pericia.context";
import {
  getCostumers,
  Costumer,
  Car,
  insertCar,
  insertPericia,
} from "../../utils/supabase/supabase.utils";
import CostumerAutocomplete from "../../components/pericia/costumer-autocomplete/costumer-autocomplete.component";

const validateFields = (car: Car, costumerID: string) => {
  return Object.values(car).every((x) => x.length > 0) && costumerID.length > 0;
};

const carInitialState = {
  id: "",
  brand: "",
  model: "",
  plate: "",
};

const Pericia = () => {
  const [costumers, setCostumers] = useState<Costumer[]>([]);
  const [car, setCar] = useState<Car>(carInitialState);
  const periciaContext = useContext(PericiaContext) as PericiaContextProps;
  const {
    date,
    pricePerHour,
    finished,
    costumerID,
    totalHours,
    totalPrice,
    carParts,
    updateFinished,
    updateCarID,
    updatePricePerHour,
  } = periciaContext;

  const handleCarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCar({ ...car, [name]: value });
  };

  const handlePricePerHourChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updatePricePerHour(Number(value));
  };

  const handleFinishedChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    updateFinished(checked);
  };

  const handleSavePericia = async () => {
    // if (!validateFields(car, costumerID)) {
    //   alert("Preencha todos os campos!");
    //   return;
    // }

    try {
      const insertCarRes = await insertCar({
        ...car,
      });

      if (insertCarRes) {
        updateCarID(insertCarRes.id);

        const insertPericiaRes = await insertPericia({
          date,
          cardID: insertCarRes.id,
          pricePerHour,
          finished,
          costumerID: costumerID,
          totalHours: totalHours,
          totalPrice: totalPrice,
          carParts: carParts,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

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
              <CostumerAutocomplete costumers={costumers} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                id="placa"
                label="Placa"
                name="plate"
                variant="standard"
                onChange={handleCarChange}
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
                onChange={handleCarChange}
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
                onChange={handleCarChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="pricePerHour"
                label="CHF/Ora"
                id="pricePerHour"
                variant="standard"
                value={pricePerHour}
                onChange={handlePricePerHourChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
        </Box>
        <Typography component="h1" variant="h5">
          Pericia
        </Typography>
        <PericiaImg />
        <FormGroup sx={{ width: "100%", mt: 3 }}>
          <FormControlLabel
            control={
              <Checkbox onChange={handleFinishedChange} checked={finished} />
            }
            label="Liquidado"
          />
        </FormGroup>
        <Typography component="h1" variant="h5" sx={{ mt: 5, mb: 3 }}>
          Tabela
        </Typography>
        <PericiaTable />
        <PDFGenerator />
        <Button fullWidth variant="contained" onClick={handleSavePericia}>
          Salvar Pericia
        </Button>
      </Box>
    </Container>
  );
};

export default Pericia;
