import PericiaImg from "../../../components/pericia/pericia-img/pericia-img.component";
import { Box, Container, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import PericiaTable from "../../../components/table/table.component";
import { useContext, useEffect, useState } from "react";
import {
  PericiaContext,
  PericiaContextProps,
} from "../../../contexts/pericia.context";
import {
  insertCar,
  insertPericia,
} from "../../../utils/supabase/supabase.utils";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Car, Costumer } from "../../../shared/interfaces/pericia.interface";
import { useNavigate } from "react-router-dom";
import { InsuranceFormComponent } from "../../../components/pericia/forms/insurance/insurance-form-component";
import { HeaderFormComponent } from "../../../components/pericia/forms/header/header-form-component";
import { FinishedFormComponent } from "../../../components/pericia/forms/finished/finished-form-component";
import { DividerComponent } from "../../../components/pericia/divider/divider-component";

const validateFields = (car: Car, costumer: Costumer) => {
  if (car.brand && car.model && car.plate && costumer.id) {
    return true;
  }
  return false;
};

const PericiaCreation = () => {
  const navigate = useNavigate();
  const [car, setCar] = useState<Car>({} as Car);
  const [isLoading, setIsLoading] = useState(false);
  const periciaContext = useContext(PericiaContext) as PericiaContextProps;
  const {
    date,
    pricePerHour,
    finished,
    costumer,
    totalHours,
    totalPrice,
    carParts,
    shouldUnmount,
    unmountPrice,
    insuranceHours,
    updateCar,
    resetPericia,
  } = periciaContext;

  //TODO refact

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

      if (insertCarRes.error) {
        console.log(insertCarRes.error);
        toast.error("Erro ao cadastrar carro");
        setIsLoading(false);
        return;
      }

      updateCar(insertCarRes.data);
      const insertPericiaRes = await insertPericia({
        date,
        car: insertCarRes.data,
        pricePerHour,
        finished,
        costumer,
        totalHours: totalHours,
        totalPrice: totalPrice,
        carParts: carParts,
        shouldUnmount,
        unmountPrice,
        insuranceHours,
      });

      if (insertPericiaRes.error) {
        console.log(insertPericiaRes.error);
        toast.error("Erro ao cadastrar perícia");
        return;
      }

      resetPericia();
      return navigate(`/pericias/${insertPericiaRes.data}?operation=creation`);
    } catch (err) {
      setIsLoading(false);
      toast.error("Erro ao salvar pericia!");
      console.log(err);
    }
  };

  useEffect(() => {
    return resetPericia();
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
        <HeaderFormComponent isLoading={isLoading} car={car} setCar={setCar} />
        <Typography component="h1" variant="h5">
          Pericia
        </Typography>
        <PericiaImg />
        <FinishedFormComponent isLoading={isLoading} />
        <DividerComponent />
        <Typography component="h1" variant="h5" sx={{ mt: 5, mb: 3 }}>
          Tabela
        </Typography>
        <PericiaTable />
        <InsuranceFormComponent isLoading={isLoading} />
        <LoadingButton
          fullWidth
          variant="contained"
          onClick={handleSavePericia}
          loading={isLoading}
          disabled={isLoading}
          sx={{ mt: 3, mb: 2 }}
        >
          Salvar Pericia
        </LoadingButton>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default PericiaCreation;
