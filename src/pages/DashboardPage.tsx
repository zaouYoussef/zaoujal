// src/pages/admin/DashboardPage.tsx
import React, { useState, useEffect } from 'react';
import { 
  Calendar, Users, DollarSign, Home, FileText, Plus, Edit, Trash2, 
  Save, ArrowLeft, Clock, MapPin, Award, Linkedin, Eye, CheckCircle,
  X, Download, Upload, BarChart3, TrendingUp, UserPlus, Mail, Phone,User,Star
} from 'lucide-react';
import { dataStore, Event, TeamMember, Registration,DonateData,RecentActivity,editingAc } from '../data';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [data, setData] = useState(dataStore.getData());
const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  // Supprimez ces lignes si elles existent
  const [editingActivity, setEditingActivity] = useState(null);
  const [forms, setForms] = useState(dataStore.getForms()); // Ajoutez cet état
  const [formData, setFormData] = useState<Event>({
  ...event,
  gallery: event.gallery || []
});

// Et toutes les références à editingActivity dans les modals
 
useEffect(() => {
    const unsubscribe = dataStore.subscribe(() => {
      setData(dataStore.getData());
      setForms(dataStore.getForms()); // Mettez à jour les formulaires aussi
    });
    return unsubscribe;
  }, []);
  // Dans DashboardPage.tsx

useEffect(() => {
  // Charger les inscriptions initiales
  setRegistrations(dataStore.getRegistrations());
  
  // S'abonner aux changements
  const unsubscribe = dataStore.subscribe(() => {
    setRegistrations(dataStore.getRegistrations());
  });
  
  return unsubscribe;
}, []);

  // Tab components
// Mettre à jour la liste des onglets
const tabs = [
  { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
  { id: 'home-content', label: 'Contenu Accueil', icon: Home },
  { id: 'donate', label: 'Dons', icon: DollarSign },
  { id: 'events', label: 'Événements', icon: Calendar },
  { id: 'activities', label: 'Activités', icon: TrendingUp },
  { id: 'team', label: 'Équipe', icon: Users },
  { id: 'registrations', label: 'Inscriptions', icon: UserPlus },
  { id: 'forms', label: 'Formulaires', icon: FileText },

];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord Admin</h1>
              <p className="text-gray-600">Gérez votre site web MedReads</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  const dataStr = dataStore.exportData();
                  const blob = new Blob([dataStr], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `medreads-backup-${new Date().toISOString().split('T')[0]}.json`;
                  a.click();
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download size={18} />
                Exporter
              </button>
              <button
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = '.json';
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        const content = e.target?.result as string;
                        if (dataStore.importData(content)) {
                          alert('Données importées avec succès!');
                        } else {
                          alert('Erreur lors de l\'importation des données');
                        }
                      };
                      reader.readAsText(file);
                    }
                  };
                  input.click();
                }}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Upload size={18} />
                Importer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && <OverviewTab data={data} registrations={registrations} />}
        {activeTab === 'home' && <HomeTab data={data} />}
        {activeTab === 'donate' && <DonateTab data={data} />}
        {activeTab === 'events' && <EventsTab events={data.events} onEdit={setEditingEvent} />}
        {activeTab === 'team' && <TeamTab team={data.about.teamMembers} onEdit={setEditingMember} />}
        {activeTab === 'registrations' && <RegistrationsTab registrations={registrations} events={data.events} />}
        {activeTab === 'activities' && <ActivitiesTab activities={data.home.recentActivities} />}
        {activeTab === 'forms' && <FormsTab forms={dataStore.getForms()} />}


       
      </div>

      {/* Modals */}
      {editingEvent && (
        <EventFormModal
          event={editingEvent}
          onSave={(event) => {
            if (event.id) {
              dataStore.updateEvent(event.id, event);
            } else {
              dataStore.addEvent(event);
            }
            setEditingEvent(null);
            setData(dataStore.getData()); // Force refresh
          }}
          onClose={() => setEditingEvent(null)}
        />
      )}

      {editingMember && (
        <MemberFormModal
          member={editingMember}
          onSave={(member) => {
            if (member.id) {
              dataStore.updateTeamMember(member.id, member);
            } else {
              dataStore.addTeamMember(member);
            }
            setEditingMember(null);
          }}
          onClose={() => setEditingMember(null)}
        />
      )}
    </div>
  );
};






































