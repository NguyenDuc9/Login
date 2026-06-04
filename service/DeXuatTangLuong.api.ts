import api from './api';

export interface DeXuatTangLuong {
  MaDeXuat: number;
  MaDotTL: number;
  MaNV: string;
  HeSoTang: number;
  LyDo: string;
  NgayDeXuat: string;
  TrangThai: string;
  NgayDuyet: string | null;
}

export const getAllDeXuatTangLuong = async () => {
  const response = await api.get('/de-xuat-tang-luong');
  return response.data;
};

export const getDeXuatTangLuongById = async (id: number) => {
  const response = await api.get(`/de-xuat-tang-luong/${id}`);
  return response.data;
};

export const getDeXuatByDotTL = async (MaDotTL: number) => {
  const response = await api.get(`/de-xuat-tang-luong/dot/${MaDotTL}`);
  return response.data;
};

export const createDeXuatTangLuong = async (
  data: Omit<DeXuatTangLuong, 'MaDeXuat' | 'NgayDeXuat' | 'NgayDuyet'>,
) => {
  const response = await api.post('/de-xuat-tang-luong', data);
  return response.data;
};

export const updateDeXuatTangLuong = async (
  id: number,
  data: Partial<DeXuatTangLuong>,
) => {
  const response = await api.put(`/de-xuat-tang-luong/${id}`, data);

  return response.data;
};

export const deleteDeXuatTangLuong = async (id: number) => {
  const response = await api.delete(`/de-xuat-tang-luong/${id}`);

  return response.data;
};
