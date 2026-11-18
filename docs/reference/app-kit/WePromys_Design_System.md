# WPMS Design System — ringkasan untuk developer

Sumber lengkap: artifact "WPMS Design System" v0.2 (https://claude.ai/artifact/JbCt4bsRWSHvAVUStJQ3SV). Nilai token ada di `tokens.json` di folder ini. Arah visual: **elegan-profesional** — hangat dan premium seperti dunia wedding, tetapi padat informasi dan efisien seperti ERP.

## Prinsip

1. **Data dulu, dekorasi kemudian.** Layar internal (Leads, Project, Pembayaran, Guest List) mengutamakan tabel dan status. Nuansa wedding (`display`, `champagne`) hanya di judul Project, hitung mundur hari-H, login, dan Client Portal.
2. **Status selalu bisa dibaca tanpa warna.** Setiap status tampil sebagai badge berisi teks.
3. **Brand bisa diganti.** Nama perusahaan, logo, dan label role tidak boleh di-hardcode (PRD 2.6, FR-IAM-007, FR-IAM-013). Komponen membaca warna dari token.
4. **Scope terlihat jelas.** Jangan tampilkan baris kosong atau angka nol yang menyesatkan; tampilkan empty state yang menjelaskan alasannya.

## Bahasa & format

- UI Bahasa Indonesia, i18n-ready (semua teks dari file terjemahan).
- **Bahasa Inggris** (keputusan PO issue #29) untuk:
  - nama modul: menu, grup menu, judul halaman, dan tab Project (mis. Dashboard, Sales Analytics, Calendar, Overview, Payments, Guests, Documents, Activity);
  - **seluruh label status dan badge penanda**, mis. Active/Inactive, Attending/Not Attending/Unconfirmed, Scheduled, Void, Latest, Shared, Escalated, Delegated from …, Off-Catalog, Internal Vendor, System, National, Regular, Lead Pool, Profile Complete;
  - judul seksi dan label KPI di Dashboard dan ringkasan di atas daftar (mis. Tenant Summary, Open Leads, Payment Summary).
- Tetap Bahasa Indonesia: tombol, form, pesan, deskripsi, petunjuk, kolom tabel, teks panjang, jenis pembayaran (DP/Termin/Pelunasan/Penalti), jenis approval, peran tim (WP utama/Anggota tim), dan alat uji prototype (PRD Coverage). Client Portal: judul dan teks tetap Bahasa Indonesia; hanya label status yang memakai Bahasa Inggris. Dokumen hasil generate (Quotation, Invoice, Kuitansi, Kontrak) tetap Bahasa Indonesia.
- Istilah domain tidak diterjemahkan: Lead, Project, Event, Master Event, Task, Vendor, Quotation, Invoice, WP, Owner.
- Label tombol = kata kerja + objek ("Buat Quotation", "Ajukan Approval"), bukan "OK"/"Submit".
- Tanggal `14 Feb 2027`, jam `19.00 WIB` (timezone tenant). Uang `Rp 185.000.000`; di KPI boleh `Rp 1,24 M`.
- Nama status dalam Bahasa Inggris, mengikuti PRD bila ada (Pending Approval, Overdue, Unconfirmed).
- Nama produk **WePromys**. Tanpa emoji dan tanpa tanda seru di UI internal.

## Warna

- Halaman `surface-page`; konten di card `surface` + border `border` + `radius-lg` + `shadow-sm`.
- Teks utama `ink`; label/metadata `ink-muted` (jangan untuk nominal atau tanggal jatuh tempo).
- `primary` untuk satu aksi utama per area, link, tab aktif, menu aktif; teks di atasnya `on-primary`. Item terpilih: latar `primary-soft`, teks `primary`.
- `champagne` hanya ornamen, bukan teks atau status.
- Status: teks `success|warning|danger|info|neutral` di atas pasangan `-soft`.

### Pemetaan status (wajib konsisten)

| Tone | Lead | Project | Task | Pembayaran | Approval | RSVP / Vendor / Kontrak |
| --- | --- | --- | --- | --- | --- | --- |
| `neutral` | New | Draft, Closed | To Do | Planned | — | Unconfirmed, Inactive, Draft |
| `info` | Contacted, Meeting, Proposal Sent, Negotiation | Active | In Progress | — | — | Sent, Booked |
| `warning` | — | Pending Approval, On Hold | Blocked | Due, Partial | Pending, Returned | — |
| `success` | Deal | Completed | Done | Paid | Approved | Attending, Active, Signed |
| `danger` | Lost | Cancelled | (overdue) | Overdue, Cancelled, Refunded | Rejected | Not Attending, Blacklisted |

Task lewat due date diberi badge kedua "Overdue" (`danger`), status aslinya tetap. Status tenant (Konsol Platform): Active = `success`, Suspended = `warning`, Offboarding = `danger`, Deleted = `neutral`. Status user: Active = `success`, Inactive = `neutral`. Status kesehatan Project: On Track = `success`, At Risk = `warning`, Off Track = `danger`.

## Tipografi

- UI: **Plus Jakarta Sans**. Display: **DM Serif Display** (hanya `display-lg`, `display-md`; satu ketebalan 400 — keputusan PO, menggantikan Fraunces). Mono: **JetBrains Mono** (nomor dokumen). Muat via `next/font/google`.
- Teks isi `body` 14px. Layar internal maksimal `heading-lg`, kecuali nama pasangan di header Project (`display-md`).
- Nominal di tabel: `body-strong`, rata kanan, `tabular-nums`.
- Outfit hanya ada di logo (vektor) — jangan dimuat sebagai font aplikasi.

## Spasi, radius, layout

- Grid 4px. Jarak antar field `space-4`, padding card `space-5`, antar section `space-6`.
- Tombol/input `radius-md`, card/modal `radius-lg`, badge/chip `radius-pill`.
- Desktop: sidebar 248px, topbar 56px, konten maks. 1920px (keputusan PO PR #23: sebelumnya 1440px, menyisakan ruang kosong di monitor ±1920px pada zoom 100%).
- Di bawah 768px: sidebar jadi drawer, tabel jadi daftar kartu, aksi utama jadi tombol penuh di bawah.
- Bayangan: `shadow-sm` card, `shadow-md` dropdown/notifikasi, `shadow-lg` modal.

## Interaksi & state

- Focus: outline 2px `primary-bright`, offset 2px.
- Hover: tombol primary → `primary-hover`; baris tabel → `surface-sunken`.
- Disabled: opacity 0.45 + tooltip alasan ("Hanya Owner yang dapat menghapus").
- Read-only (Client Portal, data milik orang lain): latar `surface-sunken` tanpa border input.
- Aksi berisiko (Cancel Project, Delete, Reject): modal konfirmasi dengan alasan wajib.
- Soft warning (bentrok jadwal, duplikat Lead): Alert `warning`, tidak memblokir.
- Perbandingan versi di approval: nilai lama dicoret `ink-muted`, nilai baru `body-strong`, selisih harga badge `warning`.

## Ikon & logo

- Ikon **Lucide** (outline, stroke 1.75, 16/20px), mengikuti warna teks. Ikon tanpa label wajib tooltip + `aria-label`.
- Logo WePromys di app shell, login (lockup descriptor), email platform. Logo tenant di kiri atas sidebar (tinggi maks. 32px), dokumen generate, dan Client Portal; jika belum ada, tampilkan nama tenant sebagai teks.
- Client Portal & dokumen generate: WePromys hanya "Powered by WePromys" di footer (`caption`, `ink-muted`).

## Komponen dasar

Button, StatusBadge, FormField, DataTable, Tabs, StatCard, Alert, ApprovalCard, Logo. Di artifact Design System tersedia sebagai class CSS (prefix `w-`) dan preview; di prototype dibangun ulang dengan Tailwind + shadcn/ui memakai token di atas.

## Dokumen hasil generate

Gaya terpisah dan netral (RL-109): token `document.*` di `tokens.json`. Lihat `docs/templates/`.
