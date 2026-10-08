import { leaders } from '../data/content'

export default function Leaders() {
  return (
    <div className="pt-16 bg-[#FAFAFF] dark:bg-[#0D0920] min-h-screen">
      <section className="hero-gradient py-16 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-accent/20 text-accent border border-accent/30 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">Our Team</span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-white mb-4">Meet the Leaders</h1>
          <p className="text-white/70 text-lg">The people who make PULSE Youth happen every week — passionate, trained, and here for you.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {leaders.map(leader => (
              <div key={leader.id} className="bg-white dark:bg-[#1A1035] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 card-glow">
                <div className="h-52 photo-placeholder flex flex-col items-center justify-center gap-2">
                  <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-10 h-10 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <p className="text-white/40 text-xs text-center">📸 REPLACE WITH<br/>LEADER PHOTO</p>
                </div>
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="font-display font-bold text-gray-900 dark:text-white text-xl">{leader.name}</h3>
                    <p className="text-primary dark:text-accent font-semibold text-sm">{leader.role}</p>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">{leader.bio}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {leader.ministries.map(m => (
                      <span key={m} className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2.5 py-0.5 rounded-full font-medium">
                        {m}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <a href={`tel:${leader.phone}`}
                      className="flex-1 text-center bg-primary/10 dark:bg-primary/20 hover:bg-primary hover:text-white text-primary dark:text-accent font-semibold text-sm py-2.5 rounded-xl transition-all">
                      📞 Call
                    </a>
                    <a href={`mailto:${leader.email}`}
                      className="flex-1 text-center bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 text-gray-700 dark:text-gray-300 font-semibold text-sm py-2.5 rounded-xl transition-all">
                      ✉️ Email
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parents section */}
      <section className="py-16 bg-[#F3F0FF] dark:bg-[#0A0718]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display font-black text-3xl mb-4 dark:text-white">👨‍👩‍👧 For Parents</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            We take the safety and spiritual wellbeing of your child seriously. All our leaders undergo background vetting and safeguarding training. We welcome your questions and encourage open communication.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-left max-w-xl mx-auto">
            {[
              { icon: '🔒', title: 'DBS / Background Checked', desc: 'All leaders have undergone criminal background checks.' },
              { icon: '🛡️', title: 'Safeguarding Trained', desc: 'Trained in child safeguarding and abuse prevention.' },
              { icon: '📱', title: 'Direct Contact', desc: 'Parents can contact any leader directly at any time.' },
              { icon: '📋', title: 'Clear Policies', desc: 'Transparent policies for events, transport, and communication.' },
            ].map(item => (
              <div key={item.title} className="bg-white dark:bg-[#1A1035] rounded-xl p-4 flex gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-0.5">{item.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <a href="mailto:pulse.youth@gracecc.or.ke"
              className="inline-flex items-center gap-2 bg-primary text-white font-display font-bold px-7 py-3.5 rounded-xl hover:bg-primary-dark transition-colors">
              ✉️ Email a Leader
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
