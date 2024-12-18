import Logo from '../../assets/logo.png';
import { LoggingButtons } from '../../auth/LoggingButtons.jsx';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';


export default function Header() {
  const { pathname } = useLocation(); 
  const { isAuthenticated } = useAuth0();
  

  return (
    <header className="primary-c w-full px-14 py-8 flex flex-col items-center text-center">
      <div className="flex items-center justify-between w-full mb-6">
        <NavLink to="https://www.humanrightsfirst.org/">
          <img className="w-[100px]" src={Logo} alt="HRF logo white" />
        </NavLink>
        <div className="flex items-center gap-8">
          <NavLink to="/" className="nav-btn">
            Home
          </NavLink>
          <NavLink to="/graphs" className="nav-btn">
            Graphs
          </NavLink>
       
          {isAuthenticated && (
            <NavLink to="/profile" className="nav-btn">
              Profile
            </NavLink>
          )}
          <LoggingButtons />
        </div>
      </div>

     
      {pathname === '/' && (
        <div className="flex flex-col items-center justify-center h-[80px]">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white text-center mb-4">
            Asylum Office Grant Rate Tracker
          </h1>
          <p className="text-base text-white text-center mt-2">
            The Asylum Office Grant Rate Tracker provides asylum seekers, researchers, policymakers, and the public an interactive tool to explore USCIS data on Asylum Office decisions.
          </p>
        </div>
      )}
    </header>
  );
}
