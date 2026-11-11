import React from 'react';
import { Link } from 'react-router-dom';
import DepositoSection from '../components/DepositoSection';
import TestimonialsSection from '../components/TestimonialsSection';
import { useBmt } from '../context/BmtContext';

export default function DepositoPage() {
  const { depositoRates, testimonials, institutionInfo } = useBmt();

  return (
    <div className="bg-white">
      {/* 1. BSI-Style Page Header */}
      <section className="bg-gradient-to-br from-[#004D4A] via-[#005F5B] to-[#003533] text-white py-14 sm:py-20">
        <div className="wrap space-y-4">
          <nav aria-label="Breadcrumb" className="text-xs text-white/75">
            <Link to="/" className="hover:text-[#F59E0B] transition-colors">
              Beranda
            </Link>
            <span className="mx-2 text-white/40">/</span>
            <span className="text-[#F59E0B] font-semibold">Simpanan Berjangka</span>
          </nav>

          <div className="max-w-3xl space-y-3">
            <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-[#FEF3C7]">
              Investasi Syariah Berkah
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Simpanan Berjangka Syariah BMT MAS
            </h1>
            <p className="text-white/85 text-sm sm:text-base leading-relaxed">
              Tempatkan dana investasi Anda pada instrumen simpanan berjangka syariah dengan pilihan tenor 3, 6, atau 12 bulan. Nikmati nisbah bagi hasil hingga 50:50 yang adil, transparan, dan berkesempatan memperoleh suvenir menarik.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Deposito Table & Calculator Section */}
      <DepositoSection depositoRates={depositoRates} />

      {/* 3. Member Testimonials Section */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 4. Education: Prinsip Mudharabah Muthlaqah */}
      <section className="py-16 lg:py-20 bg-slate-50 border-t border-slate-200">
        <div className="wrap space-y-10">
          <div className="max-w-3xl space-y-2.5">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#008580]">
              Edukasi Akad Syariah
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Prinsip Pengelolaan Mudharabah Muthlaqah
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Simpanan berjangka di BMT MAS dikelola secara produktif dan halal pada sektor usaha mikro di Kabupaten Gunungkidul.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="quiet-card bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-card">
              <div className="text-xs font-bold text-[#008580] uppercase tracking-wider">
                01 • Kemitraan Bagi Hasil
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Shahibul Maal &amp; Mudharib
              </h3>
              <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                Anggota bertindak sebagai pemilik dana (Shahibul Maal) dan BMT MAS sebagai pengelola amanah (Mudharib) yang menyalurkan pembiayaan ke sektor usaha riil halal.
              </p>
            </div>

            <div className="quiet-card bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-card">
              <div className="text-xs font-bold text-[#008580] uppercase tracking-wider">
                02 • Distribusi Bulanan
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Pencairan Bagi Hasil Setiap Bulan
              </h3>
              <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                Bagi hasil dihitung sesuai nisbah kesepakatan awal dan disetorkan setiap bulan ke rekening tabungan anggota. Pokok simpanan utuh 100% saat jatuh tempo.
              </p>
            </div>

            <div className="quiet-card bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-card">
              <div className="text-xs font-bold text-[#008580] uppercase tracking-wider">
                03 • Apresiasi Anggota
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Program Suvenir &amp; Hadiah Menarik
              </h3>
              <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                Setiap penempatan simpanan berjangka berkesempatan mendapatkan suvenir atau hadiah langsung selama persediaan masih ada.
              </p>
            </div>

            <div className="quiet-card bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-card">
              <div className="text-xs font-bold text-[#008580] uppercase tracking-wider">
                04 • Kemudahan Berkelanjutan
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Perpanjangan Otomatis (ARO)
              </h3>
              <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                Tersedia fasilitas Automatic Roll Over (ARO) sehingga simpanan berjangka Anda dapat diperpanjang secara otomatis saat jatuh tempo tanpa perlu datang ke kantor.
              </p>
            </div>
          </div>

          <div className="p-7 rounded-2xl bg-gradient-to-r from-[#004D4A] to-[#003533] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-extrabold text-base sm:text-lg text-white">
                Siap Menempatkan Simpanan Berjangka di BMT MAS?
              </h4>
              <p className="text-xs sm:text-sm text-white/80">
                Hubungi petugas simpanan berjangka kami untuk informasi jemput dokumen dan pembukaan rekening.
              </p>
            </div>
            <a
              href={`https://wa.me/${institutionInfo.waHeadOffice}?text=${encodeURIComponent(
                'Assalamualaikum BMT MAS, saya ingin berkonsultasi mengenai simpanan berjangka deposito syariah.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="quiet-btn inline-flex items-center px-6 py-3 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 font-bold text-xs sm:text-sm transition-colors shrink-0 shadow-sm"
            >
              <span>Konsultasi via WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
