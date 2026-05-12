# HakaSynC — Development Plan

> Sau khi hoàn thành mỗi tính năng, compact context và dùng file này làm điểm tiếp tục.
> Đánh dấu `[x]` khi xong, `[-]` khi đang làm, `[ ]` chưa làm.

---

## PHASE 1 — Demo (Frontend + Mock Data)

### Routing Logic (toàn bộ app)
```
/ (Landing)          — public, nếu đã login → redirect /feed
/login               — public
/register            — public
/feed                — protected
/workspace           — protected
/dashboard           — protected
/archive             — protected
```
Middleware `middleware.ts`: check mock auth cookie → redirect `/login` nếu chưa có.

---

### Folder Structure (dùng `src/` directory — nhất quán tất cả)
```
src/
  app/
    (public)/         — Landing, Login, Register, Portfolio public
    (app)/            — Feed, Workspace, Dashboard, Archive
  components/
    feed/ workspace/ dashboard/ archive/ shared/
  lib/
    types.ts mockData.ts auth.ts authContext.tsx
middleware.ts         — ở root (ngoài src/)
```

### 1.1 Project Setup ✅
- [x] Khởi tạo Next.js 14 project với flag `--src-dir` (App Router, TypeScript, Tailwind CSS)
- [x] Cài dependencies: `shadcn/ui`, `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`, `lucide-react`, `clsx`, `sonner`, `@tiptap/react`, `@tiptap/starter-kit`
- [x] Cấu hình Tailwind `tailwind.config.ts`: extend colors (bg, card-light, card-dark, primary, coral, text-muted), font Poppins via `next/font/google`
- [x] Tạo CSS variables + base styles trong `src/app/globals.css`
- [x] Tạo TypeScript interfaces trong `src/lib/types.ts`: `User`, `Team`, `Competition`, `Task`, `PortfolioEntry`, `ActivityLog`, `SlideContent`, `TimelineDay`
- [x] Tạo `src/lib/mockData.ts` dùng interfaces từ types.ts — data cho tất cả trang
- [x] Mock auth: `src/lib/auth.ts` — `login()` set cookie `mock-auth=true`, `logout()` xóa cookie, `isAuthed()` đọc cookie
- [x] `src/lib/authContext.tsx`: `useAuth()` hook cung cấp `user`, `login()`, `logout()`
- [x] `src/middleware.ts` (trong src/): protected routes redirect `/login` nếu không có cookie
- [x] Layout app `src/app/(app)/layout.tsx`: sidebar floating pill + `<Toaster />`
- [x] Layout public `src/app/(public)/layout.tsx`: không có sidebar, full-width

**Checkpoint:** ✅ `npm run dev` chạy được, `/feed` bị redirect về `/login` (307) khi chưa auth.

---

### 1.2 Landing Page ✅
**File:** `src/app/(public)/page.tsx` (route: `/`)
- [x] **Hero section**: logo + tagline "Find your team. Win together." + 2 CTA: "Get Started" → `/register`, "Sign In" → `/login`
- [x] **How it works** (5 bước horizontal): Register → Feed → Workspace → Dashboard → Archive — mỗi bước có số + icon + mô tả 1 dòng
- [x] **Features** (4 cards): Find Members · AI Workspace · Track Progress · Auto Portfolio
- [x] **Bottom CTA**: banner dark `#25262B` với nút "Start for free"
- [x] Nếu đã login (cookie tồn tại): redirect ngay sang `/feed`, không hiển thị landing

**Checkpoint:** ✅ `/` hiển thị landing đẹp, CTA dẫn đúng trang, đã login thì vào thẳng `/feed`.

---

