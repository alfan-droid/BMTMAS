import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Wallet,
  TrendingUp,
  MessageSquareQuote,
  ExternalLink,
  LogOut,
  ShieldCheck,
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
      icon: LayoutDashboard,
    },
    {
      name: 'Profil & Foto Beranda',
      path: '/admin/profil',
      icon: Building2,
    },
    {
      name: 'Produk Simpanan',
      path: '/admin/produk',
      icon: Wallet,
    },
    {
      name: 'Simpanan Berjangka',
      path: '/admin/deposito',
      icon: TrendingUp,
    },
    {
      name: 'Testimoni Anggota',
      path: '/admin/testimoni',
      icon: MessageSquareQuote,
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-900 border border-amber-400 flex items-center justify-center font-extrabold text-amber-300 text-xs shadow-sm">
                MAS
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
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 shadow-sm'
                      : 'text-emerald-100 hover:bg-emerald-900/80 hover:text-amber-300'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer Actions & User Status */}
        <div className="p-4 border-t border-emerald-800/80 space-y-3">
          <div className="px-3 py-2.5 rounded-xl bg-emerald-900/70 border border-emerald-800 text-xs">
            <div className="flex items-center gap-2 text-amber-300 font-extrabold text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Terverifikasi</span>
            </div>
            <p className="text-[11px] text-emerald-200 truncate mt-0.5">
              {user?.email || 'admin@bmtmas.id'}
            </p>
          </div>

          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-emerald-200 hover:text-white hover:bg-emerald-900 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span>Lihat Web Publik</span>
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-800 text-amber-300">
              Live
            </span>
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
