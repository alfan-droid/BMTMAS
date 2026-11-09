import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Wallet,
  TrendingUp,
  MessageSquareQuote,
  Building2,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Database,
} from 'lucide-react';
import { useBmt } from '../../context/BmtContext';
import { supabase } from '../../lib/supabaseClient';

export default function AdminDashboard() {
  const { products, depositoRates, testimonials, branches, institutionInfo, resetToDefaults } = useBmt();
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleReset = () => {
    resetToDefaults();
    setResetConfirmOpen(false);
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 3000);
  };

  const isSupabaseActive = !!supabase;

  return (
    <div className="space-y-7">
      {/* 1. Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white p-6 sm:p-8 shadow-layered border border-emerald-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Badan Hukum: {institutionInfo.legalNumber}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Selamat Datang di CMS {institutionInfo.shortName || 'BMT MAS'}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl">
            Sistem Informasi Manajemen Konten resmi untuk mengelola produk simpanan, rate simpanan berjangka, ulasan anggota, dan profil kantor.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/produk"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-all shadow-sm"
          >
            <span>Cek Web Publik</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {resetSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Seluruh data berhasil dikembalikan ke data resmi brosur BMT MAS!</span>
        </div>
      )}

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1 */}
        <Link
          to="/admin/produk"
          className="group p-5 rounded-2xl bg-white border border-stone-200 hover:border-amber-400 shadow-sm transition-all hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Produk Simpanan
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 group-hover:bg-emerald-900 group-hover:text-amber-300 flex items-center justify-center transition-colors">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-extrabold text-stone-900 tabular-nums">
            {products.length}
          </div>
          <p className="text-xs text-stone-500 mt-1">
            TAMARA, TADIKA, TADURI, TAQURBA
          </p>
        </Link>

        {/* Metric 2 */}
        <Link
          to="/admin/deposito"
          className="group p-5 rounded-2xl bg-white border border-stone-200 hover:border-amber-400 shadow-sm transition-all hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Tenor Deposito
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 group-hover:bg-amber-500 group-hover:text-stone-950 flex items-center justify-center transition-colors">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-extrabold text-stone-900 tabular-nums">
            {depositoRates.length}
          </div>
          <p className="text-xs text-stone-500 mt-1">
            3 Bulan, 6 Bulan, &amp; 12 Bulan
          </p>
        </Link>

        {/* Metric 3 */}
        <Link
          to="/admin/testimoni"
          className="group p-5 rounded-2xl bg-white border border-stone-200 hover:border-amber-400 shadow-sm transition-all hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Ulasan Testimoni
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 group-hover:bg-emerald-900 group-hover:text-amber-300 flex items-center justify-center transition-colors">
              <MessageSquareQuote className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-extrabold text-stone-900 tabular-nums">
            {testimonials.length}
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Tokoh &amp; anggota Gunungkidul
          </p>
        </Link>

        {/* Metric 4 */}
        <Link
          to="/admin/profil"
          className="group p-5 rounded-2xl bg-white border border-stone-200 hover:border-amber-400 shadow-sm transition-all hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Jaringan Kantor
            </span>
            <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-700 group-hover:bg-stone-900 group-hover:text-amber-300 flex items-center justify-center transition-colors">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-extrabold text-stone-900 tabular-nums">
            {branches.length}
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Semanu &amp; Paliyan
          </p>
        </Link>
      </div>

      {/* 3. Quick Action Hub */}
      <div className="rounded-3xl bg-white border border-stone-200 p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="text-lg font-extrabold text-stone-900">
            Akses Cepat Pengelolaan Data
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Pilih bagian yang ingin Anda perbarui secara langsung. Perubahan akan langsung tampil pada website.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/admin/profil"
            className="p-4 rounded-2xl bg-stone-50 hover:bg-amber-50/60 border border-stone-200 hover:border-amber-500 transition-all flex items-start gap-3.5"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">
                Profil Lembaga &amp; Foto Beranda
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
                Ubah foto bar beranda, nomor kontak WA, call center, dan data legalitas.
              </p>
            </div>
          </Link>

          <Link
            to="/admin/produk"
            className="p-4 rounded-2xl bg-stone-50 hover:bg-emerald-50/60 border border-stone-200 hover:border-emerald-700 transition-all flex items-start gap-3.5"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-900 text-amber-300 flex items-center justify-center shrink-0">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">
                Kelola Produk Simpanan
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
                Tambah, ubah deskripsi, akad, nisbah, atau non-aktifkan produk.
              </p>
            </div>
          </Link>

          <Link
            to="/admin/deposito"
            className="p-4 rounded-2xl bg-stone-50 hover:bg-amber-50/60 border border-stone-200 hover:border-amber-500 transition-all flex items-start gap-3.5"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">
                Kelola Deposito &amp; Rates
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
                Ubah equivalent rate bulanan Jan–Des dan persentase nisbah.
              </p>
            </div>
          </Link>

          <Link
            to="/admin/testimoni"
            className="p-4 rounded-2xl bg-stone-50 hover:bg-emerald-50/60 border border-stone-200 hover:border-emerald-700 transition-all flex items-start gap-3.5"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-900 text-amber-300 flex items-center justify-center shrink-0">
              <MessageSquareQuote className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">
                Kelola Testimoni Anggota
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
                Ubah atau tambah ulasan anggota dan peran/jabatan resmi.
              </p>
            </div>
          </Link>

          <Link
            to="/produk"
            target="_blank"
            className="p-4 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200 transition-all flex items-start gap-3.5"
          >
            <div className="w-10 h-10 rounded-xl bg-stone-200 text-stone-800 flex items-center justify-center shrink-0">
              <ExternalLink className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">
                Buka Halaman Produk Publik
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
                Lihat tampilan halaman terpisah <code>/produk</code> secara langsung.
              </p>
            </div>
          </Link>

          <Link
            to="/deposito"
            target="_blank"
            className="p-4 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200 transition-all flex items-start gap-3.5"
          >
            <div className="w-10 h-10 rounded-xl bg-stone-200 text-stone-800 flex items-center justify-center shrink-0">
              <ExternalLink className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">
                Buka Halaman Deposito Publik
              </h4>
              <p className="text-xs text-stone-600 mt-0.5">
                Lihat tampilan halaman terpisah <code>/deposito</code> secara langsung.
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* 4. Database Sync Status & Data Recovery */}
      <div className="rounded-3xl bg-white border border-stone-200 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center shrink-0">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-extrabold text-stone-900">
                Status Penyimpanan Data
              </h4>
              <span
                className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  isSupabaseActive
                    ? 'bg-emerald-100 text-emerald-900'
                    : 'bg-amber-100 text-amber-900'
                }`}
              >
                {isSupabaseActive ? 'Supabase Database Aktif' : 'Penyimpanan Offline LocalStorage Aktif'}
              </span>
            </div>
            <p className="text-xs text-stone-600 mt-1 max-w-xl">
              Perubahan disimpan secara persisten di browser Anda, dan otomatis sinkron ke Supabase ketika kredensial <code>VITE_SUPABASE_URL</code> dan <code>VITE_SUPABASE_ANON_KEY</code> diatur.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setResetConfirmOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-amber-100 text-stone-800 text-xs font-bold border border-stone-300 transition-colors shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset ke Data Brosur Resmi</span>
        </button>
      </div>

      {/* Reset Confirmation Modal */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 bg-stone-950/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-stone-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-extrabold text-stone-900">
              Kembalikan Seluruh Data ke Default?
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Tindakan ini akan mengembalikan seluruh produk, tabel rate deposito, dan testimoni kembali ke data resmi brosur BMT MAS (2022).
            </p>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setResetConfirmOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-stone-700 hover:bg-stone-100"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-xs"
              >
                Ya, Reset Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
