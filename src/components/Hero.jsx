import React from 'react';
import { Link } from 'react-router-dom';
import { useBmt } from '../context/BmtContext';

export default function Hero() {
  const { institutionInfo } = useBmt();

  const waOpenSavingsUrl = `https://wa.me/${institutionInfo.waHeadOffice}?text=${encodeURIComponent(
    'Assalamualaikum BMT MAS, saya ingin membuka rekening tabungan syariah di BMT MAS. Mohon informasi syarat dan prosedurnya.'
  )}`;

  const heroPhotoUrl =
    institutionInfo.heroImage ||
    'https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=1000&q=80';

  return (
    <section
      id="beranda"
      className="relative bg-gradient-to-br from-[#004D4A] via-[#005F5B] to-[#003533] text-white pt-12 pb-24 lg:pt-16 lg:pb-32 overflow-hidden"
    >
      {/* Subtle BSI-style Geometric Accent Glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#00A39D]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-[#F59E0B]/10 blur-3xl pointer-events-none" />

      <div className="wrap relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* LEFT COLUMN: Main Headline & CTA (BSI Banner Style) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-[3.15rem] font-extrabold text-white tracking-tight leading-[1.15]">
                Sahabat Finansial Syariah untuk{' '}
                <span className="text-[#F59E0B]">
                  Hidup Lebih Berkah
                </span>
              </h1>

              <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl">
                Wujudkan rencana keuangan keluarga dan usaha bersama <strong className="text-white font-semibold">KSPP Syariah BMT MAS</strong>. Simpanan utuh tanpa potongan administrasi bulanan, bagi hasil transparan, dan layanan jemput bola di Gunungkidul.
              </p>
            </div>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href={waOpenSavingsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="quiet-btn inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-[#F59E0B] hover:bg-[#D97706] shadow-md text-center"
              >
                <span>Buka Rekening Sekarang</span>
              </a>

              <Link
                to="/deposito"
                className="quiet-btn inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-xs transition-colors text-center"
              >
                <span>Simulasi Bagi Hasil</span>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Visual Frame */}
          <div className="lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 shadow-2xl">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 shadow-inner">
                <img
                  src={heroPhotoUrl}
                  alt="Pelayanan Anggota KSPP Syariah BMT MAS Gunungkidul"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
