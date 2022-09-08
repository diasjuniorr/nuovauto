import { Route, Routes } from "react-router-dom";
import PericiaEditComponent from "./pericia-edit/pericia-edit.component";

const Pericia = () => {
  return (
    <Routes>
      <Route path=":periciaID" element={<PericiaEditComponent />} />
    </Routes>
  );
};

export default Pericia;
