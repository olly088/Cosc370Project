import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { RotateCcw, Pin, Bell, ChevronRight, Search, ChevronDown } from 'lucide-react';
import { Layout } from './Layout';
import { budgets, notifications, formatK, formatCurrency, Budget } from '../data/mockData';

// ── Simulated logged-in user ──────────────────────────────────────────────────
const CURRENT_USER = 'Alex Morrison';
const CURRENT_TEAM = 'Infrastructure';

type ScopeMode = 'personal' | 'team' | 'all';

const STATUS_ORDER: Record<string, number> = {
  'over-budget': 0, 'watch': 1, 'on-track': 2, 'pending': 3,
};

function cardBorderClass(status: string) {
  if (status === 'over-budget') return 'border-red-300 hover:border-red-500';
  if (status === 'watch')       return 'border-gray-300 hover:border-black';
  return 'border-gray-200 hover:border-gray-400';
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'over-budget') return (
    <span className="bg-red-600 text-white text-[9px] tracking-widest px-2 py-0.5 uppercase">Over Budget</span>
  );
  if (status === 'watch') return (
    <span className="border border-black text-black text-[9px] tracking-widest px-2 py-0.5 uppercase">Watch</span>
  );
  if (status === 'on-track') return (
    <span className="bg-black text-white text-[9px] tracking-widest px-2 py-0.5 uppercase">On Track</span>
  );
  return (
    <span className="bg-black text-white text-[9px] tracking-widest px-2 py-0.5 uppercase">On Track</span>
  );
}

function CategoryBadge({ category }: { category: string }) {
  if (category === 'budget-update') return (
    <span className="bg-black text-white text-[9px] tracking-widest px-2 py-0.5 uppercase">Budget Update</span>
  );
  if (category === 'system-alert') return (
    <span className="bg-red-600 text-white text-[9px] tracking-widest px-2 py-0.5 uppercase">System Alert</span>
  );
  return (
    <span className="border border-black text-black text-[9px] tracking-widest px-2 py-0.5 uppercase">Team Edit</span>
  );
}

