'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Search, DollarSign, Calendar, TrendingUp } from 'lucide-react';
import { Button, Modal, Table, TableRow, TableCell, Input, Card } from '@/components/ui';

import {
  getAllLuong,
  createLuong,
  updateLuong,
  deleteLuong,
  Luong,
} from '@/service/Luong.api';

export default function LuongPage() {
  const [data, setData] = useState<Luong[]>([]);
  const [search, setSearch] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState<Luong>({
    MaLuong: 0,
    MaNV: '',
    Thang: 0,
    Nam: 0,
    LuongCoBan: 0,
    TienNgayCong: 0,
    TongPhuCap: 0,
    TienTangCa: 0,
    TongThuong: 0,
    TongPhat: 0,
    BaoHiem: 0,
    LuongThucNhan: 0,
    NgayTinhLuong: '',
  });

  // load data
  const loadData = async () => {
    const result = await getAllLuong();
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
      await updateLuong(form.MaLuong, form);
    } else {
      await createLuong(form);
    }

    setShowForm(false);
    setIsEdit(false);

    setForm({
      MaLuong: 0,
      MaNV: '',
      Thang: 0,
      Nam: 0,
      LuongCoBan: 0,
      TienNgayCong: 0,
      TongPhuCap: 0,
      TienTangCa: 0,
      TongThuong: 0,
      TongPhat: 0,
      BaoHiem: 0,
      LuongThucNhan: 0,
      NgayTinhLuong: '',
    });

    loadData();
  };

  // edit
  const handleEdit = (luong: Luong) => {
    setForm(luong);
    setIsEdit(true);
    setShowForm(true);
  };

  // delete
  const handleDelete = async (id: number) => {
    if (confirm('Bạn có chắc muốn xóa bản ghi lương này?')) {
      await deleteLuong(id);
      loadData();
    }
  };

  // format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  // search
  const filtered = data.filter(
    (l) =>
      l.MaLuong?.toString().toLowerCase().includes(search.toLowerCase()) ||
      l.MaNV?.toLowerCase().includes(search.toLowerCase()),
  );

  // stats
  const totalSalary = data.reduce((sum, l) => sum + (l.LuongThucNhan || 0), 0);
  const avgSalary = data.length > 0 ? totalSalary / data.length : 0;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý lương</h1>
          <p className="text-slate-500 mt-1">Danh sách và quản lý thông tin lương nhân viên</p>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            setIsEdit(false);
            setShowForm(true);
            setForm({
              MaLuong: 0,
              MaNV: '',
              Thang: 0,
              Nam: 0,
              LuongCoBan: 0,
              TienNgayCong: 0,
              TongPhuCap: 0,
              TienTangCa: 0,
              TongThuong: 0,
              TongPhat: 0,
              BaoHiem: 0,
              LuongThucNhan: 0,
              NgayTinhLuong: '',
            });
          }}
        >
          <Plus className="w-4 h-4" />
          Thêm bảng lương
        </Button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="!p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-100">
              <DollarSign className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Tổng lương đã chi</p>
              <p className="text-xl font-bold text-slate-800">{formatCurrency(totalSalary)}</p>
            </div>
          </div>
        </Card>
        <Card className="!p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-100">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Lương trung bình</p>
              <p className="text-xl font-bold text-slate-800">{formatCurrency(avgSalary)}</p>
            </div>
          </div>
        </Card>
        <Card className="!p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-indigo-100">
              <Calendar className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Tổng bản ghi</p>
              <p className="text-xl font-bold text-slate-800">{data.length}</p>
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
              placeholder="Tìm kiếm theo mã lương hoặc mã nhân viên..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table 
            headers={['Mã lương', 'Mã NV', 'Tháng', 'Năm', 'Lương CB', 'Ngày công', 'Phụ cấp', 'Tăng ca', 'Thưởng', 'Phạt', 'Bảo hiểm', 'Thực nhận', 'Ngày tính', 'Thao tác']}
          >
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={14} className="px-4 py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center gap-2">
                    <DollarSign className="w-12 h-12 text-slate-300" />
                    <p>Không tìm thấy bản ghi nào</p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((l) => (
                <TableRow key={l.MaLuong}>
                  <TableCell className="font-medium text-indigo-600">{l.MaLuong}</TableCell>
                  <TableCell className="font-medium">{l.MaNV}</TableCell>
                  <TableCell>{l.Thang}</TableCell>
                  <TableCell>{l.Nam}</TableCell>
                  <TableCell className="text-emerald-600 font-medium">{formatCurrency(l.LuongCoBan)}</TableCell>
                  <TableCell>{formatCurrency(l.TienNgayCong)}</TableCell>
                  <TableCell className="text-blue-600">{formatCurrency(l.TongPhuCap)}</TableCell>
                  <TableCell>{formatCurrency(l.TienTangCa)}</TableCell>
                  <TableCell className="text-emerald-600">{formatCurrency(l.TongThuong)}</TableCell>
                  <TableCell className={l.TongPhat > 0 ? 'text-red-600' : ''}>{formatCurrency(l.TongPhat)}</TableCell>
                  <TableCell className="text-slate-500">{formatCurrency(l.BaoHiem)}</TableCell>
                  <TableCell>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                      {formatCurrency(l.LuongThucNhan)}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-500">{l.NgayTinhLuong}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(l)}
                        className="p-2 rounded-lg hover:bg-indigo-100 text-indigo-600 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(l.MaLuong)}
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
        title={isEdit ? 'Chỉnh sửa lương' : 'Thêm bảng lương mới'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Input
              label="Mã lương"
              name="MaLuong"
              type="number"
              value={form.MaLuong || ''}
              onChange={handleChange}
              required
              disabled={isEdit}
            />
            <Input
              label="Mã nhân viên"
              name="MaNV"
              value={form.MaNV}
              onChange={handleChange}
              placeholder="VD: NV001"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Input
              label="Tháng"
              name="Thang"
              type="number"
              min="1"
              max="12"
              value={form.Thang || ''}
              onChange={handleChange}
              required
            />
            <Input
              label="Năm"
              name="Nam"
              type="number"
              min="2000"
              max="2100"
              value={form.Nam || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-6">
            <Input
              label="Lương cơ bản"
              name="LuongCoBan"
              type="number"
              value={form.LuongCoBan || ''}
              onChange={handleChange}
              required
            />
            <Input
              label="Tiền ngày công"
              name="TienNgayCong"
              type="number"
              value={form.TienNgayCong || ''}
              onChange={handleChange}
            />
            <Input
              label="Phụ cấp"
              name="TongPhuCap"
              type="number"
              value={form.TongPhuCap || ''}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-3 gap-6">
            <Input
              label="Tăng ca"
              name="TienTangCa"
              type="number"
              value={form.TienTangCa || ''}
              onChange={handleChange}
            />
            <Input
              label="Thưởng"
              name="TongThuong"
              type="number"
              value={form.TongThuong || ''}
              onChange={handleChange}
            />
            <Input
              label="Phạt"
              name="TongPhat"
              type="number"
              value={form.TongPhat || ''}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Input
              label="Bảo hiểm"
              name="BaoHiem"
              type="number"
              value={form.BaoHiem || ''}
              onChange={handleChange}
            />
            <Input
              label="Lương thực nhận"
              name="LuongThucNhan"
              type="number"
              value={form.LuongThucNhan || ''}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            label="Ngày tính lương"
            name="NgayTinhLuong"
            type="date"
            value={form.NgayTinhLuong}
            onChange={handleChange}
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
