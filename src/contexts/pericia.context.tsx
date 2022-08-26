import { createContext, useState } from "react";
import { CarPart } from "../shared/interfaces/car-part.interface";
import { CAR_PARTS_LIST } from "../shared/constants/car-parts.constants";

interface Props {
  children: React.ReactNode;
}

export interface PericiaContextProps {
  carParts: CarPart[];
  updateCarPart: (carPart: CarPart) => void;
}

export const PericiaContext = createContext<PericiaContextProps>({
  carParts: CAR_PARTS_LIST,
  updateCarPart: (carPart: CarPart) => {},
});

export const PericiaProvider: React.FC<Props> = ({ children }) => {
  const [carParts, setCarParts] = useState(CAR_PARTS_LIST);

  const updateCarPart = (carPart: CarPart) => {
    setCarParts((prev) => {
      const index = prev.findIndex((cp) => cp.name === carPart.name);
      const newCarParts = [...prev];
      newCarParts[index] = carPart;
      newCarParts[index].note = generateNotes(carPart);
      return newCarParts;
    });
  };

  return (
    <PericiaContext.Provider value={{ carParts, updateCarPart }}>
      {children}
    </PericiaContext.Provider>
  );
};

const generateNotes = (carPart: CarPart) => {
  const {
    isAluminum,
    shouldPaint,
    shouldReplace,
    shouldGlue,
    smallSmash,
    smash,
  } = carPart;

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
    return "0";
  }

  return `${smallSmashNotes} ${smashNotes} \n ${paintNotes} ${isAluminumNotes} ${shouldReplaceNotes} ${shouldGlueNotes}`;
};
