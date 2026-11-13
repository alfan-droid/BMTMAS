import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ExternalLink,
  LogOut,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useBmt } from '../../context/BmtContext';

export default function AdminSidebar({ mobileOpen, setMobileOpen }) {
  const { institutionInfo } = useBmt();
  const { logout, user } = useAuth();
  const location = useLocation();

  // Menu items dengan Profil ditaruh di bagian atas setelah Dashboard
  const menuItems = [
    {
      name: 'Dashboard Overview',
      path: '/admin/dashboard',
    },
    {
      name: 'Profil & Foto Beranda',
      path: '/admin/profil',
    },
    {
      name: 'Produk Simpanan',
      path: '/admin/produk',
    },
    {
      name: 'Simpanan Berjangka',
      path: '/admin/deposito',
    },
    {
      name: 'Testimoni Anggota',
      path: '/admin/testimoni',
    },
  ];

  return (
    <>
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-emerald-950/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-emerald-950 text-white z-50 flex flex-col justify-between transition-transform duration-200 border-r border-emerald-800 shadow-2xl ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-emerald-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-sm">
                <img
                  src="/images/logo-bmt-mas.png"
                  alt="Logo BMT MAS"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm text-white leading-tight">
                  CMS BMT MAS
                </span>
                <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider mt-0.5">
                  Panel Administrasi
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Menu (Profil berada tepat setelah Dashboard) */}
          <div className="px-3 py-5 space-y-1">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
              Menu Pengelolaan
            </div>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 shadow-sm'
                      : 'text-emerald-100 hover:bg-emerald-900/80 hover:text-amber-300'
                  }`}
                >
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer Actions & User Status */}
        <div className="p-4 border-t border-emerald-800/80 space-y-3">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-emerald-200 hover:text-white hover:bg-emerald-900 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            <span>Lihat Web Publik</span>
          </Link>

          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-300 hover:text-white hover:bg-red-950/60 border border-red-900/50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar (Logout)</span>
          </button>
        </div>
      </aside>
    </>
  );
}
