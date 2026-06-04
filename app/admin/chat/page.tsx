'use client';

import React from 'react';
import ChatContainer from '@/components/ChatContainer'; // Hãy sửa lại đường dẫn đúng với thư mục components của bạn

export default function GiamDocChatPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 md:p-8 flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-md mb-4 flex items-center justify-between bg-slate-800/50 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-700/50 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-amber-400 tracking-wide uppercase">
            Phòng Ban Chiến Lược
          </span>
        </div>
        <h1 className="text-base font-bold text-white">Màn hình Giám Đốc</h1>
      </div>

      {/* Gọi khung chat gắn định danh của Giám đốc */}
      <ChatContainer
        tenDangNhapHienTai="giamdoc"
        tenDangNhapDoiPhuong="admin"
      />
    </div>
  );
}
