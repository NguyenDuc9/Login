'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, X, MessageSquare, Search, Calendar, CheckCircle } from 'lucide-react';
import { Button, Modal, Table, TableRow, TableCell, Input, Card, Badge } from '@/components/ui';
import {
  getAllNghiPhep,
  createNghiPhep,
  deleteNghiPhep,
  NghiPhep,
  getNghiPhepById,
} from '@/service/NghiPhep.api';

const TOTAL_DAYS = 12;

interface UserData {
  MaNV: string;
  [key: string]: any;
}

export default function NghiPhepStaffPage() {
  const [data, setData] = useState<NghiPhep[]>([]);
  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Dang cho duyet' | 'Da duyet' | 'Tu choi'>('All');

  const [showForm, setShowForm] = useState<boolean>(false);
  const [showReasonModal, setShowReasonModal] = useState<boolean>(false);
  const [viewReason, setViewReason] = useState<string>('');
  const [currentUserMaNV, setCurrentUserMaNV] = useState<string>('');

  const [form, setForm] = useState({
    MaNghiPhep: 0,
    MaNV: '',
    NgayBatDau: '',
    NgayKetThuc: '',
    LyDo: '',
    TrangThai: 'Dang cho duyet' as const,
    NgayTao: '',
  });

  const loadData = async (): Promise<void> => {
    const user: UserData = JSON.parse(localStorage.getItem('user') || '{}');
    const maNV: string = user.MaNV || '';
    try {
      const result: NghiPhep[] = await getNghiPhepById(maNV);
      setData(result);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    const user: UserData = JSON.parse(localStorage.getItem('user') || '{}');
    setCurrentUserMaNV(user.MaNV || '');
    loadData();
  }, []);

  const calculateRemainingDays = (): number => {
    const approvedLeaves: NghiPhep[] = data.filter(
      (item) => item.TrangThai === 'Da duyet',
    );
    const usedDays: number = approvedLeaves.reduce((total: number, leave: NghiPhep) => {
      const start: Date = new Date(leave.NgayBatDau);
      const end: Date = new Date(leave.NgayKetThuc);
      const days: number =
        Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      return total + days;
    }, 0);
    return Math.max(0, TOTAL_DAYS - usedDays);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!form.NgayBatDau || !form.NgayKetThuc) {
      alert('Vui lòng chọn ngày!');
      return;
    }

    if (form.NgayBatDau > form.NgayKetThuc) {
      alert('Ngày bắt đầu phải nhỏ hơn ngày kết thúc!');
      return;
    }

    try {
      const newData: Partial<NghiPhep> = {
        ...form,
        MaNV: currentUserMaNV,
      };
      await createNghiPhep(newData as NghiPhep);

      setShowForm(false);
      setForm({
        MaNghiPhep: 0,
        MaNV: '',
        NgayBatDau: '',
        NgayKetThuc: '',
        LyDo: '',
        TrangThai: 'Dang cho duyet',
        NgayTao: '',
      });

      await loadData();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại!');
    }
  };

  const handleCancel = async (id: number): Promise<void> => {
    if (confirm('Bạn có chắc muốn hủy yêu cầu nghỉ phép này?')) {
      try {
        await deleteNghiPhep(id);
        await loadData();
      } catch (error) {
        console.error('Error cancelling:', error);
        alert('Có lỗi xảy ra. Vui lòng thử lại!');
      }
    }
  };

  const handleViewReason = (reason?: string): void => {
    setViewReason(reason || 'Không có lý do cụ thể được cung cấp.');
    setShowReasonModal(true);
  };

  const filtered: NghiPhep[] = data.filter((nv) => {
    const matchesSearch: boolean =
      nv.MaNghiPhep?.toString().includes(search) ||
      nv.LyDo?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus: boolean =
      statusFilter === 'All' || nv.TrangThai === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const remainingDays = calculateRemainingDays();
  const statuses = ['All', 'Dang cho duyet', 'Da duyet', 'Tu choi'] as const;

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'All': return 'Tất cả';
      case 'Dang cho duyet': return 'Đang chờ duyệt';
      case 'Da duyet': return 'Đã duyệt';
      case 'Tu choi': return 'Từ chối';
      default: return status;
    }
  };

  const getStatusVariant = (status: string): 'warning' | 'success' | 'danger' | 'default' => {
    switch (status) {
      case 'Dang cho duyet': return 'warning';
      case 'Da duyet': return 'success';
      case 'Tu choi': return 'danger';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý nghỉ phép</h1>
          <p className="text-slate-500 mt-1">Theo dõi yêu cầu nghỉ phép của bạn</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-5 py-3 text-center">
            <p className="text-sm text-indigo-600 font-medium">Số phép còn lại</p>
            <p className="text-2xl font-bold text-indigo-600">{remainingDays}/{TOTAL_DAYS}</p>
          </div>
          <Button variant="primary" onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4" />
            Tạo yêu cầu mới
          </Button>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="flex gap-2 flex-wrap">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              statusFilter === status
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {getStatusLabel(status)}
          </button>
        ))}
      </div>

      <Card className="!p-0">
        <Table headers={['Mã phép', 'Ngày bắt đầu', 'Ngày kết thúc', 'Lý do', 'Trạng thái', 'Thao tác']}>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-12 text-center text-slate-400">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p>Không có yêu cầu nào</p>
              </td>
            </tr>
          ) : (
            filtered.map((nv) => (
              <TableRow key={nv.MaNghiPhep}>
                <TableCell className="font-bold text-indigo-600">#{nv.MaNghiPhep}</TableCell>
                <TableCell>{nv.NgayBatDau}</TableCell>
                <TableCell>{nv.NgayKetThuc}</TableCell>
                <TableCell>
                  <span className="truncate max-w-[200px] block text-slate-600" title={nv.LyDo}>
                    {nv.LyDo}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(nv.TrangThai)} size="sm">
                    {getStatusLabel(nv.TrangThai)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {nv.TrangThai === 'Dang cho duyet' ? (
                    <div className="flex gap-2">
                      <Button variant="danger" size="sm" onClick={() => handleCancel(nv.MaNghiPhep)}>
                        <X className="w-4 h-4" />
                        Hủy
                      </Button>
                    </div>
                  ) : nv.TrangThai === 'Tu choi' ? (
                    <Button variant="secondary" size="sm" onClick={() => handleViewReason((nv as any).LyDoTuChoi)}>
                      <MessageSquare className="w-4 h-4" />
                      Lý do
                    </Button>
                  ) : (
                    <span className="text-slate-400 text-sm">-</span>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </Table>
      </Card>

      {/* Form Modal */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Tạo yêu cầu nghỉ phép" size="md">
        <form onSubmit={handleSubmit} className="space-y-6">
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
            required
          />
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-2">Lý do</label>
            <textarea
              name="LyDo"
              value={form.LyDo}
              onChange={handleChange}
              placeholder="Nhập lý do nghỉ phép..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              rows={4}
              required
            />
          </div>
          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <Button variant="secondary" type="button" onClick={() => setShowForm(false)} className="flex-1">
              Hủy
            </Button>
            <Button variant="primary" type="submit" className="flex-1">
              Tạo yêu cầu
            </Button>
          </div>
        </form>
      </Modal>

      {/* Reason Modal */}
      <Modal isOpen={showReasonModal} onClose={() => setShowReasonModal(false)} title="Lý do từ chối" size="sm">
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          {viewReason}
        </div>
        <div className="flex justify-end pt-4 border-t border-slate-200">
          <Button variant="secondary" onClick={() => setShowReasonModal(false)}>
            Đóng
          </Button>
        </div>
      </Modal>
    </div>
  );
}
