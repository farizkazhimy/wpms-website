// Kirim formulir ke endpoint Google Apps Script (integrations/google-apps-script).
// Dikirim sebagai application/x-www-form-urlencoded: Apps Script membaca e.parameter dari format ini,
// dan sebagai "simple request" tidak memicu preflight CORS.
export type SubmitResult = { ok: true } | { ok: false; error: string };

export async function submitForm(form: HTMLFormElement, endpoint: string): Promise<SubmitResult> {
  const data = new URLSearchParams();
  new FormData(form).forEach((value, key) => {
    if (typeof value === 'string') data.append(key, value);
  });
  data.set('halaman', location.href);
  try {
    const res = await fetch(endpoint, { method: 'POST', body: data });
    if (!res.ok) return { ok: false, error: `http-${res.status}` };
    const json = (await res.json()) as { ok?: boolean; error?: string };
    return json.ok ? { ok: true } : { ok: false, error: json.error ?? 'unknown' };
  } catch {
    return { ok: false, error: 'network' };
  }
}
