import React from "react";
import '../styles/navbar.css'

const NavBar = () => {
    return (
        <nav>
            <ul>
                <button>Home</button>
                <li>About</li>
                <li>Albums</li>
                <li>Artists</li>
            </ul>
        </nav>
    );
}

export default NavBar;
