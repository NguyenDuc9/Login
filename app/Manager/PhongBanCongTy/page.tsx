'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Search, Building2 } from 'lucide-react';
import { Button, Modal, Table, TableRow, TableCell, Input, Card } from '@/components/ui';

import {
  getAllPhongBan,
  createPhongBan,
  updatePhongBan,
  deletePhongBan,
} from '@/service/PhongBan.api';
import PhongBan from '@/service/PhongBan.api';

export default function PhongBanPage() {
  const [data, setData] = useState<PhongBan[]>([]);
  const [search, setSearch] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState<PhongBan>({
    MaPhongBan: '',
    TenPhongBan: '',
  });

  // load data
  const loadData = async () => {
    const result = await getAllPhongBan();
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
      await updatePhongBan(form.MaPhongBan, form);
    } else {
      await createPhongBan(form);
    }

    setShowForm(false);
    setIsEdit(false);

    setForm({
      MaPhongBan: '',
      TenPhongBan: '',
    });

    loadData();
  };

  // edit
  const handleEdit = (pb: PhongBan) => {
    setForm(pb);
    setIsEdit(true);
    setShowForm(true);
  };

  // delete
  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc muốn xóa phòng ban này?')) {
      await deletePhongBan(id);
      loadData();
    }
  };

  // search
  const filtered = data.filter(
    (pb) =>
      pb.MaPhongBan?.toLowerCase().includes(search.toLowerCase()) ||
      pb.TenPhongBan?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý phòng ban</h1>
          <p className="text-slate-500 mt-1">Danh sách và quản lý thông tin phòng ban</p>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            setIsEdit(false);
            setShowForm(true);
            setForm({
              MaPhongBan: '',
              TenPhongBan: '',
            });
          }}
        >
          <Plus className="w-4 h-4" />
          Thêm phòng ban
        </Button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="!p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-indigo-100">
              <Building2 className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Tổng số phòng ban</p>
              <p className="text-2xl font-bold text-slate-800">{data.length}</p>
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
              placeholder="Tìm kiếm phòng ban..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table 
            headers={['Mã phòng ban', 'Tên phòng ban', 'Thao tác']}
          >
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center gap-2">
                    <Building2 className="w-12 h-12 text-slate-300" />
                    <p>Không tìm thấy phòng ban nào</p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((pb) => (
                <TableRow key={pb.MaPhongBan}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium text-indigo-600">{pb.MaPhongBan}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-slate-800">{pb.TenPhongBan}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(pb)}
                        className="p-2 rounded-lg hover:bg-indigo-100 text-indigo-600 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(pb.MaPhongBan)}
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
        title={isEdit ? 'Chỉnh sửa phòng ban' : 'Thêm phòng ban mới'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Mã phòng ban"
            name="MaPhongBan"
            value={form.MaPhongBan}
            onChange={handleChange}
            placeholder="VD: PB001"
            required
            disabled={isEdit}
          />
          <Input
            label="Tên phòng ban"
            name="TenPhongBan"
            value={form.TenPhongBan}
            onChange={handleChange}
            placeholder="VD: Phòng Nhân sự"
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
