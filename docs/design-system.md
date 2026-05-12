# HakaSynC — Design System

## Style
Modern Soft UI — Minimalist, dashboard, friendly. Đặc trưng: whitespace nhiều, góc bo tròn cao, shadow mềm, mix light/dark cards.

---

## Color Palette (CSS Variables)

```css
--bg:           #F4F0EB;  /* Warm beige — app background */
--card-light:   #FFFFFF;  /* White — cards thông thường */
--card-dark:    #25262B;  /* Dark charcoal — AI cards, Workspace headers, dark CTAs, active sidebar */
--card-muted:   #D1C7BD;  /* Taupe — accent muted card (Workout/Results style) */
--primary:      #FFD034;  /* Vibrant yellow — active states, highlights, charts */
--coral:        #FF6B6B;  /* Coral/red — gradient blurs, progress bars */
--text-primary: #25262B;  /* Dark charcoal — headings on light bg */
--text-muted:   #8B8B8B;  /* Grey — subtitles, inactive */
--text-on-dark: #FFFFFF;  /* White — text on dark cards */
```

---

## Typography
- **Font:** `Poppins` (primary), fallback `Quicksand` — geometric, rounded sans-serif
- **Headings:** font-weight 600–700, high contrast
- **Body/Labels:** font-weight 400–500, thường dùng `--text-muted`

---

## Shapes & Radius
| Element | Border Radius |
|---|---|
| Cards | `24px` – `32px` (dùng `28px` làm mặc định) |
| Buttons / Pills / Searchbar | `99px` (fully rounded) |
| Sidebar container | `99px` pill shape, floating |
| Avatar | `50%` circle |
| Icon buttons | `50%` circle |

---

## Shadows
```css
/* Card lift — dùng cho white cards trên beige bg */
box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);

/* Sidebar / floating elements */
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
```

---

## Specific Visual Effects

### Gradient Mesh Blurs (Dashboard & Archive cards)
Dùng trên Dashboard stat cards và AI Archiving background:
```css
.blob {
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.7;
  position: absolute;
  pointer-events: none;
}
/* Blob vàng: background #FFD034 — đại diện task completed */
/* Blob coral: background #FF6B6B — đại diện member activity */
/* Blob dark: background #25262B — depth layer */
```

### Progress Indicators
- **Semi-circle dashed gauge** (Member progress tổng thể): SVG `stroke-dasharray` + `stroke-dashoffset`
- **Horizontal progress bar** (task per member): `border-radius: 99px`, rounded ends
- **Kanban column count badge**: pill `#FFD034` hiển thị số tasks trong cột

### Icons
- Minimalist rounded line-icons
- Stroke width: `1.5px` – `2px`
- Recommended: Lucide React (outline variant)

---

## Component Patterns

### Sidebar
```
Floating pill container (không full-height)
├── Logo icon (top)
├── Nav icons — circular buttons, active state: bg #25262B + icon #FFD034
└── User avatar (bottom)
```

### Card Types
| Type | BG | Text | Usage |
|---|---|---|---|
| Light | `#FFF` | `#25262B` | Feed cards, member cards, stat cards |
| Dark | `#25262B` | `#FFF` | AI Workspace cards, Archive panels, dark CTAs, landing hero |
| Muted | `#D1C7BD` | `#25262B` | Results/summary cards |
| Accent | `#FFD034` | `#25262B` | Highlighted stats, active badges |

### Status Pills
```css
.pill {
  border-radius: 99px;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
}
/* Looking: bg #FFD034, text #25262B */
/* Open: bg #25262B, text #FFF */
/* Busy: bg #F4F0EB, text #8B8B8B */
```

### Tab Component (Feed & Workspace)
```css
/* Tab bar container */
.tab-bar { background: #FFF; border-radius: 99px; padding: 4px; display: inline-flex; }

/* Inactive tab */
.tab { border-radius: 99px; padding: 8px 20px; color: #8B8B8B; font-weight: 500; }

/* Active tab */
.tab.active { background: #25262B; color: #FFF; }
/* Active tab — AI pages */
.tab.active.ai { background: #FFD034; color: #25262B; }
```

### Kanban Card
```
border-radius: 16px · bg: #FFF · shadow: card-lift
├── Priority badge (pill): High=#FF6B6B, Med=#FFD034, Low=#D1C7BD
├── Title: font-weight 600, #25262B
├── Role tag: small pill, bg #F4F0EB, text #8B8B8B
├── Est. hours: Lucide Clock icon + số, muted
└── Assignee avatar: 24px circle, bottom-right
```

### AI Feature Cards
- Background: dark `#25262B` hoặc gradient tối
- AI badge: pill `#FFD034` với icon Sparkles (Lucide)
- Nội dung: text `#FFF`, muted text `rgba(255,255,255,0.6)`
- Loading state: animated pulse overlay với opacity 0.1 trên bg

---

## Public Pages (Landing & Auth)

### Landing Page
- **Background:** `#F4F0EB` (toàn trang)
- **Hero:** text lớn `#25262B`, subtitle `#8B8B8B`, 2 CTA buttons (pill shape)
  - Primary CTA: bg `#25262B`, text `#FFF`
  - Secondary CTA: border `#25262B`, text `#25262B`, bg transparent
- **How it works steps:** numbered circles bg `#FFD034`, text `#25262B`
- **Feature cards:** white card với shadow card-lift, icon màu `#FF6B6B` hoặc `#FFD034`
- **Bottom CTA banner:** bg `#25262B`, full width, nút `#FFD034`

### Auth Pages (Login / Register)
- **Layout:** full-screen 2 cột
  - **Trái (40%):** bg `#25262B`, logo trắng, tagline `rgba(255,255,255,0.7)`, gradient blur nhẹ
  - **Phải (60%):** bg `#F4F0EB`, form card white với shadow
- **Form inputs:** bg `#FFF`, border `#D1C7BD`, focus border `#25262B`, radius `12px`
- **Submit button:** pill `#25262B`, text `#FFF`, hover bg `#FF6B6B`
- **Link login↔register:** text `#FF6B6B`, underline on hover
