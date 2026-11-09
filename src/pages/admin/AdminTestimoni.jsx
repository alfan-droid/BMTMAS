import React, { useState } from 'react';
import {
  MessageSquareQuote,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  X,
  AlertTriangle,
  Star,
} from 'lucide-react';
import { useBmt } from '../../context/BmtContext';

export default function AdminTestimoni() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useBmt();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const [formData, setFormData] = useState({
    member_name: '',
    role_title: '',
    highlight_tag: '',
    quote: '',
  });

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      member_name: '',
      role_title: '',
      highlight_tag: '',
      quote: '',
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      member_name: item.member_name || '',
      role_title: item.role_title || '',
      highlight_tag: item.highlight_tag || '',
      quote: item.quote || '',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      member_name: formData.member_name.trim(),
      role_title: formData.role_title.trim(),
      highlight_tag: formData.highlight_tag.trim(),
      quote: formData.quote.trim(),
    };

    if (editingItem) {
      await updateTestimonial(editingItem.id, payload);
      setFeedbackMsg(`Testimoni dari ${payload.member_name} berhasil diperbarui!`);
    } else {
      await addTestimonial(payload);
      setFeedbackMsg(`Testimoni baru berhasil ditambahkan!`);
    }

    setModalOpen(false);
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const handleDelete = async (id) => {
    await deleteTestimonial(id);
    setDeleteConfirmId(null);
    setFeedbackMsg('Testimoni berhasil dihapus!');
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
            Kelola Testimoni Anggota
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Daftar ulasan autentik anggota yang tampil pada halaman <code>/deposito</code> dan halaman publik.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white text-xs font-bold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Tambah Testimoni Baru</span>
        </button>
      </div>

      {feedbackMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Testimonials Grid / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {testimonials.map((item) => (
          <div
            key={item.id || item.member_name}
            className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-900 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  {item.highlight_tag || 'Ulasan Anggota'}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => openEditModal(item)}
                    className="p-1.5 rounded-lg text-stone-500 hover:text-emerald-900 hover:bg-emerald-50 transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(item.id)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <blockquote className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-900 text-amber-300 font-extrabold text-xs flex items-center justify-center shrink-0">
                {item.member_name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-900">
                  {item.member_name}
                </h4>
                <p className="text-xs text-amber-800 font-medium">
                  {item.role_title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-stone-950/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 my-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="text-lg font-extrabold text-stone-900">
                {editingItem ? 'Edit Testimoni Anggota' : 'Tambah Testimoni Baru'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-stone-700 uppercase">
                  Nama Lengkap Anggota
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bpk. Kelik Yuniantoro, S.Sos, MM"
                  value={formData.member_name}
                  onChange={(e) => setFormData({ ...formData, member_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-bold focus:border-emerald-800 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700 uppercase">
                  Peran / Jabatan / Profesi
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Kepala Dinas Perdagangan Gunungkidul"
                  value={formData.role_title}
                  onChange={(e) => setFormData({ ...formData, role_title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-medium focus:border-emerald-800 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700 uppercase">
                  Tagline / Highlight Badge
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Aman, Berkah & Bebas Riba"
                  value={formData.highlight_tag}
                  onChange={(e) => setFormData({ ...formData, highlight_tag: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-800 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700 uppercase">
                  Ulasan / Testimoni
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tulis ulasan pengalaman menabung atau berdeposito di BMT MAS..."
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-800 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-stone-600 font-bold hover:bg-stone-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-extrabold shadow-sm"
                >
                  Simpan Testimoni
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-stone-950/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-extrabold text-stone-900">
              Hapus Testimoni Ini?
            </h4>
            <p className="text-xs text-stone-600">
              Ulasan anggota ini akan dihapus dari daftar testimoni publik.
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
