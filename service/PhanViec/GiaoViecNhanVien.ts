// ================================
// GIAO VIEC NHAN VIEN API
// ================================

import api from '../api';

export interface GiaoViecNhanVien {
  MaGV?: number;

  MaKH?: number;

  MaNV?: string;

  NgayGiao?: string;

  Deadline?: string;

  TrangThai?: string;

  PhanTramHoanThanh?: number;
}

// Lấy tất cả
export const getAllGiaoViecNhanVien = async () => {
  const response = await api.get('/giao-viec-nhan-vien');

  return response.data;
};

// Lấy theo ID
export const getGiaoViecNhanVienById = async (id: number) => {
  const response = await api.get(`/giao-viec-nhan-vien/${id}`);

  return response.data;
};

// Lấy theo MaKH (Mã kế hoạch)
export const getGiaoViecNhanVienByMaKH = async (maKH: number) => {
  try {
    const response = await api.get(`/giao-viec-nhan-vien?maKH=${maKH}`);
    // Nếu backend trả về mảng rỗng hoặc không phải mảng, thử cách khác
    if (
      !response.data ||
      !Array.isArray(response.data) ||
      response.data.length === 0
    ) {
      // Fallback: lấy tất cả rồi filter ở client
      const allResponse = await api.get('/giao-viec-nhan-vien');
      if (Array.isArray(allResponse.data)) {
        return allResponse.data.filter(
          (item: GiaoViecNhanVien) => item.MaKH === maKH,
        );
      }
      return [];
    }
    return response.data;
  } catch (error) {
    // Fallback: lấy tất cả rồi filter ở client
    try {
      const allResponse = await api.get('/giao-viec-nhan-vien');
      if (Array.isArray(allResponse.data)) {
        return allResponse.data.filter(
          (item: GiaoViecNhanVien) => item.MaKH === maKH,
        );
      }
    } catch {
      // Ignore error
    }
    return [];
  }
};

export const GiaoViecNhanVienByMaNV = async (id: string) => {
  const response = await api.get(`/giao-viec-nhan-vien/nhan-vien/${id}`);

  return response.data;
};

// Thêm
export const createGiaoViecNhanVien = async (data: GiaoViecNhanVien) => {
  const response = await api.post('/giao-viec-nhan-vien', data);

  return response.data;
};

// Sửa
export const updateGiaoViecNhanVien = async (
  id: number,
  data: GiaoViecNhanVien,
) => {
  const response = await api.put(`/giao-viec-nhan-vien/${id}`, data);

  return response.data;
};

// Xóa
export const deleteGiaoViecNhanVien = async (id: number) => {
  const response = await api.delete(`/giao-viec-nhan-vien/${id}`);

  return response.data;
};
