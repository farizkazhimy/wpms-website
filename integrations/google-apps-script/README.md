# Endpoint formulir: Google Apps Script

Endpoint untuk form **Ajukan Demo** dan **Newsletter** (tracker no. 4, OD-WEB-03). Data masuk ke Google Sheet milik
Nora, dan setiap permintaan demo mengirim email notifikasi. Gratis dan cukup untuk volume pilot.

> Aktifkan hanya setelah **Kebijakan Privasi final** (tracker no. 33). Sebelum env diisi, form tampil tetapi tidak mengirim.

## Setup (±15 menit, sekali saja)

1. **Buat Google Sheet** di akun Google Nora, misalnya `WePromys — Lead Website`. Batasi akses ke tim yang menangani lead.
2. Di Sheet: **Extensions → Apps Script**. Hapus isi `Code.gs` bawaan, tempel isi [`Code.gs`](Code.gs), simpan.
3. **Project Settings (ikon roda) → Script Properties → Add script property:**
   - `NOTIFY_EMAIL` = email PIC penerima lead demo (tracker no. 11), boleh beberapa dipisah koma.
   - `ALLOWED_ORIGIN` = `https://wepromys.vercel.app` (ganti ke domain final saat launch). Opsional tetapi disarankan.
4. **Jalankan `testSetup` sekali:** pilih fungsi `testSetup` di toolbar → **Run** → izinkan akses (Sheet dan kirim email).
   Tab `Demo` dan `Newsletter` dibuat otomatis.
5. **Deploy → New deployment → Select type: Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Klik **Deploy**, salin **Web app URL** (berakhiran `/exec`).
6. **Uji endpoint** di browser: buka URL `/exec` → harus tampil `{"ok":true,"service":"wepromys-form"}`.
7. **Vercel → Settings → Environment Variables:** `PUBLIC_DEMO_FORM_ACTION` = URL `/exec`, tipe **Config**,
   Production dan Preview. Lalu **Redeploy**.

## Mengubah skrip setelah deploy

Edit `Code.gs` → **Deploy → Manage deployments → ikon pensil → Version: New version → Deploy**. URL tetap sama, jadi
env Vercel tidak perlu diubah.

## Kolom yang tersimpan

| Tab | Kolom |
| --- | --- |
| Demo | Waktu, Nama, Nama WO, Kota, Project per tahun, Email, WhatsApp, Minat, Catatan, Persetujuan, Halaman, Status follow-up |
| Newsletter | Waktu, Email, Segmen, Persetujuan, Halaman |

Kolom **Status follow-up** diisi `Baru`; PIC mengubahnya (mis. `Dihubungi`, `Demo terjadwal`) saat menindaklanjuti.

## Keamanan dan privasi

- **Honeypot:** kolom tersembunyi `website`; kiriman yang mengisinya (bot) diabaikan.
- **Origin:** dengan `ALLOWED_ORIGIN`, kiriman dari halaman lain ditolak.
- **Formula injection:** isian yang diawali `=`, `+`, `-`, `@` disimpan sebagai teks.
- **Batas panjang:** setiap isian dipotong 1.000 karakter.
- Data pribadi disimpan di Google Workspace/Drive Nora. Cantumkan pemrosesan ini di Kebijakan Privasi
  (pengendali data, tujuan, retensi, hak subjek data).

## Batas yang perlu diketahui

- Kuota email `MailApp` akun Google gratis ±100 email/hari; Google Workspace lebih tinggi. Cukup untuk pilot.
- Apps Script tidak cocok untuk volume besar. Bila lead melebihi ratusan per hari, pindah ke layanan form atau CRM.
