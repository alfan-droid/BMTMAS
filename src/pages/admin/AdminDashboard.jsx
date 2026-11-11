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
  AlertTriangle,
  Database,
  ArrowRight,
  Activity,
  Layers,
  Sparkles,
  Server,
  FileText,
} from 'lucide-react';
import { useBmt } from '../../context/BmtContext';
import { useToast } from '../../context/ToastContext';
import { supabase } from '../../lib/supabaseClient';

export default function AdminDashboard() {
  const {
    products,
    depositoRates,
    testimonials,
    branches,
    institutionInfo,
    resetToDefaults,
  } = useBmt();
  const { showToast } = useToast();
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  const handleReset = () => {
    resetToDefaults();
    setResetConfirmOpen(false);
    showToast(
      'Seluruh data katalog produk, suku bunga deposito, dan testimoni berhasil dipulihkan sesuai brosur resmi BMT MAS!',
      'success',
      { title: 'Data Berhasil Direset' }
    );
  };

  const isSupabaseActive = !!supabase;

  return (
    <div className="space-y-8">
      {/* 1. Header Banner & Identity */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-[#004D4A] to-[#002D2B] text-white p-6 sm:p-8 md:p-10 shadow-xl border border-slate-800 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-amber-300 text-xs font-semibold backdrop-blur-xs">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Badan Hukum Resmi: {institutionInfo.legalNumber}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Pusat Manajemen Konten &amp; Operasional {institutionInfo.shortName || 'BMT MAS'}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Kelola katalog simpanan syariah, ekivalen rate deposito, testimoni anggota, dan profil operasional kantor cabang Gunungkidul dalam satu panel terintegrasi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md active:scale-95"
            >
              <span>Buka Website Publik</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Bento Grid (4 Cards) */}
      <section aria-label="Ringkasan Statistik Sistem">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Produk */}
          <Link
            to="/admin/produk"
            className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Produk Simpanan
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white flex items-center justify-center transition-colors">
                <Wallet className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                {products.length}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                TAMARA, TADIKA, TADURI, TAQURBA
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
              <span>Kelola Produk</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Deposito Rates */}
          <Link
            to="/admin/deposito"
            className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-500 shadow-xs hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Tenor Deposito
              </span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 group-hover:bg-amber-500 group-hover:text-slate-950 flex items-center justify-center transition-colors">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                {depositoRates.length}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Tenor 3 Bln, 6 Bln, &amp; 12 Bln
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-700">
              <span>Sesuaikan Nisbah</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Testimoni */}
          <Link
            to="/admin/testimoni"
            className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Ulasan Anggota
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white flex items-center justify-center transition-colors">
                <MessageSquareQuote className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                {testimonials.length}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Tokoh, pedagang &amp; anggota
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
              <span>Kurasi Testimoni</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: Jaringan Kantor */}
          <Link
            to="/admin/profil"
            className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-400 shadow-xs hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Jaringan Cabang
              </span>
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-slate-900 group-hover:text-amber-300 flex items-center justify-center transition-colors">
                <Building2 className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                {branches.length}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Pusat Semanu &amp; Cabang Paliyan
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Info Kontak &amp; Jam Kas</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 3. Quick Action Hub (Bento Layout) */}
      <section className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            <span>Alur Kerja CMS Mandiri</span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-2">
            Aksi Cepat Pengelolaan Data
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Pembaruan yang Anda simpan langsung terrefleksi secara instan pada katalog dan kalkulator publik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/admin/produk"
            className="p-5 rounded-2xl bg-slate-50 hover:bg-emerald-50/70 border border-slate-200 hover:border-emerald-600 transition-all flex items-start gap-4 group"
          >
            <div className="w-11 h-11 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                Kelola Produk Simpanan
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Sesuaikan deskripsi akad, setoran minimum, dan status aktif produk TAMARA atau TADIKA.
              </p>
            </div>
          </Link>

          <Link
            to="/admin/deposito"
            className="p-5 rounded-2xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200 hover:border-amber-500 transition-all flex items-start gap-4 group"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-xs">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                Pembaruan Nisbah Deposito
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Ubah porsi nisbah bagi hasil dan histori rata-rata persentase per bulan untuk kalkulator.
              </p>
            </div>
          </Link>

          <Link
            to="/admin/testimoni"
            className="p-5 rounded-2xl bg-slate-50 hover:bg-emerald-50/70 border border-slate-200 hover:border-emerald-600 transition-all flex items-start gap-4 group"
          >
            <div className="w-11 h-11 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs">
              <MessageSquareQuote className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                Kelola Ulasan Anggota
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Tambahkan kutipan testimoni pedagang pasar dan nasabah pembiayaan BMT MAS.
              </p>
            </div>
          </Link>

          <Link
            to="/admin/profil"
            className="p-5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-400 transition-all flex items-start gap-4 group"
          >
            <div className="w-11 h-11 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center shrink-0 shadow-xs">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-slate-900 transition-colors">
                Profil &amp; Kontak WhatsApp
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Perbarui nomor WA Head Office, call center, dan tautan Google Maps kantor cabang.
              </p>
            </div>
          </Link>

          <Link
            to="/produk"
            target="_blank"
            className="p-5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all flex items-start gap-4 group"
          >
            <div className="w-11 h-11 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
              <ExternalLink className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Katalog Produk Publik
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Buka rute publik <code>/produk</code> untuk memverifikasi tampilan kartu produk.
              </p>
            </div>
          </Link>

          <Link
            to="/deposito"
            target="_blank"
            className="p-5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all flex items-start gap-4 group"
          >
            <div className="w-11 h-11 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
              <ExternalLink className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Kalkulator Deposito Publik
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Buka rute publik <code>/deposito</code> untuk memverifikasi simulasi bagi hasil.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Database Sync Status & Data Recovery */}
      <section className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="text-base font-extrabold text-slate-900">
                Status Penyimpanan Data
              </h3>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold ${
                  isSupabaseActive
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isSupabaseActive ? 'bg-emerald-600 animate-pulse' : 'bg-amber-600'
                  }`}
                />
                {isSupabaseActive
                  ? 'Supabase Cloud Database Terkoneksi'
                  : 'Mode Offline LocalStorage Aktif'}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1.5 max-w-xl leading-relaxed">
              Semua perubahan data langsung tersimpan secara aman di browser lokal Anda. Jika konfigurasi <code>VITE_SUPABASE_URL</code> ditambahkan pada <code>.env</code>, data otomatis tersinkronisasi ke PostgreSQL cloud Supabase.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setResetConfirmOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-800 text-xs font-bold border border-slate-300 transition-colors shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset ke Data Brosur Resmi</span>
        </button>
      </section>

      {/* Reset Confirmation Modal */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Kembalikan Seluruh Data ke Default?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tindakan ini akan mengembalikan seluruh produk, tabel rate deposito, dan testimoni kembali ke data resmi brosur BMT MAS (2022).
            </p>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setResetConfirmOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs"
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
