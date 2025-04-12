'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';

const ProfilePage = () => {
  const API = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

  const [user, setUser] = useState({ name: '', email: '' });
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API}/api/user`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      setUser(res.data);
      setForm({ ...res.data, password: '', password_confirmation: '' });
    } catch (error) {
      toast.error('Gagal memuat data profil');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`${API}/api/user`, form, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      setUser(res.data);
      toast.success('Profil berhasil diperbarui');
      setEditMode(false);
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Gagal memperbarui profil';
      toast.error(msg);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);


  return (
    <>
    <Navbar />
    
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4 flex justify-center items-center">
    <div className="w-full max-w-xl bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Profil Saya</h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300 block mb-1">Nama</label>
          <input
            type="text"
            disabled={!editMode}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 outline-none transition 
              ${!editMode ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed' : 'focus:ring-blue-500'}`}
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300 block mb-1">Email</label>
          <input
            type="email"
            disabled={!editMode}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 outline-none transition 
              ${!editMode ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed' : 'focus:ring-blue-500'}`}
          />
        </div>

        {editMode && (
          <>
            <div>
              <label className="text-sm text-gray-700 dark:text-gray-300 block mb-1">Password Baru</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Kosongkan jika tidak diganti"
                className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 dark:text-gray-300 block mb-1">Konfirmasi Password</label>
              <input
                type="password"
                value={form.password_confirmation}
                onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
                placeholder="Ulangi password baru"
                className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>
          </>
        )}
      </div>

      <div className="flex justify-between mt-6">
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:opacity-90 transition"
          >
            Edit Profil
          </button>
        ) : (
          <>
            <button
              onClick={handleUpdate}
              className="w-1/2 mr-2 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:opacity-90 transition"
            >
              Simpan
            </button>
            <button
              onClick={() => {
                setEditMode(false);
                setForm({ ...user, password: '', password_confirmation: '' });
              }}
              className="w-1/2 ml-2 py-3 bg-gray-500 text-white font-semibold rounded-xl shadow-md hover:bg-gray-600 transition"
            >
              Batal
            </button>
          </>
        )}
      </div>
    </div>
  </div></>
    
  );
};

export default ProfilePage;