export const INSTITUTION_INFO = {
  shortName: 'BMT MAS',
  fullName: 'KSPP SYARIAH BMT MAS',
  subName: 'KSPP Syariah Mitra Amanah Sejahtera',
  altName: 'BMT Mitra Amanah Sejahtera',
  legalNumber: '0612/518/BH/XV.2/IV/2010',
  tagline: 'Ke Syariah Agar Hidup Jadi Berkah',
  heroHeadline: 'Bersama BMT MAS, Transaksi Syariah untuk Hidup Lebih Berkah',
  heroImage: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=1000&q=80',
  region: 'Gunungkidul, D.I. Yogyakarta',
  quranVerse: {
    surah: 'QS. Al-Baqarah: 278',
    arabic:
      'يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَذَرُوا مَا بَقِيَ مِنَ الرِّبَا إِن كُنتُم مُّؤْمِنِينَ',
    translation:
      '“Hai orang-orang yang beriman, bertakwalah kepada Allah dan tinggalkan sisa riba (yang belum dipungut) jika kamu orang-orang yang beriman.”',
  },
  waHeadOffice: '62859121635023',
  waPaliyan: '6282323860774',
  callCenter: '(0274) 2903137',
};

export const VALUE_PROPOSITIONS = [
  {
    id: 'vp-01',
    number: '01',
    title: 'Bebas Biaya Admin',
    metric: 'Rp 0 / bln',
    description:
      'Tabungan utuh tanpa potongan administrasi bulanan, menjaga nilai simpanan Anda tetap optimal setiap bulan.',
    icon_name: 'ShieldCheck',
  },
  {
    id: 'vp-02',
    number: '02',
    title: 'Layanan Jemput Bola',
    metric: 'Door-to-Door',
    description:
      'Petugas ramah dan siap datang melayani transaksi setoran maupun penarikan langsung ke rumah atau tempat usaha nasabah.',
    icon_name: 'Truck',
  },
  {
    id: 'vp-03',
    number: '03',
    title: "100% Halal & Syar'i",
    metric: 'Bebas Riba',
    description:
      "Dikelola dengan akad Wadi'ah dan Mudharabah yang transparan berlandaskan nilai-nilai QS. Al-Baqarah: 278.",
    icon_name: 'Scale',
  },
  {
    id: 'vp-04',
    number: '04',
    title: 'Bagi Hasil Kompetitif',
    metric: 'Nisbah s.d. 50%',
    description:
      'Nisbah simpanan berjangka yang stabil, adil, dan menguntungkan sesuai kinerja riil usaha syariah koperasi.',
    icon_name: 'TrendingUp',
  },
];

export const FALLBACK_PRODUCTS = [
  {
    id: 'prod-tamara',
    code: 'TAMARA',
    name: 'Tabungan Mitra Amanah Sejahtera',
    akad: "Wadi'ah",
    nisbah: null,
    badge_text: 'Likuiditas Fleksibel Harian',
    description:
      'Bebas potongan administrasi bulanan dan dana tabungan fleksibel dapat ditarik sewaktu-waktu sesuai kebutuhan transaksi harian Anda.',
    benefits: [
      'Bebas potongan administrasi bulanan (Rp 0,-)',
      'Dana tabungan fleksibel dapat ditarik sewaktu-waktu',
      'Dilayani jemput bola langsung ke rumah / tempat usaha',
    ],
    icon_name: 'Wallet',
    sort_order: 1,
  },
  {
    id: 'prod-tadika',
    code: 'TADIKA',
    name: 'Tabungan Pendidikan Anak',
    akad: 'Mudharabah',
    nisbah: '25 : 75',
    badge_text: 'Dana Sekolah Masa Depan',
    description:
      'Solusi perencanaan dana pendidikan masa depan putra-putri dengan bagi hasil syariah yang terukur dan bebas biaya administrasi.',
    benefits: [
      'Nisbah bagi hasil syariah 25 : 75 (Anggota : BMT)',
      'Perencanaan biaya masuk & jenjang sekolah lebih ringan',
      'Bebas potongan administrasi bulanan & layanan jemput bola',
    ],
    icon_name: 'GraduationCap',
    sort_order: 2,
  },
  {
    id: 'prod-taduri',
    code: 'TADURI',
    name: 'Tabungan Idul Fitri',
    akad: 'Mudharabah',
    nisbah: '25 : 75',
    badge_text: 'Persiapan Lebaran Berkah',
    description:
      'Persiapan dana kebutuhan Hari Raya Lebaran secara terencana dan penuh keberkahan bersama keluarga di kampung halaman.',
    benefits: [
      'Nisbah bagi hasil 25 : 75 yang menguntungkan',
      'Kesiapan dana menjelang Hari Raya Idul Fitri tanpa beban',
      'Tanpa biaya admin bulanan & setoran dijemput petugas',
    ],
    icon_name: 'Sparkles',
    sort_order: 3,
  },
  {
    id: 'prod-taqurba',
    code: 'TAQURBA',
    name: 'Tabungan Idul Qurban',
    akad: 'Mudharabah',
    nisbah: '25 : 75',
    badge_text: 'Ibadah Qurban Terencana',
    description:
      'Memudahkan anggota mewujudkan niat ibadah qurban secara ringan dengan bagi hasil kompetitif dan pengelolaan syariah.',
    benefits: [
      'Nisbah bagi hasil kompetitif 25 : 75',
      'Cicilan tabungan ringan untuk realisasi hewan qurban',
      'Bebas potongan admin bulanan & layanan jemput bola',
    ],
    icon_name: 'HeartHandshake',
    sort_order: 4,
  },
];

