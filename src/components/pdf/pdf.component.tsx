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
  const { carParts, costumer, car, date } = periciaContext;
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
      context.drawImage(img, 0, 30, 1200, 800);
      context.font = "18px Arial";
      context.fillStyle = "blue";

      //draw car part notes
      carParts.forEach((part) => {
        const { x, y } =
          CAR_PARTS_CANVAS_COORDINATES[
            part.name as keyof typeof CAR_PARTS_CANVAS_COORDINATES
          ];
        context.fillText(part.note, x, y + 30);
      });

      //draw identification
      context.font = "24px Arial";
      context.fillStyle = "black";
      context.fillText(`Cliente: ${CostumerName}`, 0, 30);
      context.fillText(`Marca: ${brand}`, 380, 30);
      context.fillText(`Modelo: ${model}`, 530, 30);
      context.fillText(`Placa: ${plate}`, 730, 30);
      context.fillText(`Data: ${date.toLocaleDateString("pt-br")}`, 980, 30);
    };
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.addImage(canvas, "JPEG", 180, 150, 280, 140, "", "NONE", 90);
    doc.save(
      `${removeWhiteSpaces(CostumerName)}-${plate}-${date.toLocaleDateString(
        "pt-br"
      )}.pdf`
    );
  };

  return (
    <>
      <Canvas draw={draw} height={830} width={1200} />
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
