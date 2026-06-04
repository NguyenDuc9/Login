'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Briefcase,
  Building2,
  Eye, // Thêm icon xem chi tiết
  Check, // Thêm icon duyệt
  X,
  UserCheck,
  // Thêm icon từ chối
} from 'lucide-react';

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
  getAllNhiemVuTong,
  createNhiemVuTong,
  updateNhiemVuTong,
  deleteNhiemVuTong,
  NhiemVuTong,
} from '@/service/PhanViec/NhiemVuTong.api';

import { getAllPhongBan } from '@/service/PhongBan.api';

// Bổ sung import các API Kế hoạch công việc
import {
  getKeHoachCongViecByMaNVT,
  updateKeHoachCongViec,
  KeHoachCongViec,
} from '@/service/PhanViec/KeHoachCongViec';

interface PhongBan {
  MaPhongBan: string;
  TenPhongBan: string;
}

export default function NhiemVuTongPage() {
  const [data, setData] = useState<NhiemVuTong[]>([]);
  const [phongBanList, setPhongBanList] = useState<PhongBan[]>([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();

  // Form Nhiệm Vụ Tổng
  const [form, setForm] = useState<NhiemVuTong>({
    TieuDe: '',
    MoTa: '',
    MaPhongBan: '',
    Deadline: '',
    TrangThai: 'ChoTruongPhongNhan',
    MaGiamDoc: '',
  });

  // --- STATE MỚI CHO NHIỆM VỤ CON (KẾ HOẠCH CÔNG VIỆC) ---
  const [showSubTaskModal, setShowSubTaskModal] = useState(false);
  const [selectedNVT, setSelectedNVT] = useState<NhiemVuTong | null>(null);
  const [subTasks, setSubTasks] = useState<KeHoachCongViec[]>([]);

  // State cho Modal từ chối
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedSubTask, setSelectedSubTask] =
    useState<KeHoachCongViec | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  // --------------------------------------------------------

  // lấy user login
  const taiKhoan =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('user') || '{}')
      : {};

  // load nhiệm vụ
  const loadData = async () => {
    const result = await getAllNhiemVuTong();
    setData(result);
  };

  // load phòng ban
  const loadPhongBan = async () => {
    const result = await getAllPhongBan();
    setPhongBanList(result);
  };

  useEffect(() => {
    loadData();
    loadPhongBan();
  }, []);

  // change form
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      ...form,
      MaGiamDoc: taiKhoan?.MaNV,
    };

    if (isEdit) {
      await updateNhiemVuTong(form.MaNVT!, payload);
    } else {
      await createNhiemVuTong(payload);
    }

    setShowForm(false);
    setIsEdit(false);
    setForm({
      TieuDe: '',
      MoTa: '',
      MaPhongBan: '',
      Deadline: '',
      TrangThai: 'ChoTruongPhongNhan',
      MaGiamDoc: '',
    });

    loadData();
  };

  // edit
  const handleEdit = (item: NhiemVuTong) => {
    setForm(item);
    setIsEdit(true);
    setShowForm(true);
  };

  // delete
  const handleDelete = async (id: number) => {
    if (confirm('Bạn có chắc muốn xóa nhiệm vụ này?')) {
      await deleteNhiemVuTong(id);
      loadData();
    }
  };

  // --- CÁC HÀM XỬ LÝ NHIỆM VỤ CON ---
  const handleViewSubTasks = async (item: NhiemVuTong) => {
    setSelectedNVT(item);
    if (item.MaNVT) {
      const data = await getKeHoachCongViecByMaNVT(item.MaNVT);
      setSubTasks(data);
    }
    setShowSubTaskModal(true);
  };

  const handleApproveSubTask = async (subTask: KeHoachCongViec) => {
    if (confirm('Bạn có chắc chắn muốn duyệt kế hoạch này?')) {
      // Chỉ gửi đúng 2 trường cần update lên Backend
      await updateKeHoachCongViec(subTask.MaKH!, {
        TrangThai: 'DaDuyet',
        LiDoTuChoi: '', // Xóa lý do từ chối nếu có
      } as KeHoachCongViec); // Dùng "as KeHoachCongViec" để tránh lỗi TypeScript

      // Load lại danh sách nhiệm vụ con
      if (selectedNVT?.MaNVT) {
        const data = await getKeHoachCongViecByMaNVT(selectedNVT.MaNVT);
        setSubTasks(data);
      }
    }
  };

  const handleRejectClick = (subTask: KeHoachCongViec) => {
    setSelectedSubTask(subTask);
    setRejectReason(subTask.LiDoTuChoi || '');
    setShowRejectModal(true);
  };

  const handleSubmitReject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSubTask) {
      await updateKeHoachCongViec(selectedSubTask.MaKH!, {
        ...selectedSubTask,
        TrangThai: 'TuChoi',
        LiDoTuChoi: rejectReason,
      });

      setShowRejectModal(false);
      // Load lại danh sách nhiệm vụ con
      if (selectedNVT?.MaNVT) {
        const data = await getKeHoachCongViecByMaNVT(selectedNVT.MaNVT);
        setSubTasks(data);
      }
    }
  };
  // ----------------------------------

  // search
  const filtered = data.filter((item) =>
    item.TieuDe?.toLowerCase().includes(search.toLowerCase()),
  );

  // badge trạng thái nhiệm vụ tổng
  const getTrangThaiBadge = (status?: string) => {
    switch (status) {
      case 'ChoTruongPhongNhan':
        return (
          <Badge variant="warning" size="sm">
            Chờ trưởng phòng nhận
          </Badge>
        );
      case 'DangLapKeHoach':
        return (
          <Badge variant="info" size="sm">
            Đang lập kế hoạch
          </Badge>
        );
      case 'ChoGiamDocDuyet':
        return (
          <Badge variant="warning" size="sm">
            Chờ giám đốc duyệt
          </Badge>
        );
      case 'DaDuyet':
        return (
          <Badge variant="success" size="sm">
            Đã duyệt
          </Badge>
        );
      case 'DangThucHien':
        return (
          <Badge variant="info" size="sm">
            Đang thực hiện
          </Badge>
        );
      case 'HoanThanh':
        return (
          <Badge variant="success" size="sm">
            Hoàn thành
          </Badge>
        );
      default:
        return (
          <Badge variant="default" size="sm">
            Không xác định
          </Badge>
        );
    }
  };

  // badge trạng thái nhiệm vụ con
  const getSubTaskStatusBadge = (status?: string) => {
    switch (status) {
      case 'ChoDuyet':
        return (
          <Badge variant="warning" size="sm">
            Chờ duyệt
          </Badge>
        );
      case 'DaDuyet':
        return (
          <Badge variant="success" size="sm">
            Đã duyệt
          </Badge>
        );
      case 'TuChoi':
        return (
          <Badge variant="danger" size="sm">
            Từ chối
          </Badge>
        );
      default:
        return (
          <Badge variant="default" size="sm">
            {status || 'Chưa rõ'}
          </Badge>
        );
    }
  };

  // lấy tên phòng ban
  const getTenPhongBan = (maPB?: string) => {
    const pb = phongBanList.find((x) => x.MaPhongBan === maPB);
    return pb?.TenPhongBan || maPB;
  };

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Quản lý nhiệm vụ tổng
          </h1>
          <p className="text-slate-500 mt-1">
            Giám đốc giao nhiệm vụ cho phòng ban
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => {
            setIsEdit(false);
            setForm({
              TieuDe: '',
              MoTa: '',
              MaPhongBan: '',
              Deadline: '',
              TrangThai: 'ChoTruongPhongNhan',
              MaGiamDoc: '',
            });
            setShowForm(true);
          }}
        >
          <Plus className="w-4 h-4" />
          Thêm nhiệm vụ
        </Button>
      </div>

      {/* thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* ... (Giữ nguyên phần thống kê của bạn) ... */}
        <Card className="!p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-indigo-100">
              <Briefcase className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Tổng nhiệm vụ</p>
              <p className="text-2xl font-bold text-slate-800">{data.length}</p>
            </div>
          </div>
        </Card>
        <Card className="!p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-100">
              <Briefcase className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Hoàn thành</p>
              <p className="text-2xl font-bold text-slate-800">
                {data.filter((x) => x.TrangThai === 'HoanThanh').length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="!p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-100">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Phòng ban</p>
              <p className="text-2xl font-bold text-slate-800">
                {phongBanList.length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* table */}
      <Card className="!p-0">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm nhiệm vụ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>
          <Button
            variant="primary"
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 text-xs py-1 px-2.5 h-auto"
            onClick={() => {
              // Đóng modal hiện tại trước khi chuyển trang
              router.push(`http://localhost:3000/PhongBan/NhiemVu/`);
            }}
          >
            <UserCheck className="w-3.5 h-3.5" />
            xem tiến độ
          </Button>
        </div>

        <Table
          headers={[
            'Tiêu đề',
            'Phòng ban',
            'Deadline',
            'Trạng thái',
            'Thao tác',
          ]}
        >
          {filtered.map((item) => (
            <TableRow key={item.MaNVT}>
              <TableCell>
                <div>
                  <p className="font-semibold">{item.TieuDe}</p>
                  <p className="text-sm text-slate-500">{item.MoTa}</p>
                </div>
              </TableCell>
              <TableCell>{getTenPhongBan(item.MaPhongBan)}</TableCell>
              <TableCell>{item.Deadline?.split('T')[0]}</TableCell>
              <TableCell>{getTrangThaiBadge(item.TrangThai)}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {/* Nút Xem Nhiệm vụ con */}
                  <button
                    title="Xem kế hoạch chi tiết"
                    onClick={() => handleViewSubTasks(item)}
                    className="p-2 rounded-lg hover:bg-emerald-100 text-emerald-600"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    title="Chỉnh sửa"
                    onClick={() => handleEdit(item)}
                    className="p-2 rounded-lg hover:bg-indigo-100 text-indigo-600"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>

                  <button
                    title="Xóa"
                    onClick={() => handleDelete(item.MaNVT!)}
                    className="p-2 rounded-lg hover:bg-red-100 text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>

      {/* modal Thêm / Sửa Nhiệm Vụ Tổng */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={isEdit ? 'Chỉnh sửa nhiệm vụ' : 'Thêm nhiệm vụ'}
        size="lg"
      >
        {/* ... (Giữ nguyên form thêm/sửa của bạn) ... */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Tiêu đề"
            name="TieuDe"
            value={form.TieuDe}
            onChange={handleChange}
            required
          />
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-2">
              Mô tả
            </label>
            <textarea
              name="MoTa"
              value={form.MoTa}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-slate-300"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-2">
              Phòng ban
            </label>
            <select
              name="MaPhongBan"
              value={form.MaPhongBan}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300"
              required
            >
              <option value="">Chọn phòng ban</option>
              {phongBanList.map((pb) => (
                <option key={pb.MaPhongBan} value={pb.MaPhongBan}>
                  {pb.TenPhongBan}
                </option>
              ))}
            </select>
          </div>
          <Input
            type="date"
            label="Deadline"
            name="Deadline"
            value={form.Deadline}
            onChange={handleChange}
          />
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-2">
              Trạng thái
            </label>
            <select
              name="TrangThai"
              value={form.TrangThai}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300"
            >
              <option value="ChoTruongPhongNhan">Chờ trưởng phòng nhận</option>
              <option value="DangLapKeHoach">Đang lập kế hoạch</option>
              <option value="ChoGiamDocDuyet">Chờ giám đốc duyệt</option>
              <option value="DaDuyet">Đã duyệt</option>
              <option value="DangThucHien">Đang thực hiện</option>
              <option value="HoanThanh">Hoàn thành</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setShowForm(false)}
            >
              Hủy
            </Button>
            <Button variant="primary" type="submit">
              {isEdit ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* --- MODAL HIỂN THỊ DANH SÁCH KẾ HOẠCH CÔNG VIỆC (NHIỆM VỤ CON) --- */}
      <Modal
        isOpen={showSubTaskModal}
        onClose={() => setShowSubTaskModal(false)}
        title={`Kế hoạch chi tiết: ${selectedNVT?.TieuDe}`}
        size="xl" // Có thể dùng size to hơn để chứa table
      >
        <div className="max-h-[60vh] overflow-auto">
          {subTasks.length === 0 ? (
            <p className="text-center text-slate-500 py-4">
              Chưa có kế hoạch công việc nào được lập.
            </p>
          ) : (
            <Table
              headers={[
                'Tên công việc',
                'Mức độ',
                'Deadline',
                'Trạng thái',
                'Lý do (nếu từ chối)',
                'Duyệt/Từ chối',
              ]}
            >
              {subTasks.map((sub) => (
                <TableRow key={sub.MaKH}>
                  <TableCell>
                    <div>
                      <p className="font-semibold">{sub.TenCongViec}</p>
                      <p className="text-xs text-slate-500">{sub.MoTa}</p>
                    </div>
                  </TableCell>
                  <TableCell>{sub.MucDo}</TableCell>
                  <TableCell>{sub.Deadline?.split('T')[0]}</TableCell>

                  {/* CỘT TRẠNG THÁI: Đã mở comment và tích hợp thêm nút Tiến độ khi Đã duyệt */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getSubTaskStatusBadge(sub.TrangThai)}

                      {sub.TrangThai === 'DaDuyet' && (
                        <Button
                          variant="outline"
                          size="sm"
                          title="Xem tiến độ kế hoạch"
                          className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 flex items-center gap-1 text-xs py-1 px-2.5 h-auto font-medium"
                          onClick={() => {
                            if (!sub.MaKH) {
                              alert(
                                'Không tìm thấy Mã kế hoạch (MaKH) hợp lệ!',
                              );
                              return;
                            }
                            setShowSubTaskModal(false); // Đóng modal hiện tại trước khi chuyển trang
                            router.push(
                              `http://localhost:3000/PhongBan/LenKeHoachCongViec/${sub.MaKH}?abc`,
                            );
                          }}
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Tiến độ
                        </Button>
                      )}
                    </div>
                  </TableCell>

                  <TableCell
                    className="text-red-500 text-sm max-w-[150px] truncate"
                    title={sub.LiDoTuChoi}
                  >
                    {sub.TrangThai === 'TuChoi' ? sub.LiDoTuChoi : ''}
                  </TableCell>

                  {/* CỘT DUYỆT / TỪ CHỐI: Giữ nguyên 100% logic gốc ban đầu của bạn */}
                  <TableCell>
                    <div className="flex gap-2">
                      <button
                        title="Duyệt"
                        onClick={() => handleApproveSubTask(sub)}
                        className="p-2 rounded-lg hover:bg-green-100 text-green-600 disabled:opacity-50"
                        disabled={sub.TrangThai === 'DaDuyet'}
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        title="Từ chối"
                        onClick={() => handleRejectClick(sub)}
                        className="p-2 rounded-lg hover:bg-red-100 text-red-600 disabled:opacity-50"
                        disabled={sub.TrangThai === 'TuChoi'}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          )}
        </div>
      </Modal>

      {/* --- MODAL NHẬP LÝ DO TỪ CHỐI --- */}
      <Modal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        title="Nhập lý do từ chối"
        size="md"
      >
        <form onSubmit={handleSubmitReject} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-2">
              Lý do từ chối cho công việc:{' '}
              <span className="font-bold">{selectedSubTask?.TenCongViec}</span>
            </label>
            <textarea
              required
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={4}
              placeholder="Nhập lý do chi tiết để trưởng phòng nắm được..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setShowRejectModal(false)}
            >
              Hủy
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="bg-red-600 hover:bg-red-700"
            >
              Xác nhận từ chối
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
