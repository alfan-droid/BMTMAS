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
• Nominal Deposito: *${formatRupiah(validNominal)}* (+ Rp 10.000 biaya meterai)
• Tenor Pilihan: *${activeRateConfig.tenor_months} Bulan* (Nisbah Anggota ${activeRateConfig.nisbah_anggota}%)
• Estimasi Bagi Hasil / Bulan (~${formatPercent(monthlyRatePercent)}): *${formatRupiah(estimatedMonthlyProfit)}*
• Total Estimasi Bagi Hasil (${activeRateConfig.tenor_months} Bulan): *${formatRupiah(estimatedTotalProfit)}*
• Total Akumulasi Jatuh Tempo: *${formatRupiah(estimatedTotalMaturity)}*

Mohon informasi prosedur pembukaannya. Terima kasih.`;

    return `https://wa.me/${institutionInfo.waHeadOffice}?text=${encodeURIComponent(
      text
    )}`;
  };

  return (
    <section className="py-12 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Section */}
        <div className="space-y-1 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Tabel Equivalent Rate &amp; Simulasi Deposito
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Kinerja historis bagi hasil Simpanan Berjangka BMT MAS periode Januari–Desember 2022 beserta simulasi perhitungannya.
          </p>
        </div>

        {/* 1. BAGIAN ATAS: Tabel Equivalent Rate Simpanan Berjangka (Full Width) */}
        <div className="rounded-3xl bg-white border border-stone-200 overflow-hidden shadow-sm space-y-0">
          <div className="p-6 bg-emerald-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-900">
            <div>
              <h3 className="text-lg font-bold text-white">
                Tabel Informasi Equivalent Rate Simpanan Berjangka
              </h3>
              <p className="text-xs text-emerald-200/90 mt-0.5">
                Data Historis Bagi Hasil Bulanan (Tahun 2022) — Klik salah satu baris untuk menerapkan ke kalkulator simulasi di bawah
              </p>
            </div>

            {/* Filter Tab Semester */}
            <div className="flex items-center gap-1 border border-emerald-800 rounded-xl p-1 bg-emerald-900/70 self-start sm:self-center">
              {[
                { id: 'ALL', label: '12 Bulan Penuh' },
                { id: 'S1', label: 'Semester I (Jan–Jun)' },
                { id: 'S2', label: 'Semester II (Jul–Des)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSemesterTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    semesterTab === tab.id
                      ? 'bg-amber-500 text-stone-950 shadow-xs'
                      : 'text-emerald-100 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px] text-xs">
              <thead>
                <tr className="border-b-2 border-stone-200 text-stone-700 bg-stone-50">
                  <th className="py-3.5 px-4 font-bold text-stone-900">
                    Jangka Waktu &amp; Nisbah
                  </th>
                  {displayedMonths.map((m) => (
                    <th key={m} className="py-3.5 px-2.5 text-center font-bold text-stone-800">
                      {m}
                    </th>
                  ))}
                  <th className="py-3.5 px-4 text-center font-extrabold text-emerald-950 bg-stone-100/80">
                    Rata-rata / Bulan
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 tabular-nums">
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
                          ? 'bg-amber-50/80 font-semibold'
                          : 'hover:bg-stone-50'
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="font-extrabold text-stone-900 text-sm">
                          {row.tenor_months} Bulan
                        </div>
                        <div className="text-[11px] text-emerald-900 font-bold mt-0.5">
                          Nisbah Anggota {row.nisbah_anggota}% : BMT {row.nisbah_bmt}%
                        </div>
                      </td>

                      {displayedMonths.map((m) => (
                        <td key={m} className="py-4 px-2.5 text-center font-medium text-stone-700">
                          {formatPercent(ratesObj[m])}
                        </td>
                      ))}

                      <td className="py-4 px-4 text-center font-bold text-emerald-950 bg-stone-50/50">
                        ~{formatPercent(row.avg_monthly_rate)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. BAGIAN BAWAH: Kalkulator Simulasi Deposito (Stacked di Bawah Tabel) */}
        <div className="rounded-3xl bg-white border border-stone-200 p-6 sm:p-9 shadow-sm space-y-8">
          <div className="border-b border-stone-100 pb-4">
            <h3 className="text-xl font-extrabold text-stone-900">
              Kalkulator Simulasi Bagi Hasil Deposito
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Masukkan nominal yang ingin Anda tempatkan dan tentukan jangka waktu untuk melihat estimasi bagi hasil bulanan dan saat jatuh tempo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Nominal & Pilihan Tenor */}
            <div className="lg:col-span-7 space-y-6">
              {/* Input Nominal & Presets */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-stone-700">
                  <label htmlFor="deposito-nominal-input">
                    Nominal Penempatan Simpanan Berjangka (Min. Rp 1.000.000)
                  </label>
                  <span className="text-emerald-950 font-extrabold text-sm tabular-nums">
                    {formatRupiah(validNominal)}
                  </span>
                </div>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-sm font-bold text-stone-500">
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
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border border-stone-300 font-extrabold text-lg focus:border-emerald-900 focus:outline-none"
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
                        className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-colors ${
                          isSelected
                            ? 'bg-emerald-950 text-white border-emerald-950'
                            : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
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
                <label className="block text-xs font-bold text-stone-700">
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
                        className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                          active
                            ? 'border-emerald-950 bg-stone-100 font-bold shadow-xs'
                            : 'border-stone-200 bg-white hover:bg-stone-50'
                        }`}
                      >
                        <div className="text-sm font-extrabold text-stone-900">
                          {rate.tenor_months} Bulan
                        </div>
                        <div className="text-xs text-emerald-900 font-bold mt-0.5">
                          Nisbah {rate.nisbah_anggota}%
                        </div>
                        <div className="text-[11px] text-stone-500 mt-0.5">
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
              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-3.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between text-stone-700 pb-2 border-b border-stone-200">
                  <span>Estimasi Bagi Hasil / Bulan:</span>
                  <span className="font-extrabold text-emerald-950 text-base tabular-nums">
                    {formatRupiah(estimatedMonthlyProfit)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-stone-700">
                  <span>Total Bagi Hasil ({activeRateConfig.tenor_months} Bulan):</span>
                  <span className="font-bold text-emerald-900 tabular-nums">
                    + {formatRupiah(estimatedTotalProfit)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-stone-600">
                  <span>Dana Pokok Simpanan:</span>
                  <span className="font-semibold text-stone-900 tabular-nums">
                    {formatRupiah(validNominal)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-stone-500 text-xs">
                  <span>Biaya Meterai Pembukaan:</span>
                  <span>+ Rp 10.000</span>
                </div>

                <div className="pt-3 border-t-2 border-stone-200 flex items-baseline justify-between text-stone-900 font-bold">
                  <span>Total Saat Jatuh Tempo:</span>
                  <span className="text-lg font-extrabold text-emerald-950 tabular-nums">
                    {formatRupiah(estimatedTotalMaturity)}
                  </span>
                </div>
              </div>

              <a
                href={buildDepositoWaUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center px-5 py-3.5 rounded-xl text-sm font-bold text-white bg-emerald-950 hover:bg-emerald-900 transition-colors shadow-sm"
              >
                Ajukan Deposito via WhatsApp
              </a>

              <p className="text-[11px] text-stone-500 text-center">
                *Simulasi di atas menggunakan rata-rata historis bagi hasil 2022. Realisasi bagi hasil sesuai kinerja riil bulanan BMT MAS.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
