import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./routes/auth/auth.component";
import AddCostumer from "./routes/costumers/add-costumer.component";
import Navigation from "./routes/navigation/navigation.component";
import PericiaCreation from "./routes/pericia/pericia-creation/pericia-creation.component";
import Pericia from "./routes/pericia/pericia.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        {/* <Route index element={<Auth />} /> */}
        <Route index element={<PericiaCreation />} />
        <Route path="costumers/add" element={<AddCostumer />} />
        <Route path="pericia/*" element={<Pericia />} />
      </Route>
    </Routes>
  );
}

export default App;
