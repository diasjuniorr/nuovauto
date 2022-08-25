import { createContext, useState } from "react";
import { CarPart } from "../shared/interfaces/car-part.interface";
import { initialCarParts } from "../shared/constants/car-parts.constants";

interface Props {
  children: React.ReactNode;
}

interface PericiaContextProps {
  carParts: CarPart[];
  updateCarPart: (carPart: CarPart) => void;
}

export const PericiaContext = createContext<PericiaContextProps>({
  carParts: initialCarParts,
  updateCarPart: (carPart: CarPart) => {},
});

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [carParts, setCarParts] = useState(initialCarParts);

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