function BudgetCard({ budget, onClick }: { budget: Budget; onClick: () => void }) {
  return (
    <div onClick={onClick} className={`border cursor-pointer transition-colors ${cardBorderClass(budget.status)} p-6`}>
      <div className="flex items-start gap-4 mb-5">
        <StatusBadge status={budget.status} />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm truncate" style={{ fontWeight: 700 }}>{budget.name}</h3>
          <div className="flex items-center gap-3 mt-0.5">
            <span className="text-[10px] text-gray-500">#{budget.code}</span>
            <span className="text-[10px] text-gray-500">👤 {budget.manager}</span>
            <span className="text-[10px] text-gray-400">{budget.team} Team</span>
          </div>
        </div>
        <ChevronRight size={14} className="text-gray-400 shrink-0 mt-0.5" />
      </div>
      <div className="grid grid-cols-4 gap-4 mb-5 border-l border-gray-200 pl-4">
        {[
          { label: 'Income', value: budget.income.actuals },
          { label: 'Wages',  value: budget.wages.actuals, alert: budget.wages.remaining < 0 },
          { label: 'Plant',  value: budget.plant.actuals },
          { label: 'Other',  value: budget.other.actuals },
        ].map(cat => (
          <div key={cat.label}>
            <p className="text-[9px] text-gray-400 tracking-widest uppercase mb-0.5">{cat.label}</p>
            <p className={`text-sm tabular-nums ${cat.alert ? 'text-red-600' : 'text-black'}`} style={{ fontWeight: 700 }}>
              {formatK(cat.value)}
            </p>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {/* YTD Actual */}
        <div className="flex items-center gap-3">
          <span className="text-[9px] text-gray-400 tracking-widest uppercase shrink-0 w-20">YTD Actual</span>
          <div className="flex-1 h-2.5 bg-gray-200">
            <div className={`h-full ${budget.utilization > 100 ? 'bg-red-600' : 'bg-black'}`} style={{ width: `${Math.min(budget.utilization, 100)}%` }} />
          </div>
          <span className="text-[10px] tabular-nums text-gray-600 shrink-0 text-right min-w-[120px]">
            {formatCurrency(budget.totalActuals)}
            <span className={`ml-1.5 ${budget.utilization > 100 ? 'text-red-600' : 'text-black'}`} style={{ fontWeight: 700 }}>{budget.utilization}%</span>
          </span>
        </div>
        {/* Committed */}
        <div className="flex items-center gap-3">
          <span className="text-[9px] text-gray-400 tracking-widest uppercase shrink-0 w-20">Committed</span>
          <div className="flex-1 h-2.5 bg-gray-200">
            <div className={`h-full ${budget.committed > budget.totalBudget ? 'bg-red-600' : 'bg-gray-500'}`} style={{ width: `${Math.min((budget.committed / budget.totalBudget) * 100, 100)}%` }} />
          </div>
          <span className="text-[10px] tabular-nums text-gray-600 shrink-0 text-right min-w-[120px]">
            {formatCurrency(budget.committed)}
            <span className={`ml-1.5 ${budget.committed > budget.totalBudget ? 'text-red-600' : 'text-gray-800'}`} style={{ fontWeight: 700 }}>{((budget.committed / budget.totalBudget) * 100).toFixed(1)}%</span>
          </span>
        </div>
        {/* FY Elapsed */}
        <div className="flex items-center gap-3">
          <span className="text-[9px] text-gray-400 tracking-widest uppercase shrink-0 w-20">FY Elapsed</span>
          <div className="flex-1 h-2.5 bg-gray-200">
            <div className="h-full bg-gray-400" style={{ width: '33.7%' }} />
          </div>
          <span className="text-[10px] tabular-nums text-gray-500 shrink-0 text-right min-w-[120px]">
            31 Oct 2024 <span className="ml-1.5" style={{ fontWeight: 600 }}>33.7%</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [scope, setScope] = useState<ScopeMode>('personal');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [teamSelectFilter, setTeamSelectFilter] = useState('Select Team');
  const [search, setSearch] = useState('');

  // ── Filtering pipeline ──────────────────────────────────────────────────────
  const scopeFiltered = budgets.filter(b => {
    if (scope === 'personal') return b.manager === CURRENT_USER;
    if (scope === 'team')     return b.team === CURRENT_TEAM;
    return true;
  });

  const statusFiltered = scopeFiltered.filter(b => {
    switch (statusFilter) {
      case 'On Track':   return b.status === 'on-track';
      case 'Watch':      return b.status === 'watch';
      case 'Over Budget':return b.status === 'over-budget';
      default:           return true;
    }
  });

  const teamFiltered = statusFiltered.filter(b =>
    teamSelectFilter === 'Select Team' || b.team === teamSelectFilter
  );

  const searchFiltered = teamFiltered.filter(b =>
    !search ||
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.code.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...searchFiltered].sort(
    (a, b) => (STATUS_ORDER[a.status] ?? 4) - (STATUS_ORDER[b.status] ?? 4)
  );

  const displayedBudgets = sorted.slice(0, 3);
  const extraCount = sorted.length - 3;
  const pinnedBudgets = budgets.filter(b => b.pinned);

  // Global search — searches all budgets, ignores scope/status/team filters
  const isSearching = search.trim() !== '';
  const searchResults = isSearching
    ? budgets
        .filter(b =>
          b.name.toLowerCase().includes(search.toLowerCase()) ||
          b.code.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => (STATUS_ORDER[a.status] ?? 4) - (STATUS_ORDER[b.status] ?? 4))
        .slice(0, 4)
    : [];

  // Section title
  const sectionTitle = teamSelectFilter !== 'Select Team'
    ? `${teamSelectFilter} Team`
    : { personal: `${CURRENT_USER.split(' ')[0]}'s Budgets`, team: `${CURRENT_TEAM} Team`, all: 'All Budgets' }[scope];

  const recentNotifications = notifications.slice(0, 3);
  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('');
  const avatarColors: Record<string, string> = {
    SJ: 'bg-blue-600', RC: 'bg-green-600', AM: 'bg-purple-600', MS: 'bg-orange-500',
  };

  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-1">
          <div>
            <h1 className="tracking-tight uppercase" style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
              Budget Dashboard
            </h1>
            <p className="text-xs text-gray-500 tracking-wider mt-1 uppercase">
              Financial Year 2024/25 &bull; Last Updated: 12:40 PM
            </p>
          </div>
        </div>

        {/* Greeting */}
        <p className="text-[11px] text-gray-500 mb-6 mt-2">
          Hello <span style={{ fontWeight: 600 }}>{CURRENT_USER}</span> — {CURRENT_TEAM} Team
        </p>

        {/* Filter bar */}
        <div className="border border-gray-200 p-4 mb-8 flex items-center gap-6 bg-gray-50">
          {/* Scope toggle */}
          <div>
            <p className="text-[9px] text-gray-500 tracking-widest uppercase mb-1.5">Global Scope</p>
            <div className="flex border border-black overflow-hidden">
              {(['personal', 'team', 'all'] as ScopeMode[]).map(s => (
                <button
                  key={s}
                  onClick={() => {
                    setScope(s);
                    if (s !== 'all') setTeamSelectFilter('Select Team');
                  }}
                  className={`px-4 py-1.5 text-[10px] tracking-widest uppercase transition-colors capitalize ${scope === s ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Status filter */}
          <div>
            <p className="text-[9px] text-gray-500 tracking-widest uppercase mb-1.5">Status Filter</p>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="appearance-none border border-gray-300 px-3 py-1.5 pr-8 text-[10px] tracking-wider bg-white cursor-pointer"
              >
                <option>All Statuses</option>
                <option>On Track</option>
                <option>Watch</option>
                <option>Over Budget</option>
              </select>
              <ChevronDown size={11} className="absolute right-2 top-2.5 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Team select */}
          <div>
            <p className="text-[9px] text-gray-500 tracking-widest uppercase mb-1.5">Team Select</p>
            <div className="relative">
              <select
                value={teamSelectFilter}
                onChange={e => {
                  setTeamSelectFilter(e.target.value);
                  if (e.target.value !== 'Select Team') setScope('all');
                }}
                className="appearance-none border border-gray-300 px-3 py-1.5 pr-8 text-[10px] tracking-wider bg-white cursor-pointer min-w-[200px]"
              >
                <option>Select Team</option>
                <option>Infrastructure</option>
                <option>Community Services</option>
                <option>Operations</option>
                <option>Events & Culture</option>
              </select>
              <ChevronDown size={11} className="absolute right-2 top-2.5 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Search */}
          <div className="ml-auto">
            <p className="text-[9px] text-gray-500 tracking-widest uppercase mb-1.5">Search</p>
            <div className="relative">
              <input
                type="text"
                placeholder="Project name or code..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="border border-gray-300 px-3 py-1.5 pl-3 pr-8 text-[10px] tracking-wider bg-white w-52"
              />
              <Search size={11} className="absolute right-2 top-2.5 text-gray-400" />
            </div>
          </div>
        </div>

        {isSearching ? (
          /* ── Search results mode ── */
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs tracking-widest uppercase" style={{ fontWeight: 700 }}>Found Budgets</h2>
              <span className="text-[10px] text-gray-400 tracking-wider uppercase">
                {searchResults.length === 0
                  ? 'No results'
                  : `${searchResults.length} of ${budgets.filter(b =>
                      b.name.toLowerCase().includes(search.toLowerCase()) ||
                      b.code.toLowerCase().includes(search.toLowerCase())
                    ).length} result${searchResults.length !== 1 ? 's' : ''}`}
              </span>
            </div>
            {searchResults.length === 0 ? (
              <div className="border border-gray-200 p-10 text-center">
                <p className="text-[11px] text-gray-400 tracking-wider uppercase">No budgets found matching "{search}"</p>
              </div>
            ) : (
              <div className="space-y-4">
                {searchResults.map(budget => (
                  <BudgetCard key={budget.id} budget={budget} onClick={() => navigate(`/budget/${budget.id}`)} />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* ── Normal two-column layout ── */
          <div className="grid grid-cols-[1fr_380px] gap-8">
            {/* Left column */}
            <div>
              {/* Budget overview */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xs tracking-widest uppercase" style={{ fontWeight: 700 }}>{sectionTitle}</h2>
                  {extraCount > 0 && (
                    <span className="text-[10px] text-gray-400 tracking-wider uppercase">
                      Showing 3 of {sorted.length}
                    </span>
                  )}
                </div>
                {displayedBudgets.length === 0 ? (
                  <div className="border border-gray-200 p-8 text-center">
                    <p className="text-[11px] text-gray-400 tracking-wider uppercase">No budgets match the current filters</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {displayedBudgets.map(budget => (
                      <BudgetCard key={budget.id} budget={budget} onClick={() => navigate(`/budget/${budget.id}`)} />
                    ))}
                  </div>
                )}
              </div>

              {/* Pinned budgets */}
              {pinnedBudgets.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xs tracking-widest uppercase" style={{ fontWeight: 700 }}>Pinned Budgets</h2>
                    <Pin size={14} className="text-gray-400" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {pinnedBudgets.map(budget => (
                      <div
                        key={budget.id}
                        className="border border-gray-200 p-4 cursor-pointer hover:border-black transition-colors"
                        onClick={() => navigate(`/budget/${budget.id}`)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-sm" style={{ fontWeight: 700 }}>{budget.name}</h3>
                          <StatusBadge status={budget.status} />
                        </div>
                        <p className="text-[10px] text-gray-400 tracking-widest uppercase mb-3">{budget.code}</p>
                        <div className="mb-1">
                          <div className="h-2 bg-gray-100 w-full">
                            <div className={`h-full ${budget.utilization > 100 ? 'bg-red-600' : 'bg-black'}`} style={{ width: `${Math.min(budget.utilization, 100)}%` }} />
                          </div>
                        </div>
                        <p className="text-[10px] text-gray-500 mb-3 tabular-nums">{budget.utilization}% Utilised</p>
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { label: 'Wages', value: budget.wages.actuals },
                            { label: 'Plant', value: budget.plant.actuals },
                            { label: 'Other', value: budget.other.actuals },
                            { label: 'Inc',   value: budget.income.actuals },
                          ].map(cat => (
                            <div key={cat.label}>
                              <p className="text-[9px] text-gray-400 tracking-widest uppercase">{cat.label}</p>
                              <p className="text-[10px] tabular-nums" style={{ fontWeight: 600 }}>{formatK(cat.value)}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right column – recent activity */}
            <div>
              <div className="border border-gray-200">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                  <h2 className="text-xs tracking-widest uppercase" style={{ fontWeight: 700 }}>Recent Activity</h2>
                  <RotateCcw size={13} className="text-gray-400 cursor-pointer hover:text-black transition-colors" />
                </div>
                <div className="divide-y divide-gray-100">
                  {recentNotifications.map(notif => {
                    const initials = notif.metadata.author === 'SYSTEM' ? '!' : getInitials(notif.metadata.author);
                    const bgColor = avatarColors[initials] || 'bg-gray-600';
                    const isSystem = notif.metadata.author === 'SYSTEM';
                    return (
                      <div key={notif.id} className="px-4 py-3">
                        <div className="flex items-start gap-3">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-[9px] shrink-0 ${isSystem ? 'bg-red-600' : bgColor}`}>
                            {isSystem ? <Bell size={11} /> : initials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] leading-snug text-gray-800">{notif.description}</p>
                            <p className="text-[10px] text-gray-400 mt-1 tracking-wider uppercase">{notif.timestamp.split(' ')[0]}</p>
                          </div>
                          {notif.valuation !== null && (
                            <p className={`text-[11px] tabular-nums shrink-0 ${notif.valuation < 0 ? 'text-red-600' : 'text-black'}`} style={{ fontWeight: 600 }}>
                              {notif.valuation > 0 ? '+' : ''}{formatK(notif.valuation)}
                            </p>
                          )}
                          {notif.status === 'over-budget' && (
                            <span className="text-[9px] text-red-600 uppercase tracking-widest shrink-0">Alert</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="px-4 py-3 border-t border-gray-200">
                  <Link to="/notifications" className="flex items-center justify-center gap-2 w-full py-2 text-[10px] tracking-widest uppercase border border-black hover:bg-black hover:text-white transition-colors">
                    View All Notifications
                    <ChevronRight size={11} />
                  </Link>
                </div>
                <div className="mx-4 mb-4 p-4 bg-gray-50 border border-gray-200">
                  <h4 className="text-[10px] tracking-widest uppercase mb-1" style={{ fontWeight: 700 }}>Support & FAQ</h4>
                  <p className="text-[10px] text-gray-500 mb-3">Need help with budget forecasting? Contact the Council Finance team on extension 404.</p>
                  <Link to="/contact" className="block w-full bg-black text-white text-[10px] tracking-widest uppercase py-2 hover:bg-gray-800 transition-colors text-center">
                    Contact Finance
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
