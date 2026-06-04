'use client';

import Link from 'next/link';
import {
  Users,
  Building2,
  FileText,
  DollarSign,
  Clock,
  Gift,
  AlertCircle,
  Calendar,
  ClipboardList,
  UserPlus,
  CalendarCheck,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
} from 'lucide-react';

const stats = [
  {
    name: 'Tổng nhân viên',
    value: '128',
    change: '+12%',
    isUp: true,
    icon: Users,
    color: 'from-blue-600 to-indigo-700',
  },
  {
    name: 'Phòng ban',
    value: '08',
    change: 'Không đổi',
    isUp: null,
    icon: Building2,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'Đang chấm công',
    value: '45',
    change: '85% công suất',
    isUp: true,
    icon: Clock,
    color: 'from-amber-500 to-orange-600',
  },
  {
    name: 'Nghỉ phép',
    value: '05',
    change: '-2 so với hôm qua',
    isUp: false,
    icon: Calendar,
    color: 'from-rose-500 to-pink-600',
  },
];

const quickActions = [
  {
    name: 'Thêm nhân viên',
    href: '/Manager/NhanVien',
    icon: UserPlus,
    color: 'bg-indigo-600',
  },
  {
    name: 'Tạo ca chấm công',
    href: '/Manager/ChamCong',
    icon: CalendarCheck,
    color: 'bg-emerald-600',
  },
  {
    name: 'Xem bảng lương',
    href: '/Manager/BangLuong',
    icon: ClipboardList,
    color: 'bg-amber-600',
  },
  {
    name: 'Duyệt nghỉ phép',
    href: '/Manager/NghiPhep',
    icon: Calendar,
    color: 'bg-rose-600',
  },
];

export default function ManagerDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Bảng điều khiển
          </h1>
          <p className="text-slate-500 font-medium">
            Chào buổi sáng! Đây là những gì đang diễn ra trong hôm nay.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-200 text-slate-600 font-semibold text-sm">
          <Calendar className="w-4 h-4 text-indigo-600" />
          {new Date().toLocaleDateString('vi-VN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="group relative overflow-hidden bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:shadow-xl hover:border-indigo-100 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                    {stat.name}
                  </p>
                  <p className="text-4xl font-black text-slate-900 tracking-tight">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1">
                    {stat.isUp === true && (
                      <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                    )}
                    {stat.isUp === false && (
                      <ArrowDownRight className="w-4 h-4 text-rose-500" />
                    )}
                    <span
                      className={`text-xs font-bold ${stat.isUp ? 'text-emerald-600' : stat.isUp === false ? 'text-rose-600' : 'text-slate-400'}`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div
                  className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions Bar */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-600" /> Thao tác nhanh
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className={`flex items-center justify-between p-4 ${action.color} text-white rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95 group`}
            >
              <div className="flex items-center gap-3">
                <action.icon className="w-6 h-6" />
                <span className="font-bold tracking-tight">{action.name}</span>
              </div>
              <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Activity Feed */}
        <div className="xl:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Hoạt động mới nhất
            </h2>
            <button className="text-sm font-bold text-indigo-600 hover:underline">
              Xem tất cả
            </button>
          </div>
          <div className="space-y-6">
            {[
              {
                user: 'Nguyễn Văn A',
                action: 'đã hoàn thành chấm công',
                time: '5 phút trước',
                icon: Clock,
                color: 'text-emerald-600 bg-emerald-50',
              },
              {
                user: 'Trần Thị B',
                action: 'vừa gửi đơn nghỉ phép năm',
                time: '15 phút trước',
                icon: Calendar,
                color: 'text-amber-600 bg-amber-50',
              },
              {
                user: 'Lê Văn C',
                action: 'được khen thưởng nhân viên xuất sắc',
                time: '30 phút trước',
                icon: Award,
                color: 'text-indigo-600 bg-indigo-50',
              },
              {
                user: 'Phạm Thị D',
                action: 'đã cập nhật hồ sơ cá nhân',
                time: '1 giờ trước',
                icon: Users,
                color: 'text-blue-600 bg-blue-50',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-5 p-3 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer border border-transparent hover:border-slate-100"
              >
                <div className={`p-3 rounded-xl ${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-600">
                    <span className="font-bold text-slate-900">
                      {item.user}
                    </span>{' '}
                    {item.action}
                  </p>
                  <p className="text-xs text-slate-400 font-medium">
                    {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Quick Links */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Quản trị hệ thống
          </h2>
          <div className="space-y-3">
            {[
              {
                name: 'Quản lý nhân viên',
                href: '/Manager/NhanVien',
                icon: Users,
                desc: '128 hồ sơ',
              },
              {
                name: 'Cấu trúc phòng ban',
                href: '/Manager/PhongBanCongTy',
                icon: Building2,
                desc: 'Tổ chức bộ máy',
              },
              {
                name: 'Lịch sử chấm công',
                href: '/Manager/ChamCong',
                icon: Clock,
                desc: 'Theo dõi thời gian',
              },
              {
                name: 'Tổng hợp lương',
                href: '/Manager/BangLuong',
                icon: DollarSign,
                desc: 'Bảng kê chi tiết',
              },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group"
              >
                <div className="p-3 rounded-xl bg-slate-50 group-hover:bg-white transition-colors shadow-sm">
                  <item.icon className="w-5 h-5 text-slate-600 group-hover:text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-700">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-400 font-medium">
                    {item.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
