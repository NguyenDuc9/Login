'use client';

import { useState, useEffect } from 'react';
import { Eye, Check, X, MessageSquare, Search, Calendar, Filter } from 'lucide-react';
import { Button, Modal, Table, TableRow, TableCell, Card, Badge } from '@/components/ui';
import {
  Leave,
  getAllNghiPhep,
  updateNghiPhep,
  getNghiPhepById,
} from '@/service/NghiPhep.api';

type FilterStatus = 'All' | 'Dang cho duyet' | 'Da duyet' | 'Tu choi';

const NGHIPHEP_MACDINH = 12;

export default function NghiPhepPage() {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('All');
  const [selectedLeave, setSelectedLeave] = useState<Leave | null>(null);

  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [showRejectModal, setShowRejectModal] = useState<boolean>(false);
  const [rejectReason, setRejectReason] = useState<string>('');
  const [soNgayDaNghi, setSoNgayDaNghi] = useState<number>(0);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const data = await getAllNghiPhep();
      setLeaves(data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách nghỉ phép:', error);
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

  const getStatusLabel = (status: FilterStatus | string): string => {
    const labels: Record<string, string> = {
      All: 'Tất cả',
      'Dang cho duyet': 'Đang chờ duyệt',
      'Da duyet': 'Đã duyệt',
      'Tu choi': 'Từ chối',
    };
    return labels[status] || status;
  };

  const filtered = leaves.filter((leave: Leave) => {
    return statusFilter === 'All' || leave.TrangThai === statusFilter;
  });

  const handleViewDetail = async (leave: Leave) => {
    setSelectedLeave(leave);
    setShowDetailModal(true);
    setSoNgayDaNghi(0);

    try {
      const leaveHistory = await getNghiPhepById(leave.MaNV);
      let totalDuyet = 0;
      if (Array.isArray(leaveHistory)) {
        totalDuyet = leaveHistory.reduce((acc, curr) => {
          return curr.TrangThai === 'Da duyet' ? acc + curr.SoNgay : acc;
        }, 0);
      }
      setSoNgayDaNghi(totalDuyet);
    } catch (error) {
      console.error('Lỗi khi lấy chi tiết nghỉ phép nhân viên:', error);
    }
  };

  const handleApprove = async (leaveId: number) => {
    if (confirm('Bạn có chắc muốn duyệt yêu cầu này?')) {
      try {
        await updateNghiPhep(leaveId, { TrangThai: 'Da duyet' });
        setLeaves((prev: Leave[]) =>
          prev.map((item: Leave) =>
            item.MaNghiPhep === leaveId
              ? { ...item, TrangThai: 'Da duyet' as const }
              : item,
          ),
        );
        setShowDetailModal(false);
      } catch (error) {
        alert('Có lỗi xảy ra khi duyệt yêu cầu!');
        console.error(error);
      }
    }
  };

  const handleRejectClick = (leave: Leave) => {
    setSelectedLeave(leave);
    setRejectReason('');
    setShowRejectModal(true);
    setShowDetailModal(false);
  };

  const handleConfirmReject = async () => {
    if (!rejectReason.trim()) {
      alert('Vui lòng nhập lý do từ chối');
      return;
    }

    if (selectedLeave) {
      try {
        await updateNghiPhep(selectedLeave.MaNghiPhep, {
          TrangThai: 'Tu choi',
          LyDoTuChoi: rejectReason,
        });

        setLeaves((prev: Leave[]) =>
          prev.map((item: Leave) =>
            item.MaNghiPhep === selectedLeave.MaNghiPhep
              ? {
                  ...item,
                  TrangThai: 'Tu choi' as const,
                  LyDoTuChoi: rejectReason,
                }
              : item,
          ),
        );
        setShowRejectModal(false);
        setSelectedLeave(null);
      } catch (error) {
        alert('Có lỗi xảy ra khi từ chối yêu cầu!');
        console.error(error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Quản lý nghỉ phép</h1>
          <p className="text-slate-500 mt-1">Xem xét và duyệt/từ chối yêu cầu nghỉ phép</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {(['All', 'Dang cho duyet', 'Da duyet', 'Tu choi'] as FilterStatus[]).map((status) => (
          <Card 
            key={status}
            className={`!p-4 cursor-pointer transition-all hover:shadow-md ${
              statusFilter === status ? 'ring-2 ring-indigo-500' : ''
            }`}
            onClick={() => setStatusFilter(status)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{getStatusLabel(status)}</p>
                <p className="text-2xl font-bold text-slate-800">
                  {status === 'All' 
                    ? leaves.length 
                    : leaves.filter(l => l.TrangThai === status).length}
                </p>
              </div>
              <div className={`p-3 rounded-xl ${
                status === 'All' ? 'bg-indigo-100' :
                status === 'Dang cho duyet' ? 'bg-amber-100' :
                status === 'Da duyet' ? 'bg-emerald-100' : 'bg-red-100'
              }`}>
                <Calendar className={`w-6 h-6 ${
                  status === 'All' ? 'text-indigo-600' :
                  status === 'Dang cho duyet' ? 'text-amber-600' :
                  status === 'Da duyet' ? 'text-emerald-600' : 'text-red-600'
                }`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="!p-0">
        <Table headers={['Mã phép', 'Nhân viên', 'Ngày bắt đầu', 'Ngày kết thúc', 'Số ngày', 'Lý do', 'Trạng thái', 'Thao tác']}>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-12 text-center text-slate-400">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p>Không có yêu cầu nào</p>
              </td>
            </tr>
          ) : (
            filtered.map((leave) => (
              <TableRow key={leave.MaNghiPhep}>
                <TableCell className="font-bold text-indigo-600">#{leave.MaNghiPhep}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                      {leave.HoTen?.charAt(0) || 'N'}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{leave.HoTen}</p>
                      <p className="text-xs text-slate-400">{leave.MaNV}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{leave.NgayBatDau}</TableCell>
                <TableCell>{leave.NgayKetThuc}</TableCell>
                <TableCell>
                  <Badge variant="default" size="sm">{leave.SoNgay} ngày</Badge>
                </TableCell>
                <TableCell>
                  <span className="truncate max-w-[150px] block text-slate-600" title={leave.LyDo}>
                    {leave.LyDo}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(leave.TrangThai)} size="sm">
                    {getStatusLabel(leave.TrangThai)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleViewDetail(leave)}
                  >
                    <Eye className="w-4 h-4" />
                    {leave.TrangThai === 'Tu choi' ? 'Lý do' : 'Xem'}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </Table>
      </Card>

      {/* Detail Modal */}
      {showDetailModal && selectedLeave && (
        <Modal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title={selectedLeave.TrangThai === 'Tu choi' ? 'Chi tiết yêu cầu (Từ chối)' : 'Chi tiết yêu cầu nghỉ phép'}
          size="md"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500">Mã yêu cầu</p>
                <p className="font-semibold text-indigo-600">#{selectedLeave.MaNghiPhep}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Nhân viên</p>
                <p className="font-semibold">{selectedLeave.HoTen} ({selectedLeave.MaNV})</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-sm text-slate-600 mb-1">Tình trạng quỹ phép:</p>
              <p className="font-semibold" style={{ color: soNgayDaNghi + selectedLeave.SoNgay > NGHIPHEP_MACDINH ? '#ef4444' : '#22c55e' }}>
                Đã duyệt {soNgayDaNghi} / {NGHIPHEP_MACDINH} ngày
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500">Ngày bắt đầu</p>
                <p className="font-medium">{selectedLeave.NgayBatDau}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Ngày kết thúc</p>
                <p className="font-medium">{selectedLeave.NgayKetThuc}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500">Số ngày</p>
                <p className="font-medium">{selectedLeave.SoNgay} ngày</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Trạng thái</p>
                <Badge variant={getStatusVariant(selectedLeave.TrangThai)} size="sm">
                  {getStatusLabel(selectedLeave.TrangThai)}
                </Badge>
              </div>
            </div>

            <div>
              <p className="text-sm text-slate-500">Lý do</p>
              <p className="font-medium">{selectedLeave.LyDo}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Ngày tạo</p>
              <p className="font-medium">{selectedLeave.NgayTao}</p>
            </div>

            {selectedLeave.TrangThai === 'Tu choi' && selectedLeave.LyDoTuChoi && (
              <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                <p className="text-sm text-red-600 mb-1">Lý do từ chối:</p>
                <p className="font-medium text-red-700">{selectedLeave.LyDoTuChoi}</p>
              </div>
            )}

            {selectedLeave.TrangThai === 'Dang cho duyet' && (
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <Button variant="secondary" onClick={() => setShowDetailModal(false)} className="flex-1">
                  Đóng
                </Button>
                <Button variant="success" onClick={() => handleApprove(selectedLeave.MaNghiPhep)} className="flex-1">
                  <Check className="w-4 h-4" />
                  Duyệt
                </Button>
                <Button variant="danger" onClick={() => handleRejectClick(selectedLeave)} className="flex-1">
                  <X className="w-4 h-4" />
                  Từ chối
                </Button>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedLeave && (
        <Modal
          isOpen={showRejectModal}
          onClose={() => setShowRejectModal(false)}
          title="Từ chối yêu cầu nghỉ phép"
          size="sm"
        >
          <div className="space-y-4">
            <p className="text-slate-600">
              Bạn đang từ chối yêu cầu của <strong>{selectedLeave.HoTen}</strong> vào ngày <strong>{selectedLeave.NgayBatDau}</strong>
            </p>
            <p className="text-sm text-slate-500">
              Quỹ phép hiện tại: {soNgayDaNghi}/{NGHIPHEP_MACDINH} ngày.
            </p>

            <div>
              <label className="text-sm font-medium text-slate-700 block mb-2">Lý do từ chối</label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Nhập lý do từ chối..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                rows={4}
              />
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-200">
              <Button variant="secondary" onClick={() => setShowRejectModal(false)} className="flex-1">
                Hủy
              </Button>
              <Button variant="danger" onClick={handleConfirmReject} className="flex-1">
                Xác nhận từ chối
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
