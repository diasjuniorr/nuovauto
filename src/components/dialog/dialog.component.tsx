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
import { ChangeEvent, useState } from "react";

interface DialogProps {
  isAluminum: boolean;
  shouldPaint: boolean;
  shouldReplace: boolean;
  shouldGlue: boolean;
  smallSmash: number | string;
  smash: number | string;
}

const defaultDialogProps = {
  isAluminum: false,
  shouldPaint: false,
  shouldReplace: false,
  shouldGlue: false,
  smallSmash: "",
  smash: "",
};

export default function DialogSelect() {
  const [open, setOpen] = useState(false);
  const [dialogProps, setDialogProps] =
    useState<DialogProps>(defaultDialogProps);
  const {
    isAluminum,
    shouldPaint,
    shouldReplace,
    shouldGlue,
    smash,
    smallSmash,
  } = dialogProps;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("debug", name, value);
    setDialogProps({ ...dialogProps, [name]: value });
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

  const displayNotes = () => {
    let smashNotes = "";
    let smallSmashNotes = "";
    let paintNotes = "";
    let isAluminumNotes = "";
    let shouldReplaceNotes = "";
    let shouldGlueNotes = "";

    if (+smallSmash >= 610 || +smash >= 610 || +smallSmash + +smash >= 610) {
      smashNotes = "max";
    } else {
      smallSmashNotes = smallSmash ? String(smallSmash) : "";
      smashNotes = smash ? `>${String(smash)}` : "";
    }

    if (shouldPaint) {
      paintNotes = "p";
    }

    if (isAluminum) {
      isAluminumNotes = "al";
    }

    if (shouldReplace) {
      shouldReplaceNotes = "x";
    }

    if (shouldGlue) {
      shouldGlueNotes = "c";
    }

    if (
      !smashNotes &&
      !smallSmashNotes &&
      !paintNotes &&
      !isAluminumNotes &&
      !shouldReplaceNotes &&
      !shouldGlueNotes
    ) {
      return (
        <Typography variant="h5" component="span">
          0
        </Typography>
      );
    }

    return (
      <Typography variant="h5" component="span" fontSize={22}>
        {smallSmashNotes} {smashNotes}
        <br />
        {paintNotes} {isAluminumNotes} {shouldReplaceNotes} {shouldGlueNotes}
      </Typography>
    );
  };

  return (
    <div>
      <Button onClick={handleClickOpen} style={{ zIndex: "10" }}>
        {displayNotes()}
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
