import { Route, Routes } from "react-router-dom";
import AddCostumer from "./add-costumer/add-costumer.component";
import CostumersList from "./list-costumers/list-costumers.component";

const Costumers = () => {
  return (
    <Routes>
      <Route path="/add" element={<AddCostumer />} />
      <Route path="/list" element={<CostumersList />} />
    </Routes>
  );
};

export default Costumers;
