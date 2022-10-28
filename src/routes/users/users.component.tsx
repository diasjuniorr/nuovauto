import { Route, Routes } from "react-router-dom";
import AddUser from "./add-users/add-users.component";

const Users = () => {
  return (
    <Routes>
      <Route path="/add" element={<AddUser />} />
    </Routes>
  );
};

export default Users;
