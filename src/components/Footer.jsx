import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, MapPin } from 'lucide-react';
import { useBmt } from '../context/BmtContext';

export default function Footer() {
  const { institutionInfo } = useBmt();

  return (
    <footer className="bg-[#003533] text-white/85 text-xs">
      {/* Top Signature BSI Gold/Teal Strip */}
      <div className="bg-[#004D4A] border-b border-white/10 py-6">
        <div className="wrap flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#F59E0B] text-slate-950 font-extrabold text-sm flex items-center justify-center shrink-0">
              CS
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-white">
                Butuh Bantuan atau Layanan Jemput Bola?
              </h3>
              <p className="text-xs text-white/80">
                Tim pelayanan BMT MAS siap membantu transaksi simpanan Anda di wilayah Gunungkidul.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${institutionInfo.callCenter.replace(/[^0-9]/g, '')}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors tabular-nums"
            >
              <Phone className="w-4 h-4 text-[#F59E0B]" />
              <span>Call Center: {institutionInfo.callCenter}</span>
            </a>

            <a
              href={`https://wa.me/${institutionInfo.waHeadOffice}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 font-bold transition-colors tabular-nums"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp CS Pusat</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="wrap py-12 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand & Legal */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-sm">
                <img
                  src="/images/logo-bmt-mas.png"
                  alt="Logo BMT MAS"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h4 className="text-base font-extrabold text-white leading-tight">
                  {institutionInfo.fullName}
                </h4>
                <p className="text-[11px] text-[#5EEAD4] font-semibold">
                  {institutionInfo.subName}
                </p>
              </div>
            </div>

            <p className="text-white/75 leading-relaxed max-w-sm">
              Lembaga keuangan mikro syariah di Gunungkidul yang mengelola tabungan dan simpanan berjangka secara amanah, bebas riba, serta tanpa potongan biaya administrasi bulanan.
            </p>

            <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-[#FEF3C7]">
              <span>Izin &amp; Badan Hukum Resmi: <strong className="text-white font-mono ml-1">{institutionInfo.legalNumber}</strong></span>
            </div>
          </div>

          {/* Col 2: Produk & Layanan */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-[#F59E0B] uppercase tracking-wider text-[11px]">
              Produk &amp; Layanan
            </h4>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link to="/produk" className="hover:text-[#F59E0B] transition-colors">
                  Tabungan TAMARA (Wadi&apos;ah)
                </Link>
              </li>
              <li>
                <Link to="/produk" className="hover:text-[#F59E0B] transition-colors">
                  Tabungan TADIKA (Pendidikan)
                </Link>
              </li>
              <li>
                <Link to="/produk" className="hover:text-[#F59E0B] transition-colors">
                  Tabungan TADURI (Idul Fitri)
                </Link>
              </li>
              <li>
                <Link to="/produk" className="hover:text-[#F59E0B] transition-colors">
                  Tabungan TAQURBA (Qurban)
                </Link>
              </li>
              <li>
                <Link to="/deposito" className="hover:text-[#F59E0B] transition-colors">
                  Simpanan Berjangka (Deposito)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Jaringan Kantor */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-[#F59E0B] uppercase tracking-wider text-[11px]">
              Jaringan Kantor
            </h4>
            <div className="space-y-3 text-white/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#00A39D] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Kantor Pusat Semanu</strong>
                  <span className="text-[11px] text-white/70">Jl. Raya Semanu - Candirejo, Semanu, Gunungkidul</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#00A39D] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Kantor Cabang Paliyan</strong>
                  <span className="text-[11px] text-white/70">Jl. Raya Paliyan Tahunan, Karangduwet, Paliyan</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Akses Cepat */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-[#F59E0B] uppercase tracking-wider text-[11px]">
              Tautan Cepat
            </h4>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link to="/" className="hover:text-[#F59E0B] transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/#tentang" className="hover:text-[#F59E0B] transition-colors">
                  Tentang BMT MAS
                </Link>
              </li>
              <li>
                <Link to="/#lokasi" className="hover:text-[#F59E0B] transition-colors">
                  Lokasi Kantor
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  to="/admin/login"
                  className="inline-block px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#FEF3C7] font-semibold transition-colors"
                >
                  Portal CMS Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-white/10 py-5 bg-[#002624]">
        <div className="wrap flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/60">
          <div>
            &copy; {new Date().getFullYear()} {institutionInfo.fullName} • Badan Hukum No. {institutionInfo.legalNumber} • Gunungkidul, D.I. Yogyakarta
          </div>
          <div className="italic text-[#F59E0B]/90 font-serif text-xs">
            &ldquo;{institutionInfo.tagline}&rdquo;
          </div>
        </div>
      </div>
    </footer>
  );
}
