import { Route, Routes } from "react-router-dom";
import SignIn from "./sign-in/sign-in.component";

const Auth = () => {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
    </Routes>
  );
};

export default Auth;