export const FALLBACK_DEPOSITO_RATES = [
  {
    id: 'dep-3m',
    tenor_months: 3,
    tenor_label: 'Jangka Waktu 3 Bulan',
    short_label: '3 Bulan',
    nisbah_anggota: 40,
    nisbah_bmt: 60,
    avg_monthly_rate: 0.88,
    monthly_rates: {
      Jan: 0.88,
      Feb: 0.85,
      Mar: 0.85,
      Apr: 0.86,
      Mei: 0.89,
      Jun: 0.83,
      Jul: 0.90,
      Agu: 0.87,
      Sep: 0.91,
      Okt: 0.91,
      Nov: 0.92,
      Des: 0.86,
    },
  },
  {
    id: 'dep-6m',
    tenor_months: 6,
    tenor_label: 'Jangka Waktu 6 Bulan',
    short_label: '6 Bulan',
    nisbah_anggota: 45,
    nisbah_bmt: 55,
    avg_monthly_rate: 0.99,
    monthly_rates: {
      Jan: 0.99,
      Feb: 0.95,
      Mar: 0.96,
      Apr: 0.97,
      Mei: 1.00,
      Jun: 0.94,
      Jul: 1.01,
      Agu: 0.98,
      Sep: 1.02,
      Okt: 1.03,
      Nov: 1.03,
      Des: 0.97,
    },
  },
  {
    id: 'dep-12m',
    tenor_months: 12,
    tenor_label: 'Jangka Waktu 12 Bulan',
    short_label: '12 Bulan',
    nisbah_anggota: 50,
    nisbah_bmt: 50,
    avg_monthly_rate: 1.10,
    monthly_rates: {
      Jan: 1.10,
      Feb: 1.06,
      Mar: 1.07,
      Apr: 1.08,
      Mei: 1.11,
      Jun: 1.04,
      Jul: 1.13,
      Agu: 1.09,
      Sep: 1.14,
      Okt: 1.14,
      Nov: 1.15,
      Des: 1.08,
    },
  },
];

export const DEPOSITO_REQUIREMENTS = [
  {
    code: '01',
    title: 'Fotokopi KTP yang Masih Berlaku',
    detail:
      'Menyerahkan 1 lembar fotokopi Kartu Tanda Penduduk (KTP) calon anggota/nasabah.',
  },
  {
    code: '02',
    title: 'Minimal Simpanan Rp 1.000.000,-',
    detail:
      'Penempatan dana simpanan berjangka minimal Rp 1.000.000,- ditambah Rp 10.000 untuk biaya meterai.',
  },
  {
    code: '03',
    title: 'Program Suvenir / Hadiah Menarik',
    detail:
      'Kesempatan mendapatkan suvenir atau hadiah menarik secara langsung selama persediaan masih ada.',
  },
  {
    code: '04',
    title: 'Ketentuan Keanggotaan Koperasi',
    detail:
      'Memenuhi syarat dan ketentuan keanggotaan KSPP Syariah BMT Mitra Amanah Sejahtera.',
  },
];

