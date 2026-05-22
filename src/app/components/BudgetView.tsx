import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import {
  ChevronRight, ChevronDown, ChevronUp, TrendingUp,
  AlertTriangle, CheckCircle,
} from 'lucide-react';
import { Layout } from './Layout';
import { budgets, formatCurrency, SubLineItem } from '../data/mockData';

type CategoryKey = 'income' | 'wages' | 'plant' | 'other';

const categoryLabels: Record<CategoryKey, string> = {
  income: 'Income',
  wages: 'Wages',
  plant: 'Plant',
  other: 'Other',
};

const authorColors: Record<string, string> = {
  SJ: 'bg-blue-600',
  RC: 'bg-green-600',
  AM: 'bg-purple-600',
  MS: 'bg-orange-500',
  DP: 'bg-teal-600',
  FS: 'bg-gray-700',
  JL: 'bg-indigo-600',
  YO: 'bg-gray-400',
};

interface CommentReply {
  id: string;
  author: string;
  initials: string;
  timestamp: string;
  text: string;
  votes: number;
}

interface BudgetComment {
  id: string;
  author: string;
  initials: string;
  timestamp: string;
  text: string;
  votes: number;
  replies: CommentReply[];
}

const BUDGET_COMMENTS: BudgetComment[] = [
  {
    id: 'c1',
    author: 'Sarah Jenkins',
    initials: 'SJ',
    timestamp: '25 Oct 2024 · 9:14 AM',
    text: 'Reviewed the latest expenditure report. Wages are tracking above forecast due to extended shift requirements in the second half of October. Recommend weekly monitoring until the Q2 review on the 14th.',
    votes: 6,
    replies: [
      {
        id: 'c1r1',
        author: 'R. Chen',
        initials: 'RC',
        timestamp: '25 Oct 2024 · 11:32 AM',
        text: 'Agreed. Have flagged this with the Finance Director ahead of the November audit. Will circulate the updated actuals sheet by end of week.',
        votes: 2,
      },
      {
        id: 'c1r2',
        author: 'A. Morrison',
        initials: 'AM',
        timestamp: '26 Oct 2024 · 8:47 AM',
        text: 'Supplementary allocation request is being drafted — expect to submit by 1 Nov pending Director approval.',
        votes: 1,
      },
    ],
  },
  {
    id: 'c2',
    author: 'Finance System',
    initials: 'FS',
    timestamp: '24 Oct 2024 · 2:22 PM',
    text: 'AUTOMATED NOTICE: Budget utilisation has exceeded the 85% early-warning threshold for this period. A review has been scheduled for 14 November.',
    votes: 3,
    replies: [
      {
        id: 'c2r1',
        author: 'D. Park',
        initials: 'DP',
        timestamp: '24 Oct 2024 · 3:05 PM',
        text: 'Acknowledged. The contingency works order for Q4 has been deferred pending the outcome of the November review.',
        votes: 1,
      },
    ],
  },
  {
    id: 'c3',
    author: 'M. Santos',
    initials: 'MS',
    timestamp: '22 Oct 2024 · 10:18 AM',
    text: 'Confirmed with Operations: the Q2 spend acceleration is attributable to emergency plant mobilisation following the storm event on 18 Oct. This was unavoidable and is consistent with the force majeure clause in the operational agreement.',
    votes: 8,
    replies: [],
  },
];

function StatusFlag({ status }: { status: string }) {
  if (status === 'over-budget') return (
    <div className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white">
      <AlertTriangle size={13} />
      <span className="text-[10px] tracking-widest uppercase">Over Budget</span>
    </div>
  );
  if (status === 'watch') return (
    <div className="flex items-center gap-2 px-3 py-2 border border-black">
      <AlertTriangle size={13} />
      <span className="text-[10px] tracking-widest uppercase">Watch</span>
    </div>
  );
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-black text-white">
      <CheckCircle size={13} />
      <span className="text-[10px] tracking-widest uppercase">On Track</span>
    </div>
  );
}

