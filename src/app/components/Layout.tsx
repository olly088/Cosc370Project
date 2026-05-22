import { Link, useLocation } from 'react-router';
import { Download } from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
}

interface LayoutProps {
  children: React.ReactNode;
  navItems?: NavItem[];
  exportLabel?: string;
}

const defaultNav: NavItem[] = [
  { label: 'MY BUDGETS', path: '/' },
  { label: 'MY TEAM', path: '/team' },
  { label: 'ALL COUNCIL', path: '/council' },
];

export function Layout({ children, navItems = defaultNav, exportLabel = 'EXPORT DATA' }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Nav */}
      <header className="border-b border-black sticky top-0 z-50 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="bg-black text-white px-2.5 h-6 flex items-center text-[10px] tracking-widest" style={{ fontWeight: 700 }}>
              HOME
            </div>
            <span className="text-xs tracking-tight" style={{ fontWeight: 600 }}>
              Murrumbidgee Council Budget Viewer
            </span>
          </Link>

          {/* Nav links */}
          <nav className="flex items-center gap-0 ml-4 border-l border-gray-200 pl-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                null
              );
            })}
          </nav>

          {/* Right */}
          <div className="ml-auto flex items-center gap-3">
            <button className="flex items-center gap-2 bg-black text-white px-4 py-2 text-xs tracking-widest hover:bg-gray-900 transition-colors">
              <Download size={13} />
              {exportLabel}
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-4">
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-black flex items-center justify-center">
              <div className="w-2.5 h-2.5 border border-white" />
            </div>
            <span className="text-[10px] text-gray-400 tracking-wider uppercase">
              © 2024 Murrumbidgee Council Finance Department
            </span>
          </div>
          <div className="flex items-center gap-6 text-[10px] text-gray-400 tracking-wider uppercase">
            <span className="cursor-pointer hover:text-black">Privacy Policy</span>
            <span className="cursor-pointer hover:text-black">Accessibility</span>
            <span className="cursor-pointer hover:text-black">Council Portal</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
