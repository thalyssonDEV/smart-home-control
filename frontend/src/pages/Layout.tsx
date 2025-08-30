import { Outlet } from "react-router-dom";
import { Header } from "../components/header";
import { Navbar } from "../components/navbar";

const Layout = () => {
  return (
    <div className="bg-primary min-h-screen">
      <Header />
      <Outlet />
      <Navbar />
    </div>
  );
};

export { Layout };
