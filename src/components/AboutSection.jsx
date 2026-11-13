import React from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { DEPOSITO_REQUIREMENTS, VALUE_PROPOSITIONS } from '../data/fallbackData';
import { useBmt } from '../context/BmtContext';

export default function AboutSection() {
  const { institutionInfo } = useBmt();

  return (
    <section
      id="tentang"
      className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200"
    >
      <div className="wrap space-y-14">
        {/* Section Header */}
        <div className="max-w-3xl space-y-2.5">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Lembaga Keuangan Mikro Syariah yang Amanah &amp; Terpercaya
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Berdiri resmi sejak tahun 2010 di Kabupaten Gunungkidul, KSPP Syariah BMT MAS hadir mendampingi keluarga, pedagang pasar, dan pelaku UMKM melalui layanan keuangan bebas riba.
          </p>
        </div>

        {/* 4 Pilar Keunggulan (BSI Clean Feature Strip) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUE_PROPOSITIONS.map((item) => (
            <div
              key={item.id}
              className="quiet-card bg-white rounded-2xl p-6 border border-slate-200/90 shadow-card flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <h3 className="text-base font-extrabold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="h-1 w-10 rounded-full bg-[#00A39D]/40" />
            </div>
          ))}
        </div>

        {/* 2-Column Institutional Identity & Requirements */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: BSI-Style Corporate Legal Plaque */}
          <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-[#004D4A] to-[#003533] text-white p-7 sm:p-8 shadow-lg flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {institutionInfo.fullName}
                </h3>
                <p className="text-xs text-[#5EEAD4] font-semibold">
                  {institutionInfo.subName}
                </p>
              </div>

              {/* Quran Verse Foundation */}
              {institutionInfo.quranVerse && (
                <div className="p-4 rounded-xl bg-[#002927]/70 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-[#5EEAD4] font-semibold">
                    <span>Landasan Syariah</span>
                    <span>{institutionInfo.quranVerse.surah}</span>
                  </div>
                  <p className="font-serif text-sm text-white text-right leading-loose">
                    {institutionInfo.quranVerse.arabic}
                  </p>
                  <p className="text-[11px] text-white/80 leading-relaxed italic">
                    {institutionInfo.quranVerse.translation}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/15 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-white/75 block">
                  Call Center Layanan:
                </span>
                <a
                  href={`tel:${institutionInfo.callCenter.replace(/[^0-9]/g, '')}`}
                  className="inline-flex items-center gap-1.5 text-lg font-extrabold text-[#F59E0B] hover:text-white transition-colors tabular-nums mt-0.5"
                >
                  <Phone className="w-4 h-4" />
                  <span>{institutionInfo.callCenter}</span>
                </a>
              </div>
              <span className="text-[11px] text-white/75 text-right">
                Semanu &amp; Paliyan<br />Gunungkidul
              </span>
            </div>
          </div>

          {/* Right Column: Syarat Pembukaan Simpanan */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-7 sm:p-8 shadow-card flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#008580]">
                  Kemudahan Administrasi
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                  Syarat Pembukaan Simpanan &amp; Deposito Syariah
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Proses pendaftaran cepat, transparan, dan dapat dibantu langsung oleh petugas lapangan kami.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DEPOSITO_REQUIREMENTS.map((req) => (
                  <div
                    key={req.code}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5"
                  >
                    <h4 className="text-sm font-bold text-slate-900">
                      {req.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {req.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end text-xs">
              <Link
                to="/deposito"
                className="inline-flex items-center font-bold text-[#008580] hover:text-[#004D4A] transition-colors shrink-0"
              >
                <span>Buka Halaman Deposito</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
