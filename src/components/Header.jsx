import React from "react";
import logohead from "../img/sushi_logo.png";
import sushileft from "../img/sushi_top_left.png";
import sushiright from "../img/sushi_top_right.png";

const Header = () => {
  return (
    <div className="bg-paleblue">
      <nav className="navbar">
        
          <img src={sushileft} alt="SushiLeft" className="sushi-top-left" />
          <img src={sushiright} alt="SushiLeft" className="sushi-top-right" />

          <img src={logohead} alt="Logo" className="logo" style={{ width: "290px" }} />
        
      </nav>
    </div>
  );
};

export default Header;
