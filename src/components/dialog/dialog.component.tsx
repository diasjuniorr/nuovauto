import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Typography } from "@mui/material";

export default function DialogSelect() {
  const [open, setOpen] = React.useState(false);
  const [scratch, setScratch] = React.useState<number | string>("");
  const [dye, setDye] = React.useState<number | string>(2);
  const [smallScratch, setSmallScratch] = React.useState<number | string>("");

  const handleScratchChange = (event: SelectChangeEvent<typeof scratch>) => {
    setScratch(Number(event.target.value) || "");
  };

  const handleDyeChange = (event: SelectChangeEvent<typeof scratch>) => {
    setDye(Number(event.target.value) || "");
  };

  const handleSmallScratchChange = (
    event: SelectChangeEvent<typeof scratch>
  ) => {
    setSmallScratch(Number(event.target.value) || "");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent<unknown>,
    reason?: string
  ) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <div>
      <Button onClick={handleClickOpen} style={{ zIndex: "10" }}>
        <Typography variant="h5" component="span" display="block">
          {scratch || smallScratch ? +scratch + +smallScratch : "0"}
        </Typography>
      </Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Pericia</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              minWidth: "350px",
            }}
          >
            <TextField
              autoFocus
              size="small"
              margin="dense"
              id="name"
              label="25mm"
              type="number"
              variant="standard"
            />
            <TextField
              autoFocus
              size="small"
              margin="dense"
              id="name"
              label=">25mm"
              type="number"
              variant="standard"
            />
          </Box>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              minWidth: "350px",
              marginTop: "12px",
            }}
          >
            <FormControlLabel control={<Checkbox />} label="Pintura" />
            <FormControlLabel control={<Checkbox />} label="AL" />
            <FormControlLabel control={<Checkbox />} label="Trocar" />
            <FormControlLabel
              control={<Checkbox />}
              label="Cola"
              disabled={true}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
