'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Sử dụng bộ điều hướng của Next.js App Router
import {
  getAllDotTangLuong,
  getDotTangLuongById,
  createDotTangLuong,
  updateDotTangLuong,
  deleteDotTangLuong,
  DotTangLuong,
} from '@/service/DotTangLuong.api';

export default function QuanLyDotTangLuong() {
  const router = useRouter();
  const [danhSach, setDanhSach] = useState<DotTangLuong[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // State phục vụ cho Modal (Tạo mới / Chỉnh sửa)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    TenDot: '',
    MoTa: '',
    TrangThai: 'Chưa bắt đầu',
  });

  // 1. Tải danh sách đợt tăng lương khi vào trang
  const fetchDanhSach = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllDotTangLuong();

      // SỬA TẠI ĐÂY: Chỉ lấy những đợt tăng lương đã bắt đầu (Đang diễn ra hoặc Đã kết thúc)
      const dotDaBatDau = data.filter(
        (item) =>
          item.TrangThai === 'Đang diễn ra' || item.TrangThai === 'Đã kết thúc',
      );

      setDanhSach(dotDaBatDau);
    } catch (err) {
      setError('Không thể tải danh sách đợt tăng lương. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDanhSach();
  }, []);

  // 2. Xử lý mở modal Thêm mới
  const handleOpenCreateModal = () => {
    setIsEditing(false);
    setFormData({ TenDot: '', MoTa: '', TrangThai: 'Chưa bắt đầu' });
    setIsOpenModal(true);
  };

  // 3. Xử lý mở modal Chỉnh sửa
  const handleOpenEditModal = async (id: number) => {
    setIsEditing(true);
    setSelectedId(id);
    try {
      const data: DotTangLuong = await getDotTangLuongById(id);
      setFormData({
        TenDot: data.TenDot,
        MoTa: data.MoTa,
        TrangThai: data.TrangThai,
      });
      setIsOpenModal(true);
    } catch (err) {
      alert('Không thể lấy thông tin chi tiết đợt tăng lương này.');
    }
  };

  // 4. Xử lý Lưu dữ liệu (Cả Tạo mới và Cập nhật)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && selectedId !== null) {
        await updateDotTangLuong(selectedId, formData);
      } else {
        await createDotTangLuong(formData);
      }
      setIsOpenModal(false);
      fetchDanhSach();
    } catch (err) {
      alert('Đã xảy ra lỗi khi lưu thông tin.');
    }
  };

  // 5. Xử lý Xóa đợt tăng lương
  const handleDelete = async (id: number) => {
    if (
      window.confirm(
        'Giám đốc có chắc chắn muốn xóa đợt tăng lương này không? Phải đảm bảo không còn đề xuất nào thuộc đợt này.',
      )
    ) {
      try {
        await deleteDotTangLuong(id);
        fetchDanhSach();
      } catch (err) {
        alert(
          'Không thể xóa đợt tăng lương này. Vui lòng kiểm tra lại dữ liệu liên kết.',
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 p-6 md:p-8 text-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Banner Header Luxury */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                Hệ thống quản trị chiến lược
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Quản Lý Đợt Tăng Lương
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Khu vực kiểm soát phê duyệt, thiết lập chu kỳ điều chỉnh thu nhập
              nhân sự dành cho Giám Đốc.
            </p>
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="inline-flex items-center justify-center bg-slate-900 hover:bg-blue-600 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Tạo Đợt Tăng Lương Mới
          </button>
        </div>

        {/* Trạng thái Loading / Error */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-medium">
              Đang tải danh sách đợt chiến lược...
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center text-red-600 text-sm font-semibold mb-6">
            {error}
          </div>
        )}

        {/* Giao diện chính dạng Grid Card */}
        {!loading && !error && (
          <>
            {danhSach.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-16 text-center">
                <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-slate-700">
                  Chưa có đợt tăng lương nào được kích hoạt
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  Hiện tại không có chiến dịch tăng lương nào ở trạng thái Đang
                  diễn ra hoặc Đã kết thúc.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {danhSach.map((item) => (
                  <div
                    key={item.MaDotTL}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200/80 transition-all duration-200 p-6 flex flex-col justify-between group relative overflow-hidden"
                  >
                    <div>
                      {/* Badge Top Card */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                          MÃ #{item.MaDotTL}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 ${
                            item.TrangThai === 'Đang diễn ra'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              item.TrangThai === 'Đang diễn ra'
                                ? 'bg-emerald-500'
                                : 'bg-slate-400'
                            }`}
                          ></span>
                          {item.TrangThai}
                        </span>
                      </div>

                      {/* Tiêu đề & Mô tả */}
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-150 line-clamp-1 mb-2">
                        {item.TenDot}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 min-h-[32px] leading-relaxed mb-4">
                        {item.MoTa ||
                          'Không có mô tả chi tiết được bổ sung cho chiến dịch tăng lương này.'}
                      </p>

                      {/* Thông tin ngày khởi tạo */}
                      <div className="flex items-center text-xs text-slate-400 gap-1.5 mb-5 pb-4 border-b border-slate-50">
                        <svg
                          className="w-4 h-4 text-slate-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>
                          Ngày khởi tạo:{' '}
                          {new Date(item.NgayTao).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                    </div>

                    {/* Footer nhóm hành động */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          router.push(
                            `/Manager/DeXuatTangLuong/${item.MaDotTL}`,
                          )
                        }
                        className="flex-1 inline-flex items-center justify-center bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all duration-150 gap-1"
                      >
                        Xem chi tiết & Duyệt
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* MODAL PHỤC VỤ (TẠO MỚI / SỬA ĐỢT) */}
        {isOpenModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900">
                  {isEditing
                    ? 'Cập Nhật Đợt Tăng Lương'
                    : 'Khởi Tạo Đợt Tăng Lương'}
                </h2>
                <button
                  onClick={() => setIsOpenModal(false)}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Tên Đợt Chiến Lược *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.TenDot}
                    onChange={(e) =>
                      setFormData({ ...formData, TenDot: e.target.value })
                    }
                    className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="Ví dụ: Tăng lương định kỳ Toàn bộ Công ty Quý II"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Mô Tả Mục Tiêu
                  </label>
                  <textarea
                    value={formData.MoTa}
                    onChange={(e) =>
                      setFormData({ ...formData, MoTa: e.target.value })
                    }
                    className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    rows={3}
                    placeholder="Bổ sung mục tiêu, ngân sách tối đa dự kiến của đợt này..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Trạng Thái Vận Hành
                  </label>
                  <select
                    value={formData.TrangThai}
                    onChange={(e) =>
                      setFormData({ ...formData, TrangThai: e.target.value })
                    }
                    className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  >
                    <option value="Chưa bắt đầu">Chưa bắt đầu</option>
                    <option value="Đang diễn ra">Đang diễn ra</option>
                    <option value="Đã kết thúc">Đã kết thúc</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-2 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsOpenModal(false)}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition"
                  >
                    {isEditing ? 'Cập Nhật Đợt' : 'Kích Hoạt Tạo'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
