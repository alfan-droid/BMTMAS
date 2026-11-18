-- ============================================================================
-- KSPP SYARIAH BMT MAS (BMT MITRA AMANAH SEJAHTERA) - GUNUNGKIDUL
-- Supabase Seed Data (supabase/seed.sql)
-- Jalankan setelah supabase/schema.sql (Idempotent / Aman dijalankan ulang)
-- ============================================================================

-- 1. SEED: products
INSERT INTO public.products (code, name, akad, nisbah, badge_text, description, benefits, icon_name, sort_order, is_active)
VALUES
  (
    'TAMARA',
    'Tabungan Mitra Amanah Sejahtera',
    'Wadi''ah',
    NULL,
    'Likuiditas Fleksibel Harian',
    'Bebas potongan administrasi bulanan dan dana tabungan fleksibel dapat ditarik sewaktu-waktu sesuai kebutuhan transaksi harian Anda.',
    '["Bebas potongan administrasi bulanan (Rp 0,-)", "Dana tabungan fleksibel dapat ditarik sewaktu-waktu", "Dilayani jemput bola langsung ke rumah / tempat usaha"]'::jsonb,
    'Wallet',
    1,
    true
  ),
  (
    'TADIKA',
    'Tabungan Pendidikan Anak',
    'Mudharabah',
    '25 : 75',
    'Dana Sekolah Masa Depan',
    'Solusi perencanaan dana pendidikan masa depan putra-putri dengan bagi hasil syariah yang terukur dan bebas biaya administrasi.',
    '["Nisbah bagi hasil syariah 25 : 75 (Anggota : BMT)", "Perencanaan biaya masuk & jenjang sekolah lebih ringan", "Bebas potongan administrasi bulanan & layanan jemput bola"]'::jsonb,
    'GraduationCap',
    2,
    true
  ),
  (
    'TADURI',
    'Tabungan Idul Fitri',
    'Mudharabah',
    '25 : 75',
    'Persiapan Lebaran Berkah',
    'Persiapan dana kebutuhan Hari Raya Lebaran secara terencana dan penuh keberkahan bersama keluarga di kampung halaman.',
    '["Nisbah bagi hasil 25 : 75 yang menguntungkan", "Kesiapan dana menjelang Hari Raya Idul Fitri tanpa beban", "Tanpa biaya admin bulanan & setoran dijemput petugas"]'::jsonb,
    'Sparkles',
    3,
    true
  ),
  (
    'TAQURBA',
    'Tabungan Idul Qurban',
    'Mudharabah',
    '25 : 75',
    'Ibadah Qurban Terencana',
    'Memudahkan anggota mewujudkan niat ibadah qurban secara ringan dengan bagi hasil kompetitif dan pengelolaan syariah.',
    '["Nisbah bagi hasil kompetitif 25 : 75", "Cicilan tabungan ringan untuk realisasi hewan qurban", "Bebas potongan admin bulanan & layanan jemput bola"]'::jsonb,
    'HeartHandshake',
    4,
    true
  )
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  akad = EXCLUDED.akad,
  nisbah = EXCLUDED.nisbah,
  badge_text = EXCLUDED.badge_text,
  description = EXCLUDED.description,
  benefits = EXCLUDED.benefits,
  icon_name = EXCLUDED.icon_name,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active;

