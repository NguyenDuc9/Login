'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation'; // Thêm useSearchParams
import {
  ArrowLeft,
  UserPlus,
  Search,
  Trash2,
  Users,
  AlertCircle,
  Eye,
  Plus,
  UserCheck,
} from 'lucide-react';

import {
  Badge,
  Button,
  Card,
  Table,
  TableCell,
  TableRow,
  Modal,
} from '@/components/ui';

import {
  getKeHoachCongViecById,
  KeHoachCongViec,
} from '@/service/PhanViec/KeHoachCongViec';

import { getNhanVienByPhongBan, NhanVien } from '@/service/NhanVien.api';
import { getNhiemVuTongByPhongBan } from '@/service/PhanViec/NhiemVuTong.api';

import {
  createGiaoViecNhanVien,
  getGiaoViecNhanVienByMaKH,
  deleteGiaoViecNhanVien,
  GiaoViecNhanVien,
} from '@/service/PhanViec/GiaoViecNhanVien';

import {
  getKinhNghiemLamViecByMaNV,
  KinhNghiemLamViec,
} from '@/service/PhanViec/KinhNghiem.api';

export default function GiaoViecNhanVienPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams(); // Kích hoạt để lấy các tham số sau dấu ?
  const maKH = Number(params.id);

  const [congViec, setCongViec] = useState<KeHoachCongViec | null>(null);
  const [nhanVienList, setNhanVienList] = useState<NhanVien[]>([]);
  const [dsGiaoViec, setDsGiaoViec] = useState<GiaoViecNhanVien[]>([]);
  const [searchNV, setSearchNV] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Modal xem kinh nghiệm làm việc
  const [showKinhNghiemModal, setShowKinhNghiemModal] = useState(false);
  const [selectedNvKinhNghiem, setSelectedNvKinhNghiem] =
    useState<NhanVien | null>(null);
  const [kinhNghiemList, setKinhNghiemList] = useState<KinhNghiemLamViec[]>([]);
  const [loadingKinhNghiem, setLoadingKinhNghiem] = useState(false);

  const taiKhoan =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('user') || '{}')
      : {};

  // Load thông tin công việc
  const loadCongViec = async () => {
    try {
      const data = await getKeHoachCongViecById(maKH);
      setCongViec(data);
    } catch (error) {
      console.error('Lỗi load công việc:', error);
    }
  };

  // Load danh sách giao việc theo MaKH
  const loadDsGiaoViec = async () => {
    try {
      setIsLoading(true);
      const result = await getGiaoViecNhanVienByMaKH(maKH);
      setDsGiaoViec(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error('Lỗi load ds giao việc:', error);
      setDsGiaoViec([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCongViec();
    loadDsGiaoViec();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maKH]);

  // Hàm mở Modal và gọi API lấy nhân viên theo phòng ban
  const handleOpenAddModal = async () => {
    setShowAddModal(true);
    setSearchNV('');
    const MaPB = 'PB03';
    try {
      const result = await getNhanVienByPhongBan(MaPB);
      const nhanVienPhongBan = result.filter(
        (nv: NhanVien) => nv.TrangThai !== 'Nghi viec',
      );
      setNhanVienList(nhanVienPhongBan);
    } catch (error) {
      console.error('Lỗi load nhân viên phòng ban:', error);
    }
  };

  // Lọc nhân viên theo từ khóa tìm kiếm
  const filteredNhanVien = nhanVienList.filter((nv) => {
    const searchLower = searchNV.toLowerCase();
    return (
      nv.HoTen?.toLowerCase().includes(searchLower) ||
      nv.MaNV?.toLowerCase().includes(searchLower)
    );
  });

  // Lọc danh sách: Những nhân viên chưa được giao việc này
  const nhanVienDaGiao = dsGiaoViec.map((gv) => gv.MaNV);
  const nhanVienChuaGiao = filteredNhanVien.filter(
    (nv) => !nhanVienDaGiao.includes(nv.MaNV),
  );

  // Thêm trực tiếp 1 nhân viên vào công việc
  const handleAddNhanVien = async (maNV: string) => {
    if (!maNV) return;

    try {
      await createGiaoViecNhanVien({
        MaKH: maKH,
        MaNV: maNV,
        NgayGiao: new Date().toISOString().split('T')[0],
        TrangThai: 'DangThucHien',
        PhanTramHoanThanh: 0,
      });

      alert('Thêm nhân viên thành công!');
      loadDsGiaoViec();
    } catch (error) {
      console.error('Lỗi thêm nhân viên:', error);
      alert('Thêm nhân viên thất bại!');
    }
  };

  // Xem chi tiết kinh nghiệm làm việc của 1 nhân viên
  const handleXemKinhNghiem = async (nv: NhanVien) => {
    setSelectedNvKinhNghiem(nv);
    setShowKinhNghiemModal(true);
    setLoadingKinhNghiem(true);
    try {
      const result = await getKinhNghiemLamViecByMaNV(nv.MaNV!);
      setKinhNghiemList(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error('Lỗi load kinh nghiệm:', error);
      setKinhNghiemList([]);
    } finally {
      setLoadingKinhNghiem(false);
    }
  };

  // Xóa nhân viên khỏi công việc
  const handleDeleteNhanVien = async (maGV: number) => {
    if (confirm('Bạn có chắc muốn xóa nhân viên khỏi công việc này?')) {
      try {
        await deleteGiaoViecNhanVien(maGV);
        alert('Xóa thành công!');
        loadDsGiaoViec();
      } catch (error) {
        console.error('Lỗi xóa:', error);
        alert('Xóa thất bại!');
      }
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="secondary" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Giao Việc Cho Nhân Viên
          </h1>
          <p className="text-slate-500">
            Phân công công việc cho nhân viên trong phòng ban
          </p>
        </div>
      </div>

      {/* Thông tin công việc */}
      {congViec && (
        <Card className="!p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold">
                Công việc
              </p>
              <p className="font-bold text-lg text-indigo-700">
                {congViec.TenCongViec}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold">
                Mức độ
              </p>
              <Badge
                variant={
                  congViec.MucDo === 'Cao'
                    ? 'danger'
                    : congViec.MucDo === 'TrungBinh'
                      ? 'warning'
                      : 'default'
                }
              >
                {congViec.MucDo === 'Cao'
                  ? 'Cao'
                  : congViec.MucDo === 'TrungBinh'
                    ? 'Trung bình'
                    : 'Thấp'}
              </Badge>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold">
                Đã giao
              </p>
              <p className="font-bold text-xl text-emerald-600 flex items-center gap-1">
                <Users className="w-5 h-5" />
                {dsGiaoViec.length} nhân viên
              </p>
            </div>
          </div>
          {congViec.MoTa && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-xs text-slate-500 uppercase font-semibold">
                Mô tả
              </p>
              <p className="text-slate-700">{congViec.MoTa}</p>
            </div>
          )}
        </Card>
      )}

      {/* Thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="!p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-100">
              <UserPlus className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Đã giao việc</p>
              <p className="text-2xl font-bold text-slate-800">
                {dsGiaoViec.length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="!p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-100">
              <AlertCircle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Cần phân bổ thêm</p>
              <p className="text-sm font-medium text-amber-700 mt-1">
                Hãy mở danh sách để xem nhân viên khả dụng
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Bảng danh sách nhân viên đã giao */}
      <Card className="!p-0 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-800">
            Danh sách nhân viên đang phụ trách
          </h2>
          <Button variant="primary" onClick={handleOpenAddModal}>
            <UserPlus className="w-4 h-4 mr-2" />
            Danh sách nhân viên
          </Button>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-slate-500">
            Đang tải dữ liệu...
          </div>
        ) : dsGiaoViec.length === 0 ? (
          <div className="p-8 text-center text-slate-400 italic">
            Chưa có nhân viên nào được giao việc này
          </div>
        ) : (
          <Table
            headers={[
              'Mã NV',
              'Ngày giao',
              'Hạn chót',
              'Tiến độ',
              'Trạng thái',
              'Thao tác',
            ]}
          >
            {dsGiaoViec.map((gv) => (
              <TableRow key={gv.MaGV}>
                <TableCell>
                  <p className="font-semibold text-slate-800">{gv.MaNV}</p>
                </TableCell>
                <TableCell>{gv.NgayGiao?.split('T')[0]}</TableCell>
                <TableCell className="font-medium">
                  {gv.Deadline?.split('T')[0] || 'Chưa có'}
                </TableCell>
                <TableCell>
                  {/* --- ĐOẠN SỬA ĐỔI: Tự động chuyển tiếp ?abc sang trang xem tiến độ --- */}
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 text-xs py-1 px-2.5 h-auto"
                    onClick={() => {
                      // Kiểm tra xem trên URL hiện tại có đang tồn tại query ?abc hay không
                      const hasAbc = searchParams.has('abc');

                      // Nếu có ?abc thì đính kèm chuỗi vào sau URL điều hướng, ngược lại điều hướng bình thường
                      const targetUrl = `/staff/NhiemVu/${gv.MaGV}${hasAbc ? '?abc' : ''}`;

                      router.push(targetUrl);
                    }}
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    xem tiến độ
                  </Button>
                  {/* ------------------------------------------------------------------ */}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      gv.TrangThai === 'HoanThanh'
                        ? 'success'
                        : gv.TrangThai === 'DangThucHien'
                          ? 'info'
                          : 'warning'
                    }
                  >
                    {gv.TrangThai === 'DangThucHien'
                      ? 'Đang thực hiện'
                      : gv.TrangThai === 'HoanThanh'
                        ? 'Hoàn thành'
                        : gv.TrangThai}
                  </Badge>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => handleDeleteNhanVien(gv.MaGV!)}
                    className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                    title="Xóa khỏi công việc"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        )}
      </Card>

      {/* Modal thêm nhân viên theo phòng ban */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Danh sách nhân viên khả dụng trong phòng ban"
        size="lg"
      >
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo mã NV hoặc Tên..."
              value={searchNV}
              onChange={(e) => setSearchNV(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="max-h-[400px] overflow-auto border rounded-lg">
            {nhanVienChuaGiao.length === 0 ? (
              <div className="p-8 text-center text-slate-400 italic">
                Tất cả nhân viên trong phòng ban đã được phân công hoặc không
                tìm thấy kết quả.
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-slate-50 sticky top-0 shadow-sm">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">
                      Mã NV
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">
                      Họ tên
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-600">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {nhanVienChuaGiao.map((nv) => (
                    <tr
                      key={nv.MaNV}
                      className="border-b last:border-0 hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-4 py-3 font-medium">{nv.MaNV}</td>
                      <td className="px-4 py-3">{nv.HoTen}</td>
                      <td className="px-4 py-3 flex justify-center gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                          onClick={() => handleXemKinhNghiem(nv)}
                        >
                          <Eye className="w-3.5 h-3.5 mr-1" />
                          Chi tiết
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleAddNhanVien(nv.MaNV!)}
                        >
                          <Plus className="w-3.5 h-3.5 mr-1" />
                          Thêm
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="flex justify-end pt-4 border-t">
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Đóng
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal xem kinh nghiệm */}
      <Modal
        isOpen={showKinhNghiemModal}
        onClose={() => {
          setShowKinhNghiemModal(false);
          setSelectedNvKinhNghiem(null);
          setKinhNghiemList([]);
        }}
        title={`Kinh nghiệm làm việc: ${selectedNvKinhNghiem?.HoTen || ''}`}
        size="lg"
      >
        <div className="space-y-4">
          {loadingKinhNghiem ? (
            <div className="p-8 text-center text-slate-500">
              Đang tải dữ liệu...
            </div>
          ) : kinhNghiemList.length === 0 ? (
            <div className="p-8 text-center text-slate-400 italic">
              Nhân viên này chưa có thông tin kinh nghiệm làm việc
            </div>
          ) : (
            <div className="space-y-4 max-h-[500px] overflow-auto">
              {kinhNghiemList.map((kn) => (
                <div
                  key={kn.MaKN}
                  className="border rounded-lg p-4 bg-slate-50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-indigo-700">
                        {kn.TenCongTy || 'Không có thông tin'}
                      </p>
                      <p className="text-sm text-slate-600">
                        {kn.ViTriCongViec || 'Không có thông tin'}
                      </p>
                    </div>
                    <Badge variant="info">
                      {kn.NgayBatDau?.split('T')[0]} -{' '}
                      {kn.NgayKetThuc?.split('T')[0] || 'Hiện tại'}
                    </Badge>
                  </div>
                  {kn.MoTaCongViec && (
                    <p className="text-sm text-slate-600 mt-2">
                      <span className="font-medium">Mô tả công việc:</span>{' '}
                      {kn.MoTaCongViec}
                    </p>
                  )}
                  {kn.CongNgheSuDung && (
                    <p className="text-sm text-slate-600 mt-1">
                      <span className="font-medium">Công nghệ:</span>{' '}
                      {kn.CongNgheSuDung}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-end pt-4 mt-4 border-t">
            <Button
              variant="secondary"
              onClick={() => setShowKinhNghiemModal(false)}
            >
              Đóng
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
