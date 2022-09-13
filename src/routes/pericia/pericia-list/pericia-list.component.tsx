import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  getPericias,
  PericiaWithCarAndCostumer,
} from "../../../utils/supabase/supabase.utils";

const PericiaList = () => {
  const [pericias, setPericias] = useState([] as PericiaWithCarAndCostumer[]);

  useEffect(() => {
    const fetchPericias = async () => {
      const data = await getPericias();
      console.log(data);
      setPericias(data);
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
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
          }}
        >
          {pericias.map(({ cars, costumers, done, id }) => {
            const labelId = `checkbox-list-label-${id}`;

            return (
              <ListItem key={id} divider>
                <ListItemButton
                  role={undefined}
                  dense
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
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
