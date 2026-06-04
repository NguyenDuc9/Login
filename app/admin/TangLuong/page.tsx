'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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

  // State quản lý Modal
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Form State ban đầu cho trường hợp Tạo mới
  const [formData, setFormData] = useState({
    TenDot: '',
    MoTa: '',
    TrangThai: 'Chưa bắt đầu',
  });

  const fetchDanhSach = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllDotTangLuong();
      setDanhSach(data);
    } catch (err) {
      setError('Không thể tải danh sách đợt tăng lương. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDanhSach();
  }, []);

  const handleOpenCreateModal = () => {
    setIsEditing(false);
    setFormData({ TenDot: '', MoTa: '', TrangThai: 'Chưa bắt đầu' });
    setSelectedId(null);
    setIsOpenModal(true);
  };

  const handleOpenEditModal = async (id: number) => {
    setSelectedId(id);
    setIsEditing(true);
    try {
      const data: DotTangLuong = await getDotTangLuongById(id);
      setFormData({
        TenDot: data.TenDot || '',
        MoTa: data.MoTa || '',
        TrangThai: data.TrangThai || 'Chưa bắt đầu',
      });
      setIsOpenModal(true);
    } catch (err) {
      alert('Không thể lấy thông tin chi tiết đợt tăng lương.');
    }
  };

  // NÚT ĐIỀU CHỈNH TRẠNG THÁI NHANH (Gọi thẳng API Update)
  const handleQuickUpdateStatus = async (item: DotTangLuong) => {
    const statusOrder = ['Chưa bắt đầu', 'Đang diễn ra', 'Đã kết thúc'];
    const currentIndex = statusOrder.indexOf(item.TrangThai);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    const nextStatus = statusOrder[nextIndex];

    if (
      window.confirm(
        `Giám đốc có muốn chuyển trạng thái đợt "${item.TenDot}" sang "${nextStatus}" không?`,
      )
    ) {
      try {
        const payload = {
          TenDot: item.TenDot || '',
          MoTa: item.MoTa || '',
          TrangThai: nextStatus,
        };
        await updateDotTangLuong(item.MaDotTL, payload);
        fetchDanhSach();
      } catch (err) {
        alert('Cập nhật trạng thái thất bại. Vui lòng thử lại.');
      }
    }
  };

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
        {/* Banner Header */}
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
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="inline-flex items-center justify-center bg-slate-900 hover:bg-blue-600 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all duration-200 shadow-sm gap-2"
          >
            Tạo Đợt Tăng Lương Mới
          </button>
        </div>

        {/* Loading & Error */}
        {loading && (
          <p className="text-center text-sm py-10">Đang tải danh sách...</p>
        )}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center mb-6">
            {error}
          </div>
        )}

        {/* Grid Card Danh Sách */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {danhSach.map((item) => (
              <div
                key={item.MaDotTL}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between group relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                      MÃ #{item.MaDotTL}
                    </span>

                    {/* Bấm vào Badge Trạng Thái hoặc Nút Kế Bên để Đổi Trạng Thái Nhanh */}
                    <button
                      onClick={() => handleQuickUpdateStatus(item)}
                      title="Bấm để đổi trạng thái nhanh"
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all ${
                        item.TrangThai === 'Đang diễn ra'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100'
                          : item.TrangThai === 'Đã kết thúc'
                            ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-100 hover:bg-amber-100'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          item.TrangThai === 'Đang diễn ra'
                            ? 'bg-emerald-500'
                            : item.TrangThai === 'Đã kết thúc'
                              ? 'bg-slate-400'
                              : 'bg-amber-500'
                        }`}
                      ></span>
                      {item.TrangThai} 🔄
                    </button>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-2">
                    {item.TenDot}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 min-h-[32px] mb-4">
                    {item.MoTa || 'Không có mô tả chi tiết được bổ sung.'}
                  </p>
                </div>

                {/* Footer Hành Động */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() =>
                      router.push(`/admin/TangLuong/${item.MaDotTL}`)
                    }
                    className="flex-1 inline-flex items-center justify-center bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-bold text-xs py-2.5 px-4 rounded-xl transition gap-1"
                  >
                    Xem & Duyệt
                  </button>

                  {/* NÚT THỨ 2: ĐIỀU CHỈNH TRẠNG THÁI NHANH BẰNG ICON */}
                  <button
                    onClick={() => handleQuickUpdateStatus(item)}
                    className="p-2.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition"
                    title="Chuyển nhanh trạng thái vận hành"
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
                        strokeWidth="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 11H19"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={() => handleOpenEditModal(item.MaDotTL)}
                    className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition"
                    title="Sửa"
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
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={() => handleDelete(item.MaDotTL)}
                    className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                    title="Xóa"
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
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MODAL ĐÃ ĐƯỢC CÔ LẬP KHÔNG CÒN BỊ LỖI CONTROLLED / UNCONTROLLED */}
        {isOpenModal && (
          <EditStatusModal
            isEditing={isEditing}
            initialData={formData}
            onClose={() => setIsOpenModal(false)}
            onSubmit={async (data) => {
              try {
                if (isEditing && selectedId !== null) {
                  await updateDotTangLuong(selectedId, data);
                } else {
                  await createDotTangLuong(data);
                }
                setIsOpenModal(false);
                fetchDanhSach();
              } catch (err) {
                alert('Đã xảy ra lỗi khi lưu thông tin.');
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

// COMPONENT CON CÔ LẬP STATE FORM
interface ModalProps {
  isEditing: boolean;
  initialData: { TenDot: string; MoTa: string; TrangThai: string };
  onClose: () => void;
  onSubmit: (data: {
    TenDot: string;
    MoTa: string;
    TrangThai: string;
  }) => Promise<void>;
}

function EditStatusModal({
  isEditing,
  initialData,
  onClose,
  onSubmit,
}: ModalProps) {
  // State được khởi tạo độc lập bên trong Modal từ Props, triệt tiêu lỗi không đồng bộ dữ liệu
  const [localForm, setLocalForm] = useState({
    TenDot: initialData.TenDot || '',
    MoTa: initialData.MoTa || '',
    TrangThai: initialData.TrangThai || 'Chưa bắt đầu',
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(localForm);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-slate-100">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">
            {isEditing ? 'Cập Nhật Đợt Tăng Lương' : 'Khởi Tạo Đợt Tăng Lương'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
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

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Tên Đợt Chiến Lược *
            </label>
            <input
              type="text"
              required
              value={localForm.TenDot}
              onChange={(e) =>
                setLocalForm({ ...localForm, TenDot: e.target.value })
              }
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Mô Tả Mục Tiêu
            </label>
            <textarea
              value={localForm.MoTa}
              onChange={(e) =>
                setLocalForm({ ...localForm, MoTa: e.target.value })
              }
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Trạng Thái Vận Hành
            </label>
            <select
              value={localForm.TrangThai}
              onChange={(e) =>
                setLocalForm({ ...localForm, TrangThai: e.target.value })
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
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm"
            >
              {isEditing ? 'Cập Nhật' : 'Tạo Mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
