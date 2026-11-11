import React, { useState } from 'react';
import {
  TrendingUp,
  Pencil,
} from 'lucide-react';
import { useBmt } from '../../context/BmtContext';
import { useToast } from '../../context/ToastContext';
import AdminModal from '../../components/admin/AdminModal';

const MONTH_KEYS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

export default function AdminDeposito() {
  const { depositoRates, updateDepositoRate } = useBmt();
  const { showToast } = useToast();
  const [editingRate, setEditingRate] = useState(null);
  const [formData, setFormData] = useState({
    avg_monthly_rate: 0,
    nisbah_anggota: 0,
    nisbah_bmt: 0,
    monthly_rates: {},
  });

  const openEditModal = (item) => {
    setEditingRate(item);
    setFormData({
      avg_monthly_rate: item.avg_monthly_rate || 0,
      nisbah_anggota: item.nisbah_anggota || 0,
      nisbah_bmt: item.nisbah_bmt || 0,
      monthly_rates: item.monthly_rates ? { ...item.monthly_rates } : {},
    });
  };

  const handleMonthRateChange = (m, val) => {
    setFormData((prev) => ({
      ...prev,
      monthly_rates: {
        ...prev.monthly_rates,
        [m]: parseFloat(val) || 0,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingRate) return;

    await updateDepositoRate(editingRate.tenor_months, {
      avg_monthly_rate: parseFloat(formData.avg_monthly_rate) || 0,
      nisbah_anggota: parseInt(formData.nisbah_anggota, 10) || 0,
      nisbah_bmt: parseInt(formData.nisbah_bmt, 10) || 0,
      monthly_rates: formData.monthly_rates,
    });

    showToast(
      `Data simpanan berjangka ${editingRate.tenor_months} bulan berhasil disimpan!`,
      'success'
    );
    setEditingRate(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
          Kelola Equivalent Rate &amp; Simpanan Berjangka
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
          Atur data historis rate bagi hasil per bulan dan nisbah bagi hasil yang tampil pada tabel serta kalkulator deposito.
        </p>
      </div>

      {/* Tenor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {depositoRates.map((item) => (
          <div
            key={item.tenor_months}
            className="rounded-3xl bg-white border border-stone-200 p-6 shadow-sm space-y-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-800 flex items-center justify-center font-extrabold text-sm">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-stone-900">
                      Tenor {item.tenor_months} Bulan
                    </h3>
                    <span className="text-[11px] text-stone-500 font-medium">
                      Simpanan Berjangka
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openEditModal(item)}
                  className="p-2 rounded-xl text-stone-600 hover:text-emerald-900 hover:bg-emerald-50 transition-colors"
                  title="Edit Rate & Nisbah"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                  <span className="text-stone-500 font-bold block">Nisbah Anggota</span>
                  <span className="text-lg font-extrabold text-emerald-900 tabular-nums">
                    {item.nisbah_anggota}%
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                  <span className="text-stone-500 font-bold block">Rata-rata Rate</span>
                  <span className="text-lg font-extrabold text-amber-600 tabular-nums">
                    ~{Number(item.avg_monthly_rate).toFixed(2)}%/bln
                  </span>
                </div>
              </div>

              {/* Monthly Rate Preview Snippet */}
              <div className="mt-4 pt-4 border-t border-stone-100 space-y-1.5 text-xs">
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                  Contoh Rate 2022:
                </span>
                <div className="grid grid-cols-4 gap-1.5 text-center text-[11px]">
                  {['Jan', 'Apr', 'Agu', 'Des'].map((m) => (
                    <div key={m} className="p-1.5 rounded-lg bg-stone-100/70">
                      <span className="text-stone-500 font-medium block">{m}</span>
                      <span className="font-bold text-stone-900">
                        {item.monthly_rates?.[m] !== undefined
                          ? `${Number(item.monthly_rates[m]).toFixed(2)}%`
                          : '-'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openEditModal(item)}
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-emerald-50 text-stone-800 hover:text-emerald-900 font-bold text-xs transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>Edit Rincian Rate 12 Bulan</span>
            </button>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <AdminModal
        isOpen={Boolean(editingRate)}
        onClose={() => setEditingRate(null)}
        title={editingRate ? `Edit Equivalent Rate: Tenor ${editingRate.tenor_months} Bulan` : ''}
        subtitle="Perbarui rata-rata bagi hasil bulanan dan rincian data per bulan Jan–Des."
        maxWidthClass="max-w-2xl"
        footer={
          <>
            <button
              type="button"
              onClick={() => setEditingRate(null)}
              className="px-4 py-2.5 rounded-xl text-xs text-stone-600 font-bold hover:bg-stone-100"
            >
              Batal
            </button>
            <button
              type="submit"
              form="deposito-edit-form"
              className="px-5 py-2.5 rounded-xl text-xs bg-emerald-900 hover:bg-emerald-950 text-white font-extrabold shadow-sm"
            >
              Simpan Perubahan
            </button>
          </>
        }
      >
        <form id="deposito-edit-form" onSubmit={handleSubmit} className="space-y-5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-stone-700 uppercase">
                Rata-rata Rate (% / Bulan)
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.avg_monthly_rate}
                onChange={(e) =>
                  setFormData({ ...formData, avg_monthly_rate: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-bold focus:border-emerald-800 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-700 uppercase">
                Nisbah Anggota (%)
              </label>
              <input
                type="number"
                required
                value={formData.nisbah_anggota}
                onChange={(e) =>
                  setFormData({ ...formData, nisbah_anggota: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-bold focus:border-emerald-800 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-700 uppercase">
                Nisbah BMT (%)
              </label>
              <input
                type="number"
                required
                value={formData.nisbah_bmt}
                onChange={(e) =>
                  setFormData({ ...formData, nisbah_bmt: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-bold focus:border-emerald-800 focus:outline-none"
              />
            </div>
          </div>

          {/* 12 Months Input Grid */}
          <div className="space-y-2 pt-2">
            <label className="font-bold text-stone-700 uppercase block">
              Rincian Rate Bulanan (Januari – Desember):
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
              {MONTH_KEYS.map((m) => (
                <div key={m} className="space-y-1">
                  <span className="font-bold text-stone-500 text-[11px] block">{m}</span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.monthly_rates?.[m] ?? ''}
                    onChange={(e) => handleMonthRateChange(m, e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 font-semibold text-center text-xs focus:border-emerald-800 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
