import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useBmt } from '../context/BmtContext';

export default function Navbar() {
  const { institutionInfo } = useBmt();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (location.pathname === '/') {
        const sections = ['lokasi', 'tentang', 'beranda'];
        const scrollPosition = window.scrollY + 220;

        for (const section of sections) {
          const el = document.getElementById(section);
          if (el && el.offsetTop <= scrollPosition) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (hash) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/${hash}`);
    } else {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isHome = location.pathname === '/';
  const isProduk = location.pathname === '/produk';
  const isDeposito = location.pathname === '/deposito';

  const isBerandaActive = isHome && activeSection === 'beranda';
  const isTentangActive = isHome && activeSection === 'tentang';
  const isLokasiActive = isHome && activeSection === 'lokasi';

  const waUrl = `https://wa.me/${institutionInfo.waHeadOffice}?text=${encodeURIComponent(
    'Assalamualaikum BMT MAS, saya ingin berkonsultasi mengenai layanan simpanan syariah.'
  )}`;

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Sticky Navigation Bar dengan Efek Glassmorphism & Shadow Transisi */}
      <nav
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-md border-b border-stone-200/90 py-2.5'
            : 'bg-[#FDFBF7]/85 backdrop-blur-md border-b border-stone-200/50 py-4'
        }`}
        aria-label="Navigasi Utama"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6">
            {/* Left: Brand Identity */}
            <Link
              to="/"
              className="flex items-center gap-3 group focus:outline-none"
              onClick={() => {
                if (isHome) window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-950 text-amber-400 font-extrabold text-sm tracking-wider group-hover:scale-105 active:scale-95 transition-transform duration-200 shadow-sm">
                MAS
              </div>

              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-tight text-emerald-950 group-hover:text-emerald-800 transition-colors">
                  BMT MAS
                </span>
                <span className="text-xs text-stone-600 font-medium leading-none">
                  KSPP Syariah Mitra Amanah Sejahtera
                </span>
              </div>
            </Link>

            {/* Center: Desktop Navigation Links (Lokasi diletakkan di sebelah Tentang Kami) */}
            <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-xl bg-stone-900/[0.04] border border-stone-200/60 text-xs xl:text-sm font-bold text-stone-700">
              <Link
                to="/"
                onClick={() => {
                  if (isHome) window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3.5 py-1.5 rounded-lg transition-all duration-200 ${
                  isBerandaActive
                    ? 'bg-emerald-950 text-white shadow-xs'
                    : 'hover:text-emerald-950 hover:bg-stone-200/70'
                }`}
              >
                Beranda
              </Link>

              <button
                type="button"
                onClick={() => handleNavClick('#tentang')}
                className={`px-3.5 py-1.5 rounded-lg transition-all duration-200 ${
                  isTentangActive
                    ? 'bg-emerald-950 text-white shadow-xs'
                    : 'hover:text-emerald-950 hover:bg-stone-200/70'
                }`}
              >
                Tentang Kami
              </button>

              {/* Lokasi diletakkan tepat di sebelah Tentang Kami */}
              <button
                type="button"
                onClick={() => handleNavClick('#lokasi')}
                className={`px-3.5 py-1.5 rounded-lg transition-all duration-200 ${
                  isLokasiActive
                    ? 'bg-emerald-950 text-white shadow-xs'
                    : 'hover:text-emerald-950 hover:bg-stone-200/70'
                }`}
              >
                Lokasi
              </button>

              <Link
                to="/produk"
                className={`px-3.5 py-1.5 rounded-lg transition-all duration-200 ${
                  isProduk
                    ? 'bg-emerald-950 text-white shadow-xs'
                    : 'hover:text-emerald-950 hover:bg-stone-200/70'
                }`}
              >
                Produk Simpanan
              </Link>

              <Link
                to="/deposito"
                className={`px-3.5 py-1.5 rounded-lg transition-all duration-200 ${
                  isDeposito
                    ? 'bg-emerald-950 text-white shadow-xs'
                    : 'hover:text-emerald-950 hover:bg-stone-200/70'
                }`}
              >
                Simpanan Berjangka
              </Link>
            </div>

            {/* Right: Primary Action Button dengan Efek Hover & Shadow */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-950 hover:bg-emerald-900 hover:shadow-md active:scale-95 transition-all duration-200 shadow-sm"
              >
                Hubungi Kami
              </a>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-bold text-stone-800 hover:bg-stone-100 transition-colors"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? 'Tutup' : 'Menu'}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-stone-200 px-4 pt-3 pb-6 space-y-1.5 shadow-xl transition-all duration-300">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                isBerandaActive ? 'bg-emerald-950 text-white' : 'text-stone-800 hover:bg-stone-100'
              }`}
            >
              Beranda
            </Link>

            <button
              type="button"
              onClick={() => handleNavClick('#tentang')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                isTentangActive ? 'bg-emerald-950 text-white' : 'text-stone-800 hover:bg-stone-100'
              }`}
            >
              Tentang Kami
            </button>

            {/* Lokasi tepat di sebelah Tentang Kami */}
            <button
              type="button"
              onClick={() => handleNavClick('#lokasi')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                isLokasiActive ? 'bg-emerald-950 text-white' : 'text-stone-800 hover:bg-stone-100'
              }`}
            >
              Lokasi Kantor
            </button>

            <Link
              to="/produk"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                isProduk ? 'bg-emerald-950 text-white' : 'text-stone-800 hover:bg-stone-100'
              }`}
            >
              Produk Simpanan
            </Link>

            <Link
              to="/deposito"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                isDeposito ? 'bg-emerald-950 text-white' : 'text-stone-800 hover:bg-stone-100'
              }`}
            >
              Simpanan Berjangka
            </Link>

            <div className="pt-3 border-t border-stone-200">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center px-4 py-3 rounded-xl text-sm font-bold text-white bg-emerald-950 hover:bg-emerald-900 transition-colors shadow-sm"
              >
                Hubungi Kami via WhatsApp
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
