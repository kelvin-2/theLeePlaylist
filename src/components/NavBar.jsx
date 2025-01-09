import React from "react";
import '../styles/navbar.css'

const NavBar = () => {
    return (
        <nav>
            <ul className="nav-left">
                <button>Home</button>
            </ul>
            <ul className="nav-right">
                <button>About</button>
                <button>Albums</button>
                <button>Artists</button>
            </ul>
        </nav>
    );
}

export default NavBar;
