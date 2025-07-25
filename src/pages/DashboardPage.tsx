import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Calendar, Users, DollarSign, Plus, Edit, Trash2, Eye, 
  CheckCircle, XCircle, UserCheck, UserX, FileText, Settings, 
  BarChart2, FormInput, ClipboardList 
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showEventForm, setShowEventForm] = useState(false);
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [showFormBuilder, setShowFormBuilder] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [donationAmount, setDonationAmount] = useState(0);

  // Mock data
  const [events, setEvents] = useState([
    {
      id: 1,
      title: '',
      date: '',
      location: '',
      description: '',
      status: 'upcoming',
      participants: 0,
      featured: false,
      donationTarget: 0
    },
    {
      id: 2,
      title: '',
      date: '',
      location: '',
      description: '',
      status: 'upcoming',
      participants: 0,
      featured: false,
      donationTarget: 0
    },
    {
      id: 3,
      title: '',
      date: '',
      location: '',
      description: '',
      status: 'completed',
      participants: 0,
      featured: false,
      donationTarget: 0
    }
  ]);

  const [pendingMembers] = useState([
    { id: 1, name: '', email: '', university: '', year: '', joinDate: '' },
    { id: 2, name: '', email: '', university: '', year: '', joinDate: '' },
    { id: 3, name: '', email: '', university: '', year: '', joinDate: '' }
  ]);

  const [donations, setDonations] = useState([
    { id: 1, donor: '', amount: 0, date: '', eventId: 1 },
    { id: 2, donor: '', amount: 0, date: '', eventId: null },
    { id: 3, donor: '', amount: 0, date: '', eventId: 2 }
  ]);

  const [forms, setForms] = useState([
    { id: 1, title: '', submissions: 0, createdAt: '' },
    { id: 2, title: '', submissions: 0, createdAt: '' }
  ]);

  const stats = {
    totalMembers: 0,
    activeEvents: events.filter(e => e.status === 'upcoming').length,
    totalDonations: donations.reduce((sum, d) => sum + d.amount, 0),
    upcomingEvents: events.filter(e => e.status === 'upcoming').length,
    pendingApprovals: pendingMembers.length,
    activeForms: forms.length
  };

  const EventForm = ({ event, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState(event || {
      title: '',
      date: '',
      location: '',
      description: '',
      status: 'upcoming',
      featured: false,
      donationTarget: 0
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newEvent = {
        ...formData,
        id: event?.id || Date.now(),
        participants: event?.participants || 0
      };
      onSave(newEvent);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">
            {event ? 'Edit Event' : 'Create New Event'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Donation Target (MAD)
              </label>
              <input
                type="number"
                value={formData.donationTarget}
                onChange={(e) => setFormData({...formData, donationTarget: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                Featured on homepage
              </label>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                {event ? 'Update Event' : 'Create Event'}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const DonationForm = ({ onSave, onCancel }: any) => {
    const [formData, setFormData] = useState({
      donor: '',
      amount: 0,
      eventId: null as number | null
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newDonation = {
        ...formData,
        id: Date.now(),
        date: new Date().toISOString().split('T')[0]
      };
      onSave(newDonation);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">Add Donation</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Donor Name
              </label>
              <input
                type="text"
                value={formData.donor}
                onChange={(e) => setFormData({...formData, donor: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount (MAD)
              </label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Associated Event (optional)
              </label>
              <select
                value={formData.eventId || ''}
                onChange={(e) => setFormData({...formData, eventId: e.target.value ? parseInt(e.target.value) : null})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Event</option>
                {events.map(event => (
                  <option key={event.id} value={event.id}>{event.title}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Add Donation
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const FormBuilder = ({ onSave, onCancel }: any) => {
    const [formTitle, setFormTitle] = useState('');
    const [questions, setQuestions] = useState([
      { id: 1, text: '', type: 'text', required: false }
    ]);

    const addQuestion = () => {
      setQuestions([...questions, { 
        id: questions.length + 1, 
        text: '', 
        type: 'text', 
        required: false 
      }]);
    };

    const removeQuestion = (id: number) => {
      if (questions.length > 1) {
        setQuestions(questions.filter(q => q.id !== id));
      }
    };

    const updateQuestion = (id: number, field: string, value: any) => {
      setQuestions(questions.map(q => 
        q.id === id ? { ...q, [field]: value } : q
      ));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newForm = {
        id: Date.now(),
        title: formTitle,
        questions,
        submissions: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      onSave(newForm);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
          <h3 className="text-lg font-semibold mb-4">Create New Form</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Form Title
              </label>
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-700">Questions</h4>
              
              {questions.map((question) => (
                <div key={question.id} className="p-4 border border-gray-200 rounded-md">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-gray-600">
                      Question #{question.id}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeQuestion(question.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Question Text
                    </label>
                    <input
                      type="text"
                      value={question.text}
                      onChange={(e) => updateQuestion(question.id, 'text', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Answer Type
                      </label>
                      <select
                        value={question.type}
                        onChange={(e) => updateQuestion(question.id, 'type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="text">Short Answer</option>
                        <option value="textarea">Long Answer</option>
                        <option value="radio">Multiple Choice</option>
                        <option value="checkbox">Checkboxes</option>
                        <option value="dropdown">Dropdown</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`required-${question.id}`}
                        checked={question.required}
                        onChange={(e) => updateQuestion(question.id, 'required', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`required-${question.id}`} className="ml-2 block text-sm text-gray-700">
                        Required
                      </label>
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addQuestion}
                className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Question
              </button>
            </div>
            
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Create Form
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const handleSaveEvent = (eventData: any) => {
    if (editingEvent) {
      setEvents(events.map(e => e.id === eventData.id ? eventData : e));
    } else {
      setEvents([...events, eventData]);
    }
    setShowEventForm(false);
    setEditingEvent(null);
  };

  const handleSaveDonation = (donationData: any) => {
    setDonations([...donations, donationData]);
    setShowDonationForm(false);
    setDonationAmount(0);
  };

  const handleSaveForm = (formData: any) => {
    setForms([...forms, formData]);
    setShowFormBuilder(false);
  };

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter(e => e.id !== eventId));
  };

  const handleDeleteForm = (formId: number) => {
    setForms(forms.filter(f => f.id !== formId));
  };

  const handleApproveMember = (memberId: number) => {
    alert(`Member ${memberId} approved!`);
  };

  const handleRejectMember = (memberId: number) => {
    alert(`Member ${memberId} rejected!`);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'donations', label: 'Donations', icon: DollarSign },
    { id: 'forms', label: 'Forms', icon: FormInput },
    ...(isAdmin ? [{ id: 'members', label: 'Members', icon: Users }] : [])
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{stats.totalMembers}</h3>
                <p className="text-gray-600">Total Members</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{stats.activeEvents}</h3>
                <p className="text-gray-600">Active Events</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">${stats.totalDonations.toLocaleString()}</h3>
                <p className="text-gray-600">Total Donations</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <ClipboardList className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{stats.activeForms}</h3>
                <p className="text-gray-600">Active Forms</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {[
                      {
                        icon: CheckCircle,
                        title: '',
                        description: '',
                        color: 'bg-blue-50',
                        iconColor: 'text-blue-600'
                      },
                      {
                        icon: Users,
                        title: '',
                        description: '',
                        color: 'bg-green-50',
                        iconColor: 'text-green-600'
                      },
                      {
                        icon: Calendar,
                        title: '',
                        description: '',
                        color: 'bg-purple-50',
                        iconColor: 'text-purple-600'
                      }
                    ].map((item, index) => (
                      <div key={index} className={`flex items-center p-4 ${item.color} rounded-lg`}>
                        <item.icon className={`h-5 w-5 ${item.iconColor} mr-3`} />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.title}</p>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <button 
                      onClick={() => setShowEventForm(true)}
                      className="p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center"
                    >
                      <Plus className="h-5 w-5 text-blue-600 mr-3" />
                      <span>Create New Event</span>
                    </button>
                    <button 
                      onClick={() => setShowDonationForm(true)}
                      className="p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center"
                    >
                      <DollarSign className="h-5 w-5 text-green-600 mr-3" />
                      <span>Add Donation</span>
                    </button>
                    <button 
                      onClick={() => setShowFormBuilder(true)}
                      className="p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center"
                    >
                      <FormInput className="h-5 w-5 text-purple-600 mr-3" />
                      <span>Create New Form</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Event Management</h3>
                  {isAdmin && (
                    <button
                      onClick={() => setShowEventForm(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Event</span>
                    </button>
                  )}
                </div>

                <div className="grid gap-4">
                  {events.map((event) => (
                    <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <h4 className="text-lg font-semibold text-gray-900">{event.title}</h4>
                            {event.featured && (
                              <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                Featured
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 mb-2">{event.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                            <span>📍 {event.location}</span>
                            <span>👥 {event.participants} participants</span>
                            <span>💰 {event.donationTarget} MAD target</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {event.status}
                            </span>
                          </div>
                        </div>
                        {isAdmin && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setEditingEvent(event);
                                setShowEventForm(true);
                              }}
                              className="p-2 text-gray-400 hover:text-blue-600"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteEvent(event.id)}
                              className="p-2 text-gray-400 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'donations' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Donation Management</h3>
                  {isAdmin && (
                    <button
                      onClick={() => setShowDonationForm(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Donation</span>
                    </button>
                  )}
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Donor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount (MAD)
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Event
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {donations.map((donation) => (
                        <tr key={donation.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {donation.donor}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {donation.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {donation.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {donation.eventId 
                              ? events.find(e => e.id === donation.eventId)?.title || 'N/A'
                              : 'General Donation'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'forms' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Form Management</h3>
                  {isAdmin && (
                    <button
                      onClick={() => setShowFormBuilder(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Create Form</span>
                    </button>
                  )}
                </div>

                <div className="grid gap-4">
                  {forms.map((form) => (
                    <div key={form.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900">{form.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                            <span>📅 Created: {form.createdAt}</span>
                            <span>📝 Submissions: {form.submissions}</span>
                          </div>
                        </div>
                        {isAdmin && (
                          <div className="flex space-x-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteForm(form.id)}
                              className="p-2 text-gray-400 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'members' && isAdmin && (
              <div>
                {pendingMembers.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-md font-medium text-gray-900 mb-4">Pending Approvals</h4>
                    <div className="space-y-4">
                      {pendingMembers.map((member) => (
                        <div key={member.id} className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h5 className="font-medium text-gray-900">{member.name}</h5>
                              <p className="text-sm text-gray-600">{member.email}</p>
                              <p className="text-sm text-gray-500">{member.university} • {member.year}</p>
                            </div>
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => handleApproveMember(member.id)}
                                className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 flex items-center space-x-1"
                              >
                                <UserCheck className="h-4 w-4" />
                                <span>Approve</span>
                              </button>
                              <button 
                                onClick={() => handleRejectMember(member.id)}
                                className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 flex items-center space-x-1"
                              >
                                <UserX className="h-4 w-4" />
                                <span>Reject</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-4">All Members</h4>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Join Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Admin
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              Member
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Event Form Modal */}
      {showEventForm && (
        <EventForm
          event={editingEvent}
          onSave={handleSaveEvent}
          onCancel={() => {
            setShowEventForm(false);
            setEditingEvent(null);
          }}
        />
      )}

      {/* Donation Form Modal */}
      {showDonationForm && (
        <DonationForm
          onSave={handleSaveDonation}
          onCancel={() => setShowDonationForm(false)}
        />
      )}

      {/* Form Builder Modal */}
      {showFormBuilder && (
        <FormBuilder
          onSave={handleSaveForm}
          onCancel={() => setShowFormBuilder(false)}
        />
      )}
    </div>
  );
};

export default DashboardPage;