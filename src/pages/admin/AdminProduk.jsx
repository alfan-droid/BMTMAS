import React, { useState } from 'react';
import {
  Wallet,
  Plus,
  Pencil,
  Trash2,
  ShieldCheck,
  BadgePercent,
  AlertTriangle,
} from 'lucide-react';
import { useBmt } from '../../context/BmtContext';
import { useToast } from '../../context/ToastContext';
import AdminModal from '../../components/admin/AdminModal';

export default function AdminProduk() {
  const { products, addProduct, updateProduct, deleteProduct } = useBmt();
  const { showToast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    akad: "Wadi'ah",
    nisbah: '',
    badge_text: '',
    description: '',
    benefitsText: '',
    icon_name: 'Wallet',
    is_active: true,
  });

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      code: '',
      name: '',
      akad: "Wadi'ah",
      nisbah: '',
      badge_text: '',
      description: '',
      benefitsText: '',
      icon_name: 'Wallet',
      is_active: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      code: product.code || '',
      name: product.name || '',
      akad: product.akad || "Wadi'ah",
      nisbah: product.nisbah || '',
      badge_text: product.badge_text || '',
      description: product.description || '',
      benefitsText: Array.isArray(product.benefits) ? product.benefits.join('\n') : '',
      icon_name: product.icon_name || 'Wallet',
      is_active: product.is_active !== undefined ? product.is_active : true,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const benefitsArray = formData.benefitsText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const productPayload = {
      code: formData.code.trim().toUpperCase(),
      name: formData.name.trim(),
      akad: formData.akad.trim(),
      nisbah: formData.nisbah.trim() || null,
      badge_text: formData.badge_text.trim(),
      description: formData.description.trim(),
      benefits: benefitsArray,
      icon_name: formData.icon_name,
      is_active: formData.is_active,
    };

    if (editingProduct) {
      await updateProduct(editingProduct.id, productPayload);
      showToast(`Produk ${productPayload.code} berhasil diperbarui!`, 'success');
    } else {
      await addProduct(productPayload);
      showToast(`Produk ${productPayload.code} berhasil ditambahkan!`, 'success');
    }

    setModalOpen(false);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setDeleteConfirmId(null);
    showToast('Produk berhasil dihapus!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
            Katalog Produk Simpanan Syariah
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Kelola rincian produk tabungan yang tampil pada halaman <code>/produk</code> dan widget beranda.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white text-xs font-bold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Tambah Produk Baru</span>
        </button>
      </div>

      {/* Table Card */}
      <div className="rounded-3xl bg-white border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-xs font-extrabold text-stone-600 uppercase tracking-wider">
                <th className="py-4 px-5">Kode &amp; Nama Produk</th>
                <th className="py-4 px-4">Akad Syariah</th>
                <th className="py-4 px-4">Nisbah</th>
                <th className="py-4 px-4">Keunggulan</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-xs">
              {products.map((item) => (
                <tr key={item.id || item.code} className="hover:bg-stone-50/60 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-900 text-amber-300 flex items-center justify-center font-extrabold text-xs shrink-0">
                        {item.code.slice(0, 2)}
                      </div>
                      <div>
                        <span className="font-extrabold text-stone-900 text-sm block">
                          {item.code}
                        </span>
                        <span className="text-stone-500 font-medium">
                          {item.name}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-900 font-bold border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-700" />
                      {item.akad}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    {item.nisbah ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-100 text-amber-950 font-extrabold border border-amber-300 tabular-nums">
                        <BadgePercent className="w-3 h-3 text-amber-700" />
                        {item.nisbah}
                      </span>
                    ) : (
                      <span className="text-stone-400 font-medium italic">
                        Tanpa Nisbah (Wadi&apos;ah)
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-4 text-stone-600 max-w-xs truncate">
                    {item.badge_text || '-'}
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                        item.is_active !== false
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-stone-100 text-stone-500'
                      }`}
                    >
                      {item.is_active !== false ? 'Aktif' : 'Non-Aktif'}
                    </span>
                  </td>

                  <td className="py-4 px-5 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(item)}
                      className="p-1.5 rounded-lg text-stone-600 hover:text-emerald-900 hover:bg-emerald-50 transition-colors"
                      title="Edit Produk"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(item.id)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Hapus Produk"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProduct ? 'Edit Produk Simpanan' : 'Tambah Produk Simpanan Baru'}
        maxWidthClass="max-w-xl"
        footer={
          <>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2.5 rounded-xl text-xs text-stone-600 font-bold hover:bg-stone-100"
            >
              Batal
            </button>
            <button
              type="submit"
              form="produk-form"
              className="px-5 py-2.5 rounded-xl text-xs bg-emerald-900 hover:bg-emerald-950 text-white font-extrabold shadow-sm"
            >
              Simpan Produk
            </button>
          </>
        }
      >
        <form id="produk-form" onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-stone-700 uppercase">
                Kode Produk (Singkatan)
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: TAMARA"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-bold focus:border-emerald-800 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-700 uppercase">
                Akad Syariah
              </label>
              <select
                value={formData.akad}
                onChange={(e) => setFormData({ ...formData, akad: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-bold focus:border-emerald-800 focus:outline-none bg-white"
              >
                <option value="Wadi'ah">Wadi&apos;ah (Titipan)</option>
                <option value="Mudharabah">Mudharabah (Bagi Hasil)</option>
                <option value="Mudharabah Muthlaqah">Mudharabah Muthlaqah</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-stone-700 uppercase">
              Nama Lengkap Produk
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Tabungan Mitra Amanah Sejahtera"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-semibold focus:border-emerald-800 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-stone-700 uppercase">
                Nisbah Bagi Hasil (Jika Ada)
              </label>
              <input
                type="text"
                placeholder="Contoh: 25 : 75 (atau kosongkan jika Wadi'ah)"
                value={formData.nisbah}
                onChange={(e) => setFormData({ ...formData, nisbah: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-800 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-700 uppercase">
                Badge Ringkas / Kategori
              </label>
              <input
                type="text"
                placeholder="Contoh: Bebas Potongan Admin"
                value={formData.badge_text}
                onChange={(e) => setFormData({ ...formData, badge_text: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-800 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-stone-700 uppercase">
              Deskripsi Produk
            </label>
            <textarea
              rows={2}
              required
              placeholder="Jelaskan tujuan dan keunggulan produk simpanan ini..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-800 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-stone-700 uppercase">
              Poin Manfaat / Keunggulan (1 Baris = 1 Poin)
            </label>
            <textarea
              rows={3}
              placeholder="Bebas biaya administrasi bulanan&#10;Dapat ditarik sewaktu-waktu&#10;Layanan jemput bola"
              value={formData.benefitsText}
              onChange={(e) => setFormData({ ...formData, benefitsText: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-800 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 items-center pt-1">
            <div className="space-y-1">
              <label className="font-bold text-stone-700 uppercase">
                Pilihan Ikon
              </label>
              <select
                value={formData.icon_name}
                onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-semibold focus:border-emerald-800 focus:outline-none bg-white"
              >
                <option value="Wallet">Wallet (Dompet)</option>
                <option value="GraduationCap">GraduationCap (Pendidikan)</option>
                <option value="Sparkles">Sparkles (Lebaran/Berkah)</option>
                <option value="HeartHandshake">HeartHandshake (Qurban/Kemitraan)</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-4">
              <input
                type="checkbox"
                id="is_active_input"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-4 h-4 rounded text-emerald-800 focus:ring-emerald-700 border-stone-300"
              />
              <label htmlFor="is_active_input" className="font-bold text-stone-800">
                Tampilkan Aktif di Web
              </label>
            </div>
          </div>
        </form>
      </AdminModal>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-stone-950/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-extrabold text-stone-900">
              Hapus Produk Ini?
            </h4>
            <p className="text-xs text-stone-600">
              Produk ini tidak akan lagi tampil di halaman katalog produk publik.
            </p>
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
