import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ShieldCheck, Lock, ArrowLeft, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBmt } from '../../context/BmtContext';
import { useToast } from '../../context/ToastContext';

export default function AdminLogin() {
  const { login } = useAuth();
  const { institutionInfo } = useBmt();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      showToast('Email dan password wajib diisi.', 'error', { title: 'Data Belum Lengkap' });
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
      showToast('Berhasil masuk ke Portal CMS BMT MAS.', 'success', { title: 'Login Berhasil' });
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      showToast(err.message || 'Gagal masuk. Periksa kembali email dan password.', 'error', {
        title: 'Gagal Masuk',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUseDemo = () => {
    setEmail('admin@bmtmas.id');
    setPassword('admin123');
    showToast('Akun demo admin telah diisi. Klik "Masuk ke Dashboard".', 'info', {
      title: 'Akun Demo Siap',
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header Plaque */}
        <div className="bg-slate-900 p-7 text-center text-white border-b border-slate-800 relative">
          <div className="w-12 h-12 rounded-xl bg-emerald-900 border border-emerald-700 flex items-center justify-center font-extrabold text-emerald-300 text-sm shadow-md mx-auto mb-3">
            MAS
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            Portal CMS BMT MAS
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-1">
            {institutionInfo.fullName || 'KSPP Syariah BMT MAS'}
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[11px] text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Badan Hukum: {institutionInfo.legalNumber}</span>
          </div>
        </div>

        {/* Login Form */}
        <div className="p-7 space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="email-input"
                className="text-xs font-bold uppercase tracking-wider text-slate-700"
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
                className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-sm font-medium focus:bg-white focus:border-emerald-800 focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password-input"
                className="text-xs font-bold uppercase tracking-wider text-slate-700"
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
                  className="w-full px-4 py-2.5 pr-11 rounded-lg bg-slate-50 border border-slate-300 text-sm font-medium focus:bg-white focus:border-emerald-800 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="quiet-btn w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-sm shadow-sm transition-all duration-200 disabled:opacity-60"
            >
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>{isSubmitting ? 'Memproses Masuk...' : 'Masuk ke Dashboard'}</span>
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2">
            <span className="text-[11px] font-semibold text-slate-600 block">
              Pengujian Lokal / Demo CMS?
            </span>
            <button
              type="button"
              onClick={handleUseDemo}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Gunakan Akun Demo Admin</span>
            </button>
            <p className="text-[10px] text-slate-500">
              Email: <code>admin@bmtmas.id</code> • Pass: <code>admin123</code>
            </p>
          </div>

          <div className="text-center pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-900 transition-colors"
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
