import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="app-footer mt-auto py-4">
      <p className="mb-0">Made for your thoughts <span aria-hidden="true">·</span> {year}</p>
    </footer>
  );
}

export default Footer;
