// Dans data.ts
export interface FormQuestion {
  id: string;
  type: 'text' | 'textarea' | 'radio' | 'checkbox' | 'select';
  question: string;
  options?: string[]; // Pour radio, checkbox, select
  required: boolean;
}

export interface Form {
  id: string;
  title: string;
  description: string;
  eventId?: number; // Optionnel: lier à un événement
  questions: FormQuestion[];
  createdAt: string;
  isActive: boolean;
}

export interface FormResponse {
  id: string;
  formId: string;
  respondent: {
    name: string;
    email: string;
  };
  answers: {
    questionId: string;
    answer: string | string[];
  }[];
  submittedAt: string;
}


export interface FeaturedEvent {
  id: number;
  isFeatured?: boolean; // Ajoutez cette propriété
  customTitle?: string;
  customDescription?: string;
  isActive: boolean;
}

export interface RecentActivity {
  id: number;
  title: string;
  description: string;
  date: string;
  type: 'fundraising' | 'volunteering' | 'partnership';
  impact: 'Fort' | 'Élevé' | 'Stratégique';
  isActive: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  image: string;
  isActive: boolean;
}

export interface HomePageSettings {
  featuredEvents: number[]; // Changed from FeaturedEvent[] to number[]
  recentActivities: RecentActivity[];
  testimonials: Testimonial[];
  stats: {
    totalEvents: number;
    totalMembers: number;
    totalBeneficiaries: number;
    yearsActive: number;
  };
}

export interface DonateData {
  amount: number;
  goal: number;
  campaignTitle: string;
  campaignSlogan: string;
  recentContributions: {
    name: string;
    type: string;
    amount: number;
  }[];
}

export interface EventFilterOptions {
  status?: 'upcoming' | 'completed';
  category?: string;
  searchTerm?: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  status: 'upcoming' | 'completed';
  participants: number;
  maxParticipants: number;
  category: string;
  priority: 'high' | 'medium' | 'low';
  rating?: number;
  // Ajoutez ces nouveaux champs
  schedule?: Array<{ time: string; activity: string }>;
  objectives?: string[];
  testimonials?: Array<{ name: string; comment: string; rating: number }>;
  isFeatured: boolean; // Assurez-vous que cette propriété existe
  gallery?: Array<{
    type: 'image' | 'video';
    url: string;
    thumbnail?: string; // Pour les vidéos
    caption?: string;
  }>;

}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  university: string;
  year: string;
  image: string;
  bio: string;
  social: {
    linkedin: string;
  };
  expertise: string[];
}

export interface SiteData {
  home: HomePageSettings;
  donate: DonateData;
  events: Event[];
  about: {
    teamMembers: TeamMember[];
  };
  registrations: Registration[];
}

export interface Registration {
  id: number;
  eventId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  university: string;
  year: string;
  motivation: string;
  registrationDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  // Ajoutez d'autres champs si nécessaire
}

