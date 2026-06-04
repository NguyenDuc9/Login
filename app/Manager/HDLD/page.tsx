'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Search, FileText, Calendar } from 'lucide-react';
import { Button, Modal, Table, TableRow, TableCell, Input, Card } from '@/components/ui';

import {
  getAllHDLD,
  createHDLD,
  updateHDLD,
  deleteHDLD,
} from '@/service/HDLD.api';
import HDLD from '@/service/HDLD.api';

export default function HDLDPage() {
  const [data, setData] = useState<HDLD[]>([]);
  const [search, setSearch] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState<HDLD>({
    MaHD: '',
    MaNV: '',
    LuongCoBan: '',
    NgayBatDau: '',
    NgayKetThuc: '',
  });

  const loadData = async () => {
    const result = await getAllHDLD();
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
      await updateHDLD(form.MaHD, form);
    } else {
      await createHDLD(form);
    }

    setShowForm(false);
    setIsEdit(false);

    setForm({
      MaHD: '',
      MaNV: '',
      LuongCoBan: '',
      NgayBatDau: '',
      NgayKetThuc: '',
    });

    loadData();
  };

  const handleEdit = (item: HDLD) => {
    setForm(item);
    setIsEdit(true);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc muốn xóa?')) {
      await deleteHDLD(id);
      loadData();
    }
  };

  const filtered = data.filter(
    (item) =>
      item.MaHD?.toLowerCase().includes(search.toLowerCase()) ||
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
          <h1 className="text-2xl font-bold text-slate-800">Quản lý hợp đồng lao động</h1>
          <p className="text-slate-500 mt-1">Danh sách và quản lý hợp đồng lao động</p>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            setIsEdit(false);
            setShowForm(true);
            setForm({
              MaHD: '',
              MaNV: '',
              LuongCoBan: '',
              NgayBatDau: '',
              NgayKetThuc: '',
            });
          }}
        >
          <Plus className="w-4 h-4" />
          Thêm hợp đồng
        </Button>
      </div>

      <Card className="!p-0">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm hợp đồng..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <Table headers={['Mã hợp đồng', 'Mã NV', 'Lương cơ bản', 'Ngày bắt đầu', 'Ngày kết thúc', 'Thao tác']}>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-12 text-center text-slate-400">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p>Không tìm thấy hợp đồng nào</p>
              </td>
            </tr>
          ) : (
            filtered.map((item) => (
              <TableRow key={item.MaHD}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-indigo-100">
                      <FileText className="w-4 h-4 text-indigo-600" />
                    </div>
                    <span className="font-medium text-indigo-600">{item.MaHD}</span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{item.MaNV}</TableCell>
                <TableCell className="text-emerald-600 font-medium">{formatCurrency(item.LuongCoBan)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="w-4 h-4" />
                    {item.NgayBatDau}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="w-4 h-4" />
                    {item.NgayKetThuc}
                  </div>
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
                      onClick={() => handleDelete(item.MaHD)}
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
        title={isEdit ? 'Chỉnh sửa hợp đồng' : 'Thêm hợp đồng mới'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Mã hợp đồng"
            name="MaHD"
            value={form.MaHD}
            onChange={handleChange}
            placeholder="VD: HD001"
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
            label="Lương cơ bản"
            name="LuongCoBan"
            type="number"
            value={form.LuongCoBan}
            onChange={handleChange}
            placeholder="VD: 15000000"
            required
          />
          <div className="grid grid-cols-2 gap-6">
            <Input
              label="Ngày bắt đầu"
              name="NgayBatDau"
              type="date"
              value={form.NgayBatDau}
              onChange={handleChange}
              required
            />
            <Input
              label="Ngày kết thúc"
              name="NgayKetThuc"
              type="date"
              value={form.NgayKetThuc}
              onChange={handleChange}
            />
          </div>

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
