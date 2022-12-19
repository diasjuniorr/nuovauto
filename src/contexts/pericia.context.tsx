import { createContext, useReducer } from "react";
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
  color: "",
  insurance_name: "",
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
  billed: boolean;
  costumerPrice: string;
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
  billed: false,
  costumerPrice: "0",
};

enum PericiaReducerActionTypes {
  UPDATE_PERICIA = "UPDATE_PERICIA",
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
  billed?: boolean;
  costumerPrice?: string;
}

const periciaReducer = (state: PericiaState, action: PericiaReducerAction) => {
  const { type, payload } = action;
  const { finished } = state;

  switch (type) {
    case PericiaReducerActionTypes.UPDATE_PERICIA:
      return {
        ...state,
        ...payload,
      };

    case PericiaReducerActionTypes.TOGGLE_FINISHED:
      return {
        ...state,
        finished: !finished,
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
  costumerPrice: string;
  billed: boolean;
  updatePericia: (pericia: PericiaToUpdate) => void;
  updateCostumer: (costumer: Costumer) => void;
  updateFinished: (finished: boolean) => void;
  updatePricePerHour: (pricePerHour: number) => void;
  updateCarPart: (carPart: CarPart) => void;
  updateCar: (car: Car) => void;
  findCarPart: (name: string) => CarPart;
  updateUnmount: (shouldUnmount: boolean, price: number) => void;
  updateInsuranceHours: (hours: number) => void;
  updateCostumerPrice: (price: string) => void;
  updateBilled: (billed: boolean) => void;
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
  costumerPrice: "0",
  billed: false,
  updatePericia: (pericia: PericiaToUpdate) => {},
  updateCostumer: (costumer: Costumer) => {},
  updateFinished: (finished: boolean) => {},
  updatePricePerHour: (pricePerHour: number) => {},
  updateCar: (car: Car) => {},
  updateCarPart: (carPart: CarPart) => {},
  updateUnmount: (shouldUnmount: boolean, price: number) => {},
  updateInsuranceHours: (hours: number) => {},
  updateCostumerPrice: (price: string) => {},
  resetPericia: () => {},
  updateBilled: (billed: boolean) => {},
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
  const [pericia, dispatch] = useReducer(periciaReducer, initialState);
  const {
    id,
    car,
    costumer,
    date,
    finished,
    insuranceHours,
    insurancePrice,
    shouldUnmount,
    totalHours,
    totalPrice,
    unmountPrice,
    unmountTotalPrice,
    carParts,
    pricePerHour,
    billed,
    costumerPrice,
  } = pericia;

  const updatePericiaReducer = (pericia: PericiaToUpdate) => {
    const totalPrice =
      (pericia.pricePerHour / 10) * getTotalHours(pericia.carParts);
    dispatch(
      createAction(PericiaReducerActionTypes.UPDATE_PERICIA, {
        ...pericia,
        totalPrice,
        insurancePrice: (pericia.pricePerHour / 10) * pericia.insuranceHours,
        totalHours: getTotalHours(pericia.carParts),
        unmountTotalPrice: pericia.unmountPrice + totalPrice,
      })
    );
  };

  const updateCarPartsReducer = (carParts: CarPart[]) => {
    const totalHours = getTotalHours(carParts);
    const totalPrice = getTotalPrice(carParts);
    dispatch(
      createAction(PericiaReducerActionTypes.UPDATE_PERICIA, {
        carParts,
        totalHours,
        totalPrice,
        unmountTotalPrice: unmountPrice + totalPrice,
      })
    );
  };

  const updateInsuranceHours = (hours: number) => {
    dispatch(
      createAction(PericiaReducerActionTypes.UPDATE_PERICIA, {
        insuranceHours: hours,
        insurancePrice: (pricePerHour / 10) * hours,
      })
    );
  };

  const updateCostumer = (costumer: Costumer) => {
    dispatch(
      createAction(PericiaReducerActionTypes.UPDATE_PERICIA, { costumer })
    );
  };

  const updateCar = (car: Car) => {
    dispatch(createAction(PericiaReducerActionTypes.UPDATE_PERICIA, { car }));
  };

  const updatePricePerHour = (pricePerHour: number) => {
    const newCarParts = updateCarPartsPrice(carParts, pricePerHour);
    const totalPrice = getTotalPrice(newCarParts);
    dispatch(
      createAction(PericiaReducerActionTypes.UPDATE_PERICIA, {
        pricePerHour,
        carParts: newCarParts,
        insurancePrice: (pricePerHour / 10) * insuranceHours,
        totalPrice,
        unmountTotalPrice: unmountPrice + totalPrice,
      })
    );
  };

  const updateFinished = () => {
    dispatch(createAction(PericiaReducerActionTypes.TOGGLE_FINISHED));
  };

  const updateUnmountReducer = (shouldUnmount: boolean, price: number) => {
    dispatch(
      createAction(PericiaReducerActionTypes.UPDATE_PERICIA, {
        shouldUnmount,
        unmountPrice: price,
        unmountTotalPrice: price + totalPrice,
      })
    );
  };

  const updateBilled = (billed: boolean) => {
    dispatch(
      createAction(PericiaReducerActionTypes.UPDATE_PERICIA, { billed })
    );
  };

  const updateCostumerPrice = (price: string) => {
    dispatch(
      createAction(PericiaReducerActionTypes.UPDATE_PERICIA, {
        costumerPrice: price,
      })
    );
  };

  const updateCarPart = (carPart: CarPart) => {
    const newCarParts = [...carParts];
    const index = carParts.findIndex((cp) => cp.name === carPart.name);
    newCarParts[index] = carPart;
    newCarParts[index].smallSmashWorkingHours = smallSmashWorkingHours(carPart);
    newCarParts[index].smashWorkingHours = smashWorkingHours(carPart);
    newCarParts[index].workingHours = workingHours(carPart);
    newCarParts[index].price = price(carPart, pricePerHour);
    newCarParts[index].note = generateNotes(carPart);
    updateCarPartsReducer(newCarParts);
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

  const updateUnmount = (shouldUnmount: boolean, price = 0) => {
    if (!shouldUnmount) {
      return updateUnmountReducer(shouldUnmount, 0);
    }
    return updateUnmountReducer(shouldUnmount, price);
  };

  const updatePericia = (pericia: PericiaToUpdate) => {
    const periciaToUpdate: PericiaToUpdate = {
      ...pericia,
      carParts: pericia.carParts.map((cp) => {
        cp.note = generateNotes(cp);
        cp.workingHours = workingHours(cp);
        return cp;
      }),
    };
    return updatePericiaReducer(periciaToUpdate);
  };

  const resetPericia = () => {
    const pericia: PericiaToUpdate = {
      id: "",
      costumer: costumerDefaultValue,
      car: carDefaultValue,
      carParts: CAR_PARTS_LIST,
      pricePerHour: 70,
      date: new Date(),
      finished: false,
      shouldUnmount: false,
      unmountPrice: 0,
      done: false,
      insuranceHours: 0,
      billed: false,
      costumerPrice: "0",
    };
    return updatePericiaReducer(pericia);
  };

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
        costumerPrice,
        billed,
        updateBilled,
        updatePericia,
        updateCostumer,
        updateFinished,
        updatePricePerHour,
        updateInsuranceHours,
        updateCar,
        updateCarPart,
        findCarPart,
        updateUnmount,
        updateCostumerPrice,
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
