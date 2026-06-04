'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // ĐÃ THÊM: Import useRouter để điều hướng
import {
  Clock3,
  Plus,
  Trash2,
  ListChecks,
  Edit2,
  X,
  UserCheck, // ĐÃ THÊM: Icon đại diện cho hành động giao việc
} from 'lucide-react';

import {
  Badge,
  Button,
  Card,
  Table,
  TableCell,
  TableRow,
  Modal,
} from '@/components/ui';

import {
  getNhiemVuTongByPhongBan,
  NhiemVuTong,
} from '@/service/PhanViec/NhiemVuTong.api';

import {
  getKeHoachCongViecByMaNVT,
  createKeHoachCongViec,
  deleteKeHoachCongViec,
  updateKeHoachCongViec,
  KeHoachCongViec,
} from '@/service/PhanViec/KeHoachCongViec';

import { getAllPhongBan } from '@/service/PhongBan.api';

export default function LenKeHoachNhiemVuPage() {
  const router = useRouter(); // ĐÃ THÊM: Khởi tạo router điều hướng
  const [data, setData] = useState<NhiemVuTong[]>([]);
  const [phongBanList, setPhongBanList] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<NhiemVuTong | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  // State cho công việc con
  const [dsCongViecCon, setDsCongViecCon] = useState<KeHoachCongViec[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newCV, setNewCV] = useState<Partial<KeHoachCongViec>>({
    TenCongViec: '',
    MoTa: '',
    MucDo: 'TrungBinh',
    Deadline: '',
  });

  const getBadgeTrangThai = (trangThai: string | undefined) => {
    switch (trangThai) {
      case 'ChoDuyet':
        return { text: 'Chờ duyệt', variant: 'warning' };
      case 'DaDuyet':
        return { text: 'Đã duyệt', variant: 'info' };
      case 'DangLam':
        return { text: 'Đang làm', variant: 'primary' };
      case 'HoanThanh':
        return { text: 'Hoàn thành', variant: 'success' };
      default:
        return { text: trangThai || 'Chờ duyệt', variant: 'default' };
    }
  };

  const taiKhoan =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('user') || '{}')
      : {};

  const loadData = async () => {
    try {
      const ma_nv = 'NV001'; // Ở thực tế bạn có thể lấy từ taiKhoan?.MaNV
      const result = await getNhiemVuTongByPhongBan(ma_nv);
      if (result && Array.isArray(result)) {
        // CHỈ LẤY CÁC NHIỆM VỤ CÓ TRẠNG THÁI "DangLapKeHoach"
        const dangLapKeHoachList = result.filter(
          (item) => item.TrangThai === 'DangLapKeHoach',
        );
        setData(dangLapKeHoachList);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error('Lỗi gọi API:', error);
      setData([]);
    }
  };

  const loadCongViecCon = async (maNVT: number) => {
    try {
      const res = await getKeHoachCongViecByMaNVT(maNVT);
      setDsCongViecCon(res || []);
    } catch (e) {
      setDsCongViecCon([]);
    }
  };

  useEffect(() => {
    loadData();
    // getAllPhongBan().then(setPhongBanList);
  }, []);

  // Thêm hoặc Cập nhật công việc con
  const handleSaveSubTask = async () => {
    if (!newCV.TenCongViec || !newCV.Deadline || !selected) {
      alert('Vui lòng nhập đầy đủ Tên công việc và Hạn chót!');
      return;
    }

    if (editingId) {
      // CẬP NHẬT
      await updateKeHoachCongViec(editingId, { ...newCV } as any);
      alert('Đã cập nhật công việc!');
    } else {
      // THÊM MỚI
      const payload = {
        ...newCV,
        MaNVT: selected.MaNVT,
        MaTruongPhong: taiKhoan?.MaNV,
        TrangThai: 'ChoDuyet',
      };
      await createKeHoachCongViec(payload as any);
    }

    handleCancelEdit();
    loadCongViecCon(selected.MaNVT!);
  };

  const handleDeleteSubTask = async (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa kế hoạch công việc này?')) {
      await deleteKeHoachCongViec(id);
      loadCongViecCon(selected!.MaNVT!);
    }
  };

  const handleEditClick = (cv: KeHoachCongViec) => {
    setEditingId(cv.MaKH!);
    setNewCV({
      TenCongViec: cv.TenCongViec,
      MoTa: cv.MoTa,
      MucDo: cv.MucDo,
      Deadline: cv.Deadline ? cv.Deadline.toString().split('T')[0] : '',
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewCV({ TenCongViec: '', MoTa: '', MucDo: 'TrungBinh', Deadline: '' });
  };

  const filtered = data.filter((x) =>
    x.TieuDe?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6 p-6">
      {/* Header & Stats */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Lập Kế Hoạch Công Việc
          </h1>
          <p className="text-slate-500">
            Chia nhỏ nhiệm vụ tổng thành các kế hoạch chi tiết cho phòng ban
          </p>
        </div>
      </div>

      {/* Thống kê */}
      <div className="flex gap-4">
        <Card className="!p-3 flex items-center gap-3">
          <div className="bg-amber-100 p-2 rounded-lg">
            <Clock3 className="text-amber-600 w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-semibold">
              Nhiệm vụ đang lập KH
            </p>
            <p className="text-xl font-bold">{data.length}</p>
          </div>
        </Card>
      </div>

      {/* Bảng dữ liệu */}
      <Card className="!p-0 overflow-hidden">
        <Table headers={['Nhiệm vụ', 'Hạn chót', 'Trạng thái', 'Thao tác']}>
          {filtered.map((item) => (
            <TableRow key={item.MaNVT}>
              <TableCell>
                <p className="font-bold text-slate-700">{item.TieuDe}</p>
                <p className="text-xs text-slate-500 line-clamp-1">
                  {item.MoTa}
                </p>
              </TableCell>
              <TableCell>{item.Deadline?.split('T')[0]}</TableCell>
              <TableCell>
                <Badge variant="info">Đang lập KH</Badge>
              </TableCell>
              <TableCell>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setSelected(item);
                    setShowDetail(true);
                    if (item.MaNVT) loadCongViecCon(item.MaNVT);
                  }}
                >
                  Lập kế hoạch
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {filtered.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-8 text-slate-500 italic"
              >
                Không có nhiệm vụ nào đang trong giai đoạn lập kế hoạch
              </TableCell>
            </TableRow>
          )}
        </Table>
      </Card>

      {/* MODAL LẬP KẾ HOẠCH */}
      <Modal
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        title="Lập Kế Hoạch Công Việc"
        size="2xl"
      >
        {selected && (
          <div className="space-y-6">
            {/* Thông tin chung */}
            <div className="grid grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Nhiệm vụ tổng
                </label>
                <p className="font-semibold text-lg text-indigo-700">
                  {selected.TieuDe}
                </p>
                <p className="text-sm text-slate-600 mt-1">{selected.MoTa}</p>
              </div>
              <div className="text-right">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Hạn chót
                </label>
                <p className="font-bold text-rose-600">
                  {selected.Deadline?.split('T')[0]}
                </p>
              </div>
            </div>

            {/* Vùng Lập kế hoạch */}
            <div className="space-y-5">
              <div className="flex items-center gap-2 border-b pb-2">
                <ListChecks className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-800">
                  Danh sách Kế hoạch (Công việc con)
                </h3>
              </div>

              {/* Form Thêm / Sửa */}
              <div
                className={`p-4 border rounded-lg shadow-sm space-y-3 ${editingId ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-indigo-100'}`}
              >
                <h4 className="text-sm font-semibold text-slate-700">
                  {editingId ? 'Sửa công việc' : 'Thêm công việc mới'}
                </h4>
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-12 md:col-span-6">
                    <label className="text-xs text-slate-500 mb-1 block">
                      Tên công việc <span className="text-red-500">*</span>
                    </label>
                    <input
                      placeholder="Nhập tên công việc..."
                      className="w-full text-sm border rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      value={newCV.TenCongViec}
                      onChange={(e) =>
                        setNewCV({ ...newCV, TenCongViec: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label className="text-xs text-slate-500 mb-1 block">
                      Hạn chót <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      className="w-full text-sm border rounded-md px-3 py-2 text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      value={newCV.Deadline}
                      onChange={(e) =>
                        setNewCV({ ...newCV, Deadline: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-6 md:col-span-3">
                    <label className="text-xs text-slate-500 mb-1 block">
                      Mức độ
                    </label>
                    <select
                      className="w-full text-sm border rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      value={newCV.MucDo}
                      onChange={(e) =>
                        setNewCV({ ...newCV, MucDo: e.target.value })
                      }
                    >
                      <option value="Thap">Thấp</option>
                      <option value="TrungBinh">Trung bình</option>
                      <option value="Cao">Cao</option>
                    </select>
                  </div>
                  <div className="col-span-12">
                    <label className="text-xs text-slate-500 mb-1 block">
                      Mô tả chi tiết
                    </label>
                    <textarea
                      placeholder="Mô tả cụ thể công việc cần làm..."
                      rows={2}
                      className="w-full text-sm border rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                      value={newCV.MoTa}
                      onChange={(e) =>
                        setNewCV({ ...newCV, MoTa: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  {editingId && (
                    <Button variant="secondary" onClick={handleCancelEdit}>
                      <X className="w-4 h-4 mr-2" /> Hủy
                    </Button>
                  )}
                  <Button onClick={handleSaveSubTask}>
                    {editingId ? (
                      <>Lưu thay đổi</>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" /> Thêm kế hoạch
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Bảng danh sách công việc con */}
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-slate-600">
                      Công việc
                    </th>
                    <th className="px-4 py-3 font-semibold text-slate-600 w-24">
                      Mức độ
                    </th>
                    <th className="px-4 py-3 font-semibold text-slate-600 w-32">
                      Hạn chót
                    </th>
                    <th className="px-4 py-3 font-semibold text-slate-600 w-32">
                      Trạng thái
                    </th>
                    <th className="px-4 py-3 text-right w-40">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {dsCongViecCon.map((cv) => (
                    <tr
                      key={cv.MaKH}
                      className="border-b last:border-0 hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <p className="font-semibold text-slate-800">
                          {cv.TenCongViec}
                        </p>
                        {cv.MoTa && (
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                            {cv.MoTa}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          size="sm"
                          variant={
                            cv.MucDo === 'Cao'
                              ? 'danger'
                              : cv.MucDo === 'TrungBinh'
                                ? 'warning'
                                : 'default'
                          }
                        >
                          {cv.MucDo === 'Cao'
                            ? 'Cao'
                            : cv.MucDo === 'TrungBinh'
                              ? 'Trung bình'
                              : 'Thấp'}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-slate-600 font-medium">
                        {cv.Deadline?.toString().split('T')[0]}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          size="sm"
                          variant={
                            getBadgeTrangThai(cv.TrangThai).variant as any
                          }
                        >
                          {getBadgeTrangThai(cv.TrangThai).text}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2 items-center">
                          {/* ĐÃ SỬA: Hiển thị nút Giao việc khi trạng thái là 'DaDuyet' */}
                          {cv.TrangThai === 'DaDuyet' && (
                            <Button
                              variant="primary"
                              size="sm"
                              className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 text-xs py-1 px-2.5 h-auto"
                              onClick={() => {
                                setShowDetail(false); // Đóng modal hiện tại trước khi chuyển trang
                                router.push(
                                  `LenKeHoachCongViec/${cv.MaKH}?abc`,
                                );
                              }}
                            >
                              <UserCheck className="w-3.5 h-3.5" />
                              Giao việc
                            </Button>
                          )}

                          {/* ĐÃ SỬA: Chỉ cho phép Sửa/Xóa khi công việc ở trạng thái 'ChoDuyet' */}
                          {cv.TrangThai === 'ChoDuyet' && (
                            <>
                              <button
                                onClick={() => handleEditClick(cv)}
                                className="text-slate-400 hover:text-indigo-600 transition-colors p-1 rounded-md hover:bg-indigo-50"
                                title="Sửa kế hoạch"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteSubTask(cv.MaKH!)}
                                className="text-slate-400 hover:text-rose-600 transition-colors p-1 rounded-md hover:bg-rose-50"
                                title="Xóa kế hoạch"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}

                          {/* Trạng thái hiển thị tĩnh nếu dự án đã và đang được thực thi */}
                          {(cv.TrangThai === 'DangLam' ||
                            cv.TrangThai === 'HoanThanh') && (
                            <span className="text-xs text-slate-400 italic bg-slate-100 px-2 py-0.5 rounded">
                              Đang thực hiện
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {dsCongViecCon.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-8 text-center text-slate-400 italic"
                      >
                        Chưa có công việc con nào được lập. Hãy sử dụng form
                        phía trên để thêm.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="secondary" onClick={() => setShowDetail(false)}>
                Đóng
              </Button>
              {dsCongViecCon.length > 0 && (
                <Button
                  variant="primary"
                  onClick={() => {
                    alert('Đã lưu danh sách kế hoạch!');
                    setShowDetail(false);
                  }}
                >
                  Hoàn tất & Gửi duyệt
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
