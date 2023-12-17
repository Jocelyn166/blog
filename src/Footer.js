import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return <footer className="Footer">Copyright &copy; {`${year}`}</footer>;
};

export default Footer;
