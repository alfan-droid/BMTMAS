import React, { useState, useRef } from 'react';
import { RefreshCw } from 'lucide-react';
import { useBmt } from '../../context/BmtContext';
import { useToast } from '../../context/ToastContext';
import { supabase } from '../../lib/supabaseClient';

const DEFAULT_HERO_IMAGE =
  'https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=1000&q=80';

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const MAX_IMAGE_DIMENSION = 1280;
const COMPRESSION_QUALITY = 0.8;

function compressImageFile(file) {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      let { width, height } = img;

      if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
        if (width >= height) {
          height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
          width = MAX_IMAGE_DIMENSION;
        } else {
          width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
          height = MAX_IMAGE_DIMENSION;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Gagal menginisialisasi kompresi gambar.'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      let dataUrl = canvas.toDataURL('image/webp', COMPRESSION_QUALITY);
      if (!dataUrl.startsWith('data:image/webp')) {
        dataUrl = canvas.toDataURL('image/jpeg', COMPRESSION_QUALITY);
      }

      canvas.toBlob(
        (blob) => resolve({ dataUrl, blob }),
        'image/webp',
        COMPRESSION_QUALITY
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Gagal memuat file gambar.'));
    };

    img.src = objectUrl;
  });
}

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

  // Handler Upload Foto (Batas 5 MB + Kompresi Otomatis WebP + Sinkronisasi Supabase Storage)
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Harap pilih file gambar (JPG, PNG, atau WEBP).', 'error', {
        title: 'Format File Tidak Didukung',
      });
      return;
    }

    // Batasan ukuran 5 MB sebelum dikompresi
    if (file.size > MAX_FILE_SIZE_BYTES) {
      showToast('Ukuran file foto maksimal 5 MB.', 'error', {
        title: 'Ukuran File Terlalu Besar',
      });
      return;
    }

    try {
      const { dataUrl, blob } = await compressImageFile(file);
      let finalImageUrl = dataUrl;

      // Jika Supabase terkoneksi, unggah hasil kompresi ke Supabase Storage
      if (supabase && blob) {
        const filePath = `hero/hero-${Date.now()}.webp`;
        const { error: uploadError } = await supabase.storage
          .from('public-assets')
          .upload(filePath, blob, { contentType: 'image/webp', upsert: true });

        if (!uploadError) {
          const { data: pubData } = supabase.storage
            .from('public-assets')
            .getPublicUrl(filePath);
          if (pubData?.publicUrl) {
            finalImageUrl = pubData.publicUrl;
          }
        }
      }

      const originalKb = Math.round(file.size / 1024);
      const compressedKb = blob
        ? Math.round(blob.size / 1024)
        : Math.round((dataUrl.length * 3) / 4 / 1024);

      updatePhotoField('heroImage', finalImageUrl);
      showToast(
        `Foto otomatis dikompresi (${originalKb} KB → ${compressedKb} KB). Klik "SIMPAN" untuk menerapkan.`,
        'info',
        { title: 'Foto Siap & Terkompresi' }
      );
    } catch (err) {
      showToast(err.message || 'Gagal memproses gambar.', 'error', {
        title: 'Gagal Memproses Foto',
      });
    } finally {
      e.target.value = '';
    }
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
            <div>
              <h3 className="text-base font-extrabold text-stone-900">
                Edit Foto Tampilan Bar Awal Beranda
              </h3>
              <p className="text-xs text-stone-500">
                Ubah gambar aktivitas pelayanan koperasi yang tampil di bingkai kanan bagian Beranda (Hero).
              </p>
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

          <div className="max-w-2xl space-y-5 text-xs">
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
                <div className="space-y-1 flex-1">
                  <span className="font-bold text-stone-900 block text-xs">
                    Unggah File Gambar dari Komputer / HP
                  </span>
                  <p className="text-[11px] text-stone-500 leading-normal">
                    Mendukung JPG, PNG, atau WEBP (Maks. 5 MB). Foto otomatis dikompresi ke WebP ringan agar tidak membebani website.
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
              <label className="font-bold text-stone-700 uppercase text-[11px] flex items-center justify-between">
                <span>Atau Masukkan URL Gambar Langsung</span>
                {photoForm.heroImage && (
                  <button
                    type="button"
                    onClick={() => updatePhotoField('heroImage', '')}
                    className="text-[11px] text-red-600 hover:underline normal-case font-semibold"
                  >
                    Kosongkan URL
                  </button>
                )}
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
          </div>
        </div>

        {/* 2. Legalitas & Identitas Lembaga */}
        <div className="rounded-3xl bg-white border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="pb-4 border-b border-stone-200">
            <h3 className="text-base font-extrabold text-stone-900">
              Identitas Resmi Lembaga Koperasi
            </h3>
            <p className="text-xs text-stone-500">
              Data yang tampil pada header pita resmi, footer, dan kartu profil.
            </p>
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
                  Nomor Izin &amp; Badan Hukum Resmi
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
          <div className="pb-4 border-b border-stone-200">
            <h3 className="text-base font-extrabold text-stone-900">
              Pengaturan Alamat &amp; Kontak Kantor Cabang
            </h3>
            <p className="text-xs text-stone-500">
              Kantor Pusat Semanu dan Kantor Cabang Pelayanan Paliyan.
            </p>
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
          className="quiet-btn inline-flex items-center justify-center px-8 py-3.5 rounded-2xl bg-emerald-950 hover:bg-emerald-900 text-white font-extrabold text-xs sm:text-sm shadow-2xl border-2 border-amber-400/80 transition-all tracking-wider"
        >
          <span>SIMPAN</span>
        </button>
      </div>
    </div>
  );
}
