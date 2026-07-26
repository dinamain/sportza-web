import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Groups from "./pages/Groups";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/groups" element={<Groups />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;