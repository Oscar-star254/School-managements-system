import { useState } from 'react'
import { serveRoles } from '../data/content'

export default function Serve() {
  const [selected, setSelected] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', age: '', experience: '', availability: '' })

  const toggle = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // 🔌 BACKEND: Send volunteer sign-up to relevant team leaders
  }

  return (
    <div className="pt-16 bg-[#FAFAFF] dark:bg-[#0D0920] min-h-screen">
      <section className="hero-gradient py-16 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-accent/20 text-accent border border-accent/30 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">Get Involved</span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-white mb-4">Serve & Volunteer</h1>
          <p className="text-white/70 text-lg">Your gifts matter. There's a place for you in this ministry.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display font-black text-3xl mb-3 dark:text-white">Ways to Serve</h2>
            <p className="text-gray-500 dark:text-gray-400">Select all the areas you're interested in, then fill in the form below.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {serveRoles.map(role => (
              <button key={role.id} onClick={() => toggle(role.id)}
                className={`flex flex-col items-center text-center p-5 rounded-2xl border-2 transition-all ${
                  selected.includes(role.id)
                    ? 'border-primary bg-primary/10 dark:bg-primary/20'
                    : 'border-gray-200 dark:border-white/10 bg-white dark:bg-[#1A1035] hover:border-primary/50'
                }`}>
                <span className="text-3xl mb-2">{role.icon}</span>
                <h3 className={`font-display font-bold text-sm ${selected.includes(role.id) ? 'text-primary dark:text-accent' : 'text-gray-900 dark:text-white'}`}>{role.label}</h3>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 leading-snug">{role.desc}</p>
                {selected.includes(role.id) && (
                  <span className="mt-2 text-xs font-bold text-primary dark:text-accent">✓ Selected</span>
                )}
              </button>
            ))}
          </div>

          {/* Sign-up form */}
          <div className="max-w-xl mx-auto bg-white dark:bg-[#1A1035] rounded-2xl p-6 shadow-sm">
            <h3 className="font-display font-bold text-xl mb-1 dark:text-white">Volunteer Sign-Up</h3>
            <p className="text-gray-400 dark:text-gray-500 text-sm mb-6">
              {selected.length > 0
                ? `Selected: ${selected.map(s => serveRoles.find(r => r.id === s)?.label).join(', ')}`
                : 'Select roles above, then fill in your details.'}
            </p>

            {submitted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-3">🙌</div>
                <h3 className="font-display font-bold text-xl mb-2 dark:text-white">Welcome to the Team!</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">The relevant ministry leaders will reach out to you within a week. We're excited to have you!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
                  <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Phone *</label>
                    <input type="tel" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Age *</label>
                    <select required value={form.age} onChange={e => setForm({...form, age: e.target.value})}
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="">Select</option>
                      <option>13–15</option><option>16–18</option><option>19–22</option><option>23–25</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Availability</label>
                  <input type="text" value={form.availability} onChange={e => setForm({...form, availability: e.target.value})}
                    placeholder="e.g., Available Fridays and Sundays"
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Relevant Skills / Experience</label>
                  <textarea rows={3} value={form.experience} onChange={e => setForm({...form, experience: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
                </div>
                <input type="text" name="_gotcha" className="hidden" aria-hidden="true" tabIndex={-1} />
                <button type="submit" disabled={selected.length === 0}
                  className={`w-full font-display font-bold py-3.5 rounded-xl transition-colors ${
                    selected.length > 0 ? 'bg-primary hover:bg-primary-dark text-white' : 'bg-gray-200 dark:bg-white/10 text-gray-400 cursor-not-allowed'
                  }`}>
                  {selected.length === 0 ? 'Select at least one role above' : '🙌 Sign Up to Serve'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