### 1.3 Auth Pages (Mock)
**File:** `src/app/(public)/login/page.tsx`, `src/app/(public)/register/page.tsx`
- [ ] **Login**: email + password, nút "Sign In" → `login()` set cookie → redirect `/feed`
- [ ] **Register**: name + email + password + chọn major/role (dropdown) → mock register → redirect `/feed`
- [ ] Styling: full-screen split layout — trái: dark card `#25262B` với tagline, phải: form trên nền `#F4F0EB`
- [ ] Link qua lại login ↔ register
- [ ] Validation đơn giản: required fields, email format

**Checkpoint:** Register/login hoạt động, cookie set, redirect đúng, sidebar xuất hiện sau login.

---

### 1.4 Feed — Find Members
**File:** `src/app/(app)/feed/page.tsx`, `src/components/feed/MemberCard.tsx`
- [ ] Layout trang Feed với 4 tab (Find Members / Find Teams / Competitions / My Team)
- [ ] Component `MemberCard`: avatar, tên, major, skill tags, status pill (Looking/Open/Busy), nút Connect
- [ ] Click vào MemberCard → mở **modal profile** (không tạo route riêng): avatar lớn, bio, skills, status, nút Connect/Message (mock)
- [ ] Filter bar: lọc theo skill, major (UI only, filter mock data)
- [ ] Responsive grid: 3 col desktop, 2 col tablet, 1 col mobile
- [ ] Mock data: 8–10 member profiles

**Checkpoint:** Tab Find Members hiển thị đủ cards, click card ra modal profile, filter hoạt động.

---

### 1.5 Feed — Find Teams
**File:** `src/components/feed/TeamCard.tsx`
- [ ] Component `TeamCard`: tên team, mô tả, avatar members, danh sách vai trò còn thiếu (tags), nút Apply
- [ ] Apply modal: form giả (chỉ toast "Đã gửi đơn")
- [ ] Mock data: 6 teams với roles còn thiếu

**Checkpoint:** Tab Find Teams hiển thị cards, click Apply ra modal.

---

### 1.6 Feed — Competitions
**File:** `src/components/feed/CompetitionCard.tsx`
- [ ] Component `CompetitionCard`: banner/logo, tên, tổ chức, giải thưởng, deadline badge, nút Xem chi tiết
- [ ] Competition detail modal/drawer: full info, timeline, rules
- [ ] Mock data: 5 competitions

**Checkpoint:** Tab Competitions hiển thị cards, click ra detail.

---

### 1.7 Feed — My Team
**File:** `src/components/feed/MyTeam.tsx`
- [ ] Section danh sách thành viên hiện tại: avatar, tên, role, status
- [ ] Section đơn ứng tuyển đang chờ: avatar, tên, skill, nút Duyệt / Từ chối
- [ ] Duyệt/từ chối chỉ cập nhật state local (mock)
- [ ] Mock data: team 4 người + 3 đơn pending

**Checkpoint:** Tab My Team hiển thị members + applications, duyệt/từ chối cập nhật UI.

---

### 1.8 AI Workspace — Task Splitter
**File:** `src/app/(app)/workspace/page.tsx`, `src/components/workspace/TaskSplitter.tsx`, `src/components/workspace/KanbanBoard.tsx`
- [ ] Layout Workspace với 3 tab (Task Splitter / Slide Maker / Time Splitter)
- [ ] Form nhập mô tả dự án + nút "Generate Tasks"
- [ ] Khi submit: hiển thị loading 1.5s → render hardcoded task list (8–10 tasks với priority/role/giờ)
- [ ] Kanban board 3 cột: Todo / In Progress / Done
- [ ] Drag & drop tasks giữa các cột (`@dnd-kit`)
- [ ] Nút "Auto Assign": gán task cho members ngẫu nhiên từ mock team
- [ ] Task card: tiêu đề, priority badge, role tag, estimated hours, assignee avatar

**Checkpoint:** Nhập mô tả → tasks xuất hiện → kéo thả giữa cột → Auto Assign gán người.

---

