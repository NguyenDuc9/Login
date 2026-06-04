'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
// Import các API đề xuất tăng lương
import {
  getDeXuatByDotTL,
  updateDeXuatTangLuong,
  DeXuatTangLuong,
} from '@/service/DeXuatTangLuong.api';

export default function DuyetTangLuongChiTiet() {
  const router = useRouter();
  const params = useParams();

  // Lấy mã đợt từ URL (Ví dụ: /quan-ly-tang-luong/5 -> maDotTL = 5)
  const maDotTL = Number(params.id);

  const [danhSachDeXuat, setDanhSachDeXuat] = useState<DeXuatTangLuong[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('Tất cả');

  // 1. Gọi API tải danh sách đề xuất thuộc đợt này
  const fetchDanhSachDeXuat = async () => {
    if (!maDotTL) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getDeXuatByDotTL(maDotTL);
      setDanhSachDeXuat(data || []);
    } catch (err) {
      setError('Không thể tải danh sách đề xuất tăng lương của đợt này.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDanhSachDeXuat();
  }, [maDotTL]);

  // 2. Xử lý Phê duyệt hoặc Từ chối đề xuất (Gửi dữ liệu trạng thái và ngày xử lý về Backend)
  // 2. Xử lý Phê duyệt hoặc Từ chối đề xuất (Gửi dữ liệu trạng thái và ngày xử lý về Backend)
  const handleXulyDuyet = async (
    idDeXuat: number,
    trangThaiMoi: 'Đã duyệt' | 'Từ chối',
  ) => {
    const actionText = trangThaiMoi === 'Đã duyệt' ? 'DUYỆT' : 'BÁC BỎ';
    const confirmMsg = `Giám đốc chắc chắn muốn ${actionText} đề xuất tăng lương này không?`;
    if (!window.confirm(confirmMsg)) return;

    // Chuyển đổi thời gian hiện tại sang định dạng YYYY-MM-DD HH:mm:ss phù hợp với MySQL DATETIME
    const now = new Date();
    const nam = now.getFullYear();
    const thang = String(now.getMonth() + 1).padStart(2, '0');
    const ngay = String(now.getDate()).padStart(2, '0');
    const gio = String(now.getHours()).padStart(2, '0');
    const phut = String(now.getMinutes()).padStart(2, '0');
    const giay = String(now.getSeconds()).padStart(2, '0');

    const ngayDuyetFormatMySQL = `${nam}-${thang}-${ngay} ${gio}:${phut}:${giay}`;

    // Chuẩn bị payload chứa trạng thái mới và thời gian duyệt thực tế kiểu DATETIME
    const payload = {
      TrangThai: trangThaiMoi,
      NgayDuyet: ngayDuyetFormatMySQL, // Đã đổi từ .toISOString() sang chuỗi chuẩn MySQL
    };

    console.log(`==> Gửi yêu cầu cập nhật đề xuất #${idDeXuat}:`, payload);

    try {
      // Sử dụng API update sẵn có để đồng bộ trạng thái sang Backend
      await updateDeXuatTangLuong(idDeXuat, payload);
      alert(`Đã thực hiện cập nhật trạng thái hồ sơ thành: ${trangThaiMoi}`);
      fetchDanhSachDeXuat(); // Tải lại danh sách để kích hoạt trigger DB cập nhật lại bảng hợp đồng
    } catch (err: any) {
      console.error('Lỗi khi cập nhật trạng thái phê duyệt:', err);
      const serverMsg =
        err.response?.data?.message || err.message || 'Lỗi hệ thống';
      alert(`Xử lý phê duyệt thất bại. Chi tiết lỗi: ${serverMsg}`);
    }
  };

  // 3. Lọc dữ liệu hiển thị theo tab được chọn
  const filteredData = danhSachDeXuat.filter((item) => {
    if (filterStatus === 'Tất cả') return true;
    return item.TrangThai === filterStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50/70 p-6 md:p-8 text-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Nút quay lại trang danh sách đợt */}
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

        {/* Khối Header & Bộ lọc */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Danh Sách Nhân Viên Chờ Duyệt Lương
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Đang xem các đề xuất thuộc Đợt tăng lương mã số:{' '}
              <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                #{maDotTL}
              </span>
            </p>
          </div>

          {/* Thanh chuyển đổi Bộ lọc (Tabs) */}
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold self-start lg:self-auto">
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
        </div>

        {/* Trạng thái Loading / Error */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-2">
            <div className="w-7 h-7 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-medium">
              Đang truy xuất danh sách nhân sự đề xuất...
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center text-red-600 text-sm font-semibold mb-6">
            {error}
          </div>
        )}

        {/* Bảng danh sách đề xuất */}
        {!loading && !error && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
                <thead className="bg-slate-50/70 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Mã Đề Xuất</th>
                    <th className="px-6 py-4">Nhân Viên (Mã NV)</th>
                    <th className="px-6 py-4">Hệ Số Tăng</th>
                    <th className="px-6 py-4">Lý Do Đề Xuất</th>
                    <th className="px-6 py-4">Ngày Đề Xuất</th>
                    <th className="px-6 py-4">Trạng Thái</th>
                    <th className="px-6 py-4 text-right">Quyết Định Duyệt</th>
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
                        <td className="px-6 py-4 text-right space-x-1.5 whitespace-nowrap">
                          {/* Chỉ hiển thị cặp nút xử lý nếu hồ sơ đang ở trạng thái chờ duyệt */}
                          {deXuat.TrangThai === 'Chờ duyệt' ||
                          deXuat.TrangThai === 'Chưa duyệt' ? (
                            <>
                              <button
                                onClick={() =>
                                  handleXulyDuyet(deXuat.MaDeXuat, 'Đã duyệt')
                                }
                                className="bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs px-3 py-2 rounded-xl shadow-sm transition-all duration-150"
                              >
                                Duyệt
                              </button>
                              <button
                                onClick={() =>
                                  handleXulyDuyet(deXuat.MaDeXuat, 'Từ chối')
                                }
                                className="bg-white hover:bg-rose-50 text-rose-600 border border-slate-200 hover:border-rose-200 font-bold text-xs px-3 py-2 rounded-xl transition-all duration-150"
                              >
                                Bác bỏ
                              </button>
                            </>
                          ) : (
                            <span className="text-xs text-slate-400 font-medium bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200/60 italic">
                              {deXuat.NgayDuyet
                                ? `Xử lý ngày ${new Date(deXuat.NgayDuyet).toLocaleDateString('vi-VN')}`
                                : 'Đã hoàn tất'}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
