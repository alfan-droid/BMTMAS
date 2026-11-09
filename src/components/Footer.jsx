import React from 'react';
import { Link } from 'react-router-dom';
import { useBmt } from '../context/BmtContext';

export default function Footer() {
  const { institutionInfo } = useBmt();

  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-8 border-b border-emerald-900/80">
          {/* Col 1 */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-base font-bold text-white">
              {institutionInfo.fullName}
            </h3>
            <p className="text-xs text-amber-300 font-semibold">
              {institutionInfo.subName}
            </p>
            <p className="text-xs text-emerald-200/80 leading-relaxed max-w-sm">
              Koperasi Simpan Pinjam dan Pembiayaan Syariah di Gunungkidul yang mengelola dana tabungan serta simpanan berjangka secara amanah dan bebas biaya administrasi bulanan.
            </p>
            <p className="text-xs text-emerald-300 font-medium">
              Badan Hukum: {institutionInfo.legalNumber}
            </p>
          </div>

          {/* Col 2 */}
          <div className="lg:col-span-3 space-y-2 text-xs">
            <h4 className="font-bold text-amber-400 uppercase tracking-wider">
              Navigasi
            </h4>
            <ul className="space-y-1.5 text-emerald-100/80">
              <li>
                <Link to="/" className="hover:text-amber-300">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/#tentang" className="hover:text-amber-300">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/#lokasi" className="hover:text-amber-300">
                  Lokasi Kantor
                </Link>
              </li>
              <li>
                <Link to="/produk" className="hover:text-amber-300">
                  Produk Simpanan
                </Link>
              </li>
              <li>
                <Link to="/deposito" className="hover:text-amber-300">
                  Simpanan Berjangka
                </Link>
              </li>
              <li className="pt-2">
                <Link to="/admin/login" className="text-amber-300 hover:text-white">
                  Login CMS Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="lg:col-span-4 space-y-2 text-xs text-emerald-200/80">
            <h4 className="font-bold text-amber-400 uppercase tracking-wider">
              Kontak Pelayanan
            </h4>
            <p>
              Call Center Semanu: <strong className="text-white">{institutionInfo.callCenter}</strong>
            </p>
            <p>
              WhatsApp Pusat: <strong className="text-white">0859 1216 35023</strong>
            </p>
            <p>
              WhatsApp Paliyan: <strong className="text-white">0823 2386 0774</strong>
            </p>
            <p className="pt-2 italic text-amber-300/90 font-serif">
              &ldquo;{institutionInfo.tagline}&rdquo;
            </p>
          </div>
        </div>

        <div className="pt-6 text-center text-xs text-emerald-200/70">
          &copy; {new Date().getFullYear()} {institutionInfo.fullName}. Gunungkidul, D.I. Yogyakarta.
        </div>
      </div>
    </footer>
  );
}
