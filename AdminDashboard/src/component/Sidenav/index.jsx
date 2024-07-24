import React, { Component } from "react";
import {
  AiFillHome,
  AiOutlineUsergroupAdd,
  AiOutlineLogout,
} from "react-icons/ai";
import {
  FaBookJournalWhills,
  FaCircleChevronLeft,
  FaMoneyBillTransfer,
  FaMoneyBill,
} from "react-icons/fa6";
import { NavLink } from "react-router-dom";

import "./sideNav.css";
class SideNav extends Component {

  activeLink() {
    const list = document.querySelectorAll(".navigation li");

    list.forEach((item) => {
      item.classList.remove("hovered");
    });
    
    this.classList.add("hovered");
  }

  render() {
    return (
      <>
        <div className="navigation">
          <ul>
            <li>
              <NavLink to="/dash">
                <span className="icon">
                  <FaMoneyBillTransfer className="ionIcon" />
                </span>
                <span className="title">Gestion de paie</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard">
                <span className="icon">
                  <AiFillHome className="ionIcon" />
                </span>
                <span className="title">Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/employe">
                <span className="icon">
                  <AiOutlineUsergroupAdd className="ionIcon" />
                </span>
                <span className="title">Salarié</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/paiment/:id">
                <span className="icon">
                  <FaMoneyBill className="ionIcon" />
                </span>
                <span className="title">Paie</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/journalpaiment">
                <span className="icon">
                  <FaBookJournalWhills className="ionIcon" />
                </span>
                <span className="title">Journal de paie</span>
              </NavLink>
            </li>

            {/* <li>
              <NavLink to="/deconecte">
                <span className="icon">
                  <AiOutlineLogout className="ionIcon" />
                </span>
                <span className="title">Sign Out</span>
              </NavLink>
            </li> */}

            <span className="reduire" onClick={this.props.logOut}>
              <span className="icon">
                <AiOutlineLogout className="ionIcon" />
              </span>
              <span className="title">Se deconnecter</span>
            </span>
            <span className="reduire" onClick={this.props.toggleMenu}>
              <span className="icon">
                <FaCircleChevronLeft className="ionIcon" />
              </span>
              <span className="title">Réduire</span>
            </span>
          </ul>
        </div>
      </>
    );
  }
}

export default SideNav;
