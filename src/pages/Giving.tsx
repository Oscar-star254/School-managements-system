import { useState } from 'react'
import { campaigns, MPESA_PAYBILL, MPESA_ACCOUNT, MPESA_TILL, CHURCH_NAME } from '../data/content'

function ProgressBar({ raised, target }: { raised: number; target: number }) {
  const pct = Math.min(100, Math.round((raised / target) * 100))
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs font-semibold">
        <span className="text-gray-600 dark:text-gray-400">KES {raised.toLocaleString()} raised</span>
        <span className="text-gray-400 dark:text-gray-500">of KES {target.toLocaleString()}</span>
      </div>
      <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
        <div className="progress-bar h-full" style={{ width: `${pct}%` }} />
      </div>
      <p className="text-xs text-primary dark:text-accent font-bold">{pct}% funded</p>
    </div>
  )
}

export default function Giving() {
  const [activeCampaign, setActiveCampaign] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="pt-16 bg-[#FAFAFF] dark:bg-[#0D0920] min-h-screen">
      <section className="hero-gradient py-16 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-accent/20 text-accent border border-accent/30 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">Support the Ministry</span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-white mb-4">Give & Donate</h1>
          <p className="text-white/70 text-lg">Your generosity fuels camps, outreaches, equipment, and ensures no young person is left out.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* M-Pesa — primary giving method */}
          <div className="mb-16">
            <h2 className="font-display font-black text-3xl mb-8 dark:text-white">💚 Give via M-Pesa</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
              {/* Paybill */}
              <div className="mpesa-card rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-2xl">📱</span>
                  <span className="font-display font-bold text-lg">M-Pesa Paybill</span>
                </div>
                <div className="space-y-3 mb-5">
                  {[
                    { label: 'Business No.', value: MPESA_PAYBILL },
                    { label: 'Account No.', value: MPESA_ACCOUNT },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between bg-white/10 rounded-xl px-4 py-3">
                      <div>
                        <div className="text-white/60 text-xs">{item.label}</div>
                        <div className="font-display font-black text-xl tracking-widest">{item.value}</div>
                      </div>
                      <button onClick={() => copy(item.value, item.label)}
                        className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg font-semibold transition-colors">
                        {copied === item.label ? '✓ Copied' : 'Copy'}
                      </button>
                    </div>
                  ))}
                </div>
                <ol className="text-white/70 text-xs space-y-1">
                  <li>1. Go to M-Pesa → Lipa na M-Pesa → Pay Bill</li>
                  <li>2. Business No: <strong className="text-white">{MPESA_PAYBILL}</strong></li>
                  <li>3. Account: <strong className="text-white">{MPESA_ACCOUNT}</strong></li>
                  <li>4. Enter amount and confirm</li>
                </ol>
              </div>

              {/* Till */}
              <div className="bg-[#007A3D] rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-2xl">🏪</span>
                  <span className="font-display font-bold text-lg">Buy Goods (Till)</span>
                </div>
                <div className="bg-white/10 rounded-xl px-4 py-3 mb-5 flex items-center justify-between">
                  <div>
                    <div className="text-white/60 text-xs">Till Number</div>
                    <div className="font-display font-black text-3xl tracking-widest">{MPESA_TILL}</div>
                  </div>
                  <button onClick={() => copy(MPESA_TILL, 'till')}
                    className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg font-semibold transition-colors">
                    {copied === 'till' ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
                <ol className="text-white/70 text-xs space-y-1">
                  <li>1. Go to M-Pesa → Lipa na M-Pesa → Buy Goods</li>
                  <li>2. Till No: <strong className="text-white">{MPESA_TILL}</strong></li>
                  <li>3. Enter amount and confirm</li>
                </ol>
                <div className="mt-4 text-xs text-white/50">
                  🔌 <em>STK push (automatic M-Pesa prompt) can be wired via Daraja API to your backend.</em>
                </div>
              </div>
            </div>
          </div>

          {/* Campaigns */}
          <div className="mb-16">
            <h2 className="font-display font-black text-3xl mb-3 dark:text-white">🎯 Current Campaigns</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">Give towards a specific need. Just reference the campaign name when paying via M-Pesa.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {campaigns.map(c => (
                <div key={c.id} className="bg-white dark:bg-[#1A1035] rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
                  <h3 className="font-display font-bold text-gray-900 dark:text-white text-lg mb-2">{c.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">{c.desc}</p>
                  <ProgressBar raised={c.raised} target={c.target} />
                  <button onClick={() => setActiveCampaign(c.id === activeCampaign ? null : c.id)}
                    className="w-full mt-5 bg-primary hover:bg-primary-dark text-white font-display font-bold py-3 rounded-xl transition-colors text-sm">
                    Give to This Campaign
                  </button>
                  {activeCampaign === c.id && (
                    <div className="mt-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/30 rounded-xl p-4 text-sm">
                      <p className="text-green-800 dark:text-green-300 font-semibold mb-2">✓ How to give to this campaign:</p>
                      <p className="text-green-700 dark:text-green-400 text-xs">
                        Pay via M-Pesa to Paybill <strong>{MPESA_PAYBILL}</strong>, Account: <strong>{c.id.toUpperCase()}</strong>
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bank + Card */}
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl">
            <div className="bg-white dark:bg-[#1A1035] rounded-2xl p-6 shadow-sm">
              <h3 className="font-display font-bold text-lg mb-4 dark:text-white">🏦 Bank Transfer</h3>
              <div className="space-y-2 text-sm">
                {[
                  { label: 'Account Name', value: `${CHURCH_NAME} Youth Fund` },
                  { label: 'Bank', value: 'Equity Bank Kenya' }, // REPLACE
                  { label: 'Branch', value: 'Nakuru Branch' }, // REPLACE
                  { label: 'Account No.', value: '0123456789' }, // REPLACE
                  { label: 'Swift/BIC', value: 'EQBLKENA' }, // REPLACE
                ].map(item => (
                  <div key={item.label} className="flex justify-between">
                    <span className="text-gray-400 dark:text-gray-500">{item.label}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-[#1A1035] rounded-2xl p-6 shadow-sm">
              <h3 className="font-display font-bold text-lg mb-2 dark:text-white">💳 Card Payment</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Online card payment coming soon.</p>
              <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-xl p-4">
                <p className="text-amber-800 dark:text-amber-300 text-xs">
                  🔌 <strong>Backend needed:</strong> Integrate a payment gateway like Pesapal, IntaSend, or Stripe here for card payments.
                </p>
              </div>
            </div>
          </div>

          {/* Transparency note */}
          <div className="mt-12 bg-[#F3F0FF] dark:bg-[#1A1035] rounded-2xl p-8">
            <h3 className="font-display font-bold text-xl mb-3 dark:text-white">🧾 Where Your Money Goes</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-2xl">
              All funds given to PULSE Youth are overseen by the church treasurer and youth leadership team. Annual financial reports are available to church members on request. We are committed to total transparency in how we use every shilling entrusted to us.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
