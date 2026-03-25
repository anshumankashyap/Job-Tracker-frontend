'use client';
import { useEffect, useState } from 'react';
import { getApplications } from '@/services/api';
import { JobApplication } from '@/types';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import StatsCard from '@/components/StatsCard';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { BriefcaseIcon, SendIcon, UsersIcon, TrophyIcon, XCircleIcon } from 'lucide-react';

const STATUS_COLORS: Record<string, string> = {
  wishlist: '#6366f1',
  applied: '#3b82f6',
  interview: '#f59e0b',
  offer: '#10b981',
  rejected: '#ef4444',
};

export default function DashboardPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getApplications()
      .then((res) => setApplications(res.data))
      .finally(() => setLoading(false));
  }, []);

  const countByStatus = (status: string) =>
    applications.filter((a) => a.status === status).length;

  const chartData = ['wishlist', 'applied', 'interview', 'offer', 'rejected']
    .map((s) => ({ name: s, value: countByStatus(s) }))
    .filter((d) => d.value > 0);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatsCard label="Total Applied" value={countByStatus('applied')} color="bg-blue-100" icon={<SendIcon size={20} className="text-blue-600" />} />
            <StatsCard label="Interviews" value={countByStatus('interview')} color="bg-yellow-100" icon={<UsersIcon size={20} className="text-yellow-600" />} />
            <StatsCard label="Offers" value={countByStatus('offer')} color="bg-green-100" icon={<TrophyIcon size={20} className="text-green-600" />} />
            <StatsCard label="Rejected" value={countByStatus('rejected')} color="bg-red-100" icon={<XCircleIcon size={20} className="text-red-600" />} />
          </div>

          {/* Chart + Recent Applications */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Applications by Status</h2>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                      {chartData.map((entry) => (
                        <Cell key={entry.name} fill={STATUS_COLORS[entry.name]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-400 text-center py-16">No data yet</p>
              )}
            </div>

            {/* Recent Applications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Applications</h2>
              {loading ? (
                <p className="text-gray-400">Loading...</p>
              ) : applications.length === 0 ? (
                <p className="text-gray-400 text-center py-16">No applications yet. Start adding!</p>
              ) : (
                <ul className="space-y-3">
                  {applications.slice(0, 6).map((app) => (
                    <li key={app.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">{app.role}</p>
                        <p className="text-sm text-gray-500">{app.company}</p>
                      </div>
                      <span
                        className="text-xs font-semibold px-2 py-1 rounded-full capitalize"
                        style={{ backgroundColor: STATUS_COLORS[app.status] + '22', color: STATUS_COLORS[app.status] }}
                      >
                        {app.status}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}