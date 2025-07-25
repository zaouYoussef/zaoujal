import React, { useState } from 'react';
import { DollarSign, Users, Target, Heart, Shield, CheckCircle, Copy, Award, Calendar, MapPin, Phone, Mail, ExternalLink, CreditCard, Building, Smartphone, TrendingUp, Lock, Star } from 'lucide-react';

const DonatePage: React.FC = () => {
  const [copied, setCopied] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeMethod, setActiveMethod] = useState<string>('bank');

  const donationStats = {
    totalRaised: 15747,
    donorCount: 1342,
    goal: 60000,
    beneficiaries: 8500
  };

  const progressPercentage = (donationStats.totalRaised / donationStats.goal) * 100;

  const bankDetails = {
    bankName: "Banque Populaire",
    rib: "007 780 123456789123 45",
    iban: "MA64 007 780 123456789123 45",
    swift: "BCPOMAMC",
    beneficiary: "Association MedReads"
  };

  const wafacashNumber = "06 12 34 56 78";

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const impactLevels = [
    { amount: 100, title: "Aide d'Urgence", description: "Kit médical d'urgence", color: "bg-emerald-500" },
    { amount: 250, title: "Consultation", description: "Examen médical complet", color: "bg-blue-500" },
    { amount: 500, title: "Dépistage", description: "20 personnes dépistées", color: "bg-purple-500" },
    { amount: 1000, title: "Mission Complète", description: "Village entier couvert", color: "bg-amber-500" }
  ];

  const recentContributions = [
    { name: 'Dr. Rachid Benali', amount: 2500, time: '2h', verified: true, type: 'Médecin' },
    { name: 'TechCorp SARL', amount: 5000, time: '4h', verified: true, type: 'Entreprise' },
    { name: 'Fondation Al-Khair', amount: 10000, time: '1j', verified: true, type: 'Fondation' },
    { name: 'Anonyme', amount: 750, time: '2j', verified: false, type: 'Particulier' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center max-w-4xl mx-auto">
            
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Investissez dans l'Avenir
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mt-2">
                de la Santé au Maroc
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
              Rejoignez notre mission d'excellence médicale. Chaque contribution finance 
              directement des soins de qualité pour les communautés les plus vulnérables.
            </p>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
                <div className="text-3xl font-bold mb-2">{(donationStats.beneficiaries/1000).toFixed(1)}K+</div>
                <div className="text-gray-300 text-sm font-medium">Vies Transformées</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
                <div className="text-3xl font-bold mb-2">98%</div>
                <div className="text-gray-300 text-sm font-medium">Fonds Alloués</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
                <div className="text-3xl font-bold mb-2">45+</div>
                <div className="text-gray-300 text-sm font-medium">Missions Réussies</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
                <div className="text-3xl font-bold mb-2">12</div>
                <div className="text-gray-300 text-sm font-medium">Régions Actives</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Campaign Progress Card */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-white">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Campagne Nationale 2024</h2>
                    <p className="text-gray-300">Objectif : Santé pour Tous</p>
                  </div>
                  <div className="bg-white bg-opacity-10 rounded-xl p-3">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Progression actuelle</span>
                    <span className="font-semibold">{Math.round(progressPercentage)}% de l'objectif</span>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 h-4 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between items-end pt-2">
                    <div>
                      <div className="text-3xl font-bold">{donationStats.totalRaised.toLocaleString()}</div>
                      <div className="text-gray-400 text-sm">MAD collectés</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-semibold">{donationStats.goal.toLocaleString()}</div>
                      <div className="text-gray-400 text-sm">MAD objectif</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-blue-50 rounded-2xl p-6 mb-3">
                      <Users className="h-8 w-8 text-blue-600 mx-auto" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{donationStats.donorCount}</div>
                    <div className="text-gray-500 text-sm font-medium">Donateurs</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-emerald-50 rounded-2xl p-6 mb-3">
                      <Target className="h-8 w-8 text-emerald-600 mx-auto" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {Math.round((donationStats.goal - donationStats.totalRaised) / 1000)}K
                    </div>
                    <div className="text-gray-500 text-sm font-medium">Restant</div>
                  </div>
                  
                  <div className="text-center sm:col-span-1 col-span-2">
                    <div className="bg-purple-50 rounded-2xl p-6 mb-3">
                      <Calendar className="h-8 w-8 text-purple-600 mx-auto" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">45</div>
                    <div className="text-gray-500 text-sm font-medium">Jours restants</div>
                  </div>
                </div>
                
                {showSuccess && (
                  <div className="mt-8 p-6 bg-emerald-50 border-2 border-emerald-200 rounded-2xl">
                    <div className="flex items-center">
                      <CheckCircle className="h-6 w-6 text-emerald-600 mr-4" />
                      <div>
                        <p className="text-emerald-800 font-semibold">Don enregistré avec succès</p>
                        <p className="text-emerald-700 text-sm">Reçu fiscal envoyé par email sous 24h</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="p-8 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Méthodes de Paiement</h2>
                <p className="text-gray-600">Choisissez votre option de paiement sécurisée</p>
              </div>

              {/* Payment Tabs */}
              <div className="flex border-b border-gray-100">
                <button
                  onClick={() => setActiveMethod('bank')}
                  className={`flex-1 flex items-center justify-center px-6 py-4 text-sm font-semibold transition-all ${
                    activeMethod === 'bank'
                      ? 'bg-blue-50 text-blue-700 border-b-3 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Building className="h-5 w-5 mr-2" />
                  Virement Bancaire
                </button>
                
                <button
                  onClick={() => setActiveMethod('wafa')}
                  className={`flex-1 flex items-center justify-center px-6 py-4 text-sm font-semibold transition-all ${
                    activeMethod === 'wafa'
                      ? 'bg-emerald-50 text-emerald-700 border-b-3 border-emerald-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Smartphone className="h-5 w-5 mr-2" />
                  Wafacash
                </button>
              </div>

              <div className="p-8">
                {activeMethod === 'bank' && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
                      <div className="flex items-center mb-4">
                        <div className="bg-blue-600 p-3 rounded-xl mr-4">
                          <CreditCard className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-blue-900 text-lg">Virement Bancaire Sécurisé</h3>
                          <p className="text-blue-700 text-sm">Méthode recommandée • Traçabilité complète</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="bg-gray-50 rounded-xl p-5 border-2 border-gray-200">
                          <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-2">Bénéficiaire</label>
                          <p className="font-bold text-gray-900 text-lg">{bankDetails.beneficiary}</p>
                        </div>
                        
                        <div className="bg-gray-50 rounded-xl p-5 border-2 border-gray-200">
                          <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-2">Banque</label>
                          <p className="font-bold text-gray-900 text-lg">{bankDetails.bankName}</p>
                        </div>
                        
                        <div className="bg-gray-50 rounded-xl p-5 border-2 border-gray-200">
                          <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-2">Code SWIFT</label>
                          <p className="font-mono font-bold text-gray-900 text-lg bg-white p-3 rounded-lg border">{bankDetails.swift}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-gray-50 rounded-xl p-5 border-2 border-gray-200">
                          <div className="flex justify-between items-center mb-3">
                            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">RIB</label>
                            <button
                              onClick={() => copyToClipboard(bankDetails.rib, 'rib')}
                              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-200 transition-colors flex items-center"
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              {copied === 'rib' ? 'Copié!' : 'Copier'}
                            </button>
                          </div>
                          <p className="font-mono text-sm text-gray-900 bg-white p-3 rounded-lg border break-all">
                            {bankDetails.rib}
                          </p>
                        </div>
                        
                        <div className="bg-gray-50 rounded-xl p-5 border-2 border-gray-200">
                          <div className="flex justify-between items-center mb-3">
                            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">IBAN</label>
                            <button
                              onClick={() => copyToClipboard(bankDetails.iban, 'iban')}
                              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-200 transition-colors flex items-center"
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              {copied === 'iban' ? 'Copié!' : 'Copier'}
                            </button>
                          </div>
                          <p className="font-mono text-sm text-gray-900 bg-white p-3 rounded-lg border break-all">
                            {bankDetails.iban}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeMethod === 'wafa' && (
                  <div className="space-y-6">
                    <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6">
                      <div className="flex items-center mb-4">
                        <div className="bg-emerald-600 p-3 rounded-xl mr-4">
                          <Smartphone className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-emerald-900 text-lg">Transfert Wafacash</h3>
                          <p className="text-emerald-700 text-sm">Rapide et pratique • Confirmation instantanée</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border-3 border-emerald-200 rounded-2xl p-8">
                      <div className="text-center">
                        <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-4">
                          Numéro de Transfert
                        </label>
                        <div className="bg-emerald-50 rounded-2xl p-6 mb-6">
                          <p className="font-mono text-3xl font-bold text-emerald-800 mb-4">{wafacashNumber}</p>
                          <button
                            onClick={() => copyToClipboard(wafacashNumber, 'wafa')}
                            className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center mx-auto"
                          >
                            <Copy className="h-5 w-5 mr-2" />
                            {copied === 'wafa' ? 'Numéro Copié!' : 'Copier le Numéro'}
                          </button>
                        </div>
                        
                        <div className="text-left bg-gray-50 rounded-2xl p-6">
                          <p className="text-sm font-semibold text-gray-700 mb-4">
                            <strong>Nom du bénéficiaire :</strong> {bankDetails.beneficiary}
                          </p>
                          <div className="bg-emerald-100 border-2 border-emerald-200 rounded-xl p-4">
                            <p className="text-sm text-emerald-800">
                              <strong>Après le transfert :</strong> Envoyez une capture d'écran du reçu à{' '}
                              <span className="font-mono bg-white px-2 py-1 rounded font-semibold">zaoujalyoussef1@gmail.com</span>{' '}
                              pour recevoir votre reçu fiscal.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Security & Trust */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 border-2 border-gray-200">
              <div className="flex items-center mb-6">
                <Shield className="h-8 w-8 text-gray-600 mr-4" />
                <h3 className="text-xl font-bold text-gray-900">Sécurité & Transparence</h3>
              </div>
              
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="flex items-start space-x-4 p-5 bg-white rounded-xl border-2 border-gray-200">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">100% Transparent</p>
                    <p className="text-gray-600 text-sm">Rapports publics trimestriels</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-5 bg-white rounded-xl border-2 border-gray-200">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Reçu Fiscal</p>
                    <p className="text-gray-600 text-sm">Déduction d'impôts valide</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-5 bg-white rounded-xl border-2 border-gray-200">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Certifié ONG</p>
                    <p className="text-gray-600 text-sm">Agrément officiel valide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* Impact Calculator */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white">
                <h3 className="font-bold text-xl flex items-center">
                  <Target className="h-6 w-6 mr-3" />
                  Impact de Votre Don
                </h3>
                <p className="text-purple-100 text-sm">Découvrez l'impact direct</p>
              </div>
              
              <div className="p-6 space-y-4">
                {impactLevels.map((level, index) => (
                  <div key={index} className="group hover:shadow-lg transition-all duration-300 border-2 border-gray-200 rounded-2xl p-5 cursor-pointer hover:border-purple-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`${level.color} text-white px-4 py-2 rounded-full text-sm font-bold`}>
                        {level.amount} MAD
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500 font-semibold">{level.title}</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 font-medium">{level.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Contributions */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 text-white">
                <h3 className="font-bold text-xl flex items-center">
                  <Award className="h-6 w-6 mr-3" />
                  Contributions Récentes
                </h3>
                <p className="text-amber-100 text-sm">Nos généreux donateurs</p>
              </div>
              
              <div className="p-6 space-y-4">
                {recentContributions.map((contribution, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {contribution.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-semibold text-gray-900">{contribution.name}</p>
                          {contribution.verified && (
                            <CheckCircle className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500 font-medium">{contribution.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{contribution.amount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500 font-medium">MAD</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl text-white p-8 shadow-xl">
              <h3 className="text-xl font-bold mb-6">Support & Assistance</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="bg-white bg-opacity-10 p-3 rounded-xl">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-300 text-sm">zaoujalyoussef1@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm">
                  <div className="bg-white bg-opacity-10 p-3 rounded-xl">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Téléphone</p>
                    <p className="text-gray-300 text-sm">+212 5 22 XX XX XX</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm">
                  <div className="bg-white bg-opacity-10 p-3 rounded-xl">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Siège Social</p>
                    <p className="text-gray-300 text-sm">Tanger, Maroc</p>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-white text-gray-900 font-semibold py-4 px-6 rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center">
                <ExternalLink className="h-5 w-5 mr-2" />
                Contacter le Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Footer */}
      <div className="mt-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Une Confiance Méritée</h3>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Plus de 10 ans d'expérience au service des communautés marocaines. 
              Transparence, efficacité et impact mesurable sont nos engagements.
            </p>
          </div>
          
          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center p-6 bg-gray-50 rounded-2xl border-2 border-gray-200">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Certifié ONG</h4>
              <p className="text-gray-600 text-sm">Agrément officiel du Ministère</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-2xl border-2 border-gray-200">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Prix d'Excellence</h4>
              <p className="text-gray-600 text-sm">Meilleure ONG Santé 2023</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-2xl border-2 border-gray-200">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Impact Vérifié</h4>
              <p className="text-gray-600 text-sm">Audit annuel indépendant</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-2xl border-2 border-gray-200">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-amber-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Note Excellente</h4>
              <p className="text-gray-600 text-sm">4.9/5 par nos bénéficiaires</p>
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-10 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Rejoignez Notre Communauté d'Impact
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
              Chaque don compte. Chaque geste sauve des vies. 
              Ensemble, construisons un avenir plus sain pour le Maroc.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="bg-white bg-opacity-10 rounded-xl px-6 py-3">
                <span className="font-semibold">Prochain objectif : </span>
                <span className="text-blue-200">25,000 MAD d'ici fin du mois</span>
              </div>
              <button 
                onClick={() => setShowSuccess(true)}
                className="bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors flex items-center text-lg"
              >
                <Heart className="h-5 w-5 mr-2" />
                Faire un Don Maintenant
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-10">
            
            {/* Organization Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">MedReads</h3>
                  <p className="text-gray-400">Association Caritative Certifiée</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                Depuis 2014, nous œuvrons pour l'amélioration de l'accès aux soins de santé 
                dans les régions les plus reculées du Maroc. Notre mission : garantir des soins 
                de qualité pour tous, sans distinction.
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>Agrément ONG #MA-2014-0156</span>
                <span>•</span>
                <span>Certifié ISO 9001</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-6 text-white text-lg">Liens Rapides</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">À Propos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Nos Missions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Rapports Annuels</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Témoignages</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partenaires</a></li>
              </ul>
            </div>

            {/* Legal & Contact */}
            <div>
              <h4 className="font-bold mb-6 text-white text-lg">Légal & Contact</h4>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Mentions Légales</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Conditions d'Usage</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Presse</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Devenir Partenaire</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-10 pt-10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2024 Association MedReads. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-6 mt-6 md:mt-0">
              <span className="text-gray-400">Suivez-nous :</span>
              <div className="flex space-x-3">
                <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors">
                  <ExternalLink className="h-5 w-5 text-gray-400" />
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors">
                  <Mail className="h-5 w-5 text-gray-400" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DonatePage;