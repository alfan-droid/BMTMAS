import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ShieldCheck, Lock, ArrowLeft, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBmt } from '../../context/BmtContext';

export default function AdminLogin() {
  const { login } = useAuth();
  const { institutionInfo } = useBmt();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Email dan password wajib diisi.');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Gagal masuk. Periksa kembali email dan password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUseDemo = () => {
    setEmail('admin@bmtmas.id');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDFBF7] to-amber-100/50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-layered border-2 border-amber-200/90 overflow-hidden">
        {/* Header Plaque */}
        <div className="bg-emerald-950 p-7 text-center text-white border-b border-emerald-800 relative">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-900 border-2 border-amber-400 flex items-center justify-center font-extrabold text-amber-300 text-base shadow-md mx-auto mb-3">
            MAS
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">
            Portal CMS BMT MAS
          </h2>
          <p className="text-xs text-amber-300 font-semibold mt-1">
            {institutionInfo.fullName || 'KSPP Syariah BMT MAS'}
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900 border border-emerald-700 text-[11px] text-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Badan Hukum: {institutionInfo.legalNumber}</span>
          </div>
        </div>

        {/* Login Form */}
        <div className="p-7 space-y-5">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="email-input"
                className="text-xs font-extrabold uppercase tracking-wider text-stone-700"
              >
                Email Administrator
              </label>
              <input
                id="email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bmtmas.id"
                required
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-sm font-medium focus:bg-white focus:border-emerald-800 focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password-input"
                className="text-xs font-extrabold uppercase tracking-wider text-stone-700"
              >
                Kata Sandi (Password)
              </label>
              <div className="relative">
                <input
                  id="password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-stone-50 border border-stone-300 text-sm font-medium focus:bg-white focus:border-emerald-800 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-extrabold text-sm shadow-md transition-all duration-200 disabled:opacity-60"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span>{isSubmitting ? 'Memproses Masuk...' : 'Masuk ke Dashboard'}</span>
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/90 text-center space-y-2">
            <span className="text-[11px] font-bold text-stone-600 block">
              Pengujian Lokal / Demo CMS?
            </span>
            <button
              type="button"
              onClick={handleUseDemo}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gunakan Akun Demo Admin</span>
            </button>
            <p className="text-[10px] text-stone-500">
              Email: <code>admin@bmtmas.id</code> • Pass: <code>admin123</code>
            </p>
          </div>

          <div className="text-center pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-emerald-900 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Halaman Utama</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
