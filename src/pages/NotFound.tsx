import { Link } from 'react-router'

export default function NotFound() {
  return (
    <div className="pt-16 min-h-screen hero-gradient flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="font-display font-black text-9xl text-white/10 leading-none mb-4">404</div>
        <h1 className="font-display font-black text-3xl text-white mb-3">Page Not Found</h1>
        <p className="text-white/70 mb-8">Hmm, that page doesn't exist. But you're always welcome here.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="bg-accent text-black font-display font-bold px-7 py-3.5 rounded-xl hover:bg-accent-dark transition-all">
            Go Home
          </Link>
          <Link to="/contact" className="bg-white/10 border border-white/20 text-white font-display font-semibold px-7 py-3.5 rounded-xl hover:bg-white/20 transition-all">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
