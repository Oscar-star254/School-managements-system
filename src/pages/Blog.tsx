import { useState } from 'react'
import { blogPosts, type BlogPost, WHATSAPP_NUMBER } from '../data/content'
import { Link } from 'react-router'

const catColors: Record<BlogPost['category'], { bg: string; text: string; label: string; emoji: string }> = {
  announcement: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', label: 'Announcement', emoji: '📣' },
  recap:        { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', label: 'Recap', emoji: '📷' },
  reflection:   { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300', label: 'Reflection', emoji: '💭' },
  devotional:   { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300', label: 'Devotional', emoji: '✝️' },
}

export function BlogPost_({ id }: { id: string }) {
  const post = blogPosts.find(p => p.id === id)
  if (!post) return <div className="pt-24 min-h-screen flex items-center justify-center"><p>Post not found</p></div>
  const cat = catColors[post.category]
  const shareText = encodeURIComponent(`${post.title}\n\n${post.summary}\n\nRead more at pulseyouth.gracecc.or.ke/blog/${post.id}`)

  return (
    <div className="pt-16 bg-[#FAFAFF] dark:bg-[#0D0920] min-h-screen">
      <div className="hero-gradient py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="text-white/60 hover:text-white text-sm flex items-center gap-1 mb-6">← Blog</Link>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${cat.bg} ${cat.text} mb-4 inline-block`}>{cat.emoji} {cat.label}</span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white mb-4">{post.title}</h1>
          <div className="text-white/60 text-sm">By {post.author} · {new Date(post.date).toLocaleDateString('en-KE', { year:'numeric', month:'long', day:'numeric' })}</div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {post.image && (
          <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-2xl mb-8 shadow-lg" loading="lazy" />
        )}
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6 font-medium italic">{post.summary}</p>
        <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 leading-loose">
          {post.body.split('\n\n').map((para, i) => <p key={i} className="mb-4">{para}</p>)}
        </div>
        <div className="mt-10 flex gap-3">
          <a href={`https://wa.me/?text=${shareText}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity">
            📤 Share on WhatsApp
          </a>
          <Link to="/blog" className="flex items-center gap-2 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 font-semibold text-sm px-5 py-2.5 rounded-xl">
            ← All Posts
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Blog() {
  const [cat, setCat] = useState<BlogPost['category'] | 'all'>('all')

  const filtered = cat === 'all' ? blogPosts : blogPosts.filter(p => p.category === cat)

  return (
    <div className="pt-16 bg-[#FAFAFF] dark:bg-[#0D0920] min-h-screen">
      <section className="hero-gradient py-16 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-accent/20 text-accent border border-accent/30 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">News & Reflection</span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-white mb-4">Blog & Announcements</h1>
          <p className="text-white/70 text-lg">Updates, event recaps, reflections, and devotionals from our community.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              { value: 'all', label: 'All Posts', emoji: '📋' },
              ...Object.entries(catColors).map(([k, v]) => ({ value: k, label: v.label, emoji: v.emoji }))
            ].map(item => (
              <button key={item.value} onClick={() => setCat(item.value as any)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${cat === item.value ? 'bg-primary text-white' : 'bg-white dark:bg-[#1A1035] text-gray-600 dark:text-gray-300'}`}>
                {item.emoji} {item.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(post => {
              const c = catColors[post.category]
              const shareText = encodeURIComponent(`${post.title}\n\n${post.summary}`)
              return (
                <article key={post.id} className="bg-white dark:bg-[#1A1035] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col">
                  {post.image ? (
                    <img src={post.image} alt={post.title} className="h-48 w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="h-32 photo-placeholder flex items-center justify-center">
                      <span className="text-4xl">{c.emoji}</span>
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${c.bg} ${c.text} inline-block self-start mb-2`}>{c.emoji} {c.label}</span>
                    <h3 className="font-display font-bold text-gray-900 dark:text-white text-lg leading-tight mb-2 flex-1">{post.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-3">{post.summary}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {post.author} · {new Date(post.date).toLocaleDateString('en-KE', { month:'short', day:'numeric' })}
                      </span>
                      <div className="flex gap-2">
                        <a href={`https://wa.me/?text=${shareText}`} target="_blank" rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366] flex items-center justify-center transition-colors group" title="Share on WhatsApp">
                          <svg className="w-4 h-4 text-[#25D366] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        </a>
                        <Link to={`/blog/${post.id}`}
                          className="w-8 h-8 rounded-lg bg-primary/10 dark:bg-primary/20 hover:bg-primary flex items-center justify-center transition-colors group">
                          <svg className="w-4 h-4 text-primary dark:text-accent group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
