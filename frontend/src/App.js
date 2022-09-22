import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Footer from "./components/Footer/Footer";

import Navbar from "./components/Header/Navbar";
import Home from "./pages/Home";
import Hotel from "./pages/Hotel";
import List from "./pages/List";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/hotel" element={<List />}></Route>
          <Route path="/hotel/show/:id" element={<Hotel />}></Route>

          {/* auth route4s */}
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
