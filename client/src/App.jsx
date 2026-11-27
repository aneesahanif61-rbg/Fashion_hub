
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/review/Navbar";
import Home from "./pages/Home";
import Product from "./pages/Product";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        
        <Route path="/products" element={<Product />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
