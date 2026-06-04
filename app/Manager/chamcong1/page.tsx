'use client';

import React, { useEffect, useState } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  Clock,
  UserCheck,
  LogOut,
  History,
  Search,
  List,
  CalendarDays,
} from 'lucide-react';

// Types
interface ChamCong {
  MaChamCong: number;
  CaLamViec: string;
  ThoiGian: string;
}

interface ChamCongChiTiet {
  MaChiTiet?: string;
  MaNV: string;
  HoTen?: string;
  GioVao?: string;
  GioRa?: string;
}

type PanelMode = 'chamVao' | 'chamRa' | 'lichSu' | null;
type ListMode = 'today' | 'all';

// Constants
const CA_OPTIONS = ['Ca 1', 'Ca 2', 'Ca 3'];

const getTodayISO = () => new Date().toISOString().split('T')[0];

const isToday = (thoiGian: string): boolean => {
  if (!thoiGian) return false;
  const caDate = thoiGian.split('T')[0].slice(0, 10);
  return caDate === getTodayISO();
};

// ======================== COMPONENT ========================
export default function ChamCongPage() {
  // List state
  const [data, setData] = useState<ChamCong[]>([]);
  const [listMode, setListMode] = useState<ListMode>('today');
  const [loadingList, setLoadingList] = useState(false);
  const [search, setSearch] = useState('');

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formCa, setFormCa] = useState('Ca 1');
  const [editId, setEditId] = useState<number | null>(null);

  // Panel state
  const [panelCa, setPanelCa] = useState<ChamCong | null>(null);
  const [panelMode, setPanelMode] = useState<PanelMode>(null);
  const [panelData, setPanelData] = useState<ChamCongChiTiet[]>([]);
  const [panelLoading, setPanelLoading] = useState(false);
  const [panelSearch, setPanelSearch] = useState('');

  // Load data
  const loadData = async (mode: ListMode = listMode) => {
    setLoadingList(true);
    try {
      if (mode === 'today') {
        // const result = await getChamCongHomNay();
        // setData(result);
        setData([]); // TODO: Call API
      } else {
        // const result = await getAllChamCong();
        // setData(result);
        setData([]); // TODO: Call API
      }
    } catch (error) {
      console.error('Error loading data:', error);
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

  const loadPanelData = async (maChamCong: number, mode: PanelMode) => {
    setPanelLoading(true);
    try {
      if (mode === 'lichSu') {
        // const result = await getLichSu(maChamCong);
        // setPanelData(result);
        setPanelData([]); // TODO: Call API
      } else {
        // const result = await getChiTietByCa(maChamCong);
        // setPanelData(result);
        setPanelData([]); // TODO: Call API
      }
    } catch (error) {
      console.error('Error loading panel data:', error);
    }
    setPanelLoading(false);
  };

  const openPanel = (
    ca: ChamCong,
    mode: PanelMode,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isEdit && editId !== null) {
        // await updateChamCong(editId, { CaLamViec: formCa });
        console.log('Update ca:', editId, formCa); // TODO: Call API
      } else {
        // await createChamCong({ CaLamViec: formCa, ThoiGian: getTodayISO() });
        console.log('Create ca:', formCa); // TODO: Call API
      }
      setShowForm(false);
      setIsEdit(false);
      setFormCa('Ca 1');
      setEditId(null);
      loadData();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Có lỗi xảy ra');
    }
  };

  const openCreate = () => {
    setIsEdit(false);
    setEditId(null);
    setFormCa('Ca 1');
    setShowForm(true);
  };

  const openEdit = (ca: ChamCong, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFormCa(ca.CaLamViec);
    setEditId(ca.MaChamCong);
    setIsEdit(true);
    setShowForm(true);
  };

  const handleDelete = async (
    id: number,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    if (confirm('Bạn có chắc muốn xóa ca này?')) {
      try {
        // await deleteChamCong(id);
        console.log('Delete ca:', id); // TODO: Call API
        if (panelCa?.MaChamCong === id) {
          setPanelCa(null);
          setPanelMode(null);
        }
        loadData();
      } catch (error) {
        console.error('Error deleting:', error);
      }
    }
  };

  const handlePanelChamVao = async (maNV: string) => {
    if (!panelCa) return;
    try {
      const gioVao = new Date().toTimeString().split(' ')[0];
      // await chamVao({ maNV, maChamCong: panelCa.MaChamCong, gioVao });
      console.log('Cham vao:', maNV, gioVao); // TODO: Call API
      loadPanelData(panelCa.MaChamCong, 'chamVao');
    } catch (error) {
      console.error('Error chamVao:', error);
    }
  };

  const handlePanelChamRa = async (maChiTiet: string) => {
    if (!panelCa) return;
    try {
      const gioRa = new Date().toTimeString().split(' ')[0];
      // await chamRa({ MaChiTiet: maChiTiet, gioRa });
      console.log('Cham ra:', maChiTiet, gioRa); // TODO: Call API
      loadPanelData(panelCa.MaChamCong, 'chamRa');
    } catch (error) {
      console.error('Error chamRa:', error);
    }
  };

  // Filter
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

  const panelTitle =
    panelMode === 'chamVao'
      ? 'Chấm vào'
      : panelMode === 'chamRa'
        ? 'Chấm ra'
        : 'Lịch sử chấm công';

  const panelColor =
    panelMode === 'chamVao'
      ? '#1565c0'
      : panelMode === 'chamRa'
        ? '#e53935'
        : '#6d4c41';

  // ======================== RENDER ========================
  return (
    <div style={styles.page}>
      {/* Toolbar */}
      <div style={styles.toolbar}>
        <div style={styles.titleSection}>
          <h1 style={styles.pageTitle}>
            {listMode === 'today'
              ? 'Ca chấm công hôm nay'
              : 'Tất cả ca chấm công'}
          </h1>
          {listMode === 'today' && (
            <span style={styles.chip}>
              <CalendarDays size={12} /> {getTodayISO()}
            </span>
          )}
        </div>
        <div style={styles.buttonGroup}>
          <button
            style={{
              ...styles.btnToggle,
              background: listMode === 'today' ? '#1565c0' : '#fff',
              color: listMode === 'today' ? '#fff' : '#1565c0',
              border: '1.5px solid #1565c0',
            }}
            onClick={() => switchListMode('today')}
          >
            <CalendarDays size={14} /> Hôm nay
          </button>
          <button
            style={{
              ...styles.btnToggle,
              background: listMode === 'all' ? '#1565c0' : '#fff',
              color: listMode === 'all' ? '#fff' : '#1565c0',
              border: '1.5px solid #1565c0',
            }}
            onClick={() => switchListMode('all')}
          >
            <List size={14} /> Tất cả
          </button>
          <button style={styles.btnPrimary} onClick={openCreate}>
            <Plus size={16} /> Tạo ca
          </button>
        </div>
      </div>

      {/* Search */}
      <input
        style={styles.searchInput}
        placeholder="Tìm kiếm ca..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thead}>
              <th style={styles.th}>Mã</th>
              <th style={styles.th}>Ca</th>
              <th style={styles.th}>Ngày</th>
              <th style={styles.th}>Chấm công</th>
              <th style={styles.th}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loadingList ? (
              <tr>
                <td
                  colSpan={5}
                  style={{ ...styles.td, textAlign: 'center', padding: '32px' }}
                >
                  Đang tải...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  style={{ ...styles.td, textAlign: 'center', padding: '32px' }}
                >
                  {listMode === 'today'
                    ? 'Không có ca hôm nay'
                    : 'Không có dữ liệu'}
                </td>
              </tr>
            ) : (
              <>
                {filtered.map((ca) => {
                  const caIsToday = isToday(ca.ThoiGian);
                  const isPanelOpen =
                    panelCa?.MaChamCong === ca.MaChamCong && panelMode;

                  return (
                    <React.Fragment key={ca.MaChamCong}>
                      {/* Row */}
                      <tr style={styles.tr}>
                        <td style={styles.td}>{ca.MaChamCong}</td>
                        <td style={{ ...styles.td, fontWeight: 500 }}>
                          {ca.CaLamViec}
                        </td>
                        <td style={styles.td}>
                          <div style={styles.dateCell}>
                            <span>{ca.ThoiGian}</span>
                            {caIsToday && (
                              <span style={styles.badgeToday}>Hôm nay</span>
                            )}
                          </div>
                        </td>
                        <td
                          style={styles.td}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div style={styles.actionBtns}>
                            {caIsToday && (
                              <>
                                <button
                                  style={{
                                    ...styles.chamBtn,
                                    background:
                                      panelCa?.MaChamCong === ca.MaChamCong &&
                                      panelMode === 'chamVao'
                                        ? '#1565c0'
                                        : '#e3edf9',
                                    color:
                                      panelCa?.MaChamCong === ca.MaChamCong &&
                                      panelMode === 'chamVao'
                                        ? '#fff'
                                        : '#1565c0',
                                  }}
                                  onClick={(e) => openPanel(ca, 'chamVao', e)}
                                >
                                  <UserCheck size={14} /> Vào
                                </button>
                                <button
                                  style={{
                                    ...styles.chamBtn,
                                    background:
                                      panelCa?.MaChamCong === ca.MaChamCong &&
                                      panelMode === 'chamRa'
                                        ? '#e53935'
                                        : '#fdecea',
                                    color:
                                      panelCa?.MaChamCong === ca.MaChamCong &&
                                      panelMode === 'chamRa'
                                        ? '#fff'
                                        : '#e53935',
                                  }}
                                  onClick={(e) => openPanel(ca, 'chamRa', e)}
                                >
                                  <LogOut size={14} /> Ra
                                </button>
                              </>
                            )}
                            <button
                              style={{
                                ...styles.chamBtn,
                                background:
                                  panelCa?.MaChamCong === ca.MaChamCong &&
                                  panelMode === 'lichSu'
                                    ? '#5d4037'
                                    : '#f3ece8',
                                color:
                                  panelCa?.MaChamCong === ca.MaChamCong &&
                                  panelMode === 'lichSu'
                                    ? '#fff'
                                    : '#6d4c41',
                              }}
                              onClick={(e) => openPanel(ca, 'lichSu', e)}
                            >
                              <History size={14} /> Sử
                            </button>
                          </div>
                        </td>
                        <td
                          style={styles.td}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            style={styles.iconBtn}
                            onClick={(e) => openEdit(ca, e)}
                            title="Sửa"
                          >
                            <Pencil size={16} color="#1976d2" />
                          </button>
                          <button
                            style={styles.iconBtn}
                            onClick={(e) => handleDelete(ca.MaChamCong, e)}
                            title="Xóa"
                          >
                            <Trash2 size={16} color="#d32f2f" />
                          </button>
                        </td>
                      </tr>

                      {/* Panel */}
                      {isPanelOpen && (
                        <tr key={`panel-${ca.MaChamCong}`}>
                          <td colSpan={5} style={{ padding: 0 }}>
                            <div
                              style={{
                                ...styles.panel,
                                borderTop: `3px solid ${panelColor}`,
                              }}
                            >
                              {/* Panel Header */}
                              <div style={styles.panelHeader}>
                                <div style={styles.panelTitleGroup}>
                                  <span
                                    style={{
                                      ...styles.panelTitle,
                                      color: panelColor,
                                    }}
                                  >
                                    {panelTitle}
                                  </span>
                                  <span style={styles.panelSubtitle}>
                                    {ca.CaLamViec} · {ca.ThoiGian}
                                  </span>
                                </div>
                                <button
                                  style={styles.closeBtn}
                                  onClick={() => {
                                    setPanelCa(null);
                                    setPanelMode(null);
                                    setPanelSearch('');
                                  }}
                                >
                                  ✕
                                </button>
                              </div>

                              {/* Search */}
                              <div style={styles.panelSearchBox}>
                                <Search
                                  size={14}
                                  color="#9aa3b5"
                                  style={styles.searchIcon}
                                />
                                <input
                                  style={styles.panelSearchInput}
                                  placeholder="Tìm nhân viên..."
                                  value={panelSearch}
                                  onChange={(e) =>
                                    setPanelSearch(e.target.value)
                                  }
                                />
                              </div>

                              {/* Data */}
                              <div style={styles.panelScroll}>
                                {panelLoading ? (
                                  <div style={styles.loadingText}>
                                    Đang tải...
                                  </div>
                                ) : panelFiltered.length === 0 ? (
                                  <div style={styles.emptyText}>
                                    {panelSearch
                                      ? 'Không tìm thấy'
                                      : panelMode === 'chamVao'
                                        ? 'Tất cả đã chấm'
                                        : panelMode === 'chamRa'
                                          ? 'Không cần chấm'
                                          : 'Không có dữ liệu'}
                                  </div>
                                ) : (
                                  <table style={styles.panelTable}>
                                    <thead>
                                      <tr style={styles.thead}>
                                        <th style={styles.th}>Mã NV</th>
                                        <th style={styles.th}>Tên</th>
                                        <th style={styles.th}>
                                          {panelMode === 'lichSu'
                                            ? 'Trạng thái'
                                            : 'Vào'}
                                        </th>
                                        <th style={styles.th}>Ra</th>
                                        {panelMode !== 'lichSu' && (
                                          <th style={styles.th}>Hành động</th>
                                        )}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {panelFiltered.map((nv) => (
                                        <tr
                                          key={`${nv.MaNV}-${nv.MaChiTiet}`}
                                          style={styles.tr}
                                        >
                                          <td style={styles.td}>{nv.MaNV}</td>
                                          <td
                                            style={{
                                              ...styles.td,
                                              fontWeight: 500,
                                            }}
                                          >
                                            {nv.HoTen || nv.MaNV}
                                          </td>
                                          {panelMode === 'lichSu' ? (
                                            <>
                                              <td style={styles.td}>
                                                {nv.GioVao && nv.GioRa ? (
                                                  <span
                                                    style={styles.badgeGreen}
                                                  >
                                                    ● Hoàn thành
                                                  </span>
                                                ) : nv.GioVao ? (
                                                  <span
                                                    style={styles.badgeYellow}
                                                  >
                                                    ● Đang làm
                                                  </span>
                                                ) : (
                                                  <span style={styles.badgeRed}>
                                                    ● Vắng
                                                  </span>
                                                )}
                                              </td>
                                              <td style={styles.td}>
                                                {nv.GioRa || '-'}
                                              </td>
                                            </>
                                          ) : (
                                            <>
                                              <td style={styles.td}>
                                                {nv.GioVao || '-'}
                                              </td>
                                              <td style={styles.td}>
                                                {nv.GioRa || '-'}
                                              </td>
                                              <td style={styles.td}>
                                                {panelMode === 'chamVao' ? (
                                                  <button
                                                    style={styles.btnSmall}
                                                    onClick={() =>
                                                      handlePanelChamVao(
                                                        nv.MaNV,
                                                      )
                                                    }
                                                  >
                                                    <UserCheck size={13} /> Chấm
                                                  </button>
                                                ) : (
                                                  <button
                                                    style={{
                                                      ...styles.btnSmall,
                                                      background: '#e53935',
                                                    }}
                                                    onClick={() =>
                                                      handlePanelChamRa(
                                                        String(nv.MaChiTiet),
                                                      )
                                                    }
                                                  >
                                                    <LogOut size={13} /> Chấm
                                                  </button>
                                                )}
                                              </td>
                                            </>
                                          )}
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showForm && (
        <div style={styles.overlay}>
          <form style={styles.modal} onSubmit={handleSubmit}>
            <h2 style={styles.modalTitle}>
              {isEdit ? 'Sửa ca' : 'Tạo ca mới'}
            </h2>
            <div style={styles.formGroup}>
              <label style={styles.label}>Ca làm việc</label>
              <select
                style={styles.select}
                value={formCa}
                onChange={(e) => setFormCa(e.target.value)}
                required
              >
                {CA_OPTIONS.map((ca) => (
                  <option key={ca} value={ca}>
                    {ca}
                  </option>
                ))}
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Ngày</label>
              <input
                style={{
                  ...styles.input,
                  background: '#f7f8fc',
                  color: '#888',
                }}
                value={getTodayISO()}
                readOnly
              />
            </div>
            <div style={styles.modalActions}>
              <button type="submit" style={styles.btnPrimary}>
                {isEdit ? 'Cập nhật' : 'Tạo'}
              </button>
              <button
                type="button"
                style={styles.btnCancel}
                onClick={() => setShowForm(false)}
              >
                Đóng
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// ======================== STYLES ========================
const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: '24px 32px',
    background: '#f4f6fb',
    minHeight: '100vh',
    fontFamily: 'system-ui, sans-serif',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    gap: '16px',
    flexWrap: 'wrap',
  },
  titleSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  pageTitle: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#1a2340',
    margin: 0,
  },
  buttonGroup: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  chip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 500,
    background: '#e3f2fd',
    color: '#1565c0',
  },
  searchInput: {
    display: 'block',
    width: '100%',
    maxWidth: '300px',
    padding: '9px 14px',
    borderRadius: '8px',
    border: '1px solid #dde3ee',
    fontSize: '14px',
    background: '#fff',
    marginBottom: '16px',
    outline: 'none',
  },
  card: {
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  thead: {
    background: '#f7f8fc',
  },
  th: {
    padding: '12px 16px',
    textAlign: 'left',
    fontSize: '13px',
    fontWeight: 600,
    color: '#4a5568',
    borderBottom: '1px solid #edf0f7',
  },
  tr: {
    borderBottom: '1px solid #f0f2f8',
  },
  td: {
    padding: '12px 16px',
    fontSize: '14px',
    color: '#2d3748',
    verticalAlign: 'middle',
  },
  dateCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  badgeToday: {
    background: '#e3f2fd',
    color: '#1565c0',
    padding: '2px 8px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: 600,
    whiteSpace: 'nowrap',
  },
  badgeGreen: {
    background: '#e8f5e9',
    color: '#2e7d32',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 500,
  },
  badgeYellow: {
    background: '#fff8e1',
    color: '#f57f17',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 500,
  },
  badgeRed: {
    background: '#fce4ec',
    color: '#c62828',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 500,
  },
  actionBtns: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  chamBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    border: 'none',
    borderRadius: '6px',
    padding: '5px 10px',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.15s',
    whiteSpace: 'nowrap',
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '6px',
    borderRadius: '6px',
    marginRight: '2px',
    transition: 'background 0.2s',
  },
  btnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: '#1565c0',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '9px 16px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  btnToggle: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    borderRadius: '8px',
    padding: '8px 14px',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  btnSmall: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    background: '#1565c0',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '5px 10px',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'pointer',
  },
  panel: {
    padding: '16px 20px 0',
    background: '#f8faff',
  },
  panelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
    gap: '12px',
  },
  panelTitleGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
  },
  panelTitle: {
    fontSize: '14px',
    fontWeight: 700,
  },
  panelSubtitle: {
    fontSize: '12px',
    color: '#9aa3b5',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    color: '#9aa3b5',
    cursor: 'pointer',
    padding: '0 4px',
  },
  panelSearchBox: {
    position: 'relative',
    marginBottom: '8px',
  },
  searchIcon: {
    position: 'absolute',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  panelSearchInput: {
    width: '100%',
    padding: '8px 12px 8px 32px',
    borderRadius: '6px',
    border: '1px solid #dde3ee',
    fontSize: '13px',
    background: '#fff',
    outline: 'none',
    boxSizing: 'border-box',
  },
  panelScroll: {
    maxHeight: '300px',
    overflowY: 'auto',
    paddingBottom: '12px',
  },
  panelTable: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '13px',
  },
  loadingText: {
    padding: '16px',
    textAlign: 'center',
    color: '#aaa',
  },
  emptyText: {
    padding: '16px',
    textAlign: 'center',
    color: '#bbb',
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.35)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  modal: {
    background: '#fff',
    borderRadius: '12px',
    padding: '28px',
    width: '360px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
  },
  modalTitle: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#1a2340',
    margin: '0 0 20px',
  },
  formGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    fontSize: '12px',
    fontWeight: 600,
    color: '#4a5568',
    marginBottom: '6px',
  },
  select: {
    width: '100%',
    padding: '9px 12px',
    borderRadius: '8px',
    border: '1px solid #dde3ee',
    fontSize: '14px',
    outline: 'none',
    background: '#fff',
    cursor: 'pointer',
    boxSizing: 'border-box',
  },
  input: {
    width: '100%',
    padding: '9px 12px',
    borderRadius: '8px',
    border: '1px solid #dde3ee',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  modalActions: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end',
    marginTop: '20px',
  },
  btnCancel: {
    background: '#f0f2f8',
    color: '#4a5568',
    border: 'none',
    borderRadius: '8px',
    padding: '9px 16px',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
  },
};
