import React from 'react';

export default function TestimonialsSection({ testimonials = [] }) {
  return (
    <section
      id="testimoni"
      className="py-16 lg:py-20 bg-white border-b border-slate-200"
    >
      <div className="wrap space-y-10">
        <div className="max-w-3xl space-y-2.5">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#008580]">
            Kepercayaan Anggota
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Testimoni Tokoh &amp; Anggota BMT MAS
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Pengalaman nyata para tokoh daerah, aparatur, tenaga kesehatan, dan masyarakat Gunungkidul yang mempercayakan simpanannya bersama BMT MAS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {testimonials.map((item) => (
            <article
              key={item.id || item.member_name}
              className="quiet-card bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-[#00A39D] flex flex-col justify-between space-y-5 shadow-card"
            >
              <div className="space-y-4">
                <span className="inline-block text-[11px] font-bold px-2.5 py-1 rounded-md bg-[#E6F6F5] text-[#008580]">
                  {item.highlight_tag || 'Ulasan Anggota'}
                </span>

                <blockquote className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </div>

              <div className="pt-4 border-t border-slate-200/80">
                <h3 className="text-sm font-extrabold text-slate-900">
                  {item.member_name}
                </h3>
                <p className="text-xs text-[#008580] font-semibold mt-0.5">
                  {item.role_title}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
