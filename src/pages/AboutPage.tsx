import React, { useState, useEffect } from 'react';
import { Heart, Award, Globe, Users, Mail, Phone, MapPin, Linkedin, ChevronDown, ArrowRight, Calendar, Star, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeValue, setActiveValue] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveValue(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const teamMembers = [
    {
      name: 'Dr. Acharki Hiba',
      role: 'Présidente & Fondatrice',
      university: 'Faculté de Médecine de Tanger',
      year: '2e année',
      image: '/hiba.jpg',
      bio: "Passionnée par la santé communautaire et l'éducation médicale. A fondé MedReads pour rapprocher les connaissances médicales du service à la communauté.",
      social: { linkedin: '#' },
      expertise: ['Leadership', 'Santé Communautaire', 'Innovation Médicale']
    },
    {
      name: 'Dr. Tayou Imane',
      role: 'Vice-Présidente',
      university: 'Faculté de Médecine de Tanger',
      year: '2e année',
      image: '/iman.jpg',
      bio: "Spécialisée dans les initiatives de santé publique et la coordination d'événements. Dirige nos programmes de sensibilisation communautaire avec engagement et expertise.",
      social: { linkedin: '#' },
      expertise: ['Santé Publique', 'Gestion d\'Événements', 'Communication']
    },
    {
      name: 'Dr. Kasmaoui Ayoub',
      role: 'Directeur des Programmes',
      university: 'Faculté de Médecine de Tanger',
      year: '5e année',
      image: '/ayoub.jpg',
      bio: "Supervise tous les programmes caritatifs et veille à la qualité des soins. Expert en médecine d'urgence et en santé communautaire.",
      social: { linkedin: '#' },
      expertise: ['Médecine d\'Urgence', 'Gestion de Programmes', 'Qualité des Soins']
    },
    {
      name: 'Dr. Lamyae',
      role: 'Trésorière',
      university: 'Faculté de Médecine de Tanger',
      year: '2e année',
      image: '/lamyae.jpg',
      bio: "Gère les opérations financières et le suivi des dons. Assure la transparence et l'utilisation efficace des fonds pour un impact communautaire maximal.",
      social: { linkedin: '#' },
      expertise: ['Gestion Financière', 'Comptabilité', 'Audit']
    },
    {
      name: 'Dr. EL Mesbahi Fatima Zahrae',
      role: 'Directrice de la Communication',
      university: 'Faculté de Médecine de Tanger',
      year: '2e année',
      image: '/fati.jpg',
      bio: "Gère la communication, les réseaux sociaux et l'engagement communautaire. Passionnée par l'éducation à la santé et les campagnes de sensibilisation.",
      social: { linkedin: '#' },
      expertise: ['Communication Digitale', 'Marketing Médical', 'Relations Publiques']
    },
    {
      name: 'Dr. Reem',
      role: 'Conseillère Médicale',
      university: 'Faculté de Médecine de Tanger',
      year: '2e année',
      image: '/reem.png',
      bio: 'Fournit des conseils médicaux et garantit que tous les programmes respectent les normes professionnelles. Spécialiste en médecine interne et en soins préventifs.',
      social: { linkedin: '#' },
      expertise: ['Médecine Interne', 'Soins Préventifs', 'Éthique Médicale']
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'Nous abordons chaque personne et chaque situation avec empathie, bienveillance et un véritable souci de son bien-être.',
      color: 'bg-red-500',
      lightColor: 'bg-red-50'
    },
    {
      icon: Globe,
      title: 'Impact Communautaire',
      description: "Nous croyons en un changement positif et durable dans nos communautés grâce à un engagement continu dans le service de santé et l'éducation.",
      color: 'bg-green-500',
      lightColor: 'bg-green-50'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: "Nous visons l'excellence dans tous les domaines : soins médicaux, organisation d'événements et développement de nos membres.",
      color: 'bg-yellow-500',
      lightColor: 'bg-yellow-50'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: "Nous avançons ensemble, en tant qu'équipe unie, en valorisant la diversité des compétences et des points de vue pour atteindre nos objectifs communs.",
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50'
    }
  ];

  const achievements = [
    { 
      number: '25,000+', 
      label: 'Personnes Aidées', 
      description: 'Grâce à nos programmes de santé',
      icon: Users,
      color: 'text-emerald-400'
    },
    { 
      number: '50K+', 
      label: 'Fonds Collectés', 
      description: 'Pour des causes caritatives (MAD)',
      icon: Heart,
      color: 'text-rose-400'
    },
    { 
      number: '45+', 
      label: 'Événements Organisés', 
      description: 'Dans différentes communautés',
      icon: Calendar,
      color: 'text-blue-400'
    },
    { 
      number: '100+', 
      label: 'Membres Actifs', 
      description: 'Étudiants en médecine engagés',
      icon: Star,
      color: 'text-yellow-400'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Fondation de MedReads',
      description: 'Création de l\'association par un groupe d\'étudiants passionnés'
    },
    {
      year: '2021',
      title: 'Premier Programme Majeur',
      description: 'Lancement de notre première campagne de santé communautaire'
    },
    {
      year: '2022',
      title: 'Expansion Nationale',
      description: 'Extension de nos activités dans plusieurs villes du Maroc'
    },
    {
      year: '2025',
      title: 'Innovation Digitale',
      description: 'Développement de plateformes numériques pour notre association'
    }
  ];
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section Enhanced */}
      <section className="relative min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/fac.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60"></div>

        <div className="relative flex items-center justify-center min-h-screen">
          <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Logo Animation */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-lg scale-110"></div>
                <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-full border border-white/20">
                  <Heart className="h-16 w-16 text-white animate-pulse" />
                </div>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white leading-tight">
              À propos de 
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                MedReads
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-200 mb-12 leading-relaxed">
              Une communauté d'excellence rassemblant les futurs professionnels de santé, 
              dédiée à l'innovation médicale et à l'impact social durable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button onClick={() => navigate('/events')} className="group bg-white text-purple-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center">
                Découvrir nos programmes
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => navigate('/register')} className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-purple-900 transition-all duration-300">
                Nous rejoindre
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-white/70" />
        </div>
      </section>

      {/* Mission Section Enhanced */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-50 to-transparent rounded-full transform translate-x-48 -translate-y-48"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl opacity-20"></div>
              <img
                src="/members.png"
                alt="Équipe MedReads"
                className="relative rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-8 -right-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-3xl font-bold mb-2">4+ Années</h3>
                <p className="text-purple-100">d'Excellence Médicale</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  Notre <span className="text-purple-600">Mission</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mb-8"></div>
              </div>

              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  <strong className="text-gray-900">MedReads</strong> représente l'avant-garde de l'engagement médical étudiant au Maroc. 
                  Fondée sur la conviction que l'excellence médicale se construit par le service communautaire, 
                  nous formons la nouvelle génération de professionnels de santé.
                </p>
                <p>
                  Nos programmes innovants allient formation académique rigoureuse et expérience pratique sur le terrain, 
                  créant un écosystème unique où chaque membre développe ses compétences cliniques tout en 
                  contribuant positivement à la société marocaine.
                </p>
                <p>
                  Depuis 2020, nous avons établi de nouveaux standards dans l'engagement étudiant médical, 
                  transformant des milliers de vies tout en formant des professionnels exceptionnels.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">2020</div>
                  <div className="text-sm text-gray-600">Année de fondation</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">National</div>
                  <div className="text-sm text-gray-600">Portée d'impact</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section Enhanced */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Nos Valeurs Fondamentales</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ces principes d'excellence guident chacune de nos actions et définissent notre approche 
            révolutionnaire du service médical et de l'éducation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div 
              key={index} 
              className={`group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                activeValue === index ? 'ring-2 ring-purple-500 scale-105' : ''
              }`}
              onMouseEnter={() => setActiveValue(index)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className={`relative ${value.lightColor} p-4 rounded-2xl w-20 h-20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <value.icon className={`h-12 w-12 mx-auto ${value.color.replace('bg-', 'text-')}`} />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{value.title}</h3>
              <p className="text-gray-600 text-center leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>


      {/* Achievements Section Enhanced */}
      <section className="py-24 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Notre Impact Exceptionnel</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto mb-6"></div>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Des résultats concrets qui témoignent de notre engagement inébranlable 
              envers l'excellence médicale et l'innovation sociale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="group text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className={`inline-flex p-4 rounded-full bg-white/10 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <achievement.icon className={`h-8 w-8 ${achievement.color}`} />
                </div>
                <div className="text-4xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300">
                  {achievement.number}
                </div>
                <div className="text-xl font-semibold text-purple-100 mb-2">{achievement.label}</div>
                <div className="text-purple-200 text-sm">{achievement.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Notre Parcours d'Excellence</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-6"></div>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-600 to-blue-600"></div>
            
            {milestones.map((milestone, index) => (
              <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <div className="text-2xl font-bold text-purple-600 mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-purple-600 rounded-full shadow-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section Enhanced */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Leadership d'Exception</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Notre équipe dirigeante combine expertise médicale pointue, vision stratégique 
              et passion inébranlable pour l'innovation en santé.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, skillIndex) => (
                        <span key={skillIndex} className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-purple-600 font-semibold mb-1">{member.role}</p>
                  <p className="text-sm text-gray-600 mb-1">{member.university}</p>
                  <p className="text-sm text-gray-500 mb-4">{member.year}</p>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">{member.bio}</p>
                  
                  <div className="flex justify-between items-center">
                    <a 
                      href={member.social.linkedin} 
                      className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium text-sm group"
                    >
                      <Linkedin className="h-4 w-4 mr-2" />
                      Profil LinkedIn
                      <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </a>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section Enhanced */}
      <section className="py-24 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Connectons-nous</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto mb-6"></div>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Rejoignez notre mission d'excellence médicale. Ensemble, façonnons l'avenir de la santé au Maroc.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Mail,
                title: 'Communication Directe',
                info: 'zaoujalyoussef1@gmail.com',
                subInfo: 'Réponse garantie sous 24h',
                color: 'from-purple-500 to-purple-600'
              },
              {
                icon: Phone,
                title: 'Support Téléphonique',
                info: '+(212) 600 000 000',
                subInfo: 'Lun–Ven, 9h à 17h',
                color: 'from-green-500 to-green-600'
              },
              {
                icon: MapPin,
                title: 'Siège Social',
                info: 'Faculté de Médecine et de Pharmacie',
                subInfo: 'Tanger, Maroc',
                color: 'from-orange-500 to-orange-600'
              }
            ].map((contact, index) => (
              <div key={index} className="group text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${contact.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <contact.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{contact.title}</h3>
                <p className="text-purple-100 font-medium mb-2">{contact.info}</p>
                <p className="text-purple-200 text-sm">{contact.subInfo}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button onClick={() => navigate('/register')} className="group bg-white text-purple-900 px-12 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl">
              Rejoindre MedReads
              <ArrowRight className="inline-block ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;