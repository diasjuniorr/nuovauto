import { jsPDF } from "jspdf";
import { useContext } from "react";
import {
  PericiaContext,
  PericiaContextProps,
} from "../../contexts/pericia.context";
import Canvas from "./canvas.component";
import { CAR_PARTS_CANVAS_COORDINATES } from "../../shared/constants/car-parts.constants";
import { Button } from "@mui/material";
import { CarPart } from "../../shared/interfaces/car-part.interface";
import { Car, Costumer } from "../../shared/interfaces/pericia.interface";

const carroImg = require("../../assets/pericia.jpg");

const PDFGenerator: React.FC = () => {
  const periciaContext = useContext(PericiaContext) as PericiaContextProps;
  const { carParts, costumer, car, date, finished, unmount } = periciaContext;
  const { name: CostumerName } = costumer;
  const { plate } = car;

  const canvas = document.getElementById("pdf-canvas") as HTMLCanvasElement;

  const draw = (context: any) => {
    const img = new Image();
    img.src = carroImg;
    img.onload = () => {
      setBackgroundColor(context, canvas.width, canvas.height);

      const pdfInfo = makePDFInfoObject(
        costumer,
        car,
        finished,
        date,
        unmount.shouldUnmount
      );

      context.drawImage(img, 20, 80, 1150, 1100);
      drawIdentification(context, pdfInfo);
      drawCarParts(context, carParts);
      drawBorder(context, canvas.width, canvas.height);
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

function setBackgroundColor(context: any, width: number, height: number) {
  context.fillStyle = "white";
  context.fillRect(0, 0, width, height);
}

function drawCarParts(context: any, carParts: CarPart[]) {
  context.font = "26px Arial";
  context.fillStyle = "blue";

  carParts.forEach((part) => {
    const { x, y, relocate } =
      CAR_PARTS_CANVAS_COORDINATES[
        part.name as keyof typeof CAR_PARTS_CANVAS_COORDINATES
      ];

    if (part.note.smashes.length === 0 && part.note.details.length === 0) {
      drawZeroText(context, part, x, y);
      return;
    }

    if (relocate) {
      drawArrow(context, part, x, y);
      drawRelocatedText(context, part, x, y);
    } else {
      drawText(context, part, x, y);
    }
  });
}

function drawZeroText(context: any, part: CarPart, x: number, y: number) {
  context.fillText("0", x - 10, y);
}

function drawText(context: any, carPart: CarPart, x: number, y: number) {
  if (carPart.note.smashes.length > 0) {
    context.fillText(carPart.note.smashes, x, y);
    context.fillText(carPart.note.details.trim(), x + 5, y + 30);
  } else {
    context.fillText(carPart.note.details.trim(), x, y);
  }
}

function drawRelocatedText(
  context: any,
  carPart: CarPart,
  x: number,
  y: number
) {
  if (carPart.note.smashes.length > 0) {
    context.fillText(carPart.note.smashes, x - 15, y + 240);
    context.fillText(carPart.note.details.trim(), x - 10, y + 270);
  } else {
    context.fillText(carPart.note.details.trim(), x - 15, y + 240);
  }
}

function drawIdentification(context: any, pdfInfoObject: PDFInfoObject) {
  const { costumer, car, finished, date, unmount } = pdfInfoObject;
  const { brand, model, plate } = car;
  const { name } = costumer;

  context.font = "26px Arial";
  context.fillStyle = "black";
  context.fillText(`Cliente: ${name}`, 10, 40);
  context.fillText(`Marca: ${brand}`, 500, 40);
  context.fillText(`Modello: ${model}`, 500, 70);
  context.fillText(`Targa: ${plate}`, 980, 40);
  context.fillText(`Data: ${date.toLocaleDateString("pt-br")}`, 980, 70);
  if (finished) {
    context.fillStyle = "red";
    context.fillText(`Liquidata`, 10, 70);
  }

  if (unmount) {
    context.fillStyle = "red";
    context.fillText(`Smontaggio`, 10, 100);
  }
}

function drawBorder(context: any, width: number, height: number) {
  context.beginPath();
  context.lineWidth = 2;
  context.strokeStyle = "black";
  context.rect(0, 0, width, height);
  context.stroke();
}

const removeWhiteSpaces = (str: string) => {
  return str.replace(/\s/g, "_");
};

function drawArrow(context: any, part: CarPart, x: number, y: number) {
  const { note } = part;
  if (note.smashes.length > 0 || note.details.length > 0) {
    context.strokeStyle = "blue";
    context.beginPath();
    canvas_arrow(context, x, y, x, y + 200);
    context.stroke();
  }
}

function canvas_arrow(
  context: any,
  fromx: number,
  fromy: number,
  tox: number,
  toy: number
) {
  var headlen = 10; // length of head in pixels
  var dx = tox - fromx;
  var dy = toy - fromy;
  var angle = Math.atan2(dy, dx);
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy);
  context.lineTo(
    tox - headlen * Math.cos(angle - Math.PI / 6),
    toy - headlen * Math.sin(angle - Math.PI / 6)
  );
  context.moveTo(tox, toy);
  context.lineTo(
    tox - headlen * Math.cos(angle + Math.PI / 6),
    toy - headlen * Math.sin(angle + Math.PI / 6)
  );
}

interface PDFInfoObject {
  costumer: Costumer;
  car: Car;
  finished: boolean;
  date: Date;
  unmount: boolean;
}

function makePDFInfoObject(
  costumer: Costumer,
  car: Car,
  finished: boolean,
  date: Date,
  unmount: boolean
) {
  return { costumer, car, finished, date, unmount };
}

export default PDFGenerator;
