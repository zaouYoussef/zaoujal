import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Clock, ArrowLeft, Star, Heart, Share2, Phone, Mail, Globe, CheckCircle, AlertCircle, Info, Award, Target, Users2 } from 'lucide-react';

// Interface pour un événement
interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  status: string;
  participants: number;
  maxParticipants: number;
  priority: string;
  rating: number;
  image: string;
  organizer?: {
    name: string;
    email: string;
    phone: string;
    bio: string;
  };
  objectives?: string[];
  requirements?: string[];
  schedule?: Array<{ time: string; activity: string }>;
  gallery?: string[];
  testimonials?: Array<{ name: string; comment: string; rating: number }>;
}

interface EventDetailsPageProps {
  event: Event; // Recevez l'événement complet directement
  onBack: () => void;
  onRegister: (eventId: number) => void;
}



const EventDetailsPage: React.FC<EventDetailsPageProps> = ({ event, onBack, onRegister }) => {
  // Supprimez tout le code lié à la gestion de l'état local et des données d'exemple
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoaded, setIsLoaded] = useState(true);

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des détails de l'événement...</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 border border-purple-200';
      case 'completed':
        return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200';
      default:
        return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Dépistage Médical': 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 border border-purple-200',
      'Don de Sang': 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-200',
      'Santé Mentale': 'bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-800 border border-indigo-200',
      'Vaccination': 'bg-gradient-to-r from-green-100 to-teal-100 text-green-800 border border-green-200',
      'Éducation': 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border border-yellow-200',
      'Santé Pédiatrique': 'bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 border border-pink-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      {/* Header avec bouton retour */}
      <div className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center text-purple-600 hover:text-purple-800 transition-colors duration-200 font-medium"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour aux événements
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <div className={`absolute inset-0 flex items-end transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <div className="text-white">
              <div className="flex flex-wrap gap-3 mb-6">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm ${getStatusColor(event.status)} shadow-lg`}>
                  {event.status === 'upcoming' ? 'À Venir' : 'Terminé'}
                </span>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm ${getCategoryColor(event.category)} shadow-lg`}>
                  {event.category}
                </span>
                <div className="flex items-center bg-white bg-opacity-20 rounded-full px-3 py-2 backdrop-blur-sm">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-2" />
                  <span className="text-sm font-semibold">{event.rating}/5</span>
                </div>
              </div>
              
              <h1 className="text-5xl font-bold mb-4 leading-tight">{event.title}</h1>
              
              <div className="flex flex-wrap gap-6 text-lg">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  {new Date(event.date).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  {event.time}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  {event.location}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Content principal */}
          <div className="lg:col-span-2">
            {/* Navigation tabs */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="flex space-x-8">
                {[
                  { id: 'overview', label: 'Vue d\'ensemble', icon: Info },
                  { id: 'schedule', label: 'Programme', icon: Clock },
                  { id: 'objectives', label: 'Objectifs', icon: Target },
                  { id: 'testimonials', label: 'Témoignages', icon: Heart }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <tab.icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className={`transition-all duration-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Description</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">{event.description}</p>
                  </div>

                  {event.requirements && (
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Prérequis</h3>
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                        <div className="flex items-start">
                          <AlertCircle className="h-5 w-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                          <ul className="space-y-2 text-amber-800">
                            {event.requirements.map((req, index) => (
                              <li key={index} className="flex items-start">
                                <span className="w-2 h-2 bg-amber-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {event.gallery && event.gallery.length > 0 && (
  <div className="mt-8">
    <h3 className="text-2xl font-bold text-gray-900 mb-6">Galerie Multimédia</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {event.gallery.map((media, index) => (
        <div key={index} className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
          {media.type === 'image' ? (
            <img
              src={media.url}
              alt={`Media ${index + 1}`}
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="relative h-48 bg-black">
              <video
                className="w-full h-full object-cover"
                controls
                poster={media.thumbnail}
              >
                <source src={media.url} type="video/mp4" />
              </video>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                  </svg>
                </div>
              </div>
            </div>
          )}
          {media.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p className="text-white text-sm font-medium">{media.caption}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
)}
                </div>
              )}

              {activeTab === 'schedule' && event.schedule && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Programme de la journée</h3>
                  <div className="space-y-4">
                    {event.schedule.map((item, index) => (
                      <div key={index} className="flex items-start bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex-shrink-0 w-24 text-right pr-4">
                          <span className="text-purple-600 font-bold text-lg">{item.time}</span>
                        </div>
                        <div className="flex-shrink-0 w-px bg-purple-200 mx-4 h-full"></div>
                        <div className="flex-1">
                          <p className="text-gray-800 font-medium">{item.activity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'objectives' && event.objectives && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Objectifs de l'événement</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {event.objectives.map((objective, index) => (
                      <div key={index} className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                            <span className="text-white font-bold text-sm">{index + 1}</span>
                          </div>
                          <p className="text-gray-800 font-medium">{objective}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'testimonials' && event.testimonials && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Témoignages</h3>
                  <div className="space-y-6">
                    {event.testimonials.map((testimonial, index) => (
                      <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-lg">
                                {testimonial.name.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                              <div className="flex">{renderStars(testimonial.rating)}</div>
                            </div>
                            <p className="text-gray-700 italic">"{testimonial.comment}"</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Carte de participation */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-purple-600 mr-2" />
                    <span className="text-2xl font-bold text-gray-900">
                      {event.participants}/{event.maxParticipants}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">Participants inscrits</p>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner mb-4">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min((event.participants / event.maxParticipants) * 100, 100)}%` }}
                    ></div>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    {Math.round((event.participants / event.maxParticipants) * 100)}% des places occupées
                  </p>
                </div>

                {event.status === 'upcoming' ? (
                  <div className="space-y-3">
                    <button
                      onClick={() => onRegister(event.id)}
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 px-6 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      S'inscrire à l'événement
                    </button>
                    <div className="flex space-x-2">
                      <button className="flex-1 border-2 border-purple-600 text-purple-600 py-3 px-4 rounded-xl hover:bg-purple-50 transition-all duration-300 font-medium">
                        <Heart className="h-4 w-4 inline mr-2" />
                        Favoris
                      </button>
                      <button className="flex-1 border-2 border-purple-600 text-purple-600 py-3 px-4 rounded-xl hover:bg-purple-50 transition-all duration-300 font-medium">
                        <Share2 className="h-4 w-4 inline mr-2" />
                        Partager
                      </button>
                    </div>
                  </div>
                ) : (
                  <button className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-4 px-6 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 font-semibold">
                    <Award className="h-5 w-5 inline mr-2" />
                    Voir les Résultats
                  </button>
                )}
              </div>

              {/* Informations organisateur */}
              {event.organizer && (
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Organisateur</h3>
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-xl">
                        {event.organizer.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900">{event.organizer.name}</h4>
                    <p className="text-sm text-gray-600 mt-2">{event.organizer.bio}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 mr-3 text-purple-500" />
                      <span className="text-sm">{event.organizer.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-3 text-purple-500" />
                      <span className="text-sm">{event.organizer.phone}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Stats */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-4">Statistiques</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{event.rating}</div>
                    <div className="text-sm text-purple-200">Note moyenne</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{event.participants}</div>
                    <div className="text-sm text-purple-200">Inscrits</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;