### 1.9 AI Workspace — Slide Maker
**File:** `src/components/workspace/SlideMaker.tsx`
- [ ] Time picker để chọn giờ trigger (default: 13:00 ngày cuối sprint)
- [ ] Countdown timer hiển thị HH:MM:SS đến giờ trigger (dùng `setInterval`)
- [ ] Nút "Generate Now" để trigger thủ công (demo)
- [ ] Khi trigger: loading 2s → render 5 slide cards (hardcoded content)
- [ ] Slide preview: component render từng slide như card HTML (tiêu đề, bullet points, layout đẹp)
- [ ] Navigation prev/next giữa các slides

**Checkpoint:** Set giờ → countdown chạy → Generate Now → 5 slides preview, navigate qua lại.

---

### 1.10 AI Workspace — Time Splitter
**File:** `src/components/workspace/TimeSplitter.tsx`
- [ ] Form: số ngày, ngày bắt đầu, số thành viên, giờ thuyết trình
- [ ] Khi submit: loading 1.5s → render hardcoded timeline
- [ ] Timeline layout: theo từng ngày, mỗi ngày có các khung giờ
- [ ] Mỗi khung giờ: task name, assignee, duration bar
- [ ] Visual: timeline dọc với color coding theo member

**Checkpoint:** Điền form → timeline chi tiết xuất hiện với layout đẹp.

---

### 1.11 Dashboard
**File:** `src/app/(app)/dashboard/page.tsx`, `src/components/dashboard/`
- [ ] 4 stat cards đầu trang: Total Tasks, % Progress, Team Members, Competitions (với icon + số)
- [ ] Recent Activity feed: list các hành động mock (avatar + text + timestamp)
- [ ] Files & Notes section: mock file list (icon theo type), ghi chú dùng **Tiptap** rich text editor (bold, bullet list, heading) — state local
- [ ] Member Progress: progress bar cho từng thành viên (tasks done / total), sorted by completion
- [ ] Gradient mesh blurs ở background một số card (theo design-system.md)

**Checkpoint:** Dashboard hiển thị đủ 4 section, data từ mockData.ts.

---

### 1.12 AI Archiving
**File:** `src/app/(app)/archive/page.tsx`, `src/components/archive/`
- [ ] Layout 3 section dọc hoặc tab: Contribution / Project Summary / Portfolio Preview
- [ ] Nút "Analyze Project" → loading 2s → render hardcoded contribution report
- [ ] Contribution section: list từng member, % contribution bar, skills extracted (tags)
- [ ] Project Summary: stats cards (duration, team size, task count, tech stack tags)
- [ ] Portfolio Preview: card format CV — tiêu đề, role, mô tả, bullet achievements, tech stack
- [ ] Nút "Export PDF" → toast "PDF export coming soon" (demo)
- [ ] Nút "Create Public Link" → toast "Public link coming soon" (demo)

**Checkpoint:** Click Analyze → toàn bộ 3 section render với data đẹp, export buttons show toast.

---

### 1.13 Polish & Demo-Ready
- [ ] Loading states cho tất cả AI actions (skeleton hoặc spinner)
- [ ] Toast notifications (`sonner` hoặc shadcn toast)
- [ ] Empty states khi chưa có data
- [ ] Responsive check tất cả trang (mobile/tablet/desktop)
- [ ] Dark card / light card contrast đúng design system
- [ ] Sidebar active state highlight đúng trang hiện tại

**Checkpoint:** Toàn bộ app chạy mượt, không có UI broken, sẵn sàng demo.

---

## PHASE 2 — Full Implementation (Backend + AI thật)

> Bắt đầu Phase 2 sau khi Phase 1 hoàn toàn demo-ready và đã được review.

