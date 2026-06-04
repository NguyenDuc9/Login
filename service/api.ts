import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Cấu hình Request Interceptor để tự động đính kèm Token theo quyền hạn
api.interceptors.request.use(
  (config) => {
    // Kiểm tra xem mã có đang chạy ở môi trường client (trình duyệt) hay không
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname.toLowerCase();
      let roleKey = '';

      // Xác định role dựa trên đường dẫn URL hiện tại
      if (pathname.startsWith('/admin')) {
        roleKey = 'admin';
      } else if (pathname.startsWith('/manager')) {
        roleKey = 'manager';
      } else if (pathname.startsWith('/staff')) {
        roleKey = 'staff';
      } else if (pathname.startsWith('/department_head')) {
        roleKey = 'department_head';
      }

      // Nếu tìm thấy role tương thích, lấy token tương ứng từ localStorage
      if (roleKey) {
        const token = localStorage.getItem(`${roleKey}_accessToken`);

        if (token) {
          // Gắn token vào header Authorization theo chuẩn Bearer
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
