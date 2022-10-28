import { Route, Routes } from "react-router-dom";
import SignUP from "./sign-up/signUp.component";

const Auth = () => {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignUP />} />
    </Routes>
  );
};

export default Auth;
