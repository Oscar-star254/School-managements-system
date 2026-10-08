import { readingPlans, recommendedBooks, playlists, DAILY_VERSE } from '../data/content'

export default function Resources() {
  return (
    <div className="pt-16 bg-[#FAFAFF] dark:bg-[#0D0920] min-h-screen">
      <section className="hero-gradient py-16 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-accent/20 text-accent border border-accent/30 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">Grow Deeper</span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-white mb-4">Resources</h1>
          <p className="text-white/70 text-lg">Reading plans, playlists, books, and support — everything to help you grow in faith.</p>
        </div>
      </section>

      {/* Daily Verse */}
      <section className="py-10 bg-primary/10 dark:bg-primary/5 border-y border-primary/20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-primary dark:text-accent text-xs font-bold uppercase tracking-widest mb-2">📖 Daily Verse</p>
          <p className="font-display font-bold text-lg text-gray-900 dark:text-white mb-1">"{DAILY_VERSE.text}"</p>
          <cite className="text-gray-400 dark:text-gray-500 text-sm not-italic">{DAILY_VERSE.reference}</cite>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">

          {/* Reading Plans */}
          <div>
            <h2 className="font-display font-black text-3xl mb-8 dark:text-white">📖 Reading Plans</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {readingPlans.map(plan => (
                <div key={plan.title} className="bg-white dark:bg-[#1A1035] rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">📚</span>
                    <span className="text-xs font-bold bg-primary/10 dark:bg-primary/20 text-primary dark:text-accent px-2.5 py-1 rounded-full">{plan.days} days</span>
                  </div>
                  <h3 className="font-display font-bold text-gray-900 dark:text-white mb-2">{plan.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{plan.desc}</p>
                  <a href={plan.link}
                    className="block text-center bg-primary/10 dark:bg-primary/20 hover:bg-primary hover:text-white text-primary dark:text-accent font-semibold text-sm py-2.5 rounded-xl transition-all">
                    Start Plan →
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Playlists */}
          <div>
            <h2 className="font-display font-black text-3xl mb-8 dark:text-white">🎵 Worship Playlists</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {playlists.map(playlist => (
                <div key={playlist.title} className="bg-white dark:bg-[#1A1035] rounded-2xl p-5 shadow-sm flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${playlist.platform === 'Spotify' ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                      {playlist.platform === 'Spotify' ? '🎵' : '▶️'}
                    </div>
                    <div>
                      <span className={`text-xs font-bold ${playlist.platform === 'Spotify' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{playlist.platform}</span>
                      <h3 className="font-display font-bold text-gray-900 dark:text-white text-sm leading-tight">{playlist.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{playlist.desc}</p>
                  <a href={playlist.link} target="_blank" rel="noopener noreferrer"
                    className={`text-center font-semibold text-sm py-2.5 rounded-xl transition-colors ${playlist.platform === 'Spotify' ? 'bg-[#1DB954]/10 text-[#1DB954] hover:bg-[#1DB954] hover:text-white' : 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white'}`}>
                    Open on {playlist.platform}
                  </a>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-600 mt-3">🔌 Replace playlist links with your actual Spotify/YouTube playlist URLs.</p>
          </div>

          {/* Books */}
          <div>
            <h2 className="font-display font-black text-3xl mb-8 dark:text-white">📚 Recommended Books</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {recommendedBooks.map(book => (
                <div key={book.title} className="bg-white dark:bg-[#1A1035] rounded-2xl p-5 shadow-sm flex gap-4">
                  <div className="w-12 h-16 rounded-lg bg-gradient-to-b from-primary to-primary-dark flex-shrink-0 flex items-center justify-center">
                    <span className="text-white text-xl">📖</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full">{book.genre}</span>
                    <h3 className="font-display font-bold text-gray-900 dark:text-white mt-1 mb-0.5">{book.title}</h3>
                    <p className="text-xs text-primary dark:text-accent font-semibold mb-1">{book.author}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{book.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Counselling / Mentorship */}
          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-8 text-white">
            <div className="max-w-2xl">
              <h2 className="font-display font-black text-2xl mb-3">🤝 Need to Talk?</h2>
              <p className="text-white/80 mb-6">
                We have trained mentors and pastoral counsellors available for one-on-one conversations — about faith, life, relationships, mental health, or anything else weighing on you. All conversations are confidential.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <h3 className="font-display font-bold mb-1">Peer Mentorship</h3>
                  <p className="text-white/70 text-sm mb-2">Older youth mentoring younger members</p>
                  <a href="mailto:pulse.youth@gracecc.or.ke" className="text-accent text-sm font-semibold hover:underline">Request a mentor →</a>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <h3 className="font-display font-bold mb-1">Pastoral Counselling</h3>
                  <p className="text-white/70 text-sm mb-2">Private sessions with a trained pastor</p>
                  <a href="mailto:pulse.youth@gracecc.or.ke" className="text-accent text-sm font-semibold hover:underline">Book a session →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
