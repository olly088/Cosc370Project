import { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { Layout } from './Layout';
import { notifications, Notification, formatCurrency } from '../data/mockData';

type FilterTab = 'all' | 'budget-update' | 'system-alert' | 'team-edit';

function CategoryBadge({ category }: { category: string }) {
  if (category === 'budget-update') return (
    <span className="bg-black text-white text-[9px] tracking-widest px-2 py-0.5 uppercase whitespace-nowrap">Budget Update</span>
  );
  if (category === 'system-alert') return (
    <span className="bg-red-600 text-white text-[9px] tracking-widest px-2 py-0.5 uppercase whitespace-nowrap">System Alert</span>
  );
  return (
    <span className="border border-black text-black text-[9px] tracking-widest px-2 py-0.5 uppercase whitespace-nowrap">Team Edit</span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    committed: 'text-black border border-black',
    pending: 'text-gray-500 border border-gray-400',
    'over-budget': 'bg-red-600 text-white',
    variance: 'text-red-600 border border-red-600',
    notified: 'text-gray-600 border border-gray-400',
    'system-sync': 'text-gray-500 border border-gray-300',
  };
  const labels: Record<string, string> = {
    committed: 'Committed',
    pending: 'Pending',
    'over-budget': 'Over Budget',
    variance: 'Variance',
    notified: 'Notified',
    'system-sync': 'System-Sync',
  };
  return (
    <span className={`text-[9px] tracking-widest px-2 py-0.5 uppercase whitespace-nowrap ${styles[status] || 'text-gray-400 border border-gray-300'}`}>
      {labels[status] || status}
    </span>
  );
}

const ITEMS_PER_PAGE = 10;

function NotificationRow({ notif }: { notif: Notification }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr
        className={`cursor-pointer transition-colors border-b border-gray-100 ${expanded ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
        onClick={() => setExpanded(e => !e)}
      >
        <td className="py-3 pl-4 pr-2 w-20">
          <span className="text-[10px] text-gray-400 tabular-nums tracking-wider">{notif.id}</span>
        </td>
        <td className="py-3 px-2 w-36">
          <span className="text-[10px] text-gray-500 tabular-nums tracking-wider whitespace-nowrap">{notif.timestamp}</span>
        </td>
        <td className="py-3 px-2 w-28">
          <CategoryBadge category={notif.category} />
        </td>
        <td className="py-3 px-2">
          <span className="text-[11px] text-gray-800">{notif.description}</span>
        </td>
        <td className="py-3 px-2 text-right w-32">
          {notif.valuation !== null ? (
            <span className={`text-[11px] tabular-nums ${notif.valuation < 0 ? 'text-red-600' : 'text-black'}`} style={{ fontWeight: 600 }}>
              {notif.valuation >= 0 ? '+' : ''}{formatCurrency(notif.valuation)}
            </span>
          ) : (
            <span className="text-[10px] text-gray-300">—</span>
          )}
        </td>
        <td className="py-3 pl-2 pr-2 w-24">
          <StatusBadge status={notif.status} />
        </td>
        <td className="py-3 pl-2 pr-4 w-8 text-gray-400">
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </td>
      </tr>
      {expanded && (
        <tr className="bg-gray-50 border-b border-gray-200">
          <td colSpan={7} className="px-6 py-4">
            <div className="grid grid-cols-[1fr_240px] gap-6">
              {/* Message */}
              <div>
                <p className="text-[9px] text-gray-400 tracking-widest uppercase mb-2">Detailed Message / Internal Note</p>
                <p className="text-[11px] text-gray-700 leading-relaxed">{notif.message}</p>
              </div>
              {/* Metadata */}
              <div>
                <p className="text-[9px] text-gray-400 tracking-widest uppercase mb-2">Metadata</p>
                <div className="space-y-2">
                  {[
                    { label: 'Author', value: notif.metadata.author },
                    { label: 'Reference #', value: notif.metadata.reference },
                    { label: 'Status', value: notif.metadata.status },
                  ].map(m => (
                    <div key={m.label} className="flex items-center justify-between">
                      <span className="text-[9px] text-gray-400 tracking-widest uppercase">{m.label}</span>
                      <span className="text-[10px] tabular-nums" style={{ fontWeight: 600 }}>{m.value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="text-[9px] tracking-widest uppercase border border-black px-3 py-1.5 hover:bg-black hover:text-white transition-colors">
                    View Full Report
                  </button>
                  <button className="text-[9px] tracking-widest uppercase border border-gray-300 px-3 py-1.5 hover:border-black transition-colors text-gray-500 hover:text-black">
                    Audit Log
                  </button>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [page, setPage] = useState(1);

  const filtered = notifications.filter(n =>
    activeFilter === 'all' ? true : n.category === activeFilter
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: 'all', label: 'All Events', count: notifications.length },
    { key: 'budget-update', label: 'Budget Updates', count: notifications.filter(n => n.category === 'budget-update').length },
    { key: 'system-alert', label: 'System Alerts', count: notifications.filter(n => n.category === 'system-alert').length },
    { key: 'team-edit', label: 'Team Edits', count: notifications.filter(n => n.category === 'team-edit').length },
  ];

  const handleFilterChange = (key: FilterTab) => {
    setActiveFilter(key);
    setPage(1);
  };

  const navItems = [
    { label: 'MY BUDGETS', path: '/' },
    { label: 'RECENT ACTIVITY', path: '/notifications' },
    { label: 'DEPARTMENT ANALYSIS', path: '/' },
  ];

  return (
    <Layout navItems={navItems}>
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="uppercase" style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            System Ledger
          </h1>
          <p className="text-[10px] text-gray-400 tracking-widest uppercase mt-1">
            Historical Audit Log: All Financial Modifications and System Events
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center mb-4">
          <div className="flex items-center border border-gray-200 overflow-hidden">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => handleFilterChange(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 text-[10px] tracking-widest uppercase transition-colors border-r border-gray-200 last:border-r-0 ${activeFilter === tab.key ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {tab.label}
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${activeFilter === tab.key ? 'bg-white text-black' : 'bg-gray-100 text-gray-500'}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 pl-4 pr-2 text-[9px] tracking-widest uppercase text-gray-400">ID</th>
                <th className="text-left py-3 px-2 text-[9px] tracking-widest uppercase text-gray-400">Timestamp</th>
                <th className="text-left py-3 px-2 text-[9px] tracking-widest uppercase text-gray-400">Category</th>
                <th className="text-left py-3 px-2 text-[9px] tracking-widest uppercase text-gray-400">Event Description</th>
                <th className="text-right py-3 px-2 text-[9px] tracking-widest uppercase text-gray-400">Valuation</th>
                <th className="text-left py-3 pl-2 pr-2 text-[9px] tracking-widest uppercase text-gray-400">Status</th>
                <th className="w-8" />
              </tr>
            </thead>
            <tbody>
              {paged.map(notif => (
                <NotificationRow key={notif.id} notif={notif} />
              ))}
            </tbody>
          </table>

          {/* Pagination footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
            <span className="text-[10px] text-gray-400 tracking-wider uppercase">
              Displaying {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} entries
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-7 h-7 flex items-center justify-center border border-gray-300 hover:border-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={12} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-7 h-7 flex items-center justify-center border text-[10px] transition-colors ${page === p ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-black'}`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-1 px-3 h-7 border border-gray-300 hover:border-black transition-colors text-[10px] tracking-widest uppercase disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next <ChevronRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
