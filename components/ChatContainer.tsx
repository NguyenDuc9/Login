'use client';

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { io, Socket } from 'socket.io-client';

// Cấu trúc dữ liệu tin nhắn truyền nhận qua Socket
interface TinNhanPayload {
  MaTinNhan?: number; 
  MaNguoiGui: string; 
  MaNguoiNhan: string; 
  NoiDung: string; 
  NgayGui?: string; 
}

// Props nhận từ trang Giám đốc hoặc Admin truyền vào
interface ChatContainerProps {
  tenDangNhapHienTai: string;   // Người đang ngồi trước màn hình
  tenDangNhapDoiPhuong: string; // Người ở đầu dây bên kia
}

// Kết nối tới cổng chạy Server Node.js của bạn (Cổng 3001)
const SOCKET_URL = 'http://localhost:3001';
const socket: Socket = io(SOCKET_URL);

export default function ChatContainer({
  tenDangNhapHienTai,
  tenDangNhapDoiPhuong,
}: ChatContainerProps): React.JSX.Element {
  const [messages, setMessages] = useState<TinNhanPayload[]>([]);
  const [input, setInput] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Phòng thủ nếu props truyền vào bị rỗng
  const nguoiGuiThucTe = tenDangNhapHienTai || 'NguoiGui';
  const nguoiNhanThucTe = tenDangNhapDoiPhuong || 'NguoiNhan';

  // Hàm cuộn mượt xuống đáy khi có tin nhắn mới
  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // LẮNG NGHE SỰ KIỆN SOCKET REALTIME từ Server phát về
    socket.on('receive_message', (message: TinNhanPayload) => {
      if (!message) return;

      // Kiểm tra tin nhắn vừa nhận có đúng là của cặp đôi này đang chat không
      const isBelongToThisChat =
        (message.MaNguoiGui === nguoiGuiThucTe && message.MaNguoiNhan === nguoiNhanThucTe) ||
        (message.MaNguoiGui === nguoiNhanThucTe && message.MaNguoiNhan === nguoiGuiThucTe);

      if (isBelongToThisChat) {
        setMessages((prev) => [...prev, message]);
      }
    });

    // Hủy lắng nghe khi chuyển trang để tránh lag máy (Memory Leak)
    return () => {
      socket.off('receive_message');
    };
  }, [nguoiGuiThucTe, nguoiNhanThucTe]);

  // Tự động cuộn xuống khi mảng tin nhắn tăng lên
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Hành động khi nhấn nút gửi tin nhắn
  const handleSendMessage = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!input.trim()) return;

    const payload: TinNhanPayload = {
      MaNguoiGui: nguoiGuiThucTe,
      MaNguoiNhan: nguoiNhanThucTe,
      NoiDung: input,
    };

    // Bắn dữ liệu lên Server Node.js qua Socket
    socket.emit('send_message', payload);
    setInput('');
  };

  return (
    <div className="flex flex-col h-[550px] w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden font-sans">
      
      {/* --- HEADER KHUNG CHAT --- */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="relative">
            {/* Avatar lấy 2 chữ cái đầu của đối phương */}
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold uppercase shadow-sm">
              {nguoiNhanThucTe.substring(0, 2)}
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">{nguoiNhanThucTe}</h3>
            <p className="text-xs text-green-500 font-medium">Đang hoạt động</p>
          </div>
        </div>
      </div>

      {/* --- VÙNG HIỂN THỊ TIN NHẮN (MESSENGER STYLE) --- */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.length === 0 ? (
          // Trạng thái trống khi chưa có tin nhắn nào
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 p-6">
            <p className="text-sm font-medium">Chưa có tin nhắn nào ở đây.</p>
            <p className="text-xs mt-1">Hãy nhập nội dung ở dưới để bắt đầu cuộc trò chuyện!</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            // So sánh người gửi để phân loại Trái (Người khác) hay Phải (Tôi)
            const isMe = msg?.MaNguoiGui === nguoiGuiThucTe;

            return (
              <div key={msg?.MaTinNhan || index} className={`flex items-end space-x-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
                
                {/* Hiện avatar nhỏ bên cạnh tin nhắn của đối phương */}
                {!isMe && (
                  <div className="w-7 h-7 rounded-full bg-gray-400 text-white flex items-center justify-center text-[10px] font-bold uppercase mb-1 border border-white shadow-sm flex-shrink-0">
                    {(msg?.MaNguoiGui || '??').substring(0, 2)}
                  </div>
                )}

                <div className={`flex flex-col max-w-[70%] ${isMe ? 'items-end' : 'items-start'}`}>
                  {/* Bong bóng chat bo góc chuẩn phom Messenger */}
                  <div className={`px-4 py-2.5 text-sm shadow-sm leading-relaxed break-words w-full
                    ${isMe
                      ? 'bg-blue-600 text-white rounded-t-2xl rounded-bl-2xl rounded-br-sm'
                      : 'bg-white text-gray-800 rounded-t-2xl rounded-br-2xl rounded-bl-sm border border-gray-100'
                    }`}
                  >
                    {msg?.NoiDung}
                  </div>

                  {/* Hiển thị mốc giờ phút nhắn */}
                  {msg?.NgayGui && (
                    <span className="text-[10px] text-gray-400 mt-1 px-1">
                      {new Date(msg.NgayGui).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
        {/* Điểm neo hỗ trợ tính năng auto-scroll */}
        <div ref={messagesEndRef} />
      </div>

      {/* --- Ô NHẬP VÀ NÚT GỬI TIN --- */}
      <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          placeholder="Nhập tin nhắn..."
          className="flex-1 bg-gray-100 border-none outline-none focus:ring-2 focus:ring-blue-500 rounded-full px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 transition-all"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className={`p-2.5 rounded-full transition-all flex items-center justify-center flex-shrink-0
            ${input.trim()
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md active:scale-95'
              : 'bg-gray-100 text-gray-300 cursor-not-allowed'
            }`}
        >
          {/* Icon mũi tên gửi */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 transform rotate-90">
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </form>

    </div>
  );
}