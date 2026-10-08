import { useState } from 'react'
import { Link } from 'react-router'
import { MEETING_DAY, MEETING_TIME, ADDRESS, GOOGLE_MAPS_URL } from '../data/content'

const steps = [
  { icon: '🚗', title: 'Arrive', desc: 'Come to Grace Community Church on Kenyatta Ave, Nakuru. Parking is available. Doors open at 4:30 PM.' },
  { icon: '🤝', title: 'Be Welcomed', desc: 'Our ushers will greet you at the door. Let them know it\'s your first time — they\'ll connect you with a friendly face.' },
  { icon: '🎵', title: 'Worship', desc: 'We kick off with about 20–25 minutes of live music. Jump in, stand up, or just watch — whatever feels comfortable.' },
  { icon: '📖', title: 'The Message', desc: 'A real talk from one of our leaders — relevant, honest, and based on the Bible. About 25–30 minutes.' },
  { icon: '💬', title: 'Connect', desc: 'After the message we break into small discussion groups. You can skip this if you\'re not ready — no pressure.' },
  { icon: '🍕', title: 'Hang Out', desc: 'We close with snacks, games, and good vibes. Stay as long as you like and meet people.' },
]

const faqs = [
  {
    q: 'Will I feel awkward going alone?',
    a: 'Honestly, maybe a tiny bit for the first 5 minutes — but our ushers and welcome team make it their mission to make sure that doesn\'t last. Most people say they felt at home within 10 minutes of arriving.',
  },
  {
    q: 'Do I need to know the Bible?',
    a: 'Not at all. We explain everything clearly, and our messages are designed for anyone — whether you\'ve read the Bible your whole life or you\'ve never opened one.',
  },
  {
    q: 'Can I bring a friend?',
    a: 'Please do! In fact, we\'d love that. The more the merrier. Many people find it easier to come the first time with someone they know.',
  },
  {
    q: 'What should I wear?',
    a: 'Whatever you\'re comfortable in. You\'ll see everything from school uniforms to jeans and t-shirts to traditional wear. There\'s no dress code.',
  },
  {
    q: 'How long does it last?',
    a: 'The main programme is about 1.5 to 2 hours. You\'re free to leave when it ends, or stick around and hang out for as long as you like.',
  },
  {
    q: 'Do I have to participate or talk in front of people?',
    a: 'Never. You can observe and take it all in at your own pace. We\'ll never put you on the spot.',
  },
  {
    q: 'Is it only for Christians?',
    a: 'Not at all. Curious, questioning, doubting — everyone is welcome. We\'re a judgment-free space.',
  },
  {
    q: 'What age group attends?',
    a: 'Ages 13 to 25 years old. You\'ll find students in high school and university, as well as young working adults.',
  },
]

