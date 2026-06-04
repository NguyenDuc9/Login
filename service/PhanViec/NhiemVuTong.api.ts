import api from '../api';

export interface NhiemVuTong {
  MaNVT?: number;
  TieuDe: string;
  MoTa?: string;
  MaPhongBan?: string;
  NgayGiao?: string;
  Deadline?: string;
  TrangThai?: string;
  MaGiamDoc?: string;
}

// =======================
// LẤY TẤT CẢ
// =======================
export const getAllNhiemVuTong = async () => {
  const response = await api.get('/nhiem-vu-tong');
  return response.data;
};

// =======================
// LẤY THEO ID
// =======================
export const getNhiemVuTongById = async (id: number) => {
  const response = await api.get(`/nhiem-vu-tong/${id}`);
  return response.data;
};
export const getNhiemVuTongByPhongBan = async (MaNV: string) => {
  const response = await api.get(`/nhiem-vu-tong/phong-ban/${MaNV}`);
  return response.data;
};
// =======================
// THÊM
// =======================
export const createNhiemVuTong = async (data: NhiemVuTong) => {
  const response = await api.post('/nhiem-vu-tong', data);

  return response.data;
};

// =======================
// CẬP NHẬT
// =======================
export const updateNhiemVuTong = async (id: number, data: NhiemVuTong) => {
  const response = await api.put(`/nhiem-vu-tong/${id}`, data);

  return response.data;
};
export const updateTrangThaiNhiemVuTong = async (
  id: number,
  data: NhiemVuTong,
) => {
  const response = await api.patch(`/nhiem-vu-tong/${id}/trang-thai`, data);

  return response.data;
};

// =======================
// XÓA
// =======================
export const deleteNhiemVuTong = async (id: number) => {
  const response = await api.delete(`/nhiem-vu-tong/${id}`);

  return response.data;
};
