import React from 'react';

export default function TestimonialsSection({ testimonials = [] }) {
  return (
    <section
      id="testimoni"
      className="py-12 bg-white border-y border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
            Testimoni Anggota
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Pengalaman nyata para anggota dan tokoh masyarakat di Gunungkidul bersama BMT MAS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <article
              key={item.id || item.member_name}
              className="bg-[#FDFBF7] rounded-2xl p-6 border border-stone-200 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                  {item.highlight_tag || 'Ulasan Anggota'}
                </span>

                <blockquote className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </div>

              <div className="pt-3 border-t border-stone-200/80">
                <h3 className="text-sm font-bold text-stone-900">
                  {item.member_name}
                </h3>
                <p className="text-xs text-stone-500 font-medium mt-0.5">
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
