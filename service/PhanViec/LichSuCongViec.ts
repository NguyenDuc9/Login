// ================================
// LICH SU CONG VIEC API
// ================================

import api from '../api';

export interface LichSuCongViec {
  MaLS?: number;

  MaGV?: number;

  HanhDong?: string;

  NoiDung?: string;

  ThoiGian?: string;

  MaNV?: string;
}

// CRUD
export const getAllLichSuCongViec = async () => {
  const response = await api.get('/lich-su-cong-viec');

  return response.data;
};

export const getLichSuCongViecById = async (id: number) => {
  const response = await api.get(`/lich-su-cong-viec/${id}`);

  return response.data;
};

export const createLichSuCongViec = async (data: LichSuCongViec) => {
  const response = await api.post('/lich-su-cong-viec', data);

  return response.data;
};

export const updateLichSuCongViec = async (
  id: number,
  data: LichSuCongViec,
) => {
  const response = await api.put(`/lich-su-cong-viec/${id}`, data);

  return response.data;
};

export const deleteLichSuCongViec = async (id: number) => {
  const response = await api.delete(`/lich-su-cong-viec/${id}`);

  return response.data;
};
