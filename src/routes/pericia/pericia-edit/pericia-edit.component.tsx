import PericiaImg from "../../../components/pericia/pericia-img/pericia-img.component";
import PDFGenerator from "../../../components/pdf/pdf.component";
import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LoadingButton from "@mui/lab/LoadingButton";
import PericiaTable from "../../../components/table/table.component";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import {
  PericiaContext,
  PericiaContextProps,
} from "../../../contexts/pericia.context";
import {
  getCostumers,
  getPericiaById,
  PericiaBilled,
  saveCostumerPrice,
  updatePericiaBilled,
  upsertCar,
  upsertPericia,
} from "../../../utils/supabase/supabase.utils";
import CostumerAutocomplete from "../../../components/pericia/costumer-autocomplete/costumer-autocomplete.component";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Car, Costumer } from "../../../shared/interfaces/pericia.interface";
import { useParams } from "react-router-dom";
import { periciaToUpdateObject } from "../../../utils/pericia/pericia.utils";
import { InsuranceFormComponent } from "../../../components/pericia/forms/insurance/insurance-form-component";

const validateFields = (car: Car, costumer: Costumer) => {
  if (car.brand && car.model && car.plate && costumer.id && car.color) {
    return true;
  }
  return false;
};

const PericiaEditComponent = () => {
  const { periciaID } = useParams();
  const [costumers, setCostumers] = useState<Costumer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const periciaContext = useContext(PericiaContext) as PericiaContextProps;
  const {
    id,
    date,
    pricePerHour,
    finished,
    car,
    shouldUnmount,
    unmountPrice,
    carParts,
    costumer,
    insuranceHours,
    billed,
    costumerPrice,
    updateCostumerPrice,
    updateUnmount,
    updatePericia,
    updateFinished,
    updateCar,
    updatePricePerHour,
    updateDate,
  } = periciaContext;
  const { plate, model, brand, insurance_name, color } = car;

  //TODO use skeleton loading

  const calledOnce = useRef(false);

  const handleUnmount = (e: ChangeEvent<HTMLInputElement>) => {
    updateUnmount(!shouldUnmount, unmountPrice);
  };

  const handleUnmountPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateUnmount(shouldUnmount, Number(value));
  };

  const handleCarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateCar({ ...car, [name]: value });
  };

  const handlePricePerHourChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updatePricePerHour(Number(value));
  };

  const handleFinishedChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    updateFinished(checked);
  };

  const handleCostumerPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value === "") {
      return updateCostumerPrice("0");
    }

    const pattern = /^[0-9]*\.?[0-9]{0,2}$/;
    if (!value.match(pattern)) {
      return;
    }

    if (value[0] === "0" && value[1] !== "." && value.length > 1) {
      return updateCostumerPrice(value.slice(1));
    }

    updateCostumerPrice(value);
  };

  const handleSaveCostumerPrice = async () => {
    const { error } = await saveCostumerPrice(id, costumerPrice);
    if (error) {
      toast.error("Erro ao salvar preço");
    } else {
      toast.success("Preço salvo com sucesso");
    }
  };

  const handleSavePericia = async () => {
    if (!validateFields(car, costumer)) {
      toast.error("Preencha os campos obrigatórios!");
      return;
    }

    setIsLoading(true);
    try {
      const upsertCarRes = await upsertCar({
        ...car,
      });

      if (upsertCarRes.error) {
        console.log(upsertCarRes.error);
        toast.error("Erro ao atualizar carro");
        setIsLoading(false);
        return;
      }

      if (upsertCarRes.data) {
        updateCar(upsertCarRes.data);
        const upsertPericiaRes = await upsertPericia({
          id,
          date,
          shouldUnmount,
          unmountPrice,
          car: upsertCarRes.data,
          pricePerHour,
          finished,
          costumer,
          carParts: carParts,
          done: false,
          insuranceHours,
          costumerPrice,
          billed,
        });

        if (upsertPericiaRes.error) {
          console.log(upsertPericiaRes.error);
          toast.error("Erro ao atualizar perícia");
          return;
        }

        setIsLoading(false);
        return toast.info("Perícia atualizada com sucesso!");
      }
    } catch (err) {
      setIsLoading(false);
      toast.error("Erro ao atualizar pericia!");
      console.log(err);
    }
  };

  const handleUpdateBilled = async (pericia: PericiaBilled) => {
    setIsLoading(true);
    try {
      const { error } = await updatePericiaBilled(pericia);

      if (error) {
        throw new Error(error.message);
      }

      toast.success("Perícia atualizada com sucesso!");
      setIsLoading(false);
      fetchPericia();
    } catch (error) {
      setIsLoading(false);
      toast.error(error as string);
    }
  };

  const fetchPericia = async () => {
    if (!periciaID) return;

    const res = await getPericiaById(periciaID);
    if (res.error) {
      console.log(res.error);
      toast.error("Erro ao buscar pericia!");
      return;
    }

    updatePericia(periciaToUpdateObject(res.data));
  };

  useEffect(() => {
    //TODO put fetchCostumer in a context
    fetchPericia();
    const fetchCostumers = async () => {
      const res = await getCostumers();
      if (res.error) {
        console.log(res.error);
        toast.error("Erro ao buscar clientes!");
        return;
      }

      setCostumers(res.data);
    };
    fetchCostumers();
  }, []);

  useEffect(() => {
    if (calledOnce.current) {
      return;
    }
    calledOnce.current = true;

    const queryParams = new URLSearchParams(window.location.search);
    const term = queryParams.get("operation");
    if (term === "creation") {
      toast.success("Pericia criada com sucesso!");
      return;
    }

    if (term === "edit") {
      toast.info("Pericia editada com sucesso!");
      return;
    }
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
          Edição de Pericia
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
                value={plate || ""}
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
                value={brand || ""}
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
                value={model || ""}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="insurance_name"
                label="Seguro"
                id="insuranceName"
                variant="standard"
                onChange={handleCarChange}
                value={insurance_name || ""}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="color"
                label="Cor"
                id="color"
                variant="standard"
                onChange={handleCarChange}
                value={color || ""}
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}>
                  <DatePicker
                    label="Data"
                    openTo="month"
                    inputFormat="DD/MM/YYYY"
                    views={["year", "month", "day"]}
                    value={date}
                    onChange={(newValue) => {
                      if (newValue) updateDate(new Date(newValue));
                    }}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" />
                    )}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6} sm={6}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleUnmount}
                      checked={shouldUnmount}
                    />
                  }
                  label="Desmontar"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={6} sm={6} display={shouldUnmount ? "block" : "none"}>
              <TextField
                required
                fullWidth
                name="unmount"
                label="Preço desmontagem"
                id="unmount"
                variant="standard"
                value={unmountPrice}
                onChange={handleUnmountPriceChange}
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
        <InsuranceFormComponent isLoading={isLoading} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              name="costumerPrice"
              label="Preço cliente/CHF"
              id="pricePerHour"
              variant="standard"
              value={costumerPrice ? costumerPrice.toString() : "0"}
              onChange={handleCostumerPriceChange}
              onBlur={handleSaveCostumerPrice}
              disabled={isLoading}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={isLoading}
                    onChange={() =>
                      handleUpdateBilled({
                        id,
                        billed: !billed,
                      })
                    }
                    checked={billed}
                  />
                }
                label="Faturado"
              />
            </FormGroup>
          </Grid>
        </Grid>
        <hr
          style={{
            height: "1px",
            backgroundColor: "lightgray",
            border: "none",
            width: "100%",
            marginTop: "32px",
            marginBottom: "32px",
          }}
        />
        <PDFGenerator disabled={isLoading} withCostumerPrice={false} />
        <PDFGenerator disabled={isLoading} withCostumerPrice={true} />
        <LoadingButton
          fullWidth
          variant="contained"
          onClick={handleSavePericia}
          loading={isLoading}
        >
          Atualizar Pericia
        </LoadingButton>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default PericiaEditComponent;
