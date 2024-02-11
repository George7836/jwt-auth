import { Route, Routes } from "react-router-dom";
import RegistrationForm from "../components/RegistrationForm";
import LoginForm from "../components/LoginForm";
import MyProfile from "../components/MyProfile";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MyProfile />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/registration" element={<RegistrationForm />} />
    </Routes>
  );
}
