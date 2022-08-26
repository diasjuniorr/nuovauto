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
      return newCarParts;
    });
  };

  return (
    <PericiaContext.Provider value={{ carParts, updateCarPart }}>
      {children}
    </PericiaContext.Provider>
  );
};
