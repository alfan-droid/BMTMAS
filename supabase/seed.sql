-- ============================================================================
-- KSPP SYARIAH BMT MAS (BMT MITRA AMANAH SEJAHTERA) - GUNUNGKIDUL
-- Supabase Database Schema & Seed Data (supabase/seed.sql)
-- Badan Hukum: 0612/518/BH/XV.2/IV/2010
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. TABLE: products (Katalog Produk Simpanan Syariah)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS public.products CASCADE;

CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(20) NOT NULL UNIQUE,
  name VARCHAR(150) NOT NULL,
  akad VARCHAR(50) NOT NULL,
  nisbah VARCHAR(30),
  badge_text VARCHAR(80),
  description TEXT NOT NULL,
  benefits JSONB DEFAULT '[]'::jsonb,
  icon_name VARCHAR(50) DEFAULT 'Wallet',
  sort_order INTEGER NOT NULL DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on products"
  ON public.products
  FOR SELECT
  USING (true);

INSERT INTO public.products (code, name, akad, nisbah, badge_text, description, benefits, icon_name, sort_order)
VALUES
  (
    'TAMARA',
    'Tabungan Mitra Amanah Sejahtera',
    'Wadi''ah',
    NULL,
    'Simpanan Harian Fleksibel',
    'Bebas potongan administrasi bulanan dan dana tabungan fleksibel dapat ditarik sewaktu-waktu sesuai kebutuhan likuiditas anggota.',
    '["Bebas potongan administrasi bulanan (Rp 0,-)", "Dana tabungan fleksibel dapat ditarik sewaktu-waktu", "Layanan jemput bola langsung ke rumah atau tempat usaha", "Dikelola secara amanah dan 100% bebas riba"]'::jsonb,
    'Wallet',
    1
  ),
  (
    'TADIKA',
    'Tabungan Pendidikan Anak',
    'Mudharabah',
    '25 : 75',
    'Perencanaan Sekolah Anak',
    'Solusi perencanaan dana pendidikan masa depan putra-putri dengan bagi hasil syariah yang kompetitif dan bebas biaya admin.',
    '["Nisbah bagi hasil syariah 25 : 75 (Anggota : BMT)", "Perencanaan dana pendidikan anak lebih terarah per jenjang", "Tanpa potongan administrasi bulanan", "Setoran mudah dengan layanan jemput bola petugas"]'::jsonb,
    'GraduationCap',
    2
  ),
  (
    'TADURI',
    'Tabungan Idul Fitri',
    'Mudharabah',
    '25 : 75',
    'Dana Hari Raya Terencana',
    'Persiapan dana kebutuhan Hari Raya Lebaran secara terencana dan penuh keberkahan bersama keluarga tercinta.',
    '["Nisbah bagi hasil 25 : 75 yang menguntungkan", "Persiapan kebutuhan Hari Raya Lebaran lebih ringan", "Bebas biaya administrasi bulanan", "Dilayani jemput bola secara rutin"]'::jsonb,
    'Sparkles',
    3
  ),
  (
    'TAQURBA',
    'Tabungan Idul Qurban',
    'Mudharabah',
    '25 : 75',
    'Wujudkan Ibadah Qurban',
    'Memudahkan anggota mewujudkan niat ibadah qurban secara ringan dengan bagi hasil kompetitif dan pengelolaan syar''i.',
    '["Nisbah bagi hasil kompetitif 25 : 75", "Mewujudkan niat ibadah qurban secara ringan & bertahap", "Tanpa potongan administrasi bulanan", "Layanan jemput bola oleh petugas BMT MAS"]'::jsonb,
    'HeartHandshake',
    4
  );

-- ----------------------------------------------------------------------------
-- 2. TABLE: deposito_rates (Tabel Equivalent Rate Simpanan Berjangka 2022)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS public.deposito_rates CASCADE;

CREATE TABLE public.deposito_rates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenor_months INTEGER NOT NULL UNIQUE,
  tenor_label VARCHAR(50) NOT NULL,
  nisbah_anggota INTEGER NOT NULL,
  nisbah_bmt INTEGER NOT NULL,
  avg_monthly_rate NUMERIC(5, 2) NOT NULL,
  monthly_rates JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.deposito_rates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on deposito_rates"
  ON public.deposito_rates
  FOR SELECT
  USING (true);

INSERT INTO public.deposito_rates (tenor_months, tenor_label, nisbah_anggota, nisbah_bmt, avg_monthly_rate, monthly_rates)
VALUES
  (
    3,
    'Jangka Waktu 3 Bulan',
    40,
    60,
    0.88,
    '{
      "Jan": 0.88, "Feb": 0.85, "Mar": 0.85, "Apr": 0.86, "Mei": 0.89, "Jun": 0.83,
      "Jul": 0.90, "Agu": 0.87, "Sep": 0.91, "Okt": 0.91, "Nov": 0.92, "Des": 0.86
    }'::jsonb
  ),
  (
    6,
    'Jangka Waktu 6 Bulan',
    45,
    55,
    0.99,
    '{
      "Jan": 0.99, "Feb": 0.95, "Mar": 0.96, "Apr": 0.97, "Mei": 1.00, "Jun": 0.94,
      "Jul": 1.01, "Agu": 0.98, "Sep": 1.02, "Okt": 1.03, "Nov": 1.03, "Des": 0.97
    }'::jsonb
  ),
  (
    12,
    'Jangka Waktu 12 Bulan',
    50,
    50,
    1.10,
    '{
      "Jan": 1.10, "Feb": 1.06, "Mar": 1.07, "Apr": 1.08, "Mei": 1.11, "Jun": 1.04,
      "Jul": 1.13, "Agu": 1.09, "Sep": 1.14, "Okt": 1.14, "Nov": 1.15, "Des": 1.08
    }'::jsonb
  );

-- ----------------------------------------------------------------------------
-- 3. TABLE: testimonials (Ulasan Autentik Anggota BMT MAS)
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS public.testimonials CASCADE;

CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_name VARCHAR(120) NOT NULL,
  role_title VARCHAR(120) NOT NULL,
  quote TEXT NOT NULL,
  highlight_tag VARCHAR(80),
  sort_order INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on testimonials"
  ON public.testimonials
  FOR SELECT
  USING (true);

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
    'Konsultasi Solutif & Transaksi Cepat',
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
    'Bagi Hasil Optimal & Pegawai Ramah',
    5
  );
