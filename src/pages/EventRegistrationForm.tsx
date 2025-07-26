import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, Calendar, MapPin, Users, AlertCircle, CheckCircle, BookOpen, Heart, FileText, Clock } from 'lucide-react';
import { dataStore } from '../data'; // Importez dataStore

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
}

interface EventRegistrationFormProps {
  event: Event;
  onBack: () => void;
  onSubmit: (formData: any) => void;
}

const EventRegistrationForm: React.FC<EventRegistrationFormProps> = ({ event, onBack, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Informations personnelles
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    
    // Informations académiques/professionnelles
    institution: '',
    studyLevel: '',
    medicalField: '',
    experience: '',
    
    // Motivations et disponibilités
    motivation: '',
    previousParticipation: false,
    availableFullDay: true,
    transportMode: '',
    
    // Informations médicales (si nécessaire)
    allergies: '',
    medicalConditions: '',
    emergencyContact: '',
    emergencyPhone: '',
    
    // Engagements
    termsAccepted: false,
    dataProcessingAccepted: false,
    communicationsAccepted: false
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (step: number) => {
    const newErrors: {[key: string]: string} = {};

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis';
        if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis';
        if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalide';
        if (!formData.phone.trim()) newErrors.phone = 'Le téléphone est requis';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'La date de naissance est requise';
        if (!formData.gender) newErrors.gender = 'Le genre est requis';
        break;

      case 2:
        if (!formData.institution.trim()) newErrors.institution = 'L\'institution est requise';
        if (!formData.studyLevel) newErrors.studyLevel = 'Le niveau d\'études est requis';
        if (!formData.medicalField) newErrors.medicalField = 'Le domaine médical est requis';
        break;

      case 3:
        if (!formData.motivation.trim()) newErrors.motivation = 'La motivation est requise';
        if (!formData.transportMode) newErrors.transportMode = 'Le mode de transport est requis';
        if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Le contact d\'urgence est requis';
        if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = 'Le téléphone d\'urgence est requis';
        break;

      case 4:
        if (!formData.termsAccepted) newErrors.termsAccepted = 'Vous devez accepter les conditions';
        if (!formData.dataProcessingAccepted) newErrors.dataProcessingAccepted = 'Vous devez accepter le traitement des données';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateStep(4)) return;

  setIsSubmitting(true);
  
  try {
    const registrationData = {
      eventId: event.id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      university: formData.institution,
      year: formData.studyLevel,
      motivation: formData.motivation
    };
    
    dataStore.addRegistration(registrationData);
    
    // Ajoutez cette ligne pour rediriger après 2 secondes
    await new Promise(resolve => setTimeout(resolve, 2000));
    onBack(); // Utilise la fonction de retour fournie par le parent
  } finally {
    setIsSubmitting(false);
  }
};

  const steps = [
    { number: 1, title: 'Informations personnelles', icon: User },
    { number: 2, title: 'Parcours académique', icon: BookOpen },
    { number: 3, title: 'Détails complémentaires', icon: FileText },
    { number: 4, title: 'Confirmation', icon: CheckCircle }
  ];

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
              currentStep >= step.number
                ? 'bg-purple-600 border-purple-600 text-white'
                : 'border-gray-300 text-gray-400'
            }`}>
              {currentStep > step.number ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <step.icon className="h-5 w-5" />
              )}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-0.5 mx-2 transition-colors duration-300 ${
                currentStep > step.number ? 'bg-purple-600' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderFormField = (name: string, label: string, type: string = 'text', options?: string[], placeholder?: string, required: boolean = true) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={formData[name as keyof typeof formData] as string}
          onChange={handleInputChange}
          rows={4}
          placeholder={placeholder}
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 ${
            errors[name] ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}
        />
      ) : type === 'select' ? (
        <select
          name={name}
          value={formData[name as keyof typeof formData] as string}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 ${
            errors[name] ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}
        >
          <option value="">Sélectionner...</option>
          {options?.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name as keyof typeof formData] as string}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 ${
            errors[name] ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}
        />
      )}
      {errors[name] && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {errors[name]}
        </p>
      )}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Informations personnelles</h2>
        <p className="text-gray-600">Commençons par vos informations de base</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {renderFormField('firstName', 'Prénom', 'text', undefined, 'Votre prénom')}
        {renderFormField('lastName', 'Nom', 'text', undefined, 'Votre nom de famille')}
      </div>

      {renderFormField('email', 'Adresse email', 'email', undefined, 'votre.email@exemple.com')}
      {renderFormField('phone', 'Numéro de téléphone', 'tel', undefined, '+212 6 XX XX XX XX')}

      <div className="grid md:grid-cols-2 gap-6">
        {renderFormField('dateOfBirth', 'Date de naissance', 'date')}
        {renderFormField('gender', 'Genre', 'select', ['Homme', 'Femme', 'Autre', 'Préfère ne pas répondre'])}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Parcours académique</h2>
        <p className="text-gray-600">Parlez-nous de votre formation médicale</p>
      </div>

      {renderFormField('institution', 'Institution', 'text', undefined, 'Faculté de Médecine de Tanger')}
      
      <div className="grid md:grid-cols-2 gap-6">
        {renderFormField('studyLevel', 'Niveau d\'études', 'select', [
          '1ère année médecine',
          '2ème année médecine', 
          '3ème année médecine',
          '4ème année médecine',
          '5ème année médecine',
          '6ème année médecine',
          'Interne',
          'Résident',
          'Médecin'
        ])}
        {renderFormField('medicalField', 'Domaine d\'intérêt', 'select', [
          'Médecine générale',
          'Cardiologie',
          'Endocrinologie',
          'Pédiatrie',
          'Gynécologie',
          'Chirurgie',
          'Psychiatrie',
          'Dermatologie',
          'Autres'
        ])}
      </div>

      {renderFormField('experience', 'Expérience préalable', 'textarea', undefined, 'Décrivez toute expérience pertinente dans le bénévolat médical ou les événements caritatifs...', false)}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Détails complémentaires</h2>
        <p className="text-gray-600">Quelques informations supplémentaires pour mieux vous connaître</p>
      </div>

      {renderFormField('motivation', 'Motivation', 'textarea', undefined, 'Pourquoi souhaitez-vous participer à cet événement ?')}

      <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-6">
        <h3 className="font-semibold text-purple-900 mb-4">Disponibilités</h3>
        
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="availableFullDay"
              checked={formData.availableFullDay}
              onChange={handleInputChange}
              className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <span className="text-gray-700">Je suis disponible pour toute la durée de l'événement</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="previousParticipation"
              checked={formData.previousParticipation}
              onChange={handleInputChange}
              className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <span className="text-gray-700">J'ai déjà participé à des événements similaires</span>
          </label>
        </div>
      </div>

      {renderFormField('transportMode', 'Mode de transport', 'select', [
        'Transport personnel',
        'Transport en commun',
        'Covoiturage',
        'Transport organisé',
        'Autre'
      ])}

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h3 className="font-semibold text-amber-900 mb-4 flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          Contact d'urgence
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          {renderFormField('emergencyContact', 'Nom du contact d\'urgence', 'text', undefined, 'Nom complet')}
          {renderFormField('emergencyPhone', 'Téléphone d\'urgence', 'tel', undefined, '+212 6 XX XX XX XX')}
        </div>
      </div>

      <div className="space-y-4">
        {renderFormField('allergies', 'Allergies connues', 'textarea', undefined, 'Mentionnez toute allergie importante...', false)}
        {renderFormField('medicalConditions', 'Conditions médicales', 'textarea', undefined, 'Conditions médicales importantes à signaler...', false)}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirmation d'inscription</h2>
        <p className="text-gray-600">Vérifiez vos informations et confirmez votre inscription</p>
      </div>

      {/* Résumé de l'événement */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
        <h3 className="font-bold text-purple-900 mb-4">Récapitulatif de l'événement</h3>
        <div className="space-y-3">
          <div className="flex items-center text-gray-700">
            <Heart className="h-4 w-4 mr-3 text-purple-500" />
            <span className="font-medium">{event.title}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Calendar className="h-4 w-4 mr-3 text-purple-500" />
            <span>{new Date(event.date).toLocaleDateString('fr-FR')} à {event.time}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <MapPin className="h-4 w-4 mr-3 text-purple-500" />
            <span>{event.location}</span>
          </div>
        </div>
      </div>

      {/* Résumé des informations personnelles */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="font-bold text-gray-900 mb-4">Vos informations</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div><strong>Nom:</strong> {formData.firstName} {formData.lastName}</div>
          <div><strong>Email:</strong> {formData.email}</div>
          <div><strong>Téléphone:</strong> {formData.phone}</div>
          <div><strong>Institution:</strong> {formData.institution}</div>
          <div><strong>Niveau:</strong> {formData.studyLevel}</div>
          <div><strong>Domaine:</strong> {formData.medicalField}</div>
        </div>
      </div>

      {/* Conditions et engagements */}
      <div className="space-y-4">
        <label className="flex items-start">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleInputChange}
            className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1"
          />
          <span className="text-gray-700 text-sm">
            J'accepte les <button type="button" className="text-purple-600 underline">conditions générales</button> et je m'engage à respecter les règles de l'événement.
          </span>
        </label>
        {errors.termsAccepted && (
          <p className="text-sm text-red-600 flex items-center ml-7">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.termsAccepted}
          </p>
        )}

        <label className="flex items-start">
          <input
            type="checkbox"
            name="dataProcessingAccepted"
            checked={formData.dataProcessingAccepted}
            onChange={handleInputChange}
            className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1"
          />
          <span className="text-gray-700 text-sm">
            J'autorise le traitement de mes données personnelles conformément à la <button type="button" className="text-purple-600 underline">politique de confidentialité</button>.
          </span>
        </label>
        {errors.dataProcessingAccepted && (
          <p className="text-sm text-red-600 flex items-center ml-7">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.dataProcessingAccepted}
          </p>
        )}

        <label className="flex items-start">
          <input
            type="checkbox"
            name="communicationsAccepted"
            checked={formData.communicationsAccepted}
            onChange={handleInputChange}
            className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1"
          />
          <span className="text-gray-700 text-sm">
            J'accepte de recevoir des communications concernant cet événement et d'autres événements similaires (optionnel).
          </span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center text-purple-600 hover:text-purple-800 transition-colors duration-200 font-medium"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Event Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-center space-x-4">
            <img
              src={event.image}
              alt={event.title}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>
              <div className="flex items-center text-gray-600 mt-2 space-x-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(event.date).toLocaleDateString('fr-FR')}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {event.time}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {event.location}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          {renderStepIndicator()}
          <div className="text-center">
            <p className="text-gray-600">
              Étape {currentStep} sur {steps.length}: {steps[currentStep - 1].title}
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
          <form onSubmit={handleSubmit} className="p-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Précédent
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Suivant
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Inscription en cours...
                    </div>
                  ) : (
                    'Confirmer l\'inscription'
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventRegistrationForm;