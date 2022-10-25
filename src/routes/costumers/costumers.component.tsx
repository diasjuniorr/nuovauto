import { Route, Routes } from "react-router-dom";
import AddCostumer from "./add-costumer/add-costumer.component";
import EditCostumer from "./edit-costumer/edit-costumer.component";
import CostumersList from "./list-costumers/list-costumers.component";

const Costumers = () => {
  return (
    <Routes>
      <Route path="/add" element={<AddCostumer />} />
      <Route path="/list" element={<CostumersList />} />
      <Route path=":costumerID" element={<EditCostumer />} />
    </Routes>
  );
};

export default Costumers;
