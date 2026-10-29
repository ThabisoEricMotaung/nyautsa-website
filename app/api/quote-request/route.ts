import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";
const MB = 1024 * 1024;
const services = new Set(["New building", "Extension", "Renovation", "Foundations and brickwork", "Roofing", "Paving", "Boundary walls and fencing", "Other / not sure"]);
function fail(error: string, status = 400) { return NextResponse.json({ error }, { status }); }
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const allowed = new Set(["https://nyautsass.co.za", "https://www.nyautsass.co.za", "https://incredible-cannoli-9f2144.netlify.app"]);
  if (process.env.NODE_ENV !== "production") { allowed.add("http://localhost:3000"); }
  if (!origin || !allowed.has(origin)) return fail("Please submit from the NYAUTSA website.", 403);
  if (!request.headers.get("content-type")?.startsWith("multipart/form-data")) return fail("Invalid request format.");
  if (Number(request.headers.get("content-length") || 0) > 5 * MB) return fail("Files are too large.", 413);
  // Bound the body even when a client omits Content-Length.
  const reader = request.body?.getReader();
  if (!reader) return fail("Empty request.");
  const chunks: Uint8Array[] = []; let size = 0;
  try {
    while (true) { const {done,value} = await reader.read(); if(done) break; size += value.length; if(size>5*MB) { await reader.cancel(); return fail("Files are too large.",413); } chunks.push(value); }
    const data = await new Response(Buffer.concat(chunks), { headers: { "content-type": request.headers.get("content-type")! } }).formData();
    const field = (key: string) => { const v=data.get(key); return typeof v === "string" ? v.trim() : ""; };
    if (field("website")) return fail("Unable to submit this request.");
    const elapsed = Date.now()-Number(field("started"));
    if (!Number.isFinite(elapsed) || elapsed<2000) return fail("Please review your details and try again.");
    const name=field("name"),phone=field("phone"),email=field("email"),service=field("service"),location=field("location"),details=field("details"),timing=field("timing");
    if (!name || name.length>100 || !/^[+()\d\s-]{7,30}$/.test(phone) || phone.replace(/\D/g, "").length < 7 || !services.has(service) || !location || location.length>200 || details.length<20 || details.length>4000 || timing.length>100 || field("consent")!=="yes" || (email && (email.length>200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)))) return fail("Check your name, phone, project details and consent.");
    const files=data.getAll("files").filter((f): f is File=>f instanceof File && f.size>0);
    if(files.length>4 || files.some(f=>f.size>3*MB) || files.reduce((n,f)=>n+f.size,0)>4*MB) return fail("Add up to 4 files, no more than 3 MB each and 4 MB combined.");
    const attachments=[];
    for(const file of files) {
      const bytes=Buffer.from(await file.arrayBuffer());
      const ext=file.name.split(".").pop()?.toLowerCase();
      const valid=(file.type==="image/jpeg" && ["jpg","jpeg"].includes(ext||"") && bytes[0]===255 && bytes[1]===216 && bytes[2]===255) || (file.type==="image/png" && ext==="png" && bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) || (file.type==="image/webp" && ext==="webp" && bytes.toString("ascii",0,4)==="RIFF" && bytes.toString("ascii",8,12)==="WEBP") || (file.type==="application/pdf" && ext==="pdf" && bytes.toString("ascii",0,5)==="%PDF-");
      if(!valid) return fail("Only valid JPEG, PNG, WebP and PDF files are accepted.");
      attachments.push({ filename:file.name.replace(/[^a-zA-Z0-9._-]/g,"_").slice(-100),content:bytes.toString("base64") });
    }
    if(!process.env.RESEND_API_KEY || !process.env.QUOTE_TO_EMAIL || !process.env.QUOTE_FROM_EMAIL) return fail("Online requests are not available yet. Please contact us on WhatsApp.",503);
    const result=await fetch("https://api.resend.com/emails", {method:"POST",signal:AbortSignal.timeout(15000),headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({from:process.env.QUOTE_FROM_EMAIL,to:[process.env.QUOTE_TO_EMAIL],...(email ? {reply_to:email}:{}),subject:"New NYAUTSA quotation enquiry",text:`Name: ${name}\nPhone: ${phone}\nEmail: ${email || "Not provided"}\n\nWork: ${service}\nSite: ${location}\nTiming: ${timing}\n\n${details}\n\nConsent to respond: Yes\nSubmitted: ${new Date().toISOString()}`,attachments})});
    if(!result.ok) return fail("Your request could not be sent. Please try again or contact us on WhatsApp.",502);
    return NextResponse.json({ok:true});
  } catch { return fail("Unable to send your request. Please try again or use WhatsApp.",502); }
}