// Overview Tab Component
const OverviewTab = ({ data, registrations }: { data: any, registrations: Registration[] }) => {
  const stats = [
    {
      label: 'Total Événements',
      value: data.events.length,
      icon: Calendar,
      color: 'bg-blue-500',
      change: '+2 ce mois'
    },
    {
      label: 'Membres Équipe',
      value: data.about.teamMembers.length,
      icon: Users,
      color: 'bg-green-500',
      change: '+1 récemment'
    },
    {
      label: 'Inscriptions',
      value: registrations.length,
      icon: UserPlus,
      color: 'bg-purple-500',
      change: `+${registrations.filter(r => r.status === 'pending').length} en attente`
    },
    {
      label: 'Fonds Collectés',
      value: `${data.donate.amount.toLocaleString()} MAD`,
      icon: DollarSign,
      color: 'bg-yellow-500',
      change: `${Math.round((data.donate.amount / data.donate.goal) * 100)}% de l'objectif`
    }
  ];

  const recentActivity = [
    { action: 'Nouvel événement créé', item: 'Dépistage Médical', time: '2h', type: 'success' },
    { action: 'Inscription reçue', item: 'Dr. Ahmed Benali', time: '4h', type: 'info' },
    { action: 'Don reçu', item: '2,500 MAD', time: '6h', type: 'warning' },
    { action: 'Membre ajouté', item: 'Dr. Fatima Zahra', time: '1j', type: 'success' }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                <stat.icon size={24} />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-xs text-green-600">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Activité Récente</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'info' ? 'bg-blue-500' :
                  activity.type === 'warning' ? 'bg-yellow-500' : 'bg-gray-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.item}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Actions Rapides</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-blue-900">Nouvel Événement</p>
            </button>
            <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-green-900">Ajouter Membre</p>
            </button>
            <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-purple-900">Mettre à jour Dons</p>
            </button>
            <button className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
              <FileText className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-yellow-900">Gérer Inscriptions</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};









// Home Tab Component
const HomeTab = ({ data }: { data: any }) => {
  const [featuredEvents, setFeaturedEvents] = useState(data.home.featuredEvents);
  const [stats, setStats] = useState(data.home.stats);

  const updateFeaturedEvents = (eventIds: number[]) => {
    setFeaturedEvents(eventIds);
    dataStore.updateHome({ featuredEvents: eventIds });
  };

  const updateStats = (newStats: any) => {
    setStats(newStats);
    dataStore.updateHome({ stats: newStats });
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Configuration Page d'Accueil</h2>
        
        {/* Featured Events */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Événements en Vedette</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {data.events.filter((e: Event) => featuredEvents.includes(e.id)).map((event: Event) => (
              <div key={event.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h4 className="font-medium text-gray-900">{event.title}</h4>
                <p className="text-sm text-gray-600">{event.date}</p>
                <button 
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                  onClick={() => updateFeaturedEvents(featuredEvents.filter(id => id !== event.id))}
                >
                  Retirer
                </button>
              </div>
            ))}
          </div>
          
          <select
            className="w-full border border-gray-300 rounded-lg p-3"
            onChange={(e) => {
              const id = Number(e.target.value);
              if (id && !featuredEvents.includes(id) && featuredEvents.length < 3) {
                updateFeaturedEvents([...featuredEvents, id]);
              }
            }}
          >
            <option value="">Ajouter un événement en vedette</option>
            {data.events
              .filter((e: Event) => !featuredEvents.includes(e.id))
              .map((event: Event) => (
                <option key={event.id} value={event.id}>{event.title}</option>
              ))}
          </select>
        </div>

        {/* Statistics */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Statistiques d'Accueil</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Événements</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg p-3"
                value={stats.totalEvents}
                onChange={(e) => updateStats({ ...stats, totalEvents: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Membres</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg p-3"
                value={stats.totalMembers}
                onChange={(e) => updateStats({ ...stats, totalMembers: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bénéficiaires</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg p-3"
                value={stats.totalBeneficiaries}
                onChange={(e) => updateStats({ ...stats, totalBeneficiaries: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Années Actives</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg p-3"
                value={stats.yearsActive}
                onChange={(e) => updateStats({ ...stats, yearsActive: Number(e.target.value) })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};










// Dans DashboardPage.tsx, ajoutez ce composant










const FormsTab = ({ forms }: { forms: Form[] }) => {
  const [editingForm, setEditingForm] = useState<Form | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [activeFormId, setActiveFormId] = useState<string | null>(null);
  const [responses, setResponses] = useState<FormResponse[]>([]);

  useEffect(() => {
    if (activeFormId) {
      setResponses(dataStore.getFormResponses(activeFormId));
    }
  }, [activeFormId]);

  const handleDelete = (id: string) => {
    if (confirm("Supprimer ce formulaire et toutes ses réponses ?")) {
      dataStore.deleteForm(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingForm) return;

    try {
      if (!editingForm.title || !editingForm.description) {
        throw new Error("Titre et description sont obligatoires");
      }

      if (isAdding) {
        dataStore.addForm(editingForm);
      } else {
        dataStore.updateForm(editingForm.id, editingForm);
      }

      setEditingForm(null);
      setIsAdding(false);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erreur inconnue");
    }
  };

  const addQuestion = () => {
    if (!editingForm) return;
    
    setEditingForm({
      ...editingForm,
      questions: [
        ...editingForm.questions,
        {
          id: `q-${Date.now()}`,
          type: 'text',
          question: '',
          required: false
        }
      ]
    });
  };

  const removeQuestion = (id: string) => {
    if (!editingForm) return;
    
    setEditingForm({
      ...editingForm,
      questions: editingForm.questions.filter(q => q.id !== id)
    });
  };

  const updateQuestion = (id: string, updates: Partial<FormQuestion>) => {
    if (!editingForm) return;
    
    setEditingForm({
      ...editingForm,
      questions: editingForm.questions.map(q => 
        q.id === id ? { ...q, ...updates } : q
      )
    });
  };

  return (
    <div className="space-y-6">
      {/* Liste des formulaires */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Gestion des Formulaires</h2>
          <button
            onClick={() => {
              setEditingForm({
                title: '',
                description: '',
                questions: [],
                isActive: true,
                eventId: undefined
              });
              setIsAdding(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} />
            Nouveau Formulaire
          </button>
        </div>

        {forms.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Aucun formulaire disponible
          </div>
        ) : (
          <div className="space-y-4">
            {forms.map(form => (
              <div key={form.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{form.title}</h3>
                    <p className="text-sm text-gray-600">{form.description}</p>
                    <div className="flex gap-2 mt-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        form.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {form.isActive ? 'Actif' : 'Inactif'}
                      </span>
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {form.questions.length} questions
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingForm(form);
                        setIsAdding(false);
                      }}
                      className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(form.id)}
                      className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button
                      onClick={() => setActiveFormId(activeFormId === form.id ? null : form.id)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </div>

                {activeFormId === form.id && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium mb-2">Réponses ({responses.length})</h4>
                    {responses.length > 0 ? (
                      <div className="space-y-4">
                        {responses.map((response, idx) => (
                          <div key={response.id} className="border border-gray-200 rounded-lg p-3">
                            <div className="font-medium">
                              {response.respondent.name} - {new Date(response.submittedAt).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-gray-600">{response.respondent.email}</div>
                            
                            <div className="mt-2 space-y-2">
                              {response.answers.map((answer, ansIdx) => {
                                const question = form.questions.find(q => q.id === answer.questionId);
                                return (
                                  <div key={ansIdx} className="text-sm">
                                    <div className="font-medium">{question?.question || 'Question inconnue'}</div>
                                    <div className="text-gray-700">
                                      {Array.isArray(answer.answer) 
                                        ? answer.answer.join(', ') 
                                        : answer.answer}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-500 text-sm">Aucune réponse pour ce formulaire</div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de création/édition */}
      {editingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {isAdding ? 'Nouveau Formulaire' : 'Modifier Formulaire'}
              </h3>
              <button 
                onClick={() => {
                  setEditingForm(null);
                  setIsAdding(false);
                }} 
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2"
                    value={editingForm.title}
                    onChange={(e) => setEditingForm({...editingForm, title: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg p-2"
                    rows={3}
                    value={editingForm.description}
                    onChange={(e) => setEditingForm({...editingForm, description: e.target.value})}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={editingForm.isActive} 
                        onChange={(e) => setEditingForm({
                          ...editingForm,
                          isActive: e.target.checked
                        })}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      <span className="ml-3 text-sm font-medium text-gray-900">
                        {editingForm.isActive ? 'Actif' : 'Inactif'}
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Événement associé</label>
                    <select
                      className="w-full border border-gray-300 rounded-lg p-2"
                      value={editingForm.eventId || ''}
                      onChange={(e) => setEditingForm({
                        ...editingForm,
                        eventId: e.target.value ? Number(e.target.value) : undefined
                      })}
                    >
                      <option value="">Aucun événement spécifique</option>
                      {dataStore.getEvents().map(event => (
                        <option key={event.id} value={event.id}>{event.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Questions</h4>
                    <button
                      type="button"
                      onClick={addQuestion}
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                    >
                      <Plus size={16} />
                      Ajouter une question
                    </button>
                  </div>

                  <div className="space-y-4">
                    {editingForm.questions.map((question, index) => (
                      <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm font-medium text-gray-700">
                            Question #{index + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeQuestion(question.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Texte de la question *</label>
                            <input
                              type="text"
                              className="w-full border border-gray-300 rounded-lg p-2"
                              value={question.question}
                              onChange={(e) => updateQuestion(question.id, { question: e.target.value })}
                              required
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                              <select
                                className="w-full border border-gray-300 rounded-lg p-2"
                                value={question.type}
                                onChange={(e) => updateQuestion(question.id, { 
                                  type: e.target.value as FormQuestion['type'],
                                  options: e.target.value === 'text' || e.target.value === 'textarea' 
                                    ? undefined 
                                    : question.options || ['']
                                })}
                              >
                                <option value="text">Texte court</option>
                                <option value="textarea">Texte long</option>
                                <option value="radio">Choix unique</option>
                                <option value="checkbox">Choix multiples</option>
                                <option value="select">Liste déroulante</option>
                              </select>
                            </div>

                            <div>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={question.required}
                                  onChange={(e) => updateQuestion(question.id, { required: e.target.checked })}
                                  className="mr-2"
                                />
                                <span className="text-sm text-gray-700">Réponse obligatoire</span>
                              </label>
                            </div>
                          </div>

                          {(question.type === 'radio' || question.type === 'checkbox' || question.type === 'select') && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Options *</label>
                              <div className="space-y-2">
                                {question.options?.map((option, optIdx) => (
                                  <div key={optIdx} className="flex items-center gap-2">
                                    <input
                                      type="text"
                                      className="flex-1 border border-gray-300 rounded-lg p-2"
                                      value={option}
                                      onChange={(e) => {
                                        const newOptions = [...question.options || []];
                                        newOptions[optIdx] = e.target.value;
                                        updateQuestion(question.id, { options: newOptions });
                                      }}
                                      required
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const newOptions = [...question.options || []];
                                        newOptions.splice(optIdx, 1);
                                        updateQuestion(question.id, { options: newOptions });
                                      }}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <X size={16} />
                                    </button>
                                  </div>
                                ))}
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newOptions = [...question.options || [], ''];
                                    updateQuestion(question.id, { options: newOptions });
                                  }}
                                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                                >
                                  <Plus size={14} />
                                  Ajouter une option
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t mt-6">
                <button 
                  type="button"
                  onClick={() => {
                    setEditingForm(null);
                    setIsAdding(false);
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Save size={18} />
                  {isAdding ? 'Créer' : 'Mettre à jour'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

































const ActivitiesTab = ({ activities = [] }: { activities?: RecentActivity[] }) => {
  const [editingActivity, setEditingActivity] = useState<RecentActivity | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Gère la suppression d'une activité
  const handleDelete = (id: number) => {
    if (confirm("Supprimer cette activité ?")) {
      dataStore.deleteRecentActivity(id);
    }
  };

  // Bascule le statut actif/inactif
  const handleStatusToggle = (id: number, isActive: boolean) => {
    dataStore.updateRecentActivity(id, { isActive });
  };

  // Soumission du formulaire
 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!editingActivity) {
    console.error("Aucune activité à éditer");
    return;
  }

  try {
    // Validation
    if (!editingActivity.title?.trim() || 
        !editingActivity.description?.trim() || 
        !editingActivity.date?.trim()) {
      throw new Error("Tous les champs obligatoires doivent être remplis");
    }

    // Sauvegarde
    let result: RecentActivity;
    if (isAdding) {
      const { id, ...activityData } = editingActivity;
      result = dataStore.addRecentActivity(activityData);
      console.log("Nouvelle activité créée:", result);
    } else {
      dataStore.updateRecentActivity(editingActivity.id, editingActivity);
      console.log("Activité mise à jour:", editingActivity.id);
    }

    // Fermeture du modal
    setEditingActivity(null);
    setIsAdding(false);

  } catch (error) {
    console.error("Échec de la sauvegarde:", {
      error,
      activity: editingActivity,
      isAdding,
      time: new Date().toISOString()
    });
    
    alert(`Erreur lors de la sauvegarde: ${
      error instanceof Error ? error.message : 'Veuillez vérifier les données et réessayer'
    }`);
  }
};

  // Ouvre le modal pour créer une nouvelle activité
  const handleAddNew = () => {
    setEditingActivity({
      id: 0, // ID temporaire qui sera remplacé
      title: '',
      description: '',
      date: new Date().toLocaleDateString('fr-FR'),
      type: 'fundraising',
      impact: 'Fort',
      isActive: true
    });
    setIsAdding(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Gestion des Activités Récentes</h2>
          <button
            onClick={handleAddNew}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} />
            Nouvelle Activité
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{activity.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{activity.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activity.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        activity.type === 'fundraising' ? 'bg-green-100 text-green-800' :
                        activity.type === 'volunteering' ? 'bg-purple-100 text-purple-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {activity.type === 'fundraising' ? 'Collecte' : 
                         activity.type === 'volunteering' ? 'Bénévolat' : 'Partenariat'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        activity.impact === 'Fort' ? 'bg-green-100 text-green-800' :
                        activity.impact === 'Élevé' ? 'bg-purple-100 text-purple-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {activity.impact}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={activity.isActive} 
                          onChange={(e) => handleStatusToggle(activity.id, e.target.checked)}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900">
                          {activity.isActive ? 'Actif' : 'Inactif'}
                        </span>
                      </label>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingActivity(activity);
                            setIsAdding(false);
                          }}
                          className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                          title="Modifier"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(activity.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                          title="Supprimer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    Aucune activité trouvée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de création/édition */}
      {editingActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {isAdding ? 'Nouvelle Activité' : 'Modifier Activité'}
              </h3>
              <button 
                onClick={() => {
                  setEditingActivity(null);
                  setIsAdding(false);
                }} 
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2"
                    value={editingActivity.title}
                    onChange={(e) => setEditingActivity({
                      ...editingActivity,
                      title: e.target.value
                    })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg p-2"
                    rows={3}
                    value={editingActivity.description}
                    onChange={(e) => setEditingActivity({
                      ...editingActivity,
                      description: e.target.value
                    })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg p-2"
                      value={editingActivity.date}
                      onChange={(e) => setEditingActivity({
                        ...editingActivity,
                        date: e.target.value
                      })}
                      placeholder="15 Février 2024"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                    <select
                      className="w-full border border-gray-300 rounded-lg p-2"
                      value={editingActivity.type}
                      onChange={(e) => setEditingActivity({
                        ...editingActivity, 
                        type: e.target.value as 'fundraising' | 'volunteering' | 'partnership'
                      })}
                      required
                    >
                      <option value="fundraising">Collecte de fonds</option>
                      <option value="volunteering">Bénévolat</option>
                      <option value="partnership">Partenariat</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Impact *</label>
                    <select
                      className="w-full border border-gray-300 rounded-lg p-2"
                      value={editingActivity.impact}
                      onChange={(e) => setEditingActivity({
                        ...editingActivity, 
                        impact: e.target.value as 'Fort' | 'Élevé' | 'Stratégique'
                      })}
                      required
                    >
                      <option value="Fort">Fort</option>
                      <option value="Élevé">Élevé</option>
                      <option value="Stratégique">Stratégique</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                    <div className="flex items-center mt-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={editingActivity.isActive} 
                          onChange={(e) => setEditingActivity({
                            ...editingActivity,
                            isActive: e.target.checked
                          })}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900">
                          {editingActivity.isActive ? 'Actif' : 'Inactif'}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t mt-6">
                <button 
                  type="button"
                  onClick={() => {
                    setEditingActivity(null);
                    setIsAdding(false);
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Save size={18} />
                  {isAdding ? 'Créer' : 'Mettre à jour'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

















































// Donate Tab Component
const DonateTab = ({ data }: { data: any }) => {
  const [donateData, setDonateData] = useState({
      ...data.donate,
      recentContributions: data.donate.recentContributions || [] // Valeur par défaut
    });
  const updateDonation = (updates: Partial<DonateData>) => {
    const newData = { ...donateData, ...updates };
    setDonateData(newData);
    dataStore.updateDonation(newData);
  };

  const updateContribution = (index: number, contribution: any) => {
    const newContributions = [...donateData.recentContributions];
    newContributions[index] = contribution;
    updateDonation({ recentContributions: newContributions });
  };

  const addContribution = () => {
    const newContributions = [
      ...donateData.recentContributions,
      { name: "Nouveau Donateur", type: "Particulier", amount: 100 }
    ];
    updateDonation({ recentContributions: newContributions });
  };

  const removeContribution = (index: number) => {
    const newContributions = donateData.recentContributions.filter((_, i) => i !== index);
    updateDonation({ recentContributions: newContributions });
  };

  const progressPercentage = (donateData.amount / donateData.goal) * 100;

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Gestion des Dons</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Titre de la Campagne</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3"
                value={donateData.campaignTitle}
                onChange={(e) => updateDonation({ campaignTitle: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Slogan</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3"
                value={donateData.campaignSlogan}
                onChange={(e) => updateDonation({ campaignSlogan: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Montant Actuel (MAD)</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg p-3"
                value={donateData.amount}
                onChange={(e) => updateDonation({ amount: Number(e.target.value) })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Objectif (MAD)</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg p-3"
                value={donateData.goal}
                onChange={(e) => updateDonation({ goal: Number(e.target.value) })}
              />
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Aperçu</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{donateData.campaignTitle}</div>
                <div className="text-gray-600">{donateData.campaignSlogan}</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {donateData.amount.toLocaleString()} MAD
                </div>
                <div className="text-gray-600">collectés</div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full" 
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                ></div>
              </div>
              
              <div className="text-center">
                <div className="text-xl font-semibold text-gray-900">
                  {donateData.goal.toLocaleString()} MAD
                </div>
                <div className="text-gray-600">objectif</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gestion des contributions */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Contributions Récentes</h3>
          <button
            onClick={addContribution}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} />
            Ajouter
          </button>
        </div>
        
        <div className="space-y-4">
          {donateData.recentContributions.map((contribution: any, index: number) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex-1">
                <input
                  type="text"
                  className="w-full border-b border-gray-300 bg-transparent p-2 mb-2"
                  value={contribution.name}
                  onChange={(e) => updateContribution(index, {
                    ...contribution,
                    name: e.target.value
                  })}
                />
                <select
                  className="w-full border-b border-gray-300 bg-transparent p-2"
                  value={contribution.type}
                  onChange={(e) => updateContribution(index, {
                    ...contribution,
                    type: e.target.value
                  })}
                >
                  <option value="Médecin">Médecin</option>
                  <option value="Entreprise">Entreprise</option>
                  <option value="Fondation">Fondation</option>
                  <option value="Particulier">Particulier</option>
                </select>
              </div>
              <div className="flex items-center gap-4 ml-4">
                <input
                  type="number"
                  className="w-24 border-b border-gray-300 bg-transparent p-2 text-right"
                  value={contribution.amount}
                  onChange={(e) => updateContribution(index, {
                    ...contribution,
                    amount: Number(e.target.value)
                  })}
                />
                <span className="text-gray-500">MAD</span>
                <button
                  onClick={() => removeContribution(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Events Tab Component
// Dans EventsTab component


const EventsTab = ({ events, onEdit }: { events: Event[], onEdit: (event: Event | null) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  
  // Extraire toutes les catégories uniques
  const categories = [...new Set(events.map(event => event.category))];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Gestion des Événements</h2>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
            onClick={() => onEdit({
              id: 0,
              title: '',
              date: new Date().toISOString().split('T')[0],
              time: '09h00 - 17h00',
              location: '',
              description: '',
              image: '',
              status: 'upcoming',
              participants: 0,
              maxParticipants: 100,
              category: '',
              priority: 'medium',
              rating: 4.5
            })}
          >
            <Plus size={18} />
            Nouvel Événement
          </button>
        </div>
        
        {/* Filtres améliorés */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recherche</label>
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              <option value="upcoming">À venir</option>
              <option value="completed">Terminés</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">Toutes catégories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tableau amélioré */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Lieu</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-lg object-cover" src={event.image} alt={event.title} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{event.title}</div>
                          <div className="text-sm text-gray-500">{event.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(event.date).toLocaleDateString('fr-FR', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </div>
                      <div className="text-sm text-gray-500">{event.time}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{event.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {event.participants}/{event.maxParticipants}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ 
                            width: `${Math.min(
                              (event.participants / event.maxParticipants) * 100, 
                              100
                            )}%` 
                          }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        event.status === 'upcoming' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {event.status === 'upcoming' ? 'À venir' : 'Terminé'}
                      </span>
                      {event.priority === 'high' && (
                        <span className="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          Priorité haute
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => onEdit(event)}
                          className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                          title="Modifier"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Supprimer l'événement "${event.title}" ?`)) {
                              dataStore.deleteEvent(event.id);
                            }
                          }}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                          title="Supprimer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    Aucun événement trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


// Team Tab Component
// Dans DashboardPage.tsx
const TeamTab = ({ team, onEdit }: { team: TeamMember[], onEdit: (member: TeamMember | null) => void }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Gestion des Membres</h2>
          <button
            onClick={() => onEdit({} as TeamMember)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} />
            Nouveau Membre
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <div key={member.id} className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                {member.image ? (
                  <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                ) : (
                  <Users size={48} className="text-gray-400" />
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-blue-600 font-medium">{member.role}</p>
                <p className="text-sm text-gray-600 mt-1">{member.university}</p>
                <p className="text-xs text-gray-500">{member.year}</p>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {member.expertise?.slice(0, 2).map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => onEdit(member)}
                    className="flex-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    <Edit size={14} className="inline mr-1" />
                    Modifier
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Supprimer ${member.name} ?`)) {
                        dataStore.deleteTeamMember(member.id);
                      }
                    }}
                    className="flex-1 text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    <Trash2 size={14} className="inline mr-1" />
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
// Registrations Tab Component
const RegistrationsTab = ({ registrations, events }: { registrations: Registration[], events: Event[] }) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');

  const filteredRegistrations = registrations.filter(reg => 
    filter === 'all' || reg.status === filter
  );

  const updateStatus = (id: number, status: Registration['status']) => {
    dataStore.updateRegistrationStatus(id, status);
  };

  const getEventTitle = (eventId: number) => {
    const event = events.find(e => e.id === eventId);
    return event ? event.title : 'Événement inconnu';
  };

  const updateRegistrationStatus = (id: number, status: Registration['status']) => {
    dataStore.updateRegistrationStatus(id, status);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Gestion des Inscriptions</h2>
          <select
            className="border border-gray-300 rounded-lg px-4 py-2"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Toutes</option>
            <option value="pending">En attente</option>
            <option value="confirmed">Confirmées</option>
            <option value="cancelled">Annulées</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Événement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date d'inscription
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRegistrations.map((registration) => (
                <tr key={registration.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {registration.firstName} {registration.lastName}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <Mail size={12} />
                        {registration.email}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <Phone size={12} />
                        {registration.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{getEventTitle(registration.eventId)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(registration.registrationDate).toLocaleDateString('fr-FR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      registration.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      registration.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {registration.status === 'pending' ? 'En attente' :
                       registration.status === 'confirmed' ? 'Confirmée' :
                       'Annulée'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      {registration.status === 'pending' && (
                        <>
                          <button
                            className="text-green-600 hover:text-green-900"
                            onClick={() => updateRegistrationStatus(registration.id, 'confirmed')}
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => updateRegistrationStatus(registration.id, 'cancelled')}
                          >
                            <X size={16} />
                          </button>
                        </>
                      )}
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => {
                          if (confirm('Supprimer cette inscription ?')) {
                            dataStore.deleteRegistration(registration.id);
                          }
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredRegistrations.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Aucune inscription trouvée
          </div>
        )}
      </div>
    </div>
  );
};


// Event Form Modal









const EventFormModal = ({ event, onSave, onClose }: {
  event: Event,
  onSave: (event: Event) => void,
  onClose: () => void
}) => {
  const [galleryItems, setGalleryItems] = useState<Array<{
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  caption?: string;
}>>(formData.gallery || []);

const [newGalleryItem, setNewGalleryItem] = useState({
  type: 'image' as 'image' | 'video',
  url: '',
  thumbnail: '',
  caption: ''
});
  const [formData, setFormData] = useState<Event>(event);
  const [imagePreview, setImagePreview] = useState(event.image || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [scheduleItems, setScheduleItems] = useState<Array<{ time: string; activity: string }>>(formData.schedule || []);
  const [newScheduleItem, setNewScheduleItem] = useState({ time: '', activity: '' });

  const [objectives, setObjectives] = useState<string[]>(formData.objectives || []);
  const [newObjective, setNewObjective] = useState('');

  const [testimonials, setTestimonials] = useState<Array<{ name: string; comment: string; rating: number }>>(formData.testimonials || []);
  const [newTestimonial, setNewTestimonial] = useState({ name: '', comment: '', rating: 5 });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData({ ...formData, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  // Valider les champs obligatoires
  if (!formData.title || !formData.description || !formData.date) {
    alert("Veuillez remplir tous les champs obligatoires");
    return;
  }

  try {
    // Préparer l'événement complet avec les données supplémentaires
    const eventToSave = {
      ...formData,
      schedule: scheduleItems,
      objectives: objectives,
      testimonials: testimonials,
        gallery: galleryItems

    };

    // Appeler la fonction onSave avec l'événement complet
    onSave(eventToSave);
  } catch (error) {
    console.error("Erreur lors de la sauvegarde :", error);
    alert("Une erreur est survenue lors de la sauvegarde");
  }
};

  const addScheduleItem = () => {
    if (newScheduleItem.time && newScheduleItem.activity) {
      setScheduleItems([...scheduleItems, newScheduleItem]);
      setNewScheduleItem({ time: '', activity: '' });
    }
  };

  const removeScheduleItem = (index: number) => {
    setScheduleItems(scheduleItems.filter((_, i) => i !== index));
  };

  const addObjective = () => {
    if (newObjective) {
      setObjectives([...objectives, newObjective]);
      setNewObjective('');
    }
  };

  const removeObjective = (index: number) => {
    setObjectives(objectives.filter((_, i) => i !== index));
  };

  const addTestimonial = () => {
    if (newTestimonial.name && newTestimonial.comment) {
      setTestimonials([...testimonials, newTestimonial]);
      setNewTestimonial({ name: '', comment: '', rating: 5 });
    }
  };

  const removeTestimonial = (index: number) => {
    setTestimonials(testimonials.filter((_, i) => i !== index));
  };

  const categories = [
    'Dépistage Médical',
    'Don de Sang',
    'Caravane Médicale',
    'Atelier de Santé',
    'Conférence',
    'Autre'
  ];


  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewGalleryItem({
        ...newGalleryItem,
        url: reader.result as string,
        type
      });
    };
    reader.readAsDataURL(file);
  }
};

const addGalleryItem = () => {
  if (newGalleryItem.url) {
    setGalleryItems([...galleryItems, newGalleryItem]);
    setNewGalleryItem({
      type: 'image',
      url: '',
      thumbnail: '',
      caption: ''
    });
  }
};

const removeGalleryItem = (index: number) => {
  setGalleryItems(galleryItems.filter((_, i) => i !== index));
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            {event.id ? 'Modifier Événement' : 'Nouvel Événement'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Titre de l'événement"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2"
          />

          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2"
          />

          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2"
          />

          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2"
          />

          <input
            type="text"
            placeholder="Lieu"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2"
          />

          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            <option value="">Choisir une catégorie</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Participants"
            value={formData.participants}
            onChange={(e) => setFormData({ ...formData, participants: Number(e.target.value) })}
            className="w-full border border-gray-300 rounded-lg p-2"
          />

          <input
            type="number"
            placeholder="Maximum de participants"
            value={formData.maxParticipants}
            onChange={(e) => setFormData({ ...formData, maxParticipants: Number(e.target.value) })}
            className="w-full border border-gray-300 rounded-lg p-2"
          />

          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && <img src={imagePreview} alt="Prévisualisation" className="h-40 object-cover mt-2 rounded" />}

          {/* Programme */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Programme</label>
            {scheduleItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <span>{item.time} - {item.activity}</span>
                <button type="button" onClick={() => removeScheduleItem(index)} className="text-red-500"><Trash2 size={16} /></button>
              </div>
            ))}
            <div className="flex gap-2">
              <input type="text" placeholder="Heure" value={newScheduleItem.time} onChange={(e) => setNewScheduleItem({ ...newScheduleItem, time: e.target.value })} className="flex-1 border p-2 rounded" />
              <input type="text" placeholder="Activité" value={newScheduleItem.activity} onChange={(e) => setNewScheduleItem({ ...newScheduleItem, activity: e.target.value })} className="flex-1 border p-2 rounded" />
              <button type="button" onClick={addScheduleItem} className="bg-blue-500 text-white px-4 rounded">Ajouter</button>
            </div>
          </div>

          {/* Objectifs */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Objectifs</label>
            {objectives.map((obj, index) => (
              <div key={index} className="flex justify-between items-center mb-2">
                <span>{obj}</span>
                <button type="button" onClick={() => removeObjective(index)} className="text-red-500"><Trash2 size={16} /></button>
              </div>
            ))}
            <div className="flex gap-2">
              <input type="text" placeholder="Nouvel objectif" value={newObjective} onChange={(e) => setNewObjective(e.target.value)} className="flex-1 border p-2 rounded" />
              <button type="button" onClick={addObjective} className="bg-blue-500 text-white px-4 rounded">Ajouter</button>
            </div>
          </div>

          {/* Témoignages */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Témoignages</label>
            {testimonials.map((t, index) => (
              <div key={index} className="border p-2 rounded-lg mb-2 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-gray-600">{t.comment}</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < t.rating ? 'text-yellow-400' : 'text-gray-300'} />
                    ))}
                  </div>
                </div>
                <button type="button" onClick={() => removeTestimonial(index)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <div className="space-y-2 mt-2">
              <input type="text" placeholder="Nom" value={newTestimonial.name} onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })} className="w-full border p-2 rounded" />
              <textarea placeholder="Commentaire" value={newTestimonial.comment} onChange={(e) => setNewTestimonial({ ...newTestimonial, comment: e.target.value })} className="w-full border p-2 rounded" />
              <input type="number" placeholder="Note (1-5)" min="1" max="5" value={newTestimonial.rating} onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: Number(e.target.value) })} className="w-full border p-2 rounded" />
              <button type="button" onClick={addTestimonial} className="bg-blue-500 text-white px-4 py-2 rounded">Ajouter le témoignage</button>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t">
            <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50">Annuler</button>
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2">
              <Save size={18} />
              {event.id ? 'Mettre à jour' : 'Créer l\'événement'}
            </button>
          </div>


          <div className="border-t pt-4 mt-4">
  <h4 className="font-medium mb-4">Galerie Multimédia</h4>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    {galleryItems.map((item, index) => (
      <div key={index} className="border p-2 rounded-lg relative">
        {item.type === 'image' ? (
          <img src={item.url} alt={`Gallery ${index}`} className="h-32 w-full object-cover rounded" />
        ) : (
          <div className="relative">
            <video controls className="h-32 w-full object-cover rounded" poster={item.thumbnail}>
              <source src={item.url} type="video/mp4" />
            </video>
          </div>
        )}
        <button
          type="button"
          onClick={() => removeGalleryItem(index)}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
        >
          <X size={16} />
        </button>
        {item.caption && (
          <div className="text-sm mt-1 truncate">{item.caption}</div>
        )}
      </div>
    ))}
  </div>

  <div className="space-y-4 border p-4 rounded-lg">
    <div className="flex gap-4">
      <label className="inline-flex items-center">
        <input
          type="radio"
          checked={newGalleryItem.type === 'image'}
          onChange={() => setNewGalleryItem({...newGalleryItem, type: 'image'})}
          className="mr-2"
        />
        Image
      </label>
      <label className="inline-flex items-center">
        <input
          type="radio"
          checked={newGalleryItem.type === 'video'}
          onChange={() => setNewGalleryItem({...newGalleryItem, type: 'video'})}
          className="mr-2"
        />
        Vidéo
      </label>
    </div>

    <div>
      <label className="block text-sm font-medium mb-1">
        {newGalleryItem.type === 'image' ? 'Upload Image' : 'Upload Video'}
      </label>
      <input
        type="file"
        accept={newGalleryItem.type === 'image' ? 'image/*' : 'video/*'}
        onChange={(e) => handleGalleryUpload(e, newGalleryItem.type)}
        className="w-full border p-2 rounded"
      />
    </div>

    {newGalleryItem.type === 'video' && (
      <div>
        <label className="block text-sm font-medium mb-1">Thumbnail (optionnel)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setNewGalleryItem({
                  ...newGalleryItem,
                  thumbnail: reader.result as string
                });
              };
              reader.readAsDataURL(file);
            }
          }}
          className="w-full border p-2 rounded"
        />
      </div>
    )}

    <div>
      <label className="block text-sm font-medium mb-1">Légende (optionnel)</label>
      <input
        type="text"
        value={newGalleryItem.caption}
        onChange={(e) => setNewGalleryItem({...newGalleryItem, caption: e.target.value})}
        className="w-full border p-2 rounded"
      />
    </div>

    <button
      type="button"
      onClick={addGalleryItem}
      disabled={!newGalleryItem.url}
      className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
    >
      Ajouter à la galerie
    </button>
  </div>
</div>
        </form>
      </div>
    </div>
  );
};







// Member Form Modal
const MemberFormModal = ({ member, onSave, onClose }: { 
  member: TeamMember, 
  onSave: (member: TeamMember) => void, 
  onClose: () => void 
}) => {
  const [formData, setFormData] = useState(member.id ? member : {
    name: '',
    role: '',
    university: '',
    year: '',
    image: '',
    bio: '',
    social: { linkedin: '' },
    expertise: []
  });

  const [newExpertise, setNewExpertise] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as TeamMember);
  };

  const addExpertise = () => {
    if (newExpertise && !formData.expertise.includes(newExpertise)) {
      setFormData({
        ...formData,
        expertise: [...formData.expertise, newExpertise]
      });
      setNewExpertise('');
    }
  };

  const removeExpertise = (exp: string) => {
    setFormData({
      ...formData,
      expertise: formData.expertise.filter(e => e !== exp)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            {member.id ? 'Modifier Membre' : 'Nouveau Membre'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rôle *</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Université *</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3"
                value={formData.university}
                onChange={(e) => setFormData({...formData, university: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Année</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3"
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: e.target.value})}
                placeholder="2e année"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Photo de profil</label>

              <div className="flex items-center gap-4">
                {formData.image && (
                  <img src={formData.image} alt="preview" className="w-16 h-16 object-cover rounded-full" />
                )}

                <div>
                  <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData({ ...formData, image: reader.result as string });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <label
                    htmlFor="fileInput"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                  >
                    Uploader une image
                  </label>
                </div>
              </div>
            </div>

            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio *</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3"
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
              <input
                type="url"
                className="w-full border border-gray-300 rounded-lg p-3"
                value={formData.social.linkedin}
                onChange={(e) => setFormData({
                  ...formData, 
                  social: {...formData.social, linkedin: e.target.value}
                })}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Expertise</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 border border-gray-300 rounded-lg p-3"
                  value={newExpertise}
                  onChange={(e) => setNewExpertise(e.target.value)}
                  placeholder="Ajouter une compétence"
                />
                <button
                  type="button"
                  onClick={addExpertise}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ajouter
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.expertise.map((exp, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {exp}
                    <button 
                      type="button" 
                      onClick={() => removeExpertise(exp)}
                      className="ml-2 text-blue-600 hover:text-blue-900"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Save size={18} />
              {member.id ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashboardPage;