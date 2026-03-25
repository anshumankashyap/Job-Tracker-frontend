import Link from 'next/link';
import { BriefcaseIcon, SparklesIcon, LayoutDashboardIcon, ArrowRightIcon } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <BriefcaseIcon className="text-blue-600" size={26} />
          <span className="text-xl font-bold text-gray-800">JobTracker</span>
        </div>
        <div className="flex gap-3">
          <Link href="/login" className="text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 font-medium transition">
            Sign In
          </Link>
          <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center px-6 pt-20 pb-16 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <SparklesIcon size={14} /> AI-Powered Job Search Management
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
          Track Every Application,<br />
          <span className="text-blue-600">Land Your Dream Job</span>
        </h1>
        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
          Organize your job search with a visual Kanban board and get AI-powered resume feedback tailored to each job description.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/register"
            className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-blue-700 transition shadow-lg"
          >
            Start for Free <ArrowRightIcon size={18} />
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-2 border border-gray-300 text-gray-700 px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-gray-50 transition"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <LayoutDashboardIcon size={28} className="text-blue-600" />,
              bg: 'bg-blue-50',
              title: 'Visual Kanban Board',
              desc: 'Drag and drop applications across stages — Wishlist, Applied, Interview, Offer, and Rejected.',
            },
            {
              icon: <SparklesIcon size={28} className="text-indigo-600" />,
              bg: 'bg-indigo-50',
              title: 'AI Resume Analyzer',
              desc: 'Get instant match scores, missing keywords, and actionable suggestions powered by GPT-4o.',
            },
            {
              icon: <BriefcaseIcon size={28} className="text-green-600" />,
              bg: 'bg-green-50',
              title: 'Application Dashboard',
              desc: 'See your entire job search at a glance with stats, charts, and recent activity.',
            },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className={`w-14 h-14 ${f.bg} rounded-xl flex items-center justify-center mb-4`}>
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}