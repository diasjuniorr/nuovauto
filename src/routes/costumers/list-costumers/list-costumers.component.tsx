import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import TimeToLeaveSharpIcon from "@mui/icons-material/TimeToLeaveSharp";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { getCostumers } from "../../../utils/supabase/supabase.utils";
import { Costumer } from "../../../shared/interfaces/pericia.interface";
import { ListItemIcon } from "@material-ui/core";

const CostumersList = () => {
  const [costumers, setCostumers] = useState([] as Costumer[]);
  const [costumersFiltered, setCostumersFiltered] = useState([] as Costumer[]);

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const filteredCostumers = filterCostumers(costumers, value);
    setCostumersFiltered(filteredCostumers);
  };

  useEffect(() => {
    const fetchCostumers = async () => {
      const data = await getCostumers();
      setCostumers(data);
      setCostumersFiltered(data);
    };
    fetchCostumers();
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
          Clientes Cadastrados
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
          {costumersFiltered.map(({ id, name, address }) => {
            const labelId = `checkbox-list-label-${id}`;

            return (
              <ListItem key={id} divider>
                <ListItemButton
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
                    primary={`${name}`}
                    sx={{ flex: "1", textAlign: "left" }}
                  />
                </ListItemButton>
                <ListItemIcon>
                  <a href={address} target="_blank" rel="noreferrer">
                    <LocationOnSharpIcon />
                  </a>
                </ListItemIcon>
                <ListItemIcon onClick={() => alert("teste")}>
                  <TimeToLeaveSharpIcon />
                </ListItemIcon>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Container>
  );
};

const filterCostumers = (costumers: Costumer[], term: string) => {
  return costumers.filter((costumer) => {
    return costumer.name.toLowerCase().includes(term.toLowerCase());
  });
};

export default CostumersList;
