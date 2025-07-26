import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dataStore } from '../data';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const FormPage = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<Form | null>(null);
  const [responses, setResponses] = useState<Record<string, string | string[]>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (formId) {
      const foundForm = dataStore.getForm(formId);
      if (foundForm) {
        setForm(foundForm);
      } else {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [formId, navigate]);

  const handleInputChange = (questionId: string, value: string | string[]) => {
    setResponses({
      ...responses,
      [questionId]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validation
      const requiredQuestions = form?.questions.filter(q => q.required) || [];
      for (const q of requiredQuestions) {
        if (!responses[q.id] || 
            (Array.isArray(responses[q.id]) && (responses[q.id] as string[]).length === 0)) {
          throw new Error(`La question "${q.question}" est obligatoire`);
        }
      }

      // Enregistrement
      dataStore.addFormResponse({
        formId: form!.id,
        respondent: {
          name: responses['name'] as string || 'Anonyme',
          email: responses['email'] as string || ''
        },
        answers: Object.entries(responses)
          .filter(([key]) => key !== 'name' && key !== 'email')
          .map(([questionId, answer]) => ({
            questionId,
            answer
          }))
      });

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  if (!form) return <div className="min-h-screen bg-gray-50 p-8">Chargement...</div>;

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Merci !</h1>
          <p className="text-gray-600 mb-6">Votre formulaire a été soumis avec succès.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft size={18} />
          Retour
        </button>

        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{form.title}</h1>
          <p className="text-gray-600 mb-6">{form.description}</p>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <XCircle className="h-5 w-5 text-red-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Votre nom</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-3"
                  value={responses['name'] as string || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Votre email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg p-3"
                  value={responses['email'] as string || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>

              {form.questions.map((question) => (
                <div key={question.id} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {question.question}
                    {question.required && <span className="text-red-500 ml-1">*</span>}
                  </label>

                  {question.type === 'text' && (
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg p-3"
                      value={responses[question.id] as string || ''}
                      onChange={(e) => handleInputChange(question.id, e.target.value)}
                      required={question.required}
                    />
                  )}

                  {question.type === 'textarea' && (
                    <textarea
                      className="w-full border border-gray-300 rounded-lg p-3"
                      rows={4}
                      value={responses[question.id] as string || ''}
                      onChange={(e) => handleInputChange(question.id, e.target.value)}
                      required={question.required}
                    />
                  )}

                  {(question.type === 'radio' || question.type === 'select') && (
                    <div className="space-y-2">
                      {question.options?.map((option, idx) => (
                        <div key={idx} className="flex items-center">
                          <input
                            type="radio"
                            id={`${question.id}-${idx}`}
                            name={question.id}
                            value={option}
                            checked={responses[question.id] === option}
                            onChange={() => handleInputChange(question.id, option)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            required={question.required && !responses[question.id]}
                          />
                          <label htmlFor={`${question.id}-${idx}`} className="ml-2 block text-sm text-gray-700">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}

                  {question.type === 'checkbox' && (
                    <div className="space-y-2">
                      {question.options?.map((option, idx) => (
                        <div key={idx} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`${question.id}-${idx}`}
                            value={option}
                            checked={(responses[question.id] as string[] || []).includes(option)}
                            onChange={(e) => {
                              const current = responses[question.id] as string[] || [];
                              const newValue = e.target.checked
                                ? [...current, option]
                                : current.filter(v => v !== option);
                              handleInputChange(question.id, newValue);
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <label htmlFor={`${question.id}-${idx}`} className="ml-2 block text-sm text-gray-700">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Soumettre le formulaire
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormPage;