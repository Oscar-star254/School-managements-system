import { useState } from 'react'
import { testimonies } from '../data/content'

export default function Testimonies() {
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', nameOption: 'first-only', title: '', story: '', age: '', consent: false })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // 🔌 BACKEND: Submit testimony for approval before publishing
  }

  return (
    <div className="pt-16 bg-[#FAFAFF] dark:bg-[#0D0920] min-h-screen">
      <section className="hero-gradient py-16 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-accent/20 text-accent border border-accent/30 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">Real Stories</span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-white mb-4">Testimonies</h1>
          <p className="text-white/70 text-lg">God is at work in the lives of our young people. These are their stories.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {testimonies.filter(t => t.approved).map(testimony => (
              <div key={testimony.id} className="bg-white dark:bg-[#1A1035] rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all relative overflow-hidden">
                <div className="text-8xl opacity-5 absolute -top-2 -right-2 font-display font-black leading-none select-none">"</div>
                <div className="relative z-10">
                  {testimony.featured && (
                    <span className="text-xs font-bold bg-accent/20 text-accent-dark border border-accent/30 px-2.5 py-1 rounded-full mb-4 inline-block">⭐ Featured Story</span>
                  )}
                  <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-3">{testimony.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base italic mb-5">
                    "{testimony.story}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-white/10">
                    <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-accent font-display font-black">
                      {testimony.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-display font-bold text-gray-900 dark:text-white text-sm">{testimony.name}</div>
                      <div className="text-xs text-gray-400 dark:text-gray-500">Age {testimony.ageGroup} · {new Date(testimony.date).toLocaleDateString('en-KE', { month:'long', year:'numeric' })}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Share Your Story CTA */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-8 text-white text-center mb-8">
              <h2 className="font-display font-black text-2xl mb-3">Has God moved in your life?</h2>
              <p className="text-white/80 text-sm mb-6 max-w-md mx-auto">
                Your story could be exactly what someone else needs to hear. Share it with our community — you control how much detail to share.
              </p>
              <button onClick={() => setShowForm(true)}
                className="bg-accent hover:bg-accent-dark text-black font-display font-bold px-8 py-3.5 rounded-xl transition-all hover:scale-105">
                Share Your Story 📖
              </button>
            </div>

            {showForm && (
              <div className="bg-white dark:bg-[#1A1035] rounded-2xl p-6 shadow-sm">
                <h3 className="font-display font-bold text-xl mb-2 dark:text-white">Share Your Testimony</h3>
                <p className="text-gray-400 dark:text-gray-500 text-xs mb-6">
                  Stories are reviewed by a leader before being published. We will only publish with your permission.
                </p>

                {submitted ? (
                  <div className="text-center py-8">
                    <div className="text-5xl mb-3">🙏</div>
                    <h4 className="font-display font-bold text-xl mb-2 dark:text-white">Thank you for sharing!</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">A leader will review your story and reach out within 7 days before publishing anything.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">How would you like to be credited?</label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { value: 'first-only', label: 'First name only (e.g. "Amina")' },
                          { value: 'initials', label: 'Initials (e.g. "A.W.")' },
                          { value: 'anonymous', label: 'Anonymous' },
                          { value: 'full', label: 'Full name' },
                        ].map(opt => (
                          <label key={opt.value} className={`flex items-center gap-2 px-3 py-2 rounded-xl border cursor-pointer transition-all text-sm ${form.nameOption === opt.value ? 'border-primary bg-primary/5 text-primary dark:text-accent' : 'border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400'}`}>
                            <input type="radio" name="nameOption" value={opt.value} checked={form.nameOption === opt.value}
                              onChange={e => setForm({...form, nameOption: e.target.value})} className="sr-only" />
                            {opt.label}
                          </label>
                        ))}
                      </div>
                    </div>
                    {form.nameOption !== 'anonymous' && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Your Name *</label>
                        <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                          className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Your Age *</label>
                      <input type="number" min={13} max={30} required value={form.age} onChange={e => setForm({...form, age: e.target.value})}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">A Title for Your Story *</label>
                      <input type="text" required value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Your Story * <span className="font-normal text-gray-400">(Share as much or as little as you're comfortable with)</span></label>
                      <textarea rows={6} required value={form.story} onChange={e => setForm({...form, story: e.target.value})}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
                    </div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" required checked={form.consent} onChange={e => setForm({...form, consent: e.target.checked})}
                        className="mt-0.5 accent-primary" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        I give permission for my story to be reviewed by a PULSE Youth leader, and for it to be published on this website (if I consent at review stage). I understand my story will not be published without final approval.
                      </span>
                    </label>
                    <input type="text" name="_gotcha" className="hidden" aria-hidden="true" tabIndex={-1} />
                    <button type="submit"
                      className="w-full bg-primary text-white font-display font-bold py-3.5 rounded-xl hover:bg-primary-dark transition-colors">
                      Submit for Review
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
