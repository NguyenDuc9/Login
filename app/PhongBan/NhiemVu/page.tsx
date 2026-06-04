'use client';

import { useEffect, useState } from 'react';

import {
  CheckCircle,
  ClipboardList,
  Search,
  Clock3,
  Building2,
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
  updateTrangThaiNhiemVuTong,
  NhiemVuTong,
} from '@/service/PhanViec/NhiemVuTong.api';

import { getAllPhongBan } from '@/service/PhongBan.api';

interface PhongBan {
  MaPhongBan: string;
  TenPhongBan: string;
}

export default function TruongPhongNhanNhiemVuPage() {
  const [data, setData] = useState<NhiemVuTong[]>([]);

  const [phongBanList, setPhongBanList] = useState<PhongBan[]>([]);

  const [search, setSearch] = useState('');

  const [selected, setSelected] = useState<NhiemVuTong | null>(null);

  const [showDetail, setShowDetail] = useState(false);

  // user login
  const taiKhoan =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('user') || '{}')
      : {};

  // load data
  const loadData = async () => {
    try {
      const ma_nv = 'NV001';
      const result = await getNhiemVuTongByPhongBan(ma_nv);
      console.log('Dữ liệu nhận được từ API:', result);

      // Kiểm tra chắc chắn result là mảng rồi mới filter
      if (result && Array.isArray(result)) {
        const filtered = result.filter(
          (x: NhiemVuTong) => x.TrangThai === 'ChoTruongPhongNhan',
        );
        setData(filtered);
      } else {
        // Nếu không phải mảng, set data về mảng rỗng
        console.error('Dữ liệu trả về không phải là mảng:', result);
        setData([]);
      }
    } catch (error) {
      console.error('Lỗi gọi API:', error);
      setData([]);
    }
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

  // xác nhận nhiệm vụ
  const handleConfirm = async (item: NhiemVuTong) => {
    await updateTrangThaiNhiemVuTong(item.MaNVT!, {
      ...item,
      TrangThai: 'DangLapKeHoach',
    });

    loadData();
  };

  // badge trạng thái
  const getTrangThaiBadge = (status?: string) => {
    switch (status) {
      case 'ChoTruongPhongNhan':
        return (
          <Badge variant="warning" size="sm">
            Chờ xác nhận
          </Badge>
        );

      case 'DangLapKeHoach':
        return (
          <Badge variant="info" size="sm">
            Đang lập kế hoạch
          </Badge>
        );

      default:
        return (
          <Badge variant="default" size="sm">
            {status}
          </Badge>
        );
    }
  };

  // tên phòng ban
  const getTenPhongBan = (maPB?: string) => {
    const pb = phongBanList.find((x) => x.MaPhongBan === maPB);

    return pb?.TenPhongBan || maPB;
  };

  // search
  const filtered = data.filter((x) =>
    x.TieuDe?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Xác nhận nhiệm vụ
          </h1>

          <p className="text-slate-500 mt-1">
            Trưởng phòng xác nhận nhiệm vụ giám đốc giao
          </p>
        </div>
      </div>

      {/* thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="!p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-indigo-100">
              <ClipboardList className="w-6 h-6 text-indigo-600" />
            </div>

            <div>
              <p className="text-sm text-slate-500">Nhiệm vụ chờ nhận</p>

              <p className="text-2xl font-bold text-slate-800">{data.length}</p>
            </div>
          </div>
        </Card>

        <Card className="!p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-100">
              <Clock3 className="w-6 h-6 text-amber-600" />
            </div>

            <div>
              <p className="text-sm text-slate-500">Chờ xác nhận</p>

              <p className="text-2xl font-bold text-slate-800">
                {
                  data.filter((x) => x.TrangThai === 'ChoTruongPhongNhan')
                    .length
                }
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

              <p className="text-xl font-bold text-slate-800">
                {taiKhoan?.MaPhongBan}
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
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setSelected(item);

                      setShowDetail(true);
                    }}
                  >
                    Chi tiết
                  </Button>

                  <Button variant="primary" onClick={() => handleConfirm(item)}>
                    <CheckCircle className="w-4 h-4" />
                    Xác nhận
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>

      {/* modal detail */}
      <Modal
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        title="Chi tiết nhiệm vụ"
        size="lg"
      >
        {selected && (
          <div className="space-y-5">
            <div>
              <p className="text-sm text-slate-500">Tiêu đề</p>

              <p className="font-semibold text-lg">{selected.TieuDe}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Mô tả</p>

              <p className="text-slate-700">{selected.MoTa}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500">Phòng ban</p>

                <p>{getTenPhongBan(selected.MaPhongBan)}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Deadline</p>

                <p>{selected.Deadline?.split('T')[0]}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-slate-500">Trạng thái</p>

              <div className="mt-2">
                {getTrangThaiBadge(selected.TrangThai)}
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-200">
              <Button
                variant="primary"
                onClick={async () => {
                  await handleConfirm(selected);

                  setShowDetail(false);
                }}
              >
                <CheckCircle className="w-4 h-4" />
                Xác nhận nhiệm vụ
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
