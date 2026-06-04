'use client';

import { useEffect, useState } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Users,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Award,
  ShieldAlert,
  Clock,
  Building,
  TrendingUp,
  FileSpreadsheet,
  Eye,
  X,
} from 'lucide-react';
import {
  Button,
  Modal,
  Table,
  TableRow,
  TableCell,
  Input,
  Select,
  Card,
} from '@/components/ui';

import {
  getAllNhanVien,
  getChiTietNhanVien,
  createNhanVien,
  updateNhanVien,
  deleteNhanVien,
  NhanVien,
} from '@/service/NhanVien.api';

// Kiểu dữ liệu từ API chi tiết hiệu suất viên
interface ChiTietPerformance {
  MaNV: string;
  HoTen: string;
  TenPhongBan: string;
  ThoiGianLamViec: number;
  SoLanThuong: number;
  SoLanPhat: number;
}

export default function NhanVienPage() {
  const [data, setData] = useState<NhanVien[]>([]);
  const [search, setSearch] = useState('');

  // States cho Form Thêm/Sửa nhân viên chính
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // States cho Modal Xem chi tiết hiệu suất cá nhân
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [selectedDetail, setSelectedDetail] =
    useState<ChiTietPerformance | null>(null);

  // States quản lý Danh sách tăng lương (Local Storage)
  const [showSalaryListModal, setShowSalaryListModal] = useState(false);
  const [salaryList, setSalaryList] = useState<ChiTietPerformance[]>([]);

  const [form, setForm] = useState<NhanVien>({
    MaNV: '',
    HoTen: '',
    NgaySinh: '',
    GioiTinh: '',
    DienThoai: '',
    DiaChi: '',
    MaPhongBan: '',
    TrangThai: 'Dang lam',
  });

  // Tải dữ liệu ban đầu & danh sách từ LocalStorage
  const loadData = async () => {
    const result = await getAllNhanVien();
    setData(result);
  };

  useEffect(() => {
    loadData();
    // Lấy danh sách tăng lương từ localStorage khi render lần đầu
    const savedList = localStorage.getItem('danhSachTangLuong');
    if (savedList) {
      setSalaryList(JSON.parse(savedList));
    }
  }, []);

  // Hàm lưu danh sách tăng lương vào localStorage cục bộ
  const saveSalaryListToLocal = (newList: ChiTietPerformance[]) => {
    setSalaryList(newList);
    localStorage.setItem('danhSachTangLuong', JSON.stringify(newList));
  };

  // Thêm một nhân sự vào danh sách tăng lương
  const handleAddToSalaryList = (nvDetail: ChiTietPerformance) => {
    const isExisted = salaryList.some((item) => item.MaNV === nvDetail.MaNV);
    if (isExisted) {
      alert('Nhân viên này đã có sẵn trong danh sách đề xuất tăng lương!');
      return;
    }
    const updatedList = [...salaryList, nvDetail];
    saveSalaryListToLocal(updatedList);
    alert(
      `Đã thêm nhân viên ${nvDetail.HoTen} vào danh sách đề xuất tăng lương thành công.`,
    );
    setShowDetailModal(false); // Đóng modal chi tiết lại
  };

  // Xóa nhân sự khỏi danh sách tăng lương
  const handleRemoveFromSalaryList = (maNV: string) => {
    if (
      confirm(
        'Bạn có chắc chắn muốn xóa nhân viên này khỏi danh sách đề xuất tăng lương?',
      )
    ) {
      const updatedList = salaryList.filter((item) => item.MaNV !== maNV);
      saveSalaryListToLocal(updatedList);
    }
  };

  // HÀM XUẤT EXCEL ĐẸP (Không phụ thuộc thư viện nặng bên ngoài)
  const handleExportExcel = () => {
    if (salaryList.length === 0) {
      alert('Danh sách rỗng, không thể xuất file Excel!');
      return;
    }

    // Thiết lập cấu trúc giao diện bảng Excel bằng mã HTML phong cách Microsoft XML định dạng đẹp
    let excelTemplate = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
          .title { font-size: 16pt; font-weight: bold; text-align: center; color: #1e3a8a; height: 40px; }
          .header { background-color: #4f46e5; color: #ffffff; font-weight: bold; text-align: center; border: 0.5px solid #cccccc  }
          .cell { border: 0.5px solid #cccccc; padding: 5px; text-align: left; }
          .cell-center { border: 0.5px solid #cccccc; padding: 5px; text-align: center; }
          .cell-number { border: 0.5px solid #cccccc; padding: 5px; text-align: right; }
          .footer { font-style: italic; text-align: right; font-size: 10pt; color: #6b7280; }
        </style>
      </head>
      <body>
        <table>
          <tr><td colspan="6" class="title">DANH SÁCH ĐỀ XUẤT NHÂN VIÊN TĂNG LƯƠNG</td></tr>
          <tr><td colspan="6" class="footer">Ngày xuất bản: ${new Date().toLocaleDateString('vi-VN')}</td></tr>
          <tr><td colspan="6"></td></tr>
          <tr height="30">
            <th class="header" width="100">Mã NV</th>
            <th class="header" width="200">Họ và Tên</th>
            <th class="header" width="150">Tên Phòng Ban</th>
            <th class="header" width="150">Thời Gian Làm Việc (Tháng)</th>
            <th class="header" width="120">Số Lần Thưởng</th>
            <th class="header" width="120">Số Lần Phạt</th>
          </tr>
    `;

    salaryList.forEach((item) => {
      excelTemplate += `
        <tr height="25">
          <td class="cell-center" style="color: #4f46e5; font-weight: bold;">${item.MaNV}</td>
          <td class="cell" style="font-weight: 500;">${item.HoTen}</td>
          <td class="cell">${item.TenPhongBan || ''}</td>
          <td class="cell-number">${item.ThoiGianLamViec}</td>
          <td class="cell-number" style="color: #10b981; font-weight: bold;">${item.SoLanThuong}</td>
          <td class="cell-number" style="color: #ef4444;">${item.SoLanPhat}</td>
        </tr>
      `;
    });

    excelTemplate += `
        </table>
      </body>
      </html>
    `;

    // Tạo file Blob định dạng tệp Excel và tải xuống trực tiếp trên Browser
    const dataType = 'application/vnd.ms-excel';
    const blob = new Blob([excelTemplate], { type: dataType });
    const url = window.URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `Danh_Sach_Tang_Luong_${new Date().toISOString().slice(0, 10)}.xls`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // submit form thêm mới / cập nhật
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEdit) {
      await updateNhanVien(form.MaNV, form);
    } else {
      await createNhanVien(form);
    }
    setShowForm(false);
    setIsEdit(false);
    setForm({
      MaNV: '',
      HoTen: '',
      NgaySinh: '',
      GioiTinh: '',
      DienThoai: '',
      DiaChi: '',
      MaPhongBan: '',
      TrangThai: 'Dang lam',
    });
    loadData();
  };

  const handleEdit = (nv: NhanVien) => {
    setForm(nv);
    setIsEdit(true);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc muốn xóa nhân viên này?')) {
      await deleteNhanVien(id);
      loadData();
    }
  };

  // Xử lý xem báo cáo chi tiết hiệu suất
  const handleViewDetail = async (id: string) => {
    setDetailLoading(true);
    setSelectedDetail(null);
    setShowDetailModal(true);
    try {
      const response = await getChiTietNhanVien(id);
      if (response && response.length > 0) {
        setSelectedDetail(response[0]);
      }
    } catch (err) {
      alert('Không thể tải thông tin hiệu suất của nhân viên này.');
      setShowDetailModal(false);
    } finally {
      setDetailLoading(false);
    }
  };

  const filtered = data.filter(
    (nv) =>
      nv.HoTen?.toLowerCase().includes(search.toLowerCase()) ||
      nv.MaNV?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Quản lý nhân viên
          </h1>
          <p className="text-slate-500 mt-1">
            Danh sách và quản lý thông tin nhân viên
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* NÚT MỚI: Xem danh sách tăng lương lưu trữ tại LocalStorage */}
          <button
            onClick={() => setShowSalaryListModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors"
          >
            <TrendingUp className="w-4 h-4" />
            Đề xuất tăng lương ({salaryList.length})
          </button>

          <Button
            variant="primary"
            onClick={() => {
              setIsEdit(false);
              setShowForm(true);
              setForm({
                MaNV: '',
                HoTen: '',
                NgaySinh: '',
                GioiTinh: '',
                DienThoai: '',
                DiaChi: '',
                MaPhongBan: '',
                TrangThai: 'Dang lam',
              });
            }}
          >
            <Plus className="w-4 h-4" />
            Thêm nhân viên
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="!p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-100">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Tổng nhân viên</p>
              <p className="text-2xl font-bold text-slate-800">{data.length}</p>
            </div>
          </div>
        </Card>
        <Card className="!p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-100">
              <Users className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Đang làm việc</p>
              <p className="text-2xl font-bold text-slate-800">
                {data.filter((nv) => nv.TrangThai === 'Dang lam').length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="!p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-100">
              <Users className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Đã nghỉ việc</p>
              <p className="text-2xl font-bold text-slate-800">
                {data.filter((nv) => nv.TrangThai === 'Da nghi').length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and filter */}
      <Card className="!p-0">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo mã hoặc tên nhân viên..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table
            headers={[
              'Mã NV',
              'Họ tên',
              'Ngày sinh',
              'Giới tính',
              'Điện thoại',
              'Địa chỉ',
              'Phòng ban',
              'Trạng thái',
              'Thao tác',
            ]}
          >
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="px-4 py-12 text-center text-slate-400"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Users className="w-12 h-12 text-slate-300" />
                    <p>Không tìm thấy nhân viên nào</p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((nv) => (
                <TableRow key={nv.MaNV}>
                  <TableCell className="font-medium text-indigo-600">
                    {nv.MaNV}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                        {nv.HoTen?.charAt(0) || 'N'}
                      </div>
                      <span className="font-medium">{nv.HoTen}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {nv.NgaySinh}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        nv.GioiTinh === 'Nam'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-pink-100 text-pink-700'
                      }`}
                    >
                      {nv.GioiTinh}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400" />
                      {nv.DienThoai}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 max-w-[150px]">
                      <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span className="truncate">{nv.DiaChi}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                      {nv.MaPhongBan}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        nv.TrangThai === 'Dang lam'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {nv.TrangThai === 'Dang lam' ? 'Đang làm' : 'Đã nghỉ'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {/* Nút Xem Hồ Sơ Hiệu Suất để có thể thêm vào danh sách tăng lương */}
                      <button
                        onClick={() => handleViewDetail(nv.MaNV)}
                        className="p-2 rounded-lg hover:bg-slate-100 text-indigo-600 transition-colors"
                        title="Xem chi tiết hiệu suất & Thêm tăng lương"
                      >
                        <FileText className="w-4 h-4 text-indigo-500" />
                      </button>

                      <button
                        onClick={() => handleEdit(nv)}
                        className="p-2 rounded-lg hover:bg-indigo-100 text-indigo-600 transition-colors"
                        title="Sửa thông tin"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(nv.MaNV)}
                        className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                        title="Xóa nhân sự"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </Table>
        </div>
      </Card>

      {/* MODAL 1: XEM CHI TIẾT HIỆU SUẤT VÀ NÚT THÊM VÀO DANH SÁCH TĂNG LƯƠNG */}
      <Modal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title="Thông tin chi tiết hiệu suất"
        size="md"
      >
        {detailLoading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-medium">Đang truy xuất dữ liệu...</p>
          </div>
        ) : selectedDetail ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-black text-xl shadow-sm">
                {selectedDetail.HoTen?.charAt(0) || 'N'}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedDetail.HoTen}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                  <span className="font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-bold">
                    {selectedDetail.MaNV}
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    Phòng ban: {selectedDetail.TenPhongBan || 'Chưa rõ'}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-slate-600">
                    Thời gian làm việc
                  </span>
                </div>
                <span className="text-base font-bold text-slate-800">
                  {selectedDetail.ThoiGianLamViec} tháng
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-slate-600">
                    Số lần được khen thưởng
                  </span>
                </div>
                <span className="text-base font-bold text-emerald-600">
                  {selectedDetail.SoLanThuong} lần
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-rose-50 text-rose-600 rounded-lg">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-slate-600">
                    Số lần bị kỷ luật / phạt
                  </span>
                </div>
                <span
                  className={`text-base font-bold ${selectedDetail.SoLanPhat > 0 ? 'text-rose-600' : 'text-slate-800'}`}
                >
                  {selectedDetail.SoLanPhat} lần
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              {/* NÚT THÊM VÀO DANH SÁCH TĂNG LƯƠNG */}
              <button
                onClick={() => handleAddToSalaryList(selectedDetail)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-xl transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Thêm vào DS tăng lương
              </button>
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-all"
              >
                Đóng
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-sm py-6 text-slate-400">
            Không có dữ liệu chi tiết.
          </p>
        )}
      </Modal>

      {/* MODAL 2: GIAO DIỆN XEM DANH SÁCH TĂNG LƯƠNG, XOÁ NHÂN VIÊN VÀ XUẤT EXCEL ĐẸP */}
      <Modal
        isOpen={showSalaryListModal}
        onClose={() => setShowSalaryListModal(false)}
        title="Danh sách đề xuất xét duyệt tăng lương"
        size="lg"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-sm text-slate-600 font-medium">
              Tổng cộng có <strong>{salaryList.length}</strong> nhân sự được đề
              xuất.
            </span>

            {/* NÚT XUẤT FILE EXCEL ĐẸP */}
            <button
              onClick={handleExportExcel}
              disabled={salaryList.length === 0}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Xuất Excel Đẹp
            </button>
          </div>

          <div className="overflow-hidden border border-slate-100 rounded-xl max-h-[350px] overflow-y-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-700 uppercase bg-slate-100 sticky top-0">
                <tr>
                  <th className="px-4 py-3">Mã NV</th>
                  <th className="px-4 py-3">Họ Tên</th>
                  <th className="px-4 py-3">Phòng Ban</th>
                  <th className="px-4 py-3 text-center">Thưởng</th>
                  <th className="px-4 py-3 text-center">Phạt</th>
                  <th className="px-4 py-3 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {salaryList.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-slate-400 italic"
                    >
                      Chưa có nhân viên nào được thêm vào danh sách tăng lương.
                    </td>
                  </tr>
                ) : (
                  salaryList.map((item) => (
                    <tr key={item.MaNV} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-indigo-600">
                        {item.MaNV}
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-800">
                        {item.HoTen}
                      </td>
                      <td className="px-4 py-3 text-slate-500">
                        {item.TenPhongBan || 'Chưa rõ'}
                      </td>
                      <td className="px-4 py-3 text-center text-emerald-600 font-bold">
                        {item.SoLanThuong}
                      </td>
                      <td className="px-4 py-3 text-center text-rose-500">
                        {item.SoLanPhat}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {/* NÚT XOÁ NHÂN VIÊN KHỎI DANH SÁCH TĂNG LƯƠNG */}
                        <button
                          onClick={() => handleRemoveFromSalaryList(item.MaNV)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                          title="Xóa khỏi danh sách"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end pt-2 border-t border-slate-100">
            <button
              onClick={() => setShowSalaryListModal(false)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl"
            >
              Đóng lại
            </button>
          </div>
        </div>
      </Modal>

      {/* FORM MODAL: THÊM / SỬA NHÂN VIÊN CHÍNH */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={isEdit ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên mới'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Input
              label="Mã nhân viên"
              name="MaNV"
              value={form.MaNV}
              onChange={handleChange}
              placeholder="VD: NV001"
              required
              disabled={isEdit}
            />
            <Input
              label="Họ tên"
              name="HoTen"
              value={form.HoTen}
              onChange={handleChange}
              placeholder="Nhập họ tên đầy đủ"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Input
              label="Ngày sinh"
              name="NgaySinh"
              type="date"
              value={form.NgaySinh}
              onChange={handleChange}
              required
            />
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 block">
                Giới tính
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="GioiTinh"
                    value="Nam"
                    checked={form.GioiTinh === 'Nam'}
                    onChange={handleChange}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <span className="text-sm text-slate-700">Nam</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="GioiTinh"
                    value="Nu"
                    checked={form.GioiTinh === 'Nu'}
                    onChange={handleChange}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <span className="text-sm text-slate-700">Nữ</span>
                </label>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Input
              label="Số điện thoại"
              name="DienThoai"
              value={form.DienThoai}
              onChange={handleChange}
              placeholder="VD: 0123456789"
              required
            />
            <Input
              label="Mã phòng ban"
              name="MaPhongBan"
              value={form.MaPhongBan}
              onChange={handleChange}
              placeholder="VD: PB001"
              required
            />
          </div>
          <Input
            label="Địa chỉ"
            name="DiaChi"
            value={form.DiaChi}
            onChange={handleChange}
            placeholder="Nhập địa chỉ đầy đủ"
          />
          <Select
            label="Trạng thái"
            name="TrangThai"
            value={form.TrangThai}
            onChange={handleChange}
            options={[
              { value: 'Dang lam', label: 'Đang làm việc' },
              { value: 'Da nghi', label: 'Đã nghỉ việc' },
            ]}
          />
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm rounded-xl"
              type="button"
              onClick={() => setShowForm(false)}
            >
              Hủy bỏ
            </button>
            <Button variant="primary" type="submit">
              {isEdit ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
