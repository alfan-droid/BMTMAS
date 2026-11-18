import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INSTITUTION_INFO as defaultInstitution,
  FALLBACK_PRODUCTS as defaultProducts,
  FALLBACK_DEPOSITO_RATES as defaultRates,
  FALLBACK_TESTIMONIALS as defaultTestimonials,
  BRANCH_OFFICES as defaultBranches,
} from '../data/fallbackData';
import { supabase } from '../lib/supabaseClient';

const BmtContext = createContext(null);

const STORAGE_KEYS = {
  PRODUCTS: 'bmt_mas_products_v2',
  RATES: 'bmt_mas_rates_v2',
  TESTIMONIALS: 'bmt_mas_testimonials_v2',
  INSTITUTION: 'bmt_mas_institution_v2',
  BRANCHES: 'bmt_mas_branches_v2',
};

const generateUuid = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
      });

const mapInstitutionFromDb = (row) => ({
  shortName: row.short_name ?? defaultInstitution.shortName,
  fullName: row.full_name ?? defaultInstitution.fullName,
  subName: row.sub_name ?? defaultInstitution.subName,
  altName: row.alt_name ?? defaultInstitution.altName,
  legalNumber: row.legal_number ?? defaultInstitution.legalNumber,
  tagline: row.tagline ?? defaultInstitution.tagline,
  heroHeadline: row.hero_headline ?? defaultInstitution.heroHeadline,
  heroImage: row.hero_image ?? defaultInstitution.heroImage,
  heroBadge: row.hero_badge ?? 'Kantor Pelayanan',
  region: row.region ?? defaultInstitution.region,
  quranVerse: row.quran_verse ?? defaultInstitution.quranVerse,
  waHeadOffice: row.wa_head_office ?? defaultInstitution.waHeadOffice,
  waPaliyan: row.wa_paliyan ?? defaultInstitution.waPaliyan,
  callCenter: row.call_center ?? defaultInstitution.callCenter,
});

const mapInstitutionToDb = (info) => ({
  id: 'main',
  short_name: info.shortName || defaultInstitution.shortName,
  full_name: info.fullName || defaultInstitution.fullName,
  sub_name: info.subName || defaultInstitution.subName,
  alt_name: info.altName || defaultInstitution.altName,
  legal_number: info.legalNumber || defaultInstitution.legalNumber,
  tagline: info.tagline || defaultInstitution.tagline,
  hero_headline: info.heroHeadline || defaultInstitution.heroHeadline,
  hero_image: info.heroImage || defaultInstitution.heroImage,
  hero_badge: info.heroBadge || 'Kantor Pelayanan',
  region: info.region || defaultInstitution.region,
  quran_verse: info.quranVerse || defaultInstitution.quranVerse,
  wa_head_office: info.waHeadOffice || defaultInstitution.waHeadOffice,
  wa_paliyan: info.waPaliyan || defaultInstitution.waPaliyan,
  call_center: info.callCenter || defaultInstitution.callCenter,
  updated_at: new Date().toISOString(),
});

const mapBranchFromDb = (row) => ({
  id: row.id,
  code: row.code,
  name: row.name,
  badge: row.badge,
  address: row.address,
  phone: row.phone,
  whatsappDisplay: row.whatsapp_display,
  whatsappNumber: row.whatsapp_number,
  whatsappText: row.whatsapp_text,
  mapsUrl: row.maps_url,
  hours: row.hours,
  coverage: row.coverage,
  isHeadOffice: Boolean(row.is_head_office),
  sort_order: row.sort_order ?? 1,
});

const mapBranchToDb = (b, idx = 0) => ({
  id: b.id,
  code: b.code,
  name: b.name,
  badge: b.badge || '',
  address: b.address || '',
  phone: b.phone || null,
  whatsapp_display: b.whatsappDisplay || '',
  whatsapp_number: b.whatsappNumber || '',
  whatsapp_text: b.whatsappText || '',
  maps_url: b.mapsUrl || '',
  hours: b.hours || '',
  coverage: b.coverage || '',
  is_head_office: Boolean(b.isHeadOffice),
  sort_order: b.sort_order ?? idx + 1,
  updated_at: new Date().toISOString(),
});

