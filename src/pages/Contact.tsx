import { useState } from 'react'
import { PHONE, EMAIL, ADDRESS, INSTAGRAM, TIKTOK, YOUTUBE, WHATSAPP_NUMBER, GOOGLE_MAPS_URL, MEETING_DAY, MEETING_TIME } from '../data/content'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [newsletter, setNewsletter] = useState({ email: '', wa: '', submitted: false })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // 🔌 BACKEND: Send message via email or notify leaders via WhatsApp
  }

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault()
    setNewsletter({ ...newsletter, submitted: true })
    // 🔌 BACKEND: Add to email list + WhatsApp broadcast list
  }

  return (
    <div className="pt-16 bg-[#FAFAFF] dark:bg-[#0D0920] min-h-screen">
      <section className="hero-gradient py-16 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-accent/20 text-accent border border-accent/30 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">Get in Touch</span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-white mb-4">Contact Us</h1>
          <p className="text-white/70 text-lg">We'd love to hear from you. Reach out however is easiest.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-display font-bold text-2xl mb-6 dark:text-white">Send a Message</h2>
              <div className="bg-white dark:bg-[#1A1035] rounded-2xl p-6 shadow-sm">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="text-5xl mb-3">✅</div>
                    <h3 className="font-display font-bold text-xl mb-2 dark:text-white">Message Sent!</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">We'll get back to you within 24–48 hours. If it's urgent, WhatsApp us.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Name *</label>
                        <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                          className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                        <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                          className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Email *</label>
                      <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                      <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="">Select subject</option>
                        <option>First visit question</option>
                        <option>Event enquiry</option>
                        <option>Small group enquiry</option>
                        <option>Safeguarding concern</option>
                        <option>Leader / ministry enquiry</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Message *</label>
                      <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
                    </div>
                    <input type="text" name="_gotcha" className="hidden" aria-hidden="true" tabIndex={-1} />
                    <button type="submit" className="w-full bg-primary text-white font-display font-bold py-3.5 rounded-xl hover:bg-primary-dark transition-colors">
                      Send Message →
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact info + map */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1A1035] rounded-2xl p-6 shadow-sm">
                <h3 className="font-display font-bold text-lg mb-5 dark:text-white">Contact Details</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <span className="text-2xl">📞</span>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Phone / WhatsApp</p>
                      <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors">{PHONE}</a>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-2xl">✉️</span>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Email</p>
                      <a href={`mailto:${EMAIL}`} className="font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors">{EMAIL}</a>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Address</p>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{ADDRESS}</p>
                      <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="text-xs text-primary dark:text-accent hover:underline">Get directions</a>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-2xl">📅</span>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Meeting Times</p>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{MEETING_DAY} · {MEETING_TIME}</p>
                    </div>
                  </li>
                </ul>
                <div className="flex gap-3 mt-5 pt-5 border-t border-gray-100 dark:border-white/10">
                  <a href={`https://instagram.com/${INSTAGRAM}`} target="_blank" rel="noopener noreferrer"
                    className="flex-1 text-center text-xs font-semibold py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity">
                    Instagram
                  </a>
                  <a href={`https://tiktok.com/@${TIKTOK}`} target="_blank" rel="noopener noreferrer"
                    className="flex-1 text-center text-xs font-semibold py-2 rounded-xl bg-black text-white hover:opacity-90 transition-opacity">
                    TikTok
                  </a>
                  <a href={`https://youtube.com/@${YOUTUBE}`} target="_blank" rel="noopener noreferrer"
                    className="flex-1 text-center text-xs font-semibold py-2 rounded-xl bg-[#FF0000] text-white hover:opacity-90 transition-opacity">
                    YouTube
                  </a>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
                    className="flex-1 text-center text-xs font-semibold py-2 rounded-xl bg-[#25D366] text-white hover:opacity-90 transition-opacity">
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Map embed placeholder */}
              <div className="rounded-2xl overflow-hidden shadow-sm">
                <div className="h-56 photo-placeholder flex flex-col items-center justify-center gap-3">
                  <span className="text-4xl">🗺️</span>
                  <p className="text-white/50 text-sm font-medium text-center">
                    REPLACE WITH GOOGLE MAPS EMBED<br/>
                    <span className="text-xs text-accent/70">Embed iframe from Google Maps</span>
                  </p>
                </div>
                {/*
                REPLACE THE DIV ABOVE WITH:
                <iframe
                  src="https://www.google.com/maps/embed?pb=YOUR_EMBED_URL"
                  width="100%" height="225" style={{border:0}} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Grace Community Church location"
                />
                */}
                <div className="bg-white dark:bg-[#1A1035] px-4 py-3">
                  <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer"
                    className="text-primary dark:text-accent font-semibold text-sm hover:underline">
                    📍 Open in Google Maps →
                  </a>
                </div>
              </div>

              {/* Newsletter signup */}
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white">
                <h3 className="font-display font-bold text-lg mb-2">📬 Stay in the Loop</h3>
                <p className="text-white/70 text-sm mb-4">Get event updates, announcements, and devotionals via email or WhatsApp broadcast.</p>
                {newsletter.submitted ? (
                  <div className="text-center py-2">
                    <p className="text-accent font-bold">✓ You're in! See you around.</p>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletter} className="space-y-3">
                    <input type="email" required value={newsletter.email} onChange={e => setNewsletter({...newsletter, email: e.target.value})}
                      placeholder="Your email address"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                    <input type="tel" value={newsletter.wa} onChange={e => setNewsletter({...newsletter, wa: e.target.value})}
                      placeholder="WhatsApp number (optional)"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                    <button type="submit" className="w-full bg-accent text-black font-display font-bold py-3 rounded-xl hover:bg-accent-dark transition-colors">
                      Subscribe
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
