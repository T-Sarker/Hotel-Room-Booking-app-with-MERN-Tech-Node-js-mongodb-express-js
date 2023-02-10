import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import axios from 'axios'
import { FaBed, FaPlane, FaCarAlt, FaFreeCodeCamp, FaTaxi, FaUserPlus, FaUserTie } from "react-icons/fa";
import { FcMenu } from "react-icons/fc";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {

  const { user, dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const handelLogout = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.get('/auth/logout')
      if (res) {
        dispatch({ type: 'LOGOUT' })
        localStorage.setItem('user', null)
        navigate('/')
      }
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <>
      <div className="Header py-1">
        {/* top navbar  */}
        <div className="topHeader d-flex">

          <NavLink className="navbar-brand mx-2 text-white" to='/'>BOO&#10094;ING.ME</NavLink>

          <div className="userBar d-flex">

            {user === null ? (<><NavLink className="btn btn-outline-dark  mx-2 text-uppercase" to='/register'><FaUserPlus /> Register</NavLink>

              <NavLink className="btn btn-outline-dark mx-2 text-uppercase" to='/Login'><FaUserTie /> Login</NavLink></>)
              :
              (<><div className="dropdown mr-3">
                <button className="btn btn-outline-dark mx-2 text-uppercase text-white dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <FaUserTie /> {user != null ? user.username : ''}
                </button>
                <ul className="dropdown-menu bg-dark">
                  <li><a className="dropdown-item" href="#">Profile</a></li>
                  <li><a className="dropdown-item" onClick={handelLogout}>Logout</a></li>
                </ul>
              </div></>)}

          </div>
        </div>

        {/* main Navbar here */}

        <div className="mainNavbar">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">

              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <FcMenu />
              </button>
              <div className="collapse navbar-collapse " id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <NavLink className="nav-link mx-2 my-1" to="/"><FaBed /> Stays</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link mx-2 my-1" to="/"><FaPlane /> Flights</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link mx-2 my-1" to="/"><FaCarAlt /> Car Rental</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link mx-2 my-1" to="/"><FaFreeCodeCamp /> Attractions</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link mx-2 my-1" to="/"><FaTaxi /> Airport Taxi </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
