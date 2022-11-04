import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./routes/auth/auth.component";
import SignIn from "./routes/auth/sign-in/sign-in.component";
import Costumers from "./routes/costumers/costumers.component";
import Navigation from "./routes/navigation/navigation.component";
import Pericia from "./routes/pericia/pericia.component";
import ProtectedRoute from "./routes/protected/protected-route.component";
import Users from "./routes/users/users.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<SignIn />} />
        <Route path="auth/*" element={<Auth />} />
        <Route element={<ProtectedRoute />}>
          <Route path="costumers/*" element={<Costumers />} />
          <Route path="pericias/*" element={<Pericia />} />
          <Route path="users/*" element={<Users />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
