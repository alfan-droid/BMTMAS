import React from 'react';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import { useBmt } from '../context/BmtContext';

export default function BranchLocations() {
  const { branches } = useBmt();

  return (
    <section
      id="lokasi"
      className="py-16 lg:py-24 bg-white border-b border-slate-200"
    >
      <div className="wrap space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-2.5">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#008580]">
            Jaringan Kantor Pelayanan
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Lokasi Kantor &amp; Layanan Jemput Bola
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Kunjungi kantor pelayanan kami di Semanu atau Paliyan, atau hubungi Customer Service kami untuk menjadwalkan layanan transaksi jemput bola di tempat Anda.
          </p>
        </div>

        {/* 2 Branch Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {branches.map((branch) => {
            const waUrl = `https://wa.me/${branch.whatsappNumber}?text=${encodeURIComponent(
              branch.whatsappText || 'Assalamualaikum BMT MAS, saya ingin berkonsultasi mengenai simpanan syariah.'
            )}`;

            return (
              <div
                key={branch.id}
                className="quiet-card bg-white rounded-2xl border border-slate-200 hover:border-[#00A39D] overflow-hidden flex flex-col justify-between shadow-card"
              >
                {/* Top Accent Strip */}
                <div className="h-1.5 w-full bg-gradient-to-r from-[#004D4A] via-[#00A39D] to-[#F59E0B]" />

                <div className="p-7 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-5">
                    {/* Branch Title */}
                    <div className="pb-4 border-b border-slate-100">
                      <h3 className="text-xl font-extrabold text-slate-900">
                        {branch.name}
                      </h3>
                    </div>

                    {/* Details List */}
                    <div className="space-y-3.5 text-xs sm:text-sm">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-[#00A39D] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-slate-800 block text-xs">
                            Alamat Kantor:
                          </span>
                          <p className="text-slate-600 mt-0.5 leading-relaxed">
                            {branch.address}
                          </p>
                        </div>
                      </div>

                      {branch.phone && (
                        <div className="flex items-start gap-3">
                          <Phone className="w-4 h-4 text-[#00A39D] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-slate-800 block text-xs">
                              Telepon / Call Center:
                            </span>
                            <a
                              href={`tel:${branch.phone.replace(/[^0-9]/g, '')}`}
                              className="font-extrabold text-[#004D4A] hover:text-[#00A39D] transition-colors mt-0.5 inline-block tabular-nums"
                            >
                              {branch.phone}
                            </a>
                          </div>
                        </div>
                      )}

                      <div className="flex items-start gap-3">
                        <MessageCircle className="w-4 h-4 text-[#00A39D] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-slate-800 block text-xs">
                            WhatsApp Layanan Anggota:
                          </span>
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-extrabold text-[#004D4A] hover:text-[#00A39D] transition-colors mt-0.5 inline-block tabular-nums"
                          >
                            {branch.whatsappDisplay}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="w-4 h-4 text-[#00A39D] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-slate-800 block text-xs">
                            Jam Operasional:
                          </span>
                          <p className="text-slate-600 mt-0.5">
                            {branch.hours}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="quiet-btn inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-white bg-[#004D4A] hover:bg-[#008580] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-[#F59E0B]" />
                      <span>{branch.isHeadOffice ? 'Hubungi CS Pusat' : 'Hubungi CS Cabang'}</span>
                    </a>

                    <a
                      href={branch.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="quiet-btn inline-flex items-center justify-center px-4 py-3 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                      <span>Petunjuk Google Maps</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
