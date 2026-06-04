'use client';

import { useState, useRef, useEffect } from 'react';
import SidebarAdmin from '../../components/SidebarAdmin';
import { LogOut, Bell, MessageSquare, X, Send, Bot } from 'lucide-react';
// Import API hàm gọi AI của bạn
import { PostAIRequest } from '@/service/ai.api'; // Hãy sửa lại đường dẫn cho đúng với dự án của bạn

export default function LayoutAdmin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // --- Khai báo các State quản lý Chat ---
  const [isOpen, setIsOpen] = useState(false); // Đóng/mở khung chat
  const [input, setInput] = useState(''); // Lưu tin nhắn người dùng đang gõ
  const [loading, setLoading] = useState(false); // Trạng thái đang đợi AI trả lời
  const [messages, setMessages] = useState<
    Array<{ sender: 'user' | 'bot'; text: string }>
  >([
    {
      sender: 'bot',
      text: 'Xin chào! Tôi là AI Assistant quản lý nhân sự. Bạn cần tôi giúp gì hôm nay?',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Tự động cuộn xuống tin nhắn mới nhất
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  // --- Hàm xử lý gửi tin nhắn lên API ---
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput(''); // Xóa ô nhập dữ liệu

    // 1. Thêm tin nhắn của người dùng vào giao diện
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setLoading(true);

    try {
      // 2. Gọi API của bạn (Nó sẽ gọi sang endpoint http://localhost:3001/api/ai/chat)
      // Lưu ý: Đảm bảo file api.ts của bạn đã gắn tiền tố '/chat' nếu endpoint của bạn là /ai/chat
      const res = await PostAIRequest({ message: userMessage });

      if (res.success) {
        // 3. Thêm câu trả lời của AI vào giao diện
        setMessages((prev) => [...prev, { sender: 'bot', text: res.answer }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: 'bot', text: 'Có lỗi xảy ra, vui lòng thử lại.' },
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Không thể kết nối đến server AI.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100 relative">
      {/* Sidebar - Cố định, không di chuyển khi cuộn */}
      <aside className="w-64 h-screen sticky top-0 flex-shrink-0">
        <SidebarAdmin />
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header - Cố định ở trên cùng */}
        <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm flex items-center justify-between px-6 sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              Quản trị hệ thống
            </h1>
            <p className="text-sm text-slate-500">Chào mừng quay trở lại</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </button>

            {/* User info */}
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-800">Admin</p>
                <p className="text-xs text-slate-500">Quản trị viên</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                A
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-medium text-sm shadow-md hover:shadow-lg active:scale-95"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Đăng xuất</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>

      {/* ========================================================= */}
      {/* KHU VỰC KHUNG CHAT AI (FLOATING CHAT WIDGET) */}
      {/* ========================================================= */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Khung nội dung Chat (Chỉ hiện khi isOpen === true) */}
        {isOpen && (
          <div className="w-80 md:w-96 h-[450px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden mb-4 transition-all duration-300 transform scale-100 origin-bottom-right">
            {/* Header Khung Chat */}
            <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <div>
                  <h3 className="font-bold text-sm">Trợ lý Nhân sự AI</h3>
                  <p className="text-[10px] text-indigo-200">
                    Sẵn sàng hỗ trợ bạn
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Vùng hiển thị nội dung tin nhắn */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 text-sm shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Hiệu ứng loading dấu ba chấm khi đợi AI trả lời */}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-3 shadow-sm flex items-center gap-1">
                    <span
                      className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    />
                    <span
                      className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    />
                    <span
                      className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Ô Form nhập nội dung chat */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 bg-white border-t border-slate-200 flex gap-2 items-center"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Hỏi AI về nhân viên, nam/nữ..."
                disabled={loading}
                className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-50 disabled:text-slate-400"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:bg-slate-200 disabled:text-slate-400 active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Nút bấm tròn kích hoạt Chat (Luôn hiển thị ở góc) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 active:scale-90 ${
            isOpen
              ? 'bg-slate-700 hover:bg-slate-800 rotate-90'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:scale-105'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageSquare className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
}