export default function FirstVisit() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="pt-16 bg-[#FAFAFF] dark:bg-[#0D0920]">
      {/* Header */}
      <section className="hero-gradient py-20 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-accent/20 text-accent border border-accent/30 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">First Time Visitor</span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-white mb-4">What to Expect</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Walking into a new place for the first time can feel nerve-wracking. We get it. Here's everything you need to know so you can come prepared — and at ease.
          </p>
        </div>
      </section>

      {/* When & Where */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white dark:bg-[#1A1035] rounded-2xl p-6 shadow-sm text-center">
              <div className="text-4xl mb-3">📅</div>
              <h3 className="font-display font-bold text-gray-900 dark:text-white text-lg mb-1">When</h3>
              <p className="font-semibold text-primary dark:text-accent">{MEETING_DAY}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{MEETING_TIME}</p>
            </div>
            <div className="bg-white dark:bg-[#1A1035] rounded-2xl p-6 shadow-sm text-center">
              <div className="text-4xl mb-3">📍</div>
              <h3 className="font-display font-bold text-gray-900 dark:text-white text-lg mb-1">Where</h3>
              <p className="font-semibold text-gray-900 dark:text-white text-sm">{ADDRESS}</p>
              <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer"
                className="text-primary dark:text-accent text-sm font-medium hover:underline mt-1 block">
                Get Directions →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Step by Step */}
      <section className="py-16 bg-white dark:bg-[#0A0718]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-center mb-12 dark:text-white">
            Your Friday Night, Step by Step
          </h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-2xl">
                  {step.icon}
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-bold text-primary dark:text-accent uppercase tracking-widest">Step {i + 1}</span>
                    <div className="flex-1 h-px bg-gray-100 dark:bg-white/10" />
                  </div>
                  <h3 className="font-display font-bold text-gray-900 dark:text-white text-lg mb-1">{step.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who will be there + what to wear */}
      <section className="py-16 bg-[#F3F0FF] dark:bg-[#0D0920]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              {
                icon: '👥',
                title: 'Who\'s There',
                items: ['13–25 year olds', 'Students (secondary & uni)', 'Young workers', 'Believers & seekers', 'Every tribe, every background'],
              },
              {
                icon: '👕',
                title: 'What to Wear',
                items: ['Literally anything', 'Jeans and sneakers? Yes', 'School uniform? Yes', 'Sunday best? Also yes', 'No judgement, ever'],
              },
              {
                icon: '⏰',
                title: 'How Long',
                items: ['Doors open: 4:30 PM', 'Programme: 5:00 PM', 'Ends: ~7:00 PM', 'Hangout: till you leave', 'First timers: ~2 hrs total'],
              },
            ].map(section => (
              <div key={section.title} className="bg-white dark:bg-[#1A1035] rounded-2xl p-6 shadow-sm">
                <div className="text-4xl mb-3">{section.icon}</div>
                <h3 className="font-display font-bold text-gray-900 dark:text-white mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map(item => (
                    <li key={item} className="text-sm text-gray-500 dark:text-gray-400 flex gap-2">
                      <span className="text-primary dark:text-accent mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome Video Placeholder */}
      <section className="py-16 bg-white dark:bg-[#0D0920]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display font-black text-3xl sm:text-4xl mb-4 dark:text-white">
            A Word from Our Pastor
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
            Hear directly from Pastor David why this community exists and why you'd belong here.
          </p>
          <div className="aspect-video rounded-3xl photo-placeholder max-w-xl mx-auto flex flex-col items-center justify-center gap-4 shadow-xl">
            <div className="w-16 h-16 rounded-full bg-accent/30 flex items-center justify-center">
              <svg className="w-8 h-8 text-accent ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <p className="text-white/50 text-sm font-medium">🎬 REPLACE WITH<br/>WELCOME VIDEO<br/><span className="text-accent/70 text-xs">Embed YouTube video here</span></p>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-600 mt-4">
            🔌 <strong>Backend note:</strong> Replace the placeholder above with a YouTube embed using the <code className="bg-gray-100 dark:bg-white/10 px-1 rounded">&lt;iframe&gt;</code> embed code from your video.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#F3F0FF] dark:bg-[#0A0718]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-center mb-10 dark:text-white">
            You're Probably Wondering...
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white dark:bg-[#1A1035] rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-display font-semibold text-gray-900 dark:text-white text-base">{faq.q}</span>
                  <svg className={`w-5 h-5 text-primary dark:text-accent flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-500 dark:text-gray-400 text-sm leading-relaxed animate-slide-down">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 hero-gradient text-center px-4">
        <div className="max-w-xl mx-auto">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white mb-4">See You This Friday 🔥</h2>
          <p className="text-white/70 mb-8">Any more questions? We're happy to chat before you come.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/events" className="bg-accent text-black font-display font-bold px-7 py-3.5 rounded-xl hover:bg-accent-dark transition-all hover:scale-105">
              See This Friday's Service
            </Link>
            <Link to="/contact" className="bg-white/10 border border-white/20 text-white font-display font-semibold px-7 py-3.5 rounded-xl hover:bg-white/20 transition-all">
              Ask a Question
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
