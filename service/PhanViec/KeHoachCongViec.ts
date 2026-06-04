// ================================
// KE HOACH CONG VIEC API
// ================================

import api from '../api';

export interface KeHoachCongViec {
  MaKH?: number;
  MaNVT?: number;

  TenCongViec: string;
  MoTa?: string;

  Deadline?: string;

  MucDo?: string;

  TrangThai?: string;

  MaTruongPhong?: string;
  LiDoTuChoi?: string;
}

// Lấy tất cả
export const getAllKeHoachCongViec = async () => {
  const response = await api.get('/ke-hoach');
  return response.data;
};

// Lấy theo ID
export const getKeHoachCongViecById = async (id: number) => {
  const response = await api.get(`/ke-hoach/${id}`);

  return response.data;
};

// Lấy theo ID Nhiệm vụ tổng
export const getKeHoachCongViecByMaNVT = async (id: number) => {
  const response = await api.get(`/ke-hoach/nvt/${id}`);

  return response.data;
};

// Thêm
export const createKeHoachCongViec = async (data: KeHoachCongViec) => {
  const response = await api.post('/ke-hoach', data);

  return response.data;
};

// Sửa
export const updateKeHoachCongViec = async (
  id: number,
  data: KeHoachCongViec,
) => {
  const response = await api.put(`/ke-hoach/${id}`, data);

  return response.data;
};

// Xóa
export const deleteKeHoachCongViec = async (id: number) => {
  const response = await api.delete(`/ke-hoach/${id}`);

  return response.data;
};
