import React from "react";
import { Link } from "react-router-dom";

const NavBar=() =>{
    return (
        <nav>
            <li><link to="/">Home</link></li>
            <li><link to="/about">About</link></li>
            <li><link to="/albums">Albums</link></li>
            <li><link to="/artists">Artist</link></li>
        </nav>
    )
}

export default NavBar;