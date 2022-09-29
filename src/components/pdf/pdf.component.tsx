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

const PDFGenerator: React.FC = () => {
  const periciaContext = useContext(PericiaContext) as PericiaContextProps;
  const { carParts, costumer, car, date, finished } = periciaContext;
  const { name: CostumerName } = costumer;
  const { brand, plate, model } = car;

  const canvas = document.getElementById("pdf-canvas") as HTMLCanvasElement;

  const draw = (context: any) => {
    const img = new Image();
    img.src = carroImg;
    img.onload = () => {
      //set background color
      context.fillStyle = "white";
      context.fillRect(0, 0, canvas.width, canvas.height);

      //draw image
      // context.drawImage(img, 0, 30, 1200, 800);
      context.drawImage(img, 20, 80, 1150, 1100);
      context.font = "26px Arial";
      context.fillStyle = "blue";

      //draw car part notes
      carParts.forEach((part) => {
        const { x, y } =
          CAR_PARTS_CANVAS_COORDINATES[
            part.name as keyof typeof CAR_PARTS_CANVAS_COORDINATES
          ];
        context.fillText(part.note.smashes, x, y);
      });

      //draw identification
      context.font = "26px Arial";
      context.fillStyle = "black";
      context.fillText(`Cliente: ${CostumerName}`, 10, 40);
      context.fillText(`Marca: ${brand}`, 600, 40);
      context.fillText(`Modello: ${model}`, 600, 70);
      context.fillText(`Targa: ${plate}`, 980, 40);
      context.fillText(`Data: ${date.toLocaleDateString("pt-br")}`, 980, 70);
      if (finished) {
        context.fillStyle = "red";
        context.fillText(`Liquidata`, 10, 70);
      }

      //draw border
      context.beginPath();
      context.lineWidth = 2;
      context.strokeStyle = "black";
      context.rect(0, 0, canvas.width, canvas.height);
      context.stroke();
    };
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.addImage(canvas, "JPEG", 204, 93, 290, 200, "", "NONE", 90);
    doc.save(
      `${removeWhiteSpaces(CostumerName)}-${plate}-${date.toLocaleDateString(
        "pt-br"
      )}.pdf`
    );
  };

  return (
    <>
      <Canvas draw={draw} height={1200} width={1200} />
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

const removeWhiteSpaces = (str: string) => {
  return str.replace(/\s/g, "_");
};

export default PDFGenerator;
