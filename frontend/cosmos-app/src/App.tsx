// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigations from "./utils/Navigations";
import OrderManagement from "./components/OrderManagement";
import NavBarComponent from "./components/Navbar";

function App() {

  return (
    <>
      <BrowserRouter>
      <NavBarComponent/>
      <div>
        <nav>
          <Navigations url="/order-management" nav="Order Management"/>
        </nav>
      </div>
      <Routes>
        <Route path="/order-management" element={<OrderManagement />} />
      </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
