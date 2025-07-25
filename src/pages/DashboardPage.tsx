import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Calendar, PlusCircle, Trash2, Edit, Check, X } from 'lucide-react';

interface Event {
  _id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  status?: string;
}

const DashboardPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<Omit<Event, '_id'>>({
    title: '',
    date: '',
    location: '',
    description: '',
    status: 'upcoming'
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = "fake-admin-token"; // Juste pour tester
  // Récupérer les événements
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events', {
          headers: { 'x-auth-token': token || '' }
        });
        setEvents(res.data);
      } catch (err) {
        setError('Erreur de chargement des événements');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [token]);

  // Ajouter un événement
  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/events', newEvent, {
        headers: { 
          'x-auth-token': token || '',
          'Content-Type': 'application/json'
        }
      });
      setEvents([...events, res.data]);
      setNewEvent({ title: '', date: '', location: '', description: '', status: 'upcoming' });
    } catch (err) {
      setError('Erreur lors de l\'ajout');
    }
  };

  // Supprimer un événement
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`, {
        headers: { 'x-auth-token': token || '' }
      });
      setEvents(events.filter(event => event._id !== id));
    } catch (err) {
      setError('Erreur lors de la suppression');
    }
  };

  // Modifier un événement
  const handleEdit = async () => {
    if (!editingId || !editData) return;
    
    try {
      const res = await axios.put(
        `http://localhost:5000/api/events/${editingId}`,
        editData,
        { headers: { 'x-auth-token': token || '' } }
      );
      setEvents(events.map(event => 
        event._id === editingId ? res.data : event
      ));
      setEditingId(null);
    } catch (err) {
      setError('Erreur lors de la modification');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Calendar className="text-purple-600" /> Dashboard Admin
        </h1>

        {/* Formulaire d'ajout */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <PlusCircle className="text-green-500" /> Ajouter un Événement
          </h2>
          <form onSubmit={handleAddEvent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lieu</label>
              <input
                type="text"
                value={newEvent.location}
                onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
              <select
                value={newEvent.status}
                onChange={(e) => setNewEvent({...newEvent, status: e.target.value as 'upcoming' | 'completed'})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="upcoming">À venir</option>
                <option value="completed">Terminé</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                rows={3}
                required
              />
            </div>
            <button
              type="submit"
              className="md:col-span-2 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <PlusCircle size={18} /> Ajouter l'événement
            </button>
          </form>
        </div>

        {/* Liste des événements */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Événements ({events.length})</h2>
          </div>
          
          {loading ? (
            <div className="p-6 text-center">Chargement...</div>
          ) : error ? (
            <div className="p-6 text-red-500">{error}</div>
          ) : events.length === 0 ? (
            <div className="p-6 text-center text-gray-500">Aucun événement à afficher</div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {events.map((event) => (
                <li key={event._id} className="p-6 hover:bg-gray-50 transition-colors">
                  {editingId === event._id ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm text-gray-500 mb-1">Titre</label>
                        <input
                          type="text"
                          value={editData?.title || ''}
                          onChange={(e) => setEditData({...editData!, title: e.target.value})}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500 mb-1">Date</label>
                        <input
                          type="date"
                          value={editData?.date || ''}
                          onChange={(e) => setEditData({...editData!, date: e.target.value})}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500 mb-1">Lieu</label>
                        <input
                          type="text"
                          value={editData?.location || ''}
                          onChange={(e) => setEditData({...editData!, location: e.target.value})}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-sm text-gray-500 mb-1">Description</label>
                        <textarea
                          value={editData?.description || ''}
                          onChange={(e) => setEditData({...editData!, description: e.target.value})}
                          className="w-full p-2 border rounded"
                          rows={2}
                        />
                      </div>
                      <div className="md:col-span-3 flex justify-end gap-2 mt-2">
                        <button
                          onClick={handleEdit}
                          className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded text-sm"
                        >
                          <Check size={16} /> Enregistrer
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="flex items-center gap-1 bg-gray-500 text-white px-3 py-1 rounded text-sm"
                        >
                          <X size={16} /> Annuler
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-medium text-lg text-gray-900">{event.title}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} /> {new Date(event.date).toLocaleDateString('fr-FR')}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={14} /> {event.location}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            event.status === 'upcoming' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {event.status === 'upcoming' ? 'À venir' : 'Terminé'}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingId(event._id);
                            setEditData({...event});
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                          title="Modifier"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(event._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                          title="Supprimer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;