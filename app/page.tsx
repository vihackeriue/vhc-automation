"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  CloudLightning,
  Wind,
  Eye,
  Copy,
  X,
  Calendar,
  Clock,
  User,
  ChevronDown,
  Share2,
  ClipboardList,
  Trash2,
} from "lucide-react";

type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ComponentType<{ className?: string }>;
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
  return (
    <div className="mb-4">
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-4 text-blue-500 w-5 h-5 pointer-events-none" />
        )}

        <input
          type={type}
          list={list}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={label}
          className={`w-full bg-white border-2 border-slate-100 focus:border-blue-500 rounded-2xl py-3.5 pr-4 outline-none transition-all text-[16px] font-medium text-slate-700 touch-manipulation ${
            Icon ? "pl-12" : "pl-4"
          } ${list ? "pr-12" : ""}`}
        />

        {list && (
          <ChevronDown className="absolute right-4 top-4 text-slate-400 w-5 h-5 pointer-events-none" />
        )}
      </div>
    </div>
  );
};

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center my-5">
      <div className="w-1 h-5 bg-blue-500 rounded-full mr-3" />
      <span className="font-bold text-[16px] text-slate-800">{title}</span>
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
    deXuat: "",
  });

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
    tocDoCap: "",
    tinhTrang: "",
    truSo: "",
    tocDo: "",
    tocDoMax: "",
    kieuGio: "",
    mucGioThucTe: "",
    tocDoToanTuyen: "",
    xuHuong: "",
    nguyCo: "",
    batThuong: "",
    deXuatTocDo: "",
    xinHoTro: "",
    deXuatKhac: "",
  });

  // ============================================================
  // CHUNG
  // ============================================================

  const [chung, setChung] = useState({
    // Cập nhật tốc độ
    tocDoNgay: "",
    tocDoTuyen: "",
    tocDoHienTai: "",
    tocDoThoiGian: "",
    tocDoGhiChu: "",

    // Báo cáo 5S
    loai5S: "Đầu ca",
    tuyen5S: "",
    ga5S: "",
    nhanSu5S: "",
    thoiGianDauCa: "",
    thoiGianCuoiCa: "",
  });

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
    return `CẬP NHẬT TỐC ĐỘ TUYẾN CÁP

Ngày: ${chung.tocDoNgay}
Tuyến cáp: ${chung.tocDoTuyen}
Tốc độ hiện tại: ${chung.tocDoHienTai} m/s
Thời gian: ${chung.tocDoThoiGian}
Ghi chú: ${chung.tocDoGhiChu}`;
  };

  // ============================================================
  // GENERATE - 5S
  // ============================================================

  const generate5SContent = () => {
    const timeLine =
      chung.loai5S === "Đầu ca"
        ? `Thời gian vào ca: ${chung.thoiGianDauCa}`
        : `Thời gian ra ca: ${chung.thoiGianCuoiCa}`;

    return `BÁO CÁO 5S

Loại: ${chung.loai5S}
Vị trí: ${chung.ga5S}
Tuyến cáp: ${chung.tuyen5S}
Nhân sự: ${chung.nhanSu5S}
${timeLine}
Hình ảnh: ${
      anh5S.length > 0
        ? `${anh5S.length} ảnh (${anh5S.map((file) => file.name).join(", ")})`
        : "Chưa đính kèm"
    }`;
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

Trân trọng`;
    }

    // ==========================================================
    // DÔNG SÉT
    // ==========================================================

    if (activeTab === 1) {
      return `Cập nhật tình hình dông sét.

Ga: ${ds.ga}
Tần suất (phút/lần): ${ds.tanSuat}

----------------------------

- Số lần nghe tiếng sấm: ${ds.soLan}
- Mây: ${ds.may}
- Mưa: ${ds.mua}
- Xu hướng dông sét (Tăng/Giảm/Không đổi): ${ds.xuHuong}

----------------------------

Trân trọng!`;
    }

    // ==========================================================
    // CẤP GIÓ
    // ==========================================================

    if (activeTab === 2) {
      return `*Ngày:* ${cg.ngay}
*Thời gian:* ${cg.gio}

----------------------------

*THÔNG TIN CẤP GIÓ*

*Phòng KTCT báo cáo a/c cập nhật thông tin gió trên tuyến*

*Tuyến cáp số:* ${cg.tuyen}

*+ T.độ cáp hiện tại:* ${cg.tocDoCap}
*+ Tình trạng đón khách:* ${cg.tinhTrang}

———————————————

*Tốc độ gió:*

+ Trụ số: ${cg.truSo}
+ Tốc độ (m/s): ${cg.tocDo}
+ Tốc độ max (m/s): ${cg.tocDoMax}
+ Kiểu gió phổ biến: ${cg.kieuGio}
+ Mức độ gió thực tế trên tuyến: ${cg.mucGioThucTe}

———————————————

+ Tốc độ gió toàn tuyến (m/s): ${cg.tocDoToanTuyen}
+ Xu hướng gió (Tăng/Không đổi/Giảm): ${cg.xuHuong}
+ Nguy cơ/cảnh báo: ${cg.nguyCo}
*+ Bất thường của hệ thống:* ${cg.batThuong}

———————————————

*Đề xuất/Xin quyết định/chỉ đạo:*

+ *Đề xuất tốc độ cáp:* ${cg.deXuatTocDo}
+ Xin hỗ trợ: ${cg.xinHoTro}
+ Đề xuất khác: ${cg.deXuatKhac}

———————————————

*Trân trọng !*`;
    }

    // ==========================================================
    // CHUNG
    // ==========================================================

    return generateTocDoContent();
  };

  // ============================================================
  // COPY
  // ============================================================

  const copyToClipboard = async (text: string) => {
    if (!text) {
      showToast("Không có nội dung để copy!");
      return;
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");

        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();

        document.execCommand("copy");

        document.body.removeChild(textarea);
      }

      showToast("Đã copy nội dung vào khay nhớ tạm!");

      setShowPreview(false);
    } catch (error) {
      console.error("Copy error:", error);
      showToast("Không thể copy nội dung!");
    }
  };

  // ============================================================
  // SHARE
  // ============================================================

  const shareContent = async (
    text: string = generateContent(),
    title: string = `Báo cáo ${tabs[activeTab].title}`,
    files: File[] = [],
  ) => {
    try {
      if (navigator.share) {
        const shareData: ShareData = {
          title,
          text,
        };

        if (
          files.length > 0 &&
          navigator.canShare &&
          navigator.canShare({ files })
        ) {
          shareData.files = files;
        }

        await navigator.share(shareData);
      } else {
        await copyToClipboard(text);

        showToast("Thiết bị không hỗ trợ chia sẻ. Nội dung đã được copy!");
      }
    } catch (error) {
      // Người dùng đóng menu chia sẻ
      console.log("Share cancelled:", error);
    }
  };

  // ============================================================
  // XỬ LÝ ẢNH 5S
  // ============================================================

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    setAnh5S((prev) => [...prev, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        setAnh5SPreview((prev) => [...prev, String(reader.result || "")]);
      };

      reader.readAsDataURL(file);
    });

    event.currentTarget.value = "";
  };

  // ============================================================
  // XÓA 1 ẢNH
  // ============================================================

  const removeImage = (index: number) => {
    setAnh5S((prev) => prev.filter((_, i) => i !== index));

    setAnh5SPreview((prev) => prev.filter((_, i) => i !== index));
  };

  // ============================================================
  // XÓA TẤT CẢ ẢNH
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
    <div className="min-h-screen bg-slate-50 pb-32 touch-manipulation">
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

      <div className="bg-white/80 backdrop-blur-sm sticky top-0 z-40 py-4 px-6 border-b border-slate-100 flex justify-center">
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
                  icon={Clock}
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
                  icon={Clock}
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
            />

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
                />
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
                />
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
                />
              </div>

              <div className="flex-1">
                <Input
                  label="Giờ"
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

            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  label="Tuyến số"
                  value={cg.tuyen}
                  onChange={(v) =>
                    setCg((prev) => ({
                      ...prev,
                      tuyen: v,
                    }))
                  }
                />
              </div>

              <div className="flex-1">
                <Input
                  label="Tốc độ cáp"
                  value={cg.tocDoCap}
                  onChange={(v) =>
                    setCg((prev) => ({
                      ...prev,
                      tocDoCap: v,
                    }))
                  }
                />
              </div>
            </div>

            <Input
              label="Trạng thái đón khách"
              value={cg.tinhTrang}
              onChange={(v) =>
                setCg((prev) => ({
                  ...prev,
                  tinhTrang: v,
                }))
              }
              list="tinhtrang-list"
            />

            <datalist id="tinhtrang-list">
              <option value="KTDN" />
              <option value="Đón khách" />
            </datalist>

            <SectionTitle title="Thông tin gió" />

            <Input
              label="Trụ số"
              value={cg.truSo}
              onChange={(v) =>
                setCg((prev) => ({
                  ...prev,
                  truSo: v,
                }))
              }
            />

            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  label="Tốc độ (m/s)"
                  value={cg.tocDo}
                  onChange={(v) =>
                    setCg((prev) => ({
                      ...prev,
                      tocDo: v,
                    }))
                  }
                  type="number"
                />
              </div>

              <div className="flex-1">
                <Input
                  label="Max (m/s)"
                  value={cg.tocDoMax}
                  onChange={(v) =>
                    setCg((prev) => ({
                      ...prev,
                      tocDoMax: v,
                    }))
                  }
                  type="number"
                />
              </div>
            </div>

            <Input
              label="Kiểu gió phổ biến"
              value={cg.kieuGio}
              onChange={(v) =>
                setCg((prev) => ({
                  ...prev,
                  kieuGio: v,
                }))
              }
              list="kieugio-list"
            />

            <datalist id="kieugio-list">
              <option value="Gió ngang" />
              <option value="Gió dọc" />
              <option value="Gió ngang và gió dọc" />
            </datalist>

            <Input
              label="Mức độ thực tế"
              value={cg.mucGioThucTe}
              onChange={(v) =>
                setCg((prev) => ({
                  ...prev,
                  mucGioThucTe: v,
                }))
              }
            />

            <SectionTitle title="Toàn tuyến" />

            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  label="V Toàn tuyến"
                  value={cg.tocDoToanTuyen}
                  onChange={(v) =>
                    setCg((prev) => ({
                      ...prev,
                      tocDoToanTuyen: v,
                    }))
                  }
                  type="number"
                />
              </div>

              <div className="flex-1">
                <Input
                  label="Xu hướng"
                  value={cg.xuHuong}
                  onChange={(v) =>
                    setCg((prev) => ({
                      ...prev,
                      xuHuong: v,
                    }))
                  }
                  list="xuhuong-cg-list"
                />
              </div>
            </div>

            <datalist id="xuhuong-cg-list">
              <option value="Tăng" />
              <option value="Giảm" />
              <option value="Không đổi" />
              <option value="Không xác định" />
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
              <option value="Cảnh báo gió" />
              <option value="Báo động gió" />
              <option value="Không" />
            </datalist>

            <Input
              label="Bất thường hệ thống"
              value={cg.batThuong}
              onChange={(v) =>
                setCg((prev) => ({
                  ...prev,
                  batThuong: v,
                }))
              }
            />

            <SectionTitle title="Đề xuất" />

            <Input
              label="Tốc độ cáp"
              value={cg.deXuatTocDo}
              onChange={(v) =>
                setCg((prev) => ({
                  ...prev,
                  deXuatTocDo: v,
                }))
              }
            />

            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  label="Xin hỗ trợ"
                  value={cg.xinHoTro}
                  onChange={(v) =>
                    setCg((prev) => ({
                      ...prev,
                      xinHoTro: v,
                    }))
                  }
                />
              </div>

              <div className="flex-1">
                <Input
                  label="Khác"
                  value={cg.deXuatKhac}
                  onChange={(v) =>
                    setCg((prev) => ({
                      ...prev,
                      deXuatKhac: v,
                    }))
                  }
                />
              </div>
            </div>
          </div>
        )}

        {/* ====================================================
            TAB CHUNG
        ==================================================== */}

        {activeTab === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* ==================================================
                CẬP NHẬT TỐC ĐỘ TUYẾN CÁP
            ================================================== */}

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
              <option value="Tuyến 1" />
              <option value="Tuyến 2" />
              <option value="Tuyến 3" />
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
                  icon={Clock}
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

            <div className="grid grid-cols-3 gap-2 mt-2 mb-8">
              <button
                type="button"
                onClick={() => openPreview(generateTocDoContent())}
                className="flex items-center justify-center gap-1 h-14 rounded-2xl border-2 border-blue-500 text-blue-600 font-bold hover:bg-blue-50 transition-colors text-sm touch-manipulation active:scale-95"
              >
                <Eye className="w-5 h-5" />
                Xem
              </button>

              <button
                type="button"
                onClick={() => copyToClipboard(generateTocDoContent())}
                className="flex items-center justify-center gap-1 h-14 rounded-2xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-colors text-sm touch-manipulation active:scale-95"
              >
                <Copy className="w-5 h-5" />
                Copy
              </button>

              <button
                type="button"
                onClick={() =>
                  shareContent(
                    generateTocDoContent(),
                    "Cập nhật tốc độ tuyến cáp",
                  )
                }
                className="flex items-center justify-center gap-1 h-14 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors text-sm touch-manipulation active:scale-95"
              >
                <Share2 className="w-5 h-5" />
                Chia sẻ
              </button>
            </div>

            {/* ==================================================
                BÁO CÁO 5S
            ================================================== */}

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
              label="Tuyến cáp"
              value={chung.tuyen5S}
              onChange={(v) =>
                setChung((prev) => ({
                  ...prev,
                  tuyen5S: v,
                }))
              }
              list="tuyen-5s-list"
            />

            <datalist id="tuyen-5s-list">
              <option value="Tuyến 1" />
              <option value="Tuyến 2" />
              <option value="Tuyến 3" />
            </datalist>

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

            {/* ==================================================
                HÌNH ẢNH 5S
            ================================================== */}

            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-500 mb-2">
                Hình ảnh
              </label>

              <label className="flex flex-col items-center justify-center w-full min-h-32 bg-white border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-4 cursor-pointer transition-colors touch-manipulation">
                {anh5SPreview.length > 0 ? (
                  <div className="w-full">
                    <div className="grid grid-cols-2 gap-3">
                      {anh5SPreview.map((src, index) => (
                        <div key={`${src}-${index}`} className="relative">
                          <img
                            src={src}
                            alt={`Ảnh báo cáo 5S ${index + 1}`}
                            className="w-full h-40 object-cover rounded-xl border border-slate-100"
                          />

                          <div className="absolute top-2 left-2 bg-slate-900/70 text-white text-xs font-bold px-2 py-1 rounded-lg">
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
                      Chạm để thêm hình ảnh
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                      <span className="text-2xl">📷</span>
                    </div>

                    <span className="font-bold text-slate-700">
                      Chọn hình ảnh
                    </span>

                    <span className="text-xs text-slate-400 mt-1">
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

            {/* ==================================================
                THỜI GIAN CA
            ================================================== */}

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

                  <input
                    type="time"
                    value={chung.thoiGianDauCa}
                    onChange={(e) =>
                      setChung((prev) => ({
                        ...prev,
                        thoiGianDauCa: e.target.value,
                      }))
                    }
                    className="w-full border-2 border-slate-100 rounded-xl px-3 py-3 outline-none focus:border-blue-500 touch-manipulation"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">
                    Ra ca
                  </label>

                  <input
                    type="time"
                    value={chung.thoiGianCuoiCa}
                    onChange={(e) =>
                      setChung((prev) => ({
                        ...prev,
                        thoiGianCuoiCa: e.target.value,
                      }))
                    }
                    className="w-full border-2 border-slate-100 rounded-xl px-3 py-3 outline-none focus:border-blue-500 touch-manipulation"
                  />
                </div>
              )}
            </div>

            {/* ==================================================
                GỢI Ý
            ================================================== */}

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-4">
              <div className="font-bold text-blue-700 mb-1">💡 Gợi ý</div>

              <div className="text-sm text-blue-600 leading-relaxed">
                Chọn <b>Đầu ca</b> để ghi nhận thời gian vào ca. Chọn{" "}
                <b>Cuối ca</b> để ghi nhận thời gian ra ca.
              </div>
            </div>

            {/* ==================================================
                NÚT 5S
            ================================================== */}

            <div className="grid grid-cols-3 gap-2 mt-2">
              <button
                type="button"
                onClick={() => openPreview(generate5SContent(), anh5SPreview)}
                className="flex items-center justify-center gap-1 h-14 rounded-2xl border-2 border-blue-500 text-blue-600 font-bold hover:bg-blue-50 transition-colors text-sm touch-manipulation active:scale-95"
              >
                <Eye className="w-5 h-5" />
                Xem
              </button>

              <button
                type="button"
                onClick={() => copyToClipboard(generate5SContent())}
                className="flex items-center justify-center gap-1 h-14 rounded-2xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-colors text-sm touch-manipulation active:scale-95"
              >
                <Copy className="w-5 h-5" />
                Copy
              </button>

              <button
                type="button"
                onClick={() =>
                  shareContent(generate5SContent(), "Báo cáo 5S", anh5S)
                }
                className="flex items-center justify-center gap-1 h-14 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors text-sm touch-manipulation active:scale-95"
              >
                <Share2 className="w-5 h-5" />
                Chia sẻ
              </button>
            </div>
          </div>
        )}

        {/* ======================================================
            BUTTONS - 3 TAB ĐẦU
        ====================================================== */}

        {activeTab !== 3 && (
          <div className="grid grid-cols-3 gap-2 mt-8">
            {/* XEM */}

            <button
              type="button"
              onClick={() => openPreview(generateContent())}
              className="flex items-center justify-center gap-1 h-14 rounded-2xl border-2 border-blue-500 text-blue-600 font-bold hover:bg-blue-50 transition-colors text-sm touch-manipulation active:scale-95"
            >
              <Eye className="w-5 h-5" />
              Xem
            </button>

            {/* COPY */}

            <button
              type="button"
              onClick={() => copyToClipboard(generateContent())}
              className="flex items-center justify-center gap-1 h-14 rounded-2xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-colors text-sm touch-manipulation active:scale-95"
            >
              <Copy className="w-5 h-5" />
              Copy
            </button>

            {/* SHARE */}

            <button
              type="button"
              onClick={() =>
                shareContent(
                  generateContent(),
                  `Báo cáo ${tabs[activeTab].title}`,
                )
              }
              className="flex items-center justify-center gap-1 h-14 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors text-sm touch-manipulation active:scale-95"
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

            {/* FOOTER BUTTONS */}

            <div className="p-5 pt-0 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => copyToClipboard(previewContent)}
                className="flex items-center justify-center gap-2 h-12 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 touch-manipulation active:scale-95"
              >
                <Copy className="w-4 h-4" />
                Copy
              </button>

              <button
                type="button"
                onClick={() => shareContent(previewContent, "Báo cáo vận hành")}
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
