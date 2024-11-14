import Logo from '../../assets/logo.png';
import { LoggingButtons } from '../../auth/LoggingButtons.jsx';
import { NavLink } from 'react-router-dom';

/**
 * TODO: Ticket 3:
 * Implement authentication using Auth0
 */
export default function Header() {
  // TODO: Replace me
  const isAuthenticated = false;

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

      {/* Title and Subtitle */}
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-extrabold text-white mb-4">
          Asylum Office Grant Rate Tracker
        </h1>
        <p className="text-lg text-white whitespace-nowrap">
          The Asylum Office Grant Rate Tracker provides asylum seekers, researchers, policymakers, and the public an interactive tool to explore USCIS data on Asylum Office decisions.
        </p>
      </div>
    
    </header>
  );
}
