import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Clock, Filter, Search, Star, Award, TrendingUp, Heart } from 'lucide-react';

const EventsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const events = [
  {
    id: 1,
    title: 'Dépistage Médical Gratuit',
    date: '2025-09-15',
    time: '09h00 - 16h00',
    location: 'Faculté de médecine et de pharmacie de Tanger',
    description: 'Rejoignez-nous pour un événement de dépistage médical complet offrant des examens médicaux gratuits, surveillance de la tension artérielle et consultations de santé pour les communautés défavorisées.',
    image: '/depi.jpg',
    status: 'upcoming',
    participants: 45,
    maxParticipants: 100,
    category: 'Dépistage Médical',
    priority: 'high',
    rating: 4.9
  },
  {
    id: 2,
    title: 'Collecte de Sang',
    date: '2025-08-22',
    time: '08h00 - 18h00',
    location: 'Faculté de médecine et de pharmacie de Tanger',
    description: 'Événement annuel de don de sang en partenariat avec la Croix-Rouge. Aidez à sauver des vies en donnant votre sang et en encourageant les autres à participer à ce service communautaire vital.',
    image: 'https://images.pexels.com/photos/6823567/pexels-photo-6823567.jpeg?auto=compress&cs=tinysrgb&w=800',
    status: 'upcoming',
    participants: 32,
    maxParticipants: 150,
    category: 'Don de Sang',
    priority: 'high',
    rating: 4.8
  },
  {
    id: 3,
    title: 'Caravane Médicale Sanad 2',
    date: '2024-03-28',
    time: '14h00 - 17h00',
    location: 'Azilal, Maroc',
    description: 'Caravane double dans les quartiers Sanad 2 avec plusieurs spécialités médicales et un encadrement bénévole.',
    image: '/sanad2.png',
    status: 'completed',
    participants: 67,
    maxParticipants: 80,
    category: 'Caravane Médicale',
    priority: 'medium',
    rating: 4.7
  },
  {
    id: 4,
    title: 'Caravane Médicale Al Ihsane',
    date: '2024-02-28',
    time: '10h00 - 17h00',
    location: 'Atlas, Maroc',
    description: 'Caravane médicale organisée par l’association Al Ihsane. Bénéfices : soins généraux, dépistage et orientation médicale gratuite.',
    image: '/ihsan.png',
    status: 'completed',
    participants: 180,
    maxParticipants: 200,
    category: 'Caravane Médicale',
    priority: 'high',
    rating: 4.9
  },
  {
    id: 5,
    title: 'Caravane Médicale DIF2',
    date: '2024-02-20',
    time: '09h00 - 16h00',
    location: 'Mengrala, Maroc',
    description: 'Caravane de santé offrant consultations médicales, dentaires et ophtalmologiques à la population locale.',
    image: '/dif2.png',
    status: 'completed',
    participants: 150,
    maxParticipants: 180,
    category: 'Caravane Médicale',
    priority: 'high',
    rating: 4.8
  },
  {
    id: 6,
    title: 'Caravane Médicale Sanad 1',
    date: '2024-02-10',
    time: '10h00 - 17h00',
    location: 'Village X',
    description: 'Caravane double dans les quartiers Sanad 1 avec plusieurs spécialités médicales et un encadrement bénévole.',
    image: 'fatip.png',
    status: 'completed',
    participants: 240,
    maxParticipants: 250,
    category: 'Caravane Médicale',
    priority: 'high',
  },
  {
    id: 7,
    title: 'Atelier de Secourisme',
    date: '2024-02-05',
    time: '14h00 - 17h00',
    location: 'Faculté de médecine et de pharmacie de Tanger',
    description: 'Atelier pratique pour apprendre les gestes de premiers secours : RCR, traitement des blessures, appels d’urgence. Formation certifiante.',
    image: '/secours.png',
    status: 'completed',
    participants: 75,
    maxParticipants: 80,
    category: 'Secourisme',
    priority: 'medium',
    rating: 4.7
  }
];


  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || event.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

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

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Star className="h-4 w-4 text-yellow-500 fill-current" />;
      case 'medium':
        return <TrendingUp className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const stats = {
    totalEvents: events.length,
    upcomingEvents: events.filter(e => e.status === 'upcoming').length,
    totalParticipants: events.reduce((sum, e) => sum + e.participants, 0),
    completedEvents: events.filter(e => e.status === 'completed').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      {/* Hero Section with Animation */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
                <Heart className="h-12 w-12 text-white animate-pulse" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              Nos Événements
              <span className="block text-3xl font-normal text-purple-200 mt-2">
                Ensemble pour la Santé Communautaire
              </span>
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Découvrez nos événements caritatifs à venir et voyez comment notre communauté fait la différence dans le domaine de la santé.
            </p>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-float-delayed"></div>
        <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Section */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {[
            { label: 'Total Événements', value: stats.totalEvents, icon: Calendar, color: 'purple', iconColor: 'text-purple-500' },
            { label: 'À Venir', value: stats.upcomingEvents, icon: Clock, color: 'indigo', iconColor: 'text-indigo-500' },
            { label: 'Participants', value: stats.totalParticipants, icon: Users, color: 'violet', iconColor: 'text-violet-500' },
            { label: 'Complétés', value: stats.completedEvents, icon: Award, color: 'purple', iconColor: 'text-purple-500' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl border border-purple-100">
              <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-${stat.color}-100 to-${stat.color}-200 rounded-lg mb-3`}>
                <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className={`mb-8 flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex-1 relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200" />
            <input
              type="text"
              placeholder="Rechercher des événements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 shadow-sm hover:shadow-md bg-white"
            />
          </div>
          
          <div className="relative group">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white transition-all duration-200 shadow-sm hover:shadow-md appearance-none cursor-pointer"
            >
              <option value="all">Tous les Événements</option>
              <option value="upcoming">À Venir</option>
              <option value="completed">Terminés</option>
            </select>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <div 
              key={event.id} 
              className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100 transform hover:-translate-y-2 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${700 + index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(event.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${getStatusColor(event.status)} shadow-lg`}>
                    {event.status === 'upcoming' ? 'À Venir' : 'Terminé'}
                  </span>
                  {getPriorityIcon(event.priority) && (
                    <div className="p-1 bg-white bg-opacity-90 rounded-full">
                      {getPriorityIcon(event.priority)}
                    </div>
                  )}
                </div>
                
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${getCategoryColor(event.category)} shadow-lg`}>
                    {event.category}
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 flex items-center bg-white bg-opacity-90 rounded-full px-2 py-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                  <span className="text-xs font-semibold text-gray-700">{event.rating}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-200">{event.title}</h3>
                
                <div className="space-y-3 mb-4">
                  {[
                    { icon: Calendar, text: new Date(event.date).toLocaleDateString('fr-FR') },
                    { icon: Clock, text: event.time },
                    { icon: MapPin, text: event.location },
                    { icon: Users, text: `${event.participants}/${event.maxParticipants} participants`,color: 'text-purple-700' }
                  ].map((item, i) => (
                   <div key={i} className="flex items-center text-gray-600 group-hover:text-gray-700 transition-colors duration-200">
                      <item.icon className={`h-4 w-4 mr-3 ${item.color || 'text-purple-500'}`} />
                      <span className={`text-sm font-medium ${item.color || ''}`}>{item.text}</span>
                    </div>
                  ))}
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {event.description}
                </p>

                {/* Enhanced Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <span className="font-medium">Participation</span>
                    <span className="font-bold">{Math.round((event.participants / event.maxParticipants) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3 rounded-full transition-all duration-1000 shadow-sm relative overflow-hidden"
                      style={{ width: `${Math.min((event.participants / event.maxParticipants) * 100, 100)}%` }}
                    >
                      <div className="absolute inset-0 bg-white bg-opacity-20 animate-pulse"></div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  {event.status === 'upcoming' ? (
                    <>
                      <button className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                        S'inscrire
                      </button>
                      <button className="flex-1 border-2 border-purple-600 text-purple-600 py-3 px-4 rounded-xl hover:bg-purple-50 transition-all duration-300 text-sm font-semibold">
                        En savoir plus
                      </button>
                    </>
                  ) : (
                    <button className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-3 px-4 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 text-sm font-semibold">
                      Voir les Résultats
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Aucun événement trouvé</h3>
            <p className="text-gray-600">Essayez d'ajuster vos critères de recherche ou de filtrage.</p>
          </div>
        )}

        {/* Enhanced CTA Section */}
        <div className={`mt-20 bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 rounded-3xl p-10 text-center text-white shadow-2xl transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '1200ms' }}>
          <div className="relative">
            <h2 className="text-4xl font-bold mb-6">Vous souhaitez vous impliquer ?</h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Rejoignez notre communauté d'étudiants en médecine et aidez-nous à organiser des événements percutants qui font la différence dans le domaine de la santé.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Devenir Bénévole
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Suggérer un Événement
              </button>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse delay-700"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default EventsPage;