import React, { useRef } from "react";
import "../App.css";

import { Link } from "react-router-dom";

function NavBar() {
  const navRef = useRef();

  const handleHomeButtonClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <header className="pokemon-card-navbar">
      {/* <img src={logo} className="weblogo" alt="carlogo" /> */}
      <nav ref={navRef}>
        <button onClick={handleHomeButtonClick}>Home</button>
        <Link to="/guess-the-pokemon">
          <button>Play</button>
        </Link>
      </nav>
    </header>
  );
}

export default NavBar;
