import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext } from "react";
import {
  PericiaContext,
  PericiaContextProps,
} from "../../contexts/pericia.context";

const PericiaTable = () => {
  const periciaContext = useContext(PericiaContext) as PericiaContextProps;
  const { carParts, totalHours, totalPrice } = periciaContext;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={10}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">25mm</TableCell>
            <TableCell align="right">AW</TableCell>
            <TableCell align="right">{">25mm"}</TableCell>
            <TableCell align="right">AW</TableCell>
            <TableCell align="right">Cola</TableCell>
            <TableCell align="right">Alum</TableCell>
            <TableCell align="right">Pintura</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">CHF/Ora</TableCell>
            <TableCell align="right">Sub Totale</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {carParts.map((carPart) => (
            <TableRow key={carPart.name}>
              <TableCell>{carPart.name}</TableCell>
              <TableCell align="right">{carPart.smallSmash}</TableCell>
              <TableCell align="right">
                {carPart.smallSmashWorkingHours}
              </TableCell>
              <TableCell align="right">{carPart.smash}</TableCell>
              <TableCell align="right">{carPart.smashWorkingHours}</TableCell>
              <TableCell align="right">{carPart.shouldGlue && "✓"}</TableCell>
              <TableCell align="right">{carPart.isAluminum && "✓"}</TableCell>
              <TableCell align="right">{carPart.shouldPaint && "✓"}</TableCell>
              <TableCell align="right">{carPart.workingHours}</TableCell>
              <TableCell align="right">{carPart.pricePerHour}</TableCell>
              <TableCell align="right">{`${carPart.price}`}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={6} />
            <TableCell>Subtotal</TableCell>
            <TableCell align="right" colSpan={2}>
              {totalHours && `${totalHours} h`}
            </TableCell>
            <TableCell align="right" colSpan={2}>
              {totalPrice && `${totalPrice.toFixed(2)} CHF`}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PericiaTable;
