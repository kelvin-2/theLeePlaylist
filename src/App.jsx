import React, { useState } from "react";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import Albums from "./components/Albums"; // Fixed import

function App() {
    const [currentPage, setCurrentPage] = useState('home');

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <Home />;
            case 'about':
                return <About />;
            case 'albums':
                return <Albums />; // Fixed component name
            default:
                return <Home />;
        }
    };

    return (
        <div>
            <NavBar setCurrentPage={setCurrentPage} currentPage={currentPage} />
            {renderPage()}
        </div>
    );
}

export default App;
