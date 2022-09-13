import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import {
  getPericias,
  PericiaWithCarAndCostumer,
} from "../../../utils/supabase/supabase.utils";
import { useNavigate } from "react-router-dom";

interface filterProps {
  term: string;
  done: boolean;
}

const initialFilterProps: filterProps = {
  term: "",
  done: false,
};

const PericiaList = () => {
  const navigate = useNavigate();
  const [pericias, setPericias] = useState([] as PericiaWithCarAndCostumer[]);
  const [periciasFiltered, setPericiasFiltered] = useState(
    [] as PericiaWithCarAndCostumer[]
  );
  const [filter, setFilter] = useState(initialFilterProps);

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilter({ ...filter, term: value });
  };

  const handleDoneFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFilter({ ...filter, done: checked });
  };

  useEffect(() => {
    const fetchPericias = async () => {
      const data = await getPericias();
      setPericias(data);
      setPericiasFiltered(data);
    };
    fetchPericias();
  }, []);

  useEffect(() => {
    const { term, done } = filter;
    const filteredPericias = filterPericias(pericias, term, done);
    setPericiasFiltered(filteredPericias);
  }, [filter]);

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "72vh",
        }}
      >
        <Typography component="h1" variant="h5" mb={5}>
          Pericias Cadastradas
        </Typography>
        <Grid container spacing={2} mb={5}>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              id="filter"
              label="Filtro"
              name="filter"
              variant="standard"
              onChange={handleFilter}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormGroup sx={{ width: "100%" }}>
              <FormControlLabel
                control={<Checkbox onChange={handleDoneFilter} />}
                label="Finalizadas"
              />
            </FormGroup>
          </Grid>
        </Grid>
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
          }}
        >
          {periciasFiltered.map(({ cars, costumers, done, id }) => {
            const labelId = `checkbox-list-label-${id}`;

            return (
              <ListItem key={id} divider>
                <ListItemButton
                  onClick={() => navigate(`/pericia/${id}`)}
                  role={undefined}
                  dense
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <ListItemText
                    id={labelId}
                    primary={`${costumers.name}`}
                    sx={{ flex: "1", textAlign: "left" }}
                  />
                  <ListItemText
                    id={labelId}
                    primary={`${cars.plate}`}
                    sx={{ flex: "1" }}
                  />
                  <ListItemText
                    id={labelId}
                    primary={`${cars.model}`}
                    sx={{ flex: "1" }}
                  />
                  <ListItemText
                    id={labelId}
                    primary={`${done ? "Finalizado" : "Andamento"} `}
                    sx={{
                      color: done ? "success.main" : "warning.main",
                      flex: "1",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Container>
  );
};

const filterPericias = (
  pericias: PericiaWithCarAndCostumer[],
  term: string,
  done: boolean
) => {
  return pericias
    .filter((pericia) => {
      return (
        pericia.costumers.name.toLowerCase().includes(term.toLowerCase()) ||
        pericia.cars.plate.toLowerCase().includes(term.toLowerCase())
      );
    })
    .filter((pericia) => {
      return pericia.done === done;
    });
};

export default PericiaList;
