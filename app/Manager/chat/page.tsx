'use client';

import React from 'react';
import ChatContainer from '@/components/ChatContainer'; // Hãy sửa lại đường dẫn đúng với thư mục components của bạn

export default function AdminChatPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-slate-900 p-4 md:p-8 flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-md mb-4 flex items-center justify-between bg-slate-800/40 backdrop-blur-md px-5 py-3 rounded-2xl border border-indigo-500/20 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-emerald-400 tracking-wide uppercase">
            Hệ Thống Vận Hành
          </span>
        </div>
        <h1 className="text-base font-bold text-white">Màn hình Quản lý</h1>
      </div>

      {/* Gọi khung chat gắn định danh của Admin, đảo ngược props với Giám đốc */}
      <ChatContainer tenDangNhapHienTai="admin" tenDangNhapDoiPhuong="QuanLy" />
    </div>
  );
}
