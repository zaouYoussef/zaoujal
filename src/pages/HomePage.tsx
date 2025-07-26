import React, { useState, useEffect } from 'react';
import { Heart, Calendar, Users, DollarSign, ArrowRight, Award, Globe, HandHeart, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogoIcon } from '../../logo.jpg';
import EventDetailsPage from './EventDetailsPage'; // Importez votre composant de détail

import { dataStore } from '../data';



const HomePage = () => {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [data, setData] = useState(dataStore.getHomeSettings());
  const [events, setEvents] = useState(dataStore.getEvents());
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  

  // Remplacer cette partie :
const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);

useEffect(() => {
  // Charge les événements vedettes initiaux
  const featuredIds = dataStore.getHomeSettings().featuredEvents;
  const initialEvents = dataStore.getEvents()
    .filter(event => featuredIds.includes(event.id));
  setFeaturedEvents(initialEvents);

  // S'abonne aux changements
  const unsubscribe = dataStore.subscribe(() => {
    const updatedFeaturedIds = dataStore.getHomeSettings().featuredEvents;
    const updatedEvents = dataStore.getEvents()
      .filter(event => updatedFeaturedIds.includes(event.id));
    setFeaturedEvents(updatedEvents);
  });

  return unsubscribe;
}, []);

// Par cette nouvelle implémentation :
const [displayEvents, setDisplayEvents] = useState<Event[]>([]);

useEffect(() => {
  // Charge les 3 premiers événements initiaux
  const initialEvents = dataStore.getEvents().slice(0, 3);
  setDisplayEvents(initialEvents);

  // S'abonne aux changements
  const unsubscribe = dataStore.subscribe(() => {
    const updatedEvents = dataStore.getEvents().slice(0, 3);
    setDisplayEvents(updatedEvents);
  });

  return unsubscribe;
}, []);
  // Événements à afficher (vedettes ou par défaut)
  






useEffect(() => {
  // Initialisez avec les événements vedettes actuels
  const initialEvents = dataStore.getEvents()
    .filter(event => event.isFeatured)
    .slice(0, 3);
  setFeaturedEvents(initialEvents);

  // Abonnez-vous aux changements
  const unsubscribe = dataStore.subscribe(() => {
    const updatedEvents = dataStore.getEvents()
      .filter(event => event.isFeatured)
      .slice(0, 3);
    setFeaturedEvents(updatedEvents);
  });

  return unsubscribe;
}, []);




  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const upcomingEvents = [
    {
      id: 1,
      title: 'Caravane Sanad 2',
      date: '2025-03-15',
      location: 'Mengrala, Maroc',
      image: '/fatip.png',
      participants: '100+'
    },
    {
      id: 2,
      title: 'Caravane Dif2',
      date: '2025-03-22',
      location: 'Azilal, Maroc',
      image: '/dif2.png',
      participants: '150+'
    },
    {
      id: 3,
      title: 'Caravane Al Ihsane',
      date: '2024-03-28',
      location: 'Tanger, Maroc',
      image: '/ihsan.png',
      participants: '100+'
    }
  ];
