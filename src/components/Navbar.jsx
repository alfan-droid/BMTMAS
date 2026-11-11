import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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
      setScrolled(window.scrollY > 12);

      if (location.pathname === '/') {
        const sections = ['lokasi', 'tentang', 'beranda'];
        const scrollPosition = window.scrollY + 180;

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

  const navItems = [
    { key: 'beranda', label: 'Beranda', to: '/', isActive: isBerandaActive },
    { key: 'tentang', label: 'Tentang Kami', hash: '#tentang', isActive: isTentangActive },
    { key: 'lokasi', label: 'Jaringan Kantor', hash: '#lokasi', isActive: isLokasiActive },
    { key: 'produk', label: 'Tabungan Syariah', to: '/produk', isActive: isProduk },
    { key: 'deposito', label: 'Simpanan Berjangka', to: '/deposito', isActive: isDeposito },
  ];

  const renderNavItem = (item, isMobile = false) => {
    const className = isMobile
      ? `block w-full text-left px-4 py-3 rounded-lg text-sm font-semibold ${
          item.isActive ? 'bg-[#E6F6F5] text-[#004D4A] font-bold' : 'text-slate-700 hover:bg-slate-50'
        }`
      : `py-1.5 relative transition-colors ${
          item.isActive
            ? 'text-[#008580] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#F59E0B]'
            : 'text-slate-700 hover:text-[#008580]'
        }`;

    if (item.hash) {
      return (
        <button
          key={item.key}
          type="button"
          onClick={() => handleNavClick(item.hash)}
          className={className}
        >
          {item.label}
        </button>
      );
    }

    return (
      <Link
        key={item.key}
        to={item.to}
        onClick={() => {
          if (isMobile) setMobileMenuOpen(false);
          if (item.to === '/' && isHome) window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={className}
      >
        {item.label}
      </Link>
    );
  };

  const waUrl = `https://wa.me/${institutionInfo.waHeadOffice}?text=${encodeURIComponent(
    'Assalamualaikum BMT MAS, saya ingin membuka rekening simpanan syariah. Mohon informasinya.'
  )}`;

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      {/* Main Navigation Bar */}
      <nav
        className={`w-full bg-white border-b border-slate-200/90 transition-all duration-200 ${scrolled ? 'py-3 shadow-md' : 'py-4'
          }`}
        aria-label="Navigasi Utama"
      >
        <div className="wrap">
          <div className="flex items-center justify-between gap-6">
            {/* Left: Brand Identity */}
            <Link
              to="/"
              className="flex items-center gap-3.5 group focus:outline-none"
              onClick={() => {
                if (isHome) window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="relative w-11 h-11 rounded-xl bg-[#004D4A] text-white font-extrabold text-sm flex items-center justify-center shrink-0 tracking-wider shadow-sm group-hover:bg-[#00A39D] transition-colors">
                <span>MAS</span>
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#F59E0B] border-2 border-white" />
              </div>

              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[#004D4A]">
                    BMT MAS
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#E6F6F5] text-[#008580]">
                    Syariah
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium leading-tight">
                  Mitra Amanah Sejahtera
                </span>
              </div>
            </Link>

            {/* Center: Desktop Menu Links */}
            <div className="hidden lg:flex items-center gap-8 text-sm font-semibold">
              {navItems.map((item) => renderNavItem(item))}
            </div>

            {/* Right: Primary Action CTA (BSI Gold/Teal Button) */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="quiet-btn inline-flex items-center px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold text-slate-950 bg-[#F59E0B] hover:bg-[#D97706] shadow-xs"
              >
                <span>Buka Simpanan</span>
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="p-2.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                aria-expanded={mobileMenuOpen}
                aria-label="Menu Navigasi"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-5 pt-4 pb-6 space-y-2 shadow-xl">
            {navItems.map((item) => renderNavItem(item, true))}

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center px-4 py-3 rounded-lg text-sm font-bold text-slate-950 bg-[#F59E0B] hover:bg-[#D97706]"
              >
                Buka Simpanan via WhatsApp
              </a>
              <a
                href={`tel:${institutionInfo.callCenter.replace(/[^0-9]/g, '')}`}
                className="w-full block text-center px-4 py-2.5 rounded-lg text-xs font-semibold text-[#004D4A] bg-[#E6F6F5]"
              >
                Call Center: {institutionInfo.callCenter}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
