// ================================
// KINH NGHIEM LAM VIEC API
// ================================

import api from '../api';

export interface KinhNghiemLamViec {
  MaKN?: number;

  MaNV?: string;

  TenCongTy?: string;

  ViTriCongViec?: string;

  NgayBatDau?: string;

  NgayKetThuc?: string;

  MoTaCongViec?: string;

  CongNgheSuDung?: string;
}

// ================================
// GET ALL
// ================================
export const getAllKinhNghiemLamViec = async () => {
  const response = await api.get('/kinh-nghiem-lam-viec');

  return response.data;
};

// ================================
// GET BY ID
// ================================
export const getKinhNghiemLamViecById = async (id: number) => {
  const response = await api.get(`/kinh-nghiem-lam-viec/${id}`);

  return response.data;
};
export const getKinhNghiemLamViecByMaNV = async (id: string) => {
  const response = await api.get(`/kinh-nghiem-lam-viec/ma-nv/${id}`);

  return response.data;
};

// ================================
// CREATE
// ================================
export const createKinhNghiemLamViec = async (data: KinhNghiemLamViec) => {
  const response = await api.post('/kinh-nghiem-lam-viec/ma-nv/', data);

  return response.data;
};

// ================================
// UPDATE
// ================================
export const updateKinhNghiemLamViec = async (
  id: number,
  data: KinhNghiemLamViec,
) => {
  const response = await api.put(`/kinh-nghiem-lam-viec/${id}`, data);

  return response.data;
};

// ================================
// DELETE
// ================================
export const deleteKinhNghiemLamViec = async (id: number) => {
  const response = await api.delete(`/kinh-nghiem-lam-viec/${id}`);

  return response.data;
};
