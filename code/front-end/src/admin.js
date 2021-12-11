import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// components
import Navbar from "./components/navbar/navbar.js";

// layouts
import Home from "./layouts/home/home.js";
import Search from "./layouts/search/search.js";
import Detail from "./layouts/detail/detail.js";
import User from "./layouts/user/user.js";

const Admin = () => {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>     
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Admin;
