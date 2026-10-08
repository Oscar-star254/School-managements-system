import { useState } from 'react'
import { sermons, type Sermon, DAILY_VERSE } from '../data/content'

const topicColors: Record<string, string> = {
  identity: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
  purpose: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  faith: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  school: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  stress: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
  friendships: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300',
  community: 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300',
  'social-media': 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300',
  'mental-health': 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300',
  doubt: 'bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300',
  calling: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
  gifts: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
  questions: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',
}

function SermonCard({ sermon }: { sermon: Sermon }) {
  const formatIcon = sermon.format === 'video' ? '▶️' : sermon.format === 'audio' ? '🎧' : '📝'

  return (
    <div className="bg-white dark:bg-[#1A1035] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col">
      {sermon.format === 'video' && sermon.youtubeId ? (
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${sermon.youtubeId}`}
            title={sermon.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="h-40 photo-placeholder flex flex-col items-center justify-center gap-2">
          <span className="text-5xl">{formatIcon}</span>
          <p className="text-white/40 text-xs text-center">📸 REPLACE WITH SERMON THUMBNAIL</p>
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">{sermon.series}</span>
          <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">{sermon.duration}</span>
        </div>
        <h3 className="font-display font-bold text-gray-900 dark:text-white text-lg leading-tight mb-2 flex-1">{sermon.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{sermon.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {sermon.topic.map(t => (
            <span key={t} className={`text-xs px-2 py-0.5 rounded-full font-medium ${topicColors[t] || 'bg-gray-100 dark:bg-white/10 text-gray-500'}`}>
              #{t}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between gap-2 mt-auto">
          <div className="text-xs text-gray-400 dark:text-gray-500">
            <span className="font-medium text-gray-600 dark:text-gray-300">{sermon.speaker}</span>
            <span className="mx-1">·</span>
            {new Date(sermon.date).toLocaleDateString('en-KE', { month:'short', day:'numeric', year:'numeric' })}
          </div>
          <div className="flex gap-2">
            {sermon.format === 'audio' && sermon.audioUrl && (
              <a href={sermon.audioUrl} className="text-xs bg-primary/10 dark:bg-primary/20 text-primary dark:text-accent px-3 py-1.5 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors">
                🎧 Listen
              </a>
            )}
            {sermon.notesUrl && (
              <a href={sermon.notesUrl} className="text-xs bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-white/20 transition-colors">
                📥 Notes
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const allTopics = ['identity', 'purpose', 'faith', 'school', 'stress', 'friendships', 'social-media', 'mental-health', 'doubt', 'calling']
const allFormats: Sermon['format'][] = ['video', 'audio', 'written']

export default function Sermons() {
  const [search, setSearch] = useState('')
  const [topicFilter, setTopicFilter] = useState<string[]>([])
  const [formatFilter, setFormatFilter] = useState<string[]>([])

  const filtered = sermons.filter(s => {
    const matchSearch = !search || s.title.toLowerCase().includes(search.toLowerCase()) || s.speaker.toLowerCase().includes(search.toLowerCase()) || s.series.toLowerCase().includes(search.toLowerCase())
    const matchTopic = topicFilter.length === 0 || s.topic.some(t => topicFilter.includes(t))
    const matchFormat = formatFilter.length === 0 || formatFilter.includes(s.format)
    return matchSearch && matchTopic && matchFormat
  })

  const toggleTopic = (t: string) => setTopicFilter(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
  const toggleFormat = (f: string) => setFormatFilter(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f])

  return (
    <div className="pt-16 bg-[#FAFAFF] dark:bg-[#0D0920] min-h-screen">
      <section className="hero-gradient py-16 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-accent/20 text-accent border border-accent/30 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">Audio · Video · Written</span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-white mb-4">Sermons & Devotionals</h1>
          <p className="text-white/70 text-lg">Real messages for real life. Search by topic or speaker.</p>
        </div>
      </section>

      {/* Daily Verse Widget */}
      <section className="py-10 bg-primary/10 dark:bg-primary/5 border-y border-primary/20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-primary dark:text-accent text-xs font-bold uppercase tracking-widest mb-2">📖 Today's Verse</p>
          <p className="font-display font-bold text-lg text-gray-900 dark:text-white mb-1">"{DAILY_VERSE.text}"</p>
          <cite className="text-gray-400 dark:text-gray-500 text-sm not-italic">{DAILY_VERSE.reference}</cite>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Search + Filters */}
          <div className="space-y-4 mb-10">
            <div className="relative max-w-md">
              <input
                type="search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search sermons, speakers, series..."
                className="w-full bg-white dark:bg-[#1A1035] border border-gray-200 dark:border-white/10 rounded-2xl pl-11 pr-5 py-3.5 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex flex-wrap gap-2">
              {allFormats.map(f => (
                <button key={f} onClick={() => toggleFormat(f)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${formatFilter.includes(f) ? 'bg-primary text-white' : 'bg-white dark:bg-[#1A1035] text-gray-500 dark:text-gray-400'}`}>
                  {f === 'video' ? '▶️' : f === 'audio' ? '🎧' : '📝'} {f}
                </button>
              ))}
              <div className="w-px h-6 bg-gray-200 dark:bg-white/10 self-center mx-1" />
              {allTopics.map(t => (
                <button key={t} onClick={() => toggleTopic(t)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${topicFilter.includes(t) ? 'bg-primary text-white' : 'bg-white dark:bg-[#1A1035] text-gray-500 dark:text-gray-400'}`}>
                  #{t}
                </button>
              ))}
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(sermon => <SermonCard key={sermon.id} sermon={sermon} />)}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-gray-400 dark:text-gray-600">No sermons match your search. Try different filters.</p>
              <button onClick={() => { setSearch(''); setTopicFilter([]); setFormatFilter([]) }}
                className="mt-3 text-primary dark:text-accent text-sm hover:underline">Clear all filters</button>
            </div>
          )}

          {/* Reading Plans CTA */}
          <div className="mt-16 bg-[#F3F0FF] dark:bg-[#1A1035] rounded-2xl p-8 text-center">
            <h3 className="font-display font-bold text-xl mb-2 dark:text-white">📚 Want to go deeper?</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">Check out our reading plans and downloadable devotional guides.</p>
            <a href="/resources" className="inline-flex items-center gap-2 bg-primary text-white font-display font-bold px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors">
              Explore Resources →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
