import { Route, Routes } from "react-router-dom";
import PericiaEditComponent from "./pericia-edit/pericia-edit.component";
import PericiaList from "./pericia-list/pericia-list.component";

const Pericia = () => {
  return (
    <Routes>
      <Route path=":periciaID" element={<PericiaEditComponent />} />
      <Route path="/list" element={<PericiaList />} />
    </Routes>
  );
};

export default Pericia;
