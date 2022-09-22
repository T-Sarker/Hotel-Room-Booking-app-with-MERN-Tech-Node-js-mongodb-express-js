import React from 'react'
import './footer.css'
import { NavLink } from 'react-router-dom'
const Footer = () => {
    return (
        <>
            <footer className="footer-07">
                <p className="text-white">
                    Copyright ©<script>document.write(new Date().getFullYear());</script>2022 All rights reserved | By <NavLink to="/" target="_blank" className="text-white fw-bold">BOO&#10094;ING.ME</NavLink>
                </p>
            </footer>
        </>
    )
}

export default Footer