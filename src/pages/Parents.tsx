import { useState } from 'react'
import { PHONE, EMAIL } from '../data/content'

const policies = [
  {
    icon: '🛡️',
    title: 'Child Safeguarding Policy',
    content: 'PULSE Youth is committed to the safety and wellbeing of every young person in our community. We adopt a zero-tolerance approach to abuse of any kind. All concerns about a child\'s welfare are taken seriously and acted upon promptly in line with Kenyan child protection law.',
  },
  {
    icon: '🔍',
    title: 'Leader Vetting & Training',
    content: 'All leaders undergo a background vetting process before working with youth. Leaders complete safeguarding and child protection training annually. No leader ever works alone with a minor — the two-adult rule applies at all times.',
  },
  {
    icon: '📱',
    title: 'Communication Practices',
    content: 'Leaders do not communicate with minors via private social media messages. All group communication happens in group chats that include at least two leaders. Parents are always cc\'d on registration and important correspondence.',
  },
  {
    icon: '🚌',
    title: 'Transport & Camps Policy',
    content: 'Transport to offsite events uses vetted drivers with roadworthy vehicles. Written parental consent is required for all off-site activities involving minors. Leaders maintain a register at all camps and events. Emergency contacts are carried at all times.',
  },
  {
    icon: '📸',
    title: 'Photo & Media Consent',
    content: 'We never photograph or film minors without parental consent. Consent is obtained at registration and renewed annually. We never publish the full name, age, school, or location of any minor alongside their photo. Parents can withdraw consent at any time.',
  },
  {
    icon: '🔒',
    title: 'Data Privacy',
    content: 'Registration data is stored securely and only accessible by authorised leaders. We do not share personal data with third parties. You have the right to access, correct, or delete your data at any time.',
  },
]

export default function Parents() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', contact: '', concern: '', consent: false })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // 🔌 BACKEND: Send concern report to senior pastor / safeguarding lead (NOT regular leaders)
  }

  return (
    <div className="pt-16 bg-[#FAFAFF] dark:bg-[#0D0920] min-h-screen">
      <section className="hero-gradient py-16 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-accent/20 text-accent border border-accent/30 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">For Parents & Guardians</span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-white mb-4">Parents & Safety</h1>
          <p className="text-white/70 text-lg">Everything you need to know to feel confident and informed about your child's involvement with PULSE Youth.</p>
        </div>
      </section>

      {/* Emergency contact banner */}
      <div className="bg-red-600 dark:bg-red-800 py-3 px-4 text-center">
        <p className="text-white text-sm font-semibold">
          🚨 Emergency or urgent safeguarding concern? Call Pastor David directly: <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="underline font-bold">{PHONE}</a>
        </p>
      </div>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Policies grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {policies.map(policy => (
              <div key={policy.title} className="bg-white dark:bg-[#1A1035] rounded-2xl p-6 shadow-sm">
                <div className="text-4xl mb-3">{policy.icon}</div>
                <h3 className="font-display font-bold text-gray-900 dark:text-white text-lg mb-3">{policy.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{policy.content}</p>
              </div>
            ))}
          </div>

          {/* Consent Form Download */}
          <div className="bg-[#F3F0FF] dark:bg-[#1A1035] rounded-2xl p-8 mb-12 flex flex-col sm:flex-row items-center gap-6">
            <div className="text-5xl">📋</div>
            <div className="flex-1">
              <h3 className="font-display font-bold text-xl mb-1 dark:text-white">Parental Consent Form</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Required for all registered members under 18. Download, complete, and submit to any leader or bring it on your child's first visit.
              </p>
            </div>
            <div className="flex gap-3">
              <a href="#" /* REPLACE: link to PDF consent form */
                className="flex items-center gap-2 bg-primary text-white font-display font-bold px-5 py-3 rounded-xl hover:bg-primary-dark transition-colors text-sm">
                📥 Download PDF
              </a>
            </div>
          </div>

          {/* Confidential Report Form */}
          <div className="max-w-xl mx-auto">
            <h2 className="font-display font-black text-2xl mb-2 dark:text-white">🔐 Report a Concern</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
              If you have a concern about the safety or wellbeing of any young person — or about the conduct of any leader — please tell us confidentially. Reports go directly to the Senior Pastor and not to regular leaders.
            </p>
            <div className="bg-white dark:bg-[#1A1035] rounded-2xl p-6 shadow-sm">
              {submitted ? (
                <div className="text-center py-6">
                  <div className="text-4xl mb-3">✅</div>
                  <h3 className="font-display font-bold text-lg mb-2 dark:text-white">Report Received</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    The Senior Pastor has been notified and will respond within 24 hours. Thank you for speaking up.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Your Name <span className="font-normal text-gray-400">(optional)</span></label>
                    <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Contact <span className="font-normal text-gray-400">(optional — so we can follow up)</span></label>
                    <input type="text" value={form.contact} onChange={e => setForm({...form, contact: e.target.value})}
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Your Concern *</label>
                    <textarea required rows={5} value={form.concern} onChange={e => setForm({...form, concern: e.target.value})}
                      placeholder="Describe the concern as clearly as you can..."
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
                  </div>
                  <input type="text" name="_gotcha" className="hidden" aria-hidden="true" tabIndex={-1} />
                  <button type="submit" className="w-full bg-primary text-white font-display font-bold py-3.5 rounded-xl hover:bg-primary-dark transition-colors">
                    Submit Confidential Report
                  </button>
                  <p className="text-xs text-center text-gray-400 dark:text-gray-600">
                    This form goes directly to the Senior Pastor. Not to youth leaders.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
