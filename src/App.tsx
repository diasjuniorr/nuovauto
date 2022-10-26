import { Route, Routes } from "react-router-dom";
import "./App.css";
import Costumers from "./routes/costumers/costumers.component";
import Navigation from "./routes/navigation/navigation.component";
import PericiaCreation from "./routes/pericia/pericia-creation/pericia-creation.component";
import Pericia from "./routes/pericia/pericia.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<PericiaCreation />} />
        <Route path="costumers/*" element={<Costumers />} />
        <Route path="pericias/*" element={<Pericia />} />
        <Route path="users/*" element={<Pericia />} />
      </Route>
    </Routes>
  );
}

export default App;
