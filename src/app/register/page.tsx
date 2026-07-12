'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    currentLevel: 'Licence',
    fieldOfStudy: '',
    desiredProgram: '',
    budget: '<5000',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erreur lors de l\'inscription');
        setLoading(false);
        return;
      }

      setSuccess('Compte créé ! Redirection vers votre tableau de bord...');
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err) {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-semibold tracking-tighter">Créer votre compte</h1>
          <p className="text-zinc-600 mt-4">Rejoignez des centaines d&apos;étudiants tunisiens accompagnés vers l&apos;Italie</p>
        </div>

        <div className="bg-white border border-zinc-200 shadow-xl rounded-3xl p-12">
          <form onSubmit={handleRegister} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium block mb-2">Nom complet</label>
                <input name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full px-6 py-4 border border-zinc-200 rounded-2xl" placeholder="Mohamed Ben Ali" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-2">Téléphone</label>
                <input name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-6 py-4 border border-zinc-200 rounded-2xl" placeholder="+216 98 765 432" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Email professionnel ou personnel</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-6 py-4 border border-zinc-200 rounded-2xl" placeholder="vous@email.com" />
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Mot de passe</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required minLength={6} className="w-full px-6 py-4 border border-zinc-200 rounded-2xl" placeholder="Minimum 6 caractères" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium block mb-2">Niveau actuel</label>
                <select name="currentLevel" value={formData.currentLevel} onChange={handleChange} className="w-full px-6 py-4 border border-zinc-200 rounded-2xl bg-white">
                  <option value="Bac">Bac</option>
                  <option value="Licence">Licence</option>
                  <option value="Master">Master</option>
                  <option value="Doctorat">Doctorat</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium block mb-2">Filière</label>
                <input name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange} required className="w-full px-6 py-4 border border-zinc-200 rounded-2xl" placeholder="Informatique, Génie Civil..." />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Programme souhaité en Italie (optionnel)</label>
              <input name="desiredProgram" value={formData.desiredProgram} onChange={handleChange} className="w-full px-6 py-4 border border-zinc-200 rounded-2xl" placeholder="Master Data Science - Politecnico di Milano" />
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Budget estimé par an (€)</label>
              <select name="budget" value={formData.budget} onChange={handleChange} className="w-full px-6 py-4 border border-zinc-200 rounded-2xl bg-white">
                <option value="<5000">Moins de 5 000 €</option>
                <option value="5000-10000">5 000 – 10 000 €</option>
                <option value="10000-20000">10 000 – 20 000 €</option>
                <option value=">20000">Plus de 20 000 €</option>
              </select>
            </div>

            {error && <div className="text-rose-600 bg-rose-50 p-4 rounded-2xl text-sm">{error}</div>}
            {success && <div className="text-emerald-600 bg-emerald-50 p-4 rounded-2xl text-sm">{success}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-rose-600 hover:bg-rose-700 transition text-white font-semibold rounded-3xl text-lg disabled:opacity-70"
            >
              {loading ? 'Création du compte...' : 'Créer mon compte client'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-zinc-400 mt-8">
          Après inscription, un administrateur validera votre compte (généralement sous 24h)
        </p>
      </div>
    </div>
  );
}
