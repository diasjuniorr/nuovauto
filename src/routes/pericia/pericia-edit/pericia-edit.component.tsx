import PericiaImg from "../../../components/pericia/pericia-img/pericia-img.component";
import PDFGenerator from "../../../components/pdf/pdf.component";
import { Box, Container, Grid, TextField, Typography } from "@mui/material";
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
} from "../../../utils/supabase/supabase.utils";
import CostumerAutocomplete from "../../../components/pericia/costumer-autocomplete/costumer-autocomplete.component";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Car, Costumer } from "../../../shared/interfaces/pericia.interface";
import { useParams } from "react-router-dom";
import { periciaToUpdateObject } from "../../../utils/pericia/pericia.utils";

const validateFields = (car: Car, costumer: Costumer) => {
  if (car.brand && car.model && car.plate && costumer.id) {
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
    date,
    pricePerHour,
    finished,
    car,
    shouldUnmount,
    unmountPrice,
    updateUnmount,
    updatePericia,
    updateFinished,
    updateCar,
    updatePricePerHour,
  } = periciaContext;
  const { plate, model, brand } = car;

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

  // const handleSavePericia = async () => {
  //   if (!validateFields(car, costumer)) {
  //     toast.error("Preencha os campos obrigatórios!");
  //     return;
  //   }

  //   setIsLoading(true);
  //   try {
  //     const insertCarRes = await insertCar({
  //       ...car,
  //     });

  //     if (insertCarRes) {
  //       updateCar(insertCarRes);
  //       const insertPericiaRes = await insertPericia({
  //         date,
  //         car: insertCarRes,
  //         pricePerHour,
  //         finished,
  //         costumer: costumer,
  //         totalHours: totalHours,
  //         totalPrice: totalPrice,
  //         carParts: carParts,
  //       });
  //     }
  //     setIsLoading(false);
  //     toast.success("Pericia salva com sucesso!");
  //   } catch (err) {
  //     setIsLoading(false);
  //     toast.error("Erro ao salvar pericia!");
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    if (!periciaID) {
      return;
    }

    const fetchPericia = async () => {
      const res = await getPericiaById(periciaID);
      if (res.error) {
        console.log(res.error);
        toast.error("Erro ao buscar pericia!");
        return;
      }

      updatePericia(periciaToUpdateObject(res.data));
    };

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
        <PDFGenerator />
        <LoadingButton
          fullWidth
          variant="contained"
          // onClick={handleSavePericia}
          loading={isLoading}
          disabled={true}
        >
          Atualizar Pericia
        </LoadingButton>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default PericiaEditComponent;