// Données initiales
const initialData: SiteData = {
  home: {
    featuredEvents: [],
    stats: {
      totalEvents: 45,
      totalMembers: 100,
      totalBeneficiaries: 25000,
      yearsActive: 4
    },
    recentActivities: [
      {
        id: 1,
        title: '15 000 DH collectés pour la prochaine caravane',
        description: 'Notre récente campagne de collecte de fonds a dépassé toutes les attentes avec une mobilisation exceptionnelle',
        date: '28 Février 2024',
        type: 'fundraising',
        impact: 'Fort',
        isActive: true
      },
      {
        id: 2,
        title: '200+ Bénévoles pour la Vaccination',
        description: 'La réponse communautaire a été remarquable pour notre initiative de vaccination contre la grippe saisonnière',
        date: '20 Février 2024',
        type: 'volunteering',
        impact: 'Élevé',
        isActive: true
      },
      {
        id: 3,
        title: 'Partenariat avec Clinique Locale',
        description: 'Collaboration établie pour des programmes réguliers de contrôles médicaux préventifs',
        date: '15 Février 2024',
        type: 'partnership',
        impact: 'Stratégique',
        isActive: true
      }
    ],
    testimonials: [
      {
        id: 1,
        name: 'Dr. Amina Benjelloun',
        role: 'Directrice Médicale',
        text: 'MedReads représente l\'avenir de la médecine sociale au Maroc.',
        image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=200',
        isActive: true
      },
      {
        id: 2,
        name: 'Youssef El Mansouri',
        role: 'Étudiant en 5ème année',
        text: 'Une expérience enrichissante qui forme les médecins de demain.',
        image: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=200',
        isActive: true
      }
    ]
  },
  donate: {
    amount: 17000,
    goal: 50000,
    campaignTitle: "Caravane Nationale 2025",
    campaignSlogan: "Objectif : Santé pour Tous",
    recentContributions: [
      { name: "Dr. Rachid Benali", type: "Médecin", amount: 2500 },
      { name: "TechCorp SARL", type: "Entreprise", amount: 5000 },
      { name: "Fondation Al-Khair", type: "Fondation", amount: 10000 },
      { name: "Anonyme", type: "Particulier", amount: 750 }
    ]
  },
  events: [
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
      isFeatured: false,
      maxParticipants: 100,
      category: 'Dépistage Médical',
      priority: 'high',
      rating: 4.9,
      schedule: [
        { time: "09h00 - 12h00", activity: "Accueil et inscription" },
        { time: "12h00 - 13h00", activity: "Pause déjeuner" },
        { time: "13h00 - 16h00", activity: "Consultations médicales" }
      ],
      objectives: [
        "Effectuer 200 dépistages gratuits",
        "Sensibiliser 500 personnes",
        "Identifier les cas à risque"
      ],
      testimonials: [
        {
          name: "Ahmed Benali",
          comment: "Excellent événement, très bien organisé",
          rating: 5
        },
        {
          name: "Fatima Zahra",
          comment: "Service de qualité, merci à toute l'équipe",
          rating: 4
        }
      ],
      gallery: [
      {
        type: 'image',
        url: '/depi.jpg',
        caption: 'Dépistage médical en cours'
      },
      {
        type: 'video',
        url: '/sample-video.mp4',
        thumbnail: '/video-thumbnail.jpg',
        caption: 'Témoignage des participants'
      }
    ]
  }
    
    
  ],
  about: {
    teamMembers: []
  },
  registrations: []
};

// Système de stockage simple (localStorage/sessionStorage alternative)
class DataStore {
  private data: SiteData;
  private forms: Form[]; // Déplacez cette ligne ici pour la rendre accessible
  private formResponses: FormResponse[]; // Idem
  private listeners: Array<(data: SiteData) => void> = [];

  constructor() {
    // Charger toutes les données depuis localStorage
    const savedData = this.loadFromStorage();
    this.data = savedData?.data || initialData;
    this.forms = savedData?.forms || [];
    this.formResponses = savedData?.formResponses || [];
  }

  private loadFromStorage(): { 
    data: SiteData; 
    forms: Form[]; 
    formResponses: FormResponse[] 
  } | null {
    try {
      const saved = localStorage.getItem('medreads_data');
      if (!saved) return null;
      
      const parsed = JSON.parse(saved);
      return {
        data: parsed.data || initialData,
        forms: parsed.forms || [],
        formResponses: parsed.formResponses || []
      };
    } catch {
      return null;
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem('medreads_data', JSON.stringify({
        data: this.data,
        forms: this.forms,
        formResponses: this.formResponses
      }));
    } catch (error) {
      console.warn('Could not save to localStorage:', error);
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.data));
    this.saveToStorage();
  }
  // Dans la classe DataStore
private forms: Form[] = [];
private formResponses: FormResponse[] = [];

// Form CRUD
getForms(): Form[] {
  return [...this.forms];
}

getForm(id: string): Form | undefined {
  return this.forms.find(f => f.id === id);
}

