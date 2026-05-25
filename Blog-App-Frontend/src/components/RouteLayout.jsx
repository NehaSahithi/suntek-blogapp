import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

export default function RouteLayout() {
  return (
    <div className="min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}