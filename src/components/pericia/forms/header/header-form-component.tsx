import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
} from "@mui/material";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  PericiaContext,
  PericiaContextProps,
} from "../../../../contexts/pericia.context";
import { Car, Costumer } from "../../../../shared/interfaces/pericia.interface";
import { getCostumers } from "../../../../utils/supabase/supabase.utils";
import CostumerAutocomplete from "../../costumer-autocomplete/costumer-autocomplete.component";

interface HeaderFormComponentProps {
  isLoading: boolean;
  car: Car;
  setCar: (car: Car) => void;
  saveCar: () => void;
}

export const HeaderFormComponent: React.FC<HeaderFormComponentProps> = ({
  isLoading,
  car,
  setCar,
  saveCar,
}) => {
  const [costumers, setCostumers] = useState<Costumer[]>([]);
  const periciaContext = useContext(PericiaContext) as PericiaContextProps;
  const {
    date,
    pricePerHour,
    shouldUnmount,
    unmountPrice,
    updatePricePerHour,
    updateUnmount,
  } = periciaContext;

  const handleCarPlateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCar({ ...car, [name]: value.toUpperCase() });
  };

  const handleCarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCar({ ...car, [name]: value });
  };

  const handlePricePerHourChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updatePricePerHour(Number(value));
  };

  const handleUnmount = (e: ChangeEvent<HTMLInputElement>) => {
    updateUnmount(!shouldUnmount, unmountPrice);
  };

  const handleUnmountPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateUnmount(shouldUnmount, Number(value));
  };

  useEffect(() => {
    //TODO put costumers in a hook
    const fetchCostumers = async () => {
      const res = await getCostumers();
      if (res.error) {
        console.log(res.error);
        toast.error("Erro ao buscar clientes!");
        return;
      }

      setCostumers(sortAlphabetically(res.data));
    };
    fetchCostumers();
  }, []);

  return (
    <Box component="form" noValidate sx={{ mt: 3, mb: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <CostumerAutocomplete costumers={costumers} isLoading={isLoading} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            autoComplete="off"
            required
            fullWidth
            id="placa"
            label="Placa"
            name="plate"
            variant="standard"
            onChange={handleCarPlateChange}
            value={car.plate || ""}
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
            fullWidth
            name="insurance_name"
            label="Seguro"
            id="insuranceName"
            variant="standard"
            onChange={handleCarChange}
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
            onBlur={saveCar}
            disabled={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type={"number"}
            required
            fullWidth
            name="pricePerHour"
            label="CHF/Ora"
            id="pricePerHour"
            variant="standard"
            value={pricePerHour.toString()}
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
                <Checkbox onChange={handleUnmount} checked={shouldUnmount} />
              }
              label="Desmontar"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={6} sm={6} display={shouldUnmount ? "block" : "none"}>
          <TextField
            type={"number"}
            required
            fullWidth
            name="unmount"
            label="Preço desmontagem"
            id="unmount"
            variant="standard"
            value={unmountPrice.toString()}
            onChange={handleUnmountPriceChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

function sortAlphabetically(arr: Costumer[]) {
  return arr.sort((a, b) => a.name.localeCompare(b.name));
}
