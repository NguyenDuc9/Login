'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  LayoutDashboard,
} from 'lucide-react';

const menuItems = [
  { name: 'Tổng quan', href: '/Manager/dashboard', icon: LayoutDashboard },
  { name: 'Nhân viên', href: '/Manager/NhanVien', icon: Users },
  { name: 'Phòng ban', href: '/Manager/PhongBanCongTy', icon: Building2 },
  { name: 'Hợp đồng lao động', href: '/Manager/HDLD', icon: FileText },
  { name: 'Phụ cấp', href: '/Manager/PhuCap', icon: Gift },
  { name: 'Thưởng phạt', href: '/Manager/ThuongPhat', icon: AlertCircle },
  { name: 'Bảng lương', href: '/Manager/BangLuong', icon: ClipboardList },
  { name: 'Chấm công', href: '/Manager/ChamCong', icon: Clock },
  { name: 'Lương', href: '/Manager/Luong', icon: DollarSign },
  { name: 'Nghỉ phép', href: '/Manager/NghiPhep', icon: Calendar },
];

export default function SidebarManager() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col shadow-xl">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>
          </div>
          <div>
            <h2 className="font-bold text-lg">HR Manager</h2>
            <p className="text-xs text-slate-400">Quản lý nhân sự</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-3">
          Quản lý
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700/50">
        <div className="bg-slate-800/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
              M
            </div>
            <div>
              <p className="text-sm font-medium text-white">Quản lý</p>
              <p className="text-xs text-slate-400">Đang hoạt động</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
