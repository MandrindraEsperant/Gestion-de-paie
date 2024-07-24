import React, { useEffect, useState } from "react";
import SideNav from "../Sidenav";
import Details from "../Details/Details";
import { Routes, Route, useNavigate } from "react-router-dom";
import Employe from "../Employe/Employe";
import Paiement from "../Paiement/Paiement";
import JournalPaie from "../JournalPaie/JournalPaie";
import Landingpage from "../LandignPage/index";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Account from "../Account/Account";

const App = () => {
  const navige = useNavigate();
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const logged = localStorage.getItem("logged");
    if (logged) setValid(true);
  }, []);

  const onValid = () => {
    const logged = localStorage.getItem("logged");
    if (logged) setValid(true);
    window.location.reload();
  };
  const onInValid = () => {
    localStorage.removeItem("logged");
    setValid(false);
    navige("/");
  };

  const MenuToogle = () => {
    let navigation = document.querySelector(".navigation");
    let main = document.querySelector(".main");
    navigation.classList.toggle("activemove");
    main.classList.toggle("activemove");
  };

  if (!valid) {
    return (
      <div className="main">
        <Routes>
          <Route exact path="/" element={<Landingpage name={onValid} />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <div className="container">
        <ToastContainer />
        <SideNav logOut={onInValid} toggleMenu={MenuToogle} />
        <div className="main">
          <Routes>
            <Route exact path="/" element={<Details />} />
            <Route exact path="/account" element={<Account />} />
            <Route exact path="/dashboard" element={<Details />} />
            <Route exact path="/employe" element={<Employe />} />
            <Route exact path="/paiment/:id" element={<Paiement />} />
            <Route exact path="/journalpaiment" element={<JournalPaie />} />
          </Routes>
        </div>
      </div>
    );
  }
};

export default App;