addForm(form: Omit<Form, 'id' | 'createdAt'>): Form {
  const newForm = {
    ...form,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  this.forms.push(newForm);
  this.notifyListeners();
  return newForm;
}

updateForm(id: string, updates: Partial<Form>): boolean {
  const index = this.forms.findIndex(f => f.id === id);
  if (index === -1) return false;
  
  this.forms[index] = { ...this.forms[index], ...updates };
  this.notifyListeners();
  return true;
}

// Responses
getFormResponses(formId: string): FormResponse[] {
  return this.formResponses.filter(r => r.formId === formId);
}
// Dans la classe DataStore, ajoutez :

deleteForm(id: string): boolean {
  const initialLength = this.forms.length;
  this.forms = this.forms.filter(f => f.id !== id);
  this.formResponses = this.formResponses.filter(r => r.formId !== id);
  const deleted = this.forms.length < initialLength;
  if (deleted) this.notifyListeners();
  return deleted;
}

addFormResponse(response: Omit<FormResponse, 'id' | 'submittedAt'>): FormResponse {
  const newResponse = {
    ...response,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString()
  };
  this.formResponses.push(newResponse);
  this.notifyListeners();
  return newResponse;
}
  getHomeSettings(): HomePageSettings {
    return this.data.home;
  }

  updateHomeSettings(updates: Partial<HomePageSettings>): void {
    this.data.home = { ...this.data.home, ...updates };
    this.notifyListeners();
  }

  // Subscribe to data changes
  subscribe(listener: (data: SiteData) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Get data
  getData(): SiteData {
    return { ...this.data };
  }

  // Update home data
  updateHome(updates: Partial<SiteData['home']>): void {
    this.data.home = { ...this.data.home, ...updates };
    this.notifyListeners();
  }

  // Update donation data
  updateDonation(updates: Partial<SiteData['donate']>): void {
    this.data.donate = { ...this.data.donate, ...updates };
    this.notifyListeners();
  }

  // Events CRUD
  getFilteredEvents(options: EventFilterOptions): Event[] {
    return this.data.events.filter(event => {
      const matchesStatus = !options.status || event.status === options.status;
      const matchesCategory = !options.category || event.category === options.category;
      const matchesSearch = !options.searchTerm || 
        event.title.toLowerCase().includes(options.searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(options.searchTerm.toLowerCase());
      
      return matchesStatus && matchesCategory && matchesSearch;
    });
  }
  // Dans data.ts - Vérifiez que ces méthodes sont bien implémentées
// Dans data.ts - Vérifiez que ces méthodes sont bien implémentées
// Dans data.ts
addRecentActivity(activity: Omit<RecentActivity, 'id'>): RecentActivity {
  // Initialise le tableau s'il n'existe pas
  if (!this.data.home.recentActivities) {
    this.data.home.recentActivities = [];
  }

  const newActivity = {
    ...activity,
    id: Date.now() // Génère un ID unique
  };
  
  this.data.home.recentActivities.push(newActivity);
  this.notifyListeners();
  return newActivity;
}

updateRecentActivity(id: number, updates: Partial<RecentActivity>): void {
  const index = this.data.home.recentActivities.findIndex(a => a.id === id);
  if (index !== -1) {
    this.data.home.recentActivities[index] = { 
      ...this.data.home.recentActivities[index], 
      ...updates 
    };
    this.notifyListeners();
  }
}

  // Featured Events
  getFeaturedEvents(): Event[] {
    return this.data.events.filter(event => event.isFeatured);
  }

  updateFeaturedEvents(eventIds: number[]): void {
    // Mettre à jour tous les événements
    this.data.events.forEach(event => {
      event.isFeatured = eventIds.includes(event.id);
    });
    this.data.home.featuredEvents = eventIds;
    this.notifyListeners();
  }

  // Recent Activities
  getRecentActivities(): RecentActivity[] {
    return this.data.home.recentActivities;
  }

 

  deleteRecentActivity(id: number): void {
    this.data.home.recentActivities = this.data.home.recentActivities.filter(a => a.id !== id);
    this.notifyListeners();
  }

  // Testimonials
  getTestimonials(): Testimonial[] {
    return this.data.home.testimonials;
  }

  addTestimonial(testimonial: Omit<Testimonial, 'id'>): Testimonial {
    const newTestimonial = { ...testimonial, id: Date.now() };
    this.data.home.testimonials.push(newTestimonial);
    this.notifyListeners();
    return newTestimonial;
  }

  updateTestimonial(id: number, updates: Partial<Testimonial>): void {
    const index = this.data.home.testimonials.findIndex(t => t.id === id);
    if (index !== -1) {
      this.data.home.testimonials[index] = { 
        ...this.data.home.testimonials[index], 
        ...updates 
      };
      this.notifyListeners();
    }
  }

  deleteTestimonial(id: number): void {
    this.data.home.testimonials = this.data.home.testimonials.filter(t => t.id !== id);
    this.notifyListeners();
  }

  // Méthode pour obtenir les catégories uniques
  getEventCategories(): string[] {
    return [...new Set(this.data.events.map(event => event.category))];
  }

  getEvents(): Event[] {
    return [...this.data.events];
  }

  addEvent(event: Omit<Event, 'id'>): Event {
    const newEvent = { ...event, id: Date.now() };
    this.data.events.push(newEvent);
    this.notifyListeners();
    return newEvent;
  }

  updateEvent(id: number, updates: Partial<Event>): boolean {
  const index = this.data.events.findIndex(e => e.id === id);
  if (index === -1) return false;

  // Fusion sécurisée
  this.data.events[index] = { 
    ...this.data.events[index], 
    ...updates 
  };

  this.notifyListeners();
  return true;
}

  deleteEvent(id: number): boolean {
    const initialLength = this.data.events.length;
    this.data.events = this.data.events.filter(e => e.id !== id);
    
    // Remove from featured events if present
    this.data.home.featuredEvents = this.data.home.featuredEvents.filter(eventId => eventId !== id);
    
    const deleted = this.data.events.length < initialLength;
    if (deleted) this.notifyListeners();
    return deleted;
  }
  resetFeaturedEvents(): void {
    this.data.home.featuredEvents = [];
    this.data.events.forEach(event => {
      event.isFeatured = false;
    });
    this.notifyListeners();
  }
  // Team Members CRUD
  getTeamMembers(): TeamMember[] {
    return [...this.data.about.teamMembers];
  }

  addTeamMember(member: Omit<TeamMember, 'id'>): TeamMember {
    const newMember = { ...member, id: Date.now() };
    this.data.about.teamMembers.push(newMember);
    this.notifyListeners();
    return newMember;
  }

  updateTeamMember(id: number, updates: Partial<TeamMember>): TeamMember | null {
    const index = this.data.about.teamMembers.findIndex(m => m.id === id);
    if (index === -1) return null;
    
    this.data.about.teamMembers[index] = { 
      ...this.data.about.teamMembers[index], 
      ...updates 
    };
    this.notifyListeners();
    return this.data.about.teamMembers[index];
  }

  deleteTeamMember(id: number): boolean {
    const initialLength = this.data.about.teamMembers.length;
    this.data.about.teamMembers = this.data.about.teamMembers.filter(m => m.id !== id);
    const deleted = this.data.about.teamMembers.length < initialLength;
    if (deleted) this.notifyListeners();
    return deleted;
  }

  // Registrations CRUD
  getRegistrations(): Registration[] {
    return [...this.data.registrations];
  }

  addRegistration(registration: Omit<Registration, 'id' | 'registrationDate' | 'status'>): Registration {
    const newRegistration: Registration = {
      ...registration,
      id: Date.now(),
      registrationDate: new Date().toISOString(),
      status: 'pending'
    };
    this.data.registrations.push(newRegistration);
    this.notifyListeners();
    return newRegistration;
  }

  updateRegistrationStatus(id: number, status: Registration['status']): Registration | null {
    const index = this.data.registrations.findIndex(r => r.id === id);
    if (index === -1) return null;
    
    this.data.registrations[index].status = status;
    this.notifyListeners();
    return this.data.registrations[index];
  }

  deleteRegistration(id: number): boolean {
    const initialLength = this.data.registrations.length;
    this.data.registrations = this.data.registrations.filter(r => r.id !== id);
    
    const deleted = this.data.registrations.length < initialLength;
    if (deleted) this.notifyListeners();
    return deleted;
  }

  // Get registrations for specific event
  getEventRegistrations(eventId: number): Registration[] {
    return this.data.registrations.filter(r => r.eventId === eventId);
  }

  // Reset to initial data (useful for testing)
  reset(): void {
    this.data = JSON.parse(JSON.stringify(initialData));
    this.notifyListeners();
  }

  // Export data (for backup)
  exportData(): string {
    return JSON.stringify(this.data, null, 2);
  }

  // Import data (for restore)
  importData(jsonData: string): boolean {
    try {
      const imported = JSON.parse(jsonData);
      this.data = imported;
      this.notifyListeners();
      return true;
    } catch {
      return false;
    }
  }
}

// Create singleton instance
export const dataStore = new DataStore();

// Export current data for backward compatibility
export const siteData = dataStore.getData();

// Deprecated: Keep for backward compatibility
export const saveData = (data: SiteData) => {
  console.warn('saveData is deprecated. Use dataStore methods instead.');
};