import { createContext, useState } from "react";
import { CarPart } from "../shared/interfaces/car-part.interface";
import { CAR_PARTS_LIST } from "../shared/constants/car-parts.constants";
import { SMASH_WORKING_HOURS } from "../shared/constants/car-parts.constants";

interface Props {
  children: React.ReactNode;
}

export interface PericiaContextProps {
  cardID: string;
  carParts: CarPart[];
  totalHours: number;
  totalPrice: number;
  pricePerHour: number;
  date: Date;
  finished: boolean;
  updateFinished: (finished: boolean) => void;
  updatePricePerHour: (pricePerHour: number) => void;
  updateCarPart: (carPart: CarPart) => void;
  updateCardID: (cardID: string) => void;
  findCarPart: (name: string) => CarPart;
}

export const PericiaContext = createContext<PericiaContextProps>({
  cardID: "",
  carParts: CAR_PARTS_LIST,
  totalHours: 0,
  totalPrice: 0,
  pricePerHour: 70,
  date: new Date(),
  finished: false,
  updateFinished: (finished: boolean) => {},
  updatePricePerHour: (pricePerHour: number) => {},
  updateCardID: (cardID: string) => {},
  updateCarPart: (carPart: CarPart) => {},
  findCarPart: (name: string) => {
    return {
      name: "",
      smallSmash: 0,
      smallSmashWorkingHours: 0,
      smash: 0,
      smashWorkingHours: 0,
      isAluminum: false,
      shouldPaint: false,
      shouldReplace: false,
      shouldGlue: false,
      note: "",
      workingHours: 0,
      price: 0,
    };
  },
});

export const PericiaProvider: React.FC<Props> = ({ children }) => {
  const [carParts, setCarParts] = useState(CAR_PARTS_LIST);
  const [totalHours, setTotalHours] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cardID, setCardID] = useState("");
  const [pricePerHour, setPricePerHour] = useState(70);
  const [date, setDate] = useState(new Date());
  const [finished, setFinished] = useState(false);

  const updateCarPart = (carPart: CarPart) => {
    setCarParts((prev) => {
      const index = prev.findIndex((cp) => cp.name === carPart.name);
      const newCarParts = [...prev];
      newCarParts[index] = carPart;
      newCarParts[index].smallSmashWorkingHours =
        smallSmashWorkingHours(carPart);
      newCarParts[index].smashWorkingHours = smashWorkingHours(carPart);
      newCarParts[index].workingHours = workingHours(carPart);
      newCarParts[index].price = price(carPart, pricePerHour);
      newCarParts[index].note = generateNotes(carPart);

      setTotalHours(getTotalHours(newCarParts));
      setTotalPrice(getTotalPrice(newCarParts));

      return newCarParts;
    });
  };

  const findCarPart = (name: string) => {
    return carParts.find((cp) => cp.name === name) as CarPart;
  };

  const updateCardID = (cardID: string) => {
    setCardID(cardID);
  };

  const updatePricePerHour = (pricePerHour: number) => {
    setPricePerHour(pricePerHour);
  };

  const updateFinished = (finished: boolean) => {
    setFinished(finished);
  };

  return (
    <PericiaContext.Provider
      value={{
        cardID,
        carParts,
        totalHours,
        totalPrice,
        pricePerHour,
        date,
        finished,
        updateFinished,
        updatePricePerHour,
        updateCardID,
        updateCarPart,
        findCarPart,
      }}
    >
      {children}
    </PericiaContext.Provider>
  );
};

const getTotalPrice = (carParts: CarPart[]) => {
  return carParts.reduce((acc, curr) => acc + curr.price, 0);
};

const getTotalHours = (carParts: CarPart[]) => {
  return carParts.reduce((acc, curr) => acc + curr.workingHours, 0);
};

const smallSmashWorkingHours = (carPart: CarPart) => {
  if (+carPart.smallSmash >= 610) {
    return SMASH_WORKING_HOURS[610].smallSmash;
  }

  return SMASH_WORKING_HOURS[
    +carPart.smallSmash as keyof typeof SMASH_WORKING_HOURS
  ].smallSmash;
};

const smashWorkingHours = (carPart: CarPart) => {
  if (+carPart.smash >= 610) {
    return SMASH_WORKING_HOURS[610].smash;
  }

  return SMASH_WORKING_HOURS[+carPart.smash as keyof typeof SMASH_WORKING_HOURS]
    .smash;
};

const workingHours = (carPart: CarPart) => {
  let totalHours = carPart.smallSmashWorkingHours + carPart.smashWorkingHours;

  if (carPart.shouldPaint) {
    totalHours = totalHours * 0.75;
  }

  if (carPart.isAluminum) {
    totalHours = totalHours * 1.25;
  }

  if (carPart.shouldGlue) {
    totalHours = totalHours * 1.25;
  }

  return totalHours;
};

const price = (carPart: CarPart, pricePerHour: number) => {
  return (pricePerHour * carPart.workingHours) / 10;
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
    return "";
  }

  return `${smallSmashNotes} ${smashNotes} \n ${paintNotes} ${isAluminumNotes} ${shouldReplaceNotes} ${shouldGlueNotes}`;
};
