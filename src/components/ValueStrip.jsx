import React from 'react';
import { Link } from 'react-router-dom';
import { useBmt } from '../context/BmtContext';

export default function ValueStrip() {
  const { institutionInfo } = useBmt();

  const waJemputBola = `https://wa.me/${institutionInfo.waHeadOffice}?text=${encodeURIComponent(
    'Assalamualaikum BMT MAS, saya ingin menanyakan layanan jemput bola tabungan syariah ke lokasi saya.'
  )}`;

  const quickMenus = [
    {
      id: 'qm-tabungan',
      title: 'Tabungan Syariah',
      subtitle: 'Bebas biaya admin Rp 0/bln',
      to: '/produk',
      isExternal: false,
    },
    {
      id: 'qm-deposito',
      title: 'Simulasi Deposito',
      subtitle: 'Hitung nisbah bagi hasil s.d. 50%',
      to: '/deposito',
      isExternal: false,
    },
    {
      id: 'qm-jemput',
      title: 'Layanan Jemput Bola',
      subtitle: 'Setor & tarik di tempat Anda',
      to: waJemputBola,
      isExternal: true,
    },
    {
      id: 'qm-lokasi',
      title: 'Kantor & Layanan CS',
      subtitle: 'Pusat Semanu & Cabang Paliyan',
      to: '#lokasi',
      isExternal: false,
      isAnchor: true,
    },
  ];

  return (
    <section
      aria-label="Akses Cepat Layanan BMT MAS"
      className="relative z-20 -mt-12 sm:-mt-14 pb-10"
    >
      <div className="wrap">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-dock p-3 sm:p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {quickMenus.map((item) => {
              const content = (
                <div className="group p-3.5 sm:p-4 rounded-xl hover:bg-[#F0FDF9] transition-colors">
                  <h2 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#004D4A] transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 leading-snug">
                    {item.subtitle}
                  </p>
                </div>
              );

              if (item.isExternal) {
                return (
                  <a
                    key={item.id}
                    href={item.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-1"
                  >
                    {content}
                  </a>
                );
              }

              if (item.isAnchor) {
                return (
                  <a key={item.id} href={item.to} className="block px-1">
                    {content}
                  </a>
                );
              }

              return (
                <Link key={item.id} to={item.to} className="block px-1">
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
