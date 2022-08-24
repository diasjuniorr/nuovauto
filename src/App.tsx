import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./routes/auth/auth.component";
import Navigation from "./routes/navigation/navigation.component";
import Pericia from "./routes/pericia/pericia.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        {/* <Route index element={<Auth />} /> */}
        <Route index element={<Pericia />} />
      </Route>
    </Routes>
  );
}

export default App;
