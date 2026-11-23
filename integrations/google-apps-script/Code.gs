/**
 * WePromys Website — endpoint formulir (Ajukan Demo dan Newsletter).
 *
 * Skrip ini terikat (container-bound) pada Google Sheet milik Nora:
 * buka Sheet → Extensions → Apps Script → tempel file ini.
 * Setiap kiriman ditulis sebagai satu baris di tab "Demo" atau "Newsletter",
 * dan permintaan demo mengirim email notifikasi ke NOTIFY_EMAIL.
 *
 * Script Properties (Project Settings → Script Properties):
 *   NOTIFY_EMAIL   email penerima notifikasi demo (wajib), boleh beberapa dipisah koma
 *   ALLOWED_ORIGIN opsional, mis. https://wepromys.vercel.app — kiriman dari halaman lain ditolak
 *
 * Deploy: Deploy → New deployment → Web app → Execute as: Me, Who has access: Anyone.
 * URL yang berakhiran /exec diisi ke env Vercel PUBLIC_DEMO_FORM_ACTION.
 */

const SHEETS = {
  demo: {
    name: 'Demo',
    header: ['Waktu', 'Nama', 'Nama WO', 'Kota', 'Project per tahun', 'Email', 'WhatsApp', 'Minat', 'Catatan', 'Persetujuan', 'Halaman', 'Status follow-up'],
    fields: ['nama', 'wo', 'kota', 'project', 'email', 'wa', 'minat', 'catatan', 'persetujuan', 'halaman'],
    required: ['nama', 'wo', 'kota', 'project', 'email', 'persetujuan'],
  },
  newsletter: {
    name: 'Newsletter',
    header: ['Waktu', 'Email', 'Segmen', 'Persetujuan', 'Halaman'],
    fields: ['email', 'segmen', 'persetujuan', 'halaman'],
    required: ['email'],
  },
};

const MAX_LENGTH = 1000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function doPost(e) {
  const p = (e && e.parameter) || {};

  // Honeypot: kolom tersembunyi yang hanya diisi bot. Balas sukses agar bot tidak mencoba lagi.
  if (p.website) return json_({ ok: true });

  const allowed = PropertiesService.getScriptProperties().getProperty('ALLOWED_ORIGIN');
  if (allowed && p.halaman && p.halaman.indexOf(allowed) !== 0) {
    return json_({ ok: false, error: 'origin' });
  }

  const jenis = p.jenis === 'newsletter' ? 'newsletter' : 'demo';
  const config = SHEETS[jenis];
  const error = validate_(config, p);
  if (error) return json_({ ok: false, error: error });

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return json_({ ok: false, error: 'busy' });
  try {
    const sheet = sheet_(config);
    const row = [new Date()].concat(config.fields.map(function (k) { return clean_(p[k]); }));
    if (jenis === 'demo') row.push('Baru');
    sheet.appendRow(row);
  } finally {
    lock.releaseLock();
  }

  if (jenis === 'demo') notify_(p);
  return json_({ ok: true });
}

/** Cek kesehatan endpoint dari browser: buka URL /exec. */
function doGet() {
  return json_({ ok: true, service: 'wepromys-form' });
}

function validate_(config, p) {
  for (var i = 0; i < config.required.length; i++) {
    if (!String(p[config.required[i]] || '').trim()) return 'required:' + config.required[i];
  }
  if (!EMAIL_PATTERN.test(String(p.email || '').trim())) return 'email';
  return null;
}

/** Potong teks panjang dan cegah formula injection di Sheet (=, +, -, @ di awal). */
function clean_(value) {
  var s = String(value == null ? '' : value).trim().slice(0, MAX_LENGTH);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function sheet_(config) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(config.name);
  if (!sheet) {
    sheet = ss.insertSheet(config.name);
    sheet.appendRow(config.header);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, config.header.length).setFontWeight('bold');
  }
  return sheet;
}

function notify_(p) {
  var to = PropertiesService.getScriptProperties().getProperty('NOTIFY_EMAIL');
  if (!to) return;
  var url = SpreadsheetApp.getActiveSpreadsheet().getUrl();
  var body = [
    'Permintaan demo baru dari website WePromys.',
    '',
    'Nama: ' + clean_(p.nama),
    'Nama WO: ' + clean_(p.wo),
    'Kota: ' + clean_(p.kota),
    'Project per tahun: ' + clean_(p.project),
    'Email: ' + clean_(p.email),
    'WhatsApp: ' + (clean_(p.wa) || '-'),
    'Minat: ' + clean_(p.minat),
    'Catatan: ' + (clean_(p.catatan) || '-'),
    '',
    'Janji di website: dihubungi dalam 2 hari kerja.',
    'Daftar lengkap: ' + url,
  ].join('\n');
  MailApp.sendEmail({
    to: to,
    subject: 'Permintaan demo WePromys: ' + clean_(p.wo),
    body: body,
    replyTo: String(p.email || '').trim(),
  });
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

/** Jalankan sekali dari editor (Run → testSetup) untuk memberi izin dan membuat tab. */
function testSetup() {
  sheet_(SHEETS.demo);
  sheet_(SHEETS.newsletter);
  Logger.log('Tab Demo dan Newsletter siap. NOTIFY_EMAIL: ' +
    PropertiesService.getScriptProperties().getProperty('NOTIFY_EMAIL'));
}
