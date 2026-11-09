import React from 'react';
import { VALUE_PROPOSITIONS } from '../data/fallbackData';

export default function ValueStrip() {
  return (
    <section
      aria-label="Keunggulan Utama BMT MAS"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
    >
      <div className="rounded-2xl bg-white border border-stone-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-stone-200">
          {VALUE_PROPOSITIONS.map((item, idx) => (
            <div
              key={item.id}
              className="p-6 sm:p-7 space-y-3"
            >
              <div className="flex items-center justify-between text-xs font-bold text-emerald-950 uppercase tracking-wider">
                <span>{item.metric}</span>
                <span className="text-stone-400 font-medium">0{idx + 1}</span>
              </div>

              <h2 className="text-base font-bold text-stone-900">
                {item.title}
              </h2>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
