"use client";
import { useRef, useState, type FormEvent } from "react";
const services = ["New building", "Extension", "Renovation", "Foundations and brickwork", "Roofing", "Paving", "Boundary walls and fencing", "Other / not sure"];
export function QuoteRequestForm() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const started = useRef(Date.now());
  const input = "mt-2 block w-full rounded-sm border border-[#ccc5b8] bg-[#fffdfa] px-3 py-3 text-base text-[#161713] focus:outline-2 focus:outline-[#526b38]";
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    const data = new FormData(event.currentTarget);
    data.set("started", String(started.current));
    if (files.length > 4 || files.some(f => f.size > 3 * 1024 * 1024) || files.reduce((n,f)=>n+f.size,0)>4*1024*1024) { setError("Add up to 4 files, no more than 3 MB each and 4 MB combined."); return; }
    setBusy(true);
    try {
      const response = await fetch("/api/quote-request", { method: "POST", body: data });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Your request could not be sent. Please try again or use WhatsApp.");
      setSent(true);
    } catch(e) { setError(e instanceof Error ? e.message : "Unable to send. Please try again."); }
    finally { setBusy(false); }
  }
  if (sent) return <section role="status" className="self-start border border-[#ddd7cb] bg-[#fffdfa] p-8"><h2 className="font-serif text-2xl">Your request has been sent.</h2><p className="mt-4 text-sm leading-7">Thank you. NYAUTSA will contact you to discuss your project.</p><a href="/" className="mt-6 inline-block underline">Return to the website</a></section>;
  return <form onSubmit={submit} className="space-y-7 border border-[#ddd7cb] bg-[#fffdfa] p-5 sm:p-8" aria-busy={busy}>
    <div hidden aria-hidden="true"><label>Leave blank<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <fieldset disabled={busy} className="space-y-5"><legend className="mb-4 font-serif text-xl">Your details</legend>
      <label className="block text-sm">Full name *<input name="name" required maxLength={100} autoComplete="name" className={input}/></label>
      <label className="block text-sm">Mobile number *<input name="phone" type="tel" required maxLength={30} autoComplete="tel" className={input}/></label>
      <label className="block text-sm">Email address (optional)<input name="email" type="email" maxLength={200} autoComplete="email" className={input}/></label>
    </fieldset>
    <fieldset disabled={busy} className="space-y-5"><legend className="mb-4 font-serif text-xl">The project</legend>
      <label className="block text-sm">What work do you need? *<select name="service" required className={input} defaultValue=""><option value="" disabled>Select work required</option>{services.map(s=><option key={s}>{s}</option>)}</select></label>
      <label className="block text-sm">Site suburb and town *<input name="location" required maxLength={200} className={input}/></label>
      <label className="block text-sm">Preferred start (optional)<select name="timing" defaultValue="Not sure yet" className={input}>{["Not sure yet", "As soon as possible", "Within 1–3 months", "Within 3–6 months", "More than 6 months"].map(s=><option key={s}>{s}</option>)}</select></label>
      <label className="block text-sm">Tell us about the work *<textarea name="details" required minLength={20} maxLength={4000} rows={5} placeholder="Describe the work, approximate size and any requirements." className={input}/></label>
      <label className="block text-sm">Photos or plans (optional)<span className="mt-1 block text-xs leading-5 text-[#65645b]" id="file-help">JPEG, PNG, WebP or PDF. Up to 4 files, 3 MB each, 4 MB combined. Only include files relevant to the project.</span><input name="files" type="file" multiple accept="image/jpeg,image/png,image/webp,application/pdf" aria-describedby="file-help" className={`${input} text-sm`} onChange={e=>setFiles(Array.from(e.target.files || []))}/></label>
      {files.length>0 && <ul className="break-all text-xs text-[#65645b]">{files.map((f,i)=><li key={i}>{f.name} ({(f.size/1024/1024).toFixed(1)} MB)</li>)}</ul>}
      <label className="flex items-start gap-3 text-sm leading-6"><input type="checkbox" name="consent" value="yes" required className="mt-1 h-4 w-4"/><span>I agree that NYAUTSA may use my details and uploaded files to assess and respond to this enquiry. *</span></label>
    </fieldset>
    {error && <p role="alert" className="text-sm text-[#9d3025]">{error}</p>}
    <button disabled={busy} type="submit" className="min-h-12 w-full rounded-sm bg-[#191a16] px-5 py-3 text-sm text-white disabled:opacity-60">{busy ? "Sending request…" : "Send quotation request"}</button>
    <p className="text-xs text-[#65645b]">* Required fields. You can also <a className="underline" href="https://wa.me/27684461635" target="_blank" rel="noopener noreferrer">contact us on WhatsApp</a>.</p>
  </form>;
}
