import React, { useState } from 'react';
import { DollarSign, Users, Target, Heart, Shield, CheckCircle, Copy, Award, Calendar, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

const DonatePage: React.FC = () => {
  const [copied, setCopied] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Statistiques réalistes
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

  const impactData = [
    { amount: 50, description: "Kit de premiers secours pour une famille", icon: "🏥" },
    { amount: 150, description: "Consultation médicale gratuite", icon: "👩‍⚕️" },
    { amount: 300, description: "Dépistage pour 15 personnes", icon: "🔬" },
    { amount: 750, description: "Campagne de vaccination dans un village", icon: "💉" },
    { amount: 1500, description: "Équipement médical portable", icon: "⚕️" }
  ];

  const recentDonors = [
    { name: 'Dr. Rachid M.', amount: 2500, isVerified: true },
    { name: 'Entreprise TechCorp', amount: 5000, isVerified: true },
    { name: 'Amina K.', amount: 200, isVerified: false },
    { name: 'Fondation Al-Khair', amount: 10000, isVerified: true },
    { name: 'Anonyme', amount: 750, isVerified: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header avec bannière */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur p-4 rounded-full">
                <Heart className="h-12 w-12 text-white animate-pulse" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-4">Soutenez Notre Mission</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Ensemble, nous pouvons transformer des vies en apportant des soins de santé 
              de qualité aux communautés les plus vulnérables du Maroc.
            </p>
            <div className="flex justify-center items-center mt-8 space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold">{donationStats.beneficiaries.toLocaleString()}</div>
                <div className="text-purple-200 text-sm">Bénéficiaires aidés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">45+</div>
                <div className="text-purple-200 text-sm">Missions réalisées</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">12</div>
                <div className="text-purple-200 text-sm">Régions couvertes</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Section principale de don */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Header de la carte */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white">
                <h2 className="text-3xl font-bold mb-2">Faire un Don</h2>
                <p className="text-purple-100">Choisissez votre méthode de paiement préférée</p>
              </div>

              <div className="p-8">
                {showSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      <p className="text-green-800 font-medium">
                        Merci pour votre générosité ! Un reçu fiscal vous sera envoyé par email.
                      </p>
                    </div>
                  </div>
                )}

                {/* Virement Bancaire */}
                <div className="mb-8">
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200">
                    <div className="flex items-center mb-4">
                      <div className="bg-purple-600 p-2 rounded-lg mr-3">
                        <DollarSign className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-purple-800">Virement Bancaire</h3>
                      <div className="ml-auto bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Recommandé
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg border border-purple-200">
                          <p className="text-sm font-medium text-gray-600 mb-1">Nom de la Banque</p>
                          <p className="font-semibold text-gray-900">{bankDetails.bankName}</p>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-purple-200">
                          <p className="text-sm font-medium text-gray-600 mb-1">Bénéficiaire</p>
                          <p className="font-semibold text-gray-900">{bankDetails.beneficiary}</p>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-purple-200">
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-sm font-medium text-gray-600">Code SWIFT/BIC</p>
                          </div>
                          <p className="font-mono font-semibold bg-gray-50 p-2 rounded text-gray-900">
                            {bankDetails.swift}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg border border-purple-200">
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-sm font-medium text-gray-600">RIB</p>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(bankDetails.rib, 'rib')}
                              className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors flex items-center"
                            >
                              <Copy className="h-4 w-4 mr-1" />
                              {copied === 'rib' ? 'Copié!' : 'Copier'}
                            </button>
                          </div>
                          <p className="font-mono font-semibold bg-gray-50 p-2 rounded text-gray-900 break-all">
                            {bankDetails.rib}
                          </p>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-purple-200">
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-sm font-medium text-gray-600">IBAN</p>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(bankDetails.iban, 'iban')}
                              className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors flex items-center"
                            >
                              <Copy className="h-4 w-4 mr-1" />
                              {copied === 'iban' ? 'Copié!' : 'Copier'}
                            </button>
                          </div>
                          <p className="font-mono font-semibold bg-gray-50 p-2 rounded text-gray-900 break-all">
                            {bankDetails.iban}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transfert Wafacash */}
                <div className="mb-8">
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-600 p-2 rounded-lg mr-3">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-green-800">Transfert via Wafacash</h3>
                      <div className="ml-auto bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Instantané
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg border-2 border-green-200">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-600 mb-2">
                            Numéro de téléphone pour le transfert
                          </p>
                          <div className="flex items-center space-x-4">
                            <p className="font-mono font-bold text-2xl text-green-800">{wafacashNumber}</p>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(wafacashNumber, 'wafa')}
                              className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium hover:bg-green-200 transition-colors flex items-center"
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              {copied === 'wafa' ? 'Copié!' : 'Copier le numéro'}
                            </button>
                          </div>
                          <p className="text-sm font-medium text-gray-700 mt-2">
                            Nom du bénéficiaire : <span className="font-bold">Association MedReads</span>
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-green-800">
                          <strong>Instructions :</strong> Après le transfert, veuillez envoyer une capture d'écran 
                          du reçu à <span className="font-mono">donations@medreads.org</span> pour confirmation 
                          et réception de votre reçu fiscal.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section sécurité et garanties */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <div className="flex items-center mb-4">
                    <Shield className="h-6 w-6 text-gray-600 mr-3" />
                    <h4 className="font-bold text-gray-900">Sécurité et Transparence</h4>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>100% des dons utilisés pour les missions caritatives</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Reçus fiscaux déductibles d'impôts</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Rapports d'activité publics disponibles</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Carte de progression */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                <h3 className="text-xl font-bold">Objectif 2024</h3>
                <p className="text-blue-100 text-sm">Campagne nationale de santé</p>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Collecté</span>
                    <span>{Math.round(progressPercentage)}% de l'objectif</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-gray-900 mt-2">
                    <span>{donationStats.totalRaised.toLocaleString()} MAD</span>
                    <span>{donationStats.goal.toLocaleString()} MAD</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="flex justify-center mb-2">
                      <div className="bg-purple-600 p-2 rounded-full">
                        <DollarSign className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {(donationStats.totalRaised / 1000).toFixed(0)}K
                    </div>
                    <div className="text-xs text-gray-600">MAD Collectés</div>
                  </div>

                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="flex justify-center mb-2">
                      <div className="bg-green-600 p-2 rounded-full">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{donationStats.donorCount}</div>
                    <div className="text-xs text-gray-600">Donateurs</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact des dons */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Target className="h-5 w-5 text-purple-600 mr-2" />
                Impact de Votre Don
              </h3>
              <div className="space-y-4">
                {impactData.map((impact, index) => (
                  <div key={index} className="flex items-center p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                    <div className="text-2xl mr-4">{impact.icon}</div>
                    <div className="flex-1">
                      <div className="font-bold text-purple-700">{impact.amount} MAD</div>
                      <div className="text-sm text-gray-700">{impact.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Derniers donateurs */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Award className="h-5 w-5 text-yellow-600 mr-2" />
                Derniers Donateurs
              </h3>
              <div className="space-y-3">
                {recentDonors.map((donor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                        {donor.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900">{donor.name}</span>
                          {donor.isVerified && (
                            <CheckCircle className="h-4 w-4 text-blue-500 ml-1" />
                          )}
                        </div>
                        <div className="text-xs text-gray-500">{donor.time}</div>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-purple-600">
                      {donor.amount.toLocaleString()} MAD
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl shadow-lg text-white p-6">
              <h3 className="text-xl font-bold mb-4">Besoin d'Aide ?</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3" />
                  <span>zaoujalyoussef1@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-3" />
                  <span>+212 5 22 XX XX XX</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-3" />
                  <span>Tanger, Maroc</span>
                </div>
              </div>
              <button className="w-full mt-4 bg-white text-purple-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center">
                <ExternalLink className="h-4 w-4 mr-2" />
                Nous Contacter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer section */}
      <div className="mt-16 bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Merci pour Votre Confiance</h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Votre générosité nous permet de continuer notre mission d'apporter des soins de santé 
            de qualité aux communautés les plus vulnérables. Ensemble, nous faisons la différence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;