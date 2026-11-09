import React from 'react';
import { Link } from 'react-router-dom';
import DepositoSection from '../components/DepositoSection';
import TestimonialsSection from '../components/TestimonialsSection';
import { useBmt } from '../context/BmtContext';

export default function DepositoPage() {
  const { depositoRates, testimonials, institutionInfo } = useBmt();

  return (
    <div className="pt-4 pb-20">
      {/* 1. Page Header & Breadcrumbs */}
      <section className="bg-emerald-950 text-white py-12 sm:py-16 border-b border-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <nav aria-label="Breadcrumb" className="text-xs text-emerald-200/80">
            <Link to="/" className="hover:text-amber-300">
              Beranda
            </Link>
            <span className="mx-2">/</span>
            <span className="text-amber-300">Simpanan Berjangka</span>
          </nav>

          <div className="max-w-3xl space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Simpanan Berjangka Syariah BMT MAS
            </h1>
            <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed">
              Tempatkan dana investasi Anda pada instrumen simpanan berjangka syariah dengan pilihan tenor 3, 6, atau 12 bulan. Nikmati nisbah bagi hasil yang adil, stabil, transparan, dan berkesempatan mendapatkan hadiah langsung menarik.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Deposito Table & Calculator Section */}
      <div>
        <DepositoSection depositoRates={depositoRates} />
      </div>

      {/* 3. Member Testimonials Section */}
      <div className="mt-8">
        <TestimonialsSection testimonials={testimonials} />
      </div>

      {/* 4. Education: Prinsip Mudharabah Muthlaqah */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="rounded-2xl bg-white border border-stone-200 p-6 sm:p-8 space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h3 className="text-lg font-bold text-stone-900">
              Tentang Akad Mudharabah Muthlaqah
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              Prinsip syariah yang melandasi pengelolaan Simpanan Berjangka di BMT MAS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <h4 className="font-bold text-stone-900 text-sm">
                Prinsip Kemitraan Bagi Hasil
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Dalam akad Mudharabah Muthlaqah, anggota bertindak sebagai pemilik dana (Shahibul Maal) dan BMT MAS sebagai pengelola (Mudharib). Dana disalurkan ke pembiayaan sektor riil produktif yang halal di Gunungkidul.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <h4 className="font-bold text-stone-900 text-sm">
                Pencairan Bagi Hasil Bulanan
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Bagi hasil dihitung berdasarkan nisbah yang disepakati di awal dan dibagikan setiap bulan sesuai pendapatan riil usaha BMT MAS. Dana pokok simpanan berjangka tetap utuh dan dikembalikan pada saat jatuh tempo.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <h4 className="font-bold text-stone-900 text-sm">
                Program Hadiah Menarik
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Setiap penempatan simpanan berjangka berkesempatan mendapatkan suvenir atau hadiah menarik selama persediaan masih ada, sebagai bentuk apresiasi bagi anggota yang berkomitmen berinvestasi syariah.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <h4 className="font-bold text-stone-900 text-sm">
                Fasilitas Perpanjangan Otomatis (ARO)
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Anggota dapat memilih opsi perpanjangan otomatis saat jatuh tempo (Automatic Roll Over), sehingga pokok simpanan dapat terus menghasilkan keuntungan bagi hasil secara berkesinambungan.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <span className="text-xs text-stone-600">
              Ingin konsultasi langsung dengan petugas simpanan berjangka BMT MAS?
            </span>
            <a
              href={`https://wa.me/${institutionInfo.waHeadOffice}?text=Assalamualaikum%20BMT%20MAS,%20saya%20ingin%20berkonsultasi%20mengenai%20simpanan%20berjangka%20deposito.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-xs transition-colors shrink-0"
            >
              Konsultasi WhatsApp Sekarang
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
