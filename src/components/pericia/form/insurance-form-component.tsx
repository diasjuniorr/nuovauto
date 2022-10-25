import { Grid, TextField } from "@mui/material";
import { ChangeEvent, useContext } from "react";
import {
  PericiaContext,
  PericiaContextProps,
} from "../../../contexts/pericia.context";

interface InsuranceFormProps {
  isLoading: boolean;
}

export const InsuranceFormComponent: React.FC<InsuranceFormProps> = ({
  isLoading,
}) => {
  const periciaContext = useContext(PericiaContext) as PericiaContextProps;
  const { insuranceHours, insurancePrice, updateInsuranceHours } =
    periciaContext;

  const handleInsuranceHoursChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateInsuranceHours(Number(value));
  };

  return (
    <Grid container spacing={2} sx={{ mt: 5, mb: 5 }}>
      <Grid item xs={12} sm={6}>
        <TextField
          type={"number"}
          autoComplete="off"
          fullWidth
          id="insuranceTotalHours"
          label="Total de horas do seguro"
          name="insuranceTotalHours"
          variant="standard"
          onChange={handleInsuranceHoursChange}
          value={insuranceHours.toString()}
          disabled={isLoading}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          autoComplete="off"
          fullWidth
          id="insuranceTotalPrice"
          label="Preço total do seguro/CHF"
          name="insuranceTotalPrice"
          variant="standard"
          value={insurancePrice.toFixed(2)}
          disabled
        />
      </Grid>
    </Grid>
  );
};
