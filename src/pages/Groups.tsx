import { useState } from 'react'
import { groups, type Group } from '../data/content'

type CategoryFilter = 'all' | Group['category']
type AgeFilter = 'all' | '13-15' | '16-18' | '19-22' | '23-25'

const categoryLabels: Record<Group['category'], { label: string; emoji: string; color: string }> = {
  'bible-study': { label: 'Bible Study', emoji: '📖', color: 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30' },
  worship:       { label: 'Worship', emoji: '🎵', color: 'bg-pink-500/15 text-pink-700 dark:text-pink-300 border-pink-500/30' },
  media:         { label: 'Media & Tech', emoji: '📱', color: 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30' },
  outreach:      { label: 'Outreach', emoji: '🌍', color: 'bg-green-500/15 text-green-700 dark:text-green-300 border-green-500/30' },
  creative:      { label: 'Creative Arts', emoji: '🎨', color: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30' },
  service:       { label: 'Service', emoji: '🤝', color: 'bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-500/30' },
}

function JoinModal({ group, onClose }: { group: Group; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', age: '', experience: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // 🔌 BACKEND: Send join request to database/leader notification
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#1A1035] rounded-2xl p-6 max-w-md w-full shadow-2xl">
        {submitted ? (
          <div className="text-center py-6">
            <div className="text-5xl mb-3">🎉</div>
            <h3 className="font-display font-bold text-xl mb-2 dark:text-white">Request Sent!</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              {group.leader} will be in touch via WhatsApp within 48 hours.
            </p>
            <button onClick={onClose} className="bg-primary text-white px-6 py-2.5 rounded-xl font-semibold text-sm">
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="font-display font-bold text-xl dark:text-white">Join {group.name}</h3>
                <p className="text-sm text-gray-400 dark:text-gray-500">{group.meetingTime}</p>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-xl font-bold">×</button>
            </div>
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
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Relevant experience / Why do you want to join?</label>
                <textarea rows={3} value={form.experience} onChange={e => setForm({...form, experience: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
              </div>
              <input type="text" name="_gotcha" className="hidden" aria-hidden="true" tabIndex={-1} />
              <button type="submit" className="w-full bg-primary text-white font-display font-bold py-3 rounded-xl hover:bg-primary-dark transition-colors">
                Send Join Request
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default function Groups() {
  const [catFilter, setCatFilter] = useState<CategoryFilter>('all')
  const [joiningGroup, setJoiningGroup] = useState<Group | null>(null)

  const filtered = catFilter === 'all' ? groups : groups.filter(g => g.category === catFilter)

  return (
    <div className="pt-16 bg-[#FAFAFF] dark:bg-[#0D0920] min-h-screen">
      {joiningGroup && <JoinModal group={joiningGroup} onClose={() => setJoiningGroup(null)} />}

      <section className="hero-gradient py-16 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-accent/20 text-accent border border-accent/30 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">Find Your Place</span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-white mb-4">Small Groups & Ministries</h1>
          <p className="text-white/70 text-lg">Everyone belongs somewhere. Find your crew, your calling, and your community.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button onClick={() => setCatFilter('all')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${catFilter === 'all' ? 'bg-primary text-white' : 'bg-white dark:bg-[#1A1035] text-gray-600 dark:text-gray-300'}`}>
              All Ministries
            </button>
            {Object.entries(categoryLabels).map(([key, val]) => (
              <button key={key} onClick={() => setCatFilter(key as CategoryFilter)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${catFilter === key ? 'bg-primary text-white' : 'bg-white dark:bg-[#1A1035] text-gray-600 dark:text-gray-300'}`}>
                {val.emoji} {val.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(group => {
              const meta = categoryLabels[group.category]
              return (
                <div key={group.id} className="bg-white dark:bg-[#1A1035] rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 card-glow flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${meta.color}`}>
                      {meta.emoji} {meta.label}
                    </span>
                    {!group.open && (
                      <span className="text-xs bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 px-2.5 py-1 rounded-full font-medium">
                        By audition
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-gray-900 dark:text-white text-xl mb-2">{group.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-1">{group.description}</p>
                  <div className="space-y-1.5 mb-5 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex gap-2"><span>📅</span>{group.meetingTime}</div>
                    <div className="flex gap-2"><span>👤</span>Led by {group.leader}</div>
                    <div className="flex gap-2"><span>🎂</span>Ages {group.ageGroup}</div>
                    <div className="flex gap-2"><span>👥</span>{group.size} members currently</div>
                  </div>
                  <button
                    onClick={() => setJoiningGroup(group)}
                    disabled={!group.open}
                    className={`w-full py-3 rounded-xl font-display font-bold text-sm transition-all ${
                      group.open
                        ? 'bg-primary hover:bg-primary-dark text-white hover:scale-[1.02]'
                        : 'bg-gray-100 dark:bg-white/10 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    {group.open ? '+ Join This Group' : '🔒 Auditions Required'}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F3F0FF] dark:bg-[#0A0718]">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display font-black text-2xl mb-3 dark:text-white">Don't See a Fit?</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            If you have a passion or gift that isn't listed here, talk to us. We love starting new groups and ministries when there's a need.
          </p>
          <a href="mailto:pulse.youth@gracecc.or.ke"
            className="inline-flex items-center gap-2 bg-primary text-white font-display font-bold px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors">
            💬 Talk to a Leader
          </a>
        </div>
      </section>
    </div>
  )
}
