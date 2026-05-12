# HakaSynC — CLAUDE.md

## Mô tả dự án
Nền tảng mạng xã hội + workspace cho cộng đồng tham gia cuộc thi học thuật, công nghệ, startup. Kết nối Cá nhân ↔ Nhóm ↔ Ban tổ chức, tích hợp AI để tối ưu teamwork và tự động tạo Portfolio.

## Current Status
> **Cập nhật sau mỗi compact.** Xóa dòng cũ, ghi dòng mới.
- Phase: 1 — **COMPLETE** ✅
- Task hiện tại: [x] 1.1–1.13 xong (Phase 1 hoàn toàn demo-ready) → Phase 2 khi cần
- File quan trọng vừa tạo/sửa: src/components/shared/PageTransition.tsx, src/app/(app)/layout.tsx
- Vấn đề cần nhớ: middleware.ts phải nằm trong src/ (không phải root) vì dùng --src-dir. shadcn v4 dùng Tailwind v4 syntax → đã rewrite globals.css + button.tsx cho Tailwind v3. useAuth().login(email, password) cần 2 args.

---

## Tech Stack
- **Frontend:** Next.js 14 (App Router, TypeScript), Tailwind CSS, shadcn/ui
- **AI:** Google Gemini 1.5 Flash API
- **UI Utils:** @dnd-kit (Kanban drag & drop), Tiptap (rich text editor)
- **Auth:** NextAuth.js v4 (JWT) — *demo: simple useState/cookie*
- **DB:** Prisma + MySQL (Railway) — *chỉ dùng ở phase full, không dùng cho demo*
- **Design System:** → xem `docs/design-system.md`
  - BG: `#F4F0EB` · Card light: `#FFF` · Card dark: `#25262B` · Primary: `#FFD034` · Coral: `#FF6B6B`
  - Font: Poppins · Card radius: `28px` · Button radius: `99px` · Shadow: `0 10px 40px rgba(0,0,0,0.04)`

---

## Folder Structure
```
src/app/(public)/   — Landing, Login, Register, Portfolio public (không sidebar)
src/app/(app)/      — Feed, Workspace, Dashboard, Archive (có sidebar, cần auth)
src/components/     — feed/ workspace/ dashboard/ archive/ shared/
src/lib/            — types.ts, mockData.ts, auth.ts, authContext.tsx
middleware.ts       — ở root (ngoài src/), check cookie mock-auth
```
> Tất cả imports dùng `@/` alias trỏ vào `src/`. Ví dụ: `@/lib/types`, `@/components/feed/MemberCard`.

## Cấu trúc trang

### 0. Landing `/` & Auth `/login` `/register`
Landing: Hero + How it works (5 bước) + 4 Features + CTA. Nếu đã login → redirect `/feed`.
Auth: Split layout — dark panel trái (tagline), form panel phải. Cookie-based mock auth.

### 1. Feed `/feed` — Khám phá & kết nối
| Tab | Nội dung |
|---|---|
| Find Members | Danh sách user, lọc theo skill/major, card có avatar + skills + bio + status |
| Find Teams | Nhóm đang tuyển, hiển thị vai trò còn thiếu, nút Apply |
| Competitions | Danh sách cuộc thi, giải thưởng, deadline, nút xem chi tiết |
| My Team | Quản lý nhóm: xem thành viên, duyệt/từ chối đơn ứng tuyển |

### 2. AI Workspace `/workspace` — Công cụ AI dự án
| Tab | Nội dung |
|---|---|
| Task Splitter | Nhập mô tả dự án → AI tạo tasks (priority/role/giờ) → Kanban 3 cột (Todo/In Progress/Done) + nút Auto Assign |
| Slide Maker | Đặt giờ trigger (mặc định 13:00 ngày cuối) → đồng hồ đếm ngược → AI đọc task Done → tạo 5 slide → preview từng slide |
| Time Splitter | Nhập ngày/thành viên/giờ thuyết trình → AI tạo lịch chi tiết từng ngày, breakout task từng người |

### 3. Dashboard `/dashboard` — Tổng quan tiến độ
- **4 chỉ số đầu trang:** Total Tasks · % Progress · Team Members · Competitions
- **Recent Activity:** Lịch sử hành động (ai move task nào, lúc nào)
- **Files & Notes:** Upload/download tài liệu, ghi chú chung
- **Member Progress:** Progress bar từng thành viên (task done / total assigned)

### 4. AI Archiving `/archive` — Portfolio & lưu trữ
| Phần | Nội dung |
|---|---|
| Contribution | AI phân tích log, xác định đóng góp cá nhân, trích xuất skills thực dùng |
| Project Summary | Thời lượng, quy mô nhóm, số task, công nghệ |
| Portfolio Preview | CV-format: tiêu đề · vai trò · mô tả · bullet achievements · tech stack · xuất PDF / public link |

---

## Demo Strategy (Phase 1)

**Làm đầy đủ:**
- Toàn bộ UI layout, routing, navigation giữa 4 trang
- Kanban drag & drop (Task Splitter)
- Auth đơn giản không cần DB
- Mock data cho tất cả trang

**Frontend-Only Demo** — dùng hardcoded response, KHÔNG làm backend thật:

| Tính năng | Ghi chú demo |
|---|---|
| Gemini AI — Task Splitter | Hardcode danh sách task đẹp khi submit |
| Gemini AI — Slide Maker | Hardcode 5 slide HTML/CSS, fake countdown |
| Gemini AI — Time Splitter | Hardcode timeline theo ngày |
| Gemini AI — Contribution analysis | Hardcode contribution report |
| PDF Export | Chỉ hiển thị preview, không export thật |
| Public portfolio link | Static route, không có auth bypass |
| File upload/download | Mock file list, không lưu thật |
| Database (Prisma + MySQL) | Dùng `mockData.ts` thay thế |
| NextAuth full flow | Simple session state |
| Real-time notifications | Tĩnh |
| 1-Click competition registration | UI flow mock |

**Quy tắc mock data:** Tạo file `src/lib/mockData.ts` tập trung cho tất cả data tĩnh.

---

## Phase 2 (sau demo)
Thay từng mock bằng implementation thật theo thứ tự ưu tiên:
1. DB + Auth (Prisma + NextAuth)
2. Gemini API integration (Task Splitter → Slide Maker → Time Splitter → Archive)
3. File upload (Cloudinary/S3)
4. PDF export
5. Public link + real-time

---

## Compact Protocol
Sau mỗi checkpoint trong `docs/development-plan.md`:
1. Đánh `[x]` vào task vừa hoàn thành trong plan
2. Cập nhật section `## Current Status` ở trên (phase, task hiện tại, file quan trọng, vấn đề)
3. Chạy `/compact` — context sẽ được nén, CLAUDE.md được load lại tự động
4. Lần tiếp tục: đọc `Current Status` → đọc đúng mục trong `development-plan.md` → tiếp tục

**Không cần đọc lại toàn bộ plan sau compact** — chỉ đọc mục đang làm và mục tiếp theo.

## Sub-agents (Phase 2 only)
- Phase 1: làm trong 1 session duy nhất (shared components, cần consistency)
- Phase 2: có thể tách 2 agent song song:
  - Agent Backend: `prisma/`, `app/api/`, `.env`
  - Agent Frontend: thay mock calls bằng real API, không đụng API routes
