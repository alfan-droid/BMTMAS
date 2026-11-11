import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import Hero from '../components/Hero';
import ValueStrip from '../components/ValueStrip';
import AboutSection from '../components/AboutSection';
import BranchLocations from '../components/BranchLocations';
import { useBmt } from '../context/BmtContext';

function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount || 0));
}

export default function Home() {
  const { depositoRates, institutionInfo } = useBmt();
  const [simNominal, setSimNominal] = useState(10000000);
  const [simTenor, setSimTenor] = useState(12);
  const [openFaq, setOpenFaq] = useState(0);

  const selectedRate =
    depositoRates.find((r) => Number(r.tenor_months) === Number(simTenor)) ||
    depositoRates[2] || {
      tenor_months: 12,
      nisbah_anggota: 50,
      nisbah_bmt: 50,
      avg_monthly_rate: 1.1,
    };

  const monthlyProfit = (simNominal * Number(selectedRate.avg_monthly_rate || 1.1)) / 100;
  const totalProfit = monthlyProfit * Number(selectedRate.tenor_months || 12);

  const waHeadOffice = institutionInfo?.waHeadOffice || '6281234567890';

  const faqs = [
    {
      q: "Apa perbedaan akad Wadi'ah pada TAMARA dan Mudharabah pada TADIKA?",
      a: "TAMARA menggunakan akad Wadi'ah Yad Dhamanah (titipan amanah) untuk simpanan harian yang dapat ditarik kapan saja tanpa potongan biaya administrasi bulanan. TADIKA menggunakan akad Mudharabah dengan nisbah 25:75 untuk tabungan pendidikan anak dengan bagi hasil berkala.",
    },
    {
      q: "Apakah penarikan simpanan harus selalu datang ke kantor cabang?",
      a: "Tidak harus. Selain layanan kas di Kantor Pusat Semanu dan Cabang Paliyan, Anda dapat menjadwalkan petugas jemput bola untuk setoran maupun penarikan langsung di kios pasar atau rumah tempat usaha Anda.",
    },
    {
      q: "Bagaimana cara menghitung pembagian bagi hasil Deposito Mudharabah?",
      a: "Bagi hasil dihitung dari pendapatan riil pembiayaan usaha produktif anggota BMT MAS setiap bulan. Porsi nisbah (misal 50:50 pada tenor 12 bulan) dikreditkan langsung ke rekening tabungan TAMARA Anda setiap tanggal jatuh tempo bulanan.",
    },
    {
      q: "Berapa setoran awal untuk mulai membuka rekening simpanan?",
      a: "Cukup menyiapkan KTP elektronik yang masih berlaku dan setoran awal mulai Rp 10.000 untuk tabungan harian TAMARA/TADIKA, atau mulai Rp 1.000.000 untuk penempatan Deposito Mudharabah.",
    },
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen">
      {/* 1. Hero Banner & Floating Quick-Access Dock */}
      <Hero />
      <ValueStrip />

      {/* 2. UI/UX Pro Max Bento Grid: Showcase Portofolio Produk Finansial */}
      <section id="produk-bento" className="py-16 lg:py-24 bg-white border-b border-slate-200">
        <div className="wrap space-y-12">
          {/* Section Heading */}
          <div className="pb-2 border-b border-slate-100">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Simpanan Terencana, Bebas Riba &amp; Tanpa Potongan
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Setiap produk dirancang memenuhi kaidah syariah murni dengan akad yang jelas sejak awal.
                Dana Anda disalurkan untuk permodalan usaha riil warga Gunungkidul.
              </p>
            </div>
          </div>

          {/* BENTO GRID (12 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
            {/* Tile 1: TAMARA (Span-7, Primary Anchor) */}
            <article className="lg:col-span-7 p-7 sm:p-9 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-[#003533] text-white border border-slate-800 shadow-xl flex flex-col justify-between space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-5 relative z-10">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                    Simpanan TAMARA (Mitra Terpercaya)
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 mt-2.5 leading-relaxed max-w-xl">
                    Tabungan transaksi harian tanpa potongan administrasi bulanan. Dana dapat disetor maupun ditarik sewaktu-waktu di kantor kas maupun lewat petugas jemput bola.
                  </p>
                </div>

                {/* Live Mock Stats inside TAMARA */}
                <div className="grid grid-cols-3 gap-3 pt-3">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 font-medium block">Biaya Bulanan</span>
                    <strong className="text-base sm:text-lg font-bold text-emerald-400 font-mono">Rp 0,-</strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 font-medium block">Setoran Awal</span>
                    <strong className="text-base sm:text-lg font-bold text-white font-mono">Rp 10.000</strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[11px] text-slate-400 font-medium block">Penarikan</span>
                    <strong className="text-base sm:text-lg font-bold text-amber-400">Kapan Saja</strong>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                <span className="text-xs text-slate-300">
                  Tersedia untuk perorangan, kelompok, dan badan usaha.
                </span>
                <a
                  href={`https://wa.me/${waHeadOffice}?text=${encodeURIComponent(
                    'Assalamualaikum BMT MAS, saya ingin membuka rekening Simpanan TAMARA (Wadi\'ah). Mohon dibantu persyaratannya.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md"
                >
                  <span>Buka Simpanan TAMARA</span>
                </a>
              </div>
            </article>

            {/* Tile 2: Deposito Mudharabah 12 Bulan (Span-5, High-Yield Highlight) */}
            <article className="lg:col-span-5 p-7 sm:p-9 rounded-2xl bg-gradient-to-br from-[#004D4A] to-[#002D2B] text-white border border-emerald-800 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="space-y-5">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    Deposito Mudharabah (12 Bulan)
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 leading-relaxed">
                    Porsi bagi hasil tertinggi untuk rencana keuangan jangka panjang keluarga dan modal produktif.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/25 border border-white/10 space-y-2">
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="text-emerald-200">Nisbah Anggota : BMT</span>
                    <strong className="text-xl font-bold font-mono text-amber-400">50% : 50%</strong>
                  </div>
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="text-emerald-200">Penempatan Mulai</span>
                    <strong className="text-sm font-semibold font-mono text-white">Rp 1.000.000</strong>
                  </div>
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="text-emerald-200">Pencairan Bagi Hasil</span>
                    <strong className="text-xs font-medium text-emerald-300">Tiap Bulan ke TAMARA</strong>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${waHeadOffice}?text=${encodeURIComponent(
                    'Assalamualaikum BMT MAS, saya tertarik dengan Deposito Mudharabah tenor 12 bulan (Nisbah 50:50). Mohon informasi cara penempatannya.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md"
                >
                  <span>Ajukan Bilyet Deposito</span>
                </a>
              </div>
            </article>

            {/* Tile 3: TADIKA Tabungan Pendidikan (Span-4) */}
            <article className="lg:col-span-4 p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-slate-900">Simpanan TADIKA (Pendidikan)</h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Menyiapkan dana masuk sekolah anak sejak dini tanpa potongan biaya admin, dengan bagi hasil terencana.
                  </p>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700 border-t border-slate-100 pt-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Setoran awal ringan Rp 10.000</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Dapat ditarik saat kenaikan kelas</span>
                  </li>
                </ul>
              </div>
              <Link
                to="/produk"
                className="w-full inline-flex items-center justify-center py-2.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors"
              >
                <span>Pelajari Detail TADIKA</span>
              </Link>
            </article>

            {/* Tile 4: Layanan Jemput Bola (Span-4) */}
            <article className="lg:col-span-4 p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-slate-900">Layanan Jemput Bola Pasar</h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Petugas lapangan kami mendatangi kios pasar dan toko Anda secara rutin. Menabung dan setor simpanan tanpa meninggalkan tempat usaha.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1">
                  <div className="font-semibold text-slate-900">Jangkauan Wilayah:</div>
                  <div>Pasar Semanu, Ponjong, Paliyan, dan sekitarnya.</div>
                </div>
              </div>
              <a
                href={`https://wa.me/${waHeadOffice}?text=${encodeURIComponent(
                  'Assalamualaikum BMT MAS, saya ingin mendaftar layanan jemput bola setoran ke tempat usaha saya.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center py-2.5 rounded-xl text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 transition-colors"
              >
                <span>Jadwalkan Kunjungan Petugas</span>
              </a>
            </article>

            {/* Tile 5: Transparansi Kelembagaan & Legalitas (Span-4) */}
            <article className="lg:col-span-4 p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-slate-900">Amanah &amp; Akuntabel</h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Telah melayani ribuan warga dengan pengawasan Dewan Pengawas Syariah resmi. Laporan kinerja keuangan diaudit dan dipertanggungjawabkan dalam RAT berkala.
                  </p>
                </div>
                <div className="text-xs text-slate-600 border-t border-slate-100 pt-3 space-y-1">
                  <div className="font-semibold text-slate-900">2 Kantor Pelayanan:</div>
                  <div>• Kantor Pusat: Munggi Pasar, Semanu</div>
                  <div>• Kantor Cabang: Karangduwet, Paliyan</div>
                </div>
              </div>
              <Link
                to="/#lokasi"
                className="w-full inline-flex items-center justify-center py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <span>Lihat Peta Kantor Cabang</span>
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* 3. SIMULATOR BAGI HASIL INTERAKTIF TERPADU */}
      <section id="kalkulator" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Input Kontrol */}
            <div className="lg:col-span-7 bg-white p-7 sm:p-9 rounded-3xl border border-slate-200 shadow-sm space-y-8">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Kalkulator Syariah Interaktif
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Simulasi Estimasi Bagi Hasil Deposito
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Geser atau pilih nominal simpanan dan tentukan jangka waktu penempatan dana untuk melihat proyeksi bagi hasil riil setiap bulan.
                </p>
              </div>

              {/* Pilihan Nominal Cepat */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="range-nominal" className="text-xs font-bold text-slate-800">
                    Nominal Penempatan Dana:
                  </label>
                  <span className="text-lg font-extrabold text-emerald-800 font-mono">
                    {formatRupiah(simNominal)}
                  </span>
                </div>

                {/* Range Slider */}
                <input
                  id="range-nominal"
                  type="range"
                  min={1000000}
                  max={100000000}
                  step={1000000}
                  value={simNominal}
                  onChange={(e) => setSimNominal(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#004D4A]"
                />

                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Rp 1 Juta</span>
                  <span>Rp 50 Juta</span>
                  <span>Rp 100 Juta</span>
                </div>

                {/* Preset Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {[1000000, 5000000, 10000000, 50000000].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setSimNominal(val)}
                      className={`py-2 px-2.5 rounded-lg text-xs font-bold border transition-all ${
                        simNominal === val
                          ? 'bg-[#004D4A] text-white border-[#004D4A]'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-600'
                      }`}
                    >
                      {formatRupiah(val)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pilihan Tenor */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-800 block">
                  Pilih Jangka Waktu (Tenor):
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {depositoRates.map((rate) => {
                    const active = Number(simTenor) === Number(rate.tenor_months);
                    return (
                      <button
                        key={rate.tenor_months}
                        type="button"
                        onClick={() => setSimTenor(Number(rate.tenor_months))}
                        className={`p-3.5 rounded-xl border text-left transition-all ${
                          active
                            ? 'border-emerald-700 bg-emerald-50 ring-2 ring-emerald-700'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="text-sm font-extrabold text-slate-900">
                          {rate.tenor_months} Bulan
                        </div>
                        <div className="text-xs font-bold text-emerald-800 mt-0.5">
                          Nisbah {rate.nisbah_anggota} : {rate.nisbah_bmt}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5 font-mono">
                          ~{Number(rate.avg_monthly_rate).toFixed(2)}% / bln
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Output Panel Hasil Simulasi */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#004D4A] via-[#003D3A] to-[#002D2B] text-white p-7 sm:p-9 rounded-3xl shadow-xl flex flex-col justify-between space-y-8 border border-emerald-800">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <span className="text-xs text-emerald-200 font-medium">Ringkasan Proyeksi</span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-400 text-slate-950">
                    Tenor {selectedRate.tenor_months} Bulan
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-xl bg-black/20 border border-white/10 space-y-1">
                    <span className="text-emerald-200 text-xs block">Estimasi Bagi Hasil Bulanan:</span>
                    <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-300 tracking-tight">
                      {formatRupiah(monthlyProfit)}
                    </div>
                    <span className="text-[11px] text-emerald-300 block">
                      Ditransfer otomatis ke Tabungan TAMARA setiap bulan
                    </span>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-slate-200">
                      <span>Total Bagi Hasil ({selectedRate.tenor_months} Bulan):</span>
                      <span className="text-sm font-bold font-mono text-white">
                        + {formatRupiah(totalProfit)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-200">
                      <span>Porsi Nisbah Disepakati:</span>
                      <span className="text-xs font-mono font-bold text-amber-300">
                        {selectedRate.nisbah_anggota}% Anggota : {selectedRate.nisbah_bmt}% BMT
                      </span>
                    </div>
                    <div className="pt-3 border-t border-white/15 flex items-baseline justify-between">
                      <span className="font-semibold text-white">Total Saat Jatuh Tempo:</span>
                      <span className="text-xl font-extrabold font-mono text-white">
                        {formatRupiah(simNominal + totalProfit)}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-emerald-200/80 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/10">
                  *Catatan: Proyeksi di atas merupakan simulasi berdasarkan rata-rata historis penyaluran pembiayaan produktif BMT MAS dan tidak bersifat mengikat bunga tetap (riba).
                </p>
              </div>

              <div>
                <a
                  href={`https://wa.me/${waHeadOffice}?text=${encodeURIComponent(
                    `Assalamualaikum BMT MAS, saya telah melakukan simulasi deposito sebesar ${formatRupiah(
                      simNominal
                    )} dengan tenor ${selectedRate.tenor_months} bulan. Mohon informasi untuk pembukaan bilyet.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm transition-all shadow-md"
                >
                  <span>Kunci &amp; Ajukan Bilyet Ini via WA</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TENTANG KAMI & PROFIL KELEMBAGAAN */}
      <AboutSection />

      {/* 5. TANYA JAWAB AKAD SYARIAH (FAQ INTERAKTIF) */}
      <section id="faq" className="py-16 lg:py-24 bg-white border-b border-slate-200">
        <div className="wrap max-w-4xl space-y-10">
          <div className="text-center space-y-3">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-emerald-800">
              Pertanyaan Umum Anggota
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Kaidah Akad &amp; Transparansi Layanan
            </h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              Penjelasan ringkas seputar akad syariah, hak bagi hasil, dan kemudahan fasilitas penarikan dana.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-emerald-800 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`text-lg font-bold leading-none shrink-0 transition-colors ${
                        isOpen ? 'text-emerald-700' : 'text-slate-400'
                      }`}
                    >
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. JARINGAN KANTOR & LOKASI CABANG */}
      <BranchLocations />

      {/* 7. FAST CONVERSION CTA BANNER */}
      <section className="py-14 bg-gradient-to-r from-[#003533] via-[#004D4A] to-[#003533] text-white">
        <div className="wrap flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Mulai Simpanan Syariah Anda Hari Ini
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl">
              Cukup siapkan KTP elektronik dan setoran awal mulai Rp 10.000. Petugas kami siap melayani di kantor cabang maupun jemput bola ke lokasi Anda.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/${waHeadOffice}?text=${encodeURIComponent(
                'Assalamualaikum BMT MAS, saya ingin membuka rekening simpanan syariah baru. Mohon dipandu prosedurnya.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md"
            >
              <span>Hubungi CS Semanu &amp; Paliyan</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
