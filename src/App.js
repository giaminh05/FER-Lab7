import { Route, Routes } from "react-router-dom";
import "./App.css";
// import { Tooltip, IconButton, Button } from "@mui/material";

import Footer from "./components/Footer";
import Main from "./components/Main";
import DetailFlims from "./components/DetailFlims";
import Contact from "./components/Contact";
import Navigation from "./components/Navigation";
import About from "./components/About";
import News from "./components/News";
import Add from "./components/Add";
import Login from "./components/Login";
import Protected from "./components/Protected";
import Dashboard from "./components/Dashboard";
import Edit from "./components/Edit";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/detailflims" element={<DetailFlims />} />
        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
        <Route
          path="/add"
          element={
            <Protected>
              <Add />
            </Protected>
          }
        />
        <Route
          path="/edit"
          element={
            <Protected>
              <Edit />
            </Protected>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/news" element={<News />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
