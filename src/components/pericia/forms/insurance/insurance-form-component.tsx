import { Grid, TextField } from "@mui/material";
import { ChangeEvent, useContext, useState } from "react";
import {
  PericiaContext,
  PericiaContextProps,
} from "../../../../contexts/pericia.context";

interface InsuranceFormProps {
  isLoading: boolean;
}

export const InsuranceFormComponent: React.FC<InsuranceFormProps> = ({
  isLoading,
}) => {
  const periciaContext = useContext(PericiaContext) as PericiaContextProps;
  const { insuranceHours, insurancePrice, updateInsuranceHours } =
    periciaContext;
  const [insuranceHoursMask, setInsuranceHoursMask] = useState<string>(
    insuranceHours.toString()
  );

  const handleInsuranceHoursChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value === "") {
      return setInsuranceHoursMask("0");
    }

    const pattern = /^[0-9]*\.?[0-9]{0,2}$/;
    if (!value.match(pattern)) {
      return;
    }

    if (value[0] === "0" && value[1] !== "." && value.length > 1) {
      return setInsuranceHoursMask(value.slice(1));
    }

    setInsuranceHoursMask(value);
  };

  const handleOnBlur = async () => {
    if (insuranceHoursMask === "") {
      return updateInsuranceHours(0);
    }

    updateInsuranceHours(Number(insuranceHoursMask));
  };

  return (
    <Grid container spacing={2} sx={{ mt: 5, mb: 5 }}>
      <Grid item xs={12} sm={6}>
        <TextField
          autoComplete="off"
          fullWidth
          id="insuranceTotalHours"
          label="Total de horas do seguro"
          name="insuranceTotalHours"
          variant="standard"
          onChange={handleInsuranceHoursChange}
          value={insuranceHoursMask}
          onBlur={handleOnBlur}
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
