'use client';

import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  X,
  DollarSign,
  Calendar,
  Users,
  FileText,
  Loader,
} from 'lucide-react';
import { Button, Card, Badge, Modal } from '@/components/ui';
import { getAllNhanVien } from '@/service/NhanVien.api';
import { TinhLuong, ThemLuong } from '@/service/Luong.api';

interface SalaryDetail {
  MaNV: string;
  HoTen: string;
  Thang: number;
  Nam: number;
  LuongCoBan: number;
  TienNgayCong: number;
  TongPhuCap: number;
  TienTangCa: number;
  TongThuong: number;
  TongPhat: number;
  BaoHiem: number;
  LuongThucNhan: number;
  SoNgayLam?: number;
}

export default function BangLuongPage() {
  const [activeTab, setActiveTab] = useState<'employees' | 'salary'>(
    'employees',
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1,
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
  const [currentSalary, setCurrentSalary] = useState<SalaryDetail | null>(null);

  const [salaryList, setSalaryList] = useState<SalaryDetail[]>([
    {
      MaNV: 'NV001',
      HoTen: 'Nguyễn Văn An',
      Thang: 4,
      Nam: 2026,
      LuongCoBan: 15000000,
      TienNgayCong: 375000,
      TongPhuCap: 2100000,
      TienTangCa: 800000,
      TongThuong: 1500000,
      TongPhat: -500000,
      BaoHiem: -1350000,
      LuongThucNhan: 16925000,
    },
    {
      MaNV: 'NV002',
      HoTen: 'Trần Thị Bình',
      Thang: 4,
      Nam: 2026,
      LuongCoBan: 18000000,
      TienNgayCong: 450000,
      TongPhuCap: 2600000,
      TienTangCa: 900000,
      TongThuong: 1800000,
      TongPhat: -300000,
      BaoHiem: -1620000,
      LuongThucNhan: 21830000,
    },
    {
      MaNV: 'NV003',
      HoTen: 'Lê Hoàng Cường',
      Thang: 4,
      Nam: 2026,
      LuongCoBan: 22000000,
      TienNgayCong: 550000,
      TongPhuCap: 3300000,
      TienTangCa: 1100000,
      TongThuong: 2000000,
      TongPhat: -600000,
      BaoHiem: -1980000,
      LuongThucNhan: 26370000,
    },
  ]);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const data = await getAllNhanVien();
      setEmployees(data);
    } catch (error) {
      console.error('Lỗi khi tải danh sách nhân viên:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewSalary = async (employee: any) => {
    try {
      setLoadingDetail(true);
      setSelectedEmployee(employee);
      const salary = await TinhLuong(
        employee.MaNV,
        selectedMonth,
        selectedYear,
      );
      setCurrentSalary(salary);
      setShowDetailModal(true);
    } catch (error) {
      console.error('Lỗi khi tải chi tiết lương:', error);
      setCurrentSalary({
        MaNV: employee.MaNV,
        HoTen: employee.HoTen,
        Thang: selectedMonth,
        Nam: selectedYear,
        LuongCoBan: 15000000,
        TienNgayCong: 0,
        TongPhuCap: 2000000,
        TienTangCa: 1000000,
        TongThuong: 1000000,
        TongPhat: 0,
        BaoHiem: -1350000,
        LuongThucNhan: 16700000,
      });
      setShowDetailModal(true);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleAddToDatabase = async () => {
    if (!currentSalary) return;
    try {
      setLoadingDetail(true);
      const response = await ThemLuong(currentSalary);
      if (response.success) {
        alert(response.message);
        setShowDetailModal(false);
      }
    } catch (error) {
      console.error('Lỗi khi thêm vào CSDL:', error);
      alert('Không thể thêm vào CSDL');
    } finally {
      setLoadingDetail(false);
    }
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(Number(value));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Bảng lương</h1>
          <p className="text-slate-500 mt-1">Tính và quản lý lương nhân viên</p>
        </div>
      </div>

      {/* Filter Section */}
      <Card className="!p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="px-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
                  <option key={m} value={m}>
                    Tháng {m}
                  </option>
                ))}
              </select>
            </div>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="px-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {[2024, 2025, 2026].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'employees' ? 'primary' : 'secondary'}
              onClick={() => setActiveTab('employees')}
            >
              <Users className="w-4 h-4" />
              Danh sách nhân viên
            </Button>
            <Button
              variant={activeTab === 'salary' ? 'primary' : 'secondary'}
              onClick={() => setActiveTab('salary')}
            >
              <FileText className="w-4 h-4" />
              Bảng lương
            </Button>
          </div>
        </div>
      </Card>

      {/* Content */}
      {activeTab === 'employees' ? (
        <Card className="!p-0 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">
              Danh sách nhân viên
            </h2>
          </div>
          {loading ? (
            <div className="py-12 text-center text-slate-400">
              <Loader className="w-8 h-8 mx-auto mb-4 animate-spin" />
              <p>Đang tải dữ liệu...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Mã NV
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Họ tên
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Ngày sinh
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Giới tính
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {employees.map((emp) => (
                    <tr
                      key={emp.MaNV}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-indigo-600">
                        {emp.MaNV}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-800">
                        {emp.HoTen}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {emp.NgaySinh}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {emp.GioiTinh}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleViewSalary(emp)}
                        >
                          <DollarSign className="w-4 h-4" />
                          Tính lương
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      ) : (
        <Card className="!p-0 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">
              Bảng chi tiết lương tháng {selectedMonth}/{selectedYear}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                    Mã NV
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">
                    Tên NV
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">
                    Lương CB
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">
                    Phụ cấp
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">
                    Tăng ca
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">
                    Thưởng
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">
                    Phạt
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">
                    Bảo hiểm
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">
                    Thực nhận
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {salaryList.map((salary) => (
                  <tr
                    key={salary.MaNV}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-indigo-600">
                      {salary.MaNV}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-800">
                      {salary.HoTen}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 text-right">
                      {formatCurrency(salary.LuongCoBan)}
                    </td>
                    <td className="px-4 py-3 text-sm text-emerald-600 text-right">
                      +{formatCurrency(salary.TongPhuCap)}
                    </td>
                    <td className="px-4 py-3 text-sm text-blue-600 text-right">
                      +{formatCurrency(salary.TienTangCa)}
                    </td>
                    <td className="px-4 py-3 text-sm text-emerald-600 text-right">
                      +{formatCurrency(salary.TongThuong)}
                    </td>
                    <td className="px-4 py-3 text-sm text-red-600 text-right">
                      {formatCurrency(salary.TongPhat)}
                    </td>
                    <td className="px-4 py-3 text-sm text-red-500 text-right">
                      {formatCurrency(salary.BaoHiem)}
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-emerald-600 text-right">
                      {formatCurrency(salary.LuongThucNhan)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Detail Modal */}
      <Modal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title="Chi tiết lương nhân viên"
        size="lg"
      >
        {loadingDetail ? (
          <div className="py-12 text-center">
            <Loader className="w-8 h-8 mx-auto mb-4 animate-spin text-indigo-600" />
            <p className="text-slate-400">Đang tải chi tiết lương...</p>
          </div>
        ) : (
          currentSalary && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 pb-4 border-b border-slate-200">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                  {currentSalary.HoTen?.charAt(0) || 'N'}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">
                    {currentSalary.HoTen}
                  </h3>
                  <p className="text-slate-500">
                    Tháng {currentSalary.Thang}/{currentSalary.Nam}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Lương cơ bản', value: currentSalary.LuongCoBan },
                  {
                    label: 'Phụ cấp',
                    value: currentSalary.TongPhuCap,
                    color: 'text-emerald-600',
                  },
                  {
                    label: 'Tăng ca',
                    value: currentSalary.TienTangCa,
                    color: 'text-blue-600',
                  },
                  {
                    label: 'Thưởng',
                    value: currentSalary.TongThuong,
                    color: 'text-emerald-600',
                  },
                  {
                    label: 'Phạt',
                    value: currentSalary.TongPhat,
                    color: 'text-red-600',
                  },
                  {
                    label: 'Bảo hiểm',
                    value: currentSalary.BaoHiem,
                    color: 'text-red-500',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-50 rounded-xl border border-slate-200"
                  >
                    <p className="text-sm text-slate-500 mb-1">{item.label}</p>
                    <p
                      className={`text-lg font-semibold ${item.color || 'text-slate-800'}`}
                    >
                      {formatCurrency(item.value)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl">
                <p className="text-sm text-emerald-600 mb-1">Lương thực nhận</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {formatCurrency(currentSalary.LuongThucNhan)}
                </p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <Button
                  variant="secondary"
                  onClick={() => setShowDetailModal(false)}
                  className="flex-1"
                >
                  Đóng
                </Button>
                <Button
                  variant="success"
                  onClick={handleAddToDatabase}
                  className="flex-1"
                >
                  Thêm vào CSDL
                </Button>
              </div>
            </div>
          )
        )}
      </Modal>
    </div>
  );
}
