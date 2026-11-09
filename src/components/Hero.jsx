import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useBmt } from '../context/BmtContext';

export default function Hero() {
  const { institutionInfo } = useBmt();
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-hero-reveal',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const waOpenSavingsUrl = `https://wa.me/${institutionInfo.waHeadOffice}?text=${encodeURIComponent(
    'Assalamualaikum BMT MAS, saya ingin membuka tabungan syariah di BMT MAS. Mohon informasi lengkapnya.'
  )}`;

  const heroPhotoUrl =
    institutionInfo.heroImage ||
    'https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=1000&q=80';

  return (
    <section
      id="beranda"
      ref={heroRef}
      className="relative overflow-hidden bg-[#FDFBF7] pt-12 pb-20 lg:pt-16 lg:pb-24"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN: Main Headline & Core Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="gsap-hero-reveal space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-800">
                {institutionInfo.fullName}
              </p>

              <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-stone-900 tracking-tight leading-[1.15]">
                Bersama BMT MAS,{' '}
                <span className="text-emerald-900">
                  Transaksi Syariah
                </span>{' '}
                untuk Hidup Lebih Berkah
              </h1>
            </div>

            <p className="gsap-hero-reveal text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl">
              Wujudkan ketenangan finansial keluarga melalui produk tabungan dan simpanan berjangka syariah yang bebas potongan administrasi bulanan, memberikan bagi hasil kompetitif, serta dikelola secara amanah di wilayah Gunungkidul.
            </p>

            {/* Primary & Secondary Action Buttons (Clean, no icons) */}
            <div className="gsap-hero-reveal flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href={waOpenSavingsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-emerald-950 hover:bg-emerald-900 transition-colors shadow-sm"
              >
                Buka Tabungan Sekarang
              </a>

              <Link
                to="/produk"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-sm font-bold text-stone-800 bg-white hover:bg-stone-100 border border-stone-300 transition-colors"
              >
                Lihat Produk Simpanan
              </Link>
            </div>

            {/* Metrics Strip */}
            <div className="gsap-hero-reveal pt-6 border-t border-stone-200 grid grid-cols-3 gap-6 max-w-xl">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-950 tabular-nums">
                  Rp 0
                </div>
                <p className="text-xs text-stone-600 mt-1">
                  Potongan Admin Bulanan
                </p>
              </div>

              <div className="border-l border-stone-200 pl-6">
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-700 tabular-nums">
                  50 : 50
                </div>
                <p className="text-xs text-stone-600 mt-1">
                  Nisbah Deposito 12 Bln
                </p>
              </div>

              <div className="border-l border-stone-200 pl-6">
                <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 tabular-nums">
                  2 Kantor
                </div>
                <p className="text-xs text-stone-600 mt-1">
                  Semanu &amp; Paliyan
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Corporate Photo & Logo Frame (Layout seperti projek KOPDES) */}
          <div className="lg:col-span-5">
            <div className="gsap-hero-reveal bg-white p-3 rounded-2xl border border-stone-200 shadow-sm">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100">
                <img
                  src={heroPhotoUrl}
                  alt="Aktivitas Pelayanan BMT MAS"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>

              <div className="p-3.5 text-center border-t border-stone-100 mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-left">
                  <div className="w-9 h-9 rounded-xl bg-emerald-950 text-amber-400 font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs">
                    MAS
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-stone-900 leading-tight">
                      {institutionInfo.fullName}
                    </h2>
                    <p className="text-[11px] text-stone-500">
                      {institutionInfo.region || 'Gunungkidul, D.I. Yogyakarta'}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700">
                  {institutionInfo.heroBadge || 'Kantor Pelayanan'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
