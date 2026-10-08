import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { useApp } from '../context/AppContext'
import {
  YOUTH_NAME, CHURCH_NAME, LOCATION, MEETING_DAY, MEETING_TIME, ADDRESS,
  GOOGLE_MAPS_URL, DAILY_VERSE, events, testimonies, blogPosts, translations
} from '../data/content'

function getNextFriday(): Date {
  const now = new Date()
  const d = new Date(now)
  const day = d.getDay()
  const daysUntilFriday = (5 - day + 7) % 7 || 7
  d.setDate(d.getDate() + daysUntilFriday)
  d.setHours(17, 0, 0, 0)
  return d
}

function Countdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 })

  useEffect(() => {
    const tick = () => {
      const target = getNextFriday()
      const diff = Math.max(0, target.getTime() - Date.now())
      const days = Math.floor(diff / 86400000)
      const hours = Math.floor((diff % 86400000) / 3600000)
      const mins = Math.floor((diff % 3600000) / 60000)
      const secs = Math.floor((diff % 60000) / 1000)
      setTime({ days, hours, mins, secs })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const box = (n: number, label: string) => (
    <div className="flex flex-col items-center gap-1">
      <div className="bg-white/15 backdrop-blur-sm rounded-xl w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center border border-white/20">
        <span className="font-display font-black text-2xl sm:text-3xl text-white tabular-nums">
          {String(n).padStart(2, '0')}
        </span>
      </div>
      <span className="text-[10px] sm:text-xs text-white/60 uppercase tracking-widest font-medium">{label}</span>
    </div>
  )

  return (
    <div className="flex gap-3 sm:gap-4 items-end justify-center">
      {box(time.days, 'Days')}
      <span className="text-white/40 text-2xl font-bold mb-6">:</span>
      {box(time.hours, 'Hrs')}
      <span className="text-white/40 text-2xl font-bold mb-6">:</span>
      {box(time.mins, 'Min')}
      <span className="text-white/40 text-2xl font-bold mb-6">:</span>
      {box(time.secs, 'Sec')}
    </div>
  )
}

const eventTypeColor: Record<string, string> = {
  weekly: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  retreat: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  outreach: 'bg-green-500/20 text-green-300 border-green-500/30',
  social: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  worship: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
}

export default function Home() {
  const { lang } = useApp()
  const t = translations[lang]
  const featured = events.filter(e => e.featured).slice(0, 3)
  const announcement = blogPosts.find(p => p.category === 'announcement')
  const featuredTestimony = testimonies.find(t => t.featured)

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="hero-gradient min-h-screen flex flex-col justify-center relative overflow-hidden pt-16">
        {/* Floating geometry */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-primary/20 blur-3xl animate-float" style={{animationDelay:'0s'}} />
          <div className="absolute bottom-20 left-[5%] w-80 h-80 rounded-full bg-accent/10 blur-3xl animate-float" style={{animationDelay:'1.5s'}} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-secondary/10 blur-3xl animate-float" style={{animationDelay:'3s'}} />
          {/* Decorative lines */}
          <svg className="absolute top-0 right-0 opacity-10" width="400" height="400" viewBox="0 0 400 400" fill="none">
            <circle cx="200" cy="200" r="150" stroke="white" strokeWidth="1"/>
            <circle cx="200" cy="200" r="100" stroke="white" strokeWidth="0.5"/>
            <line x1="200" y1="0" x2="200" y2="400" stroke="white" strokeWidth="0.5"/>
            <line x1="0" y1="200" x2="400" y2="200" stroke="white" strokeWidth="0.5"/>
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left space-y-6 animate-fade-up">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-white/80">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                {t.hero.welcome} {YOUTH_NAME}
              </div>
              <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white leading-[0.95] tracking-tight">
                {lang === 'en' ? (
                  <>Faith.<br/><span className="text-accent">Fire.</span><br/>Future.</>
                ) : (
                  <>Imani.<br/><span className="text-accent">Moto.</span><br/>Mustakabali.</>
                )}
              </h1>
              <p className="text-lg text-white/70 max-w-md mx-auto lg:mx-0 leading-relaxed">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  to="/events"
                  className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-black font-display font-bold text-base px-7 py-3.5 rounded-xl transition-all hover:scale-105 shadow-xl shadow-amber-500/30"
                >
                  ✨ {t.hero.joinBtn}
                </Link>
                <Link
                  to="/first-visit"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-display font-semibold text-base px-7 py-3.5 rounded-xl border border-white/20 transition-all hover:scale-105"
                >
                  🗺️ {t.hero.visitBtn}
                </Link>
              </div>
              <p className="text-xs text-white/40 uppercase tracking-widest">{CHURCH_NAME} · {LOCATION}</p>
            </div>

            {/* Photo placeholder */}
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="w-80 h-96 rounded-3xl photo-placeholder overflow-hidden shadow-2xl">
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 gap-3">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </div>
                    <p className="text-white/50 text-xs text-center font-medium">📸 REPLACE WITH<br/>YOUR REAL YOUTH PHOTO<br/><span className="text-accent/70">Hero / Group Shot</span></p>
                  </div>
                </div>
                {/* Accent badges */}
                <div className="absolute -top-4 -right-4 bg-accent text-black font-display font-black text-sm px-4 py-2 rounded-xl rotate-3 shadow-lg">
                  Every Friday 5pm 🔥
                </div>
                <div className="absolute -bottom-4 -left-4 bg-primary text-white font-display font-bold text-xs px-4 py-2 rounded-xl -rotate-2 shadow-lg">
                  📍 {LOCATION}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/30 text-xs uppercase tracking-widest">Scroll</span>
          <svg className="w-5 h-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Countdown Banner ──────────────────────────────────────────── */}
      <section className="bg-primary py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4">
            <p className="text-white/80 font-medium text-sm uppercase tracking-widest">⏰ Next Youth Service in</p>
            <Countdown />
            <p className="text-white/60 text-sm">{MEETING_DAY} · {MEETING_TIME} · {ADDRESS}</p>
            <Link
              to="/first-visit"
              className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:underline"
            >
              First time? Here's what to expect →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Meeting Info ─────────────────────────────────────────────── */}
      <section className="py-16 bg-white dark:bg-[#0D0920]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-center mb-10 dark:text-white">
            {t.meetingInfo.heading}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { icon: '📅', label: 'When', value: t.meetingInfo.day, sub: t.meetingInfo.time },
              { icon: '📍', label: 'Where', value: 'Grace Community Church', sub: LOCATION },
              { icon: '🗺️', label: 'Directions', value: t.meetingInfo.mapLink, sub: 'Open in Google Maps', link: GOOGLE_MAPS_URL },
            ].map(item => (
              <div key={item.label} className="bg-[#F3F0FF] dark:bg-[#1A1035] rounded-2xl p-6 text-center card-glow">
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1 font-medium">{item.label}</div>
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer"
                    className="font-display font-bold text-primary dark:text-accent hover:underline block">
                    {item.value}
                  </a>
                ) : (
                  <div className="font-display font-bold text-gray-900 dark:text-white">{item.value}</div>
                )}
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upcoming Events ──────────────────────────────────────────── */}
      <section className="py-16 bg-[#F3F0FF] dark:bg-[#0A0718]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-display font-black text-3xl sm:text-4xl dark:text-white">
              {t.events.heading}
            </h2>
            <Link to="/events" className="text-primary dark:text-accent font-semibold text-sm hover:underline">
              {t.events.viewAll} →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(event => (
              <div key={event.id} className="bg-white dark:bg-[#1A1035] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 card-glow">
                <div className="h-40 photo-placeholder">
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
                    <span className="text-3xl">{event.type === 'retreat' ? '⛺' : event.type === 'worship' ? '🎵' : event.type === 'outreach' ? '🌍' : '🎉'}</span>
                    <p className="text-white/40 text-xs text-center">📸 REPLACE WITH EVENT PHOTO</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${eventTypeColor[event.type]}`}>
                      {event.type}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                      {new Date(event.date).toLocaleDateString('en-KE', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-gray-900 dark:text-white text-lg leading-tight mb-1">
                    {lang === 'en' ? event.title : event.titleSw}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{event.description}</p>
                  <div className="flex gap-2">
                    <Link
                      to={`/events/${event.id}`}
                      className="flex-1 text-center bg-primary hover:bg-primary-dark text-white font-semibold text-sm py-2 rounded-xl transition-colors"
                    >
                      {t.events.rsvp}
                    </Link>
                    <span className="flex items-center text-xs text-gray-400 dark:text-gray-500 font-medium px-2">
                      {event.cost === 'Free' ? t.events.free : event.cost}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Announcement + Testimony ─────────────────────────────────── */}
      <section className="py-16 bg-white dark:bg-[#0D0920]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8">
          {/* Latest Announcement */}
          {announcement && (
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 blur-2xl" />
              <div className="relative z-10">
                <span className="text-xs font-bold uppercase tracking-widest text-white/60 mb-3 block">📣 Latest Announcement</span>
                <h3 className="font-display font-black text-2xl mb-3 leading-tight">{announcement.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-5">{announcement.summary}</p>
                <Link to={`/blog/${announcement.id}`}
                  className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors">
                  Read More →
                </Link>
              </div>
            </div>
          )}

          {/* Featured Testimony */}
          {featuredTestimony && (
            <div className="bg-[#F3F0FF] dark:bg-[#1A1035] rounded-3xl p-8 relative overflow-hidden">
              <div className="text-6xl opacity-10 absolute top-4 right-6 font-display font-black leading-none">"</div>
              <div className="relative z-10">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3 block">💬 Featured Story</span>
                <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed italic mb-5 line-clamp-4">
                  "{featuredTestimony.story}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-display font-bold text-gray-900 dark:text-white">{featuredTestimony.name}</div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">Age {featuredTestimony.ageGroup} · {featuredTestimony.title}</div>
                  </div>
                  <Link to="/testimonies" className="text-primary dark:text-accent font-semibold text-sm hover:underline">
                    More stories →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Daily Verse ──────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0D0920]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-accent text-xs font-bold uppercase tracking-widest mb-4">📖 Daily Verse</p>
          <blockquote className="font-display font-bold text-2xl sm:text-3xl text-white leading-relaxed mb-4">
            "{DAILY_VERSE.text}"
          </blockquote>
          <cite className="text-white/50 text-sm not-italic">{DAILY_VERSE.reference}</cite>
        </div>
      </section>

      {/* ── Social Media ─────────────────────────────────────────────── */}
      <section className="py-16 bg-white dark:bg-[#0D0920]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-center mb-4 dark:text-white">
            Follow the Journey
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-10 text-sm">Stay connected with us on social media</p>

          {/* Placeholder social feed */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {Array.from({length: 6}).map((_, i) => (
              <div key={i} className="aspect-square rounded-2xl photo-placeholder">
                <div className="w-full h-full flex flex-col items-center justify-center gap-1 p-2">
                  <span className="text-lg">{i % 2 === 0 ? '📸' : '🎬'}</span>
                  <p className="text-white/30 text-[9px] text-center">REPLACE WITH<br/>INSTAGRAM FEED</p>
                </div>
              </div>
            ))}
          </div>

          {/* Backend note */}
          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-xl p-4 text-center max-w-xl mx-auto">
            <p className="text-amber-800 dark:text-amber-300 text-xs font-medium">
              🔌 <strong>Backend needed:</strong> Connect your Instagram/TikTok/YouTube API here to display a live social feed.
            </p>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            {[
              { icon: '📸', label: '@pulseyouth_nakuru', href: '#', color: 'hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500' },
              { icon: '🎬', label: '@pulseyouth', href: '#', color: 'hover:bg-black' },
              { icon: '▶️', label: 'PULSE Youth Nakuru', href: '#', color: 'hover:bg-red-600' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className={`flex items-center gap-2 bg-gray-100 dark:bg-[#1A1035] ${s.color} hover:text-white text-gray-700 dark:text-gray-200 px-4 py-2 rounded-xl text-sm font-medium transition-all`}>
                {s.icon} {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <section className="py-20 hero-gradient">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white mb-4">
            Ready to <span className="text-accent">belong</span>?
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            You don't need to have it all together. Come as you are — we've been expecting you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/first-visit"
              className="bg-accent hover:bg-accent-dark text-black font-display font-bold px-8 py-4 rounded-xl text-base transition-all hover:scale-105 shadow-xl shadow-amber-500/30">
              Plan Your First Visit
            </Link>
            <Link to="/events"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-display font-semibold px-8 py-4 rounded-xl text-base transition-all">
              See All Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
