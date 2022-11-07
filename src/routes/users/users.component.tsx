import { Route, Routes } from "react-router-dom";
import SignUP from "../auth/sign-up/signUp.component";
import AddUser from "./add-users/add-users.component";

const Users = () => {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignUP />} />
      <Route path="/add" element={<AddUser />} />
    </Routes>
  );
};

export default Users;
