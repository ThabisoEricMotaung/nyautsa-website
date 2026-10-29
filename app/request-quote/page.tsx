import type { Metadata } from "next";
import { QuoteRequestForm } from "@/components/quote-request-form";
export const metadata: Metadata = { title: "Request a quotation | NYAUTSA SS Trading and Projects", description: "Tell NYAUTSA about your building project, site location and preferred timing." };
export default function RequestQuote() {
  return <main className="min-h-screen bg-[#f7f4ee] text-[#161713]">
    <nav className="mx-auto flex max-w-5xl items-center justify-between border-b border-[#ddd7cb] px-5 py-6 sm:px-8"><a href="/" className="font-serif">NYAUTSA SS Trading and Projects</a><a href="/" className="text-sm underline underline-offset-4">Back to website</a></nav>
    <div className="mx-auto grid max-w-5xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[0.7fr_1fr] lg:py-20">
      <header><p className="text-xs uppercase tracking-[0.2em] text-[#9d4e31]">Let’s start building</p><h1 className="mt-4 font-serif text-4xl leading-tight">Tell us about your project.</h1><p className="mt-6 text-sm leading-7 text-[#65645b]">Share what you have in mind, where the site is and when you would like to start. Photos or plans can help us understand the work.</p><p className="mt-4 text-sm leading-7 text-[#65645b]">We’ll review your enquiry and contact you to discuss the scope and whether a site visit is needed. Submitting this form does not confirm a price or booking.</p><a href="https://wa.me/27684461635" target="_blank" rel="noopener noreferrer" className="mt-8 inline-block border-b border-[#526b38] pb-1 text-sm text-[#334321]">Prefer WhatsApp? Message Mandla ↗</a></header>
      <QuoteRequestForm />
    </div><footer className="border-t border-[#ddd7cb] px-5 py-6 text-center text-xs text-[#6b6a5f]">Built by <a href="https://aiformstudio.co.za/" className="underline underline-offset-4">AiForm Studio</a></footer>
  </main>;
}
