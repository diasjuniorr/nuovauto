import { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export interface PericiasFilterContextProps {
  filter: FilterProps;
  setFilter: (filter: FilterProps) => void;
}

interface FilterProps {
  term: string;
  done: boolean;
  billed: boolean;
}

const initialValues: FilterProps = {
  term: "",
  done: false,
  billed: false,
};

export const PericiasFilterContext = createContext<PericiasFilterContextProps>({
  filter: { term: "", done: false, billed: false },
  setFilter: (filter: FilterProps) => {},
});

export const PericiasFilterProvider: React.FC<Props> = ({ children }) => {
  const [filter, setFilter] = useState(initialValues);

  return (
    <PericiasFilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </PericiasFilterContext.Provider>
  );
};
