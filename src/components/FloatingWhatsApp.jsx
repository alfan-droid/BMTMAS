import React, { useState } from 'react';
import { useBmt } from '../context/BmtContext';

export default function FloatingWhatsApp() {
  const { branches } = useBmt();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Quick Selector Popover */}
      {isOpen && (
        <div className="mb-2 w-72 rounded-2xl bg-white border border-stone-200 shadow-xl overflow-hidden text-xs">
          {/* Header */}
          <div className="p-3.5 bg-emerald-950 text-white flex items-center justify-between">
            <div>
              <h4 className="font-bold text-white">Hubungi CS BMT MAS</h4>
              <p className="text-[11px] text-stone-300">Pilih kantor cabang</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-stone-300 hover:text-white text-xs font-bold px-1.5 py-0.5 rounded"
            >
              Tutup
            </button>
          </div>

          {/* Selector Options */}
          <div className="p-3 space-y-2 bg-[#FDFBF7]">
            {branches.map((branch) => {
              const waLink = `https://wa.me/${branch.whatsappNumber}?text=${encodeURIComponent(
                branch.whatsappText || 'Assalamualaikum BMT MAS, saya ingin berkonsultasi mengenai simpanan syariah.'
              )}`;
              const labelTitle = branch.isHeadOffice
                ? 'CS Kantor Pusat Semanu'
                : 'CS Cabang Paliyan';

              return (
                <a
                  key={branch.id}
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 rounded-xl bg-white border border-stone-200 hover:border-emerald-950 transition-colors"
                >
                  <div className="font-bold text-stone-900">{labelTitle}</div>
                  <div className="text-emerald-900 font-semibold mt-0.5">
                    {branch.whatsappDisplay}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-4 py-3 rounded-full bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-xs shadow-lg transition-colors focus:outline-none"
        aria-expanded={isOpen}
      >
        WhatsApp CS
      </button>
    </div>
  );
}
