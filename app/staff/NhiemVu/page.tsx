'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Briefcase,
  CheckCircle,
  Clock,
  FileText,
  ArrowRight,
  User,
  Calendar,
  X,
  Eye,
  AlignLeft,
  AlertTriangle,
} from 'lucide-react';

import {
  Badge,
  Button,
  Card,
  Table,
  TableCell,
  TableRow,
} from '@/components/ui';
import { GiaoViecNhanVienByMaNVvaMaKH } from '@/service/PhanViec/BaoCaoTienDo';
import {
  GiaoViecNhanVienByMaNV,
  GiaoViecNhanVien,
} from '@/service/PhanViec/GiaoViecNhanVien';

export default function DanhSachCongViecNhanVien() {
  const router = useRouter();
  const [dsCongViec, setDsCongViec] = useState<GiaoViecNhanVien[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [maNV, setMaNV] = useState<string>('');

  // State quản lý đóng/mở và dữ liệu Modal ghi đè
  const [keHoachChiTiet, setKeHoachChiTiet] = useState<any | null>(null);
  const [isLoadingKeHoach, setIsLoadingKeHoach] = useState(false);

  // 1. Lấy MaNV từ localStorage an toàn trên Client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setMaNV(user.MaNV || 'NV001');
        } catch (e) {
          console.error('Lỗi parse user:', e);
          setMaNV('NV001');
        }
      } else {
        setMaNV('NV001');
      }
    }
  }, []);

  // 2. Gọi API lấy danh sách tổng quan ban đầu
  useEffect(() => {
    if (!maNV) return;

    const loadData = async () => {
      try {
        setIsLoading(true);
        const result = await GiaoViecNhanVienByMaNV(maNV, '');
        setDsCongViec(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error('Lỗi load danh sách công việc:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [maNV]);

  // 3. Hàm xử lý lấy dữ liệu chi tiết từ SQL công việc được chọn
  const handleXemKeHoach = async (maKH: number) => {
    console.log('Xem chi tiết kế hoạch cho MaKH:', maKH, 'và MaNV:', maNV);
    if (!maNV || !maKH) {
      alert('Không tìm thấy thông tin Mã nhân viên hoặc Mã kế hoạch!');
      return;
    }

    try {
      setIsLoadingKeHoach(true);
      const data = await GiaoViecNhanVienByMaNVvaMaKH(maNV, maKH);

      if (Array.isArray(data) && data.length > 0) {
        setKeHoachChiTiet(data[0]);
      } else if (data && !Array.isArray(data)) {
        setKeHoachChiTiet(data);
      } else {
        setKeHoachChiTiet(null);
        alert('Không tìm thấy nội dung chi tiết kế hoạch.');
      }
    } catch (error) {
      console.error('Lỗi lấy chi tiết:', error);
    } finally {
      setIsLoadingKeHoach(false);
    }
  };

  // Thống kê nhanh
  const dangThucHien = dsCongViec.filter(
    (cv) => cv.TrangThai === 'DangThucHien',
  ).length;
  const hoanThanh = dsCongViec.filter(
    (cv) => cv.TrangThai === 'HoanThanh',
  ).length;

  const getBadgeMucDo = (mucDo: string) => {
    switch (mucDo) {
      case 'Cao':
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Cao
          </span>
        );
      case 'TrungBinh':
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-700">
            Trung bình
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
            Thấp
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 relative">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Công Việc Của Tôi</h1>
        <p className="text-slate-500">
          Quản lý nhiệm vụ và theo dõi thông tin chi tiết kế hoạch
        </p>
      </div>

      {/* KHỐI THỐNG KÊ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="!p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-100">
            <Briefcase className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Tổng công việc</p>
            <p className="text-2xl font-bold text-slate-800">
              {dsCongViec.length}
            </p>
          </div>
        </Card>
        <Card className="!p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-100">
            <Clock className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Đang thực hiện</p>
            <p className="text-2xl font-bold text-slate-800">{dangThucHien}</p>
          </div>
        </Card>
        <Card className="!p-4 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-100">
            <CheckCircle className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Đã hoàn thành</p>
            <p className="text-2xl font-bold text-slate-800">{hoanThanh}</p>
          </div>
        </Card>
      </div>

      {/* BẢNG DANH SÁCH CHÍNH (Luôn hiển thị rộng rãi full màn hình) */}
      <Card className="!p-0 overflow-hidden shadow-md border border-slate-200/80">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <h2 className="font-bold text-slate-800">
            Danh sách nhiệm vụ được phân công
          </h2>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-slate-500">
            Đang tải dữ liệu...
          </div>
        ) : dsCongViec.length === 0 ? (
          <div className="p-8 text-center text-slate-400 italic">
            Hiện tại bạn chưa có công việc.
          </div>
        ) : (
          <Table
            headers={[
              'Mã GV',
              'Mã KH',
              'Ngày giao',
              'Hạn chót',
              'Trạng thái',
              'Thao tác',
            ]}
          >
            {dsCongViec.map((cv) => (
              <TableRow
                key={cv.MaGV}
                className="hover:bg-slate-50/80 transition-colors"
              >
                <TableCell className="font-semibold text-slate-700">
                  #{cv.MaGV}
                </TableCell>
                <TableCell className="font-medium text-indigo-600">
                  #{cv.MaKH || 'N/A'}
                </TableCell>
                <TableCell className="text-slate-600">
                  {cv.NgayGiao?.split('T')[0]}
                </TableCell>
                <TableCell className="text-red-600 font-medium">
                  {cv.Deadline?.split('T')[0] || 'Chưa có'}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={cv.TrangThai === 'HoanThanh' ? 'success' : 'info'}
                  >
                    {cv.TrangThai === 'HoanThanh'
                      ? 'Hoàn thành'
                      : 'Đang thực hiện'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {/* NÚT XEM CHI TIẾT KẾ HOẠCH */}
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isLoadingKeHoach}
                      onClick={() => cv.MaKH && handleXemKeHoach(cv.MaKH)}
                      className="border-slate-200 hover:bg-slate-50"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1 text-slate-500" />
                      Chi tiết
                    </Button>

                    {/* NÚT BÁO CÁO TIẾN ĐỘ CHUYỂN TRANG GỐC */}
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => router.push(`/staff/NhiemVu/${cv.MaGV}`)}
                    >
                      <FileText className="w-3.5 h-3.5 mr-1" />
                      Báo cáo
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        )}
      </Card>

      {/* MODAL FORM GHI ĐÈ LÊN GIAO DIỆN (CHỈ HIỂN THỊ KHI CLICK CHI TIẾT) */}
      {keHoachChiTiet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          {/* Lớp click ra ngoài để đóng modal */}
          <div
            className="absolute inset-0"
            onClick={() => setKeHoachChiTiet(null)}
          />

          {/* Hộp Form Chi Tiết Nổi bật ở Trung tâm */}
          <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh]">
            {/* Header Modal */}
            <div className="p-5 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-md">
                    Kế hoạch: #{keHoachChiTiet.MaKH}
                  </span>
                  {keHoachChiTiet.MucDo && getBadgeMucDo(keHoachChiTiet.MucDo)}
                </div>
                <h3 className="font-bold text-slate-800 text-lg leading-snug mt-1">
                  {keHoachChiTiet.TenCongViec || 'Chưa cập nhật tên công việc'}
                </h3>
              </div>
              <button
                onClick={() => setKeHoachChiTiet(null)}
                className="p-1.5 rounded-full hover:bg-slate-200/70 text-slate-400 hover:text-slate-600 transition shrink-0 ml-4"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body Nội Dung - Cuộn được nếu text quá dài */}
            <div className="p-6 space-y-5 overflow-y-auto text-sm">
              {/* Ô Mô tả lớn đậm nét */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 space-y-1.5 shadow-inner">
                <p className="text-xs text-slate-500 font-bold flex items-center gap-1.5 uppercase tracking-wider">
                  <AlignLeft className="w-3.5 h-3.5 text-indigo-500" /> Mô tả
                  nội dung nhiệm vụ:
                </p>
                <p className="text-slate-700 text-sm whitespace-pre-line leading-relaxed italic pl-1">
                  {keHoachChiTiet.MoTa || 'Không có mô tả chi tiết từ quản lý.'}
                </p>
              </div>

              {/* Grid thông tin nhân sự và ngày bắt đầu */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3 bg-slate-50/50 p-2.5 rounded-lg">
                  <User className="w-5 h-5 text-indigo-500 shrink-0" />
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Nhân viên phụ trách
                    </p>
                    <p className="font-semibold text-slate-700 text-xs sm:text-sm">
                      Mã NV: {maNV}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-50/50 p-2.5 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-500 shrink-0" />
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Ngày bắt đầu nhận việc
                    </p>
                    <p className="font-semibold text-slate-700 text-xs sm:text-sm">
                      {keHoachChiTiet.NgayGiao
                        ? keHoachChiTiet.NgayGiao.split('T')[0]
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Khối So sánh 2 Deadline rõ ràng */}
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Thời gian hạn chót cần lưu ý
                </p>
                <div className="grid grid-cols-2 gap-3 bg-indigo-50/40 p-3 rounded-xl border border-indigo-100/70">
                  <div className="space-y-0.5">
                    <p className="text-[11px] text-slate-500 font-medium">
                      Hạn chót của cá nhân bạn
                    </p>
                    <p className="font-bold text-red-600 text-sm">
                      {keHoachChiTiet.DeadlineGiaoViec
                        ? keHoachChiTiet.DeadlineGiaoViec.split('T')[0]
                        : 'Không giới hạn'}
                    </p>
                  </div>
                  <div className="border-l pl-3 border-indigo-100 space-y-0.5">
                    <p className="text-[11px] text-slate-500 font-medium">
                      Hạn chót tổng dự án/KH
                    </p>
                    <p className="font-bold text-slate-700 text-sm">
                      {keHoachChiTiet.DeadlineKeHoach
                        ? keHoachChiTiet.DeadlineKeHoach.split('T')[0]
                        : 'Không giới hạn'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tiến độ hoàn thành thực tế */}
              <div className="pt-2">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                    Trạng thái cá nhân:
                    <Badge
                      variant={
                        keHoachChiTiet.TrangThaiNhanVien === 'HoanThanh'
                          ? 'success'
                          : 'info'
                      }
                    >
                      {keHoachChiTiet.TrangThaiNhanVien === 'HoanThanh'
                        ? 'Đã hoàn thành'
                        : 'Đang tiến hành'}
                    </Badge>
                  </span>
                  <span className="text-sm font-black text-indigo-600">
                    {keHoachChiTiet.PhanTramHoanThanh || 0}%
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-500"
                    style={{
                      width: `${keHoachChiTiet.PhanTramHoanThanh || 0}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Footer Modal với Nút Đóng nhanh */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setKeHoachChiTiet(null)}
                className="bg-white border-slate-200"
              >
                Đóng lại
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setKeHoachChiTiet(null);
                  router.push(`/staff/NhiemVu/${keHoachChiTiet.MaGV}`);
                }}
              >
                Vào báo cáo ngay
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
