'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Search, Gift, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { Button, Modal, Table, TableRow, TableCell, Input, Card, Badge } from '@/components/ui';

import {
  getAllThuongPhat,
  createThuongPhat,
  updateThuongPhat,
  deleteThuongPhat,
  ThuongPhat,
} from '@/service/ThuongPhat';

export default function ThuongPhatPage() {
  const [data, setData] = useState<ThuongPhat[]>([]);
  const [search, setSearch] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const emptyForm: ThuongPhat = {
    MaTP: '',
    MaNV: '',
    Thang: '',
    Nam: '',
    Loai: '',
    SoTien: '',
    LyDo: '',
  };

  const [form, setForm] = useState<ThuongPhat>(emptyForm);

  const loadData = async () => {
    const result = await getAllThuongPhat();
    setData(result);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEdit) {
      await updateThuongPhat(form.MaTP, form);
    } else {
      await createThuongPhat(form);
    }

    setShowForm(false);
    setIsEdit(false);
    setForm(emptyForm);

    loadData();
  };

  const handleEdit = (item: ThuongPhat) => {
    setForm(item);
    setIsEdit(true);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc muốn xóa?')) {
      await deleteThuongPhat(id);
      loadData();
    }
  };

  const filtered = data.filter(
    (item) =>
      item.MaNV?.toLowerCase().includes(search.toLowerCase()) ||
      item.MaTP?.toString().includes(search),
  );

  const formatCurrency = (value: string) => {
    const num = parseFloat(value) || 0;
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(num);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý thưởng phạt</h1>
          <p className="text-slate-500 mt-1">Danh sách thưởng và phạt nhân viên</p>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            setForm(emptyForm);
            setIsEdit(false);
            setShowForm(true);
          }}
        >
          <Plus className="w-4 h-4" />
          Thêm thưởng phạt
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="!p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-100">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Tổng thưởng</p>
              <p className="text-xl font-bold text-emerald-600">
                {formatCurrency(
                  data
                    .filter((item) => item.Loai === 'Thuong')
                    .reduce((sum, item) => sum + (parseFloat(item.SoTien) || 0), 0)
                )}
              </p>
            </div>
          </div>
        </Card>
        <Card className="!p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-red-100">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Tổng phạt</p>
              <p className="text-xl font-bold text-red-600">
                {formatCurrency(
                  data
                    .filter((item) => item.Loai === 'Phat')
                    .reduce((sum, item) => sum + (parseFloat(item.SoTien) || 0), 0)
                )}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="!p-0">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm theo mã nhân viên..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <Table headers={['Mã TP', 'Mã NV', 'Tháng', 'Năm', 'Loại', 'Số tiền', 'Lý do', 'Thao tác']}>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-12 text-center text-slate-400">
                <Gift className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p>Không tìm thấy bản ghi nào</p>
              </td>
            </tr>
          ) : (
            filtered.map((item) => (
              <TableRow key={item.MaTP}>
                <TableCell className="font-medium text-indigo-600">{item.MaTP}</TableCell>
                <TableCell className="font-medium">{item.MaNV}</TableCell>
                <TableCell>{item.Thang}</TableCell>
                <TableCell>{item.Nam}</TableCell>
                <TableCell>
                  <Badge variant={item.Loai === 'Thuong' ? 'success' : 'danger'} size="sm">
                    {item.Loai === 'Thuong' ? (
                      <><TrendingUp className="w-3 h-3 mr-1" />Thưởng</>
                    ) : (
                      <><TrendingDown className="w-3 h-3 mr-1" />Phạt</>
                    )}
                  </Badge>
                </TableCell>
                <TableCell className={item.Loai === 'Thuong' ? 'text-emerald-600 font-medium' : 'text-red-600 font-medium'}>
                  {formatCurrency(item.SoTien)}
                </TableCell>
                <TableCell>
                  <span className="truncate max-w-[150px] block" title={item.LyDo}>
                    {item.LyDo}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 rounded-lg hover:bg-indigo-100 text-indigo-600 transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.MaTP)}
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
      </Card>

      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={isEdit ? 'Chỉnh sửa thưởng phạt' : 'Thêm thưởng phạt'}
        size="md"
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
            />
            <Input
              label="Tháng"
              name="Thang"
              type="number"
              min="1"
              max="12"
              value={form.Thang}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Input
              label="Năm"
              name="Nam"
              type="number"
              min="2000"
              max="2100"
              value={form.Nam}
              onChange={handleChange}
              required
            />
            <Input
              label="Số tiền"
              name="SoTien"
              type="number"
              value={form.SoTien}
              onChange={handleChange}
              placeholder="VD: 500000"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 block">Loại</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="Loai"
                  value="Thuong"
                  checked={form.Loai === 'Thuong'}
                  onChange={handleChange}
                  className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-slate-700">Thưởng</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="Loai"
                  value="Phat"
                  checked={form.Loai === 'Phat'}
                  onChange={handleChange}
                  className="w-4 h-4 text-red-600 focus:ring-red-500"
                />
                <span className="text-sm text-slate-700">Phạt</span>
              </label>
            </div>
          </div>

          <Input
            label="Lý do"
            name="LyDo"
            value={form.LyDo}
            onChange={handleChange}
            placeholder="Nhập lý do thưởng/phạt"
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
