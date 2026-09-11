"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentType, ChangeEvent } from "react";

import {
  AlertTriangle,
  CloudLightning,
  Wind,
  Eye,
  X,
  Calendar,
  Clock,
  User,
  ChevronDown,
  Share2,
  ClipboardList,
  Trash2,
  Image as ImageIcon,
  Video,
  Paperclip,
} from "lucide-react";

type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon?: ComponentType<{ className?: string }>;
  list?: string;
  type?: string;
};

const Input = ({
  label,
  value,
  onChange,
  icon: Icon,
  list,
  type = "text",
}: InputProps) => {
  const isTime = type === "time";

  return (
    <div className="mb-4">
      <div className="relative">
        {Icon && !isTime && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none z-10" />
        )}

        {isTime && (
          <Clock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500 pointer-events-none z-10" />
        )}

        <input
          type={type}
          list={list}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={label}
          className={`w-full bg-white border-2 border-slate-100 focus:border-blue-500 rounded-2xl py-3.5 outline-none transition-all text-[16px] font-medium text-slate-700 touch-manipulation
            ${Icon && !isTime ? "pl-12" : "pl-4"}
            ${list ? "pr-12" : ""}
            ${isTime ? "min-h-[54px] px-4 pr-12 appearance-none" : ""}`}
        />

        {list && (
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
        )}
      </div>
    </div>
  );
};

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center gap-2 mb-3 mt-6">
      <div className="w-1 h-6 bg-blue-500 rounded-full" />

      <h2 className="font-extrabold text-[17px] text-slate-800">{title}</h2>
    </div>
  );
};

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

  const [showPreview, setShowPreview] = useState(false);
  const [previewContent, setPreviewContent] = useState("");
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const [toast, setToast] = useState("");

  // ============================================================
  // SỰ CỐ
  // ============================================================

  const [sc, setSc] = useState({
    ngay: "",
    tuyen: "",
    ga: "",
    nv: "",
    kieuDung: "",
    nguyenNhan: "",
    xuLy: "",
    tgDung: "",
    tgChayLai: "",
    deXuat: "Không",
  });

  const [tuyenKhanCap, setTuyenKhanCap] = useState("");

  // File sự cố
  const [suCoFiles, setSuCoFiles] = useState<File[]>([]);
  const [suCoFilePreviews, setSuCoFilePreviews] = useState<string[]>([]);

  // ============================================================
  // DÔNG SÉT
  // ============================================================

  const [ds, setDs] = useState({
    ga: "",
    tanSuat: "",
    soLan: "",
    may: "",
    mua: "",
    xuHuong: "",
  });

  // ============================================================
  // CẤP GIÓ
  // ============================================================

  const [cg, setCg] = useState({
    ngay: "",
    gio: "",
    tuyen: "",

    truSo: "",
    tocDo: "",
    tocDoMax: "",

    mucGioThucTe: "",
    tocDoToanTuyen: "",
    xuHuong: "",
    nguyCo: "",

    kienNghi: "",
    xinQuyetDinh: "",
    hoatDongTuyen: "",
    xinHoTro: "",
  });

  // ============================================================
  // CHUNG
  // ============================================================

  const [chung, setChung] = useState({
    tocDoNgay: "",
    tocDoTuyen: "",
    tocDoHienTai: "",
    tocDoThoiGian: "",
    tocDoGhiChu: "",

    loai5S: "Đầu ca",
    tuyen5S: "",
    ga5S: "",
    nhanSu5S: "",
    thoiGianDauCa: "",
    thoiGianCuoiCa: "",
  });

  // ============================================================
  // ẢNH 5S
  // ============================================================

  const [anh5S, setAnh5S] = useState<File[]>([]);
  const [anh5SPreview, setAnh5SPreview] = useState<string[]>([]);

  // ============================================================
  // TOAST
  // ============================================================

  const showToast = (message: string) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 3000);
  };

  // ============================================================
  // NGÀY / GIỜ TỰ ĐỘNG
  // ============================================================

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      const today = new Intl.DateTimeFormat("vi-VN").format(now);

      const time = now.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      setSc((prev) => ({
        ...prev,
        ngay: prev.ngay || today,
      }));

      setCg((prev) => ({
        ...prev,
        ngay: prev.ngay || today,
        gio: prev.gio || time,
      }));

      setChung((prev) => ({
        ...prev,
        tocDoNgay: prev.tocDoNgay || today,
        tocDoThoiGian: prev.tocDoThoiGian || time,

        thoiGianDauCa:
          prev.loai5S === "Đầu ca"
            ? prev.thoiGianDauCa || time
            : prev.thoiGianDauCa,

        thoiGianCuoiCa:
          prev.loai5S === "Cuối ca"
            ? prev.thoiGianCuoiCa || time
            : prev.thoiGianCuoiCa,
      }));
    };

    updateDateTime();

    const interval = window.setInterval(updateDateTime, 60000);

    return () => window.clearInterval(interval);
  }, []);

  // ============================================================
  // TABS
  // ============================================================

  const tabs = [
    {
      id: 0,
      title: "Sự cố",
      icon: AlertTriangle,
    },
    {
      id: 1,
      title: "Dông sét",
      icon: CloudLightning,
    },
    {
      id: 2,
      title: "Cấp gió",
      icon: Wind,
    },
    {
      id: 3,
      title: "Chung",
      icon: ClipboardList,
    },
  ];

  // ============================================================
  // GENERATE - CẬP NHẬT TỐC ĐỘ
  // ============================================================

  const generateTocDoContent = () => {
    const ghiChu = chung.tocDoGhiChu.trim();

    const ghiChuLine = ghiChu ? `\nGhi chú: ${ghiChu}` : "";

    return `Ngày: ${chung.tocDoNgay}
Tuyến cáp: ${chung.tocDoTuyen}
Tốc độ hiện tại: ${chung.tocDoHienTai} m/s
Thời gian: ${chung.tocDoThoiGian}${ghiChuLine}`;
  };

  // ============================================================
  // GENERATE - 5S
  // ============================================================

  const generate5SContent = () => {
    const timeLine =
      chung.loai5S === "Đầu ca"
        ? `*Thời gian vào ca: ${chung.thoiGianDauCa}`
        : `*Thời gian ra ca: ${chung.thoiGianCuoiCa}`;

    return `BÁO CÁO 5S ${chung.loai5S}
*Vị trí: Ga ${chung.ga5S}
*Nhân sự: ${chung.nhanSu5S}
${timeLine}`;
  };

  // ============================================================
  // PREVIEW
  // ============================================================

  const openPreview = (content: string, images: string[] = []) => {
    setPreviewContent(content);
    setPreviewImages(images);
    setShowPreview(true);
  };

  // ============================================================
  // GENERATE CONTENT CHÍNH
  // ============================================================

  const generateContent = () => {
    // ==========================================================
    // SỰ CỐ
    // ==========================================================

    if (activeTab === 0) {
      return `BÁO CÁO SỰ CỐ

Báo cáo Anh/Chị sự cố cáp treo ngày ${sc.ngay}
• Tuyến cáp: ${sc.tuyen}
• Ga: ${sc.ga}
• NV vận hành: ${sc.nv}
• Kiểu dừng: ${sc.kieuDung}
• Nguyên nhân: ${sc.nguyenNhan}
• Xử lý: ${sc.xuLy}
• Thời gian dừng: ${sc.tgDung}
• Thời gian chạy lại: ${sc.tgChayLai}
• Đề xuất: ${sc.deXuat}

Trân trọng!`;
    }

    // ==========================================================
    // DÔNG SÉT
    // ==========================================================

    if (activeTab === 1) {
      return `Cập nhật tình hình dông sét.

Ga: ${ds.ga}
Tần suất (phút/lần): ${ds.tanSuat}

---

- Số lần nghe tiếng sấm: ${ds.soLan}
- Mây: ${ds.may}
- Mưa: ${ds.mua}
- Xu hướng dông sét (Tăng/Giảm/Không đổi): ${ds.xuHuong}

---

Trân trọng!`;
    }

    // ==========================================================
    // CẤP GIÓ
    // ==========================================================

    if (activeTab === 2) {
      return `Thời gian: ${cg.gio}

THÔNG TIN CẤP GIÓ
Phòng KTCT báo cáo a/c cập nhật thông tin gió trên tuyến

- Tuyến cáp số: ${cg.tuyen}

———————————————
Tốc độ gió:

- Trụ số: ${cg.truSo}
- Tốc độ (m/s): ${cg.tocDo}
- Tốc độ max (m/s): ${cg.tocDoMax}
- Mức độ gió thực tế trên tuyến: ${cg.mucGioThucTe}

———————————————

- Tốc độ gió toàn tuyến (m/s): ${cg.tocDoToanTuyen}
- Xu hướng gió (Tăng/Không đổi/Giảm): ${cg.xuHuong}
- Nguy cơ/cảnh báo: ${cg.nguyCo}

———————————————
Kiến nghị/Đề xuất:
${cg.kienNghi}

- Xin quyết định/chỉ đạo: ${cg.xinQuyetDinh}
- Hoạt động tuyến cáp: ${cg.hoatDongTuyen}
- Xin hỗ trợ: ${cg.xinHoTro}

———————————————
Trân trọng !`;
    }

    return generateTocDoContent();
  };

  // ============================================================
  // SHARE - CHIA SẺ TEXT
  // ============================================================

  // ============================================================
  // SHARE - TEXT + ẢNH / VIDEO
  // ============================================================

  const shareContent = async (
    text: string = generateContent(),
    title: string = `Báo cáo ${tabs[activeTab].title}`,
    files: File[] = [],
  ) => {
    if (!text.trim()) {
      showToast("Không có nội dung để chia sẻ!");
      return;
    }

    try {
      // ========================================================
      // 1. Không có file -> chia sẻ text
      // ========================================================

      if (!files.length) {
        if (navigator.share) {
          await navigator.share({
            title,
            text,
          });

          return;
        }

        // Fallback nếu trình duyệt không hỗ trợ Share API
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(text);
          showToast("Nội dung đã được copy!");
          return;
        }

        showToast("Thiết bị không hỗ trợ chia sẻ.");
        return;
      }

      // ========================================================
      // 2. Có ảnh / video
      // ========================================================

      if (!navigator.share) {
        showToast("Trình duyệt này không hỗ trợ chia sẻ ảnh/video.");
        return;
      }

      // Kiểm tra thiết bị có hỗ trợ chia sẻ file hay không
      if (!navigator.canShare) {
        showToast("Thiết bị không hỗ trợ chia sẻ ảnh/video.");
        return;
      }

      const canShareFiles = navigator.canShare({
        files,
      });

      if (!canShareFiles) {
        showToast("Thiết bị không hỗ trợ loại ảnh/video này.");
        return;
      }

      // ========================================================
      // 3. QUAN TRỌNG:
      //    Gửi TEXT + FILE trong cùng một navigator.share()
      // ========================================================

      await navigator.share({
        title,
        text,
        files,
      });
    } catch (error) {
      console.log("Share error:", error);

      // Người dùng bấm Cancel thì không báo lỗi
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      showToast("Không thể chia sẻ. Hãy thử lại trên điện thoại.");
    }
  };

  // ============================================================
  // KHẨN CẤP
  // ============================================================

  const getEmergencyStopMessage = () => {
    const tuyen = tuyenKhanCap.trim();

    return `Tuyến ${tuyen} đang dừng ạ`;
  };

  const getEmergencyRestartMessage = () => {
    const tuyen = tuyenKhanCap.trim();

    return `Tuyến ${tuyen} đã chạy lại ạ`;
  };

  const sendEmergency = async (message: string) => {
    const tuyen = tuyenKhanCap.trim();

    if (!tuyen) {
      showToast("Vui lòng nhập số tuyến trước!");
      return;
    }

    await shareContent(message, "Thông báo khẩn cấp");
  };

  // ============================================================
  // FILE PREVIEW HELPER
  // ============================================================

  const createFilePreview = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(String(reader.result || ""));
      };

      reader.readAsDataURL(file);
    });
  };

  // ============================================================
  // XỬ LÝ FILE SỰ CỐ
  // ============================================================

  const handleSuCoFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const files = Array.from(input.files || []);

    if (!files.length) return;

    const validFiles = files.filter(
      (file) =>
        file.type.startsWith("image/") || file.type.startsWith("video/"),
    );

    if (!validFiles.length) {
      showToast("Chỉ được chọn hình ảnh hoặc video!");
      input.value = "";
      return;
    }

    setSuCoFiles((prev) => [...prev, ...validFiles]);

    const previews = await Promise.all(validFiles.map(createFilePreview));

    setSuCoFilePreviews((prev) => [...prev, ...previews]);

    input.value = "";
  };

  // ============================================================
  // XÓA FILE SỰ CỐ
  // ============================================================

  const removeSuCoFile = (index: number) => {
    setSuCoFiles((prev) => prev.filter((_, i) => i !== index));

    setSuCoFilePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // ============================================================
  // XÓA TẤT CẢ FILE SỰ CỐ
  // ============================================================

  const removeAllSuCoFiles = () => {
    setSuCoFiles([]);
    setSuCoFilePreviews([]);

    showToast("Đã xóa tất cả hình ảnh/video!");
  };

  // ============================================================
  // XỬ LÝ ẢNH 5S
  // ============================================================

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const files = Array.from(input.files || []);

    if (!files.length) return;

    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (!imageFiles.length) {
      showToast("Chỉ được chọn hình ảnh!");
      input.value = "";
      return;
    }

    setAnh5S((prev) => [...prev, ...imageFiles]);

    const previews = await Promise.all(imageFiles.map(createFilePreview));

    setAnh5SPreview((prev) => [...prev, ...previews]);

    // Không dùng event.currentTarget ở đây nữa
    input.value = "";
  };

  // ============================================================
  // XÓA 1 ẢNH 5S
  // ============================================================

  const removeImage = (index: number) => {
    setAnh5S((prev) => prev.filter((_, i) => i !== index));

    setAnh5SPreview((prev) => prev.filter((_, i) => i !== index));
  };

  // ============================================================
  // XÓA TẤT CẢ ẢNH 5S
  // ============================================================

  const removeAllImages = () => {
    setAnh5S([]);
    setAnh5SPreview([]);

    showToast("Đã xóa tất cả hình ảnh!");
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* ======================================================
          TOAST
      ====================================================== */}

      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[99999] bg-slate-800 text-white px-6 py-3 rounded-full shadow-lg font-medium text-sm whitespace-nowrap">
          {toast}
        </div>
      )}

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="bg-white/90 backdrop-blur-sm sticky top-0 z-40 py-4 px-6 border-b border-slate-100 flex justify-center">
        <h1 className="font-extrabold text-slate-800 tracking-wide">
          BÁO CÁO: {tabs[activeTab].title.toUpperCase()}
        </h1>
      </div>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div className="p-4 max-w-2xl mx-auto">
        {/* ====================================================
            TAB SỰ CỐ
        ==================================================== */}

        {activeTab === 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* KHẨN CẤP */}

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-6 bg-red-500 rounded-full" />

                <span className="font-extrabold text-[17px] text-slate-800">
                  Khẩn cấp
                </span>
              </div>

              <div className="bg-red-50 border-2 border-red-100 rounded-3xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>

                  <div>
                    <div className="font-extrabold text-red-700">
                      Gửi nhanh thông báo
                    </div>

                    <div className="text-xs text-red-500 mt-0.5">
                      Nhập số tuyến rồi chọn trạng thái
                    </div>
                  </div>
                </div>

                <Input
                  label="Số tuyến"
                  value={tuyenKhanCap}
                  onChange={setTuyenKhanCap}
                  type="text"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => sendEmergency(getEmergencyStopMessage())}
                    className="flex items-center justify-center gap-2 min-h-14 px-3 rounded-2xl bg-red-500 text-white font-bold shadow-lg shadow-red-500/20 hover:bg-red-600 transition-all text-sm active:scale-95 touch-manipulation"
                  >
                    <Share2 className="w-5 h-5 shrink-0" />

                    <span>
                      Tuyến {tuyenKhanCap.trim() ? tuyenKhanCap : "..."} đang
                      dừng
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => sendEmergency(getEmergencyRestartMessage())}
                    className="flex items-center justify-center gap-2 min-h-14 px-3 rounded-2xl bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all text-sm active:scale-95 touch-manipulation"
                  >
                    <Share2 className="w-5 h-5 shrink-0" />

                    <span>
                      Tuyến {tuyenKhanCap.trim() ? tuyenKhanCap : "..."} đã chạy
                      lại
                    </span>
                  </button>
                </div>

                <p className="text-xs text-red-500 mt-3 text-center leading-relaxed">
                  Bấm nút để mở bảng chia sẻ của điện thoại.
                  <br />
                  Có thể chọn Zalo, Viber, Messenger hoặc ứng dụng khác.
                </p>
              </div>
            </div>

            {/* THÔNG TIN SỰ CỐ */}

            <SectionTitle title="Thông tin sự cố" />

            <Input
              label="Ngày"
              value={sc.ngay}
              onChange={(v) =>
                setSc((prev) => ({
                  ...prev,
                  ngay: v,
                }))
              }
              icon={Calendar}
            />

            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  label="Tuyến cáp"
                  value={sc.tuyen}
                  onChange={(v) =>
                    setSc((prev) => ({
                      ...prev,
                      tuyen: v,
                    }))
                  }
                />
              </div>

              <div className="flex-1">
                <Input
                  label="Ga"
                  value={sc.ga}
                  onChange={(v) =>
                    setSc((prev) => ({
                      ...prev,
                      ga: v,
                    }))
                  }
                />
              </div>
            </div>

            <Input
              label="NV Vận hành"
              value={sc.nv}
              onChange={(v) =>
                setSc((prev) => ({
                  ...prev,
                  nv: v,
                }))
              }
              icon={User}
              list="nv-list"
            />

            <datalist id="nv-list">
              <option value="Thanh" />
              <option value="Vĩ" />
            </datalist>

            <Input
              label="Kiểu dừng"
              value={sc.kieuDung}
              onChange={(v) =>
                setSc((prev) => ({
                  ...prev,
                  kieuDung: v,
                }))
              }
              list="kieudung-list"
            />

            <datalist id="kieudung-list">
              <option value="Dừng khẩn cấp" />
              <option value="Dừng phanh khẩn cấp" />
              <option value="Dừng" />
              <option value="Dừng tất cả các phanh" />
            </datalist>

            <Input
              label="Nguyên nhân"
              value={sc.nguyenNhan}
              onChange={(v) =>
                setSc((prev) => ({
                  ...prev,
                  nguyenNhan: v,
                }))
              }
            />

            <Input
              label="Xử lý"
              value={sc.xuLy}
              onChange={(v) =>
                setSc((prev) => ({
                  ...prev,
                  xuLy: v,
                }))
              }
              list="xuly-list"
            />

            <datalist id="xuly-list">
              <option value="kiểm tra an toàn, reset chạy lại cáp" />
            </datalist>

            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  label="Giờ dừng"
                  value={sc.tgDung}
                  onChange={(v) =>
                    setSc((prev) => ({
                      ...prev,
                      tgDung: v,
                    }))
                  }
                  type="time"
                />
              </div>

              <div className="flex-1">
                <Input
                  label="Giờ chạy"
                  value={sc.tgChayLai}
                  onChange={(v) =>
                    setSc((prev) => ({
                      ...prev,
                      tgChayLai: v,
                    }))
                  }
                  type="time"
                />
              </div>
            </div>

            <Input
              label="Đề xuất"
              value={sc.deXuat}
              onChange={(v) =>
                setSc((prev) => ({
                  ...prev,
                  deXuat: v,
                }))
              }
            />

            {/* ==================================================
                ĐÍNH KÈM ẢNH / VIDEO SỰ CỐ
            ================================================== */}

            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-500 mb-2">
                Hình ảnh / Video sự cố
              </label>

              <label className="flex flex-col items-center justify-center w-full min-h-32 bg-white border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-4 cursor-pointer transition-colors touch-manipulation">
                {suCoFilePreviews.length > 0 ? (
                  <div className="w-full">
                    <div className="grid grid-cols-2 gap-3">
                      {suCoFiles.map((file, index) => (
                        <div key={`${file.name}-${index}`} className="relative">
                          {file.type.startsWith("video/") ? (
                            <video
                              src={suCoFilePreviews[index]}
                              controls
                              className="w-full h-40 object-cover rounded-xl border border-slate-100 bg-black"
                            />
                          ) : (
                            <img
                              src={suCoFilePreviews[index]}
                              alt={`Ảnh sự cố ${index + 1}`}
                              className="w-full h-40 object-cover rounded-xl border border-slate-100"
                            />
                          )}

                          <div className="absolute top-2 left-2 bg-slate-900/70 text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                            {file.type.startsWith("video/") ? (
                              <Video className="w-3 h-3" />
                            ) : (
                              <ImageIcon className="w-3 h-3" />
                            )}

                            {index + 1}
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();

                              removeSuCoFile(index);
                            }}
                            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white shadow-lg touch-manipulation active:scale-90"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="text-center text-sm font-semibold text-blue-600 mt-3">
                      Chạm để thêm ảnh / video
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                      <Paperclip className="w-6 h-6 text-blue-500" />
                    </div>

                    <span className="font-bold text-slate-700">
                      Chọn ảnh hoặc video
                    </span>

                    <span className="text-xs text-slate-400 mt-1 text-center">
                      Có thể chọn 1 hoặc nhiều ảnh / video
                    </span>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  className="hidden"
                  onChange={handleSuCoFileUpload}
                />
              </label>

              {suCoFiles.length > 0 && (
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-semibold text-slate-500">
                    Đã chọn {suCoFiles.length} file
                  </span>

                  <button
                    type="button"
                    onClick={removeAllSuCoFiles}
                    className="flex items-center gap-1 text-sm font-semibold text-red-500 hover:text-red-600 touch-manipulation"
                  >
                    <Trash2 className="w-4 h-4" />
                    Xóa tất cả
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ====================================================
            TAB DÔNG SÉT
        ==================================================== */}

        {activeTab === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  label="Ga"
                  value={ds.ga}
                  onChange={(v) =>
                    setDs((prev) => ({
                      ...prev,
                      ga: v,
                    }))
                  }
                />
              </div>

              <div className="flex-1">
                <Input
                  label="Tần suất"
                  value={ds.tanSuat}
                  onChange={(v) =>
                    setDs((prev) => ({
                      ...prev,
                      tanSuat: v,
                    }))
                  }
                  list="tansuat-list"
                />
              </div>
            </div>

            <datalist id="tansuat-list">
              <option value="10" />
            </datalist>

            <Input
              label="Số lần sấm"
              value={ds.soLan}
              onChange={(v) =>
                setDs((prev) => ({
                  ...prev,
                  soLan: v,
                }))
              }
              list="solansam-list"
            />

            <datalist id="solansam-list">
              <option value="Chưa nghe tiếng sấm" />
              <option value="Nghe tiếng sấm xa" />
            </datalist>

            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  label="Mây"
                  value={ds.may}
                  onChange={(v) =>
                    setDs((prev) => ({
                      ...prev,
                      may: v,
                    }))
                  }
                  list="may-list"
                />

                <datalist id="may-list">
                  <option value="Mây mù" />
                  <option value="Không thấy mây" />
                </datalist>
              </div>

              <div className="flex-1">
                <Input
                  label="Mưa"
                  value={ds.mua}
                  onChange={(v) =>
                    setDs((prev) => ({
                      ...prev,
                      mua: v,
                    }))
                  }
                  list="mua-list"
                />

                <datalist id="mua-list">
                  <option value="Mưa to" />
                  <option value="Mưa nhỏ" />
                  <option value="Không mưa" />
                </datalist>
              </div>
            </div>

            <Input
              label="Xu hướng"
              value={ds.xuHuong}
              onChange={(v) =>
                setDs((prev) => ({
                  ...prev,
                  xuHuong: v,
                }))
              }
              list="xuhuong-ds-list"
            />

            <datalist id="xuhuong-ds-list">
              <option value="Tăng" />
              <option value="Giảm" />
              <option value="Chưa xác định" />
            </datalist>
          </div>
        )}

        {/* ====================================================
            TAB CẤP GIÓ
        ==================================================== */}

        {activeTab === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  label="Ngày"
                  value={cg.ngay}
                  onChange={(v) =>
                    setCg((prev) => ({
                      ...prev,
                      ngay: v,
                    }))
                  }
                  icon={Calendar}
                />
              </div>

              <div className="flex-1">
                <Input
                  label="Thời gian"
                  value={cg.gio}
                  onChange={(v) =>
                    setCg((prev) => ({
                      ...prev,
                      gio: v,
                    }))
                  }
                  type="time"
                />
              </div>
            </div>

            <Input
              label="Tuyến cáp số"
              value={cg.tuyen}
              onChange={(v) =>
                setCg((prev) => ({
                  ...prev,
                  tuyen: v,
                }))
              }
              list="tuyen-cg-list"
            />

            <datalist id="tuyen-cg-list">
              <option value="1" />
              <option value="2" />
              <option value="3" />
              <option value="4" />
              <option value="5" />
              <option value="6" />
              <option value="8" />
            </datalist>

            <SectionTitle title="Tốc độ gió" />

            <Input
              label="Trụ số"
              value={cg.truSo}
              onChange={(v) =>
                setCg((prev) => ({
                  ...prev,
                  truSo: v,
                }))
              }
              list="tru-cg-list"
            />

            <datalist id="tru-cg-list">
              <option value="1" />
              <option value="2" />
              <option value="4,9,14,25" />
              <option value="4" />
              <option value="3,4" />
              <option value="8,16,20,24,27" />
              <option value="8" />
            </datalist>

            <Input
              label="Tốc độ (m/s)"
              value={cg.tocDo}
              onChange={(v) =>
                setCg((prev) => ({
                  ...prev,
                  tocDo: v,
                }))
              }
            />

            <Input
              label="Tốc độ max (m/s)"
              value={cg.tocDoMax}
              onChange={(v) =>
                setCg((prev) => ({
                  ...prev,
                  tocDoMax: v,
                }))
              }
            />

            <Input
              label="Mức độ gió thực tế trên tuyến"
              value={cg.mucGioThucTe}
              onChange={(v) =>
                setCg((prev) => ({
                  ...prev,
                  mucGioThucTe: v,
                }))
              }
              list="mucgio-list"
            />

            <datalist id="mucgio-list">
              <option value="Không xác định" />
              <option value="Bình thường" />
              <option value="Gió mạnh" />
              <option value="Gió rất mạnh" />
            </datalist>

            <SectionTitle title="Thông tin toàn tuyến" />

            <Input
              label="Tốc độ gió toàn tuyến (m/s)"
              value={cg.tocDoToanTuyen}
              onChange={(v) =>
                setCg((prev) => ({
                  ...prev,
                  tocDoToanTuyen: v,
                }))
              }
              list="tocdo-toantuyen-list"
            />

            <datalist id="tocdo-toantuyen-list">
              <option value="dao động 0-10" />
              <option value="dao động 0-5" />
              <option value="0" />
              <option value="5" />
              <option value="10" />
            </datalist>

            <Input
              label="Xu hướng gió"
              value={cg.xuHuong}
              onChange={(v) =>
                setCg((prev) => ({
                  ...prev,
                  xuHuong: v,
                }))
              }
              list="xuhuong-cg-list"
            />

            <datalist id="xuhuong-cg-list">
              <option value="Tăng" />
              <option value="Không đổi" />
              <option value="Giảm" />
            </datalist>

            <Input
              label="Nguy cơ/Cảnh báo"
              value={cg.nguyCo}
              onChange={(v) =>
                setCg((prev) => ({
                  ...prev,
                  nguyCo: v,
                }))
              }
              list="nguyco-list"
            />

            <datalist id="nguyco-list">
              <option value="Không" />
              <option value="Cảnh báo gió" />
              <option value="Báo động gió" />
            </datalist>

            <SectionTitle title="Kiến nghị / Đề xuất" />

            <Input
              label="Kiến nghị/Đề xuất"
              value={cg.kienNghi}
              onChange={(v) =>
                setCg((prev) => ({
                  ...prev,
                  kienNghi: v,
                }))
              }
              list="kiennghi-list"
            />

            <datalist id="kiennghi-list">
              <option value="Không" />
            </datalist>

            <Input
              label="Xin quyết định/chỉ đạo"
              value={cg.xinQuyetDinh}
              onChange={(v) =>
                setCg((prev) => ({
                  ...prev,
                  xinQuyetDinh: v,
                }))
              }
              list="quyetdinh-list"
            />

            <datalist id="quyetdinh-list">
              <option value="Không" />
            </datalist>

            <Input
              label="Hoạt động tuyến cáp"
              value={cg.hoatDongTuyen}
              onChange={(v) =>
                setCg((prev) => ({
                  ...prev,
                  hoatDongTuyen: v,
                }))
              }
              list="hoatdong-list"
            />

            <datalist id="hoatdong-list">
              <option value="Không" />
              <option value="Đang hoạt động" />
              <option value="Tạm dừng" />
            </datalist>

            <Input
              label="Xin hỗ trợ"
              value={cg.xinHoTro}
              onChange={(v) =>
                setCg((prev) => ({
                  ...prev,
                  xinHoTro: v,
                }))
              }
              list="hotro-list"
            />

            <datalist id="hotro-list">
              <option value="Không" />
            </datalist>
          </div>
        )}

        {/* ====================================================
            TAB CHUNG
        ==================================================== */}

        {activeTab === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionTitle title="Cập nhật tốc độ tuyến cáp" />

            <Input
              label="Ngày"
              value={chung.tocDoNgay}
              onChange={(v) =>
                setChung((prev) => ({
                  ...prev,
                  tocDoNgay: v,
                }))
              }
              icon={Calendar}
            />

            <Input
              label="Tuyến cáp"
              value={chung.tocDoTuyen}
              onChange={(v) =>
                setChung((prev) => ({
                  ...prev,
                  tocDoTuyen: v,
                }))
              }
              list="tuyen-chung-list"
            />

            <datalist id="tuyen-chung-list">
              <option value="1" />
              <option value="2" />
              <option value="3" />
              <option value="4" />
              <option value="5" />
              <option value="6" />
              <option value="8" />
            </datalist>

            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  label="Tốc độ hiện tại (m/s)"
                  value={chung.tocDoHienTai}
                  onChange={(v) =>
                    setChung((prev) => ({
                      ...prev,
                      tocDoHienTai: v,
                    }))
                  }
                  type="number"
                />
              </div>

              <div className="flex-1">
                <Input
                  label="Thời gian"
                  value={chung.tocDoThoiGian}
                  onChange={(v) =>
                    setChung((prev) => ({
                      ...prev,
                      tocDoThoiGian: v,
                    }))
                  }
                  type="time"
                />
              </div>
            </div>

            <Input
              label="Ghi chú"
              value={chung.tocDoGhiChu}
              onChange={(v) =>
                setChung((prev) => ({
                  ...prev,
                  tocDoGhiChu: v,
                }))
              }
            />

            {/* NÚT TỐC ĐỘ */}

            <div className="grid grid-cols-2 gap-2 mt-2 mb-8">
              <button
                type="button"
                onClick={() => openPreview(generateTocDoContent())}
                className="flex items-center justify-center gap-2 h-14 rounded-2xl border-2 border-blue-500 text-blue-600 font-bold hover:bg-blue-50 transition-colors text-sm touch-manipulation active:scale-95"
              >
                <Eye className="w-5 h-5" />
                Xem
              </button>

              <button
                type="button"
                onClick={() =>
                  shareContent(
                    generateTocDoContent(),
                    "Cập nhật tốc độ tuyến cáp",
                  )
                }
                className="flex items-center justify-center gap-2 h-14 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors text-sm touch-manipulation active:scale-95"
              >
                <Share2 className="w-5 h-5" />
                Chia sẻ
              </button>
            </div>

            {/* BÁO CÁO 5S */}

            <SectionTitle title="Báo cáo 5S" />

            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-500 mb-2">
                Loại ca
              </label>

              <div className="relative">
                <select
                  value={chung.loai5S}
                  onChange={(e) => {
                    const value = e.target.value;

                    setChung((prev) => ({
                      ...prev,
                      loai5S: value,
                      thoiGianDauCa:
                        value === "Đầu ca" ? prev.thoiGianDauCa : "",
                      thoiGianCuoiCa:
                        value === "Cuối ca" ? prev.thoiGianCuoiCa : "",
                    }));
                  }}
                  className="w-full appearance-none bg-white border-2 border-slate-100 focus:border-blue-500 rounded-2xl py-3.5 px-4 pr-12 outline-none transition-all text-[16px] font-medium text-slate-700 touch-manipulation"
                >
                  <option value="Đầu ca">Đầu ca</option>

                  <option value="Cuối ca">Cuối ca</option>
                </select>

                <ChevronDown className="absolute right-4 top-4 text-slate-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>

            <Input
              label="Vị trí: Ga"
              value={chung.ga5S}
              onChange={(v) =>
                setChung((prev) => ({
                  ...prev,
                  ga5S: v,
                }))
              }
            />

            <Input
              label="Nhân sự"
              value={chung.nhanSu5S}
              onChange={(v) =>
                setChung((prev) => ({
                  ...prev,
                  nhanSu5S: v,
                }))
              }
              icon={User}
            />

            <datalist id="tuyen-5s-list">
              <option value="Nguyễn Văn Vĩ" />
              <option value="Huỳnh Nguyễn Kim Thanh" />
              <option value="Trần Quang Nam" />
              <option value="Cao Thị Hải Yến" />
              <option value="Nguyễn Thanh An" />
              <option value="Nguyễn Như Nguyên" />
              <option value="Trương Quốc Cường" />
            </datalist>

            {/* HÌNH ẢNH 5S */}

            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-500 mb-2">
                Hình ảnh
              </label>

              <label className="flex flex-col items-center justify-center w-full min-h-32 bg-white border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-4 cursor-pointer transition-colors touch-manipulation">
                {anh5SPreview.length > 0 ? (
                  <div className="w-full">
                    <div className="grid grid-cols-2 gap-3">
                      {anh5S.map((file, index) => (
                        <div key={`${file.name}-${index}`} className="relative">
                          <img
                            src={anh5SPreview[index]}
                            alt={`Ảnh 5S ${index + 1}`}
                            className="w-full h-40 object-cover rounded-xl border border-slate-100"
                          />
              
                          <div className="absolute top-2 left-2 bg-slate-900/70 text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                            <ImageIcon className="w-3 h-3" />
                            {index + 1}
                          </div>
              
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
              
                              removeImage(index);
                            }}
                            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white shadow-lg touch-manipulation active:scale-90"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
              
                    <div className="text-center text-sm font-semibold text-blue-600 mt-3">
                      Chạm để thêm ảnh
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                      <Paperclip className="w-6 h-6 text-blue-500" />
                    </div>
              
                    <span className="font-bold text-slate-700">
                      Chọn ảnh 5S
                    </span>
              
                    <span className="text-xs text-slate-400 mt-1 text-center">
                      Có thể chọn 1 hoặc nhiều ảnh
                    </span>
                  </>
                )}
              
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>

              {anh5S.length > 0 && (
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-semibold text-slate-500">
                    Đã chọn {anh5S.length} hình ảnh
                  </span>

                  <button
                    type="button"
                    onClick={removeAllImages}
                    className="flex items-center gap-1 text-sm font-semibold text-red-500 hover:text-red-600 touch-manipulation"
                  >
                    <Trash2 className="w-4 h-4" />
                    Xóa tất cả
                  </button>
                </div>
              )}
            </div>

            {/* THỜI GIAN CA */}

            <div className="bg-white border-2 border-slate-100 rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-blue-500" />

                <span className="font-bold text-slate-700">Thời gian ca</span>
              </div>

              {chung.loai5S === "Đầu ca" ? (
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">
                    Vào ca
                  </label>

                  <div className="relative">
                    <input
                      type="time"
                      value={chung.thoiGianDauCa}
                      onChange={(e) =>
                        setChung((prev) => ({
                          ...prev,
                          thoiGianDauCa: e.target.value,
                        }))
                      }
                      className="w-full min-h-[54px] border-2 border-slate-100 rounded-xl px-4 pr-12 py-3 outline-none focus:border-blue-500 text-[16px] touch-manipulation appearance-none"
                    />

                    <Clock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500 pointer-events-none" />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">
                    Ra ca
                  </label>

                  <div className="relative">
                    <input
                      type="time"
                      value={chung.thoiGianCuoiCa}
                      onChange={(e) =>
                        setChung((prev) => ({
                          ...prev,
                          thoiGianCuoiCa: e.target.value,
                        }))
                      }
                      className="w-full min-h-[54px] border-2 border-slate-100 rounded-xl px-4 pr-12 py-3 outline-none focus:border-blue-500 text-[16px] touch-manipulation appearance-none"
                    />

                    <Clock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500 pointer-events-none" />
                  </div>
                </div>
              )}
            </div>

            {/* GỢI Ý */}

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-4">
              <div className="font-bold text-blue-700 mb-1">💡 Gợi ý</div>

              <div className="text-sm text-blue-600 leading-relaxed">
                Chọn <b>Đầu ca</b> để ghi nhận thời gian vào ca. Chọn{" "}
                <b>Cuối ca</b> để ghi nhận thời gian ra ca.
              </div>
            </div>

            {/* NÚT 5S */}

            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                type="button"
                onClick={() => openPreview(generate5SContent(), anh5SPreview)}
                className="flex items-center justify-center gap-2 h-14 rounded-2xl border-2 border-blue-500 text-blue-600 font-bold hover:bg-blue-50 transition-colors text-sm touch-manipulation active:scale-95"
              >
                <Eye className="w-5 h-5" />
                Xem
              </button>

              <button
                type="button"
                onClick={() =>
                  shareContent(generate5SContent(), "Báo cáo 5S", anh5S)
                }
                className="flex items-center justify-center gap-2 h-14 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors text-sm touch-manipulation active:scale-95"
              >
                <Share2 className="w-5 h-5" />
                Chia sẻ
              </button>
            </div>
          </div>
        )}

        {/* ====================================================
            BUTTONS - 3 TAB ĐẦU
        ==================================================== */}

        {activeTab !== 3 && (
          <div className="grid grid-cols-2 gap-2 mt-8">
            <button
              type="button"
              onClick={() =>
                openPreview(
                  generateContent(),
                  activeTab === 0 ? suCoFilePreviews : [],
                )
              }
              className="flex items-center justify-center gap-2 h-14 rounded-2xl border-2 border-blue-500 text-blue-600 font-bold hover:bg-blue-50 transition-colors text-sm touch-manipulation active:scale-95"
            >
              <Eye className="w-5 h-5" />
              Xem
            </button>

            <button
              type="button"
              onClick={() =>
                shareContent(
                  generateContent(),
                  `Báo cáo ${tabs[activeTab].title}`,
                  activeTab === 0 ? suCoFiles : [],
                )
              }
              className="flex items-center justify-center gap-2 h-14 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors text-sm touch-manipulation active:scale-95"
            >
              <Share2 className="w-5 h-5" />
              Chia sẻ
            </button>
          </div>
        )}
      </div>

      {/* ========================================================
          PREVIEW MODAL
      ======================================================== */}

      {showPreview && (
        <div
          className="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}

            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-lg">
                <Eye className="w-5 h-5" />
                Xem trước
              </div>

              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="p-2 text-slate-400 hover:bg-slate-100 rounded-full touch-manipulation active:scale-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* CONTENT */}

            <div className="p-5 overflow-y-auto">
              {previewImages.length > 0 && (
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {previewImages.map((src, index) => (
                    <img
                      key={`${src}-${index}`}
                      src={src}
                      alt={`Ảnh báo cáo ${index + 1}`}
                      className="w-full h-40 object-cover rounded-xl border border-slate-100"
                    />
                  ))}
                </div>
              )}

              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-[16px] leading-relaxed text-slate-700 whitespace-pre-wrap max-h-[50vh] overflow-y-auto">
                {previewContent}
              </div>
            </div>

            {/* FOOTER */}

            <div className="p-5 pt-0 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="flex items-center justify-center gap-2 h-12 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 touch-manipulation active:scale-95"
              >
                <X className="w-4 h-4" />
                Đóng
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowPreview(false);

                  shareContent(
                    previewContent,
                    "Báo cáo vận hành",
                    activeTab === 0
                      ? suCoFiles
                      : activeTab === 3 && previewContent.includes("BÁO CÁO 5S")
                        ? anh5S
                        : [],
                  );
                }}
                className="flex items-center justify-center gap-2 h-12 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 touch-manipulation active:scale-95"
              >
                <Share2 className="w-4 h-4" />
                Chia sẻ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          BOTTOM NAVIGATION
      ======================================================== */}

      <div className="fixed bottom-6 left-4 right-4 z-[9000] max-w-md mx-auto pointer-events-none">
        <div className="pointer-events-auto bg-white/95 backdrop-blur-xl border border-slate-100 rounded-[36px] p-1.5 flex justify-between shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)]">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 rounded-[28px] transition-all duration-300 active:scale-95 cursor-pointer touch-manipulation ${
                  isActive
                    ? "bg-blue-50/80 text-blue-600"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Icon
                  className={`w-[22px] h-[22px] transition-transform pointer-events-none ${
                    isActive ? "scale-110" : ""
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />

                <span className="font-bold text-[11px] pointer-events-none tracking-wide">
                  {tab.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
