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
import { SelectChangeEvent } from "@mui/material/Select";
import { Typography } from "@mui/material";
import { useRef, useState } from "react";

export default function DialogSelect() {
  const [open, setOpen] = useState(false);
  const [paint, setPaint] = useState(false);
  const [isAluminum, setIsAluminum] = useState(false);
  const [shouldReplace, setShouldReplace] = useState(false);
  const [shouldGlue, setShouldGlue] = useState(false);
  const [smallSmash, setSmallSmash] = useState<number | string>("");
  const [smash, setSmash] = useState<number | string>("");
  const smallSmashRef = useRef<HTMLInputElement>(null);
  const smashRef = useRef<HTMLInputElement>(null);

  const handlePaintChange = (event: SelectChangeEvent) => {
    setPaint(!paint);
  };

  const handleIsAluminumChange = (event: SelectChangeEvent) => {
    setIsAluminum(!isAluminum);
  };

  const handleShouldReplaceChange = (event: SelectChangeEvent) => {
    setShouldReplace(!shouldReplace);
  };

  const handleShouldGlueChange = (event: SelectChangeEvent) => {
    setShouldGlue(!shouldGlue);
  };

  const handleSmallSmashChange = () => {
    setSmallSmash(smallSmashRef.current?.value as unknown as number);
  };

  const handleSmashChange = () => {
    setSmash(smashRef.current?.value as unknown as number);
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

    if (paint) {
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
              onChange={handleSmallSmashChange}
              inputRef={smallSmashRef}
            />
            <TextField
              size="small"
              margin="dense"
              id="name"
              label=">25mm"
              type="number"
              variant="standard"
              value={smash}
              onChange={handleSmashChange}
              inputRef={smashRef}
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
                <Checkbox checked={paint} onChange={handlePaintChange} />
              }
              label="Pintura"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAluminum}
                  onChange={handleIsAluminumChange}
                />
              }
              label="AL"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={shouldReplace}
                  onChange={handleShouldReplaceChange}
                />
              }
              label="Trocar"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={shouldGlue}
                  onChange={handleShouldGlueChange}
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
