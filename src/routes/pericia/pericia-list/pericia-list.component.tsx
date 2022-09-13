import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import {
  getPericias,
  PericiaWithCarAndCostumer,
} from "../../../utils/supabase/supabase.utils";
import { useNavigate } from "react-router-dom";

const PericiaList = () => {
  const navigate = useNavigate();
  const [pericias, setPericias] = useState([] as PericiaWithCarAndCostumer[]);
  const [periciasFiltered, setPericiasFiltered] = useState(
    [] as PericiaWithCarAndCostumer[]
  );

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const filteredPericias = pericias.filter((pericia) => {
      return (
        pericia.costumers.name.toLowerCase().includes(value.toLowerCase()) ||
        pericia.cars.plate.toLowerCase().includes(value.toLowerCase())
      );
    });

    setPericiasFiltered(filteredPericias);
  };

  useEffect(() => {
    const fetchPericias = async () => {
      const data = await getPericias();
      setPericias(data);
      setPericiasFiltered(data);
    };
    fetchPericias();
  }, []);

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

export default PericiaList;
