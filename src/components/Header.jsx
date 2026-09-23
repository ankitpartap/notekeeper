import React from "react";

function Header() {
  return (
    <header className="app-header">
      <div className="container d-flex align-items-center justify-content-between py-3">
        <a className="brand d-flex align-items-center gap-2 text-decoration-none" href="/">
          <span className="brand-mark">
            <i className="bi bi-journal-text" aria-hidden="true" />
          </span>
          <span>Keeper</span>
        </a>
        <span className="header-tagline d-none d-sm-inline">Simple notes, beautifully kept</span>
      </div>
    </header>
  );
}

export default Header;
