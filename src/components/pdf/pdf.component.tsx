import { jsPDF } from "jspdf";
import { useContext } from "react";
import {
  PericiaContext,
  PericiaContextProps,
} from "../../contexts/pericia.context";
import Canvas from "./canvas.component";
import { CAR_PARTS_CANVAS_COORDINATES } from "../../shared/constants/car-parts.constants";
import { Button } from "@mui/material";

const carroImg = require("../../assets/pericia.jpg");

const PDFGenerator = () => {
  const periciaContext = useContext(PericiaContext) as PericiaContextProps;
  const { carParts } = periciaContext;

  const canvas = document.getElementById("pdf-canvas") as HTMLCanvasElement;

  const draw = (context: any) => {
    const img = new Image();
    img.src = carroImg;
    img.onload = () => {
      context.drawImage(img, 0, 0, 1200, 800);
      context.font = "18px Arial";
      context.fillStyle = "blue";

      carParts.forEach((part) => {
        const { x, y } =
          CAR_PARTS_CANVAS_COORDINATES[
            part.name as keyof typeof CAR_PARTS_CANVAS_COORDINATES
          ];
        context.fillText(part.note, x, y);
      });
    };
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.addImage(canvas, "JPEG", 160, 120, 200, 120, "", "NONE", 90);
    doc.save("pericia.pdf");
  };

  return (
    <>
      <Canvas draw={draw} height={800} width={1200} />
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 5, mb: 1 }}
        onClick={handleGeneratePDF}
      >
        Gerar PDF
      </Button>
    </>
  );
};

export default PDFGenerator;
