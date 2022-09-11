import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import { ChangeEvent, useContext, useState } from "react";
import {
  PericiaContext,
  PericiaContextProps,
} from "../../../contexts/pericia.context";

interface DialogComponentProps {
  partName: string;
  top: number;
  left: number;
}

const DialogSelect: React.FC<DialogComponentProps> = ({
  top,
  left,
  partName,
}) => {
  const [open, setOpen] = useState(false);
  const periciaContext = useContext(PericiaContext) as PericiaContextProps;
  const { updateCarPart, findCarPart, carParts } = periciaContext;

  //TODO - Refactor this because its being called twice
  let carPart = findCarPart(partName);

  let {
    isAluminum,
    shouldPaint,
    shouldReplace,
    shouldGlue,
    smallSmash,
    smash,
  } = carPart;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { name, value, checked } = e.target;

    if (e.target.type === "checkbox") {
      return updateCarPart({ ...carPart, [name]: checked });
    }

    updateCarPart({ ...carPart, [name]: value });
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

  const getFormattedNotes = () => {
    if (carPart.note.length === 0) {
      return (
        <Typography variant="h5" component="span" fontSize={22}>
          0
        </Typography>
      );
    }
    return (
      <Typography variant="h5" component="span" fontSize={22}>
        {carPart.note.split("\n").slice(0, 1)}
        {<br />}
        {carPart.note.split("\n").slice(1, 2)}
      </Typography>
    );
  };

  return (
    <div style={{ position: "absolute", top: `${top}px`, left: `${left}px` }}>
      <Button onClick={handleClickOpen} style={{ zIndex: "10" }}>
        {getFormattedNotes()}
      </Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>{partName}</DialogTitle>
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
              size="small"
              margin="dense"
              id="name"
              label="25mm"
              type="number"
              variant="standard"
              value={smallSmash}
              onChange={handleChange}
              name="smallSmash"
            />
            <TextField
              size="small"
              margin="dense"
              id="name"
              label=">25mm"
              type="number"
              variant="standard"
              value={smash}
              onChange={handleChange}
              name="smash"
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={shouldPaint}
                  onChange={handleChange}
                  name="shouldPaint"
                />
              }
              label="Pintura"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAluminum}
                  onChange={handleChange}
                  name="isAluminum"
                />
              }
              label="AL"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={shouldReplace}
                  onChange={handleChange}
                  name="shouldReplace"
                />
              }
              label="Trocar"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={shouldGlue}
                  onChange={handleChange}
                  name="shouldGlue"
                />
              }
              label="Cola"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogSelect;
