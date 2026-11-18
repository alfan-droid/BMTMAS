import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import { useBmt } from '../context/BmtContext';

function setMetaTag(attrName, attrValue, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonicalLink(url) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

export default function MainLayout() {
  const { pathname, hash } = useLocation();
  const { institutionInfo } = useBmt();

  // Scroll & Multi-Page Dynamic SEO
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }

    const brand = institutionInfo?.fullName || 'KSPP Syariah BMT MAS';
    const legal = institutionInfo?.legalNumber || '0612/518/BH/XV.2/IV/2010';
    const baseUrl = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, '');
    const canonicalUrl = `${baseUrl}${pathname === '/' ? '' : pathname}`;

    let title = `${brand} — Lembaga Keuangan Mikro Syariah Gunungkidul`;
    let description = `${brand} (BMT Mitra Amanah Sejahtera) Gunungkidul. Badan Hukum No. ${legal}. Layanan simpanan syariah bebas biaya administrasi bulanan (Rp 0,-), simpanan berjangka bagi hasil adil, dan layanan jemput bola door-to-door.`;

    if (pathname === '/produk') {
      title = `Produk Tabungan Syariah (TAMARA, TADIKA, TADURI, TAQURBA) | ${brand}`;
      description = `Katalog produk tabungan syariah ${brand} Gunungkidul: TAMARA (Wadi'ah), TADIKA (Pendidikan), TADURI (Idul Fitri), dan TAQURBA (Qurban). Bebas biaya admin Rp 0/bulan & layanan jemput bola.`;
    } else if (pathname === '/deposito') {
      title = `Simpanan Berjangka & Kalkulator Deposito Syariah | ${brand}`;
      description = `Simulasi bagi hasil Simpanan Berjangka (Deposito Mudharabah) ${brand} Gunungkidul tenor 3, 6, dan 12 bulan dengan nisbah hingga 50:50. Amanah, transparan, dan bebas riba.`;
    } else if (hash === '#tentang') {
      title = `Tentang Kami & Profil Legalitas | ${brand}`;
    } else if (hash === '#lokasi') {
      title = `Lokasi Kantor Pusat Semanu & Cabang Paliyan | ${brand}`;
    }

    document.title = title;
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'robots', 'index, follow');
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', 'website');
    if (institutionInfo?.heroImage) {
      setMetaTag('property', 'og:image', institutionInfo.heroImage);
    }
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setCanonicalLink(canonicalUrl);
  }, [pathname, hash, institutionInfo]);

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 selection:bg-emerald-900 selection:text-white">
      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-950 focus:text-white focus:rounded-lg focus:shadow-lg focus:text-xs focus:font-bold focus:outline-none"
      >
        Lewati ke konten utama
      </a>

      <Navbar />

      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
