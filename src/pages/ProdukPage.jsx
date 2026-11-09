import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBmt } from '../context/BmtContext';

const STEPS = [
  {
    step: '01',
    title: 'Pilih Produk Simpanan',
    desc: 'Tentukan jenis tabungan syariah sesuai rencana (harian fleksibel, pendidikan anak, hari raya Idul Fitri, atau tabungan qurban).',
  },
  {
    step: '02',
    title: 'Hubungi CS / Panggil Jemput Bola',
    desc: 'Kirim pesan via WhatsApp atau minta petugas ramah BMT MAS datang langsung ke rumah atau tempat usaha Anda.',
  },
  {
    step: '03',
    title: 'Siapkan Identitas Diri (KTP)',
    desc: 'Petugas akan membantu pengisian formulir akad syariah (Wadi’ah atau Mudharabah) secara transparan.',
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
    const message = `Assalamualaikum BMT MAS, saya ingin mendaftar / bertanya mengenai produk simpanan *${product.code} (${product.name})* dengan Akad ${product.akad}${
      product.nisbah ? ` dan Nisbah ${product.nisbah}` : ''
    }. Mohon informasi selengkapnya.`;
    return `https://wa.me/${institutionInfo.waHeadOffice}?text=${encodeURIComponent(
      message
    )}`;
  };

  return (
    <div className="pt-4 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-emerald-950 text-white py-12 sm:py-16 border-b border-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <nav aria-label="Breadcrumb" className="text-xs text-emerald-200/80">
            <Link to="/" className="hover:text-amber-300">
              Beranda
            </Link>
            <span className="mx-2">/</span>
            <span className="text-amber-300">Produk Simpanan</span>
          </nav>

          <div className="max-w-3xl space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Katalog Produk Tabungan Syariah BMT MAS
            </h1>
            <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed">
              Seluruh produk simpanan syariah KSPP Syariah BMT MAS dirancang tanpa biaya potongan administrasi bulanan (Rp 0,-), memberikan ketentraman batin, dan didukung kemudahan layanan jemput bola langsung ke lokasi Anda di Gunungkidul.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Catalog Grid & Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="text-xs font-semibold text-stone-700">
            Menampilkan <strong className="text-emerald-950">{filteredProducts.length}</strong> produk tabungan
          </div>

          <div className="flex items-center gap-1">
            {[
              { id: 'ALL', label: `Semua (${products.length})` },
              { id: 'Wadi', label: "Akad Wadi'ah" },
              { id: 'Mudharabah', label: 'Akad Mudharabah' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  selectedFilter === tab.id
                    ? 'bg-emerald-950 text-white'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {filteredProducts.map((product) => {
            const benefitsList = Array.isArray(product.benefits)
              ? product.benefits
              : [];

            return (
              <article
                key={product.id || product.code}
                className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between hover:border-stone-400 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-stone-500 pb-3 border-b border-stone-100">
                    <span className="font-bold text-stone-800">
                      Akad: {product.akad}
                    </span>
                    {product.nisbah && (
                      <span className="font-bold text-emerald-900">
                        Nisbah {product.nisbah}
                      </span>
                    )}
                  </div>

                  <div>
                    <h2 className="text-base font-extrabold text-stone-900 leading-snug">
                      {product.code} — {product.name}
                    </h2>
                    <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 space-y-1.5 text-xs text-stone-700">
                    {benefitsList.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-700 font-bold">•</span>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <a
                    href={buildProductWaUrl(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-950 hover:bg-emerald-900 transition-colors"
                  >
                    Daftar via WhatsApp
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* 3. Langkah-Langkah Pembukaan Simpanan */}
        <div className="mt-16 rounded-2xl bg-white border border-stone-200 p-6 sm:p-8 space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h3 className="text-lg font-bold text-stone-900">
              Alur Pembukaan Tabungan Syariah
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Dapat dilayani langsung di kantor maupun lewat layanan jemput bola di tempat Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((item) => (
              <div
                key={item.step}
                className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2"
              >
                <div className="text-xs font-bold text-amber-700">
                  Langkah {item.step}
                </div>
                <h4 className="text-sm font-bold text-stone-900">
                  {item.title}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Consultation Banner */}
        <div className="mt-8 rounded-2xl bg-stone-100 border border-stone-200 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-stone-900">
              Ingin Membuka Simpanan Berjangka (Deposito)?
            </h4>
            <p className="text-xs text-stone-600 mt-0.5">
              Cek informasi tabel rate dan kalkulator perhitungan bagi hasil simpanan berjangka.
            </p>
          </div>

          <Link
            to="/deposito"
            className="px-5 py-2.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-xs transition-colors shrink-0"
          >
            Buka Halaman Deposito Syariah
          </Link>
        </div>
      </section>
    </div>
  );
}
