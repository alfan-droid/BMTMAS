import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Public Layout & Pages
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import ProdukPage from '../pages/ProdukPage';
import DepositoPage from '../pages/DepositoPage';

// Admin CMS Layout & Pages
import AdminLayout from '../layouts/AdminLayout';
import RequireAuth from '../components/admin/RequireAuth';
import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminProduk from '../pages/admin/AdminProduk';
import AdminDeposito from '../pages/admin/AdminDeposito';
import AdminTestimoni from '../pages/admin/AdminTestimoni';
import AdminProfil from '../pages/admin/AdminProfil';

export default function AppRoutes() {
  return (
    <Routes>
      {/* 1. Public Routes with MainLayout */}
      <Route path="/" element={<MainLayout />}>
        {/* Beranda hanya berisi "beranda", "tentang kami", dan "lokasi" */}
        <Route index element={<Home />} />
        {/* Halaman Khusus Produk Simpanan */}
        <Route path="produk" element={<ProdukPage />} />
        {/* Halaman Khusus Simpanan Berjangka */}
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
  );
}
