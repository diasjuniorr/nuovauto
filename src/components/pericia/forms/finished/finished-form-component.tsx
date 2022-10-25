import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { ChangeEvent, useContext } from "react";
import {
  PericiaContext,
  PericiaContextProps,
} from "../../../../contexts/pericia.context";

interface InsuranceFormComponentProps {
  isLoading: boolean;
}

export const FinishedFormComponent: React.FC<InsuranceFormComponentProps> = ({
  isLoading,
}) => {
  const periciaContext = useContext(PericiaContext) as PericiaContextProps;
  const { finished, updateFinished } = periciaContext;

  const handleFinishedChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    updateFinished(checked);
  };

  return (
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
  );
};
