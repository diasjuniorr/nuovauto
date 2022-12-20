import { Route, Routes } from "react-router-dom";
import ResetPassword from "./reset-password/resetPassword.component";
import SignIn from "./sign-in/sign-in.component";
import SignUP from "./sign-up/signUp.component";
import UpdatePassword from "./update-password/updatePassword.component";

const Auth = () => {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUP />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="update-password" element={<UpdatePassword />} />
    </Routes>
  );
};

export default Auth;
