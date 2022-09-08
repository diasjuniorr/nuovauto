import PericiaImg from "../../../components/pericia/pericia-img/pericia-img.component";
import PDFGenerator from "../../../components/pdf/pdf.component";
import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LoadingButton from "@mui/lab/LoadingButton";
import PericiaTable from "../../../components/table/table.component";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  PericiaContext,
  PericiaContextProps,
} from "../../../contexts/pericia.context";
import {
  getCostumers,
  insertCar,
  insertPericia,
} from "../../../utils/supabase/supabase.utils";
import CostumerAutocomplete from "../../../components/pericia/costumer-autocomplete/costumer-autocomplete.component";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Car, Costumer } from "../../../shared/interfaces/pericia.interface";
import { useNavigate } from "react-router-dom";

const validateFields = (car: Car, costumer: Costumer) => {
  if (car.brand && car.model && car.plate && costumer.id) {
    return true;
  }
  return false;
};

const PericiaCreation = () => {
  const navigate = useNavigate();
  const [costumers, setCostumers] = useState<Costumer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [car, setCar] = useState<Car>({} as Car);
  const [isSaved, setIsSaved] = useState(false);
  const periciaContext = useContext(PericiaContext) as PericiaContextProps;
  const {
    date,
    pricePerHour,
    finished,
    costumer,
    totalHours,
    totalPrice,
    carParts,
    updateFinished,
    updateCar,
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
    if (!validateFields(car, costumer)) {
      toast.error("Preencha os campos obrigatórios!");
      return;
    }

    setIsLoading(true);
    try {
      const insertCarRes = await insertCar({
        ...car,
      });

      if (insertCarRes) {
        updateCar(insertCarRes);
        const insertPericiaRes = await insertPericia({
          date,
          cardID: insertCarRes.id,
          pricePerHour,
          finished,
          costumerID: costumer.id,
          totalHours: totalHours,
          totalPrice: totalPrice,
          carParts: carParts,
        });
        setIsSaved(true);
        navigate(`/pericia/${insertPericiaRes}`);
        return toast.success("Pericia salva com sucesso!");
      }
      setIsLoading(false);
      //redirect to pericia page
    } catch (err) {
      setIsLoading(false);
      toast.error("Erro ao salvar pericia!");
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
              <CostumerAutocomplete
                costumers={costumers}
                isLoading={isLoading}
              />
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
              <Checkbox
                onChange={handleFinishedChange}
                checked={finished}
                disabled={isLoading}
              />
            }
            label="Liquidado"
          />
        </FormGroup>
        <hr
          style={{
            height: "1px",
            backgroundColor: "lightgray",
            border: "none",
            width: "100%",
            marginTop: "32px",
          }}
        />
        <Typography component="h1" variant="h5" sx={{ mt: 5, mb: 3 }}>
          Tabela
        </Typography>
        <PericiaTable />
        <PDFGenerator isReady={!isSaved} />
        <LoadingButton
          fullWidth
          variant="contained"
          onClick={handleSavePericia}
          loading={isLoading}
          disabled={isLoading}
        >
          Salvar Pericia
        </LoadingButton>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default PericiaCreation;
