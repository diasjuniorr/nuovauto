import { createContext, useEffect, useReducer, useState } from "react";
import { CAR_PARTS_LIST } from "../shared/constants/car-parts.constants";
import { SMASH_WORKING_HOURS } from "../shared/constants/car-parts.constants";
import {
  PericiaToUpdate,
  Car,
  Costumer,
  CarPart,
} from "../shared/interfaces/pericia.interface";
import { createAction } from "../utils/reducer/reducer.utils";

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

const carPartNoteDefaultValue = {
  smashes: "",
  details: "",
};

interface PericiaState {
  id: string;
  car: Car;
  costumer: Costumer;
  carParts: CarPart[];
  totalHours: number;
  totalPrice: number;
  insuranceHours: number;
  insurancePrice: number;
  pricePerHour: number;
  date: Date;
  finished: boolean;
  shouldUnmount: boolean;
  unmountPrice: number;
  unmountTotalPrice: number;
}

const initialState: PericiaState = {
  id: "",
  costumer: costumerDefaultValue,
  car: carDefaultValue,
  carParts: CAR_PARTS_LIST,
  totalHours: 0,
  totalPrice: 0,
  insuranceHours: 0,
  insurancePrice: 0,
  pricePerHour: 70,
  date: new Date(),
  finished: false,
  shouldUnmount: false,
  unmountPrice: 0,
  unmountTotalPrice: 0,
};

enum PericiaReducerActionTypes {
  UPDATE_CAR_PART = "UPDATE_CAR_PART",
  UPDATE_COSTUMER = "UPDATE_COSTUMER",
  UPDATE_CAR = "UPDATE_CAR",
  UPDATE_PERICIA = "UPDATE_PERICIA",
  UPDATE_UNMOUNT = "UPDATE_UNMOUNT",
  UPDATE_PRICE_PER_HOUR = "UPDATE_PRICE_PER_HOUR",
  TOGGLE_FINISHED = "TOGGLE_FINISHED",
}

interface PericiaReducerAction {
  type: PericiaReducerActionTypes;
  payload: PericiaReducerPayload | undefined;
}

interface PericiaReducerPayload {
  totalHours?: number;
  totalPrice?: number;
  insuranceHours?: number;
  insurancePrice?: number;
  carParts?: CarPart[];
  costumer?: Costumer;
  car?: Car;
  pricePerHour?: number;
  unmountPrice?: number;
  unmountTotalPrice?: number;
}

const periciaReducer = (state: PericiaState, action: PericiaReducerAction) => {
  const { type, payload } = action;
  const { finished } = state;

  switch (type) {
    case PericiaReducerActionTypes.UPDATE_UNMOUNT:
      return {
        ...state,
        ...payload,
      };

    case PericiaReducerActionTypes.TOGGLE_FINISHED:
      return {
        ...state,
        finished: !finished,
      };

    case PericiaReducerActionTypes.UPDATE_CAR_PART:
      return {
        ...state,
        ...payload,
      };

    default:
      throw new Error("Invalid action type: " + type);
  }
};

interface Props {
  children: React.ReactNode;
}

export interface PericiaContextProps {
  id: string;
  costumer: Costumer;
  car: Car;
  carParts: CarPart[];
  totalHours: number;
  totalPrice: number;
  insuranceHours: number;
  insurancePrice: number;
  pricePerHour: number;
  date: Date;
  finished: boolean;
  shouldUnmount: boolean;
  unmountPrice: number;
  unmountTotalPrice: number;
  updatePericia: (pericia: PericiaToUpdate) => void;
  updateCostumer: (costumer: Costumer) => void;
  updateFinished: (finished: boolean) => void;
  updatePricePerHour: (pricePerHour: number) => void;
  updateCarPart: (carPart: CarPart) => void;
  updateCar: (car: Car) => void;
  findCarPart: (name: string) => CarPart;
  updateUnmount: (shouldUnmount: boolean, price: number) => void;
  updateInsuranceHours: (hours: number) => void;
  resetPericia: () => void;
}

