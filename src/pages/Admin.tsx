import { useState } from 'react'
import { events, blogPosts, testimonies, publicPrayers } from '../data/content'

const sections = [
  { id: 'events', label: 'Events', icon: '📅', count: events.length },
  { id: 'announcements', label: 'Announcements', icon: '📣', count: blogPosts.filter(p => p.category === 'announcement').length },
  { id: 'photos', label: 'Photo Albums', icon: '📸', count: 4 },
  { id: 'testimonies', label: 'Testimonies', icon: '💬', count: testimonies.filter(t => !t.approved).length, badge: 'Pending' },
  { id: 'registrations', label: 'Registrations', icon: '📋', count: 18 },
  { id: 'prayer', label: 'Prayer Requests', icon: '🙏', count: 12 },
]

export default function Admin() {
  const [active, setActive] = useState('events')

  return (
    <div className="pt-16 bg-[#FAFAFF] dark:bg-[#0D0920] min-h-screen">
      {/* Auth banner */}
      <div className="bg-amber-50 dark:bg-amber-900/10 border-b border-amber-200 dark:border-amber-800/30 py-2 px-4 text-center">
        <p className="text-amber-800 dark:text-amber-300 text-xs">
          🔌 <strong>Backend required:</strong> This admin dashboard is a frontend prototype. Connect to your backend for real data management, auth, and admin actions.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-black text-3xl dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-400 dark:text-gray-500 text-sm">PULSE Youth · Non-technical leader portal</p>
          </div>
          <div className="flex items-center gap-2 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-xs font-bold px-3 py-1.5 rounded-lg">
            🔒 Demo Mode
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="bg-white dark:bg-[#1A1035] rounded-2xl p-3 shadow-sm h-fit">
            {sections.map(s => (
              <button key={s.id} onClick={() => setActive(s.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left mb-1 transition-all ${active === s.id ? 'bg-primary text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'}`}>
                <div className="flex items-center gap-3">
                  <span>{s.icon}</span>
                  <span className="font-medium text-sm">{s.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {s.badge && <span className={`text-xs px-1.5 py-0.5 rounded-full ${active === s.id ? 'bg-white/20 text-white' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'}`}>{s.badge}</span>}
                  <span className={`text-xs font-bold ${active === s.id ? 'text-white/70' : 'text-gray-400'}`}>{s.count}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Main panel */}
          <div className="lg:col-span-3">
            {active === 'events' && (
              <div className="bg-white dark:bg-[#1A1035] rounded-2xl shadow-sm">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/10">
                  <h2 className="font-display font-bold text-lg dark:text-white">Events</h2>
                  <button className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-xl">+ New Event</button>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-white/10">
                  {events.map(ev => (
                    <div key={ev.id} className="flex items-center justify-between px-6 py-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{ev.title}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{ev.date} · {ev.type}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-xs text-primary dark:text-accent hover:underline font-medium">Edit</button>
                        <button className="text-xs text-red-500 hover:underline font-medium">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {active === 'testimonies' && (
              <div className="bg-white dark:bg-[#1A1035] rounded-2xl shadow-sm">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-white/10">
                  <h2 className="font-display font-bold text-lg dark:text-white">Testimonies — Pending Approval</h2>
                </div>
                <div className="p-6 text-center text-gray-400 dark:text-gray-600">
                  <p className="text-sm mb-2">🎉 No pending testimonies right now.</p>
                  <p className="text-xs">New submissions appear here for your review and approval before publishing.</p>
                </div>
              </div>
            )}

            {active === 'registrations' && (
              <div className="bg-white dark:bg-[#1A1035] rounded-2xl shadow-sm">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/10">
                  <h2 className="font-display font-bold text-lg dark:text-white">Event Registrations</h2>
                  <button className="bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-xl">📥 Export CSV</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 dark:bg-white/5">
                      <tr>
                        {['Name', 'Event', 'Age Group', 'Phone', 'Date'].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/10">
                      {[
                        { name: 'Amina Wangari', event: 'Lake Naivasha Retreat', age: '19–22', phone: '+254700...', date: '2026-09-29' },
                        { name: 'Kevin Otieno', event: 'Lake Naivasha Retreat', age: '19–22', phone: '+254711...', date: '2026-09-28' },
                        { name: 'Cynthia Mwangi', event: 'Lake Naivasha Retreat', age: '16–18', phone: '+254722...', date: '2026-09-27' },
                      ].map((r, i) => (
                        <tr key={i} className="hover:bg-gray-50 dark:hover:bg-white/5">
                          <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{r.name}</td>
                          <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{r.event}</td>
                          <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{r.age}</td>
                          <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{r.phone}</td>
                          <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{r.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 text-center">
                  <p className="text-xs text-gray-400">🔌 Backend: Load real registrations from your database. Enable CSV export via server-side endpoint.</p>
                </div>
              </div>
            )}

            {active === 'prayer' && (
              <div className="bg-white dark:bg-[#1A1035] rounded-2xl shadow-sm">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-white/10">
                  <h2 className="font-display font-bold text-lg dark:text-white">Prayer Requests (Private)</h2>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-white/10">
                  {publicPrayers.map(p => (
                    <div key={p.id} className="px-6 py-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{p.request}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{p.name} · {p.date} · {p.category}</p>
                        </div>
                        <span className="text-xs bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full font-medium flex-shrink-0">Public</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {['announcements', 'photos'].includes(active) && (
              <div className="bg-white dark:bg-[#1A1035] rounded-2xl p-10 shadow-sm text-center">
                <div className="text-5xl mb-3">{sections.find(s => s.id === active)?.icon}</div>
                <h3 className="font-display font-bold text-xl mb-2 dark:text-white capitalize">{active} Manager</h3>
                <p className="text-gray-400 dark:text-gray-600 text-sm max-w-sm mx-auto">
                  Connect this section to your backend CMS to manage {active}. This panel will then let you create, edit, and delete content without touching code.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
