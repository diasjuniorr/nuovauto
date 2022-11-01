import * as React from "react";
import { toast, ToastContainer } from "react-toastify";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import {
  getPericias,
  PericiaWithCarAndCostumer,
} from "../../../utils/supabase/supabase.utils";
import { useNavigate } from "react-router-dom";

const skeletons = Array.from(new Array(9));

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
  const [isLoading, setIsLoading] = useState(true);
  const [pericias, setPericias] = useState([] as PericiaWithCarAndCostumer[]);
  const [periciasFiltered, setPericiasFiltered] = useState(
    [] as PericiaWithCarAndCostumer[]
  );
  const [page, setPage] = useState(1);
  const [periciasLength, setPericiasLength] = useState(0);
  const [filter, setFilter] = useState(initialFilterProps);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

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
      const res = await getPericias();
      if (res.error) {
        console.log(res.error);
        toast.error("Erro ao buscar perícias");
        return;
      }

      setPericias(res.data);
      setPericiasLength(res.data.length);
      setPericiasFiltered(res.data);
      setIsLoading(false);
    };
    fetchPericias();
  }, []);

  useEffect(() => {
    const { term, done } = filter;
    const filteredPericias = filterPericias(pericias, term, done);
    setPage(1);
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
          {isLoading
            ? skeletons.map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  height={40}
                  sx={{ mt: 2 }}
                />
              ))
            : periciasFiltered
                .slice(firstIndex(page), lastIndex(page))
                .map(({ cars, costumers, done, id, finished, date }) => {
                  const labelId = `checkbox-list-label-${id}`;
                  const status = getStatus(done, finished);

                  return (
                    <ListItem key={id} divider>
                      <ListItemButton
                        onClick={() => navigate(`/pericias/${id}`)}
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
                          primary={status.text}
                          sx={{
                            color: status.color,
                            flex: "1",
                          }}
                        />
                        <ListItemText
                          id={labelId}
                          primary={new Date(date).toLocaleDateString("pt-BR")}
                          sx={{
                            flex: "1",
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
          {}
        </List>
        <Stack spacing={2} mt={5}>
          <Pagination
            count={Math.ceil(periciasLength / 10)}
            size="large"
            onChange={handlePageChange}
          />
        </Stack>
      </Box>
      <ToastContainer />
    </Container>
  );
};

const firstIndex = (page: number) => {
  return 20 * (page - 1);
};

const lastIndex = (page: number) => {
  return 20 * page;
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
        pericia.cars.plate.toLowerCase().includes(term.toLowerCase()) ||
        pericia.cars.model.toLowerCase().includes(term.toLowerCase())
      );
    })
    .filter((pericia) => {
      return pericia.done === done || pericia.finished === done;
    });
};

const getStatus = (done: boolean, finished: boolean) => {
  if (done) {
    return { color: "success.main", text: "Finalizado" };
  }

  if (finished) {
    return { color: "success.main", text: "Liquidado" };
  }

  return { color: "error.main", text: "Em andamento" };
};

export default PericiaList;
