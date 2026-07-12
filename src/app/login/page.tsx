'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Échec de la connexion');
        setLoading(false);
        return;
      }

      if (data.user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="mx-auto w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-4xl mb-6">🇹🇳</div>
          <h1 className="text-4xl font-semibold text-white tracking-tighter">Connexion</h1>
          <p className="text-zinc-400 mt-3">Accédez à votre espace client ou administrateur</p>
        </div>

        <form onSubmit={handleLogin} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10">
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-white"
                placeholder="votre@email.com"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-white"
                placeholder="••••••••"
              />
            </div>

            {error && <div className="text-rose-500 text-sm">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-white text-black font-semibold rounded-3xl hover:bg-zinc-100 transition disabled:opacity-70"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </div>
        </form>

        <div className="text-center mt-8 text-zinc-500 text-sm">
          Pas encore de compte ?{' '}
          <Link href="/register" className="text-white hover:underline">
            Créer un compte
          </Link>
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="text-zinc-500 hover:text-white text-sm flex items-center justify-center gap-2">
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
