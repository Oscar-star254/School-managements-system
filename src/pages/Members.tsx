import { useState } from 'react'
import { Link } from 'react-router'

export default function Members() {
  const [tab, setTab] = useState<'login' | 'register'>('login')
  const [form, setForm] = useState({ email: '', password: '' })

  return (
    <div className="pt-16 bg-[#FAFAFF] dark:bg-[#0D0920] min-h-screen">
      <section className="hero-gradient py-16 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-accent/20 text-accent border border-accent/30 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">Members Only</span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-white mb-4">Member Area</h1>
          <p className="text-white/70 text-lg">Private schedules, materials, volunteer rosters, and exclusive announcements for registered members.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          {/* Backend note */}
          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-xl p-4 mb-8">
            <p className="text-amber-800 dark:text-amber-300 text-xs font-medium">
              🔌 <strong>Backend required:</strong> Authentication is not implemented in this frontend. Connect to a backend (Node.js/Supabase/Firebase) for real login functionality, session management, and role-based access control.
            </p>
          </div>

          <div className="bg-white dark:bg-[#1A1035] rounded-2xl p-6 shadow-sm">
            {/* Tab toggle */}
            <div className="flex bg-gray-100 dark:bg-white/10 rounded-xl p-1 mb-6">
              {(['login', 'register'] as const).map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${tab === t ? 'bg-white dark:bg-[#0D0920] text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}>
                  {t === 'login' ? 'Sign In' : 'Register'}
                </button>
              ))}
            </div>

            {tab === 'login' ? (
              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Password</label>
                  <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <button type="submit" className="w-full bg-primary text-white font-display font-bold py-3.5 rounded-xl hover:bg-primary-dark transition-colors">
                  Sign In (Demo — not connected)
                </button>
              </form>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  Registration for the member area requires an invitation from a PULSE Youth leader.
                </p>
                <Link to="/contact" className="text-primary dark:text-accent font-semibold text-sm hover:underline">
                  Contact us to request access →
                </Link>
              </div>
            )}
          </div>

          {/* Preview what members would see */}
          <div className="mt-10">
            <h3 className="font-display font-bold text-lg mb-4 dark:text-white text-center">What members can access:</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: '📅', label: 'Private Event Schedules' },
                { icon: '📖', label: 'Study Materials & Notes' },
                { icon: '👥', label: 'Volunteer Rosters' },
                { icon: '📣', label: 'Members-only Announcements' },
                { icon: '🙏', label: 'Team Prayer Requests' },
                { icon: '💬', label: 'Discussion Forums' },
              ].map(item => (
                <div key={item.label} className="bg-white dark:bg-[#1A1035] rounded-xl p-4 flex items-center gap-3 opacity-60">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