export const FALLBACK_TESTIMONIALS = [
  {
    id: 'testi-1',
    member_name: 'Bpk. Kelik Yuniantoro, S.Sos, MM',
    role_title: 'Kepala Dinas Perdagangan Gunungkidul',
    quote:
      'Memilih tabungan dan deposito di BMT MAS karena keamanannya terjamin, berkah, bebas unsur riba, serta memberikan hasil yang menguntungkan.',
    highlight_tag: 'Aman, Berkah & Bebas Riba',
    sort_order: 1,
  },
  {
    id: 'testi-2',
    member_name: 'Ibu Devi Eviana',
    role_title: 'Kamituwo Dadapayu',
    quote:
      'Merasa sangat nyaman bermitra dengan BMT MAS berkat layanan konsultasi yang solutif, proses pencairan dan transaksi yang cepat, serta pelayanan prima.',
    highlight_tag: 'Konsultasi Solutif & Cepat',
    sort_order: 2,
  },
  {
    id: 'testi-3',
    member_name: 'Ibu Sri Marmiyati',
    role_title: 'Perawat Puskesmas Semanu',
    quote:
      'Sangat terbantu dengan adanya layanan jemput bola dari petugas BMT MAS sehingga transaksi tetap praktis di sela kesibukan kerja sehari-hari.',
    highlight_tag: 'Praktis dengan Jemput Bola',
    sort_order: 3,
  },
  {
    id: 'testi-4',
    member_name: 'Ibu Nurul Maulida Indrastiwi',
    role_title: 'Perawat Puskesmas Semanu',
    quote:
      'Mengapresiasi respons cepat petugas yang selalu memandu setiap transaksi, ditambah bagi hasil deposito yang stabil serta program hadiah yang menarik.',
    highlight_tag: 'Bagi Hasil Stabil & Respons Cepat',
    sort_order: 4,
  },
  {
    id: 'testi-5',
    member_name: 'Ibu Nurjanah',
    role_title: 'Penyuluh KB Semanu',
    quote:
      'Senang menabung dan berdeposito di BMT MAS karena bagi hasilnya optimal dan para pegawainya selalu ramah melayani anggota.',
    highlight_tag: 'Bagi Hasil Optimal & Ramah',
    sort_order: 5,
  },
];

export const BRANCH_OFFICES = [
  {
    id: 'branch-semanu',
    code: 'KP-01',
    name: 'Kantor Pusat Semanu',
    badge: 'Kantor Pusat & Call Center',
    address:
      'Jl. Raya Semanu - Candirejo, Semanu Utara 04/35, Semanu, Gunungkidul',
    phone: '(0274) 2903137',
    whatsappDisplay: '0859 1216 35023',
    whatsappNumber: '62859121635023',
    whatsappText:
      'Assalamualaikum CS Kantor Pusat Semanu BMT MAS, saya ingin berkonsultasi mengenai layanan simpanan syariah.',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=BMT+MAS+Jl.+Raya+Semanu+Candirejo+Semanu+Utara+Gunungkidul',
    hours: 'Senin – Jumat: 08.00 – 15.30 WIB • Sabtu: 08.00 – 12.00 WIB',
    coverage: 'Melayani wilayah Semanu, Wonosari, Karangmojo, Ponjong & sekitarnya',
    isHeadOffice: true,
  },
  {
    id: 'branch-paliyan',
    code: 'KC-02',
    name: 'Kantor Cabang Paliyan',
    badge: 'Kantor Cabang Pelayanan',
    address:
      'Jl. Raya Paliyan Tahunan RT 04 RW 01 Karangduwet, Paliyan, Gunungkidul',
    phone: null,
    whatsappDisplay: '0823 2386 0774',
    whatsappNumber: '6282323860774',
    whatsappText:
      'Assalamualaikum CS Cabang Paliyan BMT MAS, saya ingin berkonsultasi mengenai layanan simpanan syariah.',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Jl.+Raya+Paliyan+Tahunan+Karangduwet+Paliyan+Gunungkidul',
    hours: 'Senin – Jumat: 08.00 – 15.30 WIB • Sabtu: 08.00 – 12.00 WIB',
    coverage: 'Melayani wilayah Paliyan, Saptosari, Playen, Panggang & sekitarnya',
    isHeadOffice: false,
  },
];
