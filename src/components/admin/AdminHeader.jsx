import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const TITLE_MAP = {
  '/admin/dashboard': 'Dashboard Overview',
  '/admin/produk': 'Kelola Produk Simpanan Syariah',
  '/admin/deposito': 'Kelola Equivalent Rate & Simpanan Berjangka',
  '/admin/testimoni': 'Kelola Testimoni Anggota',
  '/admin/profil': 'Profil Lembaga & Foto Beranda',
};

export default function AdminHeader({ setMobileOpen }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const currentTitle = TITLE_MAP[location.pathname] || 'Panel Administrasi';

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-30 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-xl text-stone-700 hover:text-emerald-900 hover:bg-stone-100"
          aria-label="Buka menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-extrabold text-stone-900 leading-tight">
            {currentTitle}
          </h1>
          <p className="text-[11px] text-stone-500 hidden sm:block">
            KSPP Syariah BMT MAS (BMT Mitra Amanah Sejahtera)
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5">
          <div className="text-right hidden md:block">
            <span className="text-xs font-bold text-slate-900 block">
              {user?.user_metadata?.name || 'Administrator'}
            </span>
            <span className="text-[10px] text-emerald-700 font-bold block">
              Super Admin
            </span>
          </div>

          <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-300 font-bold text-xs flex items-center justify-center border border-emerald-700">
            A
          </div>

          <button
            type="button"
            onClick={logout}
            title="Keluar"
            className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