function SubLineRow({ item, isLast }: { item: SubLineItem; isLast: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const remaining = item.remaining;
  const isNeg = remaining < 0;

  return (
    <>
      <tr
        className={`cursor-pointer hover:bg-gray-50 transition-colors ${!isLast ? 'border-b border-gray-100' : ''} ${expanded ? 'bg-gray-50' : ''}`}
        onClick={() => setExpanded(e => !e)}
      >
        <td className="py-2.5 pl-4 pr-2">
          <div className="flex items-center gap-2">
            {expanded ? <ChevronUp size={12} className="text-gray-400 shrink-0" /> : <ChevronDown size={12} className="text-gray-400 shrink-0" />}
            <span className="text-[11px]">{item.name}</span>
          </div>
        </td>
        <td className="py-2.5 px-2 text-right text-[11px] tabular-nums">{formatCurrency(item.budget)}</td>
        <td className={`py-2.5 px-2 text-right text-[11px] tabular-nums ${isNeg ? 'text-red-600' : ''}`} style={{ fontWeight: 600 }}>
          {formatCurrency(item.actuals)}
        </td>
        <td className={`py-2.5 pl-2 pr-4 text-right text-[11px] tabular-nums ${isNeg ? 'text-red-600' : 'text-gray-600'}`}>
          {formatCurrency(remaining)}
        </td>
      </tr>
      {expanded && item.subItems.length > 0 && (
        <tr className="bg-gray-50">
          <td colSpan={4} className="py-0">
            <div className="border-l-2 border-gray-300 ml-8 mb-2">
              {item.subItems.map((sub, i) => (
                <div key={sub.id} className={`flex items-center justify-between px-4 py-2 ${i !== item.subItems.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div>
                    <p className="text-[10px]" style={{ fontWeight: 600 }}>{sub.name}</p>
                    <p className="text-[9px] text-gray-400 tracking-wider uppercase mt-0.5">{sub.date}</p>
                  </div>
                  <span className="text-[11px] tabular-nums" style={{ fontWeight: 600 }}>
                    {formatCurrency(sub.amount)}
                  </span>
                </div>
              ))}
            </div>
          </td>
        </tr>
      )}
      {expanded && item.subItems.length === 0 && (
        <tr className="bg-gray-50">
          <td colSpan={4} className="py-3 pl-12 text-[10px] text-gray-400 tracking-wider uppercase">
            No sub-items recorded
          </td>
        </tr>
      )}
    </>
  );
}

export default function BudgetView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const budget = budgets.find(b => b.id === id);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('wages');

  // Discussion state
  const [comments, setComments] = useState<BudgetComment[]>(BUDGET_COMMENTS);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [showAddComment, setShowAddComment] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set(['c1', 'c2']));

  if (!budget) {
    return (
      <Layout>
        <div className="max-w-[1400px] mx-auto px-6 py-16 text-center">
          <h2 className="text-xl tracking-tight" style={{ fontWeight: 700 }}>Budget not found</h2>
          <Link to="/" className="text-xs tracking-widest uppercase border-b border-black mt-4 inline-block">Back to Dashboard</Link>
        </div>
      </Layout>
    );
  }

  const categories: CategoryKey[] = ['income', 'wages', 'plant', 'other'];
  const totalBudget = budget.income.budget + budget.wages.budget + budget.plant.budget + budget.other.budget;
  const totalForecast = budget.income.actuals + budget.wages.actuals + budget.plant.actuals + budget.other.actuals;
  const totalForecastRemaining = totalBudget - totalForecast;

  const breakdownMap: Record<CategoryKey, SubLineItem[]> = {
    income: budget.incomeBreakdown,
    wages: budget.wagesBreakdown,
    plant: budget.plantBreakdown,
    other: budget.otherBreakdown,
  };

  const selectedData = budget[selectedCategory];
  const selectedBreakdown = breakdownMap[selectedCategory];

  const isExpenditureAlert =
    (selectedCategory === 'wages' && budget.wages.remaining < 0) ||
    (selectedCategory === 'plant' && budget.plant.remaining < 0);

  const toggleReplies = (commentId: string) => {
    setExpandedReplies(prev => {
      const next = new Set(prev);
      if (next.has(commentId)) next.delete(commentId);
      else next.add(commentId);
      return next;
    });
  };

  const submitReply = (commentId: string) => {
    if (!replyText.trim()) return;
    setComments(prev => prev.map(c => c.id === commentId ? {
      ...c,
      replies: [...c.replies, {
        id: `${c.id}r${Date.now()}`,
        author: 'You',
        initials: 'YO',
        timestamp: 'Just now',
        text: replyText,
        votes: 1,
      }],
    } : c));
    setExpandedReplies(prev => new Set([...prev, commentId]));
    setReplyingTo(null);
    setReplyText('');
  };

  const submitNewComment = () => {
    if (!newCommentText.trim()) return;
    setComments(prev => [{
      id: `c${Date.now()}`,
      author: 'You',
      initials: 'YO',
      timestamp: 'Just now',
      text: newCommentText,
      votes: 1,
      replies: [],
    }, ...prev]);
    setNewCommentText('');
    setShowAddComment(false);
  };

  const navItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Overview', path: `/budget/${budget.id}` },
    { label: 'Trends', path: `/budget/${budget.id}/trends` },
    { label: 'Departments', path: '/' },
  ];

  return (
    <Layout navItems={navItems}>
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] text-gray-400 tracking-widest uppercase mb-3">
          <Link to="/" className="hover:text-black transition-colors">Scope</Link>
          <ChevronRight size={10} />
          <span className="text-black">Budget Detail</span>
        </div>

        {/* Title row */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[10px] tracking-widest uppercase text-gray-400 border border-gray-300 px-2 py-0.5">
                {budget.code}
              </span>
              <span className="text-[10px] tracking-widest uppercase text-gray-400">Operational View</span>
            </div>
            <h1 className="uppercase" style={{ fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              {budget.name}
            </h1>
          </div>
        </div>

        <p className="text-[10px] text-gray-400 tracking-widest uppercase mb-6">Current Period: Q2 FY25</p>

        {/* Split layout */}
        <div className="grid grid-cols-2 gap-6">
          {/* LEFT: Financial Summary */}
          <div className="border border-gray-200 p-5">
            <h2
              className="tracking-widest uppercase mb-4"
              style={{ fontSize: '1.2rem', fontWeight: 700 }}
            >
              Financial Summary
            </h2>

            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-[9px] tracking-widest uppercase text-gray-400">Category</th>
                  <th className="text-right py-2 text-[9px] tracking-widest uppercase text-gray-400">Budget</th>
                  <th className="text-right py-2 text-[9px] tracking-widest uppercase text-gray-400">YTD Actual</th>
                  <th className="text-right py-2 text-[9px] tracking-widest uppercase text-gray-400">Forecast</th>
                  <th className="text-right py-2 text-[9px] tracking-widest uppercase text-gray-400">Remaining</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(cat => {
                  const data = budget[cat];
                  const isOver = data.remaining < 0;
                  const isSelected = selectedCategory === cat;
                  return (
                    <tr
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`cursor-pointer border-b border-gray-100 transition-colors ${isSelected ? 'bg-gray-900 text-white' : 'hover:bg-gray-50'}`}
                    >
                      <td className={`py-3 pl-3 text-[11px] tracking-wider uppercase ${isSelected ? 'text-white' : 'text-gray-700'}`} style={{ fontWeight: 600 }}>
                        {categoryLabels[cat]}
                      </td>
                      <td className={`py-3 px-2 text-right text-[11px] tabular-nums ${isSelected ? 'text-gray-300' : 'text-gray-600'}`}>
                        {formatCurrency(data.budget)}
                      </td>
                      <td className={`py-3 px-2 text-right text-[11px] tabular-nums ${isSelected ? 'text-gray-200' : 'text-gray-700'}`} style={{ fontWeight: 600 }}>
                        {formatCurrency(budget.ytdActuals[cat])}
                      </td>
                      <td className={`py-3 px-2 text-right text-[11px] tabular-nums ${isOver && !isSelected ? 'text-red-600' : isSelected ? 'text-white' : 'text-black'}`} style={{ fontWeight: 600 }}>
                        {formatCurrency(data.actuals)}
                      </td>
                      <td className={`py-3 pl-2 pr-3 text-right text-[11px] tabular-nums ${isOver && !isSelected ? 'text-red-600' : isSelected ? 'text-gray-300' : 'text-gray-600'}`}>
                        {formatCurrency(data.remaining)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-black">
                  <td className="pt-3 pl-3 text-[11px] tracking-wider uppercase" style={{ fontWeight: 700 }}>Total</td>
                  <td className="pt-3 px-2 text-right text-[11px] tabular-nums text-gray-600">{formatCurrency(totalBudget)}</td>
                  <td className="pt-3 px-2 text-right text-[11px] tabular-nums text-gray-700" style={{ fontWeight: 600 }}>{formatCurrency(budget.totalActuals)}</td>
                  <td className="pt-3 px-2 text-right text-[11px] tabular-nums" style={{ fontWeight: 700 }}>{formatCurrency(totalForecast)}</td>
                  <td className={`pt-3 pl-2 pr-3 text-right text-[11px] tabular-nums ${totalForecastRemaining < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                    {formatCurrency(totalForecastRemaining)}
                  </td>
                </tr>
              </tfoot>
            </table>

            {/* YTD Actual + Committed bars */}
            <div className="mt-6 pt-4 border-t border-gray-200 space-y-4">
              {/* YTD Actual */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] tracking-widest uppercase text-gray-500">YTD Actual</span>
                  <span className="text-[10px] tabular-nums text-gray-600">
                    {formatCurrency(budget.totalActuals)}
                    <span className={`ml-2 ${budget.utilization > 100 ? 'text-red-600' : 'text-black'}`} style={{ fontWeight: 700 }}>
                      {budget.utilization}%
                    </span>
                  </span>
                </div>
                <div className="h-2.5 bg-gray-100 w-full">
                  <div
                    className={`h-full transition-all ${budget.utilization > 100 ? 'bg-red-600' : 'bg-black'}`}
                    style={{ width: `${Math.min(budget.utilization, 100)}%` }}
                  />
                </div>
              </div>

              {/* Committed */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] tracking-widest uppercase text-gray-500">Committed</span>
                  <span className="text-[10px] tabular-nums text-gray-600">
                    {formatCurrency(budget.committed)}
                    <span
                      className={`ml-2 ${budget.committed > budget.totalBudget ? 'text-red-600' : 'text-gray-800'}`}
                      style={{ fontWeight: 700 }}
                    >
                      {((budget.committed / budget.totalBudget) * 100).toFixed(1)}%
                    </span>
                  </span>
                </div>
                <div className="h-2.5 bg-gray-100 w-full">
                  <div
                    className={`h-full transition-all ${budget.committed > budget.totalBudget ? 'bg-red-600' : 'bg-gray-500'}`}
                    style={{ width: `${Math.min((budget.committed / budget.totalBudget) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* View Trends button */}
              <div className="pt-1 flex justify-center">
                <button
                  onClick={() => navigate(`/budget/${budget.id}/trends`)}
                  className="flex items-center gap-2 bg-black text-white px-10 py-3 text-[10px] tracking-widest uppercase hover:bg-gray-800 transition-colors"
                >
                  <TrendingUp size={14} />
                  View Trends
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Category Breakdown */}
          <div className="border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2
                className="tracking-widest uppercase"
                style={{ fontSize: '1.2rem', fontWeight: 700 }}
              >
                {categoryLabels[selectedCategory]}
              </h2>
              <span className="text-[9px] text-gray-400 tracking-wider uppercase">Active Flags & Intelligence</span>
            </div>

            {/* Status flags */}
            <div className="flex items-center gap-3 mb-5">
              <StatusFlag status={budget.status} />
              {isExpenditureAlert && (
                <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 text-red-600">
                  <AlertTriangle size={13} />
                  <span className="text-[10px] tracking-widest uppercase">Expenditure Alert: {categoryLabels[selectedCategory]}</span>
                </div>
              )}
            </div>

            {/* Category summary */}
            <div className="grid grid-cols-4 gap-3 mb-5 bg-gray-50 p-3">
              {[
                { label: 'Budget', value: selectedData.budget },
                { label: 'YTD Actual', value: budget.ytdActuals[selectedCategory] },
                { label: 'Forecast', value: selectedData.actuals, bold: true, red: selectedData.remaining < 0 },
                { label: 'Remaining', value: selectedData.remaining, red: selectedData.remaining < 0 },
              ].map(item => (
                <div key={item.label}>
                  <p className="text-[9px] text-gray-400 tracking-widest uppercase mb-0.5">{item.label}</p>
                  <p className={`text-sm tabular-nums ${item.red ? 'text-red-600' : 'text-black'}`} style={{ fontWeight: item.bold ? 700 : 500 }}>
                    {formatCurrency(item.value)}
                  </p>
                </div>
              ))}
            </div>

            {/* Sub-line breakdown */}
            {selectedBreakdown.length > 0 ? (
              <div>
                <p className="text-[9px] text-gray-400 tracking-widest uppercase mb-2">Sub-Line Items</p>
                <div className="border border-gray-200">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="text-left py-2 pl-4 text-[9px] tracking-widest uppercase text-gray-400">Item</th>
                        <th className="text-right py-2 px-2 text-[9px] tracking-widest uppercase text-gray-400">Budget</th>
                        <th className="text-right py-2 px-2 text-[9px] tracking-widest uppercase text-gray-400">Actuals</th>
                        <th className="text-right py-2 pl-2 pr-4 text-[9px] tracking-widest uppercase text-gray-400">Remaining</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedBreakdown.map((item, i) => (
                        <SubLineRow key={item.id} item={item} isLast={i === selectedBreakdown.length - 1} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-[9px] text-gray-400 tracking-widest uppercase mb-3">Recent Transactions</p>
                <div className="space-y-2">
                  {budget.transactions.map(tx => (
                    <div key={tx.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div>
                        <p className="text-[11px]">{tx.description}</p>
                        <p className="text-[9px] text-gray-400 tracking-wider uppercase mt-0.5">{tx.date}</p>
                      </div>
                      <span className="text-[11px] tabular-nums" style={{ fontWeight: 600 }}>
                        {formatCurrency(tx.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Discussion */}
        <div className="mt-8 border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="tracking-widest uppercase" style={{ fontSize: '1.2rem', fontWeight: 700 }}>Discussion</h2>
            <button
              onClick={() => setShowAddComment(v => !v)}
              className="text-[10px] tracking-widest uppercase border border-gray-300 px-3 py-1.5 hover:border-black transition-colors"
            >
              + Add Comment
            </button>
          </div>

          {/* New comment form */}
          {showAddComment && (
            <div className="mb-6 border border-gray-200 p-4 bg-gray-50">
              <textarea
                value={newCommentText}
                onChange={e => setNewCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="w-full border border-gray-200 bg-white px-3 py-2 text-[12px] text-gray-700 resize-none focus:outline-none focus:border-black transition-colors mb-3"
                rows={3}
                autoFocus
              />
              <div className="flex items-center gap-2 justify-end">
                <button
                  onClick={() => { setShowAddComment(false); setNewCommentText(''); }}
                  className="text-[10px] tracking-widest uppercase text-gray-500 hover:text-black px-3 py-1.5"
                >
                  Cancel
                </button>
                <button
                  onClick={submitNewComment}
                  className="text-[10px] tracking-widest uppercase bg-black text-white px-4 py-1.5 hover:bg-gray-800 transition-colors"
                >
                  Post
                </button>
              </div>
            </div>
          )}

          {/* Comment threads */}
          <div>
            {comments.map((comment, idx) => (
              <div
                key={comment.id}
                className={`py-5 ${idx !== comments.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                {/* Comment header + body */}
                <div className="flex items-start gap-3">
                  <div
                    className={`w-7 h-7 flex items-center justify-center text-[9px] text-white shrink-0 ${authorColors[comment.initials] ?? 'bg-gray-500'}`}
                    style={{ fontWeight: 700 }}
                  >
                    {comment.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[12px]" style={{ fontWeight: 700 }}>{comment.author}</span>
                      <span className="text-[10px] text-gray-400">{comment.timestamp}</span>
                      <span className="ml-auto text-[10px] text-gray-400 tabular-nums">▲ {comment.votes}</span>
                    </div>
                    <p className="text-[12px] text-gray-700 leading-relaxed mb-2">{comment.text}</p>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => {
                          setReplyingTo(comment.id === replyingTo ? null : comment.id);
                          setReplyText('');
                        }}
                        className="text-[10px] tracking-widest uppercase text-gray-400 hover:text-black transition-colors"
                      >
                        Reply
                      </button>
                      {comment.replies.length > 0 && (
                        <button
                          onClick={() => toggleReplies(comment.id)}
                          className="text-[10px] tracking-widest uppercase text-gray-400 hover:text-black transition-colors"
                        >
                          {expandedReplies.has(comment.id)
                            ? `— Hide Replies`
                            : `+ ${comment.replies.length} ${comment.replies.length === 1 ? 'Reply' : 'Replies'}`}
                        </button>
                      )}
                    </div>

                    {/* Reply input form */}
                    {replyingTo === comment.id && (
                      <div className="mt-3 border border-gray-200 p-3 bg-gray-50">
                        <textarea
                          value={replyText}
                          onChange={e => setReplyText(e.target.value)}
                          placeholder="Write a reply..."
                          className="w-full border border-gray-200 bg-white px-3 py-2 text-[12px] text-gray-700 resize-none focus:outline-none focus:border-black transition-colors mb-2"
                          rows={2}
                          autoFocus
                        />
                        <div className="flex items-center gap-2 justify-end">
                          <button
                            onClick={() => { setReplyingTo(null); setReplyText(''); }}
                            className="text-[10px] tracking-widest uppercase text-gray-500 hover:text-black px-3 py-1"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => submitReply(comment.id)}
                            className="text-[10px] tracking-widest uppercase bg-black text-white px-4 py-1.5 hover:bg-gray-800 transition-colors"
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Replies */}
                    {expandedReplies.has(comment.id) && comment.replies.length > 0 && (
                      <div className="mt-3 border-l-2 border-gray-200 pl-4 space-y-4">
                        {comment.replies.map(reply => (
                          <div key={reply.id} className="flex items-start gap-2.5">
                            <div
                              className={`w-6 h-6 flex items-center justify-center text-[8px] text-white shrink-0 ${authorColors[reply.initials] ?? 'bg-gray-500'}`}
                              style={{ fontWeight: 700 }}
                            >
                              {reply.initials}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                <span className="text-[12px]" style={{ fontWeight: 700 }}>{reply.author}</span>
                                <span className="text-[10px] text-gray-400">{reply.timestamp}</span>
                                <span className="ml-auto text-[10px] text-gray-400 tabular-nums">▲ {reply.votes}</span>
                              </div>
                              <p className="text-[12px] text-gray-700 leading-relaxed">{reply.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
