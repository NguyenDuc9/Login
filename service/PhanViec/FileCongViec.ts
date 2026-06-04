// ================================
// FILE CONG VIEC API
// ================================

import api from '../api';

export interface FileCongViec {
  MaFile?: number;

  MaGV?: number;

  TenFile?: string;

  DuongDanFile?: string;

  NgayTaiLen?: string;
}

// CRUD
export const getAllFileCongViec = async () => {
  const response = await api.get('/file-cong-viec');

  return response.data;
};

export const getFileCongViecById = async (id: number) => {
  const response = await api.get(`/file-cong-viec/${id}`);

  return response.data;
};

export const createFileCongViec = async (data: FileCongViec) => {
  const response = await api.post('/file-cong-viec', data);

  return response.data;
};

export const updateFileCongViec = async (id: number, data: FileCongViec) => {
  const response = await api.put(`/file-cong-viec/${id}`, data);

  return response.data;
};

export const deleteFileCongViec = async (id: number) => {
  const response = await api.delete(`/file-cong-viec/${id}`);

  return response.data;
};
