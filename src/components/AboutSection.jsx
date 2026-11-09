import React from 'react';
import { Link } from 'react-router-dom';
import { DEPOSITO_REQUIREMENTS } from '../data/fallbackData';
import { useBmt } from '../context/BmtContext';

export default function AboutSection() {
  const { institutionInfo } = useBmt();

  return (
    <section
      id="tentang"
      className="py-16 lg:py-24 bg-[#FDFBF7] border-t border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN: Profil Lembaga & Legalitas */}
          <div className="lg:col-span-5 rounded-3xl bg-emerald-950 text-white p-7 sm:p-9 shadow-sm space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-white leading-tight">
                {institutionInfo.fullName}
              </h2>
              <p className="text-sm font-semibold text-amber-300">
                {institutionInfo.subName}
              </p>
            </div>

            <p className="text-sm text-emerald-100/90 leading-relaxed">
              Hadir di tengah masyarakat Gunungkidul sebagai mitra keuangan mikro syariah yang menjunjung tinggi kejujuran, transparansi akad, dan keberkahan usaha bersama tanpa jeratan riba.
            </p>

            <div className="p-4 rounded-xl bg-emerald-900 border border-emerald-800 space-y-1 text-xs">
              <span className="text-stone-300 font-bold uppercase tracking-wider block">
                Nomor Badan Hukum
              </span>
              <div className="text-base font-bold text-white tabular-nums">
                {institutionInfo.legalNumber}
              </div>
              <p className="text-emerald-200">
                Koperasi Simpan Pinjam &amp; Pembiayaan Syariah (KSPPS).
              </p>
            </div>

            <div className="pt-4 border-t border-emerald-800/80 space-y-3">
              <div>
                <span className="text-xs text-stone-300 block">
                  Call Center Pelayanan:
                </span>
                <a
                  href={`tel:${institutionInfo.callCenter.replace(/[^0-9]/g, '')}`}
                  className="text-xl font-bold text-amber-300 hover:text-white transition-colors tabular-nums"
                >
                  {institutionInfo.callCenter}
                </a>
              </div>

              <p className="text-xs text-emerald-200 leading-relaxed">
                Kantor Pusat Semanu &amp; Kantor Cabang Paliyan, Kabupaten Gunungkidul.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Komitmen & Syarat Pembukaan */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
                Komitmen Melayani Umat dengan Amanah, Mudah, dan Syar&apos;i
              </h3>

              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                KSPP Syariah BMT MAS fokus memberdayakan ekonomi keluarga, pedagang pasar, aparatur, hingga pelaku UMKM di Gunungkidul. Seluruh simpanan dikelola secara produktif dan halal tanpa potongan biaya administrasi bulanan, serta didukung petugas lapangan yang proaktif menjalankan layanan jemput bola.
              </p>
            </div>

            {/* Checklist Syarat */}
            <div className="rounded-2xl bg-white border border-stone-200 p-6 sm:p-8 space-y-6">
              <div className="border-b border-stone-100 pb-4">
                <h4 className="text-base font-bold text-stone-900">
                  Syarat Pembukaan Simpanan Berjangka
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  Proses administrasi cepat dan transparan di seluruh kantor layanan.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DEPOSITO_REQUIREMENTS.map((req) => (
                  <div
                    key={req.code}
                    className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1.5"
                  >
                    <div className="text-xs font-bold text-amber-700 tabular-nums">
                      {req.code}
                    </div>
                    <h5 className="text-sm font-bold text-stone-900">
                      {req.title}
                    </h5>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {req.detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <span className="text-stone-600">
                  Ingin menghitung perkiraan keuntungan bagi hasil simpanan berjangka?
                </span>
                <Link
                  to="/deposito"
                  className="font-bold text-emerald-950 hover:underline"
                >
                  Buka Halaman Deposito →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
