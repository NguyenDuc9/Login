'use client';

import SidebarManager from '../../components/SidebarManager';
import { Bell, LogOut, HelpCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('user');
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar - Cố định, không di chuyển khi cuộn */}
      <aside className="w-64 h-screen sticky top-0 flex-shrink-0">
        <SidebarManager />
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top header - Cố định ở trên cùng */}
        <header className="h-16 flex-shrink-0 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm flex items-center justify-between px-6 sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Quản lý nhân sự</h1>
            <p className="text-sm text-slate-500">
              {user ? `Chào mừng, ${user.ho_ten || user.TenDangNhap}` : 'Chào mừng quay trở lại'}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </button>

            <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <HelpCircle className="w-5 h-5 text-slate-600" />
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-800">
                  {user?.ho_ten || user?.TenDangNhap || 'Quản lý'}
                </p>
                <p className="text-xs text-slate-500">
                  {user?.chuc_vu || 'Quản lý'}
                </p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                {user?.ho_ten?.charAt(0) || user?.TenDangNhap?.charAt(0) || 'M'}
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-medium text-sm shadow-md hover:shadow-lg active:scale-95"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Đăng xuất</span>
            </button>
          </div>
        </header>

        {/* Page content - Vùng này sẽ cuộn */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
