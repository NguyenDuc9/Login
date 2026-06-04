'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Search, Users, Shield } from 'lucide-react';
import {
  Button,
  Modal,
  Table,
  TableRow,
  TableCell,
  Input,
  Card,
  Badge,
} from '@/components/ui';

import {
  getAllTaiKhoan,
  createTaiKhoan,
  updateTaiKhoan,
  deleteTaiKhoan,
  TaiKhoan,
} from '@/service/TaiKhoan.api';

export default function TaiKhoanPage() {
  const [data, setData] = useState<TaiKhoan[]>([]);
  const [search, setSearch] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState<TaiKhoan>({
    TenDangNhap: '',
    MatKhau: '',
    MaNV: '',
    VaiTro: '',
  });

  const loadData = async () => {
    const result = await getAllTaiKhoan();
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
      await updateTaiKhoan(form.TenDangNhap, form);
    } else {
      await createTaiKhoan(form);
    }

    setShowForm(false);
    setIsEdit(false);

    setForm({
      TenDangNhap: '',
      MatKhau: '',
      MaNV: '',
      VaiTro: '',
    });

    loadData();
  };

  const handleEdit = (tk: TaiKhoan) => {
    setForm(tk);
    setIsEdit(true);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc muốn xóa tài khoản này?')) {
      await deleteTaiKhoan(id);
      loadData();
    }
  };

  const filtered = data.filter(
    (tk) =>
      tk.TenDangNhap?.toLowerCase().includes(search.toLowerCase()) ||
      tk.MaNV?.toLowerCase().includes(search.toLowerCase()),
  );

  const getRoleBadge = (vaiTro: string) => {
    switch (vaiTro?.toLowerCase()) {
      case 'admin':
        return (
          <Badge variant="danger" size="sm">
            Admin
          </Badge>
        );
      case 'manager':
        return (
          <Badge variant="warning" size="sm">
            Quản lý
          </Badge>
        );
      case 'staff':
        return (
          <Badge variant="success" size="sm">
            Nhân viên
          </Badge>
        );
      default:
        return (
          <Badge variant="default" size="sm">
            {vaiTro}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Quản lý tài khoản
          </h1>
          <p className="text-slate-500 mt-1">
            Danh sách và quản lý tài khoản người dùng
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            setIsEdit(false);
            setShowForm(true);
            setForm({
              TenDangNhap: '',
              MatKhau: '',
              MaNV: '',
              VaiTro: '',
            });
          }}
        >
          <Plus className="w-4 h-4" />
          Thêm tài khoản
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="!p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-indigo-100">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Tổng tài khoản</p>
              <p className="text-2xl font-bold text-slate-800">{data.length}</p>
            </div>
          </div>
        </Card>
        <Card className="!p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-100">
              <Shield className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Quản lý</p>
              <p className="text-2xl font-bold text-slate-800">
                {
                  data.filter((tk) => tk.VaiTro?.toLowerCase() === 'manager')
                    .length
                }
              </p>
            </div>
          </div>
        </Card>
        <Card className="!p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-100">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Nhân viên</p>
              <p className="text-2xl font-bold text-slate-800">
                {
                  data.filter((tk) => tk.VaiTro?.toLowerCase() === 'staff')
                    .length
                }
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
              placeholder="Tìm kiếm tài khoản..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <Table
          headers={['Tên đăng nhập', 'Mã nhân viên', 'Vai trò', 'Thao tác']}
        >
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-12 text-center text-slate-400">
                <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p>Không tìm thấy tài khoản nào</p>
              </td>
            </tr>
          ) : (
            filtered.map((tk) => (
              <TableRow key={tk.TenDangNhap}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {tk.TenDangNhap?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="font-medium text-slate-800">
                      {tk.TenDangNhap}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{tk.MaNV}</TableCell>
                <TableCell>{getRoleBadge(tk.VaiTro)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(tk)}
                      className="p-2 rounded-lg hover:bg-indigo-100 text-indigo-600 transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(tk.TenDangNhap)}
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
        title={isEdit ? 'Chỉnh sửa tài khoản' : 'Thêm tài khoản mới'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Tên đăng nhập"
            name="TenDangNhap"
            value={form.TenDangNhap}
            onChange={handleChange}
            placeholder="VD: admin123"
            required
            disabled={isEdit}
          />
          <Input
            label="Mật khẩu"
            name="MatKhau"
            type="password"
            value={form.MatKhau}
            onChange={handleChange}
            placeholder="Nhập mật khẩu"
            required={!isEdit}
          />
          <Input
            label="Mã nhân viên"
            name="MaNV"
            value={form.MaNV}
            onChange={handleChange}
            placeholder="VD: NV001"
            required
          />
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-2">
              Vai trò
            </label>
            <select
              name="VaiTro"
              value={form.VaiTro}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Chọn vai trò</option>
              <option value="admin">Admin</option>
              <option value="manager">Quản lý</option>
              <option value="staff">Nhân viên</option>
              <option value="department_head">Trưởng phòng</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setShowForm(false)}
            >
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
