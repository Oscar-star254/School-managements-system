import { useState } from 'react'
import { publicPrayers } from '../data/content'

const categoryEmoji: Record<string, string> = {
  health: '🏥', school: '📚', family: '👨‍👩‍👧', faith: '✝️', general: '🙏'
}

export default function Prayer() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', anonymous: false, request: '', category: 'general', shareWall: false })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // 🔌 BACKEND: Send prayer request to prayer team + optionally publish to wall
  }

  return (
    <div className="pt-16 bg-[#FAFAFF] dark:bg-[#0D0920] min-h-screen">
      <section className="hero-gradient py-16 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-accent/20 text-accent border border-accent/30 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">Prayer</span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-white mb-4">Prayer Requests</h1>
          <p className="text-white/70 text-lg">We believe in the power of prayer. Share your request — our prayer team prays together every week.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Form */}
            <div>
              <div className="bg-white dark:bg-[#1A1035] rounded-2xl p-6 shadow-sm">
                <h2 className="font-display font-bold text-xl mb-1 dark:text-white">Submit a Prayer Request</h2>
                <p className="text-gray-400 dark:text-gray-500 text-xs mb-6">Your request goes directly to our dedicated prayer team. You choose what to share publicly.</p>

                {submitted ? (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">🙏</div>
                    <h3 className="font-display font-bold text-xl mb-2 dark:text-white">We're Praying for You</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                      Your request has been received. Our prayer team gathers every week and will lift you up in prayer.
                      <br/><br/>
                      <em>"Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God."</em>
                      <span className="block text-xs mt-1 text-gray-400">— Philippians 4:6</span>
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={form.anonymous} onChange={e => setForm({...form, anonymous: e.target.checked})}
                          className="accent-primary" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Submit anonymously</span>
                      </label>
                    </div>
                    {!form.anonymous && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
                        <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                          className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category</label>
                      <div className="flex flex-wrap gap-2">
                        {['general', 'health', 'school', 'family', 'faith'].map(cat => (
                          <button key={cat} type="button" onClick={() => setForm({...form, category: cat})}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${form.category === cat ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400'}`}>
                            {categoryEmoji[cat]} {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Your Prayer Request *</label>
                      <textarea required rows={5} value={form.request} onChange={e => setForm({...form, request: e.target.value})}
                        placeholder="Share what's on your heart..."
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
                    </div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" checked={form.shareWall} onChange={e => setForm({...form, shareWall: e.target.checked})}
                        className="mt-0.5 accent-primary" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Share this request on the public prayer wall (so the whole community can pray). We will not share your name publicly without your permission.
                      </span>
                    </label>
                    <input type="text" name="_gotcha" className="hidden" aria-hidden="true" tabIndex={-1} />
                    <button type="submit"
                      className="w-full bg-primary text-white font-display font-bold py-3.5 rounded-xl hover:bg-primary-dark transition-colors">
                      🙏 Send Prayer Request
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Prayer Wall */}
            <div>
              <h2 className="font-display font-bold text-xl mb-4 dark:text-white">🕊️ Community Prayer Wall</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">These are requests shared publicly by members who have chosen to invite the whole community to pray with them.</p>
              <div className="space-y-4">
                {publicPrayers.map(prayer => (
                  <div key={prayer.id} className="bg-white dark:bg-[#1A1035] rounded-2xl p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">{categoryEmoji[prayer.category]}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{prayer.request}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-gray-400 dark:text-gray-500">
                            {prayer.name} · {new Date(prayer.date).toLocaleDateString('en-KE', { month:'short', day:'numeric' })}
                          </span>
                          <button className="text-xs text-primary dark:text-accent font-semibold hover:underline">
                            🙏 Praying for this
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-xl p-3 text-center">
                <p className="text-amber-800 dark:text-amber-300 text-xs">
                  🔌 <strong>Backend needed:</strong> Prayer wall should update dynamically from database submissions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
