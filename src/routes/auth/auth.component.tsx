import { Route, Routes } from "react-router-dom";
import SignIn from "./sign-in/sign-in.component";
import SignUP from "./sign-up/signUp.component";

const Auth = () => {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignUP />} />
      <Route path="/sign-in" element={<SignIn />} />
    </Routes>
  );
};

export default Auth;
