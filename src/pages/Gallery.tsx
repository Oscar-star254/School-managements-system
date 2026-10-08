import { useState } from 'react'
import { galleryAlbums, type GalleryAlbum } from '../data/content'

function Lightbox({ album, index, onClose, onPrev, onNext }: {
  album: GalleryAlbum; index: number; onClose: () => void; onPrev: () => void; onNext: () => void
}) {
  const photo = album.photos[index]
  return (
    <div className="fixed inset-0 z-50 lightbox-backdrop flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-10 right-0 text-white/70 hover:text-white text-3xl font-bold">×</button>
        {photo.isPlaceholder ? (
          <div className="aspect-video rounded-2xl photo-placeholder flex flex-col items-center justify-center gap-3">
            <span className="text-5xl">📸</span>
            <p className="text-white/50 text-sm">{photo.alt}</p>
          </div>
        ) : (
          <img src={photo.url} alt={photo.alt} className="w-full rounded-2xl max-h-[80vh] object-contain" />
        )}
        <div className="flex items-center justify-between mt-4">
          <button onClick={onPrev} className="text-white/70 hover:text-white font-semibold text-sm flex items-center gap-1">
            ← Previous
          </button>
          <span className="text-white/40 text-sm">{index + 1} / {album.photos.length}</span>
          <button onClick={onNext} className="text-white/70 hover:text-white font-semibold text-sm flex items-center gap-1">
            Next →
          </button>
        </div>
        <p className="text-center text-white/50 text-xs mt-2">{photo.alt}</p>
      </div>
    </div>
  )
}

export default function Gallery() {
  const [activeAlbum, setActiveAlbum] = useState<GalleryAlbum | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (album: GalleryAlbum, idx: number) => {
    setActiveAlbum(album)
    setLightboxIndex(idx)
  }
  const closeLightbox = () => { setLightboxIndex(null) }
  const prevPhoto = () => { if (activeAlbum && lightboxIndex !== null) setLightboxIndex((lightboxIndex - 1 + activeAlbum.photos.length) % activeAlbum.photos.length) }
  const nextPhoto = () => { if (activeAlbum && lightboxIndex !== null) setLightboxIndex((lightboxIndex + 1) % activeAlbum.photos.length) }

  return (
    <div className="pt-16 bg-[#FAFAFF] dark:bg-[#0D0920] min-h-screen">
      {lightboxIndex !== null && activeAlbum && (
        <Lightbox album={activeAlbum} index={lightboxIndex} onClose={closeLightbox} onPrev={prevPhoto} onNext={nextPhoto} />
      )}

      <section className="hero-gradient py-16 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-accent/20 text-accent border border-accent/30 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">Memories</span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-white mb-4">Photo & Video Gallery</h1>
          <p className="text-white/70 text-lg">Moments from our events, outreaches, retreats, and everyday community life.</p>
        </div>
      </section>

      {/* Consent notice */}
      <div className="bg-amber-50 dark:bg-amber-900/10 border-b border-amber-200 dark:border-amber-800/30 py-3 px-4 text-center">
        <p className="text-amber-800 dark:text-amber-300 text-xs font-medium">
          📸 All photos shared here are taken with consent. Minors are not identified by full name. See our <a href="/parents" className="underline">Photo & Media Consent Policy</a>.
        </p>
      </div>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Albums overview */}
          {!activeAlbum ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {galleryAlbums.map(album => {
                const cover = album.photos[album.coverIndex]
                return (
                  <button key={album.id} onClick={() => setActiveAlbum(album)}
                    className="group relative rounded-2xl overflow-hidden aspect-square shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 text-left">
                    {cover.isPlaceholder || !cover.url ? (
                      <div className="w-full h-full photo-placeholder flex flex-col items-center justify-center gap-2">
                        <span className="text-4xl">📷</span>
                        <p className="text-white/40 text-xs">REPLACE WITH ALBUM COVER</p>
                      </div>
                    ) : (
                      <img src={cover.url} alt={cover.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-display font-bold text-white text-base leading-tight">{album.title}</h3>
                      <p className="text-white/60 text-xs mt-0.5">{album.date} · {album.photos.length} photos</p>
                    </div>
                  </button>
                )
              })}
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <button onClick={() => setActiveAlbum(null)}
                  className="text-primary dark:text-accent font-semibold text-sm hover:underline flex items-center gap-1">
                  ← All Albums
                </button>
                <span className="text-gray-300 dark:text-gray-600">/</span>
                <h2 className="font-display font-bold text-xl dark:text-white">{activeAlbum.title}</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {activeAlbum.photos.map((photo, idx) => (
                  <button key={idx} onClick={() => openLightbox(activeAlbum, idx)}
                    className="group relative rounded-xl overflow-hidden aspect-square shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5">
                    {photo.isPlaceholder || !photo.url ? (
                      <div className="w-full h-full photo-placeholder flex flex-col items-center justify-center gap-2">
                        <span className="text-3xl">📸</span>
                        <p className="text-white/30 text-[9px] text-center px-2">{photo.alt}</p>
                      </div>
                    ) : (
                      <img src={photo.url} alt={photo.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-2xl">🔍</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* YouTube section */}
          <div className="mt-16">
            <h2 className="font-display font-bold text-2xl mb-6 dark:text-white">📹 Videos</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { title: 'Lake Naivasha Retreat 2025 — Highlights', id: 'dQw4w9WgXcQ' }, // REPLACE
                { title: 'Worship Night: Pour Out — Full Session', id: 'dQw4w9WgXcQ' }, // REPLACE
              ].map(v => (
                <div key={v.id} className="rounded-2xl overflow-hidden shadow-sm">
                  <iframe
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.title}
                    className="w-full aspect-video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <div className="bg-white dark:bg-[#1A1035] px-4 py-3">
                    <p className="font-semibold text-sm dark:text-white">{v.title}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">REPLACE YouTube ID with real video · PULSE Youth</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
