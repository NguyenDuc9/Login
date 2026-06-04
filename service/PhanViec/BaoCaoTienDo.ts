// ================================
// BAO CAO TIEN DO API
// ================================

import api from '../api';

export interface BaoCaoTienDo {
  MaBaoCao?: number;

  MaGV?: number;

  NoiDung?: string;

  PhanTramHoanThanh?: number;

  FileBaoCao?: string;

  NgayBaoCao?: string;
}

// CRUD
export const getAllBaoCaoTienDo = async () => {
  const response = await api.get('/bao-cao-tien-do');

  return response.data;
};

export const getBaoCaoTienDoById = async (id: number) => {
  const response = await api.get(`/bao-cao-tien-do/${id}`);

  return response.data;
};

export const createBaoCaoTienDo = async (data: BaoCaoTienDo) => {
  const response = await api.post('/bao-cao-tien-do', data);

  return response.data;
};

export const updateBaoCaoTienDo = async (id: number, data: BaoCaoTienDo) => {
  const response = await api.put(`/bao-cao-tien-do/${id}`, data);

  return response.data;
};

export const deleteBaoCaoTienDo = async (id: number) => {
  const response = await api.delete(`/bao-cao-tien-do/${id}`);

  return response.data;
};
export const GiaoViecNhanVienByMaNVvaMaKH = async (
  MaNV: string,
  MaKH: number,
) => {
  const response = await api.get(
    `/giao-viec-nhan-vien/nhan-vien/${MaNV}/${MaKH}`,
  );

  return response.data;
};