export const PericiaContext = createContext<PericiaContextProps>({
  id: "",
  costumer: costumerDefaultValue,
  car: carDefaultValue,
  carParts: CAR_PARTS_LIST,
  totalHours: 0,
  totalPrice: 0,
  insuranceHours: 0,
  insurancePrice: 0,
  pricePerHour: 70,
  date: new Date(),
  finished: false,
  shouldUnmount: false,
  unmountPrice: 0,
  unmountTotalPrice: 0,
  updatePericia: (pericia: PericiaToUpdate) => {},
  updateCostumer: (costumer: Costumer) => {},
  updateFinished: (finished: boolean) => {},
  updatePricePerHour: (pricePerHour: number) => {},
  updateCar: (car: Car) => {},
  updateCarPart: (carPart: CarPart) => {},
  updateUnmount: (shouldUnmount: boolean, price: number) => {},
  updateInsuranceHours: (hours: number) => {},
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
      note: carPartNoteDefaultValue,
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
  const [costumer, setCostumer] = useState(costumerDefaultValue);
  const [car, setCar] = useState(carDefaultValue);
  const [pricePerHour, setPricePerHour] = useState(70);
  const [date, setDate] = useState(new Date());
  const [finished, setFinished] = useState(false);
  const [shouldUnmount, setShouldUnmount] = useState(false);
  const [unmountPrice, setUnmountPrice] = useState(0);
  const [insuranceHours, setInsuranceHours] = useState(0);
  const [insurancePrice, setInsurancePrice] = useState(0);
  const [unmountTotalPrice, setUnmountTotalPrice] = useState(0);

  const [pericia, dispatch] = useReducer(periciaReducer, initialState);

  const updateCarPartsReducer = (carParts: CarPart[]) => {
    dispatch(
      createAction(PericiaReducerActionTypes.UPDATE_CAR_PART, {
        carParts,
        totalHours: getTotalHours(carParts),
        totalPrice: getTotalPrice(carParts),
      })
    );
  };

  const updateCostumer = (costumer: Costumer) => {
    dispatch(
      createAction(PericiaReducerActionTypes.UPDATE_COSTUMER, { costumer })
    );
  };

  const updateCar = (car: Car) => {
    dispatch(createAction(PericiaReducerActionTypes.UPDATE_CAR, { car }));
  };

  const updatePricePerHour = (pricePerHour: number) => {
    dispatch(
      createAction(PericiaReducerActionTypes.UPDATE_PRICE_PER_HOUR, {
        pricePerHour,
        carParts: updateCarPartsPrice(carParts, pricePerHour),
        insurancePrice: (pricePerHour / 10) * pericia.insuranceHours,
      })
    );
  };

  const updateFinished = () => {
    dispatch(createAction(PericiaReducerActionTypes.TOGGLE_FINISHED));
  };

  const updateUnmountReducer = (shouldUnmount: boolean, price: number) => {
    dispatch(
      createAction(PericiaReducerActionTypes.UPDATE_UNMOUNT, {
        shouldUnmount,
        unmountPrice: price,
        unmountTotalPrice: price * pericia.totalHours,
      })
    );
  };

  const updateCarPart = (carPart: CarPart) => {
    const carParts = [...pericia.carParts];
    const index = carParts.findIndex((cp) => cp.name === carPart.name);
    carParts[index] = carPart;
    carParts[index].smallSmashWorkingHours = smallSmashWorkingHours(carPart);
    carParts[index].smashWorkingHours = smashWorkingHours(carPart);
    carParts[index].workingHours = workingHours(carPart);
    carParts[index].price = price(carPart, pricePerHour);
    carParts[index].note = generateNotes(carPart);
    updateCarPartsReducer(carParts);
  };

  const findCarPart = (name: string) => {
    return carParts.find((cp) => cp.name === name) as CarPart;
  };

  const updateCarPartsPrice = (carParts: CarPart[], newPrice: number) => {
    return carParts.map((cp) => {
      cp.price = price(cp, newPrice);
      return cp;
    });
  };

  const updatePericia = (pericia: PericiaToUpdate) => {
    const { shouldUnmount, unmountPrice, insuranceHours } = pericia;

    setId(pericia.id);
    setCostumer(pericia.costumer);
    setCar(pericia.car);
    updateUnmount(shouldUnmount, unmountPrice);
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
    setInsuranceHours(insuranceHours);
  };

  const updateUnmount = (shouldUnmount: boolean, price = 0) => {
    if (!shouldUnmount) {
      return updateUnmountReducer(shouldUnmount, 0);
    }
    return updateUnmountReducer(shouldUnmount, price);
  };

  const updateInsuranceHours = (hours: number) => {
    setInsuranceHours(hours);
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
    updateUnmount(false);
    setInsuranceHours(0);
  };

  useEffect(() => {
    setTotalPrice(getTotalPrice(carParts));
  }, [carParts]);

  useEffect(() => {
    setUnmountTotalPrice(unmountPrice + totalPrice);
  }, [unmountPrice, totalPrice]);

  useEffect(() => {
    setInsurancePrice((pricePerHour / 10) * insuranceHours);
  }, [insuranceHours, pricePerHour]);

  return (
    <PericiaContext.Provider
      value={{
        id,
        costumer,
        car,
        carParts,
        totalHours,
        totalPrice,
        insuranceHours,
        insurancePrice,
        pricePerHour,
        date,
        finished,
        shouldUnmount,
        unmountPrice,
        unmountTotalPrice,
        updatePericia,
        updateCostumer,
        updateFinished,
        updatePricePerHour,
        updateCar,
        updateCarPart,
        updateInsuranceHours,
        findCarPart,
        updateUnmount,
        resetPericia,
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

  if (+smallSmash >= 610) {
    smashNotes = "MASSIMO";
  } else {
    smallSmashNotes = smallSmash ? String(smallSmash) : "";
    smashNotes = smash ? `${String(smash)}>` : "";
  }

  if (shouldPaint) {
    paintNotes = "V";
  }

  if (isAluminum) {
    isAluminumNotes = "AL";
  }

  if (shouldReplace) {
    shouldReplaceNotes = "SOST";
  }

  if (shouldGlue) {
    shouldGlueNotes = "C";
  }

  return {
    smashes: smashesNotes(smallSmashNotes, smashNotes),
    details: detailsNotes(
      paintNotes,
      isAluminumNotes,
      shouldReplaceNotes,
      shouldGlueNotes
    ),
  };
};

function smashesNotes(first: string, second: string) {
  if (!first && !second) {
    return "";
  }

  if (first && second) {
    return `${first} ${second}`;
  }

  return first || second;
}

function detailsNotes(
  first: string,
  second: string,
  third: string,
  fourth: string
) {
  if (!first && !second && !third && !fourth) {
    return "";
  }

  return `${first} ${second} ${third} ${fourth}`;
}
