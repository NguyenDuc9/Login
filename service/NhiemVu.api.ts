import api from './api';

export interface NhiemVu {
  MaNhiemVu?: number;
  TieuDe: string;
  MoTa?: string;
  MaPhongBan?: string;
  NgayGiao?: string;
  Deadline?: string;
  TrangThai?: string;
  MaGiamDoc?: string;
}

// Lấy tất cả
export const getAllNhiemVu = async () => {
  const response = await api.get('/nhiem-vu');
  return response.data;
};

// Lấy theo ID
export const getNhiemVuById = async (id: number) => {
  const response = await api.get(`/nhiem-vu/${id}`);
  return response.data;
};

// Thêm
export const createNhiemVu = async (data: NhiemVu) => {
  const response = await api.post('/nhiem-vu', data);
  return response.data;
};

// Sửa
export const updateNhiemVu = async (id: number, data: NhiemVu) => {
  const response = await api.put(`/nhiem-vu/${id}`, data);
  return response.data;
};

// Xóa
export const deleteNhiemVu = async (id: number) => {
  const response = await api.delete(`/nhiem-vu/${id}`);
  return response.data;
};
