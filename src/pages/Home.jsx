import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ValueStrip from '../components/ValueStrip';
import AboutSection from '../components/AboutSection';
import BranchLocations from '../components/BranchLocations';
import { useBmt } from '../context/BmtContext';

export default function Home() {
  const { products } = useBmt();

  return (
    <div>
      {/* 1. Bagian Beranda */}
      <Hero />
      <ValueStrip />

      {/* 2. Bagian Tentang Kami */}
      <AboutSection />

      {/* 3. Bagian Lokasi Kantor & Layanan Pelayanan */}
      <BranchLocations />

      {/* 4. Section Tautan ke Halaman Khusus Produk & Deposito */}
      <section className="py-12 bg-emerald-950 text-white border-y border-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-1.5">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                Pilihan Produk Simpanan &amp; Simpanan Berjangka
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                Kunjungi halaman khusus katalog produk tabungan syariah atau simulasi keuntungan deposito secara lengkap.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                to="/produk"
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition-colors text-center"
              >
                Lihat Produk Simpanan ({products.length})
              </Link>

              <Link
                to="/deposito"
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white border border-emerald-700 font-bold text-xs sm:text-sm transition-colors text-center"
              >
                Kalkulator Deposito Syariah
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
