import { createContext, useEffect, useState } from "react";
import { CarPart } from "../shared/interfaces/car-part.interface";
import { CAR_PARTS_LIST } from "../shared/constants/car-parts.constants";
import { SMASH_WORKING_HOURS } from "../shared/constants/car-parts.constants";
import {
  Car,
  Costumer,
  PericiaToUpdate,
} from "../shared/interfaces/pericia.interface";

interface Props {
  children: React.ReactNode;
}

interface Unmount {
  shouldUnmount: boolean;
  price: number;
}

export interface PericiaContextProps {
  id: string;
  costumer: Costumer;
  car: Car;
  carParts: CarPart[];
  totalHours: number;
  totalPrice: number;
  pricePerHour: number;
  date: Date;
  finished: boolean;
  unmount: Unmount;
  updatePericia: (pericia: PericiaToUpdate) => void;
  updateCostumer: (costumer: Costumer) => void;
  updateFinished: (finished: boolean) => void;
  updatePricePerHour: (pricePerHour: number) => void;
  updateCarPart: (carPart: CarPart) => void;
  updateCar: (car: Car) => void;
  findCarPart: (name: string) => CarPart;
  updateUnmount: (shouldUnmount: boolean, price: number) => void;
  resetPericia: () => void;
}

const costumerDefaultValue: Costumer = {
  id: "",
  name: "",
};

const carDefaultValue: Car = {
  id: "",
  brand: "",
  model: "",
  plate: "",
};

const unmountDefaultValue: Unmount = {
  shouldUnmount: false,
  price: 0,
};

export const PericiaContext = createContext<PericiaContextProps>({
  id: "",
  costumer: costumerDefaultValue,
  car: carDefaultValue,
  carParts: CAR_PARTS_LIST,
  totalHours: 0,
  totalPrice: 0,
  pricePerHour: 70,
  date: new Date(),
  finished: false,
  unmount: unmountDefaultValue,
  updatePericia: (pericia: PericiaToUpdate) => {},
  updateCostumer: (costumer: Costumer) => {},
  updateFinished: (finished: boolean) => {},
  updatePricePerHour: (pricePerHour: number) => {},
  updateCar: (car: Car) => {},
  updateCarPart: (carPart: CarPart) => {},
  updateUnmount: (shouldUnmount: boolean, price: number) => {},
  resetPericia: () => {},
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
  const [id, setId] = useState("");
  const [carParts, setCarParts] = useState(CAR_PARTS_LIST);
  const [totalHours, setTotalHours] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [costumer, setCostumer] = useState({} as Costumer);
  const [car, setCar] = useState({} as Car);
  const [pricePerHour, setPricePerHour] = useState(70);
  const [date, setDate] = useState(new Date());
  const [finished, setFinished] = useState(false);
  const [unmount, setUnmount] = useState(unmountDefaultValue);

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
      setTotalPrice(getTotalPrice(newCarParts, unmount.price));

      return newCarParts;
    });
  };

  const findCarPart = (name: string) => {
    return carParts.find((cp) => cp.name === name) as CarPart;
  };

  const updateCar = (car: Car) => {
    setCar(car);
  };

  const updatePricePerHour = (pricePerHour: number) => {
    setPricePerHour(pricePerHour);
    updatePartsPrice(pricePerHour);
  };

  const updateFinished = (finished: boolean) => {
    setFinished(finished);
  };

  const updateCostumer = (costumer: Costumer) => {
    setCostumer(costumer);
  };

  const updatePartsPrice = (newPrice: number) => {
    setCarParts((prev) => {
      const newCarParts = prev.map((cp) => {
        cp.price = price(cp, newPrice);
        return cp;
      });

      return newCarParts;
    });
  };

  const updatePericia = (pericia: PericiaToUpdate) => {
    setId(pericia.id as string);
    setCostumer(pericia.costumer as Costumer);
    setCar(pericia.car as Car);
    setCarParts((prev) => {
      const newCarParts = pericia.carParts.map((cp) => {
        cp.note = generateNotes(cp);
        cp.workingHours = workingHours(cp);
        return cp;
      });

      setTotalHours(getTotalHours(newCarParts));
      return newCarParts;
    });
    setPricePerHour(pericia.pricePerHour);
    setDate(pericia.date);
    setFinished(pericia.finished);
  };

  const updateUnmount = (shouldUnmount: boolean, price: number) => {
    if (!shouldUnmount) {
      return setUnmount({ shouldUnmount, price: 0 });
    }

    setUnmount({ shouldUnmount, price });
  };

  const resetPericia = () => {
    setId("");
    setCostumer(costumerDefaultValue);
    setCar(carDefaultValue);
    setCarParts(CAR_PARTS_LIST);
    setPricePerHour(70);
    setDate(new Date());
    setFinished(false);
    setTotalHours(0);
    setTotalPrice(0);
  };

  useEffect(() => {
    setTotalPrice(getTotalPrice(carParts, unmount.price));
  }, [carParts]);

  useEffect(() => {
    setTotalPrice(getTotalPrice(carParts, unmount.price));
  }, [unmount]);

  return (
    <PericiaContext.Provider
      value={{
        id,
        costumer,
        car,
        carParts,
        totalHours,
        totalPrice,
        pricePerHour,
        date,
        finished,
        unmount,
        updatePericia,
        updateCostumer,
        updateFinished,
        updatePricePerHour,
        updateCar,
        updateCarPart,
        findCarPart,
        updateUnmount,
        resetPericia,
      }}
    >
      {children}
    </PericiaContext.Provider>
  );
};

const getTotalPrice = (carParts: CarPart[], unmountPrice: number) => {
  return carParts.reduce((acc, curr) => acc + curr.price, 0) + unmountPrice;
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
    smashNotes = smash ? `${String(smash)}>` : "";
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
