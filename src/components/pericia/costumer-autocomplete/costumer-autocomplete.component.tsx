import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { useContext } from "react";
import {
  PericiaContext,
  PericiaContextProps,
} from "../../../contexts/pericia.context";
import { Costumer } from "../../../utils/supabase/supabase.utils";

interface Props {
  costumers: Costumer[];
}

const CostumerAutocomplete: React.FC<Props> = ({ costumers }) => {
  const periciaContext = useContext(PericiaContext) as PericiaContextProps;
  const { updateCostumerID } = periciaContext;

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
        updateCostumerID(value.id);
      }}
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
