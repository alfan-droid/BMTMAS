import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Public Layout & Primary Entry Page
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import RequireAuth from '../components/admin/RequireAuth';

// Lazy-loaded Public Pages
const ProdukPage = lazy(() => import('../pages/ProdukPage'));
const DepositoPage = lazy(() => import('../pages/DepositoPage'));

// Lazy-loaded Admin CMS Layout & Pages
const AdminLayout = lazy(() => import('../layouts/AdminLayout'));
const AdminLogin = lazy(() => import('../pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const AdminProduk = lazy(() => import('../pages/admin/AdminProduk'));
const AdminDeposito = lazy(() => import('../pages/admin/AdminDeposito'));
const AdminTestimoni = lazy(() => import('../pages/admin/AdminTestimoni'));
const AdminProfil = lazy(() => import('../pages/admin/AdminProfil'));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-3 border-emerald-200 border-t-[#004D4A] animate-spin" />
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* 1. Public Routes with MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="produk" element={<ProdukPage />} />
          <Route path="deposito" element={<DepositoPage />} />
        </Route>

        {/* 2. Admin Login Route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* 3. Protected CMS Admin Routes */}
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="produk" element={<AdminProduk />} />
          <Route path="deposito" element={<AdminDeposito />} />
          <Route path="testimoni" element={<AdminTestimoni />} />
          <Route path="profil" element={<AdminProfil />} />
        </Route>

        {/* 4. Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
