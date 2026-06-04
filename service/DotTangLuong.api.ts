import api from './api';

export interface DotTangLuong {
  MaDotTL: number;
  TenDot: string;
  NgayTao: string;
  MoTa: string;
  TrangThai: string;
}

export const getAllDotTangLuong = async () => {
  const response = await api.get('/dot-tang-luong');
  return response.data;
};

export const getDotTangLuongById = async (id: number) => {
  const response = await api.get(`/dot-tang-luong/${id}`);
  return response.data;
};

export const createDotTangLuong = async (
  data: Omit<DotTangLuong, 'MaDotTL' | 'NgayTao'>,
) => {
  const response = await api.post('/dot-tang-luong', data);
  return response.data;
};

export const updateDotTangLuong = async (
  id: number,
  data: Partial<DotTangLuong>,
) => {
  const response = await api.put(`/dot-tang-luong/${id}`, data);
  return response.data;
};

export const deleteDotTangLuong = async (id: number) => {
  const response = await api.delete(`/dot-tang-luong/${id}`);
  return response.data;
};
