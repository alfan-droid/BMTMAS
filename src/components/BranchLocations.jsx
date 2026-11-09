import React from 'react';
import { useBmt } from '../context/BmtContext';

export default function BranchLocations() {
  const { branches } = useBmt();

  return (
    <section
      id="lokasi"
      className="py-16 bg-[#FDFBF7] border-t border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Lokasi Kantor &amp; Layanan Pelayanan
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl">
            Kunjungi kantor pelayanan kami di Semanu atau Paliyan, atau hubungi petugas lapangan untuk layanan jemput bola.
          </p>
        </div>

        {/* 2 Branch Location Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {branches.map((branch) => {
            const waUrl = `https://wa.me/${branch.whatsappNumber}?text=${encodeURIComponent(
              branch.whatsappText || 'Assalamualaikum BMT MAS, saya ingin berkonsultasi mengenai layanan simpanan syariah.'
            )}`;

            return (
              <div
                key={branch.id}
                className="rounded-2xl bg-white border border-stone-200 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm"
              >
                <div className="space-y-4">
                  <div className="border-b border-stone-100 pb-3">
                    <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                      {branch.name}
                    </h3>
                    <p className="text-xs text-stone-500 font-medium">
                      {branch.badge}
                    </p>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm">
                    <div>
                      <span className="font-bold text-stone-700 block">
                        Alamat Kantor:
                      </span>
                      <p className="text-stone-600 mt-0.5 leading-relaxed">
                        {branch.address}
                      </p>
                    </div>

                    {branch.phone && (
                      <div>
                        <span className="font-bold text-stone-700 block">
                          Telepon / Call Center:
                        </span>
                        <a
                          href={`tel:${branch.phone.replace(/[^0-9]/g, '')}`}
                          className="font-bold text-emerald-950 hover:underline"
                        >
                          {branch.phone}
                        </a>
                      </div>
                    )}

                    <div>
                      <span className="font-bold text-stone-700 block">
                        Nomor WhatsApp:
                      </span>
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-emerald-950 hover:underline"
                      >
                        {branch.whatsappDisplay}
                      </a>
                    </div>

                    <div>
                      <span className="font-bold text-stone-700 block">
                        Jam Layanan:
                      </span>
                      <p className="text-stone-600 mt-0.5">
                        {branch.hours}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center px-4 py-2.5 rounded-xl font-bold text-white bg-emerald-950 hover:bg-emerald-900 transition-colors"
                  >
                    {branch.isHeadOffice ? 'Chat CS Kantor Pusat' : 'Chat CS Cabang Paliyan'}
                  </a>

                  <a
                    href={branch.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center px-4 py-2.5 rounded-xl font-bold text-stone-800 bg-stone-100 hover:bg-stone-200 transition-colors"
                  >
                    Buka di Google Maps
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
