import React from "react";
import "../styles/navbar.css";

const NavBar = ({setCurrentPage, currentPage}) => {
    // Define button styles - use your CSS classes from navbar.css
    const buttonClass = "nav-button"; // Add this class in your CSS
    const activeClass = "nav-button active"; 
    return (
        <nav>
            <ul className="nav-left">
                <button 
                    onClick={() => setCurrentPage('home')} 
                    className={currentPage === 'home' ? activeClass : buttonClass}
                >
                    Home
                </button>
            </ul>
            
            <ul className="nav-right">
               
                <button 
                    onClick={() => setCurrentPage('albums')} 
                    className={currentPage === 'albums' ? activeClass : buttonClass}
                >
                    Albums
                </button>
                <button 
                    onClick={() => setCurrentPage('artists')} 
                    className={currentPage === 'artists' ? activeClass : buttonClass}
                >
                    Artists
                </button>
                <button 
                    onClick={() => setCurrentPage('tiny_disk')} 
                    className={currentPage === 'tiny_disk' ? activeClass : buttonClass}
                >
                    Tiny Disk
                </button>

                <button 
                    onClick={() => setCurrentPage('login')} 
                    className={currentPage === 'login' ? activeClass : buttonClass}
                >
                    Login
                </button>
            </ul>
        </nav>
    );
}

export default NavBar;