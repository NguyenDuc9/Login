'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, ArrowLeft, Clock, UserCheck, LogOut, CheckCircle, History, Search, List, CalendarDays } from 'lucide-react';
import { Button, Modal, Table, TableRow, TableCell, Card, Badge } from '@/components/ui';

import {
  createChamCong,
  getAllChamCong,
  updateChamCong,
  deleteChamCong,
  getChamCongHomNay,
  ChamCong,
} from '@/service/ChamCong.api';
import {
  getChiTietByCa,
  chamRa,
  chamVao,
  getLichSu,
  ChamCongChiTiet,
} from '@/service/ChiTietCC.api';

const CA_OPTIONS = ['Ca 1', 'Ca 2', 'Ca 3'];
const todayISO = () => new Date().toISOString().split('T')[0];

const isToday = (thoiGian: string) => {
  if (!thoiGian) return false;
  const caDate = thoiGian.split('T')[0].slice(0, 10);
  return caDate === todayISO();
};

type PanelMode = 'chamVao' | 'chamRa' | 'lichSu' | null;
type ViewMode = 'list' | 'detail';
type ListMode = 'today' | 'all';

export default function ChamCongPage() {
  const [data, setData] = useState<ChamCong[]>([]);
  const [listMode, setListMode] = useState<ListMode>('today');
  const [loadingList, setLoadingList] = useState(false);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formCa, setFormCa] = useState('Ca 1');
  const [editId, setEditId] = useState<number | null>(null);

  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedCa, setSelectedCa] = useState<ChamCong | null>(null);
  const [chiTiet, setChiTiet] = useState<ChamCongChiTiet[]>([]);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const [panelCa, setPanelCa] = useState<ChamCong | null>(null);
  const [panelMode, setPanelMode] = useState<PanelMode>(null);
  const [panelData, setPanelData] = useState<ChamCongChiTiet[]>([]);
  const [panelLoading, setPanelLoading] = useState(false);
  const [panelSearch, setPanelSearch] = useState('');

  const loadData = async (mode: ListMode = listMode) => {
    setLoadingList(true);
    if (mode === 'today') {
      setData(await getChamCongHomNay());
    } else {
      setData(await getAllChamCong());
    }
    setLoadingList(false);
  };

  useEffect(() => {
    loadData('today');
  }, []);

  const switchListMode = (mode: ListMode) => {
    setListMode(mode);
    setPanelCa(null);
    setPanelMode(null);
    setPanelSearch('');
    loadData(mode);
  };

  const loadChiTiet = async (maChamCong: number) => {
    setLoadingDetail(true);
    setChiTiet(await getChiTietByCa(maChamCong));
    setLoadingDetail(false);
  };

  const loadPanelData = async (maChamCong: number, mode: PanelMode) => {
    setPanelLoading(true);
    if (mode === 'lichSu') {
      setPanelData(await getLichSu(maChamCong));
    } else {
      setPanelData(await getChiTietByCa(maChamCong));
    }
    setPanelLoading(false);
  };

  const openPanel = (ca: ChamCong, mode: PanelMode, e: React.MouseEvent) => {
    e.stopPropagation();
    if (panelCa?.MaChamCong === ca.MaChamCong && panelMode === mode) {
      setPanelCa(null);
      setPanelMode(null);
      setPanelSearch('');
      return;
    }
    setPanelCa(ca);
    setPanelMode(mode);
    setPanelSearch('');
    loadPanelData(ca.MaChamCong, mode);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && editId !== null) {
      await updateChamCong(editId, { CaLamViec: formCa });
    } else {
      try {
        await createChamCong({ CaLamViec: formCa, ThoiGian: todayISO() });
      } catch (err: any) {
        alert(err?.response?.data?.message || err?.message || 'Có lỗi xảy ra');
      }
    }
    setShowForm(false);
    setIsEdit(false);
    setFormCa('Ca 1');
    setEditId(null);
    loadData();
  };

  const openCreate = () => {
    setIsEdit(false);
    setEditId(null);
    setFormCa('Ca 1');
    setShowForm(true);
  };

  const openEdit = (ca: ChamCong, e: React.MouseEvent) => {
    e.stopPropagation();
    setFormCa(ca.CaLamViec);
    setEditId(ca.MaChamCong);
    setIsEdit(true);
    setShowForm(true);
  };

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Bạn có chắc muốn xóa ca này?')) {
      await deleteChamCong(id);
      if (panelCa?.MaChamCong === id) {
        setPanelCa(null);
        setPanelMode(null);
      }
      loadData();
    }
  };

  const openDetail = (ca: ChamCong) => {
    setSelectedCa(ca);
    setViewMode('detail');
    loadChiTiet(ca.MaChamCong);
  };

  const handleChamVao = async (maNV: string) => {
    const gioVao = new Date().toTimeString().split(' ')[0];
    if (!selectedCa) return;
    await chamVao({ maNV, maChamCong: selectedCa.MaChamCong, gioVao });
    loadChiTiet(selectedCa.MaChamCong);
  };

  const handleChamRa = async (MaChiTiet: string) => {
    const gioRa = new Date().toTimeString().split(' ')[0];
    if (!selectedCa) return;
    await chamRa({ MaChiTiet, gioRa });
    loadChiTiet(selectedCa.MaChamCong);
  };

  const handlePanelChamVao = async (maNV: string) => {
    if (!panelCa) return;
    const gioVao = new Date().toTimeString().split(' ')[0];
    await chamVao({ maNV, maChamCong: panelCa.MaChamCong, gioVao });
    loadPanelData(panelCa.MaChamCong, 'chamVao');
  };

  const handlePanelChamRa = async (MaChiTiet: string) => {
    if (!panelCa) return;
    const gioRa = new Date().toTimeString().split(' ')[0];
    await chamRa({ MaChiTiet, gioRa });
    loadPanelData(panelCa.MaChamCong, 'chamRa');
  };

  const filtered = data.filter(
    (c) =>
      String(c.MaChamCong).includes(search) ||
      c.CaLamViec?.toLowerCase().includes(search.toLowerCase()),
  );

  const filteredPanel = panelData.filter((nv) => {
    const q = panelSearch.toLowerCase();
    return (
      nv.MaNV?.toLowerCase().includes(q) ||
      (nv.HoTen ?? '').toLowerCase().includes(q)
    );
  });

  const panelFiltered =
    panelMode === 'chamVao'
      ? filteredPanel.filter((nv) => !nv.GioVao)
      : panelMode === 'chamRa'
        ? filteredPanel.filter((nv) => nv.GioVao && !nv.GioRa)
        : filteredPanel;

  const daCham = chiTiet.filter((nv) => nv.GioVao);
  const chuaCham = chiTiet.filter((nv) => !nv.GioVao);

  const panelAccent =
    panelMode === 'chamVao'
      ? 'border-blue-500 text-blue-600 bg-blue-50'
      : panelMode === 'chamRa'
        ? 'border-red-500 text-red-600 bg-red-50'
        : 'border-amber-500 text-amber-600 bg-amber-50';

  // ========================= VIEW: CHI TIẾT CA =========================
  if (viewMode === 'detail' && selectedCa) {
    const caIsToday = isToday(selectedCa.ThoiGian);

    return (
      <div className="space-y-6">
        <button
          onClick={() => setViewMode('list')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại danh sách
        </button>

        <Card>
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Thông tin ca làm việc</h2>
              <p className="text-slate-500 mt-1">Mã chấm công: {selectedCa.MaChamCong}</p>
            </div>
            {caIsToday ? (
              <Badge variant="info" size="md">Hôm nay</Badge>
            ) : (
              <Badge variant="default" size="md">Ca cũ</Badge>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <p className="text-sm text-slate-500">Mã chấm công</p>
              <p className="text-lg font-semibold text-slate-800">{selectedCa.MaChamCong}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Ca làm việc</p>
              <p className="text-lg font-semibold text-slate-800">{selectedCa.CaLamViec}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Ngày</p>
              <p className="text-lg font-semibold text-slate-800">{selectedCa.ThoiGian}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Badge variant="success" size="md">
              <CheckCircle className="w-4 h-4 mr-1" />
              {daCham.length} đã chấm
            </Badge>
            <Badge variant="danger" size="md">
              <Clock className="w-4 h-4 mr-1" />
              {chuaCham.length} chưa chấm
            </Badge>
          </div>
        </Card>

        <Card title="Danh sách nhân viên" subtitle={!caIsToday ? 'Chỉ xem lịch sử, không thể chấm công' : ''}>
          {!caIsToday && (
            <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3">
              <History className="w-5 h-5 text-amber-600" />
              <p className="text-sm text-amber-700">Ca này không phải hôm nay — chỉ hiển thị lịch sử</p>
            </div>
          )}
          
          {loadingDetail ? (
            <div className="py-12 text-center text-slate-400">
              <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4" />
              <p>Đang tải...</p>
            </div>
          ) : (
            <Table 
              headers={['Mã CT', 'Mã NV', 'Tên NV', 'Trạng thái', 'Giờ vào', 'Giờ ra', ...(caIsToday ? ['Hành động'] : [])]}
            >
              {chiTiet.length === 0 ? (
                <tr>
                  <td colSpan={caIsToday ? 7 : 6} className="py-12 text-center text-slate-400">
                    Không có nhân viên trong ca này
                  </td>
                </tr>
              ) : (
                chiTiet.map((nv) => {
                  const daNhanVao = !!nv.GioVao;
                  const daNhanRa = !!nv.GioRa;
                  return (
                    <TableRow key={`${nv.MaNV}-${nv.MaChiTiet}`}>
                      <TableCell className="text-slate-400">{nv.MaChiTiet ?? '-'}</TableCell>
                      <TableCell className="font-medium">{nv.MaNV}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                            {nv.HoTen?.charAt(0) || 'N'}
                          </div>
                          <span className="font-medium">{nv.HoTen ?? nv.MaNV}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {daNhanVao ? (
                          <Badge variant="success" size="sm">Đã chấm</Badge>
                        ) : (
                          <Badge variant="danger" size="sm">Chưa chấm</Badge>
                        )}
                      </TableCell>
                      <TableCell>{nv.GioVao ?? '-'}</TableCell>
                      <TableCell>{nv.GioRa ?? '-'}</TableCell>
                      {caIsToday && (
                        <TableCell>
                          {daNhanVao && daNhanRa ? (
                            <span className="text-slate-400 text-sm">Hoàn thành</span>
                          ) : daNhanVao && !daNhanRa ? (
                            <Button 
                              variant="danger" 
                              size="sm"
                              onClick={() => handleChamRa(String(nv.MaChiTiet))}
                            >
                              <LogOut className="w-3 h-3" />
                              Chấm ra
                            </Button>
                          ) : (
                            <Button 
                              variant="primary" 
                              size="sm"
                              onClick={() => handleChamVao(nv.MaNV)}
                            >
                              <UserCheck className="w-3 h-3" />
                              Chấm công
                            </Button>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })
              )}
            </Table>
          )}
        </Card>
      </div>
    );
  }

  // ========================= VIEW: DANH SÁCH CA =========================
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              {listMode === 'today' ? 'Ca chấm công hôm nay' : 'Tất cả ca chấm công'}
            </h1>
            <p className="text-slate-500 mt-1">Quản lý và theo dõi chấm công</p>
          </div>
          {listMode === 'today' && (
            <Badge variant="info" size="md">
              <CalendarDays className="w-4 h-4 mr-1" />
              {todayISO()}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => switchListMode('today')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                listMode === 'today'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              Hôm nay
            </button>
            <button
              onClick={() => switchListMode('all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                listMode === 'all'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <List className="w-4 h-4" />
              Tất cả
            </button>
          </div>
          <Button variant="primary" onClick={openCreate}>
            <Plus className="w-4 h-4" />
            Tạo ca mới
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="!p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-indigo-100">
              <Clock className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Tổng ca hôm nay</p>
              <p className="text-2xl font-bold text-slate-800">{data.length}</p>
            </div>
          </div>
        </Card>
        <Card className="!p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-100">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Đã hoàn thành</p>
              <p className="text-2xl font-bold text-emerald-600">{daCham.length}</p>
            </div>
          </div>
        </Card>
        <Card className="!p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-100">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Chưa chấm</p>
              <p className="text-2xl font-bold text-amber-600">{chuaCham.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card className="!p-0">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm ca chấm công..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <Table headers={['Mã CC', 'Ca làm việc', 'Thời gian', 'Chấm công', 'Hành động']}>
          {loadingList ? (
            <tr>
              <td colSpan={5} className="py-12 text-center text-slate-400">
                <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4" />
                <p>Đang tải...</p>
              </td>
            </tr>
          ) : filtered.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-12 text-center text-slate-400">
                <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p>{listMode === 'today' ? 'Không có ca chấm công nào hôm nay' : 'Không có dữ liệu'}</p>
              </td>
            </tr>
          ) : (
            filtered.map((ca) => {
              const caIsToday = isToday(ca.ThoiGian);
              return (
                <>
                  <TableRow key={ca.MaChamCong} onClick={() => openDetail(ca)}>
                    <TableCell className="font-medium text-indigo-600">{ca.MaChamCong}</TableCell>
                    <TableCell>
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                        {ca.CaLamViec}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">{ca.ThoiGian}</span>
                        {caIsToday ? (
                          <Badge variant="info" size="sm">Hôm nay</Badge>
                        ) : (
                          <Badge variant="default" size="sm">Quá khứ</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <div className="flex gap-2">
                        {caIsToday && (
                          <>
                            <button
                              onClick={(e) => openPanel(ca, 'chamVao', e)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                panelCa?.MaChamCong === ca.MaChamCong && panelMode === 'chamVao'
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                              }`}
                            >
                              <UserCheck className="w-4 h-4" />
                              Chấm vào
                            </button>
                            <button
                              onClick={(e) => openPanel(ca, 'chamRa', e)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                panelCa?.MaChamCong === ca.MaChamCong && panelMode === 'chamRa'
                                  ? 'bg-red-600 text-white'
                                  : 'bg-red-100 text-red-600 hover:bg-red-200'
                              }`}
                            >
                              <LogOut className="w-4 h-4" />
                              Chấm ra
                            </button>
                          </>
                        )}
                        <button
                          onClick={(e) => openPanel(ca, 'lichSu', e)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                            panelCa?.MaChamCong === ca.MaChamCong && panelMode === 'lichSu'
                              ? 'bg-amber-600 text-white'
                              : 'bg-amber-100 text-amber-600 hover:bg-amber-200'
                          }`}
                        >
                          <History className="w-4 h-4" />
                          Lịch sử
                        </button>
                      </div>
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => openEdit(ca, e)}
                          className="p-2 rounded-lg hover:bg-indigo-100 text-indigo-600 transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleDelete(ca.MaChamCong, e)}
                          className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>

                  {/* Panel inline */}
                  {panelCa?.MaChamCong === ca.MaChamCong && panelMode && (
                    <tr key={`panel-${ca.MaChamCong}`}>
                      <td colSpan={5} className="p-0 bg-slate-50">
                        <div className={`p-6 border-t-4 ${panelAccent}`}>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold">
                                {panelMode === 'chamVao' ? 'Chấm vào' : panelMode === 'chamRa' ? 'Chấm ra' : 'Lịch sử chấm công'}
                              </h3>
                              <span className="text-sm text-slate-400">— {ca.CaLamViec} · {ca.ThoiGian}</span>
                              {!caIsToday && panelMode !== 'lichSu' && (
                                <Badge variant="default" size="sm">Chỉ xem</Badge>
                              )}
                            </div>
                            <button
                              onClick={() => {
                                setPanelCa(null);
                                setPanelMode(null);
                                setPanelSearch('');
                              }}
                              className="p-1 rounded hover:bg-slate-200 text-slate-400"
                            >
                              ✕
                            </button>
                          </div>

                          <div className="relative max-w-sm mb-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              type="text"
                              placeholder="Tìm theo mã hoặc tên..."
                              value={panelSearch}
                              onChange={(e) => setPanelSearch(e.target.value)}
                              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>

                          {panelLoading ? (
                            <div className="py-8 text-center text-slate-400">
                              <div className="animate-spin w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full mx-auto mb-2" />
                              <p className="text-sm">Đang tải...</p>
                            </div>
                          ) : (
                            <Table 
                              headers={panelMode === 'lichSu'
                                ? ['Mã CT', 'Mã NV', 'Tên NV', 'Trạng thái', 'Giờ vào', 'Giờ ra']
                                : ['Mã CT', 'Mã NV', 'Tên NV', 'Giờ vào', 'Giờ ra', 'Thao tác']
                              }
                            >
                              {panelFiltered.length === 0 ? (
                                <tr>
                                  <td colSpan={6} className="py-8 text-center text-slate-400">
                                    {panelSearch
                                      ? 'Không tìm thấy nhân viên phù hợp'
                                      : panelMode === 'chamVao'
                                        ? 'Tất cả nhân viên đã chấm vào'
                                        : panelMode === 'chamRa'
                                          ? 'Không có nhân viên cần chấm ra'
                                          : 'Không có dữ liệu'}
                                  </td>
                                </tr>
                              ) : (
                                panelFiltered.map((nv) => (
                                  <TableRow key={`panel-nv-${nv.MaNV}-${nv.MaChiTiet}`}>
                                    <TableCell className="text-slate-400">{nv.MaChiTiet ?? '-'}</TableCell>
                                    <TableCell className="font-medium">{nv.MaNV}</TableCell>
                                    <TableCell>{nv.HoTen ?? nv.MaNV}</TableCell>
                                    {panelMode === 'lichSu' ? (
                                      <>
                                        <TableCell>
                                          {nv.GioVao && nv.GioRa ? (
                                            <Badge variant="success" size="sm">Hoàn thành</Badge>
                                          ) : nv.GioVao ? (
                                            <Badge variant="warning" size="sm">Đang làm</Badge>
                                          ) : (
                                            <Badge variant="danger" size="sm">Vắng</Badge>
                                          )}
                                        </TableCell>
                                        <TableCell>{nv.GioVao ?? '-'}</TableCell>
                                        <TableCell>{nv.GioRa ?? '-'}</TableCell>
                                      </>
                                    ) : panelMode === 'chamVao' ? (
                                      <>
                                        <TableCell>{nv.GioVao ?? '-'}</TableCell>
                                        <TableCell>{nv.GioRa ?? '-'}</TableCell>
                                        <TableCell>
                                          <Button variant="primary" size="sm" onClick={() => handlePanelChamVao(nv.MaNV)}>
                                            <UserCheck className="w-3 h-3" />
                                            Chấm vào
                                          </Button>
                                        </TableCell>
                                      </>
                                    ) : (
                                      <>
                                        <TableCell>{nv.GioVao ?? '-'}</TableCell>
                                        <TableCell>{nv.GioRa ?? '-'}</TableCell>
                                        <TableCell>
                                          <Button variant="danger" size="sm" onClick={() => handlePanelChamRa(String(nv.MaChiTiet))}>
                                            <LogOut className="w-3 h-3" />
                                            Chấm ra
                                          </Button>
                                        </TableCell>
                                      </>
                                    )}
                                  </TableRow>
                                ))
                              )}
                            </Table>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })
          )}
        </Table>
      </Card>

      {/* Form Modal */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={isEdit ? 'Chỉnh sửa ca' : 'Tạo ca mới'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-2">Ca làm việc</label>
            <select
              value={formCa}
              onChange={(e) => setFormCa(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              {CA_OPTIONS.map((ca) => (
                <option key={ca} value={ca}>{ca}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-2">Thời gian</label>
            <input
              type="text"
              value={todayISO()}
              readOnly
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
            />
            <p className="text-xs text-slate-400 mt-1">Tự động lấy ngày hiện tại</p>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <Button variant="secondary" type="button" onClick={() => setShowForm(false)}>
              Đóng
            </Button>
            <Button variant="primary" type="submit">
              {isEdit ? 'Cập nhật' : 'Tạo ca'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
