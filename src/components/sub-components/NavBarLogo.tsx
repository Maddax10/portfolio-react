import { useEffect } from 'react';

export const NavBarLogo = () => {
  useEffect(() => {
    // console.log("   NavBarLogo subComponent")
  }, []);

  return (
    <>
      <input type="checkbox" id="trigger" className="nav__trigger" />
      <label htmlFor="trigger" className="nav__logo">
        <span className="nav__icon"></span>
        <span className="nav__icon"></span>
        <span className="nav__icon"></span>
      </label>
    </>
  );
};