-- 2. SEED: deposito_rates
INSERT INTO public.deposito_rates (tenor_months, tenor_label, nisbah_anggota, nisbah_bmt, avg_monthly_rate, monthly_rates)
VALUES
  (
    3,
    'Jangka Waktu 3 Bulan',
    40,
    60,
    0.88,
    '{"Jan": 0.88, "Feb": 0.85, "Mar": 0.85, "Apr": 0.86, "Mei": 0.89, "Jun": 0.83, "Jul": 0.90, "Agu": 0.87, "Sep": 0.91, "Okt": 0.91, "Nov": 0.92, "Des": 0.86}'::jsonb
  ),
  (
    6,
    'Jangka Waktu 6 Bulan',
    45,
    55,
    0.99,
    '{"Jan": 0.99, "Feb": 0.95, "Mar": 0.96, "Apr": 0.97, "Mei": 1.00, "Jun": 0.94, "Jul": 1.01, "Agu": 0.98, "Sep": 1.02, "Okt": 1.03, "Nov": 1.03, "Des": 0.97}'::jsonb
  ),
  (
    12,
    'Jangka Waktu 12 Bulan',
    50,
    50,
    1.10,
    '{"Jan": 1.10, "Feb": 1.06, "Mar": 1.07, "Apr": 1.08, "Mei": 1.11, "Jun": 1.04, "Jul": 1.13, "Agu": 1.09, "Sep": 1.14, "Okt": 1.14, "Nov": 1.15, "Des": 1.08}'::jsonb
  )
ON CONFLICT (tenor_months) DO UPDATE SET
  tenor_label = EXCLUDED.tenor_label,
  nisbah_anggota = EXCLUDED.nisbah_anggota,
  nisbah_bmt = EXCLUDED.nisbah_bmt,
  avg_monthly_rate = EXCLUDED.avg_monthly_rate,
  monthly_rates = EXCLUDED.monthly_rates;

-- 3. SEED: testimonials
DELETE FROM public.testimonials;
INSERT INTO public.testimonials (member_name, role_title, quote, highlight_tag, sort_order)
VALUES
  (
    'Bpk. Kelik Yuniantoro, S.Sos, MM',
    'Kepala Dinas Perdagangan Gunungkidul',
    'Memilih tabungan dan deposito di BMT MAS karena keamanannya terjamin, berkah, bebas unsur riba, serta memberikan hasil yang menguntungkan.',
    'Aman, Berkah & Bebas Riba',
    1
  ),
  (
    'Ibu Devi Eviana',
    'Kamituwo Dadapayu',
    'Merasa sangat nyaman bermitra dengan BMT MAS berkat layanan konsultasi yang solutif, proses pencairan dan transaksi yang cepat, serta pelayanan prima.',
    'Konsultasi Solutif & Cepat',
    2
  ),
  (
    'Ibu Sri Marmiyati',
    'Perawat Puskesmas Semanu',
    'Sangat terbantu dengan adanya layanan jemput bola dari petugas BMT MAS sehingga transaksi tetap praktis di sela kesibukan kerja sehari-hari.',
    'Praktis dengan Jemput Bola',
    3
  ),
  (
    'Ibu Nurul Maulida Indrastiwi',
    'Perawat Puskesmas Semanu',
    'Mengapresiasi respons cepat petugas yang selalu memandu setiap transaksi, ditambah bagi hasil deposito yang stabil serta program hadiah yang menarik.',
    'Bagi Hasil Stabil & Respons Cepat',
    4
  ),
  (
    'Ibu Nurjanah',
    'Penyuluh KB Semanu',
    'Senang menabung dan berdeposito di BMT MAS karena bagi hasilnya optimal dan para pegawainya selalu ramah melayani anggota.',
    'Bagi Hasil Optimal & Ramah',
    5
  );

