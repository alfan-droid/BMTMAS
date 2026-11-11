import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useBmt } from '../context/BmtContext';

export default function FloatingWhatsApp() {
  const { branches } = useBmt();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Quick Selector Popover */}
      {isOpen && (
        <div className="mb-3 w-76 sm:w-80 rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden text-xs">
          {/* Header */}
          <div className="p-4 bg-[#004D4A] text-white flex items-center justify-between">
            <div>
              <h4 className="font-extrabold text-white text-sm">Layanan CS BMT MAS</h4>
              <p className="text-[11px] text-[#5EEAD4]">Pilih kantor layanan WhatsApp</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-white/75 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Selector Options */}
          <div className="p-3.5 space-y-2.5 bg-slate-50">
            {branches.map((branch) => {
              const waLink = `https://wa.me/${branch.whatsappNumber}?text=${encodeURIComponent(
                branch.whatsappText || 'Assalamualaikum BMT MAS, saya ingin berkonsultasi mengenai simpanan syariah.'
              )}`;
              const labelTitle = branch.isHeadOffice
                ? 'CS Kantor Pusat Semanu'
                : 'CS Kantor Cabang Paliyan';

              return (
                <a
                  key={branch.id}
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="quiet-card block p-3.5 rounded-xl bg-white border border-slate-200 hover:border-[#00A39D] transition-all shadow-xs"
                >
                  <div className="font-bold text-slate-900">{labelTitle}</div>
                  <div className="text-[#008580] font-extrabold text-xs mt-0.5 tabular-nums">
                    {branch.whatsappDisplay}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    {branch.hours}
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
        className="quiet-btn px-4 py-3 rounded-full bg-[#00A39D] hover:bg-[#008580] text-white font-bold text-xs shadow-lg flex items-center gap-2 focus:outline-none border-2 border-white"
        aria-expanded={isOpen}
      >
        <MessageCircle className="w-4 h-4 text-[#FEF3C7]" />
        <span>Tanya CS BMT MAS</span>
      </button>
    </div>
  );
}
