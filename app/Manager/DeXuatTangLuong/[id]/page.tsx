'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  getDeXuatByDotTL,
  createDeXuatTangLuong,
  updateDeXuatTangLuong,
  deleteDeXuatTangLuong,
  DeXuatTangLuong,
} from '@/service/DeXuatTangLuong.api';

export default function DuyetTangLuongChiTiet() {
  const router = useRouter();
  const params = useParams();

  // Lấy mã đợt từ URL và ép kiểu về số
  const maDotTL = Number(params.id);

  const [danhSachDeXuat, setDanhSachDeXuat] = useState<DeXuatTangLuong[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('Tất cả');

  // State quản lý Modal và Chế độ Form
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Form State làm dữ liệu mồi truyền vào Modal
  const [formData, setFormData] = useState({
    MaNV: '',
    HeSoTang: 0.1,
    LyDo: '',
    TrangThai: 'Chờ duyệt',
  });

  // 1. Tải danh sách đề xuất thuộc đợt này
  const fetchDanhSachDeXuat = async () => {
    if (!maDotTL) {
      setError('Mã đợt tăng lương không hợp lệ.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getDeXuatByDotTL(maDotTL);
      setDanhSachDeXuat(data || []);
    } catch (err: any) {
      console.error('Lỗi tải danh sách đề xuất:', err);
      setError('Không thể tải danh sách đề xuất tăng lương của đợt này.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (maDotTL) {
      fetchDanhSachDeXuat();
    }
  }, [maDotTL]);

  // 2. Mở Modal ở chế độ THÊM MỚI
  const handleOpenCreateModal = () => {
    setIsEditing(false);
    setSelectedId(null);
    setFormData({
      MaNV: '',
      HeSoTang: 0.1,
      LyDo: '',
      TrangThai: 'Chờ duyệt',
    });
    setIsOpenModal(true);
  };

  // 3. Mở Modal ở chế độ CHỈNH SỬA
  const handleOpenEditModal = (item: DeXuatTangLuong) => {
    setIsEditing(true);
    setSelectedId(item.MaDeXuat);
    setFormData({
      MaNV: item.MaNV || '',
      HeSoTang: item.HeSoTang || 0,
      LyDo: item.LyDo || '',
      TrangThai: item.TrangThai || 'Chờ duyệt',
    });
    setIsOpenModal(true);
  };

  // 4. Xử lý XÓA đề xuất
  const handleDelete = async (idDeXuat: number) => {
    if (
      !window.confirm(
        'Quản lý có chắc chắn muốn xóa hẳn đề xuất tăng lương này không?',
      )
    ) {
      return;
    }
    try {
      await deleteDeXuatTangLuong(idDeXuat);
      alert('Đã xóa đề xuất thành công!');
      fetchDanhSachDeXuat();
    } catch (err: any) {
      console.error('Lỗi xóa đề xuất:', err);
      const errMsg =
        err.response?.data?.message || err.message || 'Xóa đề xuất thất bại.';
      alert(`Xóa đề xuất thất bại! Lý do: ${errMsg}`);
    }
  };

  // Lọc dữ liệu theo Tab đang chọn
  const filteredData = danhSachDeXuat.filter((item) => {
    if (filterStatus === 'Tất cả') return true;
    return item.TrangThai === filterStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50/70 p-6 md:p-8 text-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Nút quay lại */}
        <button
          onClick={() => router.push('/quan-ly-tang-luong')}
          className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-900 gap-2 mb-5 group transition-colors"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Quay lại danh sách đợt
        </button>

        {/* Khối Header & Thanh công cụ hành động */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Quản Lý Đề Xuất Tăng Lương Chi Tiết
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Đang xem các đề xuất thuộc Đợt tăng lương mã số:{' '}
              <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                #{maDotTL}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
            {/* Bộ lọc Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              {['Tất cả', 'Chờ duyệt', 'Đã duyệt', 'Từ chối'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg transition-all duration-150 ${
                    filterStatus === status
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Nút thêm mới */}
            <button
              onClick={handleOpenCreateModal}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-3 rounded-xl transition-all shadow-sm"
            >
              + Tạo Đề Xuất Mới
            </button>
          </div>
        </div>

        {/* Trạng thái Loading / Error */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-2">
            <div className="w-7 h-7 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-medium">Đang tải danh sách đề xuất...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center text-red-600 text-sm font-semibold mb-6">
            {error}
          </div>
        )}

        {/* Bảng danh sách hiển thị CRUD */}
        {!loading && !error && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
                <thead className="bg-slate-50/70 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Mã Đề Xuất</th>
                    <th className="px-6 py-4">Nhân Viên</th>
                    <th className="px-6 py-4">Hệ Số Tăng</th>
                    <th className="px-6 py-4">Lý Do Đề Xuất</th>
                    <th className="px-6 py-4">Ngày Đề Xuất</th>
                    <th className="px-6 py-4">Trạng Thái</th>
                    <th className="px-6 py-4 text-center">Hành Động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                  {filteredData.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-12 text-center text-slate-400 font-medium"
                      >
                        Không tìm thấy hồ sơ đề xuất nào ở trạng thái này.
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((deXuat) => (
                      <tr
                        key={deXuat.MaDeXuat}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="px-6 py-4 font-mono font-bold text-slate-400">
                          #{deXuat.MaDeXuat}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold flex items-center justify-center text-xs">
                              {deXuat.MaNV?.substring(0, 2).toUpperCase() ||
                                'NV'}
                            </div>
                            <span className="font-bold text-slate-900">
                              {deXuat.MaNV}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center bg-emerald-50 text-emerald-700 font-black px-2.5 py-1 rounded-lg border border-emerald-100 text-xs">
                            +{deXuat.HeSoTang}
                          </span>
                        </td>
                        <td className="px-6 py-4 max-w-xs">
                          <p
                            className="truncate text-slate-600"
                            title={deXuat.LyDo}
                          >
                            {deXuat.LyDo || 'Không có lý do đính kèm.'}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-400 font-medium">
                          {deXuat.NgayDeXuat
                            ? new Date(deXuat.NgayDeXuat).toLocaleDateString(
                                'vi-VN',
                              )
                            : '---'}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit ${
                              deXuat.TrangThai === 'Đã duyệt'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                : deXuat.TrangThai === 'Từ chối'
                                  ? 'bg-rose-50 text-rose-700 border border-rose-100'
                                  : 'bg-amber-50 text-amber-700 border border-amber-100'
                            }`}
                          >
                            <span
                              className={`h-1 w-1 rounded-full ${
                                deXuat.TrangThai === 'Đã duyệt'
                                  ? 'bg-emerald-500'
                                  : deXuat.TrangThai === 'Từ chối'
                                    ? 'bg-rose-500'
                                    : 'bg-amber-500'
                              }`}
                            ></span>
                            {deXuat.TrangThai}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center space-x-2 whitespace-nowrap">
                          {/* Hệ thống nút bấm chức năng của Quản lý */}
                          <button
                            onClick={() => handleOpenEditModal(deXuat)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition"
                            title="Sửa đề xuất"
                          >
                            ✏️ Sửa
                          </button>
                          <button
                            onClick={() => handleDelete(deXuat.MaDeXuat)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded-lg transition"
                            title="Xóa đề xuất"
                          >
                            🗑️ Xóa
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODAL FORM ĐĂNG KÝ / CHỈNH SỬA BIỂU MẪU */}
        {isOpenModal && (
          <DeXuatFormModal
            isEditing={isEditing}
            initialData={formData}
            onClose={() => setIsOpenModal(false)}
            onSubmit={async (submittedData) => {
              if (!maDotTL) {
                alert('Mã đợt tăng lương từ URL không hợp lệ!');
                return;
              }

              // Chuẩn hóa cấu trúc dữ liệu gửi đi (DB tự động sinh ngày tạo)
              const payload = {
                MaNV: submittedData.MaNV.trim(),
                HeSoTang: Number(submittedData.HeSoTang),
                LyDo: submittedData.LyDo ? submittedData.LyDo.trim() : '',
                TrangThai: submittedData.TrangThai,
                MaDotTL: maDotTL,
              };

              console.log('==> Cấu trúc JSON chuẩn bị gửi lên CSDL:', payload);

              try {
                if (isEditing && selectedId !== null) {
                  // Nghiệp vụ Cập nhật đề xuất
                  await updateDeXuatTangLuong(selectedId, payload);
                  alert('Cập nhật thông tin đề xuất thành công!');
                } else {
                  // Nghiệp vụ Thêm mới đề xuất
                  const res = await createDeXuatTangLuong(payload);
                  console.log('==> Phản hồi từ Backend Server:', res);
                  alert('Thêm nhân viên vào đợt tăng lương thành công!');
                }
                setIsOpenModal(false);
                fetchDanhSachDeXuat(); // Refresh bảng giao diện
              } catch (err: any) {
                console.error('Lỗi chi tiết từ hệ thống API:', err);

                const backendErrorMsg =
                  err.response?.data?.message ||
                  err.message ||
                  'Lỗi lưu trữ dữ liệu ngầm.';
                alert(
                  `Không thể lưu vào CSDL! Lý do hệ thống báo: ${backendErrorMsg}`,
                );
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// COMPONENT PHỤ TRỢ: MODAL FORM ĐỂ TRÁNH XUNG ĐỘT TRẠNG THÁI INPUT
// -------------------------------------------------------------
interface ModalProps {
  isEditing: boolean;
  initialData: {
    MaNV: string;
    HeSoTang: number;
    LyDo: string;
    TrangThai: string;
  };
  onClose: () => void;
  onSubmit: (data: {
    MaNV: string;
    HeSoTang: number;
    LyDo: string;
    TrangThai: string;
  }) => Promise<void>;
}

function DeXuatFormModal({
  isEditing,
  initialData,
  onClose,
  onSubmit,
}: ModalProps) {
  const [localForm, setLocalForm] = useState({
    MaNV: initialData.MaNV || '',
    HeSoTang: initialData.HeSoTang || 0,
    LyDo: initialData.LyDo || '',
    TrangThai: initialData.TrangThai || 'Chờ duyệt',
  });

  useEffect(() => {
    setLocalForm({
      MaNV: initialData.MaNV || '',
      HeSoTang: initialData.HeSoTang || 0,
      LyDo: initialData.LyDo || '',
      TrangThai: initialData.TrangThai || 'Chờ duyệt',
    });
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localForm.MaNV.trim()) {
      alert('Vui lòng điền mã nhân viên!');
      return;
    }
    onSubmit(localForm);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-slate-100">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">
            {isEditing ? 'Chỉnh Sửa Đề Xuất Lương' : 'Thêm Đề Xuất Vào Đợt'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-lg"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Mã nhân viên */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Mã Nhân Viên *
            </label>
            <input
              type="text"
              required
              disabled={isEditing}
              value={localForm.MaNV}
              onChange={(e) =>
                setLocalForm({ ...localForm, MaNV: e.target.value })
              }
              placeholder="Ví dụ: NV089"
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:bg-slate-100 disabled:text-slate-400"
            />
          </div>

          {/* Hệ số tăng */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Hệ Số Tăng Lương *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              required
              value={localForm.HeSoTang === 0 ? '' : localForm.HeSoTang}
              onChange={(e) =>
                setLocalForm({
                  ...localForm,
                  HeSoTang: parseFloat(e.target.value) || 0,
                })
              }
              placeholder="Ví dụ: 0.15"
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Lý do đề xuất */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Lý Do Đề Xuất
            </label>
            <textarea
              value={localForm.LyDo}
              onChange={(e) =>
                setLocalForm({ ...localForm, LyDo: e.target.value })
              }
              placeholder="Nhập ghi chú lý do hoặc đóng góp của nhân viên..."
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              rows={3}
            />
          </div>

          {/* Trạng thái duyệt */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Trạng Thái Hồ Sơ
            </label>
            <select
              value={localForm.TrangThai}
              onChange={(e) =>
                setLocalForm({ ...localForm, TrangThai: e.target.value })
              }
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            >
              <option value="Chờ duyệt">Chờ duyệt</option>
              <option value="Đã duyệt">Đã duyệt</option>
              <option value="Từ chối">Từ chối</option>
            </select>
          </div>

          {/* Thanh công cụ Modal */}
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
              className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-600 rounded-xl shadow-sm transition-colors"
            >
              {isEditing ? 'Cập Nhật' : 'Thêm Mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
