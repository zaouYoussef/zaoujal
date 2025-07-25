import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  // Icône TikTok personnalisée
  const TiktokIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className="h-5 w-5"
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  );

  // Données pour les liens sociaux
  const socialLinks = [
    { 
      icon: <Facebook className="h-5 w-5" />, 
      name: 'Facebook', 
      url: 'https://www.facebook.com/MedReads/',
      color: 'hover:text-[#1877F2]'
    },
    { 
      icon: <Instagram className="h-5 w-5" />, 
      name: 'Instagram', 
      url: 'https://www.instagram.com/medreadss/?hl=ar',
      color: 'hover:text-[#E4405F]' 
    },
    { 
      icon: <TiktokIcon />, 
      name: 'TikTok', 
      url: 'https://www.tiktok.com/@med_reads',
      color: 'hover:text-[#000000]' 
    }
  ];

  // Données pour les liens rapides
  const quickLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/about', label: 'À propos' },
    { path: '/events', label: 'Événements' },
    { path: '/donate', label: 'Faire un don' },
    { path: '/register', label: 'Nous rejoindre' }
  ];

  // Données pour les informations de contact
  const contactInfo = [
    { 
      icon: <Mail className="h-5 w-5 text-blue-400" />, 
      text: 'zaoujalyoussef1@gmail.com',
      url: 'mailto:zaoujalyoussef1@gmail.com' 
    },
    { 
      icon: <Phone className="h-5 w-5 text-blue-400" />, 
      text: '+(212)612345678',
      url: 'tel:+212612345678' 
    },
    { 
      icon: <MapPin className="h-5 w-5 text-blue-400" />, 
      text: 'Faculté de médecine et de pharmacie de Tanger' 
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Section Marque */}
          <div className="col-span-1 lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center space-x-3 mb-6"
            >
              <img 
                src="/logo.jpg" 
                alt="MedReads Logo" 
                className="h-12 w-12 rounded-full object-cover border-2 border-blue-500 shadow-lg"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                MedReads
              </span>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-gray-300 mb-6 max-w-md leading-relaxed"
            >
              Une association dédiée d'étudiants en médecine engagés à organiser des événements caritatifs,
              collecter des dons et avoir un impact positif dans notre communauté à travers des initiatives de santé.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex space-x-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  className={`text-gray-400 ${social.color} transition-colors duration-300 p-2 rounded-full hover:bg-gray-800`}
                  whileHover={{ y: -2, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Liens Rapides */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Liens Rapides</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contactez-nous */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Contactez-nous</h3>
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center space-x-3"
                  whileHover={{ x: 3 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="flex-shrink-0">
                    {item.icon}
                  </div>
                  {item.url ? (
                    <a 
                      href={item.url} 
                      className="text-gray-300 hover:text-white transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-gray-300">{item.text}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bas de page */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} MedReads Association. Tous droits réservés.
          </p>
          
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;