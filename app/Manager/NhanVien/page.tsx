'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Search, Users, Phone, MapPin, Calendar } from 'lucide-react';
import { Button, Modal, Table, TableRow, TableCell, Input, Select, Card } from '@/components/ui';

import {
  getAllNhanVien,
  createNhanVien,
  updateNhanVien,
  deleteNhanVien,
  NhanVien,
} from '@/service/NhanVien.api';

export default function NhanVienPage() {
  const [data, setData] = useState<NhanVien[]>([]);
  const [search, setSearch] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

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

  // load data
  const loadData = async () => {
    const result = await getAllNhanVien();
    setData(result);
  };

  useEffect(() => {
    loadData();
  }, []);

  // input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // submit form
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

  // edit
  const handleEdit = (nv: NhanVien) => {
    setForm(nv);
    setIsEdit(true);
    setShowForm(true);
  };

  // delete
  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc muốn xóa nhân viên này?')) {
      await deleteNhanVien(id);
      loadData();
    }
  };

  // search
  const filtered = data.filter(
    (nv) =>
      nv.HoTen?.toLowerCase().includes(search.toLowerCase()) ||
      nv.MaNV?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý nhân viên</h1>
          <p className="text-slate-500 mt-1">Danh sách và quản lý thông tin nhân viên</p>
        </div>
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
                {data.filter(nv => nv.TrangThai === 'Dang lam').length}
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
                {data.filter(nv => nv.TrangThai === 'Da nghi').length}
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
            headers={['Mã NV', 'Họ tên', 'Ngày sinh', 'Giới tính', 'Điện thoại', 'Địa chỉ', 'Phòng ban', 'Trạng thái', 'Thao tác']}
          >
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center gap-2">
                    <Users className="w-12 h-12 text-slate-300" />
                    <p>Không tìm thấy nhân viên nào</p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((nv) => (
                <TableRow key={nv.MaNV}>
                  <TableCell className="font-medium text-indigo-600">{nv.MaNV}</TableCell>
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
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      nv.GioiTinh === 'Nam' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
                    }`}>
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
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      nv.TrangThai === 'Dang lam' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {nv.TrangThai === 'Dang lam' ? 'Đang làm' : 'Đã nghỉ'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(nv)}
                        className="p-2 rounded-lg hover:bg-indigo-100 text-indigo-600 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(nv.MaNV)}
                        className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
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

      {/* Form Modal */}
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
              <label className="text-sm font-medium text-slate-700 block">Giới tính</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="GioiTinh"
                    value="Nam"
                    checked={form.GioiTinh === 'Nam'}
                    onChange={handleChange}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
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
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
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
            <Button variant="secondary" type="button" onClick={() => setShowForm(false)}>
              Hủy bỏ
            </Button>
            <Button variant="primary" type="submit">
              {isEdit ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
