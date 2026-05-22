import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { ChevronRight, Calendar, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { Layout } from './Layout';
import { SpendingChart } from './SpendingChart';
import { budgets, formatCurrency, TrendDataPoint } from '../data/mockData';

type FilterMode = 'year' | 'quarter' | 'month';

// Cumulative daily spend fractions for October 2024.
// Oct 1 = Tuesday. Weekends: 5-6, 12-13, 19-20, 26-27. Payroll spikes ~day 15 and 29.
const OCT_DAILY_FRACTIONS = [
  0.040, 0.080, 0.120, 0.150, 0.156, 0.161, // days 1–6
  0.206, 0.246, 0.286, 0.326, 0.356, 0.362, 0.367, // days 7–13
  0.417, 0.495, 0.535, 0.575, 0.605, 0.611, 0.616, // days 14–20
  0.661, 0.701, 0.741, 0.781, 0.811, 0.817, 0.822, // days 21–27
  0.872, 0.950, 0.980, 1.000,                        // days 28–31
];

// Q2 of FY24/25 = Oct, Nov, Dec (trendData indices 3, 4, 5).
// Values are relative to end of Q1 so the chart starts at zero.
// A baseline point at "Q2 start" anchors both lines at the origin.
function getCurrentQuarterData(data: TrendDataPoint[]): TrendDataPoint[] {
  const q1EndActual = data[2].actual ?? 0;
  const q1EndProjected = data[2].projected;
  return [
    { month: 'SEP', actual: 0, projected: 0 },
    { month: 'OCT', actual: data[3].actual !== null ? data[3].actual - q1EndActual : null, projected: data[3].projected - q1EndProjected },
    { month: 'NOV', actual: data[4].actual !== null ? data[4].actual - q1EndActual : null, projected: data[4].projected - q1EndProjected },
    { month: 'DEC', actual: data[5].actual !== null ? data[5].actual - q1EndActual : null, projected: data[5].projected - q1EndProjected },
  ];
}

// October 2024 daily breakdown, values relative to month start (= 0 at Oct 1).
// Month labels only on key days so the x-axis stays readable.
function getDailyData(data: TrendDataPoint[]): TrendDataPoint[] {
  const sepActual = data[2].actual ?? 0;
  const octActual = data[3].actual!;
  const monthActualTotal = octActual - sepActual;

  const sepProjected = data[2].projected;
  const octProjected = data[3].projected;
  const monthProjectedTotal = octProjected - sepProjected;

  const labelDays = new Set([1, 7, 14, 21, 28, 31]);

  return OCT_DAILY_FRACTIONS.map((fraction, i) => {
    const day = i + 1;
    return {
      month: labelDays.has(day) ? String(day) : '',
      actual: Math.round(fraction * monthActualTotal),
      projected: Math.round((day / 31) * monthProjectedTotal),
    };
  });
}

const recentAdjustments = [
  {
    id: 'adj1',
    code: 'JB',
    name: 'Public Lighting Retrofit',
    dept: 'Asset Management Dept.',
    amount: -42500,
    date: '12 OCT 2024',
    ref: 'RC-FY25-TX',
  },
  {
    id: 'adj2',
    code: 'AS',
    name: 'River Park Maintenance',
    dept: 'Environmental Services',
    amount: -12500,
    date: '10 OCT 2024',
    ref: 'RC-FY25-TY',
  },
];

const modePeriodLabel: Record<FilterMode, string> = {
  year: 'FY2024/25 · All months',
  quarter: 'Q2 FY24/25 · Oct – Dec',
  month: 'October 2024 · Daily view',
};

export default function TrendPage() {
  const { id } = useParams();
  const budget = budgets.find(b => b.id === id);
  const [mode, setMode] = useState<FilterMode>('year');

  if (!budget) {
    return (
      <Layout>
        <div className="max-w-[1400px] mx-auto px-6 py-16 text-center">
          <h2>Budget not found</h2>
          <Link to="/" className="text-xs tracking-widest uppercase border-b border-black mt-4 inline-block">Back</Link>
        </div>
      </Layout>
    );
  }

  const chartData =
    mode === 'year'    ? budget.trendData :
    mode === 'quarter' ? getCurrentQuarterData(budget.trendData) :
    getDailyData(budget.trendData);

  const currentActual = [...budget.trendData].reverse().find(d => d.actual !== null)?.actual ?? 0;
  const currentProjected = budget.trendData.find(d => d.actual !== null) !== undefined
    ? budget.trendData[budget.trendData.filter(d => d.actual !== null).length - 1]?.projected ?? 0
    : 0;

  const variancePct = currentProjected > 0
    ? ((currentActual - currentProjected) / currentProjected) * 100
    : 0;

  const isOverBudget = currentActual > currentProjected;

  const navItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Overview', path: `/budget/${budget.id}` },
    { label: 'Trends', path: `/budget/${budget.id}/trends` },
    { label: 'Departments', path: '/' },
  ];

  return (
    <Layout navItems={navItems} exportLabel="EXPORT DATA">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] text-gray-400 tracking-widest uppercase mb-3">
          <Link to="/" className="hover:text-black transition-colors">Dashboard</Link>
          <ChevronRight size={10} />
          <Link to={`/budget/${budget.id}`} className="hover:text-black transition-colors">{budget.name}</Link>
          <ChevronRight size={10} />
          <span className="text-black">Trends</span>
        </div>

        {/* Title */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-[9px] text-gray-400 tracking-widest uppercase mb-1">Financial Year 2024/25 &bull; As at 31 October 2024</p>
            <h1 className="uppercase" style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
              Spending Trends
            </h1>
          </div>
          {/* Mode filter */}
          <div className="flex border border-gray-300 overflow-hidden mt-2">
            {(['year', 'quarter', 'month'] as FilterMode[]).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-5 py-2 text-[10px] tracking-widest uppercase transition-colors ${mode === m ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-[1fr_300px] gap-6 mt-6">
          {/* Chart panel */}
          <div className="border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs tracking-widest uppercase" style={{ fontWeight: 700 }}>Expenditure Matrix</h2>
              <p className="text-[9px] text-gray-400 tracking-widest uppercase">{modePeriodLabel[mode]}</p>
            </div>
            <div className="h-[320px]">
              <SpendingChart data={chartData} />
            </div>
          </div>

          {/* Right stats panel */}
          <div className="flex flex-col gap-4">
            {/* Current variance */}
            <div className={`border p-4 ${isOverBudget ? 'border-red-300 bg-red-50' : 'border-green-300 bg-green-50'}`}>
              <p className="text-[9px] tracking-widest uppercase text-gray-500 mb-1">Current Variance</p>
              <div className="flex items-center gap-2">
                {isOverBudget ? <TrendingUp size={20} className="text-red-600" /> : <TrendingDown size={20} className="text-green-600" />}
                <span className={`text-2xl tabular-nums ${isOverBudget ? 'text-red-600' : 'text-green-600'}`} style={{ fontWeight: 700 }}>
                  {isOverBudget ? '+' : ''}{variancePct.toFixed(1)}%
                </span>
              </div>
              <p className={`text-[10px] mt-1 ${isOverBudget ? 'text-red-600' : 'text-green-700'}`}>
                {isOverBudget ? 'Actual above projected to date' : 'Actual below projected to date'}
              </p>
            </div>

            {/* Spending summary */}
            <div className="border border-gray-200 p-4">
              <p className="text-[9px] tracking-widest uppercase text-gray-400 mb-3">Spending Summary</p>
              <div className="space-y-2.5">
                {[
                  { label: 'Actual to Date', value: currentActual },
                  { label: 'Projected to Date', value: currentProjected },
                  { label: 'Committed', value: budget.committed },
                  { label: 'Total Budget', value: budget.totalBudget },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-500 tracking-wider uppercase">{item.label}</span>
                    <span className={`text-[11px] tabular-nums ${item.label === 'Committed' && budget.committed > budget.totalBudget ? 'text-red-600' : ''}`} style={{ fontWeight: 600 }}>
                      {formatCurrency(item.value)}
                    </span>
                  </div>
                ))}
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-500 tracking-wider uppercase">Variance</span>
                    <span className={`text-[11px] tabular-nums ${isOverBudget ? 'text-red-600' : 'text-green-600'}`} style={{ fontWeight: 600 }}>
                      {isOverBudget ? '+' : ''}{formatCurrency(currentActual - currentProjected)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Next review date */}
            <div className="border border-gray-200 p-4">
              <p className="text-[9px] tracking-widest uppercase text-gray-400 mb-2">Next Review Date</p>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-gray-600" />
                <span className="text-sm tracking-widest" style={{ fontWeight: 700 }}>NOV 14</span>
              </div>
              <p className="text-[10px] text-gray-400 mt-1">Audit scheduled for infrastructure projects.</p>
            </div>

            {/* Alert status */}
            {isOverBudget && (
              <div className="border border-red-600 bg-red-600 text-white p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={13} />
                  <p className="text-[9px] tracking-widest uppercase" style={{ fontWeight: 700 }}>Alert Status</p>
                </div>
                <p className="text-[10px] tracking-widest uppercase" style={{ fontWeight: 700 }}>Emergency Meeting</p>
                <p className="text-[10px] mt-1 opacity-90">Finance committee requested review of Public finance assessment.</p>
              </div>
            )}

            {!isOverBudget && (
              <div className="border border-green-200 bg-green-50 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={13} className="text-green-700" />
                  <p className="text-[9px] tracking-widest uppercase text-green-700" style={{ fontWeight: 700 }}>Alert Status</p>
                </div>
                <p className="text-[10px] tracking-wider uppercase text-green-800" style={{ fontWeight: 700 }}>No Active Alerts</p>
                <p className="text-[10px] mt-1 text-green-700">Budget tracking within acceptable thresholds.</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent adjustments */}
        <div className="mt-8 border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs tracking-widest uppercase" style={{ fontWeight: 700 }}>Recent Adjustments Logged</h2>
            <span className="text-[9px] text-gray-400 tracking-widest uppercase">ID: {budget.code}</span>
          </div>
          <div className="space-y-3">
            {recentAdjustments.map(adj => (
              <div key={adj.id} className="flex items-center gap-4 py-3 border-b border-gray-100">
                <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-[10px] shrink-0" style={{ fontWeight: 700 }}>
                  {adj.code}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px]" style={{ fontWeight: 600 }}>{adj.name}</p>
                  <p className="text-[9px] text-gray-400 tracking-wider uppercase mt-0.5">{adj.dept}</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] tabular-nums text-red-600" style={{ fontWeight: 700 }}>
                    {formatCurrency(adj.amount)}
                  </p>
                  <p className="text-[9px] text-gray-400 tracking-wider uppercase mt-0.5">{adj.date}</p>
                </div>
                <span className="text-[9px] text-gray-400 tracking-widest uppercase border border-gray-200 px-2 py-0.5 shrink-0 cursor-pointer hover:border-black hover:text-black transition-colors">
                  &gt;
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
