import React, { useState, useMemo } from 'react';
import { useBmt } from '../context/BmtContext';

const SEMESTER_1_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'];
const SEMESTER_2_MONTHS = ['Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
const ALL_MONTHS = [...SEMESTER_1_MONTHS, ...SEMESTER_2_MONTHS];

const PRESET_NOMINALS = [
  { label: '1 Jt', value: 1000000 },
  { label: '5 Jt', value: 5000000 },
  { label: '10 Jt', value: 10000000 },
  { label: '50 Jt', value: 50000000 },
];

function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount || 0));
}

function formatPercent(val) {
  if (val === undefined || val === null) return '-';
  return `${Number(val).toFixed(2)}%`;
}

export default function DepositoSection({ depositoRates = [] }) {
  const { institutionInfo } = useBmt();
  const [semesterTab, setSemesterTab] = useState('ALL');
  const [nominal, setNominal] = useState(10000000);
  const [selectedTenor, setSelectedTenor] = useState(12);

  const displayedMonths = useMemo(() => {
    if (semesterTab === 'S1') return SEMESTER_1_MONTHS;
    if (semesterTab === 'S2') return SEMESTER_2_MONTHS;
    return ALL_MONTHS;
  }, [semesterTab]);

  const activeRateConfig = useMemo(() => {
    const found = depositoRates.find(
      (r) => Number(r.tenor_months) === Number(selectedTenor)
    );
    if (found) return found;
    return {
      tenor_months: 12,
      tenor_label: 'Jangka Waktu 12 Bulan',
      nisbah_anggota: 50,
      nisbah_bmt: 50,
      avg_monthly_rate: 1.1,
    };
  }, [depositoRates, selectedTenor]);

  const validNominal = Math.max(1000000, Number(nominal) || 1000000);
  const monthlyRatePercent = Number(activeRateConfig.avg_monthly_rate) || 0.88;
  const estimatedMonthlyProfit = (validNominal * monthlyRatePercent) / 100;
  const estimatedTotalProfit =
    estimatedMonthlyProfit * Number(activeRateConfig.tenor_months);
  const estimatedTotalMaturity = validNominal + estimatedTotalProfit;

  const handleRawInputChange = (e) => {
    const rawDigits = e.target.value.replace(/[^0-9]/g, '');
    const numeric = rawDigits ? parseInt(rawDigits, 10) : 0;
    setNominal(numeric);
  };

  const buildDepositoWaUrl = () => {
    const text = `Assalamualaikum BMT MAS, saya ingin berkonsultasi / membuka *Simpanan Berjangka (Deposito Syariah)* sesuai hasil simulasi berikut:
• Nominal Penempatan: *${formatRupiah(validNominal)}* (+ Rp 10.000 meterai)
• Tenor Pilihan: *${activeRateConfig.tenor_months} Bulan* (Nisbah Anggota ${activeRateConfig.nisbah_anggota}%)
• Estimasi Rata-rata Bagi Hasil / Bulan (~${formatPercent(monthlyRatePercent)}): *${formatRupiah(estimatedMonthlyProfit)}*
• Total Estimasi Bagi Hasil (${activeRateConfig.tenor_months} Bulan): *${formatRupiah(estimatedTotalProfit)}*
• Proyeksi Total saat Jatuh Tempo: *${formatRupiah(estimatedTotalMaturity)}*

Mohon panduan prosedur pembukaan simpanan berjangka tersebut. Terima kasih.`;

    return `https://wa.me/${institutionInfo.waHeadOffice}?text=${encodeURIComponent(
      text
    )}`;
  };

  return (
    <section className="py-14 lg:py-20 bg-slate-50 border-b border-slate-200">
      <div className="wrap space-y-12">
        {/* 1. Tabel Equivalent Rate Simpanan Berjangka */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
          <div className="p-6 sm:p-7 bg-[#004D4A] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#F59E0B]">
                Transparansi Kinerja Historis
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                Tabel Equivalent Rate Simpanan Berjangka (Tahun 2022)
              </h2>
              <p className="text-xs text-white/80">
                Klik salah satu baris tenor untuk menerapkan langsung ke kalkulator simulasi di bawah
              </p>
            </div>

            {/* Filter Tab Semester */}
            <div className="flex items-center gap-1 border border-white/20 rounded-xl p-1 bg-[#003533] self-start sm:self-center">
              {[
                { id: 'ALL', label: '12 Bulan' },
                { id: 'S1', label: 'Semester I' },
                { id: 'S2', label: 'Semester II' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSemesterTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    semesterTab === tab.id
                      ? 'bg-[#F59E0B] text-slate-950 shadow-xs'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px] text-xs">
              <thead>
                <tr className="border-b-2 border-slate-200 text-slate-700 bg-slate-50 font-bold">
                  <th className="py-3.5 px-4 text-slate-900">
                    Jangka Waktu &amp; Nisbah
                  </th>
                  {displayedMonths.map((m) => (
                    <th key={m} className="py-3.5 px-2 text-center text-slate-700">
                      {m}
                    </th>
                  ))}
                  <th className="py-3.5 px-4 text-center font-extrabold text-[#004D4A] bg-[#E6F6F5]/60">
                    Rata-rata / Bln
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 tabular-nums">
                {depositoRates.map((row) => {
                  const isSelected =
                    Number(row.tenor_months) === Number(selectedTenor);
                  const ratesObj = row.monthly_rates || {};

                  return (
                    <tr
                      key={row.tenor_months}
                      onClick={() => setSelectedTenor(Number(row.tenor_months))}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[#F0FDF9] font-semibold'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="font-extrabold text-slate-900 text-sm">
                          {row.tenor_months} Bulan
                        </div>
                        <div className="text-[11px] text-[#008580] font-bold mt-0.5">
                          Nisbah Anggota {row.nisbah_anggota}% : BMT {row.nisbah_bmt}%
                        </div>
                      </td>

                      {displayedMonths.map((m) => (
                        <td key={m} className="py-4 px-2 text-center text-slate-700 font-medium">
                          {formatPercent(ratesObj[m])}
                        </td>
                      ))}

                      <td className="py-4 px-4 text-center font-extrabold text-[#004D4A] bg-[#E6F6F5]/40">
                        ~{formatPercent(row.avg_monthly_rate)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Kalkulator Simulasi Deposito */}
        <div className="bg-white rounded-2xl border border-slate-200 p-7 sm:p-9 shadow-card space-y-8">
          <div className="border-b border-slate-100 pb-4 space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#008580]">
              Simulasi Finansial
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Kalkulator Bagi Hasil Simpanan Berjangka
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Masukkan nominal penempatan dana dan pilih tenor untuk menghitung estimasi bagi hasil bulanan serta proyeksi saat jatuh tempo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Input Nominal & Pilihan Tenor */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <label htmlFor="deposito-nominal-input">
                    Nominal Penempatan (Min. Rp 1.000.000)
                  </label>
                  <span className="text-[#008580] font-extrabold text-sm tabular-nums">
                    {formatRupiah(validNominal)}
                  </span>
                </div>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-sm font-bold text-slate-400">
                    Rp
                  </span>
                  <input
                    id="deposito-nominal-input"
                    type="text"
                    inputMode="numeric"
                    value={
                      nominal ? new Intl.NumberFormat('id-ID').format(nominal) : ''
                    }
                    onChange={handleRawInputChange}
                    placeholder="10.000.000"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-300 font-extrabold text-lg text-slate-900 focus:border-[#00A39D] focus:ring-2 focus:ring-[#00A39D]/20 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-4 gap-2.5 pt-1">
                  {PRESET_NOMINALS.map((preset) => {
                    const isSelected = Number(nominal) === preset.value;
                    return (
                      <button
                        key={preset.value}
                        type="button"
                        onClick={() => setNominal(preset.value)}
                        className={`quiet-btn py-2.5 px-3 rounded-xl text-xs font-bold border transition-colors ${
                          isSelected
                            ? 'bg-[#004D4A] text-white border-[#004D4A]'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-[#00A39D]'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tenor Selection */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold text-slate-700">
                  Pilih Jangka Waktu (Tenor)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {depositoRates.map((rate) => {
                    const active = Number(selectedTenor) === Number(rate.tenor_months);
                    return (
                      <button
                        key={rate.tenor_months}
                        type="button"
                        onClick={() => setSelectedTenor(Number(rate.tenor_months))}
                        className={`quiet-btn p-4 rounded-xl border text-left transition-all ${
                          active
                            ? 'border-[#00A39D] bg-[#E6F6F5] ring-1 ring-[#00A39D]'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="text-sm font-extrabold text-slate-900">
                          {rate.tenor_months} Bulan
                        </div>
                        <div className="text-xs text-[#008580] font-bold mt-0.5">
                          Nisbah {rate.nisbah_anggota}%
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5 tabular-nums">
                          ~{formatPercent(rate.avg_monthly_rate)} / bln
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Hasil Perhitungan & Tombol Aksi */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-[#004D4A] text-white space-y-4 text-xs sm:text-sm shadow-md">
                <div className="flex items-center justify-between pb-3 border-b border-white/15">
                  <span className="text-white/80">Estimasi Bagi Hasil / Bulan:</span>
                  <span className="font-extrabold text-[#F59E0B] text-base sm:text-lg tabular-nums">
                    {formatRupiah(estimatedMonthlyProfit)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-white/90">
                  <span>Total Bagi Hasil ({activeRateConfig.tenor_months} Bulan):</span>
                  <span className="font-bold text-[#5EEAD4] tabular-nums">
                    + {formatRupiah(estimatedTotalProfit)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-white/80">
                  <span>Dana Pokok Simpanan:</span>
                  <span className="font-semibold text-white tabular-nums">
                    {formatRupiah(validNominal)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-white/70 text-xs">
                  <span>Biaya Meterai Pembukaan:</span>
                  <span>+ Rp 10.000</span>
                </div>

                <div className="pt-3 border-t border-white/15 flex items-baseline justify-between font-bold">
                  <span className="text-white">Proyeksi Saat Jatuh Tempo:</span>
                  <span className="text-lg sm:text-xl font-extrabold text-white tabular-nums">
                    {formatRupiah(estimatedTotalMaturity)}
                  </span>
                </div>
              </div>

              <a
                href={buildDepositoWaUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="quiet-btn w-full inline-flex items-center justify-center px-5 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-[#F59E0B] hover:bg-[#D97706] transition-colors shadow-sm"
              >
                <span>Ajukan Pembukaan Deposito</span>
              </a>

              <p className="text-[11px] text-slate-500 text-center leading-relaxed">
                *Simulasi dihitung berdasarkan rata-rata historis 2022. Realisasi bagi hasil bulanan disesuaikan dengan pendapatan riil usaha BMT MAS.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