-- 4. SEED: institution_info
INSERT INTO public.institution_info (
  id, short_name, full_name, sub_name, alt_name, legal_number, tagline,
  hero_headline, hero_image, hero_badge, region, quran_verse,
  wa_head_office, wa_paliyan, call_center
)
VALUES (
  'main',
  'BMT MAS',
  'KSPP SYARIAH BMT MAS',
  'KSPP Syariah Mitra Amanah Sejahtera',
  'BMT Mitra Amanah Sejahtera',
  '0612/518/BH/XV.2/IV/2010',
  'Ke Syariah Agar Hidup Jadi Berkah',
  'Bersama BMT MAS, Transaksi Syariah untuk Hidup Lebih Berkah',
  'https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=1000&q=80',
  'Kantor Pelayanan',
  'Gunungkidul, D.I. Yogyakarta',
  '{"surah": "QS. Al-Baqarah: 278", "arabic": "يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَذَرُوا مَا بَقِيَ مِنَ الرِّبَا إِن كُنتُم مُّؤْمِنِينَ", "translation": "“Hai orang-orang yang beriman, bertakwalah kepada Allah dan tinggalkan sisa riba (yang belum dipungut) jika kamu orang-orang yang beriman.”"}'::jsonb,
  '62859121635023',
  '6282323860774',
  '(0274) 2903137'
)
ON CONFLICT (id) DO UPDATE SET
  short_name = EXCLUDED.short_name,
  full_name = EXCLUDED.full_name,
  sub_name = EXCLUDED.sub_name,
  alt_name = EXCLUDED.alt_name,
  legal_number = EXCLUDED.legal_number,
  tagline = EXCLUDED.tagline,
  hero_headline = EXCLUDED.hero_headline,
  hero_image = EXCLUDED.hero_image,
  hero_badge = EXCLUDED.hero_badge,
  region = EXCLUDED.region,
  quran_verse = EXCLUDED.quran_verse,
  wa_head_office = EXCLUDED.wa_head_office,
  wa_paliyan = EXCLUDED.wa_paliyan,
  call_center = EXCLUDED.call_center,
  updated_at = NOW();

-- 5. SEED: branches
INSERT INTO public.branches (
  id, code, name, badge, address, phone, whatsapp_display, whatsapp_number,
  whatsapp_text, maps_url, hours, coverage, is_head_office, sort_order
)
VALUES
  (
    'branch-semanu',
    'KP-01',
    'Kantor Pusat Semanu',
    'Kantor Pusat & Call Center',
    'Jl. Raya Semanu - Candirejo, Semanu Utara 04/35, Semanu, Gunungkidul',
    '(0274) 2903137',
    '0859 1216 35023',
    '62859121635023',
    'Assalamualaikum CS Kantor Pusat Semanu BMT MAS, saya ingin berkonsultasi mengenai layanan simpanan syariah.',
    'https://www.google.com/maps/search/?api=1&query=BMT+MAS+Jl.+Raya+Semanu+Candirejo+Semanu+Utara+Gunungkidul',
    'Senin – Jumat: 08.00 – 15.30 WIB • Sabtu: 08.00 – 12.00 WIB',
    'Melayani wilayah Semanu, Wonosari, Karangmojo, Ponjong & sekitarnya',
    true,
    1
  ),
  (
    'branch-paliyan',
    'KC-02',
    'Kantor Cabang Paliyan',
    'Kantor Cabang Pelayanan',
    'Jl. Raya Paliyan Tahunan RT 04 RW 01 Karangduwet, Paliyan, Gunungkidul',
    NULL,
    '0823 2386 0774',
    '6282323860774',
    'Assalamualaikum CS Cabang Paliyan BMT MAS, saya ingin berkonsultasi mengenai layanan simpanan syariah.',
    'https://www.google.com/maps/search/?api=1&query=Jl.+Raya+Paliyan+Tahunan+Karangduwet+Paliyan+Gunungkidul',
    'Senin – Jumat: 08.00 – 15.30 WIB • Sabtu: 08.00 – 12.00 WIB',
    'Melayani wilayah Paliyan, Saptosari, Playen, Panggang & sekitarnya',
    false,
    2
  )
ON CONFLICT (id) DO UPDATE SET
  code = EXCLUDED.code,
  name = EXCLUDED.name,
  badge = EXCLUDED.badge,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  whatsapp_display = EXCLUDED.whatsapp_display,
  whatsapp_number = EXCLUDED.whatsapp_number,
  whatsapp_text = EXCLUDED.whatsapp_text,
  maps_url = EXCLUDED.maps_url,
  hours = EXCLUDED.hours,
  coverage = EXCLUDED.coverage,
  is_head_office = EXCLUDED.is_head_office,
  sort_order = EXCLUDED.sort_order,
  updated_at = NOW();
