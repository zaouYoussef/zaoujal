import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { dataStore } from '../data'; // Importez dataStore


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Dans Header.tsx, modifiez la partie des liens de navigation :






  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  // Mettez à jour la partie des liens :
const navLinks = [
  { path: '/', label: 'Accueil' },
  { path: '/donate', label: 'Faire un don' },
  { path: '/events', label: 'Événements' },
  { path: '/about', label: 'À propos' },
  ...(dataStore.getForms().filter(f => f.isActive).length > 0 
    ? [{ path: '/forms', label: 'Formulaires' }] 
    : [])
];

  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    },
    closed: { 
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: -20 }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo avec animation */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/logo.jpg" 
                alt="Logo MedReads" 
                className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <span className="text-xl font-bold text-gray-900 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                MedReads
              </span>
            </Link>
          </motion.div>

          {/* Navigation bureau */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <motion.div
                key={link.path}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Link
                  to={link.path}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? 'text-purple-600'
                      : 'text-gray-700 hover:text-purple-600'
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <motion.span 
                      layoutId="underline"
                      className="absolute left-0 -bottom-1 w-full h-0.5 bg-purple-600"
                      initial={false}
                      transition={{
                        type: "spring",
                        bounce: 0.25,
                        duration: 0.5
                      }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Menu utilisateur / boutons d’authentification */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors duration-200"
                >
                  <div className="relative">
                    <User className="h-5 w-5" />
                    {isUserMenuOpen && (
                      <motion.span 
                        className="absolute inset-0 rounded-full bg-purple-100 opacity-60"
                        animate={{ scale: 1.5 }}
                        transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
                      />
                    )}
                  </div>
                  <span className="text-sm font-medium">{user?.name}</span>
                </motion.button>
                
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={menuVariants}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100"
                    >
                      <motion.div variants={itemVariants}>
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 transition-colors duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Tableau de bord
                        </Link>
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 transition-colors duration-200 flex items-center space-x-2"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Déconnexion</span>
                        </button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/login"
                    className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors duration-200"
                  >
                    Connexion
                  </Link>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  initial={{ scale: 1 }}
                  animate={{ 
                    scale: [1, 1.02, 1],
                    boxShadow: ["0px 2px 5px rgba(0,0,0,0.1)", "0px 4px 10px rgba(124, 58, 237, 0.2)", "0px 2px 5px rgba(0,0,0,0.1)"]
                  }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <Link
                    to="/events"
                    className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-all duration-200 shadow-md"
                  >
                    Rejoignez-nous
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Bouton menu mobile */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>

        {/* Navigation mobile */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 border-t border-gray-200">
                <nav className="flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <motion.div
                      key={link.path}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        to={link.path}
                        className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                          isActive(link.path)
                            ? 'text-purple-600 bg-purple-50 rounded-md'
                            : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  
                  {isAuthenticated ? (
                    <motion.div 
                      className="pt-2 border-t border-gray-200"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link
                        to="/dashboard"
                        className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md block"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Tableau de bord
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md"
                      >
                        Déconnexion
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="flex flex-col space-y-2 pt-2 border-t border-gray-200"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link
                        to="/login"
                        className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Connexion
                      </Link>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link
                          to="/register"
                          className="mx-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-colors duration-200 text-center shadow-md"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Rejoignez-nous
                        </Link>
                      </motion.div>
                    </motion.div>
                  )}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
