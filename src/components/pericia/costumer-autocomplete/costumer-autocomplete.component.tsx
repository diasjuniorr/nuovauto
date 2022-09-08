import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { useContext } from "react";
import {
  PericiaContext,
  PericiaContextProps,
} from "../../../contexts/pericia.context";
import { Costumer } from "../../../shared/interfaces/pericia.interface";

interface Props {
  costumers: Costumer[];
  isLoading: boolean;
}

const CostumerAutocomplete: React.FC<Props> = ({ costumers, isLoading }) => {
  const periciaContext = useContext(PericiaContext) as PericiaContextProps;
  const { updateCostumer } = periciaContext;

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={costumers.map((costumer) => ({
        label: costumer.name,
        id: costumer.id,
      }))}
      onChange={(e, value) => {
        if (!value) return;
        updateCostumer({ id: value.id, name: value.label });
      }}
      disabled={isLoading}
      isOptionEqualToValue={(option, value) => option.id === value.id}
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
  );
};

export default CostumerAutocomplete;
