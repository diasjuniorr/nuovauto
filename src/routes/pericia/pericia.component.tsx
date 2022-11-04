import { Route, Routes } from "react-router-dom";
import PericiaCreation from "./pericia-creation/pericia-creation.component";
import PericiaEditComponent from "./pericia-edit/pericia-edit.component";
import PericiaList from "./pericia-list/pericia-list.component";

const Pericia = () => {
  return (
    <Routes>
      <Route path="/add" element={<PericiaCreation />} />
      <Route path="/list" element={<PericiaList />} />
      <Route path=":periciaID" element={<PericiaEditComponent />} />
    </Routes>
  );
};

export default Pericia;
