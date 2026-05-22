import { Link } from 'react-router';
import { ChevronRight, Phone, Mail, MapPin, Clock, AlertTriangle } from 'lucide-react';
import { Layout } from './Layout';

const contacts = [
  {
    role: 'Finance Manager',
    name: 'Catherine Holloway',
    ext: '404',
    email: 'c.holloway@northhavencouncil.nsw.gov.au',
    note: 'Budget approvals, supplementary requests, director-level queries',
  },
  {
    role: 'Budget & Reporting Officer',
    name: 'Daniel Wren',
    ext: '412',
    email: 'd.wren@northhavencouncil.nsw.gov.au',
    note: 'FY25 budget entries, variance reports, actuals reconciliation',
  },
  {
    role: 'Payroll & Wages',
    name: 'Priya Mehta',
    ext: '418',
    email: 'p.mehta@northhavencouncil.nsw.gov.au',
    note: 'Timesheets, overtime queries, wages allocation adjustments',
  },
  {
    role: 'Procurement & Plant',
    name: 'Tom Garrett',
    ext: '421',
    email: 't.garrett@northhavencouncil.nsw.gov.au',
    note: 'Purchase orders, plant hire approvals, contractor payments',
  },
  {
    role: 'Grants & External Funding',
    name: 'Rosie Blackwell',
    ext: '409',
    email: 'r.blackwell@northhavencouncil.nsw.gov.au',
    note: 'Grant acquittals, funding drawdowns, compliance reporting',
  },
  {
    role: 'Systems & IT Support',
    name: 'Finance Helpdesk',
    ext: '400',
    email: 'finance.support@northhavencouncil.nsw.gov.au',
    note: 'Budget system access, account codes, data corrections',
  },
];

export default function ContactPage() {
  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] text-gray-400 tracking-widest uppercase mb-3">
          <Link to="/" className="hover:text-black transition-colors">Dashboard</Link>
          <ChevronRight size={10} />
          <span className="text-black">Finance Team</span>
        </div>

        {/* Title */}
        <div className="mb-8">
          <p className="text-[9px] text-gray-400 tracking-widest uppercase mb-1">Northhaven City Council</p>
          <h1 className="uppercase" style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Finance Team
          </h1>
          <p className="text-[10px] text-gray-400 tracking-widest uppercase mt-1">
            Corporate Services Directorate &bull; Financial Year 2024/25
          </p>
        </div>

        <div className="grid grid-cols-[1fr_300px] gap-8">
          {/* Left — contact directory */}
          <div>
            <p className="text-[9px] text-gray-400 tracking-widest uppercase mb-4">Contact Directory</p>
            <div className="border border-gray-200 divide-y divide-gray-100">
              {contacts.map(c => (
                <div key={c.role} className="p-5 grid grid-cols-[200px_1fr] gap-6">
                  <div>
                    <p className="text-[9px] text-gray-400 tracking-widest uppercase mb-1">{c.role}</p>
                    <p className="text-[13px]" style={{ fontWeight: 700 }}>{c.name}</p>
                  </div>
                  <div>
                    <div className="flex flex-col gap-1 mb-2">
                      <div className="flex items-center gap-2">
                        <Phone size={11} className="text-gray-400 shrink-0" />
                        <span className="text-[11px] tabular-nums">Ext {c.ext}</span>
                        <span className="text-gray-300 mx-1">|</span>
                        <Mail size={11} className="text-gray-400 shrink-0" />
                        <span className="text-[11px] text-gray-600">{c.email}</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-400 tracking-wider">{c.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — general info */}
          <div className="flex flex-col gap-4">
            {/* General line */}
            <div className="border border-gray-200 p-5">
              <p className="text-[9px] text-gray-400 tracking-widest uppercase mb-3">General Enquiries</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-gray-500 shrink-0" />
                  <div>
                    <p className="text-[11px]" style={{ fontWeight: 700 }}>+61 2 9400 0404</p>
                    <p className="text-[9px] text-gray-400 tracking-wider uppercase">Main Finance Line · Ext 404</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-gray-500 shrink-0" />
                  <div>
                    <p className="text-[11px]" style={{ fontWeight: 700 }}>finance@northhavencouncil.nsw.gov.au</p>
                    <p className="text-[9px] text-gray-400 tracking-wider uppercase">General inbox</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="border border-gray-200 p-5">
              <p className="text-[9px] text-gray-400 tracking-widest uppercase mb-3">Office Hours</p>
              <div className="flex items-start gap-2">
                <Clock size={13} className="text-gray-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-[11px]" style={{ fontWeight: 600 }}>Mon – Fri &nbsp; 8:30 AM – 5:00 PM</p>
                  <p className="text-[10px] text-gray-400">Closed public holidays</p>
                  <p className="text-[10px] text-gray-400">Finance counter closes 4:30 PM Fri</p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="border border-gray-200 p-5">
              <p className="text-[9px] text-gray-400 tracking-widest uppercase mb-3">Location</p>
              <div className="flex items-start gap-2">
                <MapPin size={13} className="text-gray-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px]" style={{ fontWeight: 600 }}>Level 2, Council Administration Building</p>
                  <p className="text-[11px] text-gray-600">123 Civic Drive</p>
                  <p className="text-[11px] text-gray-600">Northhaven NSW 2150</p>
                </div>
              </div>
            </div>

            {/* Emergency */}
            <div className="border border-red-200 bg-red-50 p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={13} className="text-red-600" />
                <p className="text-[9px] text-red-600 tracking-widest uppercase" style={{ fontWeight: 700 }}>After-Hours Emergency</p>
              </div>
              <p className="text-[11px] text-red-800 mb-1" style={{ fontWeight: 700 }}>1800 626 400</p>
              <p className="text-[10px] text-red-700">
                For urgent budget authorisations or system access issues outside business hours. Council duty officer will escalate to Finance on-call.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
