import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { events, type Event, leaders } from '../data/content'

type Filter = 'all' | Event['type']
type View = 'list' | 'calendar'

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  weekly:  { bg: 'bg-purple-500/15', text: 'text-purple-700 dark:text-purple-300', border: 'border-purple-500/30' },
  retreat: { bg: 'bg-amber-500/15', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-500/30' },
  outreach:{ bg: 'bg-green-500/15', text: 'text-green-700 dark:text-green-300', border: 'border-green-500/30' },
  social:  { bg: 'bg-blue-500/15', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-500/30' },
  worship: { bg: 'bg-pink-500/15', text: 'text-pink-700 dark:text-pink-300', border: 'border-pink-500/30' },
}

const typeEmoji: Record<string, string> = {
  weekly: '🙏', retreat: '⛺', outreach: '🌍', social: '🎉', worship: '🎵'
}

function EventCard({ event }: { event: Event }) {
  const colors = typeColors[event.type]
  const googleCal = () => {
    const start = event.date.replace(/-/g, '')
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${start}/${start}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`
    window.open(url, '_blank')
  }

  return (
    <div className="bg-white dark:bg-[#1A1035] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col">
      <div className="h-48 photo-placeholder flex flex-col items-center justify-center gap-2 p-4">
        <span className="text-5xl">{typeEmoji[event.type]}</span>
        <p className="text-white/30 text-xs text-center">📸 REPLACE WITH REAL EVENT PHOTO</p>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
            {typeEmoji[event.type]} {event.type}
          </span>
          <span className="text-xs font-mono text-gray-400 dark:text-gray-500">
            {new Date(event.date).toLocaleDateString('en-KE', { weekday:'short', month:'short', day:'numeric' })}
          </span>
        </div>
        <h3 className="font-display font-bold text-gray-900 dark:text-white text-xl leading-tight mb-1">{event.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 leading-relaxed flex-1">{event.description}</p>

        <div className="space-y-1.5 mb-4 text-sm">
          <div className="flex gap-2 text-gray-500 dark:text-gray-400"><span>⏰</span>{event.time}</div>
          <div className="flex gap-2 text-gray-500 dark:text-gray-400"><span>📍</span>{event.location}</div>
          <div className="flex gap-2 text-gray-500 dark:text-gray-400">
            <span>💰</span>
            <span className={event.cost === 'Free' ? 'text-green-600 dark:text-green-400 font-semibold' : ''}>{event.cost}</span>
          </div>
          <div className="flex gap-2 text-gray-500 dark:text-gray-400"><span>👤</span>{event.leader}</div>
        </div>

        <div className="flex gap-2">
          <Link
            to={`/events/${event.id}`}
            className="flex-1 text-center bg-primary hover:bg-primary-dark text-white font-display font-semibold text-sm py-2.5 rounded-xl transition-colors"
          >
            RSVP
          </Link>
          <button
            onClick={googleCal}
            className="px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 text-gray-600 dark:text-gray-300 text-xs font-medium transition-colors"
            title="Add to Google Calendar"
          >
            📅
          </button>
          <a
            href={`tel:${event.leaderPhone}`}
            className="px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 text-gray-600 dark:text-gray-300 text-xs font-medium transition-colors"
            title="Call leader"
          >
            📞
          </a>
        </div>
      </div>
    </div>
  )
}

export function EventDetail() {
  const { id } = useParams()
  const event = events.find(e => e.id === id)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', age: '', phone: '', guardian: '', allergies: '', notes: '' })

  if (!event) return (
    <div className="pt-24 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h2 className="font-display font-bold text-2xl mb-2">Event not found</h2>
        <Link to="/events" className="text-primary dark:text-accent hover:underline">← Back to events</Link>
      </div>
    </div>
  )

  const colors = typeColors[event.type]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // 🔌 BACKEND: POST form data to your registration API/database here
  }

  return (
    <div className="pt-16 bg-[#FAFAFF] dark:bg-[#0D0920] min-h-screen">
      <div className="hero-gradient py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link to="/events" className="text-white/60 hover:text-white text-sm flex items-center gap-1 mb-6 transition-colors">
            ← Back to Events
          </Link>
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${colors.bg} ${colors.text} ${colors.border} mb-4 inline-block`}>
            {typeEmoji[event.type]} {event.type}
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white mb-4">{event.title}</h1>
          <div className="flex flex-wrap gap-4 text-white/70 text-sm">
            <span>📅 {new Date(event.date).toLocaleDateString('en-KE', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}</span>
            <span>⏰ {event.time}</span>
            <span>📍 {event.location}</span>
            <span className={event.cost === 'Free' ? 'text-green-400 font-semibold' : ''}>💰 {event.cost}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <div className="aspect-video rounded-2xl photo-placeholder mb-6 flex flex-col items-center justify-center gap-3">
              <span className="text-5xl">{typeEmoji[event.type]}</span>
              <p className="text-white/40 text-xs">📸 REPLACE WITH EVENT PHOTO</p>
            </div>
            <h2 className="font-display font-bold text-xl mb-3 dark:text-white">About This Event</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{event.description}</p>
            <div className="bg-[#F3F0FF] dark:bg-[#1A1035] rounded-2xl p-5 space-y-3">
              <h3 className="font-display font-semibold dark:text-white">Event Leader</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full photo-placeholder flex items-center justify-center">
                  <span className="text-white/40">👤</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{event.leader}</p>
                  <a href={`tel:${event.leaderPhone}`} className="text-primary dark:text-accent text-sm hover:underline">{event.leaderPhone}</a>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary dark:text-accent font-medium text-sm hover:underline">
                🗺️ View location on Google Maps
              </a>
            </div>
          </div>

          {/* RSVP Form */}
          <div>
            <div className="bg-white dark:bg-[#1A1035] rounded-2xl p-6 shadow-sm">
              <h2 className="font-display font-bold text-xl mb-1 dark:text-white">RSVP for this Event</h2>
              <p className="text-gray-400 dark:text-gray-500 text-sm mb-6">
                🔌 <em>Backend needed: Connect this form to your database.</em>
              </p>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="font-display font-bold text-xl mb-2 dark:text-white">You're Registered!</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                    We'll send a confirmation to your WhatsApp. See you there!
                  </p>
                  <Link to="/events" className="text-primary dark:text-accent hover:underline text-sm">
                    ← Back to Events
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
                    <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Age Group *</label>
                      <select required value={form.age} onChange={e => setForm({...form, age: e.target.value})}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="">Select</option>
                        <option>13–15</option><option>16–18</option><option>19–22</option><option>23–25</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Phone (WhatsApp) *</label>
                      <input type="tel" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Guardian Contact <span className="text-gray-400 font-normal">(required if under 18)</span>
                    </label>
                    <input type="tel" value={form.guardian} onChange={e => setForm({...form, guardian: e.target.value})}
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Allergies / Medical Notes</label>
                    <textarea rows={2} value={form.allergies} onChange={e => setForm({...form, allergies: e.target.value})}
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
                  </div>

                  {event.cost !== 'Free' && (
                    <div className="bg-[#F3F0FF] dark:bg-white/5 rounded-xl p-4">
                      <p className="font-display font-semibold text-gray-900 dark:text-white text-sm mb-2">💰 Payment: {event.cost}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Pay via M-Pesa to Paybill <strong>123456</strong>, Account: <strong>PULSEYOUTH</strong></p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">🔌 <em>M-Pesa STK push can be wired to your backend here.</em></p>
                    </div>
                  )}

                  {/* Honeypot spam protection */}
                  <input type="text" name="_gotcha" className="hidden" aria-hidden="true" tabIndex={-1} />

                  <button type="submit"
                    className="w-full bg-primary hover:bg-primary-dark text-white font-display font-bold py-3.5 rounded-xl transition-colors">
                    Confirm RSVP 🎉
                  </button>
                  <p className="text-xs text-center text-gray-400 dark:text-gray-600">
                    You'll receive a WhatsApp confirmation. Guardian consent required for under 18s.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Events() {
  const [filter, setFilter] = useState<Filter>('all')
  const [view, setView] = useState<View>('list')
  const filters: { label: string; value: Filter; emoji: string }[] = [
    { label: 'All', value: 'all', emoji: '📋' },
    { label: 'Weekly', value: 'weekly', emoji: '🙏' },
    { label: 'Retreat', value: 'retreat', emoji: '⛺' },
    { label: 'Outreach', value: 'outreach', emoji: '🌍' },
    { label: 'Social', value: 'social', emoji: '🎉' },
    { label: 'Worship', value: 'worship', emoji: '🎵' },
  ]
  const filtered = filter === 'all' ? events : events.filter(e => e.type === filter)

  return (
    <div className="pt-16 bg-[#FAFAFF] dark:bg-[#0D0920] min-h-screen">
      <section className="hero-gradient py-16 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-accent/20 text-accent border border-accent/30 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">What's On</span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-white mb-4">Events Calendar</h1>
          <p className="text-white/70 text-lg">Weekly services, retreats, outreaches, game nights, and more.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {filters.map(f => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    filter === f.value ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white dark:bg-[#1A1035] text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-white/10'
                  }`}
                >
                  {f.emoji} {f.label}
                </button>
              ))}
            </div>
            <div className="flex gap-1 bg-white dark:bg-[#1A1035] rounded-xl p-1 shadow-sm">
              {(['list', 'calendar'] as View[]).map(v => (
                <button key={v} onClick={() => setView(v)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === v ? 'bg-primary text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                  {v === 'list' ? '≡ List' : '📅 Calendar'}
                </button>
              ))}
            </div>
          </div>

          {view === 'list' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(event => <EventCard key={event.id} event={event} />)}
            </div>
          ) : (
            <div className="bg-white dark:bg-[#1A1035] rounded-2xl p-6 shadow-sm">
              <h3 className="font-display font-bold text-xl mb-6 dark:text-white">October 2026</h3>
              <div className="space-y-3">
                {filtered.map(event => {
                  const colors = typeColors[event.type]
                  return (
                    <div key={event.id} className={`flex items-center gap-4 p-4 rounded-xl ${colors.bg} border ${colors.border}`}>
                      <div className="text-center w-12 flex-shrink-0">
                        <div className="font-display font-black text-2xl dark:text-white">
                          {new Date(event.date).getDate()}
                        </div>
                        <div className="text-xs text-gray-400 uppercase">
                          {new Date(event.date).toLocaleDateString('en-KE', { month: 'short' })}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-display font-bold ${colors.text} truncate`}>{event.title}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{event.time} · {event.location}</p>
                      </div>
                      <Link to={`/events/${event.id}`}
                        className="text-xs font-semibold text-primary dark:text-accent hover:underline flex-shrink-0">
                        RSVP →
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-gray-400 dark:text-gray-600">No events found for this filter.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
