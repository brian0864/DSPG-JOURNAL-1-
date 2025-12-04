
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NAV_LINKS, JOURNAL_ACRONYM } from '../constants';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, Menu, X } from 'lucide-react';
import DSPGLogo from './DSPGLogo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-polyBlue text-white shadow-lg sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
             <div className="bg-white rounded-full p-1 shadow-md border-2 border-polyGold group-hover:scale-105 transition-transform duration-200">
                <DSPGLogo className="w-10 h-10 md:w-12 md:h-12" />
             </div>
             <div className="flex flex-col">
                <span className="font-bold text-lg md:text-xl tracking-tight text-polyGold group-hover:text-white transition-colors font-serif">{JOURNAL_ACRONYM}</span>
                <span className="text-[10px] md:text-xs text-gray-300 hidden md:block tracking-wide uppercase">Delta State Polytechnic, Ogwashi-Uku</span>
             </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 items-center">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`text-sm font-medium transition-all duration-200 hover:text-polyGold relative group py-2 ${location.pathname === link.path ? 'text-polyGold' : 'text-gray-200'}`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-polyGold transform origin-left transition-transform duration-300 ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </Link>
            ))}
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4 pl-4 border-l border-blue-800">
                <Link to="/dashboard" className="flex items-center space-x-2 text-sm hover:text-polyGold transition">
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>
                <div className="relative group cursor-pointer">
                  <div className="w-9 h-9 rounded-full bg-polyGold text-polyBlue flex items-center justify-center font-bold border-2 border-white overflow-hidden">
                    {user?.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" /> : user?.name.charAt(0)}
                  </div>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 transform origin-top-right text-gray-800">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-bold truncate">{user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center text-red-600">
                      <LogOut size={14} className="mr-2" /> Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3 pl-4">
                 <Link to="/login" className="text-sm font-medium hover:text-polyGold transition">Log In</Link>
                 <Link to="/register" className="bg-polyGold text-polyBlue px-5 py-2 rounded-full text-sm font-bold hover:bg-yellow-400 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                   Submit Article
                 </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none p-2"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-blue-800 pt-4 flex flex-col space-y-4 animate-slide-up">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className="block text-white hover:text-polyGold px-2 py-2 border-b border-blue-900"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {isAuthenticated ? (
               <>
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="block text-polyGold font-bold px-2 py-2">
                  My Dashboard
                </Link>
                <button onClick={handleLogout} className="block text-left text-red-300 px-2 py-2">
                  Logout
                </button>
               </>
            ) : (
              <div className="flex flex-col space-y-3 pt-2">
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-center text-white py-2 border border-blue-700 rounded-lg">Log In</Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="text-center bg-polyGold text-polyBlue py-3 rounded-lg font-bold">Register / Submit</Link>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
