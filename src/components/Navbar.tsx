'use client';
import { useAuth } from '@/context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { BriefcaseIcon, LayoutDashboardIcon, LogOutIcon } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navLink = (href: string, label: string, Icon: any) => (
    <Link
      href={href}
      className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition
        ${pathname === href ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
    >
      <Icon size={16} /> {label}
    </Link>
  );
  
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <BriefcaseIcon className="text-blue-600" size={24} />
        <span className="text-xl font-bold text-gray-800">JobTracker</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-600 text-sm">Hi, <strong>{user?.username}</strong></span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 transition"
        >
          <LogOutIcon size={16} /> Logout
        </button>
      </div>
    </nav>
  );
}