export const BmtProvider = ({ children }) => {
  // 1. Initialize State with localStorage cache or fallback
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : defaultProducts;
    } catch {
      return defaultProducts;
    }
  });

  const [depositoRates, setDepositoRates] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RATES);
      return saved ? JSON.parse(saved) : defaultRates;
    } catch {
      return defaultRates;
    }
  });

  const [testimonials, setTestimonials] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      return saved ? JSON.parse(saved) : defaultTestimonials;
    } catch {
      return defaultTestimonials;
    }
  });

  const [institutionInfo, setInstitutionInfo] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INSTITUTION);
      return saved ? JSON.parse(saved) : defaultInstitution;
    } catch {
      return defaultInstitution;
    }
  });

  const [branches, setBranches] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BRANCHES);
      return saved ? JSON.parse(saved) : defaultBranches;
    } catch {
      return defaultBranches;
    }
  });

  // 2. Persist to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RATES, JSON.stringify(depositoRates));
    } catch (e) {
      console.error(e);
    }
  }, [depositoRates]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
    } catch (e) {
      console.error(e);
    }
  }, [testimonials]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INSTITUTION, JSON.stringify(institutionInfo));
    } catch (e) {
      console.error(e);
    }
  }, [institutionInfo]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BRANCHES, JSON.stringify(branches));
    } catch (e) {
      console.error(e);
    }
  }, [branches]);

  // 3. Sync all 5 entities from Supabase on mount if connected
  useEffect(() => {
    if (!supabase) return;

    const syncFromSupabase = async () => {
      try {
        const [prodRes, rateRes, testiRes, infoRes, branchRes] = await Promise.all([
          supabase.from('products').select('*').order('sort_order', { ascending: true }),
          supabase.from('deposito_rates').select('*').order('tenor_months', { ascending: true }),
          supabase.from('testimonials').select('*').order('sort_order', { ascending: true }),
          supabase.from('institution_info').select('*').eq('id', 'main').maybeSingle(),
          supabase.from('branches').select('*').order('sort_order', { ascending: true }),
        ]);

        if (!prodRes.error && prodRes.data?.length > 0) {
          setProducts(prodRes.data);
        }
        if (!rateRes.error && rateRes.data?.length > 0) {
          setDepositoRates(rateRes.data);
        }
        if (!testiRes.error && testiRes.data?.length > 0) {
          setTestimonials(testiRes.data);
        }
        if (!infoRes.error && infoRes.data) {
          setInstitutionInfo(mapInstitutionFromDb(infoRes.data));
        }
        if (!branchRes.error && branchRes.data?.length > 0) {
          setBranches(branchRes.data.map(mapBranchFromDb));
        }
      } catch (err) {
        console.warn('Syncing from Supabase encountered error, kept cached data:', err);
      }
    };

    syncFromSupabase();
  }, []);

  // 4. Mutation Handlers for CMS
  // Products
  const addProduct = async (newProduct) => {
    const item = {
      ...newProduct,
      id: generateUuid(),
      sort_order: products.length + 1,
      is_active: newProduct.is_active !== undefined ? newProduct.is_active : true,
    };
    setProducts((prev) => [...prev, item]);

    if (supabase) {
      const { error } = await supabase.from('products').insert([item]);
      if (error) console.warn('Failed to insert product into Supabase:', error.message);
    }
    return item;
  };

  const updateProduct = async (id, updatedFields) => {
    const target = products.find((p) => p.id === id || p.code === id);
    setProducts((prev) =>
      prev.map((p) => (p.id === id || p.code === id ? { ...p, ...updatedFields } : p))
    );

    if (supabase) {
      const query = supabase.from('products').update(updatedFields);
      const { error } = target?.code
        ? await query.eq('code', target.code)
        : await query.eq('id', id);
      if (error) console.warn('Failed to update product in Supabase:', error.message);
    }
  };

  const deleteProduct = async (id) => {
    const target = products.find((p) => p.id === id || p.code === id);
    setProducts((prev) => prev.filter((p) => p.id !== id && p.code !== id));

    if (supabase) {
      const query = supabase.from('products').delete();
      const { error } = target?.code
        ? await query.eq('code', target.code)
        : await query.eq('id', id);
      if (error) console.warn('Failed to delete product in Supabase:', error.message);
    }
  };

  // Deposito Rates
  const updateDepositoRate = async (tenorMonths, updatedFields) => {
    setDepositoRates((prev) =>
      prev.map((r) =>
        Number(r.tenor_months) === Number(tenorMonths) ? { ...r, ...updatedFields } : r
      )
    );

    if (supabase) {
      const { error } = await supabase
        .from('deposito_rates')
        .update(updatedFields)
        .eq('tenor_months', tenorMonths);
      if (error) console.warn('Failed to update deposito rate in Supabase:', error.message);
    }
  };

  // Testimonials
  const addTestimonial = async (newTesti) => {
    const item = {
      ...newTesti,
      id: generateUuid(),
      sort_order: testimonials.length + 1,
    };
    setTestimonials((prev) => [...prev, item]);

    if (supabase) {
      const { error } = await supabase.from('testimonials').insert([item]);
      if (error) console.warn('Failed to insert testimonial into Supabase:', error.message);
    }
    return item;
  };

  const updateTestimonial = async (id, updatedFields) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedFields } : t))
    );

    if (supabase) {
      const { error } = await supabase.from('testimonials').update(updatedFields).eq('id', id);
      if (error) console.warn('Failed to update testimonial in Supabase:', error.message);
    }
  };

  const deleteTestimonial = async (id) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));

    if (supabase) {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) console.warn('Failed to delete testimonial in Supabase:', error.message);
    }
  };

  // Profile & Branches
  const updateInstitutionInfo = async (updatedFields) => {
    const merged = { ...institutionInfo, ...updatedFields };
    setInstitutionInfo(merged);

    if (supabase) {
      const { error } = await supabase
        .from('institution_info')
        .upsert(mapInstitutionToDb(merged), { onConflict: 'id' });
      if (error) console.warn('Failed to upsert institution_info in Supabase:', error.message);
    }
  };

  const updateBranch = async (branchId, updatedFields) => {
    let updatedBranchObj = null;
    let branchIdx = 0;

    setBranches((prev) =>
      prev.map((b, idx) => {
        if (b.id === branchId) {
          branchIdx = idx;
          updatedBranchObj = { ...b, ...updatedFields };
          return updatedBranchObj;
        }
        return b;
      })
    );

    if (supabase && updatedBranchObj) {
      const { error } = await supabase
        .from('branches')
        .upsert(mapBranchToDb(updatedBranchObj, branchIdx), { onConflict: 'id' });
      if (error) console.warn('Failed to upsert branch in Supabase:', error.message);
    }
  };

  // Reset all to default official data
  const resetToDefaults = async () => {
    setProducts(defaultProducts);
    setDepositoRates(defaultRates);
    setTestimonials(defaultTestimonials);
    setInstitutionInfo(defaultInstitution);
    setBranches(defaultBranches);

    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.RATES);
    localStorage.removeItem(STORAGE_KEYS.TESTIMONIALS);
    localStorage.removeItem(STORAGE_KEYS.INSTITUTION);
    localStorage.removeItem(STORAGE_KEYS.BRANCHES);

    if (supabase) {
      try {
        await Promise.all([
          supabase
            .from('institution_info')
            .upsert(mapInstitutionToDb(defaultInstitution), { onConflict: 'id' }),
          supabase
            .from('branches')
            .upsert(defaultBranches.map((b, i) => mapBranchToDb(b, i)), { onConflict: 'id' }),
        ]);
      } catch (e) {
        console.warn('Failed to reset Supabase profile/branches:', e);
      }
    }
  };

  return (
    <BmtContext.Provider
      value={{
        products,
        depositoRates,
        testimonials,
        institutionInfo,
        branches,
        // Handlers
        addProduct,
        updateProduct,
        deleteProduct,
        updateDepositoRate,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        updateInstitutionInfo,
        updateBranch,
        resetToDefaults,
      }}
    >
      {children}
    </BmtContext.Provider>
  );
};

export const useBmt = () => {
  const context = useContext(BmtContext);
  if (!context) {
    throw new Error('useBmt must be used within a BmtProvider');
  }
  return context;
};

export default BmtContext;
