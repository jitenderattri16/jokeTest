import React from "react";

const Header = ({ headerColor }) => {
  return (
    <header style={{ backgroundColor: headerColor }}>
      <p>Welcome</p>
    </header>
  );
};

export default Header;
