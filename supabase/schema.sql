-- ============================================================================
-- KSPP SYARIAH BMT MAS (BMT MITRA AMANAH SEJAHTERA) - GUNUNGKIDUL
-- Supabase Database Schema & RLS Policies (supabase/schema.sql)
-- Badan Hukum: 0612/518/BH/XV.2/IV/2010
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. TABLE: products (Katalog Produk Simpanan Syariah)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
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

DROP POLICY IF EXISTS "Allow public read access on products" ON public.products;
CREATE POLICY "Allow public read access on products"
  ON public.products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated admin full access on products" ON public.products;
CREATE POLICY "Allow authenticated admin full access on products"
  ON public.products FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ----------------------------------------------------------------------------
-- 2. TABLE: deposito_rates (Tabel Equivalent Rate Simpanan Berjangka)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.deposito_rates (
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

DROP POLICY IF EXISTS "Allow public read access on deposito_rates" ON public.deposito_rates;
CREATE POLICY "Allow public read access on deposito_rates"
  ON public.deposito_rates FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated admin full access on deposito_rates" ON public.deposito_rates;
CREATE POLICY "Allow authenticated admin full access on deposito_rates"
  ON public.deposito_rates FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ----------------------------------------------------------------------------
-- 3. TABLE: testimonials (Ulasan Autentik Anggota BMT MAS)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_name VARCHAR(120) NOT NULL,
  role_title VARCHAR(120) NOT NULL,
  quote TEXT NOT NULL,
  highlight_tag VARCHAR(80),
  sort_order INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on testimonials" ON public.testimonials;
CREATE POLICY "Allow public read access on testimonials"
  ON public.testimonials FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated admin full access on testimonials" ON public.testimonials;
CREATE POLICY "Allow authenticated admin full access on testimonials"
  ON public.testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ----------------------------------------------------------------------------
-- 4. TABLE: institution_info (Identitas Resmi & Foto Beranda BMT MAS)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.institution_info (
  id VARCHAR(50) PRIMARY KEY DEFAULT 'main',
  short_name VARCHAR(60) NOT NULL DEFAULT 'BMT MAS',
  full_name VARCHAR(150) NOT NULL,
  sub_name VARCHAR(150) NOT NULL,
  alt_name VARCHAR(150),
  legal_number VARCHAR(80) NOT NULL,
  tagline VARCHAR(200) NOT NULL,
  hero_headline TEXT,
  hero_image TEXT,
  hero_badge VARCHAR(100) DEFAULT 'Kantor Pelayanan',
  region VARCHAR(120) DEFAULT 'Gunungkidul, D.I. Yogyakarta',
  quran_verse JSONB,
  wa_head_office VARCHAR(30) NOT NULL,
  wa_paliyan VARCHAR(30),
  call_center VARCHAR(40) NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.institution_info ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on institution_info" ON public.institution_info;
CREATE POLICY "Allow public read access on institution_info"
  ON public.institution_info FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated admin full access on institution_info" ON public.institution_info;
CREATE POLICY "Allow authenticated admin full access on institution_info"
  ON public.institution_info FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ----------------------------------------------------------------------------
-- 5. TABLE: branches (Jaringan Kantor Pusat & Cabang)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.branches (
  id VARCHAR(50) PRIMARY KEY,
  code VARCHAR(20) NOT NULL,
  name VARCHAR(150) NOT NULL,
  badge VARCHAR(100),
  address TEXT NOT NULL,
  phone VARCHAR(50),
  whatsapp_display VARCHAR(50) NOT NULL,
  whatsapp_number VARCHAR(50) NOT NULL,
  whatsapp_text TEXT,
  maps_url TEXT,
  hours VARCHAR(150) NOT NULL,
  coverage TEXT,
  is_head_office BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 1,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on branches" ON public.branches;
CREATE POLICY "Allow public read access on branches"
  ON public.branches FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated admin full access on branches" ON public.branches;
CREATE POLICY "Allow authenticated admin full access on branches"
  ON public.branches FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ----------------------------------------------------------------------------
-- 6. STORAGE BUCKET: public-assets (Untuk Foto Beranda / Aset CMS)
-- ----------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('public-assets', 'public-assets', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Allow public read on public-assets" ON storage.objects;
CREATE POLICY "Allow public read on public-assets"
  ON storage.objects FOR SELECT USING (bucket_id = 'public-assets');

DROP POLICY IF EXISTS "Allow authenticated upload on public-assets" ON storage.objects;
CREATE POLICY "Allow authenticated upload on public-assets"
  ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'public-assets');

DROP POLICY IF EXISTS "Allow authenticated update on public-assets" ON storage.objects;
CREATE POLICY "Allow authenticated update on public-assets"
  ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'public-assets');

DROP POLICY IF EXISTS "Allow authenticated delete on public-assets" ON storage.objects;
CREATE POLICY "Allow authenticated delete on public-assets"
  ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'public-assets');
