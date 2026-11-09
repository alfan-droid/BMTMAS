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

  // 3. Sync from Supabase on mount if Supabase is connected
  useEffect(() => {
    if (!supabase) return;

    const syncFromSupabase = async () => {
      try {
        const [prodRes, rateRes, testiRes] = await Promise.all([
          supabase.from('products').select('*').order('sort_order', { ascending: true }),
          supabase.from('deposito_rates').select('*').order('tenor_months', { ascending: true }),
          supabase.from('testimonials').select('*').order('sort_order', { ascending: true }),
        ]);

        if (!prodRes.error && prodRes.data && prodRes.data.length > 0) {
          setProducts(prodRes.data);
        }
        if (!rateRes.error && rateRes.data && rateRes.data.length > 0) {
          setDepositoRates(rateRes.data);
        }
        if (!testiRes.error && testiRes.data && testiRes.data.length > 0) {
          setTestimonials(testiRes.data);
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
      id: newProduct.id || `prod-${Date.now()}`,
      sort_order: products.length + 1,
      is_active: newProduct.is_active !== undefined ? newProduct.is_active : true,
    };
    setProducts((prev) => [...prev, item]);

    if (supabase) {
      try {
        await supabase.from('products').insert([item]);
      } catch (e) {
        console.warn('Failed to insert into Supabase:', e);
      }
    }
    return item;
  };

  const updateProduct = async (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id || p.code === id ? { ...p, ...updatedFields } : p))
    );

    if (supabase) {
      try {
        await supabase
          .from('products')
          .update(updatedFields)
          .or(`id.eq.${id},code.eq.${id}`);
      } catch (e) {
        console.warn('Failed to update in Supabase:', e);
      }
    }
  };

  const deleteProduct = async (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id && p.code !== id));

    if (supabase) {
      try {
        await supabase
          .from('products')
          .delete()
          .or(`id.eq.${id},code.eq.${id}`);
      } catch (e) {
        console.warn('Failed to delete in Supabase:', e);
      }
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
      try {
        await supabase
          .from('deposito_rates')
          .update(updatedFields)
          .eq('tenor_months', tenorMonths);
      } catch (e) {
        console.warn('Failed to update deposito rate in Supabase:', e);
      }
    }
  };

  // Testimonials
  const addTestimonial = async (newTesti) => {
    const item = {
      ...newTesti,
      id: newTesti.id || `testi-${Date.now()}`,
      sort_order: testimonials.length + 1,
    };
    setTestimonials((prev) => [...prev, item]);

    if (supabase) {
      try {
        await supabase.from('testimonials').insert([item]);
      } catch (e) {
        console.warn('Failed to insert testimonial into Supabase:', e);
      }
    }
    return item;
  };

  const updateTestimonial = async (id, updatedFields) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedFields } : t))
    );

    if (supabase) {
      try {
        await supabase.from('testimonials').update(updatedFields).eq('id', id);
      } catch (e) {
        console.warn('Failed to update testimonial in Supabase:', e);
      }
    }
  };

  const deleteTestimonial = async (id) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));

    if (supabase) {
      try {
        await supabase.from('testimonials').delete().eq('id', id);
      } catch (e) {
        console.warn('Failed to delete testimonial in Supabase:', e);
      }
    }
  };

  // Profile & Branches
  const updateInstitutionInfo = (updatedFields) => {
    setInstitutionInfo((prev) => ({ ...prev, ...updatedFields }));
  };

  const updateBranch = (branchId, updatedFields) => {
    setBranches((prev) =>
      prev.map((b) => (b.id === branchId ? { ...b, ...updatedFields } : b))
    );
  };

  // Reset all to default official data
  const resetToDefaults = () => {
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