### Gemini Free Tier — Giới hạn cần biết
- Model dùng: `gemini-1.5-flash` (free tier: 15 req/min, 1M tokens/day)
- API key: lấy tại [Google AI Studio](https://aistudio.google.com) — miễn phí, không cần billing
- Lưu vào `.env.local`: `GEMINI_API_KEY=...`
- **Xử lý rate limit:** wrap tất cả Gemini calls trong try/catch, nếu 429 → toast "AI đang bận, thử lại sau"
- **Giảm token:** prompt ngắn gọn, trả về JSON thuần (không markdown), không gửi data thừa

---

### 2.1 Database & Auth Foundation
**Ưu tiên cao — các tính năng khác phụ thuộc vào đây**
- [ ] Setup Prisma: `prisma init`, cấu hình MySQL (Railway)
- [ ] Viết schema: `User`, `Team`, `TeamMember`, `TeamApplication`, `Project`, `Task`, `Competition`, `PortfolioEntry`, `ActivityLog`, `File`, `Timeline`
- [ ] `prisma migrate dev` — tạo tables
- [ ] Seed data ban đầu từ mockData.ts
- [ ] NextAuth v4: cấu hình `CredentialsProvider` + `PrismaAdapter`
- [ ] API routes: `POST /api/auth/register`, session handling
- [ ] Thay mock auth (useState) bằng NextAuth session thật
- [ ] Protect routes: middleware redirect nếu chưa login

**Checkpoint:** Register/login/logout hoạt động, session persist qua refresh, route protection.

---

### 2.2 User Profile & Feed APIs
- [ ] API: `GET /api/users` (list, filter by skill/major), `GET /api/users/[id]`
- [ ] API: `PUT /api/users/profile` — cập nhật bio, skills, status
- [ ] API: `GET /api/teams` (list recruiting), `POST /api/teams` (create)
- [ ] API: `POST /api/teams/[id]/apply` — gửi đơn ứng tuyển
- [ ] API: `PUT /api/teams/[id]/applications/[appId]` — duyệt/từ chối
- [ ] Thay mock data Feed bằng API calls (dùng `useSWR` hoặc `fetch`)
- [ ] My Team: hiển thị team thật của user đang login

**Checkpoint:** Feed hiển thị data thật từ DB, apply/approve/reject ghi xuống DB.

---

### 2.3 Competition Portal APIs
- [ ] API: `GET /api/competitions`, `POST /api/competitions` (cho organizer)
- [ ] API: `POST /api/competitions/[id]/register` — team đăng ký 1-click
- [ ] Competition detail page đầy đủ
- [ ] Role: organizer có thể tạo competition, team có thể đăng ký
- [ ] Thay mock competitions bằng data thật

**Checkpoint:** Tạo competition, team đăng ký, data persist.

---

### 2.4 Task & Project APIs (Workspace backend)
- [ ] API: `GET/POST /api/projects/[teamId]` — project của team
- [ ] API: `GET/POST /api/tasks/[projectId]` — tasks của project
- [ ] API: `PUT /api/tasks/[taskId]` — update status (khi kéo Kanban)
- [ ] Kanban board: drag & drop lưu xuống DB ngay lập tức
- [ ] API: `PUT /api/tasks/[taskId]/assign` — gán member
- [ ] Activity log: mỗi task update ghi vào bảng `ActivityLog`
- [ ] Dashboard Recent Activity đọc từ `ActivityLog` thật

**Checkpoint:** Kanban persist qua refresh, activity log hiển thị hành động thật.

---

### 2.5 Gemini AI — Task Splitter
- [ ] Setup `@google/generative-ai` SDK, lưu API key vào `.env`
- [ ] API route: `POST /api/ai/task-splitter`
- [ ] Prompt engineering: nhận project description → trả JSON array tasks (title, description, priority, role, estimatedHours)
- [ ] Validate và parse response JSON từ Gemini
- [ ] Lưu generated tasks vào DB
- [ ] Auto Assign: API `POST /api/ai/auto-assign` — Gemini phân công dựa trên skill member
- [ ] Thay hardcoded tasks bằng Gemini response thật

**Checkpoint:** Nhập mô tả → Gemini tạo tasks thật → lưu DB → Auto Assign thông minh.

---

### 2.6 Gemini AI — Slide Maker
- [ ] API route: `POST /api/ai/slide-maker`
- [ ] Đọc tasks có status `Done` từ DB của project
- [ ] Prompt: tổng hợp tasks Done → tạo 5 slide (title + bullets + speaker notes)
- [ ] Trả về JSON structure cho 5 slides
- [ ] Frontend render từ response thật thay hardcoded
- [ ] Countdown trigger thật: lưu trigger time vào DB, cron check (hoặc client-side check)

**Checkpoint:** Gemini đọc tasks Done thật → tạo slides có nội dung liên quan đến project.

---

### 2.7 Gemini AI — Time Splitter
- [ ] API route: `POST /api/ai/time-splitter`
- [ ] Prompt: nhận tasks list + constraints (ngày/người/giờ) → tạo lịch JSON chi tiết
- [ ] Response: array ngày, mỗi ngày có array time blocks (task, assignee, start, duration)
- [ ] Frontend render timeline từ response thật
- [ ] Lưu timeline vào DB để xem lại

**Checkpoint:** Time Splitter tạo lịch thật dựa trên tasks trong project.

---

### 2.8 File Upload
- [ ] Setup Cloudinary (hoặc uploadthing cho đơn giản hơn)
- [ ] API route: `POST /api/upload` — nhận file, upload lên Cloudinary, trả URL
- [ ] Lưu file metadata vào DB: `File` table (name, url, size, uploadedBy, teamId)
- [ ] Dashboard Files section: upload thật, list files thật, click download
- [ ] Giới hạn: max 10MB per file, allowed types: pdf/doc/img/zip

**Checkpoint:** Upload file → lưu Cloudinary → hiển thị trong Dashboard Files.

---

### 2.9 Gemini AI — Archive & Contribution Analysis
- [ ] API route: `POST /api/ai/archive`
- [ ] Thu thập: tasks completed by each member, activity logs, time spent
- [ ] Prompt: phân tích data → tạo contribution report (percentage, skills used, achievements)
- [ ] Lưu `PortfolioEntry` vào DB cho từng member
- [ ] Portfolio Preview đọc từ DB thật
- [ ] Project Summary tính từ data thật (tasks, duration, team size)

**Checkpoint:** Analyze Project → Gemini đọc log thật → Contribution report chính xác → lưu Portfolio.

---

### 2.10 PDF Export & Public Link
- [ ] Cài `@react-pdf/renderer` hoặc dùng `puppeteer` (server-side)
- [ ] API route: `GET /api/portfolio/[userId]/pdf` — generate và trả file PDF
- [ ] PDF template: đúng format CV, đẹp
- [ ] Public link: route `src/app/(public)/p/[slug]/page.tsx` — hiển thị portfolio công khai (không có sidebar, không cần auth)
- [ ] API: `POST /api/portfolio/[userId]/publish` — tạo public slug, lưu DB
- [ ] Public page không yêu cầu auth

**Checkpoint:** Export PDF download được, public link mở được không cần login.

---

### 2.11 Real-time & Notifications (Optional / Last)
- [ ] Polling: `useSWR` với `refreshInterval: 5000` cho Activity Feed
- [ ] Notification model trong DB: unread count trong sidebar
- [ ] In-app notifications: khi có đơn ứng tuyển mới, task được assign, deadline gần
- [ ] (Optional) Upgrade lên WebSocket nếu cần real-time thật sự

**Checkpoint:** Hoạt động của team member A hiển thị trên màn hình member B sau max 5 giây.

---

## Ghi chú compact

Khi compact sau mỗi tính năng, giữ lại thông tin:
1. Tính năng nào đã `[x]` — không cần re-explain
2. File paths quan trọng đã tạo
3. Vấn đề/edge case phát hiện trong quá trình làm
4. Bước tiếp theo (`[-]` đang làm hoặc `[ ]` tiếp theo)
