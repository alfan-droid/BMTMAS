import React, { useState, useRef } from 'react';
import {
  Building2,
  ShieldCheck,
  Image as ImageIcon,
  Upload,
  RefreshCw,
  Sparkles,
  MapPin,
  Tag,
  Save,
} from 'lucide-react';
import { useBmt } from '../../context/BmtContext';
import { useToast } from '../../context/ToastContext';

const DEFAULT_HERO_IMAGE =
  'https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=1000&q=80';

const PRESET_IMAGES = [
  {
    id: 'p1',
    label: 'Kantor Pelayanan Resmi (Default Brosur)',
    url: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'p2',
    label: 'Konsultasi Simpanan Syariah',
    url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'p3',
    label: 'Kemitraan Usaha Anggota',
    url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'p4',
    label: 'Gedung Koperasi Modern',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=300&q=80',
  },
];

export default function AdminProfil() {
  const { institutionInfo, branches, updateInstitutionInfo, updateBranch } = useBmt();
  const { showToast } = useToast();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const fileInputRef = useRef(null);

  // 1. Form State untuk Foto Tampilan Beranda
  const [photoForm, setPhotoForm] = useState({
    heroImage: institutionInfo.heroImage || DEFAULT_HERO_IMAGE,
    heroBadge: institutionInfo.heroBadge || 'Kantor Pelayanan',
    region: institutionInfo.region || 'Gunungkidul, D.I. Yogyakarta',
  });

  // 2. Form State untuk Identitas Lembaga
  const [infoForm, setInfoForm] = useState({
    fullName: institutionInfo.fullName || '',
    subName: institutionInfo.subName || '',
    legalNumber: institutionInfo.legalNumber || '',
    tagline: institutionInfo.tagline || '',
    callCenter: institutionInfo.callCenter || '',
    waHeadOffice: institutionInfo.waHeadOffice || '',
  });

  // 3. Form State untuk Cabang
  const [branchesForm, setBranchesForm] = useState([...branches]);

  const updatePhotoField = (field, value) => {
    setPhotoForm((prev) => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const updateInfoField = (field, value) => {
    setInfoForm((prev) => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  // Handler Upload Foto Lokal (FileReader -> Data URL)
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Harap pilih file gambar (JPG, PNG, atau WEBP).', 'error', {
        title: 'Format File Tidak Didukung',
      });
      return;
    }

    // Batasan ukuran 4 MB agar performa tetap prima
    if (file.size > 4 * 1024 * 1024) {
      showToast('Ukuran file foto maksimal 4 MB.', 'error', {
        title: 'Ukuran File Terlalu Besar',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (typeof dataUrl === 'string') {
        updatePhotoField('heroImage', dataUrl);
        showToast(
          'Foto berhasil dipilih. Klik "Simpan Perubahan" untuk menerapkan ke website.',
          'info',
          { title: 'Pratinjau Diperbarui' }
        );
      }
    };
    reader.readAsDataURL(file);
  };

  // Reset Foto ke Default
  const handleResetPhoto = () => {
    setPhotoForm({
      heroImage: DEFAULT_HERO_IMAGE,
      heroBadge: 'Kantor Pelayanan',
      region: 'Gunungkidul, D.I. Yogyakarta',
    });
    updateInstitutionInfo({
      heroImage: DEFAULT_HERO_IMAGE,
      heroBadge: 'Kantor Pelayanan',
      region: 'Gunungkidul, D.I. Yogyakarta',
    });
    showToast('Foto beranda berhasil dikembalikan ke foto bawaan resmi!', 'success');
  };

  // Update Kantor Cabang
  const handleBranchChange = (index, field, value) => {
    setBranchesForm((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
    setHasUnsavedChanges(true);
  };

  // Simpan Seluruh Perubahan (Foto Beranda, Identitas Lembaga, & Kantor Cabang)
  const handleSaveAll = (e) => {
    e.preventDefault();
    updateInstitutionInfo({
      heroImage: photoForm.heroImage,
      heroBadge: photoForm.heroBadge,
      region: photoForm.region,
      ...infoForm,
    });
    branchesForm.forEach((b) => updateBranch(b.id, b));
    setHasUnsavedChanges(false);
    showToast(
      'Seluruh perubahan foto beranda, identitas lembaga, dan kantor cabang berhasil disimpan!',
      'success',
      { title: 'Perubahan Tersimpan' }
    );
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Header Halaman */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
          Profil Lembaga &amp; Foto Beranda
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
          Kelola foto bingkai di awal beranda, identitas legalitas, kontak call center, nomor WhatsApp, dan kantor cabang.
        </p>
      </div>

      <form id="admin-profil-form" onSubmit={handleSaveAll} className="space-y-8">
        {/* 1. BAGIAN KHUSUS: EDIT FOTO TAMPILAN PADA BAR AWAL BERANDA */}
        <div className="rounded-3xl bg-white border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-stone-900">
                  Edit Foto Tampilan Bar Awal Beranda
                </h3>
                <p className="text-xs text-stone-500">
                  Ubah gambar aktivitas pelayanan koperasi yang tampil di bingkai kanan bagian Beranda (Hero).
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetPhoto}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-stone-600 hover:text-amber-700 hover:bg-stone-100 border border-stone-300 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Foto Default</span>
            </button>
          </div>

          <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sisi Kiri: Kontrol Input & Upload Foto */}
            <div className="lg:col-span-7 space-y-5 text-xs">
              {/* Opsi Upload File Gambar */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-dashed border-stone-300 hover:border-emerald-700 transition-colors">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  className="hidden"
                />
                <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                  <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-emerald-900 shrink-0 shadow-xs">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <span className="font-bold text-stone-900 block text-xs">
                      Unggah File Gambar dari Komputer / HP
                    </span>
                    <p className="text-[11px] text-stone-500 leading-normal">
                      Mendukung format JPG, PNG, atau WEBP. Foto otomatis dikonversi dan disimpan.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-xs transition-colors shrink-0 shadow-xs"
                  >
                    Pilih File Foto
                  </button>
                </div>
              </div>

              {/* Opsi Input Link URL Gambar Langsung */}
              <div className="space-y-1.5">
                <label className="font-bold text-stone-700 uppercase text-[11px]">
                  Atau Masukkan URL Gambar Langsung
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={photoForm.heroImage}
                  onChange={(e) => updatePhotoField('heroImage', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-medium text-xs focus:border-emerald-800 focus:outline-none bg-white"
                />
                <span className="text-[10px] text-stone-500 block">
                  Contoh: URL gambar dari Unsplash, hosting foto internal, atau cloud storage.
                </span>
              </div>

              {/* Pilihan Template Foto Cepat (Presets) */}
              <div className="space-y-2 pt-1">
                <label className="font-bold text-stone-700 uppercase text-[11px] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Pilihan Foto Cepat (Rekomendasi BMT MAS)</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {PRESET_IMAGES.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => updatePhotoField('heroImage', preset.url)}
                      className={`group p-1.5 rounded-xl border text-left transition-all overflow-hidden ${
                        photoForm.heroImage === preset.url
                          ? 'border-emerald-800 ring-2 ring-emerald-800/20 bg-emerald-50/50'
                          : 'border-stone-200 bg-white hover:border-stone-400'
                      }`}
                    >
                      <div className="aspect-[4/3] rounded-lg overflow-hidden bg-stone-100">
                        <img
                          src={preset.thumb}
                          alt={preset.label}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      <span className="text-[10px] font-bold text-stone-800 line-clamp-1 mt-1 block">
                        {preset.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Keterangan Teks Label & Lokasi pada Bingkai Foto */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <label className="font-bold text-stone-700 uppercase text-[11px] flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-stone-500" />
                    <span>Label Badge Kartu Foto</span>
                  </label>
                  <input
                    type="text"
                    value={photoForm.heroBadge}
                    onChange={(e) => updatePhotoField('heroBadge', e.target.value)}
                    placeholder="Kantor Pelayanan"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-bold text-xs focus:border-emerald-800 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700 uppercase text-[11px] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-500" />
                    <span>Wilayah / Keterangan Lokasi</span>
                  </label>
                  <input
                    type="text"
                    value={photoForm.region}
                    onChange={(e) => updatePhotoField('region', e.target.value)}
                    placeholder="Gunungkidul, D.I. Yogyakarta"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-medium text-xs focus:border-emerald-800 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Sisi Kanan: Pratinjau Langsung (Live Preview) Sesuai Desain Hero */}
            <div className="lg:col-span-5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-stone-800 uppercase tracking-wider text-[11px]">
                  Pratinjau Tampilan Beranda (Live)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-bold">
                  Sesuai Halaman Publik
                </span>
              </div>

              {/* Bingkai Foto Mengikuti Struktur Hero.jsx */}
              <div className="bg-stone-50 p-3 rounded-2xl border border-stone-300 shadow-sm">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-200">
                  <img
                    src={photoForm.heroImage || DEFAULT_HERO_IMAGE}
                    alt="Aktivitas Pelayanan BMT MAS"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = DEFAULT_HERO_IMAGE;
                    }}
                  />
                </div>

                <div className="p-3 text-center border-t border-stone-200 mt-2 flex items-center justify-between bg-white rounded-xl">
                  <div className="flex items-center gap-2.5 text-left">
                    <div className="w-8 h-8 rounded-lg bg-emerald-950 text-amber-400 font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs">
                      MAS
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 leading-tight">
                        {infoForm.fullName || institutionInfo.fullName || 'KSPP SYARIAH BMT MAS'}
                      </h4>
                      <p className="text-[10px] text-stone-500">
                        {photoForm.region || 'Gunungkidul, D.I. Yogyakarta'}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">
                    {photoForm.heroBadge || 'Kantor Pelayanan'}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-stone-500 leading-relaxed text-center sm:text-left pt-1">
                Foto di atas akan langsung tampil pada bar kanan di awal halaman Beranda bagi pengunjung.
              </p>
            </div>
          </div>
          </div>
        </div>

        {/* 2. Legalitas & Identitas Lembaga */}
        <div className="rounded-3xl bg-white border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-stone-200">
            <div className="w-10 h-10 rounded-xl bg-emerald-900 text-amber-300 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-stone-900">
                Identitas Resmi Lembaga Koperasi
              </h3>
              <p className="text-xs text-stone-500">
                Data yang tampil pada header pita resmi, footer, dan kartu profil.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-stone-700 uppercase">
                  Nama Resmi Lembaga
                </label>
                <input
                  type="text"
                  required
                  value={infoForm.fullName}
                  onChange={(e) => updateInfoField('fullName', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-bold focus:border-emerald-800 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700 uppercase">
                  Nomor Badan Hukum Koperasi
                </label>
                <input
                  type="text"
                  required
                  value={infoForm.legalNumber}
                  onChange={(e) => updateInfoField('legalNumber', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-bold focus:border-emerald-800 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-stone-700 uppercase">
                  Sub Nama / Brand
                </label>
                <input
                  type="text"
                  required
                  value={infoForm.subName}
                  onChange={(e) => updateInfoField('subName', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-medium focus:border-emerald-800 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700 uppercase">
                  Tagline Utama
                </label>
                <input
                  type="text"
                  required
                  value={infoForm.tagline}
                  onChange={(e) => updateInfoField('tagline', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-medium focus:border-emerald-800 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-stone-700 uppercase">
                  Call Center Pelayanan
                </label>
                <input
                  type="text"
                  required
                  placeholder="(0274) 2903137"
                  value={infoForm.callCenter}
                  onChange={(e) => updateInfoField('callCenter', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-bold focus:border-emerald-800 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700 uppercase">
                  Nomor WhatsApp Kantor Pusat (Format: 628...)
                </label>
                <input
                  type="text"
                  required
                  placeholder="62859121635023"
                  value={infoForm.waHeadOffice}
                  onChange={(e) => updateInfoField('waHeadOffice', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-bold focus:border-emerald-800 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Informasi Kantor Cabang Semanu & Paliyan */}
        <div className="rounded-3xl bg-white border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-stone-200">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-stone-900">
                Pengaturan Alamat &amp; Kontak Kantor Cabang
              </h3>
              <p className="text-xs text-stone-500">
                Kantor Pusat Semanu dan Kantor Cabang Pelayanan Paliyan.
              </p>
            </div>
          </div>

          <div className="space-y-6 text-xs">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {branchesForm.map((b, idx) => (
                <div
                  key={b.id}
                  className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-stone-900">
                      {b.name}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                      {b.code}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-stone-600 uppercase text-[10px]">
                      Alamat Lengkap
                    </label>
                    <textarea
                      rows={2}
                      value={b.address}
                      onChange={(e) => handleBranchChange(idx, 'address', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 font-medium focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-stone-600 uppercase text-[10px]">
                        No. WhatsApp (Format Link)
                      </label>
                      <input
                        type="text"
                        value={b.whatsappNumber}
                        onChange={(e) => handleBranchChange(idx, 'whatsappNumber', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 font-medium focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-stone-600 uppercase text-[10px]">
                        Tampilan Teks No. WA
                      </label>
                      <input
                        type="text"
                        value={b.whatsappDisplay}
                        onChange={(e) => handleBranchChange(idx, 'whatsappDisplay', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 font-medium focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-stone-600 uppercase text-[10px]">
                      Jam Operasional
                    </label>
                    <input
                      type="text"
                      value={b.hours}
                      onChange={(e) => handleBranchChange(idx, 'hours', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 font-medium focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>

      {/* Satu Tombol Simpan Melayang di Layer Paling Atas */}
      <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-8 z-[80] flex flex-col items-end gap-2">
        {hasUnsavedChanges && (
          <span className="px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-[11px] font-bold shadow-md">
            Ada perubahan belum disimpan
          </span>
        )}
        <button
          type="submit"
          form="admin-profil-form"
          className="quiet-btn inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-950 hover:bg-emerald-900 text-white font-extrabold text-xs sm:text-sm shadow-2xl border-2 border-amber-400/80 transition-all"
        >
          <Save className="w-4 h-4 text-amber-300" />
          <span>Simpan Perubahan</span>
        </button>
      </div>
    </div>
  );
}
