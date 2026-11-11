import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useBmt } from '../context/BmtContext';

const STEPS = [
  {
    step: '01',
    title: 'Pilih Produk Tabungan',
    desc: 'Tentukan jenis tabungan syariah sesuai rencana (harian fleksibel, pendidikan anak, Idul Fitri, atau ibadah qurban).',
  },
  {
    step: '02',
    title: 'Hubungi CS / Jemput Bola',
    desc: 'Kirim pesan via WhatsApp atau jadwalkan petugas ramah BMT MAS datang langsung ke rumah atau tempat usaha Anda.',
  },
  {
    step: '03',
    title: 'Siapkan Identitas (KTP)',
    desc: 'Siapkan 1 lembar fotokopi KTP untuk pengisian formulir akad syariah (Wadi’ah atau Mudharabah) secara transparan.',
  },
  {
    step: '04',
    title: 'Setoran Awal & Buku Tabungan',
    desc: 'Terima buku tabungan resmi dan nikmati simpanan utuh 100% tanpa potongan administrasi bulanan.',
  },
];

export default function ProdukPage() {
  const { products, institutionInfo } = useBmt();
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  const filteredProducts = products.filter((p) => {
    if (selectedFilter === 'ALL') return true;
    return p.akad?.toLowerCase().includes(selectedFilter.toLowerCase());
  });

  const buildProductWaUrl = (product) => {
    const message = `Assalamualaikum BMT MAS, saya ingin membuka rekening tabungan *${product.code} (${product.name})* dengan Akad ${product.akad}${
      product.nisbah ? ` dan Nisbah ${product.nisbah}` : ''
    }. Mohon informasi selengkapnya.`;
    return `https://wa.me/${institutionInfo.waHeadOffice}?text=${encodeURIComponent(
      message
    )}`;
  };

  return (
    <div className="bg-white">
      {/* 1. BSI-Style Page Header */}
      <section className="bg-gradient-to-br from-[#004D4A] via-[#005F5B] to-[#003533] text-white py-14 sm:py-20">
        <div className="wrap space-y-4">
          <nav aria-label="Breadcrumb" className="text-xs text-white/75">
            <Link to="/" className="hover:text-[#F59E0B] transition-colors">
              Beranda
            </Link>
            <span className="mx-2 text-white/40">/</span>
            <span className="text-[#F59E0B] font-semibold">Tabungan Syariah</span>
          </nav>

          <div className="max-w-3xl space-y-3">
            <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-[#FEF3C7]">
              Simpanan Individu &amp; Keluarga
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Produk Tabungan Syariah BMT MAS
            </h1>
            <p className="text-white/85 text-sm sm:text-base leading-relaxed">
              Seluruh produk tabungan KSPP Syariah BMT MAS bebas biaya administrasi bulanan (Rp 0,-), dikelola sesuai prinsip syariah, serta didukung layanan transaksi jemput bola di Gunungkidul.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Catalog & Akad Filter */}
      <section className="py-14 lg:py-20 bg-slate-50 border-b border-slate-200">
        <div className="wrap space-y-10">
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="text-xs sm:text-sm font-semibold text-slate-600">
              Menampilkan <strong className="text-[#004D4A]">{filteredProducts.length}</strong> produk tabungan syariah
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'ALL', label: `Semua Produk (${products.length})` },
                { id: 'Wadi', label: "Akad Wadi'ah (Titipan)" },
                { id: 'Mudharabah', label: 'Akad Mudharabah (Bagi Hasil)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                    selectedFilter === tab.id
                      ? 'bg-[#004D4A] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4 Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {filteredProducts.map((product) => {
              const benefitsList = Array.isArray(product.benefits)
                ? product.benefits
                : [];

              return (
                <article
                  key={product.id || product.code}
                  className="quiet-card bg-white rounded-2xl border border-slate-200 hover:border-[#00A39D] p-6 flex flex-col justify-between space-y-6 shadow-card"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-[#E6F6F5] text-[#008580]">
                        Akad {product.akad}
                      </span>
                      {product.nisbah ? (
                        <span className="text-[11px] font-bold text-[#004D4A]">
                          Nisbah {product.nisbah}
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-slate-500">
                          Titipan Murni
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="text-xs font-bold text-[#008580] uppercase tracking-wider">
                        {product.code}
                      </span>
                      <h2 className="text-lg font-extrabold text-slate-900 mt-0.5 leading-snug">
                        {product.name}
                      </h2>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                      {benefitsList.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00A39D] shrink-0 mt-0.5" />
                          <span className="text-[11px] leading-relaxed">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <a
                      href={buildProductWaUrl(product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="quiet-btn w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#004D4A] hover:bg-[#008580] transition-colors"
                    >
                      <span>Buka Tabungan</span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          {/* 3. Langkah-Langkah Pembukaan Tabungan */}
          <div className="rounded-2xl bg-white border border-slate-200 p-7 sm:p-9 space-y-8 shadow-card">
            <div className="border-b border-slate-100 pb-4 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#008580]">
                Panduan Pendaftaran
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">
                4 Langkah Mudah Membuka Tabungan Syariah
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Dapat dilayani langsung di Kantor Semanu &amp; Paliyan maupun lewat petugas jemput bola ke lokasi Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {STEPS.map((item) => (
                <div
                  key={item.step}
                  className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2"
                >
                  <h4 className="text-sm font-bold text-slate-900">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. CTA Banner to Deposito */}
          <div className="rounded-2xl bg-gradient-to-r from-[#004D4A] to-[#003533] text-white p-7 sm:p-9 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-xl">
              <h4 className="text-lg sm:text-xl font-extrabold text-white">
                Ingin Penempatan Dana dengan Bagi Hasil Lebih Optimal?
              </h4>
              <p className="text-xs sm:text-sm text-white/80">
                Pelajari Simpanan Berjangka (Deposito Syariah) BMT MAS dengan nisbah bagi hasil hingga 50 : 50.
              </p>
            </div>

            <Link
              to="/deposito"
              className="quiet-btn inline-flex items-center px-6 py-3 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 font-bold text-xs sm:text-sm transition-colors shrink-0 shadow-sm"
            >
              <span>Simulasi Deposito Syariah</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
