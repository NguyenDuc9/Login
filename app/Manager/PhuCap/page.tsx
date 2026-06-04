'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Search, Gift, DollarSign } from 'lucide-react';
import { Button, Modal, Table, TableRow, TableCell, Input, Card } from '@/components/ui';

import {
  getAllPhuCap,
  createPhuCap,
  updatePhuCap,
  deletePhuCap,
} from '@/service/PhuCap.api';
import PhuCap from '@/service/PhuCap.api';

export default function PhuCapPage() {
  const [data, setData] = useState<PhuCap[]>([]);
  const [search, setSearch] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState<PhuCap>({
    MaPhuCap: '',
    MaNV: '',
    TenPhuCap: '',
    SoTien: '',
  });

  const loadData = async () => {
    const result = await getAllPhuCap();
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEdit) {
      await updatePhuCap(form.MaPhuCap, form);
    } else {
      await createPhuCap(form);
    }

    setShowForm(false);
    setIsEdit(false);

    setForm({
      MaPhuCap: '',
      MaNV: '',
      TenPhuCap: '',
      SoTien: '',
    });

    loadData();
  };

  const handleEdit = (item: PhuCap) => {
    setForm(item);
    setIsEdit(true);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc muốn xóa?')) {
      await deletePhuCap(id);
      loadData();
    }
  };

  const filtered = data.filter(
    (item) =>
      item.MaPhuCap?.toLowerCase().includes(search.toLowerCase()) ||
      item.TenPhuCap?.toLowerCase().includes(search.toLowerCase()) ||
      item.MaNV?.toLowerCase().includes(search.toLowerCase()),
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
          <h1 className="text-2xl font-bold text-slate-800">Quản lý phụ cấp</h1>
          <p className="text-slate-500 mt-1">Danh sách và quản lý phụ cấp nhân viên</p>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            setIsEdit(false);
            setShowForm(true);
            setForm({
              MaPhuCap: '',
              MaNV: '',
              TenPhuCap: '',
              SoTien: '',
            });
          }}
        >
          <Plus className="w-4 h-4" />
          Thêm phụ cấp
        </Button>
      </div>

      <Card className="!p-0">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm phụ cấp..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <Table headers={['Mã phụ cấp', 'Mã NV', 'Tên phụ cấp', 'Số tiền', 'Thao tác']}>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-12 text-center text-slate-400">
                <Gift className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p>Không tìm thấy phụ cấp nào</p>
              </td>
            </tr>
          ) : (
            filtered.map((item) => (
              <TableRow key={item.MaPhuCap}>
                <TableCell className="font-medium text-indigo-600">{item.MaPhuCap}</TableCell>
                <TableCell className="font-medium">{item.MaNV}</TableCell>
                <TableCell>{item.TenPhuCap}</TableCell>
                <TableCell className="text-emerald-600 font-medium">{formatCurrency(item.SoTien)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 rounded-lg hover:bg-indigo-100 text-indigo-600 transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.MaPhuCap)}
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
        title={isEdit ? 'Chỉnh sửa phụ cấp' : 'Thêm phụ cấp mới'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Mã phụ cấp"
            name="MaPhuCap"
            value={form.MaPhuCap}
            onChange={handleChange}
            placeholder="VD: PC001"
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
          <Input
            label="Tên phụ cấp"
            name="TenPhuCap"
            value={form.TenPhuCap}
            onChange={handleChange}
            placeholder="VD: Phụ cấp ăn trưa"
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