const recentActivities = (dataStore.getRecentActivities() || []).filter(a => a.isActive);
 

  const stats = [
    { icon: Users, label: 'Membres Actifs', value: '180+', growth: '+15%' },
    { icon: Calendar, label: 'Événements Organisés', value: '58', growth: '+28%' },
    { icon: DollarSign, label: 'Fonds Collectés', value: '50K DH', growth: '+45%' },
    { icon: HandHeart, label: 'Personnes Aidées', value: '2,400+', growth: '+60%' }
  ];

  const testimonials = [
    {
      name: 'Dr. Amina Benjelloun',
      role: 'Directrice Médicale',
      text: 'MedReads représente l\'avenir de la médecine sociale au Maroc.',
      image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      name: 'Youssef El Mansouri',
      role: 'Étudiant en 5ème année',
      text: 'Une expérience enrichissante qui forme les médecins de demain.',
      image: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=200'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);


  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section avec Image de Faculté */}
      <section className="relative min-h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/8471938/pexels-photo-8471938.jpeg?auto=compress&cs=tinysrgb&w=1600')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-purple-800/85 to-indigo-900/90"></div>
        
        {/* Particules flottantes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            >
              <Heart className="h-3 w-3 text-purple-300/30" />
            </div>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 z-10">
          <div className="text-center">
            <div 
              className="flex justify-center mb-8 transform transition-all duration-1000"
              data-animate
              id="hero-icon"
            >
              <div className={`bg-white/20 backdrop-blur-sm p-6 rounded-full shadow-2xl transition-all duration-1000 ${
                isVisible['hero-icon'] ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
              }`}>
                <Heart className="h-16 w-16 text-white animate-pulse" />
              </div>
            </div>
            
            <h1 
              className={`text-5xl md:text-7xl font-bold mb-8 transition-all duration-1000 delay-300 ${
                isVisible['hero-icon'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                Guérir par la
              </span>
              <br />
              <span className="text-purple-200 animate-pulse">Compassion</span>
            </h1>
            
            <p 
              className={`text-xl md:text-2xl mb-10 max-w-4xl mx-auto text-purple-100 leading-relaxed transition-all duration-1000 delay-500 ${
                isVisible['hero-icon'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              MedReads est une association dédiée d'étudiants en médecine engagés dans l'organisation d'événements caritatifs, 
              la collecte de dons et l'impact positif dans notre communauté marocaine.
            </p>
            
            <div 
              className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 delay-700 ${
                isVisible['hero-icon'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <button   onClick={() => navigate('/donate')} className="group bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25">
                <span className="flex items-center justify-center">
                  Soutenir Notre Cause
                  <Heart className="ml-2 h-5 w-5 group-hover:animate-pulse" />
                </span>
              </button>
              <button   onClick={() => navigate('/events')} className="group border-2 border-white/80 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-purple-700 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                <span className="flex items-center justify-center" >
                  Rejoindre Notre Mission
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-white/70" />
        </div>
      </section>

      {/* Stats Section Améliorée */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="text-center mb-16"
            data-animate
            id="stats-title"
          >
            <h2 className={`text-4xl font-bold text-gray-900 mb-4 transition-all duration-1000 ${
              isVisible['stats-title'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              Notre Impact en Chiffres
            </h2>
            <p className={`text-xl text-gray-600 transition-all duration-1000 delay-200 ${
              isVisible['stats-title'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              Des résultats concrets au service de la santé
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`text-center group transition-all duration-1000 delay-${index * 100} ${
                  isVisible['stats-title'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                data-animate
                id={`stat-${index}`}
              >
                <div className="relative">
                  <div className="flex justify-center mb-6">
                    <div className="bg-gradient-to-br from-purple-100 to-indigo-100 p-6 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                      <stat.icon className="h-10 w-10 text-purple-600 group-hover:text-purple-700 transition-colors" />
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm group-hover:shadow-lg transition-all duration-300">
                    <h3 className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {stat.value}
                    </h3>
                    <p className="text-gray-600 font-medium mb-2">{stat.label}</p>
                    <span className="text-sm text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full">
                      {stat.growth}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section Redesignée */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="text-center mb-16"
            data-animate
            id="mission-title"
          >
            <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 transition-all duration-1000 ${
              isVisible['mission-title'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              Notre Mission
            </h2>
            <p className={`text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible['mission-title'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              Nous croyons au pouvoir des connaissances médicales combinées à l'action compassionnelle 
              pour créer un changement durable dans nos communautés marocaines.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: Globe,
                title: 'Sensibilisation Communautaire',
                description: 'Connexion avec les communautés locales pour fournir des services de santé et d\'éducation là où c\'est le plus nécessaire.',
                color: 'purple',
                gradient: 'from-purple-500 to-indigo-600'
              },
              {
                icon: HandHeart,
                title: 'Événements Caritatifs',
                description: 'Organisation d\'événements impactants qui collectent des fonds et sensibilisent aux causes importantes de santé.',
                color: 'pink',
                gradient: 'from-pink-500 to-rose-600'
              },
              {
                icon: Award,
                title: 'Formation Étudiante',
                description: 'Autonomisation des étudiants en médecine avec des compétences de leadership et une expérience concrète.',
                color: 'indigo',
                gradient: 'from-indigo-500 to-purple-600'
              }
            ].map((item, index) => (
              <div 
                key={index}
                className={`group transition-all duration-1000 delay-${index * 200} ${
                  isVisible['mission-title'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 h-full group-hover:-translate-y-2">
                  <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16">
                    <div className={`w-full h-full bg-gradient-to-br ${item.gradient} opacity-10 rounded-full transform rotate-45`}></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className={`bg-gradient-to-br ${item.gradient} p-4 rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Événements à Venir - Design Premium */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="flex justify-between items-center mb-16"
            data-animate
            id="events-header"
          >
            <div className={`transition-all duration-1000 ${
              isVisible['events-header'] ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Événements</h2>
              <p className="text-xl text-gray-600">Rejoignez-nous pour faire la différence</p>
            </div>
            <button   onClick={() => navigate('/events')} className={`group flex items-center text-purple-600 hover:text-purple-700 font-semibold text-lg transition-all duration-300 hover:translate-x-2 ${
              isVisible['events-header'] ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}>
              Voir Tous les Événements
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {displayEvents.map((event, index) => (
              <div 
                key={event.id} 
                className={`group transition-all duration-1000 delay-${index * 200} ${
                  isVisible['events-header'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:-translate-y-2">
                  <div className="relative overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-purple-600">
                      {event.participants} participants
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                      <span className="font-medium">{new Date(event.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <p className="text-gray-600 mb-6">{event.location}</p>
                    <button onClick={() => setSelectedEventId(event.id)} className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
                      En Savoir Plus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>      
        
      </section>
      {/* Modal pour les détails de l'événement */}
      {selectedEventId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <EventDetailsPage 
              eventId={selectedEventId}
              onClose={() => setSelectedEventId(null)} 
            />
          </div>
        </div>
      )}
      {/* Activités Récentes */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="text-center mb-16"
            data-animate
            id="activities-title"
          >
            <h2 className={`text-4xl font-bold text-gray-900 mb-4 transition-all duration-1000 ${
              isVisible['activities-title'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              Activités Récentes
            </h2>
            <p className={`text-xl text-gray-600 transition-all duration-1000 delay-200 ${
              isVisible['activities-title'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              Découvrez nos dernières réalisations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {recentActivities.map((activity, index) => (
              <div 
                key={index} 
                className={`group transition-all duration-1000 delay-${index * 200} ${
                  isVisible['activities-title'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-full group-hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className={`p-3 rounded-xl mr-4 ${
                        activity.type === 'fundraising' ? 'bg-green-100' :
                        activity.type === 'volunteering' ? 'bg-purple-100' : 'bg-orange-100'
                      }`}>
                        {activity.type === 'fundraising' ? 
                          <DollarSign className="h-6 w-6 text-green-600" /> :
                          activity.type === 'volunteering' ? 
                          <Users className="h-6 w-6 text-purple-600" /> :
                          <HandHeart className="h-6 w-6 text-orange-600" />
                        }
                      </div>
                      <span className="text-sm font-medium text-gray-500">{activity.date}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      activity.impact === 'Fort' ? 'bg-green-100 text-green-800' :
                      activity.impact === 'Élevé' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      Impact {activity.impact}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      {/* Section Témoignages + CTA Finale regroupées dans une seule section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-indigo-800 relative overflow-hidden">
        {/* Particules */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            >
              <div className="w-2 h-2 bg-white/20 rounded-full"></div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Témoignages */}
          <h2 className="text-4xl font-bold text-white mb-12">Ce Qu'ils Disent de Nous</h2>
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0 absolute inset-0'
                }`}
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
                  <div className="flex items-center justify-center mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white/30"
                    />
                  </div>
                  <blockquote className="text-xl text-white mb-6 italic">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="text-white">
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-purple-200">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>

          {/* CTA Section Finale */}
          <div
            data-animate
            id="cta-section"
            className="mt-20"
          >
            <h2 className={`text-4xl md:text-5xl font-bold text-white mb-6 transition-all duration-1000 ${
              isVisible['cta-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              Prêt à Faire la Différence ?
            </h2>
            <p className={`text-xl text-purple-100 mb-10 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible['cta-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              Rejoignez notre communauté d'étudiants en médecine dévoués et aidez-nous à créer un changement positif 
              dans le domaine de la santé au Maroc.
            </p>
            <div className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 delay-400 ${
              isVisible['cta-section'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <button onClick={() => navigate('/events')} className="group bg-white text-purple-700 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <span className="flex items-center justify-center" onClick={() => navigate('/events')}>
                  Devenir Membre
                  <Users className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </span>
              </button>
              <button onClick={() => navigate('/donate')} className="group border-2 border-white/80 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-700 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                <span className="flex items-center justify-center">
                  Faire un Don
                  <Heart className="ml-2 h-5 w-5 group-hover:animate-pulse" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>


      
    </div>
  );
};

export default HomePage;