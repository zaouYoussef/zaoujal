import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { dataStore } from '../data';
import { FileText, ArrowRight } from 'lucide-react';

const FormsOverviewPage = () => {
  const [forms, setForms] = useState(dataStore.getForms());

  useEffect(() => {
    const unsubscribe = dataStore.subscribe(() => {
      setForms(dataStore.getForms());
    });
    return unsubscribe;
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Formulaires disponibles</h1>
        
        {forms.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <p className="text-gray-600">Aucun formulaire disponible pour le moment.</p>
            <p className="text-sm text-gray-500 mt-2">
              Les formulaires seront affichés ici lorsqu'ils seront créés par l'administration.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {forms.filter(f => f.isActive).map(form => (
              <div key={form.id} className="bg-white rounded-xl shadow p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-bold text-lg text-gray-900">{form.title}</h2>
                    <p className="text-gray-600 text-sm mt-1">{form.description}</p>
                    {form.eventId && (
                      <p className="text-xs text-blue-600 mt-2">
                        Pour l'événement: {dataStore.getEvents().find(e => e.id === form.eventId)?.title || 'Inconnu'}
                      </p>
                    )}
                  </div>
                  <Link 
                    to={`/forms/${form.id}`}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <span>Remplir</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormsOverviewPage;