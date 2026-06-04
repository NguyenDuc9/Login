'use client';

import { useEffect, useState } from 'react';
import {
  useParams,
  useRouter,
  usePathname,
  useSearchParams,
} from 'next/navigation';
import {
  ArrowLeft,
  Send,
  History,
  Paperclip,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

import { Button, Card, Badge } from '@/components/ui';

// API Báo cáo tiến độ
import {
  getAllBaoCaoTienDo,
  createBaoCaoTienDo,
  BaoCaoTienDo,
} from '@/service/PhanViec/BaoCaoTienDo';

export default function BaoCaoTienDoPage() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams(); // Hook để đọc các tham số sau dấu ?

  const maGV = Number(params.id);

  // --- ĐOẠN XỬ LÝ LOGIC ẨN FORM BẰNG ?abc ---
  // Kiểm tra xem trên URL có chữ "abc" sau dấu hỏi hay không (ví dụ: ?abc hoặc ?abc=true)
  const hasAbcQuery = searchParams.has('abc');

  // Quyền ghi báo cáo: Phải bắt đầu bằng /staff VÀ KHÔNG ĐƯỢC chứa ?abc trên URL
  const isStaffPath =
    pathname.toLowerCase().startsWith('/staff') && !hasAbcQuery;
  // ------------------------------------------

  const [dsBaoCao, setDsBaoCao] = useState<BaoCaoTienDo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [noiDung, setNoiDung] = useState('');
  const [phanTram, setPhanTram] = useState<number>(0);
  const [fileBaoCao, setFileBaoCao] = useState('');

  const loadLichSuBaoCao = async () => {
    try {
      setIsLoading(true);
      const allReports = await getAllBaoCaoTienDo();

      const reportsForTask = allReports.filter(
        (bc: BaoCaoTienDo) => bc.MaGV === maGV,
      );

      reportsForTask.sort(
        (a: any, b: any) =>
          new Date(b.NgayBaoCao).getTime() - new Date(a.NgayBaoCao).getTime(),
      );

      setDsBaoCao(reportsForTask);

      if (reportsForTask.length > 0 && isStaffPath) {
        setPhanTram(reportsForTask[0].PhanTramHoanThanh || 0);
      }
    } catch (error) {
      console.error('Lỗi load lịch sử báo cáo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (maGV) loadLichSuBaoCao();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maGV, pathname, searchParams]); // Thêm searchParams vào dependency để lắng nghe thay đổi URL

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noiDung.trim()) {
      alert('Vui lòng nhập nội dung báo cáo!');
      return;
    }

    try {
      setIsSubmitting(true);
      const newReport: BaoCaoTienDo = {
        MaGV: maGV,
        NoiDung: noiDung,
        PhanTramHoanThanh: phanTram,
        FileBaoCao: fileBaoCao,
      };

      await createBaoCaoTienDo(newReport);

      alert('Báo cáo tiến độ thành công!');
      setNoiDung('');
      setFileBaoCao('');
      loadLichSuBaoCao();
    } catch (error) {
      console.error('Lỗi tạo báo cáo:', error);
      alert('Đã xảy ra lỗi khi báo cáo tiến độ.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => router.back()}
            className="hover:bg-slate-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              Báo Cáo Tiến Độ{' '}
              <span className="text-indigo-600">#Task-{maGV}</span>
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {isStaffPath
                ? 'Cập nhật tiến độ và đính kèm tài liệu minh chứng công việc'
                : 'Xem lịch sử cập nhật tiến độ chi tiết của nhiệm vụ này (Chế độ xem dữ liệu)'}
            </p>
          </div>
        </div>

        {/* Badge trạng thái tổng quan nhanh */}
        {dsBaoCao.length > 0 && (
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl self-start sm:self-center">
            <span className="text-xs text-slate-500 font-medium">
              Tiến độ hiện tại:
            </span>
            <Badge
              variant={
                dsBaoCao[0].PhanTramHoanThanh === 100 ? 'success' : 'info'
              }
              className="text-sm px-2.5"
            >
              {dsBaoCao[0].PhanTramHoanThanh}%
            </Badge>
          </div>
        )}
      </div>

      {/* Bố cục lưới linh hoạt tự co giãn dựa vào biến Quyền Path URL */}
      <div
        className={`grid grid-cols-1 ${isStaffPath ? 'lg:grid-cols-5' : 'max-w-3xl mx-auto'} gap-8`}
      >
        {/* PHẦN 1: FORM CẬP NHẬT (Sẽ bị ẩn nếu URL có ?abc) */}
        {isStaffPath && (
          <div className="lg:col-span-2">
            <Card className="!p-6 border border-slate-100 shadow-sm sticky top-6">
              <h2 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
                <div className="p-1.5 bg-indigo-50 rounded-lg">
                  <Send className="w-4 h-4 text-indigo-600" />
                </div>
                Cập nhật báo cáo mới
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Nội dung công việc đã làm{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent focus:outline-none transition-all text-sm min-h-[140px] resize-none"
                    placeholder="Mô tả cụ thể và chi tiết những phần việc, đầu mục bạn đã hoàn thành trong giai đoạn này..."
                    value={noiDung}
                    onChange={(e) => setNoiDung(e.target.value)}
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-slate-700">
                      Mức độ hoàn thành công việc
                    </label>
                    <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                      {phanTram}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={phanTram}
                    onChange={(e) => setPhanTram(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-medium mt-1.5 px-0.5">
                    <span>Khởi đầu (0%)</span>
                    <span>Một nửa (50%)</span>
                    <span>Hoàn thành (100%)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Đường dẫn tài liệu / File đính kèm
                  </label>
                  <div className="relative">
                    <Paperclip className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Dán link tài liệu Google Drive, Git hoặc link đính kèm..."
                      value={fileBaoCao}
                      onChange={(e) => setFileBaoCao(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent focus:outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 justify-center rounded-xl shadow-md shadow-indigo-100"
                  >
                    {isSubmitting
                      ? 'Đang gửi dữ liệu...'
                      : 'Gửi báo cáo tiến độ'}
                    {!isSubmitting && <Send className="w-4 h-4 ml-2" />}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}

        {/* PHẦN 2: LỊCH SỬ TIẾN ĐỘ (Tự động phóng to ra giữa nếu Form bên trái bị ẩn) */}
        <div className={isStaffPath ? 'lg:col-span-3' : 'w-full'}>
          <Card className="!p-6 border border-slate-100 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <div className="p-1.5 bg-slate-100 rounded-lg">
                <History className="w-4 h-4 text-slate-700" />
              </div>
              Nhật ký tiến độ công việc
            </h2>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-3">
                <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-slate-400">
                  Đang truy xuất tiến độ hệ thống...
                </p>
              </div>
            ) : dsBaoCao.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                <History className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-500 font-medium">
                  Nhiệm vụ này chưa có nhật ký báo cáo
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Các mốc thời gian hoàn thành sẽ xuất hiện tại đây.
                </p>
              </div>
            ) : (
              <div className="relative pl-6 border-l-2 border-slate-100 space-y-6 ml-3">
                {dsBaoCao.map((bc, index) => {
                  const isDone = bc.PhanTramHoanThanh === 100;
                  return (
                    <div key={bc.MaBaoCao || index} className="relative group">
                      <span
                        className={`absolute -left-[31px] top-1.5 flex items-center justify-center w-4 h-4 rounded-full border-4 border-white transition-all ring-4 ${
                          isDone
                            ? 'bg-emerald-500 ring-emerald-50'
                            : 'bg-indigo-500 ring-indigo-50'
                        }`}
                      />

                      <div className="p-4 rounded-xl border border-slate-100 bg-white hover:border-slate-200 hover:shadow-md hover:shadow-slate-50 transition-all duration-200">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <Badge
                              className={`font-semibold ${
                                isDone
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                              }`}
                            >
                              Tiến độ: {bc.PhanTramHoanThanh}%
                            </Badge>
                            {isDone && (
                              <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-0.5 bg-emerald-50/50 px-1.5 py-0.5 rounded">
                                <CheckCircle2 className="w-3 h-3" /> Hoàn thành
                                mục tiêu
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>
                              {bc.NgayBaoCao
                                ? new Date(bc.NgayBaoCao).toLocaleDateString(
                                    'vi-VN',
                                    {
                                      day: '2-digit',
                                      month: '2-digit',
                                      year: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    },
                                  )
                                : 'Không rõ ngày'}
                            </span>
                          </div>
                        </div>

                        <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                          {bc.NoiDung}
                        </p>

                        {bc.FileBaoCao && (
                          <div className="mt-3 pt-2.5 border-t border-slate-50">
                            <a
                              // Sửa lỗi đường dẫn cục bộ (Đảm bảo mở ra link internet thay vì localhost)
                              href={
                                bc.FileBaoCao.startsWith('http')
                                  ? bc.FileBaoCao
                                  : `https://${bc.FileBaoCao}`
                              }
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline bg-slate-50 hover:bg-indigo-50/50 px-2.5 py-1.5 rounded-lg transition-colors w-full sm:w-auto"
                            >
                              <Paperclip className="w-3.5 h-3.5" />
                              <span className="truncate max-w-[240px]">
                                Xem tài liệu minh chứng đi kèm
                              </span>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
