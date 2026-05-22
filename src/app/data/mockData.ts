export interface CategoryData {
  budget: number;
  actuals: number;
  remaining: number;
}

export interface SubSubItem {
  id: string;
  name: string;
  amount: number;
  date: string;
}

export interface SubLineItem {
  id: string;
  name: string;
  budget: number;
  actuals: number;
  remaining: number;
  subItems: SubSubItem[];
}

export interface BudgetTransaction {
  id: string;
  date: string;
  description: string;
  amount: number;
}

export interface TrendDataPoint {
  month: string;
  actual: number | null;
  projected: number;
}

export interface Budget {
  id: string;
  name: string;
  code: string;
  manager: string;
  team: string;
  department: string;
  status: 'over-budget' | 'on-track' | 'watch' | 'pending';
  pinned: boolean;
  income: CategoryData;
  wages: CategoryData;
  plant: CategoryData;
  other: CategoryData;
  totalBudget: number;
  totalActuals: number;
  utilization: number;
  committed: number;
  ytdActuals: { income: number; wages: number; plant: number; other: number };
  transactions: BudgetTransaction[];
  notes: string;
  wagesBreakdown: SubLineItem[];
  incomeBreakdown: SubLineItem[];
  plantBreakdown: SubLineItem[];
  otherBreakdown: SubLineItem[];
  trendData: TrendDataPoint[];
}

export interface Notification {
  id: string;
  timestamp: string;
  category: 'budget-update' | 'system-alert' | 'team-edit';
  description: string;
  valuation: number | null;
  status: 'committed' | 'pending' | 'over-budget' | 'variance' | 'notified' | 'system-sync';
  message: string;
  metadata: {
    author: string;
    reference: string;
    status: string;
  };
}

export const budgets: Budget[] = [
  {
    id: 'op-9482',
    name: 'Waste Management – North Zone',
    code: 'OP-9482',
    manager: 'Sarah Jenkins',
    team: 'Operations',
    department: 'Operations',
    status: 'over-budget',
    pinned: false,
    income: { budget: 42000, actuals: 38000, remaining: 4000 },
    wages: { budget: 820000, actuals: 980000, remaining: -160000 },
    plant: { budget: 290000, actuals: 310000, remaining: -20000 },
    other: { budget: 158000, actuals: 92000, remaining: 66000 },
    totalBudget: 1310000,
    totalActuals: 612000,
    utilization: 46.7,
    committed: 1420000,
    ytdActuals: { income: 38000, wages: 328000, plant: 185000, other: 61000 },
    transactions: [
      { id: 't1', date: '24 OCT 2024', description: 'Overtime – Crew B Collection Run', amount: 18400 },
      { id: 't2', date: '22 OCT 2024', description: 'Landfill Gate Fees – Q3 Overage', amount: 34200 },
      { id: 't3', date: '18 OCT 2024', description: 'Fuel Surcharge – Fleet Operations', amount: 9800 },
    ],
    notes: 'Budget pressure driven by increased collection frequency following new residential development in Zones 3–5. Supplementary allocation request submitted 18 Oct.',
    wagesBreakdown: [
      {
        id: 'w1', name: 'Permanent Collection Staff', budget: 520000, actuals: 610000, remaining: -90000,
        subItems: [
          { id: 'w1a', name: 'Zone A Crew', amount: 215000, date: 'Q1–Q3 FY25' },
          { id: 'w1b', name: 'Zone B Crew', amount: 198000, date: 'Q1–Q3 FY25' },
          { id: 'w1c', name: 'Supervisors', amount: 197000, date: 'Q1–Q3 FY25' },
        ],
      },
      {
        id: 'w2', name: 'Casual & Contract Labour', budget: 180000, actuals: 245000, remaining: -65000,
        subItems: [
          { id: 'w2a', name: 'Emergency Weekend Shifts', amount: 145000, date: 'Q2–Q3 FY25' },
          { id: 'w2b', name: 'Contractor – Specialist Waste', amount: 100000, date: 'Q3 FY25' },
        ],
      },
      {
        id: 'w3', name: 'Overtime & Penalty Rates', budget: 120000, actuals: 125000, remaining: -5000,
        subItems: [
          { id: 'w3a', name: 'Public Holiday Loading', amount: 62000, date: 'Q1–Q3 FY25' },
          { id: 'w3b', name: 'Late-Night Shift Penalties', amount: 63000, date: 'Q2–Q3 FY25' },
        ],
      },
    ],
    incomeBreakdown: [
      {
        id: 'i1', name: 'State Waste Levy Grant', budget: 25000, actuals: 22000, remaining: 3000,
        subItems: [{ id: 'i1a', name: 'Q3 Grant Payment', amount: 22000, date: '15 OCT 2024' }],
      },
      {
        id: 'i2', name: 'Commercial Collection Fees', budget: 17000, actuals: 16000, remaining: 1000,
        subItems: [{ id: 'i2a', name: 'Invoice Batch – Oct', amount: 16000, date: '30 OCT 2024' }],
      },
    ],
    plantBreakdown: [
      {
        id: 'p1', name: 'Collection Vehicle Fleet', budget: 180000, actuals: 195000, remaining: -15000,
        subItems: [
          { id: 'p1a', name: 'Fuel – Compactor Trucks', amount: 95000, date: 'Q1–Q3 FY25' },
          { id: 'p1b', name: 'Servicing & Repairs', amount: 100000, date: 'Q1–Q3 FY25' },
        ],
      },
      {
        id: 'p2', name: 'Recycling Equipment', budget: 110000, actuals: 115000, remaining: -5000,
        subItems: [
          { id: 'p2a', name: 'Sorting Line Maintenance', amount: 115000, date: 'Q2–Q3 FY25' },
        ],
      },
    ],
    otherBreakdown: [
      {
        id: 'o1', name: 'Landfill Gate Fees', budget: 100000, actuals: 58000, remaining: 42000,
        subItems: [{ id: 'o1a', name: 'Q1–Q3 Gate Fees', amount: 58000, date: 'Q1–Q3 FY25' }],
      },
      {
        id: 'o2', name: 'Community Education & Comms', budget: 58000, actuals: 34000, remaining: 24000,
        subItems: [{ id: 'o2a', name: 'Campaign Materials', amount: 34000, date: 'Q2–Q3 FY25' }],
      },
    ],
    trendData: [
      { month: 'JUL', actual: 112000,  projected: 109167 },
      { month: 'AUG', actual: 258000,  projected: 218333 },
      { month: 'SEP', actual: 428000,  projected: 327500 },
      { month: 'OCT', actual: 612000,  projected: 436667 },
      { month: 'NOV', actual: null,    projected: 545833 },
      { month: 'DEC', actual: null,    projected: 655000 },
      { month: 'JAN', actual: null,    projected: 764167 },
      { month: 'FEB', actual: null,    projected: 873333 },
      { month: 'MAR', actual: null,    projected: 982500 },
      { month: 'APR', actual: null,    projected: 1091667 },
      { month: 'MAY', actual: null,    projected: 1200833 },
      { month: 'JUN', actual: null,    projected: 1310000 },
    ],
  },
  {
    id: 'pl-3310',
    name: 'Public Library Modernisation',
    code: 'PL-3310',
    manager: 'Robert Chen',
    team: 'Community Services',
    department: 'Community Services',
    status: 'watch',
    pinned: false,
    income: { budget: 12000, actuals: 10500, remaining: 1500 },
    wages: { budget: 410000, actuals: 395000, remaining: 15000 },
    plant: { budget: 440000, actuals: 428000, remaining: 12000 },
    other: { budget: 88000, actuals: 57000, remaining: 31000 },
    totalBudget: 950000,
    totalActuals: 368000,
    utilization: 38.7,
    committed: 890500,
    ytdActuals: { income: 10500, wages: 142000, plant: 188000, other: 27500 },
    transactions: [
      { id: 't1', date: '23 OCT 2024', description: 'IT Infrastructure – Fit-out Stage 2', amount: 42350 },
      { id: 't2', date: '20 OCT 2024', description: 'Project Management Fees – Oct', amount: 12800 },
      { id: 't3', date: '15 OCT 2024', description: 'Community Engagement Sessions', amount: 5400 },
    ],
    notes: 'Project tracking well. Stage 2 fit-out procurement completed ahead of schedule. Minor delays in IT delivery expected to resolve by Nov.',
    wagesBreakdown: [
      {
        id: 'w1', name: 'Project Management Team', budget: 220000, actuals: 215000, remaining: 5000,
        subItems: [
          { id: 'w1a', name: 'Project Manager (0.8 FTE)', amount: 130000, date: 'Q1–Q3 FY25' },
          { id: 'w1b', name: 'Project Coordinator', amount: 85000, date: 'Q1–Q3 FY25' },
        ],
      },
      {
        id: 'w2', name: 'Library Staff (Transition)', budget: 190000, actuals: 180000, remaining: 10000,
        subItems: [
          { id: 'w2a', name: 'Senior Librarians (3)', amount: 110000, date: 'Q1–Q3 FY25' },
          { id: 'w2b', name: 'Library Assistants', amount: 70000, date: 'Q1–Q3 FY25' },
        ],
      },
    ],
    incomeBreakdown: [
      {
        id: 'i1', name: 'State Library Grant', budget: 12000, actuals: 10500, remaining: 1500,
        subItems: [{ id: 'i1a', name: 'Q2 Grant Drawdown', amount: 10500, date: '01 SEP 2024' }],
      },
    ],
    plantBreakdown: [
      {
        id: 'p1', name: 'IT Infrastructure & AV', budget: 280000, actuals: 272000, remaining: 8000,
        subItems: [
          { id: 'p1a', name: 'Server & Networking Equipment', amount: 145000, date: 'Q2 FY25' },
          { id: 'p1b', name: 'AV Display Systems', amount: 127000, date: 'Q2–Q3 FY25' },
        ],
      },
      {
        id: 'p2', name: 'Furniture & Fitout', budget: 160000, actuals: 156000, remaining: 4000,
        subItems: [
          { id: 'p2a', name: 'Stage 1 Furniture Package', amount: 156000, date: 'Q1 FY25' },
        ],
      },
    ],
    otherBreakdown: [
      {
        id: 'o1', name: 'Communications & Marketing', budget: 45000, actuals: 28000, remaining: 17000,
        subItems: [{ id: 'o1a', name: 'Launch Campaign Design', amount: 28000, date: 'Q2–Q3 FY25' }],
      },
      {
        id: 'o2', name: 'Contingency Reserve', budget: 43000, actuals: 29000, remaining: 14000,
        subItems: [{ id: 'o2a', name: 'Miscellaneous Variations', amount: 29000, date: 'Q1–Q3 FY25' }],
      },
    ],
    trendData: [
      { month: 'JUL', actual: 68000,  projected: 79167 },
      { month: 'AUG', actual: 155000, projected: 158333 },
      { month: 'SEP', actual: 278000, projected: 237500 },
      { month: 'OCT', actual: 368000, projected: 316667 },
      { month: 'NOV', actual: null,   projected: 395833 },
      { month: 'DEC', actual: null,   projected: 475000 },
      { month: 'JAN', actual: null,   projected: 554167 },
      { month: 'FEB', actual: null,   projected: 633333 },
      { month: 'MAR', actual: null,   projected: 712500 },
      { month: 'APR', actual: null,   projected: 791667 },
      { month: 'MAY', actual: null,   projected: 870833 },
      { month: 'JUN', actual: null,   projected: 950000 },
    ],
  },
  {
    id: 'in-201-rm',
    name: 'Road Maintenance',
    code: 'IN-201-RM',
    manager: 'Alex Morrison',
    team: 'Infrastructure',
    department: 'Infrastructure',
    status: 'on-track',
    pinned: true,
    income: { budget: 500000, actuals: 480000, remaining: 20000 },
    wages: { budget: 350000, actuals: 412000, remaining: -62000 },
    plant: { budget: 150000, actuals: 98000, remaining: 52000 },
    other: { budget: 75000, actuals: 45000, remaining: 30000 },
    totalBudget: 1075000,
    totalActuals: 348000,
    utilization: 32.4,
    committed: 698500,
    ytdActuals: { income: 180000, wages: 118000, plant: 34000, other: 16000 },
    transactions: [
      { id: 't1', date: '24 OCT 2024', description: 'Drainage Clearing – Sector 4', amount: 12400 },
      { id: 't2', date: '22 OCT 2024', description: 'Safety Barrier Inspection', amount: 3200 },
      { id: 't3', date: '18 OCT 2024', description: 'Line Marking – Main St', amount: 18750 },
    ],
    notes: '',
    wagesBreakdown: [
      {
        id: 'w1', name: 'Permanent Road Crew', budget: 200000, actuals: 230000, remaining: -30000,
        subItems: [
          { id: 'w1a', name: 'Road Crew – Zone A', amount: 85000, date: 'Q1–Q3 FY25' },
          { id: 'w1b', name: 'Road Crew – Zone B', amount: 78000, date: 'Q1–Q3 FY25' },
          { id: 'w1c', name: 'Supervisors', amount: 67000, date: 'Q1–Q3 FY25' },
        ],
      },
      {
        id: 'w2', name: 'Casual & Contract', budget: 80000, actuals: 120000, remaining: -40000,
        subItems: [
          { id: 'w2a', name: 'Emergency Crew – Storm', amount: 65000, date: 'Q2–Q3 FY25' },
          { id: 'w2b', name: 'Traffic Control', amount: 55000, date: 'Q2–Q3 FY25' },
        ],
      },
      {
        id: 'w3', name: 'Overtime', budget: 70000, actuals: 62000, remaining: 8000,
        subItems: [
          { id: 'w3a', name: 'Weekend Work – Q3', amount: 35000, date: 'Q3 FY25' },
          { id: 'w3b', name: 'Public Holiday Loading', amount: 27000, date: 'Q1–Q3 FY25' },
        ],
      },
    ],
    incomeBreakdown: [
      {
        id: 'i1', name: 'Transport Infrastructure Grant', budget: 350000, actuals: 330000, remaining: 20000,
        subItems: [
          { id: 'i1a', name: 'Q1 Grant Drawdown', amount: 160000, date: '31 JUL 2024' },
          { id: 'i1b', name: 'Q2 Grant Drawdown', amount: 170000, date: '30 SEP 2024' },
        ],
      },
      {
        id: 'i2', name: 'Council General Allocation', budget: 100000, actuals: 100000, remaining: 0,
        subItems: [{ id: 'i2a', name: 'Annual Allocation', amount: 100000, date: '01 JUL 2024' }],
      },
      {
        id: 'i3', name: 'Recovered Works – Developer', budget: 50000, actuals: 50000, remaining: 0,
        subItems: [{ id: 'i3a', name: 'Developer Contribution – Stage 3', amount: 50000, date: '15 AUG 2024' }],
      },
    ],
    plantBreakdown: [
      {
        id: 'p1', name: 'Vehicle Fleet', budget: 80000, actuals: 55000, remaining: 25000,
        subItems: [
          { id: 'p1a', name: 'Fuel – Ute & Patrol Vehicles', amount: 32000, date: 'Q1–Q3 FY25' },
          { id: 'p1b', name: 'Fleet Servicing', amount: 23000, date: 'Q1–Q3 FY25' },
        ],
      },
      {
        id: 'p2', name: 'Heavy Equipment', budget: 50000, actuals: 30000, remaining: 20000,
        subItems: [{ id: 'p2a', name: 'Grader Hire – Q1', amount: 30000, date: 'Q1 FY25' }],
      },
      {
        id: 'p3', name: 'Small Plant & Tools', budget: 20000, actuals: 13000, remaining: 7000,
        subItems: [{ id: 'p3a', name: 'Compactor & Tools', amount: 13000, date: 'Q1–Q3 FY25' }],
      },
    ],
    otherBreakdown: [
      {
        id: 'o1', name: 'Materials', budget: 40000, actuals: 25000, remaining: 15000,
        subItems: [
          { id: 'o1a', name: 'Bitumen & Seal Coat', amount: 15000, date: 'Q2 FY25' },
          { id: 'o1b', name: 'Aggregate & Gravel', amount: 10000, date: 'Q1 FY25' },
        ],
      },
      {
        id: 'o2', name: 'Contractors', budget: 25000, actuals: 15000, remaining: 10000,
        subItems: [{ id: 'o2a', name: 'Line Marking Contractor', amount: 15000, date: 'Q2–Q3 FY25' }],
      },
      {
        id: 'o3', name: 'Admin & Other', budget: 10000, actuals: 5000, remaining: 5000,
        subItems: [{ id: 'o3a', name: 'Miscellaneous', amount: 5000, date: 'Q1–Q3 FY25' }],
      },
    ],
    trendData: [
      { month: 'JUL', actual: 72000,  projected: 89583 },
      { month: 'AUG', actual: 162000, projected: 179167 },
      { month: 'SEP', actual: 265000, projected: 268750 },
      { month: 'OCT', actual: 348000, projected: 358333 },
      { month: 'NOV', actual: null,   projected: 447917 },
      { month: 'DEC', actual: null,   projected: 537500 },
      { month: 'JAN', actual: null,   projected: 627083 },
      { month: 'FEB', actual: null,   projected: 716667 },
      { month: 'MAR', actual: null,   projected: 806250 },
      { month: 'APR', actual: null,   projected: 895833 },
      { month: 'MAY', actual: null,   projected: 985417 },
      { month: 'JUN', actual: null,   projected: 1075000 },
    ],
  },
  {
    id: 'ev-005-sf',
    name: 'Summer Festival 2024',
    code: 'EV-005-SF',
    manager: 'Maria Santos',
    team: 'Events & Culture',
    department: 'Events & Culture',
    status: 'on-track',
    pinned: true,
    income: { budget: 30000, actuals: 5000, remaining: 25000 },
    wages: { budget: 45000, actuals: 4200, remaining: 40800 },
    plant: { budget: 12000, actuals: 800, remaining: 11200 },
    other: { budget: 170000, actuals: 8000, remaining: 162000 },
    totalBudget: 257000,
    totalActuals: 14500,
    utilization: 5.6,
    committed: 55000,
    ytdActuals: { income: 5000, wages: 1000, plant: 800, other: 7700 },
    transactions: [
      { id: 't1', date: '20 OCT 2024', description: 'Venue Booking Deposit – Riverside Park', amount: 5000 },
      { id: 't2', date: '15 OCT 2024', description: 'Design & Print – Initial Posters', amount: 3000 },
    ],
    notes: 'Event scheduled Jan 2025. All major contracts pending. Venue deposit paid. Talent procurement to commence Nov.',
    wagesBreakdown: [
      {
        id: 'w1', name: 'Event Coordination Staff', budget: 30000, actuals: 4200, remaining: 25800,
        subItems: [{ id: 'w1a', name: 'Event Manager – Planning Phase', amount: 4200, date: 'Q2 FY25' }],
      },
      {
        id: 'w2', name: 'Casual Event Staff (Jan)', budget: 15000, actuals: 0, remaining: 15000,
        subItems: [],
      },
    ],
    incomeBreakdown: [
      {
        id: 'i1', name: 'Sponsorship Income', budget: 20000, actuals: 5000, remaining: 15000,
        subItems: [{ id: 'i1a', name: 'Presenting Sponsor Deposit', amount: 5000, date: '10 OCT 2024' }],
      },
      {
        id: 'i2', name: 'Ticket Revenue', budget: 10000, actuals: 0, remaining: 10000,
        subItems: [],
      },
    ],
    plantBreakdown: [
      {
        id: 'p1', name: 'Equipment Hire (Jan)', budget: 12000, actuals: 800, remaining: 11200,
        subItems: [{ id: 'p1a', name: 'Generator & Power – Deposit', amount: 800, date: '20 OCT 2024' }],
      },
    ],
    otherBreakdown: [
      {
        id: 'o1', name: 'Entertainment & Talent', budget: 90000, actuals: 0, remaining: 90000,
        subItems: [],
      },
      {
        id: 'o2', name: 'Venue & Infrastructure', budget: 45000, actuals: 5000, remaining: 40000,
        subItems: [{ id: 'o2a', name: 'Venue Deposit', amount: 5000, date: '20 OCT 2024' }],
      },
      {
        id: 'o3', name: 'Marketing & Promotions', budget: 35000, actuals: 3000, remaining: 32000,
        subItems: [{ id: 'o3a', name: 'Poster Design & Print', amount: 3000, date: '15 OCT 2024' }],
      },
    ],
    trendData: [
      { month: 'JUL', actual: 2000,   projected: 21417 },
      { month: 'AUG', actual: 5500,   projected: 42833 },
      { month: 'SEP', actual: 9000,   projected: 64250 },
      { month: 'OCT', actual: 14500,  projected: 85667 },
      { month: 'NOV', actual: null,   projected: 107083 },
      { month: 'DEC', actual: null,   projected: 128500 },
      { month: 'JAN', actual: null,   projected: 149917 },
      { month: 'FEB', actual: null,   projected: 171333 },
      { month: 'MAR', actual: null,   projected: 192750 },
      { month: 'APR', actual: null,   projected: 214167 },
      { month: 'MAY', actual: null,   projected: 235583 },
      { month: 'JUN', actual: null,   projected: 257000 },
    ],
  },
  {
    id: 'pk-112',
    name: 'Parks & Recreation Upgrade',
    code: 'PK-112',
    manager: 'David Park',
    team: 'Community Services',
    department: 'Community Services',
    status: 'watch',
    pinned: false,
    income: { budget: 180000, actuals: 175000, remaining: 5000 },
    wages: { budget: 220000, actuals: 195000, remaining: 25000 },
    plant: { budget: 95000, actuals: 88000, remaining: 7000 },
    other: { budget: 155000, actuals: 102000, remaining: 53000 },
    totalBudget: 650000,
    totalActuals: 352000,
    utilization: 54.2,
    committed: 565000,
    ytdActuals: { income: 120000, wages: 88000, plant: 105000, other: 39000 },
    transactions: [
      { id: 't1', date: '21 OCT 2024', description: 'Playground Equipment Install – Lot 3', amount: 28500 },
      { id: 't2', date: '14 OCT 2024', description: 'Irrigation System Upgrade – Park A', amount: 15300 },
    ],
    notes: 'Stage 2 landscaping scheduled for Nov. Equipment installation progressing well.',
    wagesBreakdown: [
      {
        id: 'w1', name: 'Project Coordination', budget: 80000, actuals: 72000, remaining: 8000,
        subItems: [
          { id: 'w1a', name: 'Project Officer (0.6 FTE)', amount: 45000, date: 'Q1–Q3 FY25' },
          { id: 'w1b', name: 'Site Supervisor', amount: 27000, date: 'Q2–Q3 FY25' },
        ],
      },
      {
        id: 'w2', name: 'Casual Landscaping Staff', budget: 85000, actuals: 78000, remaining: 7000,
        subItems: [
          { id: 'w2a', name: 'Landscaping Crew A', amount: 48000, date: 'Q1–Q3 FY25' },
          { id: 'w2b', name: 'Landscaping Crew B', amount: 30000, date: 'Q2–Q3 FY25' },
        ],
      },
      {
        id: 'w3', name: 'Overtime & Allowances', budget: 55000, actuals: 45000, remaining: 10000,
        subItems: [
          { id: 'w3a', name: 'Weekend Works Loading', amount: 25000, date: 'Q2–Q3 FY25' },
          { id: 'w3b', name: 'Tool Allowance', amount: 20000, date: 'Q1–Q3 FY25' },
        ],
      },
    ],
    incomeBreakdown: [
      {
        id: 'i1', name: 'State Recreation Grant', budget: 120000, actuals: 120000, remaining: 0,
        subItems: [
          { id: 'i1a', name: 'Q1 Grant Drawdown', amount: 60000, date: '01 AUG 2024' },
          { id: 'i1b', name: 'Q2 Grant Drawdown', amount: 60000, date: '01 OCT 2024' },
        ],
      },
      {
        id: 'i2', name: 'Developer Contributions', budget: 60000, actuals: 55000, remaining: 5000,
        subItems: [
          { id: 'i2a', name: 'Stage 2 Developer Contribution', amount: 55000, date: '15 SEP 2024' },
        ],
      },
    ],
    plantBreakdown: [
      {
        id: 'p1', name: 'Heavy Equipment Hire', budget: 55000, actuals: 52000, remaining: 3000,
        subItems: [
          { id: 'p1a', name: 'Excavator Hire – Stage 1', amount: 30000, date: 'Q1 FY25' },
          { id: 'p1b', name: 'Bobcat Hire – Landscaping', amount: 22000, date: 'Q2–Q3 FY25' },
        ],
      },
      {
        id: 'p2', name: 'Fleet & Vehicles', budget: 40000, actuals: 36000, remaining: 4000,
        subItems: [
          { id: 'p2a', name: 'Fuel & Running Costs', amount: 22000, date: 'Q1–Q3 FY25' },
          { id: 'p2b', name: 'Vehicle Servicing', amount: 14000, date: 'Q2 FY25' },
        ],
      },
    ],
    otherBreakdown: [
      {
        id: 'o1', name: 'Materials & Supplies', budget: 75000, actuals: 52000, remaining: 23000,
        subItems: [
          { id: 'o1a', name: 'Playground Equipment – Lot 3', amount: 28500, date: 'Q3 FY25' },
          { id: 'o1b', name: 'Irrigation Components', amount: 15300, date: 'Q3 FY25' },
          { id: 'o1c', name: 'Mulch & Plants', amount: 8200, date: 'Q1–Q3 FY25' },
        ],
      },
      {
        id: 'o2', name: 'Community Consultation', budget: 20000, actuals: 14000, remaining: 6000,
        subItems: [
          { id: 'o2a', name: 'Workshop Facilitation', amount: 8000, date: 'Q1 FY25' },
          { id: 'o2b', name: 'Survey & Communications', amount: 6000, date: 'Q2 FY25' },
        ],
      },
      {
        id: 'o3', name: 'Contingency Reserve', budget: 60000, actuals: 36000, remaining: 24000,
        subItems: [
          { id: 'o3a', name: 'Miscellaneous Variations', amount: 36000, date: 'Q1–Q3 FY25' },
        ],
      },
    ],
    trendData: [
      { month: 'JUL', actual: 64000,  projected: 70000 },
      { month: 'AUG', actual: 148000, projected: 155000 },
      { month: 'SEP', actual: 252000, projected: 265000 },
      { month: 'OCT', actual: 352000, projected: 368000 },
      { month: 'NOV', actual: null,   projected: 460000 },
      { month: 'DEC', actual: null,   projected: 527000 },
      { month: 'JAN', actual: null,   projected: 572000 },
      { month: 'FEB', actual: null,   projected: 606000 },
      { month: 'MAR', actual: null,   projected: 630000 },
      { month: 'APR', actual: null,   projected: 642000 },
      { month: 'MAY', actual: null,   projected: 648000 },
      { month: 'JUN', actual: null,   projected: 650000 },
    ],
  },
  {
    id: 'if-890',
    name: 'Infrastructure Core Renewal',
    code: 'IF-890',
    manager: 'James Liu',
    team: 'Infrastructure',
    department: 'Infrastructure',
    status: 'watch',
    pinned: false,
    income: { budget: 500000, actuals: 500000, remaining: 0 },
    wages: { budget: 380000, actuals: 365000, remaining: 15000 },
    plant: { budget: 920000, actuals: 880000, remaining: 40000 },
    other: { budget: 200000, actuals: 188000, remaining: 12000 },
    totalBudget: 2000000,
    totalActuals: 1555000,
    utilization: 77.8,
    committed: 1933000,
    ytdActuals: { income: 500000, wages: 245000, plant: 682000, other: 128000 },
    transactions: [
      { id: 't1', date: '22 OCT 2024', description: 'Pipe Renewal – CBD Precinct', amount: 145000 },
      { id: 't2', date: '17 OCT 2024', description: 'Engineering Consultancy – Q3 Report', amount: 38500 },
    ],
    notes: 'Project nearing completion. Final civil works contract executed Oct. Contingency reserve $67k remaining.',
    wagesBreakdown: [
      {
        id: 'w1', name: 'Civil Engineering Staff', budget: 220000, actuals: 210000, remaining: 10000,
        subItems: [
          { id: 'w1a', name: 'Senior Civil Engineer', amount: 128000, date: 'Q1–Q3 FY25' },
          { id: 'w1b', name: 'Infrastructure Inspector', amount: 82000, date: 'Q1–Q3 FY25' },
        ],
      },
      {
        id: 'w2', name: 'Site Crew', budget: 160000, actuals: 155000, remaining: 5000,
        subItems: [
          { id: 'w2a', name: 'Pipe Laying Crew', amount: 88000, date: 'Q1–Q3 FY25' },
          { id: 'w2b', name: 'Traffic Control', amount: 67000, date: 'Q2–Q3 FY25' },
        ],
      },
    ],
    incomeBreakdown: [
      {
        id: 'i1', name: 'State Infrastructure Grant', budget: 350000, actuals: 350000, remaining: 0,
        subItems: [
          { id: 'i1a', name: 'Full Grant Payment', amount: 350000, date: '01 JUL 2024' },
        ],
      },
      {
        id: 'i2', name: 'Council Capital Works Levy', budget: 150000, actuals: 150000, remaining: 0,
        subItems: [
          { id: 'i2a', name: 'Annual Allocation', amount: 150000, date: '01 JUL 2024' },
        ],
      },
    ],
    plantBreakdown: [
      {
        id: 'p1', name: 'Pipe & Conduit Supply', budget: 520000, actuals: 498000, remaining: 22000,
        subItems: [
          { id: 'p1a', name: 'CBD Precinct Pipe Works', amount: 145000, date: 'OCT 2024' },
          { id: 'p1b', name: 'Conduit & Lining', amount: 220000, date: 'Q1–Q3 FY25' },
          { id: 'p1c', name: 'Fittings & Joints', amount: 133000, date: 'Q1–Q3 FY25' },
        ],
      },
      {
        id: 'p2', name: 'Civil Plant Hire', budget: 280000, actuals: 272000, remaining: 8000,
        subItems: [
          { id: 'p2a', name: 'Excavation Equipment', amount: 158000, date: 'Q1–Q3 FY25' },
          { id: 'p2b', name: 'Compaction Plant', amount: 114000, date: 'Q2–Q3 FY25' },
        ],
      },
      {
        id: 'p3', name: 'Temporary Works', budget: 120000, actuals: 110000, remaining: 10000,
        subItems: [
          { id: 'p3a', name: 'Traffic Management Devices', amount: 65000, date: 'Q2–Q3 FY25' },
          { id: 'p3b', name: 'Shoring & Propping', amount: 45000, date: 'Q2 FY25' },
        ],
      },
    ],
    otherBreakdown: [
      {
        id: 'o1', name: 'Engineering Consultancy', budget: 120000, actuals: 114000, remaining: 6000,
        subItems: [
          { id: 'o1a', name: 'Design & Documentation', amount: 75500, date: 'Q1–Q2 FY25' },
          { id: 'o1b', name: 'Q3 Progress Report', amount: 38500, date: '17 OCT 2024' },
        ],
      },
      {
        id: 'o2', name: 'Environmental Management', budget: 45000, actuals: 42000, remaining: 3000,
        subItems: [
          { id: 'o2a', name: 'Site Environmental Controls', amount: 42000, date: 'Q1–Q3 FY25' },
        ],
      },
      {
        id: 'o3', name: 'Contingency Reserve', budget: 35000, actuals: 32000, remaining: 3000,
        subItems: [
          { id: 'o3a', name: 'Miscellaneous Variations', amount: 32000, date: 'Q1–Q3 FY25' },
        ],
      },
    ],
    trendData: [
      { month: 'JUL', actual: 295000,  projected: 380000 },
      { month: 'AUG', actual: 680000,  projected: 760000 },
      { month: 'SEP', actual: 1148000, projected: 1140000 },
      { month: 'OCT', actual: 1555000, projected: 1440000 },
      { month: 'NOV', actual: null,    projected: 1645000 },
      { month: 'DEC', actual: null,    projected: 1780000 },
      { month: 'JAN', actual: null,    projected: 1870000 },
      { month: 'FEB', actual: null,    projected: 1920000 },
      { month: 'MAR', actual: null,    projected: 1955000 },
      { month: 'APR', actual: null,    projected: 1975000 },
      { month: 'MAY', actual: null,    projected: 1990000 },
      { month: 'JUN', actual: null,    projected: 2000000 },
    ],
  },
  {
    id: 'if-440-sd',
    name: 'Stormwater Drainage Upgrade',
    code: 'IF-440-SD',
    manager: 'Alex Morrison',
    team: 'Infrastructure',
    department: 'Infrastructure',
    status: 'watch',
    pinned: false,
    income: { budget: 180000, actuals: 175000, remaining: 5000 },
    wages: { budget: 195000, actuals: 182000, remaining: 13000 },
    plant: { budget: 350000, actuals: 378000, remaining: -28000 },
    other: { budget: 115000, actuals: 72000, remaining: 43000 },
    totalBudget: 840000,
    totalActuals: 412000,
    utilization: 49.0,
    committed: 680000,
    ytdActuals: { income: 175000, wages: 88000, plant: 115000, other: 34000 },
    transactions: [
      { id: 't1', date: '23 OCT 2024', description: 'Pipe Jetting & CCTV Survey – Zone 4', amount: 28400 },
      { id: 't2', date: '17 OCT 2024', description: 'Excavation Equipment Hire – Western Catchment', amount: 41200 },
    ],
    notes: 'Plant costs tracking above forecast due to extended equipment hire on the Western Catchment works. Remediation scope expanded following survey findings.',
    wagesBreakdown: [
      {
        id: 'w1', name: 'Engineering & Survey', budget: 95000, actuals: 88000, remaining: 7000,
        subItems: [
          { id: 'w1a', name: 'Drainage Engineer', amount: 55000, date: 'Q1–Q3 FY25' },
          { id: 'w1b', name: 'Survey Crew', amount: 33000, date: 'Q2–Q3 FY25' },
        ],
      },
      {
        id: 'w2', name: 'Construction Crew', budget: 100000, actuals: 94000, remaining: 6000,
        subItems: [
          { id: 'w2a', name: 'Excavation & Pipe Gang', amount: 56000, date: 'Q1–Q3 FY25' },
          { id: 'w2b', name: 'Concrete & Finishing', amount: 38000, date: 'Q2–Q3 FY25' },
        ],
      },
    ],
    incomeBreakdown: [
      {
        id: 'i1', name: 'Stormwater Levy Grant', budget: 120000, actuals: 115000, remaining: 5000,
        subItems: [
          { id: 'i1a', name: 'Q1 Grant Drawdown', amount: 60000, date: '31 JUL 2024' },
          { id: 'i1b', name: 'Q2 Grant Drawdown', amount: 55000, date: '30 SEP 2024' },
        ],
      },
      {
        id: 'i2', name: 'Developer Contributions', budget: 60000, actuals: 60000, remaining: 0,
        subItems: [
          { id: 'i2a', name: 'Western Precinct Contribution', amount: 60000, date: '15 AUG 2024' },
        ],
      },
    ],
    plantBreakdown: [
      {
        id: 'p1', name: 'Pipe Jetting & CCTV', budget: 85000, actuals: 98000, remaining: -13000,
        subItems: [
          { id: 'p1a', name: 'Zone 4 Survey & Jetting', amount: 28400, date: '23 OCT 2024' },
          { id: 'p1b', name: 'Zone 1–3 CCTV Inspection', amount: 42000, date: 'Q1–Q2 FY25' },
          { id: 'p1c', name: 'Additional Zone Works', amount: 27600, date: 'Q3 FY25' },
        ],
      },
      {
        id: 'p2', name: 'Excavation Equipment', budget: 165000, actuals: 180000, remaining: -15000,
        subItems: [
          { id: 'p2a', name: 'Excavator Hire – Western Catchment', amount: 41200, date: '17 OCT 2024' },
          { id: 'p2b', name: 'Extended Dig Campaign', amount: 138800, date: 'Q1–Q3 FY25' },
        ],
      },
      {
        id: 'p3', name: 'Concrete & Materials', budget: 100000, actuals: 100000, remaining: 0,
        subItems: [
          { id: 'p3a', name: 'Concrete Supply', amount: 62000, date: 'Q1–Q3 FY25' },
          { id: 'p3b', name: 'Pipe & Fittings', amount: 38000, date: 'Q1–Q3 FY25' },
        ],
      },
    ],
    otherBreakdown: [
      {
        id: 'o1', name: 'Environmental Monitoring', budget: 40000, actuals: 28000, remaining: 12000,
        subItems: [
          { id: 'o1a', name: 'Sediment Controls', amount: 18000, date: 'Q1–Q2 FY25' },
          { id: 'o1b', name: 'Water Quality Testing', amount: 10000, date: 'Q2–Q3 FY25' },
        ],
      },
      {
        id: 'o2', name: 'Traffic Management', budget: 45000, actuals: 32000, remaining: 13000,
        subItems: [
          { id: 'o2a', name: 'Signage & Control Setup', amount: 22000, date: 'Q2–Q3 FY25' },
          { id: 'o2b', name: 'Traffic Controller Fees', amount: 10000, date: 'Q3 FY25' },
        ],
      },
      {
        id: 'o3', name: 'Contingency', budget: 30000, actuals: 12000, remaining: 18000,
        subItems: [
          { id: 'o3a', name: 'Miscellaneous', amount: 12000, date: 'Q1–Q3 FY25' },
        ],
      },
    ],
    trendData: [
      { month: 'JUL', actual: 72000,  projected: 75000 },
      { month: 'AUG', actual: 168000, projected: 158000 },
      { month: 'SEP', actual: 295000, projected: 248000 },
      { month: 'OCT', actual: 412000, projected: 345000 },
      { month: 'NOV', actual: null,   projected: 448000 },
      { month: 'DEC', actual: null,   projected: 532000 },
      { month: 'JAN', actual: null,   projected: 608000 },
      { month: 'FEB', actual: null,   projected: 672000 },
      { month: 'MAR', actual: null,   projected: 722000 },
      { month: 'APR', actual: null,   projected: 762000 },
      { month: 'MAY', actual: null,   projected: 808000 },
      { month: 'JUN', actual: null,   projected: 840000 },
    ],
  },
  {
    id: 'if-321-fp',
    name: 'CBD Footpath Renewal',
    code: 'IF-321-FP',
    manager: 'James Liu',
    team: 'Infrastructure',
    department: 'Infrastructure',
    status: 'watch',
    pinned: false,
    income: { budget: 50000, actuals: 42000, remaining: 8000 },
    wages: { budget: 160000, actuals: 178000, remaining: -18000 },
    plant: { budget: 180000, actuals: 162000, remaining: 18000 },
    other: { budget: 90000, actuals: 65000, remaining: 25000 },
    totalBudget: 480000,
    totalActuals: 315000,
    utilization: 65.6,
    committed: 428000,
    ytdActuals: { income: 42000, wages: 142000, plant: 102000, other: 29000 },
    transactions: [
      { id: 't1', date: '22 OCT 2024', description: 'Concrete Pour – Martin Place Block', amount: 34800 },
      { id: 't2', date: '15 OCT 2024', description: 'Traffic Control – Stage 3 Works', amount: 12600 },
    ],
    notes: 'Wages overrun attributable to extended traffic management requirements imposed by council resolution. Seeking approval for minor scope reduction in Stage 4.',
    wagesBreakdown: [
      {
        id: 'w1', name: 'Construction Crew', budget: 110000, actuals: 128000, remaining: -18000,
        subItems: [
          { id: 'w1a', name: 'Concrete Pour Crew', amount: 34800, date: '22 OCT 2024' },
          { id: 'w1b', name: 'Footpath Gangs (Q1–Q3)', amount: 93200, date: 'Q1–Q3 FY25' },
        ],
      },
      {
        id: 'w2', name: 'Traffic Control', budget: 50000, actuals: 50000, remaining: 0,
        subItems: [
          { id: 'w2a', name: 'Traffic Controllers – Stages 1–3', amount: 37600, date: 'Q1–Q3 FY25' },
          { id: 'w2b', name: 'Additional Control – Council Resolution', amount: 12600, date: '15 OCT 2024' },
        ],
      },
    ],
    incomeBreakdown: [
      {
        id: 'i1', name: 'State Active Travel Grant', budget: 50000, actuals: 42000, remaining: 8000,
        subItems: [
          { id: 'i1a', name: 'Q1 Grant Drawdown', amount: 42000, date: '30 AUG 2024' },
        ],
      },
    ],
    plantBreakdown: [
      {
        id: 'p1', name: 'Concrete & Surface Works', budget: 120000, actuals: 108000, remaining: 12000,
        subItems: [
          { id: 'p1a', name: 'Martin Place Concrete Pour', amount: 34800, date: '22 OCT 2024' },
          { id: 'p1b', name: 'Kerb & Channel Works', amount: 73200, date: 'Q1–Q3 FY25' },
        ],
      },
      {
        id: 'p2', name: 'Small Plant & Tools', budget: 60000, actuals: 54000, remaining: 6000,
        subItems: [
          { id: 'p2a', name: 'Compactor & Finishing Tools', amount: 32000, date: 'Q1–Q3 FY25' },
          { id: 'p2b', name: 'Saw Cutting Equipment', amount: 22000, date: 'Q2–Q3 FY25' },
        ],
      },
    ],
    otherBreakdown: [
      {
        id: 'o1', name: 'Materials', budget: 55000, actuals: 42000, remaining: 13000,
        subItems: [
          { id: 'o1a', name: 'Pavement Materials', amount: 26000, date: 'Q1–Q3 FY25' },
          { id: 'o1b', name: 'Line Marking & Tactiles', amount: 16000, date: 'Q2–Q3 FY25' },
        ],
      },
      {
        id: 'o2', name: 'Design & Documentation', budget: 20000, actuals: 18000, remaining: 2000,
        subItems: [
          { id: 'o2a', name: 'Engineering Design', amount: 18000, date: 'Q1 FY25' },
        ],
      },
      {
        id: 'o3', name: 'Contingency', budget: 15000, actuals: 5000, remaining: 10000,
        subItems: [
          { id: 'o3a', name: 'Miscellaneous', amount: 5000, date: 'Q1–Q3 FY25' },
        ],
      },
    ],
    trendData: [
      { month: 'JUL', actual: 62000,  projected: 58000 },
      { month: 'AUG', actual: 142000, projected: 118000 },
      { month: 'SEP', actual: 228000, projected: 182000 },
      { month: 'OCT', actual: 315000, projected: 248000 },
      { month: 'NOV', actual: null,   projected: 310000 },
      { month: 'DEC', actual: null,   projected: 372000 },
      { month: 'JAN', actual: null,   projected: 422000 },
      { month: 'FEB', actual: null,   projected: 460000 },
      { month: 'MAR', actual: null,   projected: 488000 },
      { month: 'APR', actual: null,   projected: 505000 },
      { month: 'MAY', actual: null,   projected: 514000 },
      { month: 'JUN', actual: null,   projected: 480000 },
    ],
  },
  {
    id: 'op-2201',
    name: 'Green Waste Collection',
    code: 'OP-2201',
    manager: 'Sarah Jenkins',
    team: 'Operations',
    department: 'Operations',
    status: 'on-track',
    pinned: false,
    income: { budget: 15000, actuals: 14000, remaining: 1000 },
    wages: { budget: 185000, actuals: 115000, remaining: 70000 },
    plant: { budget: 68000, actuals: 42000, remaining: 26000 },
    other: { budget: 27000, actuals: 18000, remaining: 9000 },
    totalBudget: 295000,
    totalActuals: 98000,
    utilization: 33.2,
    committed: 175000,
    ytdActuals: { income: 14000, wages: 62000, plant: 16000, other: 6000 },
    transactions: [
      { id: 't1', date: '24 OCT 2024', description: 'Green Waste Processing – Tip Fees Oct', amount: 8400 },
      { id: 't2', date: '11 OCT 2024', description: 'Collection Vehicle Servicing', amount: 3200 },
    ],
    notes: 'Service operating within budget. Seasonal green waste volumes slightly above forecast for spring period.',
    wagesBreakdown: [
      {
        id: 'w1', name: 'Collection Crew', budget: 140000, actuals: 88000, remaining: 52000,
        subItems: [
          { id: 'w1a', name: 'Crew A – Northern Zone', amount: 48000, date: 'Q1–Q3 FY25' },
          { id: 'w1b', name: 'Crew B – Southern Zone', amount: 40000, date: 'Q1–Q3 FY25' },
        ],
      },
      {
        id: 'w2', name: 'Supervisors', budget: 45000, actuals: 27000, remaining: 18000,
        subItems: [
          { id: 'w2a', name: 'Operations Supervisor', amount: 27000, date: 'Q1–Q3 FY25' },
        ],
      },
    ],
    incomeBreakdown: [
      {
        id: 'i1', name: 'Green Waste Processing Rebate', budget: 15000, actuals: 14000, remaining: 1000,
        subItems: [
          { id: 'i1a', name: 'Q1–Q2 Rebate Payment', amount: 14000, date: '30 SEP 2024' },
        ],
      },
    ],
    plantBreakdown: [
      {
        id: 'p1', name: 'Collection Vehicle Fleet', budget: 48000, actuals: 30000, remaining: 18000,
        subItems: [
          { id: 'p1a', name: 'Fuel – Chipper Trucks', amount: 18000, date: 'Q1–Q3 FY25' },
          { id: 'p1b', name: 'Fleet Servicing', amount: 12000, date: 'Q2 FY25' },
        ],
      },
      {
        id: 'p2', name: 'Processing Equipment', budget: 20000, actuals: 12000, remaining: 8000,
        subItems: [
          { id: 'p2a', name: 'Chipper Blade Replacement', amount: 8400, date: 'Q2 FY25' },
          { id: 'p2b', name: 'Equipment Maintenance', amount: 3600, date: 'Q1–Q3 FY25' },
        ],
      },
    ],
    otherBreakdown: [
      {
        id: 'o1', name: 'Tip Gate Fees', budget: 18000, actuals: 12000, remaining: 6000,
        subItems: [
          { id: 'o1a', name: 'Q1–Q3 Gate Fees', amount: 12000, date: 'Q1–Q3 FY25' },
        ],
      },
      {
        id: 'o2', name: 'Community Education', budget: 9000, actuals: 6000, remaining: 3000,
        subItems: [
          { id: 'o2a', name: 'Green Waste Campaign Materials', amount: 6000, date: 'Q2 FY25' },
        ],
      },
    ],
    trendData: [
      { month: 'JUL', actual: 22000, projected: 25000 },
      { month: 'AUG', actual: 47000, projected: 49000 },
      { month: 'SEP', actual: 74000, projected: 74000 },
      { month: 'OCT', actual: 98000, projected: 98000 },
      { month: 'NOV', actual: null,  projected: 123000 },
      { month: 'DEC', actual: null,  projected: 148000 },
      { month: 'JAN', actual: null,  projected: 172000 },
      { month: 'FEB', actual: null,  projected: 197000 },
      { month: 'MAR', actual: null,  projected: 221000 },
      { month: 'APR', actual: null,  projected: 246000 },
      { month: 'MAY', actual: null,  projected: 271000 },
      { month: 'JUN', actual: null,  projected: 295000 },
    ],
  },
  {
    id: 'cs-115',
    name: 'Youth Centre Upgrade',
    code: 'CS-115',
    manager: 'David Park',
    team: 'Community Services',
    department: 'Community Services',
    status: 'on-track',
    pinned: false,
    income: { budget: 80000, actuals: 80000, remaining: 0 },
    wages: { budget: 120000, actuals: 92000, remaining: 28000 },
    plant: { budget: 140000, actuals: 118000, remaining: 22000 },
    other: { budget: 40000, actuals: 22000, remaining: 18000 },
    totalBudget: 380000,
    totalActuals: 145000,
    utilization: 38.2,
    committed: 298000,
    ytdActuals: { income: 80000, wages: 28000, plant: 28000, other: 9000 },
    transactions: [
      { id: 't1', date: '21 OCT 2024', description: 'Gym Equipment Installation – Stage 1', amount: 18500 },
      { id: 't2', date: '09 OCT 2024', description: 'Building Works – Amenities Block', amount: 24300 },
    ],
    notes: 'Project tracking on schedule. Stage 2 fitout procurement underway. Community consultation completed.',
    wagesBreakdown: [
      {
        id: 'w1', name: 'Project Management', budget: 65000, actuals: 52000, remaining: 13000,
        subItems: [
          { id: 'w1a', name: 'Project Manager (0.5 FTE)', amount: 32000, date: 'Q1–Q3 FY25' },
          { id: 'w1b', name: 'Project Officer', amount: 20000, date: 'Q1–Q3 FY25' },
        ],
      },
      {
        id: 'w2', name: 'Construction Supervision', budget: 55000, actuals: 40000, remaining: 15000,
        subItems: [
          { id: 'w2a', name: 'Site Supervisor', amount: 24300, date: 'Q2–Q3 FY25' },
          { id: 'w2b', name: 'Building Inspector', amount: 15700, date: 'Q2–Q3 FY25' },
        ],
      },
    ],
    incomeBreakdown: [
      {
        id: 'i1', name: 'State Community Infrastructure Grant', budget: 80000, actuals: 80000, remaining: 0,
        subItems: [
          { id: 'i1a', name: 'Full Grant Payment', amount: 80000, date: '01 JUL 2024' },
        ],
      },
    ],
    plantBreakdown: [
      {
        id: 'p1', name: 'Gym & Fitness Equipment', budget: 80000, actuals: 72000, remaining: 8000,
        subItems: [
          { id: 'p1a', name: 'Stage 1 Equipment Package', amount: 18500, date: '21 OCT 2024' },
          { id: 'p1b', name: 'Cardio & Weights Equipment', amount: 53500, date: 'Q2–Q3 FY25' },
        ],
      },
      {
        id: 'p2', name: 'Building Works', budget: 60000, actuals: 46000, remaining: 14000,
        subItems: [
          { id: 'p2a', name: 'Amenities Block Renovation', amount: 24300, date: 'Q3 FY25' },
          { id: 'p2b', name: 'Flooring & Fit-out', amount: 21700, date: 'Q2–Q3 FY25' },
        ],
      },
    ],
    otherBreakdown: [
      {
        id: 'o1', name: 'Community Consultation', budget: 15000, actuals: 10000, remaining: 5000,
        subItems: [
          { id: 'o1a', name: 'Workshop Facilitation', amount: 6000, date: 'Q1 FY25' },
          { id: 'o1b', name: 'Engagement Materials', amount: 4000, date: 'Q2 FY25' },
        ],
      },
      {
        id: 'o2', name: 'Contingency Reserve', budget: 25000, actuals: 12000, remaining: 13000,
        subItems: [
          { id: 'o2a', name: 'Miscellaneous Variations', amount: 12000, date: 'Q1–Q3 FY25' },
        ],
      },
    ],
    trendData: [
      { month: 'JUL', actual: 28000,  projected: 32000 },
      { month: 'AUG', actual: 62000,  projected: 68000 },
      { month: 'SEP', actual: 108000, projected: 108000 },
      { month: 'OCT', actual: 145000, projected: 152000 },
      { month: 'NOV', actual: null,   projected: 198000 },
      { month: 'DEC', actual: null,   projected: 240000 },
      { month: 'JAN', actual: null,   projected: 272000 },
      { month: 'FEB', actual: null,   projected: 298000 },
      { month: 'MAR', actual: null,   projected: 318000 },
      { month: 'APR', actual: null,   projected: 335000 },
      { month: 'MAY', actual: null,   projected: 360000 },
      { month: 'JUN', actual: null,   projected: 380000 },
    ],
  },
  {
    id: 'ev-008-wa',
    name: 'Winter Arts Program 2025',
    code: 'EV-008-WA',
    manager: 'Maria Santos',
    team: 'Events & Culture',
    department: 'Events & Culture',
    status: 'on-track',
    pinned: false,
    income: { budget: 10000, actuals: 0, remaining: 10000 },
    wages: { budget: 18000, actuals: 1000, remaining: 17000 },
    plant: { budget: 12000, actuals: 0, remaining: 12000 },
    other: { budget: 45000, actuals: 2500, remaining: 42500 },
    totalBudget: 85000,
    totalActuals: 3500,
    utilization: 4.1,
    committed: 22000,
    ytdActuals: { income: 0, wages: 1000, plant: 0, other: 2500 },
    transactions: [
      { id: 't1', date: '20 OCT 2024', description: 'Program Design – Initial Briefing', amount: 2500 },
    ],
    notes: 'Program planning commenced. Artist expressions of interest to open November. Council approval of program schedule pending.',
    wagesBreakdown: [
      {
        id: 'w1', name: 'Program Coordination', budget: 18000, actuals: 1000, remaining: 17000,
        subItems: [
          { id: 'w1a', name: 'Program Manager – Planning Phase', amount: 1000, date: 'Q2 FY25' },
        ],
      },
    ],
    incomeBreakdown: [
      {
        id: 'i1', name: 'Sponsorship Income', budget: 10000, actuals: 0, remaining: 10000,
        subItems: [],
      },
    ],
    plantBreakdown: [
      {
        id: 'p1', name: 'Equipment Hire (Winter Program)', budget: 12000, actuals: 0, remaining: 12000,
        subItems: [],
      },
    ],
    otherBreakdown: [
      {
        id: 'o1', name: 'Artist Fees & Commissions', budget: 25000, actuals: 0, remaining: 25000,
        subItems: [],
      },
      {
        id: 'o2', name: 'Marketing & Promotions', budget: 12000, actuals: 2500, remaining: 9500,
        subItems: [
          { id: 'o2a', name: 'Initial Design Brief', amount: 2500, date: '20 OCT 2024' },
        ],
      },
      {
        id: 'o3', name: 'Venue & Infrastructure', budget: 8000, actuals: 0, remaining: 8000,
        subItems: [],
      },
    ],
    trendData: [
      { month: 'JUL', actual: 500,  projected: 7083 },
      { month: 'AUG', actual: 1000, projected: 14167 },
      { month: 'SEP', actual: 2000, projected: 21250 },
      { month: 'OCT', actual: 3500, projected: 28333 },
      { month: 'NOV', actual: null, projected: 35417 },
      { month: 'DEC', actual: null, projected: 42500 },
      { month: 'JAN', actual: null, projected: 49583 },
      { month: 'FEB', actual: null, projected: 56667 },
      { month: 'MAR', actual: null, projected: 63750 },
      { month: 'APR', actual: null, projected: 70833 },
      { month: 'MAY', actual: null, projected: 77917 },
      { month: 'JUN', actual: null, projected: 85000 },
    ],
  },
  {
    id: 'op-3302',
    name: 'Fleet Management & Workshop',
    code: 'OP-3302',
    manager: 'Sarah Jenkins',
    team: 'Operations',
    department: 'Operations',
    status: 'watch',
    pinned: false,
    income: { budget: 45000, actuals: 38000, remaining: 7000 },
    wages: { budget: 210000, actuals: 198000, remaining: 12000 },
    plant: { budget: 320000, actuals: 362000, remaining: -42000 },
    other: { budget: 45000, actuals: 28000, remaining: 17000 },
    totalBudget: 620000,
    totalActuals: 388000,
    utilization: 62.6,
    committed: 548000,
    ytdActuals: { income: 38000, wages: 128000, plant: 198000, other: 24000 },
    transactions: [
      { id: 't1', date: '24 OCT 2024', description: 'Compactor Truck Major Service – Fleet #7', amount: 14800 },
      { id: 't2', date: '18 OCT 2024', description: 'Tyre Replacement – 6 x Collection Vehicles', amount: 9600 },
      { id: 't3', date: '10 OCT 2024', description: 'Workshop Parts & Consumables', amount: 5200 },
    ],
    notes: 'Plant maintenance costs elevated due to ageing fleet. Two units approaching end-of-life requiring increased servicing frequency. Fleet replacement proposal submitted for FY26 capital works.',
    wagesBreakdown: [
      {
        id: 'w1', name: 'Workshop Mechanics', budget: 145000, actuals: 138000, remaining: 7000,
        subItems: [
          { id: 'w1a', name: 'Senior Mechanic', amount: 82000, date: 'Q1–Q3 FY25' },
          { id: 'w1b', name: 'Mechanic 2nd Class', amount: 56000, date: 'Q1–Q3 FY25' },
        ],
      },
      {
        id: 'w2', name: 'Fleet Administration', budget: 65000, actuals: 60000, remaining: 5000,
        subItems: [
          { id: 'w2a', name: 'Fleet Coordinator', amount: 38000, date: 'Q1–Q3 FY25' },
          { id: 'w2b', name: 'Admin Support (0.4 FTE)', amount: 22000, date: 'Q1–Q3 FY25' },
        ],
      },
    ],
    incomeBreakdown: [
      {
        id: 'i1', name: 'Internal Fleet Hire Recovery', budget: 45000, actuals: 38000, remaining: 7000,
        subItems: [
          { id: 'i1a', name: 'Q1 Fleet Hire Recovery', amount: 20000, date: '31 AUG 2024' },
          { id: 'i1b', name: 'Q2 Fleet Hire Recovery', amount: 18000, date: '31 OCT 2024' },
        ],
      },
    ],
    plantBreakdown: [
      {
        id: 'p1', name: 'Major Servicing & Repairs', budget: 185000, actuals: 218000, remaining: -33000,
        subItems: [
          { id: 'p1a', name: 'Compactor Truck Major Service – Fleet #7', amount: 14800, date: '24 OCT 2024' },
          { id: 'p1b', name: 'Fleet Major Service Program', amount: 203200, date: 'Q1–Q3 FY25' },
        ],
      },
      {
        id: 'p2', name: 'Tyres & Consumables', budget: 75000, actuals: 82000, remaining: -7000,
        subItems: [
          { id: 'p2a', name: 'Tyre Replacement – 6 Vehicles', amount: 9600, date: '18 OCT 2024' },
          { id: 'p2b', name: 'Tyre Program Q1–Q3', amount: 58000, date: 'Q1–Q3 FY25' },
          { id: 'p2c', name: 'Workshop Consumables', amount: 14400, date: 'Q1–Q3 FY25' },
        ],
      },
      {
        id: 'p3', name: 'Fuel', budget: 60000, actuals: 62000, remaining: -2000,
        subItems: [
          { id: 'p3a', name: 'Fleet Fuel Q1–Q3', amount: 62000, date: 'Q1–Q3 FY25' },
        ],
      },
    ],
    otherBreakdown: [
      {
        id: 'o1', name: 'Parts & Materials', budget: 30000, actuals: 18000, remaining: 12000,
        subItems: [
          { id: 'o1a', name: 'Parts & Workshop Materials', amount: 5200, date: '10 OCT 2024' },
          { id: 'o1b', name: 'Parts Program Q1–Q3', amount: 12800, date: 'Q1–Q3 FY25' },
        ],
      },
      {
        id: 'o2', name: 'Administrative & Other', budget: 15000, actuals: 10000, remaining: 5000,
        subItems: [
          { id: 'o2a', name: 'Fleet Management System', amount: 6000, date: 'Q1 FY25' },
          { id: 'o2b', name: 'Miscellaneous Admin', amount: 4000, date: 'Q2–Q3 FY25' },
        ],
      },
    ],
    trendData: [
      { month: 'JUL', actual: 72000,  projected: 52000 },
      { month: 'AUG', actual: 168000, projected: 103000 },
      { month: 'SEP', actual: 278000, projected: 155000 },
      { month: 'OCT', actual: 388000, projected: 207000 },
      { month: 'NOV', actual: null,   projected: 259000 },
      { month: 'DEC', actual: null,   projected: 310000 },
      { month: 'JAN', actual: null,   projected: 362000 },
      { month: 'FEB', actual: null,   projected: 414000 },
      { month: 'MAR', actual: null,   projected: 466000 },
      { month: 'APR', actual: null,   projected: 517000 },
      { month: 'MAY', actual: null,   projected: 569000 },
      { month: 'JUN', actual: null,   projected: 620000 },
    ],
  },
];

export const notifications: Notification[] = [
  {
    id: '#0982',
    timestamp: '2024-10-24 14:22:01',
    category: 'budget-update',
    description: 'Road Maintenance reallocation: Zone B to Zone C operational fund',
    valuation: 450000,
    status: 'committed',
    message: 'Reallocation approved following the Q3 infrastructure review. Zone B surplus transferred to Zone C operational reserve to address pavement renewal backlog identified in the October site inspection. Finance Manager approval on file.',
    metadata: { author: 'A. Morrison', reference: 'RA-2024-1022', status: 'COMMITTED' },
  },
  {
    id: '#0981',
    timestamp: '2024-10-24 11:05:44',
    category: 'system-alert',
    description: 'Budget limit exceeded – Waste Management North Zone',
    valuation: null,
    status: 'over-budget',
    message: 'Automated system alert: total actuals for OP-9482 have exceeded approved budget by 8.4%. Expenditure ceiling of $1,310,000 breached. Council Finance team notified. Supplementary budget request #SB-2024-019 submitted for councillor review.',
    metadata: { author: 'SYSTEM', reference: 'SYS-ALT-0981', status: 'OVER BUDGET' },
  },
  {
    id: '#0980',
    timestamp: '2024-10-24 09:11:20',
    category: 'team-edit',
    description: 'Draft approval submitted for FY25 Parks & Recreation supplementary allocation',
    valuation: null,
    status: 'pending',
    message: 'Draft budget adjustment submitted for council approval. Parks & Recreation (PK-112) supplementary allocation of $85,000 requested for Q4 playground equipment installation. Awaiting Director of Community Services sign-off before final submission.',
    metadata: { author: 'D. Park', reference: 'DR-PK-0980', status: 'PENDING' },
  },
  {
    id: '#0979',
    timestamp: '2024-10-23 16:45:00',
    category: 'budget-update',
    description: 'Emergency drainage repair – Main Street corridor',
    valuation: -12400,
    status: 'committed',
    message: 'Emergency repair authorised due to heavy storm damage. Funds reallocated from Infrastructure Reserve to cover immediate structural stabilisation. Full engineering report pending. Works completed 22 Oct 2024.',
    metadata: { author: 'S. Thompson', reference: 'ER-AA2-WR', status: 'COMMITTED' },
  },
  {
    id: '#0978',
    timestamp: '2024-10-23 14:12:30',
    category: 'budget-update',
    description: 'Quarterly grant injection – New Heritage Conservation Fund',
    valuation: 1250000,
    status: 'committed',
    message: 'State Heritage Conservation Fund Q2 payment received and posted to Heritage Precinct Renewal budget (HP-2204). Payment reference DAS-HCF-2410. Funds cleared 23 Oct 2024.',
    metadata: { author: 'Finance System', reference: 'GRN-HCF-Q2', status: 'COMMITTED' },
  },
  {
    id: '#0977',
    timestamp: '2024-10-23 10:00:15',
    category: 'team-edit',
    description: 'Updated user permissions for 4 departmental managers',
    valuation: null,
    status: 'system-sync',
    message: 'Access level changes applied to budget viewer accounts for A. Morrison, M. Santos, D. Park, and J. Liu. Permissions upgraded to Budget Editor for FY25 operational budgets following Director approval memo dated 21 Oct.',
    metadata: { author: 'IT Admin', reference: 'ACC-2024-1023', status: 'SYSTEM-SYNC' },
  },
  {
    id: '#0976',
    timestamp: '2024-10-22 17:55:12',
    category: 'system-alert',
    description: 'Library IT support overspend threshold reached',
    valuation: null,
    status: 'notified',
    message: 'Automated threshold alert: IT support expenditure within PL-3310 has reached 90% of allocated sub-budget ($44,200 of $49,000). System notification sent to R. Chen and Director of Community Services.',
    metadata: { author: 'SYSTEM', reference: 'THR-PL3310-IT', status: 'NOTIFIED' },
  },
  {
    id: '#0975',
    timestamp: '2024-10-22 13:00:00',
    category: 'budget-update',
    description: 'Annual solar farm revenue reconciliation',
    valuation: 89450,
    status: 'committed',
    message: 'FY25 solar farm revenue reconciliation completed. Net revenue of $89,450 posted to Environment & Sustainability fund (ES-3301). Reconciliation prepared by Finance Business Partner – Environment portfolio.',
    metadata: { author: 'Finance BP – Environment', reference: 'REC-SOL-FY25', status: 'COMMITTED' },
  },
  {
    id: '#0974',
    timestamp: '2024-10-22 08:43:10',
    category: 'budget-update',
    description: 'Community Centre roof repair – partial funding approved',
    valuation: -35000,
    status: 'committed',
    message: 'Partial funding of $35,000 approved from Building Asset Reserve for emergency roof repair at Riverside Community Centre. Full scope of works estimated at $78,000 – balance to be addressed in Q4 budget review.',
    metadata: { author: 'B. Walsh', reference: 'BLD-CCR-OCT24', status: 'COMMITTED' },
  },
  {
    id: '#0973',
    timestamp: '2024-10-21 15:20:01',
    category: 'team-edit',
    description: 'Archival of FY22 historical data completion',
    valuation: null,
    status: 'system-sync',
    message: 'FY22 budget records successfully archived to long-term storage. All data retained per council records management policy (Section 4.2). Archive reference: ARC-FY22-FULL. Active system data now reflects FY23–FY25 only.',
    metadata: { author: 'IT Admin', reference: 'ARC-FY22-FULL', status: 'SYSTEM-SYNC' },
  },
  {
    id: '#0972',
    timestamp: '2024-10-21 09:00:00',
    category: 'budget-update',
    description: 'Sarah Jenkins adjusted wages for Waste Management allocation',
    valuation: 14200,
    status: 'committed',
    message: 'Wage allocation adjustment approved for Q3 to account for additional casual staff hours required due to increased residential collection volumes in the Northern Zone. Adjustment reviewed and endorsed by Operations Director.',
    metadata: { author: 'S. Jenkins', reference: 'WA-OP9482-OCT', status: 'COMMITTED' },
  },
  {
    id: '#0971',
    timestamp: '2024-10-20 16:30:00',
    category: 'team-edit',
    description: 'Robert Chen approved the reallocation for Parks & Rec',
    valuation: null,
    status: 'pending',
    message: 'Reallocation of $22,000 from Parks Maintenance general contingency to the Playground Equipment Installation sub-budget approved at stage 1. Awaiting Finance Director counter-signature before posting.',
    metadata: { author: 'R. Chen', reference: 'RA-PK112-OCT', status: 'PENDING' },
  },
  {
    id: '#0970',
    timestamp: '2024-10-21 08:30:00',
    category: 'system-alert',
    description: 'Overtime threshold exceeded – Infrastructure Core Renewal',
    valuation: null,
    status: 'variance',
    message: 'Automated variance alert: overtime expenditure within IF-890 has reached 142% of the sub-budget allocation. Total overtime actuals: $62,400 against approved $44,000. Alert forwarded to J. Liu and Director of Infrastructure.',
    metadata: { author: 'SYSTEM', reference: 'VAR-IF890-OT', status: 'VARIANCE' },
  },
  {
    id: '#0969',
    timestamp: '2024-10-21 07:55:00',
    category: 'budget-update',
    description: 'Q2 road patching works – final contractor payment',
    valuation: -48200,
    status: 'committed',
    message: 'Final payment issued to Coastal Civil Pty Ltd for Q2 road patching program across Zones A and C. Works completed on schedule. Invoice reference CC-2024-0387. Retention withheld as per contract terms.',
    metadata: { author: 'A. Morrison', reference: 'PAY-RM-Q2-F', status: 'COMMITTED' },
  },
  {
    id: '#0968',
    timestamp: '2024-10-20 15:10:00',
    category: 'team-edit',
    description: 'Director endorsed Q2 expenditure variation report',
    valuation: null,
    status: 'committed',
    message: 'Director of Corporate Services has formally endorsed the Q2 Expenditure Variation Report as tabled at the 20 October finance committee meeting. Report reference EV-Q2-2024. Signed copies archived in document management system.',
    metadata: { author: 'Director Corporate', reference: 'EV-Q2-2024', status: 'COMMITTED' },
  },
  {
    id: '#0967',
    timestamp: '2024-10-19 11:40:00',
    category: 'budget-update',
    description: 'Federal Roads Infrastructure Grant – Q2 drawdown received',
    valuation: 380000,
    status: 'committed',
    message: 'Q2 grant drawdown of $380,000 received from the Federal Roads Infrastructure Program. Funds posted to IN-201-RM income account. Payment reference FED-RIP-Q2-2410. Acquittal reporting due by 30 November 2024.',
    metadata: { author: 'Finance System', reference: 'GRN-RIP-Q2', status: 'COMMITTED' },
  },
  {
    id: '#0966',
    timestamp: '2024-10-18 16:20:00',
    category: 'system-alert',
    description: 'Plant hire threshold reached – Parks & Recreation Upgrade',
    valuation: null,
    status: 'notified',
    message: 'Automated threshold alert: plant and equipment hire expenditure within PK-112 has reached 90% of the approved sub-budget ($85,200 of $95,000). Notification sent to D. Park and Director of Community Services.',
    metadata: { author: 'SYSTEM', reference: 'THR-PK112-PL', status: 'NOTIFIED' },
  },
  {
    id: '#0965',
    timestamp: '2024-10-18 09:05:00',
    category: 'budget-update',
    description: 'Emergency tree removal – storm damage, residential streets',
    valuation: -18400,
    status: 'committed',
    message: 'Emergency expenditure of $18,400 approved for urgent tree removal following storm event on 17–18 October. Works completed by Parks field crew with contractor assist. Costs allocated to Emergency Reserve. Insurance claim lodged reference INS-2024-1018.',
    metadata: { author: 'D. Park', reference: 'EMG-TREE-OCT', status: 'COMMITTED' },
  },
  {
    id: '#0964',
    timestamp: '2024-10-17 14:00:00',
    category: 'team-edit',
    description: 'Account code realignment – FY25 cost centre restructure',
    valuation: null,
    status: 'system-sync',
    message: 'Chart of accounts updated to reflect the approved FY25 cost centre restructure. 14 account codes migrated across 4 departments. Historical transaction mapping applied to maintain reporting continuity. Full change log available: ACC-RESTR-FY25.',
    metadata: { author: 'IT Admin', reference: 'ACC-RESTR-FY25', status: 'SYSTEM-SYNC' },
  },
  {
    id: '#0963',
    timestamp: '2024-10-16 10:30:00',
    category: 'budget-update',
    description: 'Community Grants Program – Cycle 2 disbursement completed',
    valuation: 45000,
    status: 'committed',
    message: 'Cycle 2 community grants disbursement of $45,000 issued across 8 recipient organisations. All grant agreements executed and uploaded to contract register. Reporting conditions briefed to recipients. Next acquittal due 31 March 2025.',
    metadata: { author: 'M. Santos', reference: 'GRN-CGP-CY2', status: 'COMMITTED' },
  },
  {
    id: '#0962',
    timestamp: '2024-10-15 13:45:00',
    category: 'system-alert',
    description: 'Anomalous fuel levy charge detected – Waste Management fleet',
    valuation: null,
    status: 'variance',
    message: 'Automated anomaly detection: a fuel levy charge of $11,400 posted to OP-9482 on 15 October does not match the approved fuel levy schedule. Transaction placed on hold pending verification by Operations Manager. Reference: ANO-FUEL-1015.',
    metadata: { author: 'SYSTEM', reference: 'ANO-FUEL-1015', status: 'VARIANCE' },
  },
  {
    id: '#0961',
    timestamp: '2024-10-15 09:20:00',
    category: 'budget-update',
    description: 'Rates arrears recovery – October collection cycle',
    valuation: 31650,
    status: 'committed',
    message: 'October rates arrears recovery completed. Net receipts of $31,650 posted to general revenue. Recovery rate for the cycle: 84.2%. Outstanding balance for instalment defaults referred to legal recovery. Finance BP notified.',
    metadata: { author: 'Finance System', reference: 'REC-RATES-OCT', status: 'COMMITTED' },
  },
  {
    id: '#0960',
    timestamp: '2024-10-14 11:55:00',
    category: 'team-edit',
    description: 'Maria Santos updated Summer Festival contract register',
    valuation: null,
    status: 'system-sync',
    message: 'Contract register for EV-005-SF updated by M. Santos. Three new vendor agreements added: audio-visual supplier, portable amenities hire, and public liability insurer. All documents executed and uploaded. Register version: v1.3.',
    metadata: { author: 'M. Santos', reference: 'CONT-SF-V13', status: 'SYSTEM-SYNC' },
  },
  {
    id: '#0959',
    timestamp: '2024-10-14 10:00:00',
    category: 'budget-update',
    description: 'Summer Festival 2024 – venue advance payment issued',
    valuation: -22000,
    status: 'committed',
    message: 'Advance payment of $22,000 issued to Riverside Park Events Trust for venue hire – Summer Festival 2024. Payment per contract clause 4.1 (50% advance, balance 14 days post-event). EFT cleared 14 Oct. Reference: PAY-EV005-ADV.',
    metadata: { author: 'M. Santos', reference: 'PAY-EV005-ADV', status: 'COMMITTED' },
  },
  {
    id: '#0958',
    timestamp: '2024-10-13 15:30:00',
    category: 'system-alert',
    description: 'IT hardware delivery cost overrun – Library Modernisation',
    valuation: null,
    status: 'notified',
    message: 'Supplier invoice received for IT hardware delivery (PL-3310) exceeds the approved purchase order by $8,200. Invoice placed on hold. R. Chen and Director of Community Services notified. Variation approval required before payment can proceed. Ref: VAR-PL3310-IT.',
    metadata: { author: 'SYSTEM', reference: 'VAR-PL3310-IT', status: 'NOTIFIED' },
  },
  {
    id: '#0957',
    timestamp: '2024-10-12 09:00:00',
    category: 'budget-update',
    description: 'Developer contribution received – Northern Precinct Stage 2',
    valuation: 125000,
    status: 'committed',
    message: 'Developer contribution of $125,000 received from Northgate Developments Pty Ltd per Planning Agreement PA-2023-0042. Funds posted to Developer Contributions Reserve. Stage 2 civil works commencement trigger satisfied. Finance and Planning teams notified.',
    metadata: { author: 'Finance System', reference: 'DEV-NP-S2-C', status: 'COMMITTED' },
  },
  {
    id: '#0956',
    timestamp: '2024-10-11 14:20:00',
    category: 'team-edit',
    description: 'James Liu approved Infrastructure Core Renewal variation #3',
    valuation: null,
    status: 'committed',
    message: 'Project Manager J. Liu has approved Contract Variation #3 for IF-890. Variation covers additional subsoil investigation works required following unexpected material discovery at the CBD precinct site. Value: $38,500. Procurement reference: VAR-IF890-03.',
    metadata: { author: 'J. Liu', reference: 'VAR-IF890-03', status: 'COMMITTED' },
  },
  {
    id: '#0955',
    timestamp: '2024-10-10 11:10:00',
    category: 'budget-update',
    description: 'Road Maintenance – extended grader hire contract approved',
    valuation: -34500,
    status: 'committed',
    message: 'Extended grader hire contract approved for an additional 3 weeks to complete Zone C road formation ahead of the wet season. Contractor: Regional Plant Hire Pty Ltd. Approved by Director of Infrastructure under emergency procurement provisions. Reference: PLT-RM-EXT.',
    metadata: { author: 'A. Morrison', reference: 'PLT-RM-EXT', status: 'COMMITTED' },
  },
  {
    id: '#0954',
    timestamp: '2024-10-09 16:00:00',
    category: 'system-alert',
    description: 'Unbudgeted plant expenditure detected – Waste Management',
    valuation: null,
    status: 'variance',
    message: 'Automated alert: a plant expenditure of $14,800 posted to OP-9482 on 9 October does not correspond to an approved purchase order. Transaction flagged for review. Operations Manager notified. Payment withheld pending clearance by Finance. Reference: UNB-OP9482-PL.',
    metadata: { author: 'SYSTEM', reference: 'UNB-OP9482-PL', status: 'VARIANCE' },
  },
  {
    id: '#0953',
    timestamp: '2024-10-08 10:45:00',
    category: 'budget-update',
    description: 'Environmental levy income – Q1 final reconciliation posted',
    valuation: 62800,
    status: 'committed',
    message: 'Q1 environmental levy income reconciliation completed. Final net receipts of $62,800 posted to the Environment & Sustainability Fund (ES-3301) after credit note adjustments. Reconciliation signed off by Finance Business Partner. Reference: REC-ENV-Q1.',
    metadata: { author: 'Finance BP – Environment', reference: 'REC-ENV-Q1', status: 'COMMITTED' },
  },
  {
    id: '#0952',
    timestamp: '2024-10-07 17:00:00',
    category: 'team-edit',
    description: 'Q1 accruals package submitted for Finance Director review',
    valuation: null,
    status: 'pending',
    message: 'End-of-Q1 accruals package submitted by Finance team for Director sign-off. Package includes $1.24M in accruals across 6 operational budgets. Review meeting scheduled 10 October. Submission reference: ACR-Q1-FY25.',
    metadata: { author: 'Finance Team', reference: 'ACR-Q1-FY25', status: 'PENDING' },
  },
  {
    id: '#0951',
    timestamp: '2024-10-04 13:30:00',
    category: 'budget-update',
    description: 'Public art commission – Riverside precinct progress payment',
    valuation: -42000,
    status: 'committed',
    message: 'Progress payment of $42,000 issued to Marlowe & Associates for the Riverside Precinct public art commission. Payment milestone: concept design approved by Arts Advisory Panel. Final installation scheduled March 2025. Reference: ART-RIV-PP1.',
    metadata: { author: 'M. Santos', reference: 'ART-RIV-PP1', status: 'COMMITTED' },
  },
  {
    id: '#0950',
    timestamp: '2024-10-03 09:30:00',
    category: 'system-alert',
    description: 'Budget threshold breach – Community Services portfolio',
    valuation: null,
    status: 'notified',
    message: 'Automated threshold alert: aggregate expenditure across Community Services budgets has reached 88% of the combined approved allocation. Director of Community Services and CFO notified. Q4 discretionary spend to be reviewed at the November committee. Reference: THR-CS-PORT.',
    metadata: { author: 'SYSTEM', reference: 'THR-CS-PORT', status: 'NOTIFIED' },
  },
  {
    id: '#0949',
    timestamp: '2024-10-02 11:00:00',
    category: 'team-edit',
    description: 'Alex Morrison updated Zone B–C reallocation memo',
    valuation: null,
    status: 'pending',
    message: 'A. Morrison has submitted a revised Zone B–C reallocation memo for Director approval. Memo updated to reflect revised Zone C pavement scope following the October site inspection. Awaiting Director of Infrastructure countersignature. Reference: MEMO-RM-BCZ.',
    metadata: { author: 'A. Morrison', reference: 'MEMO-RM-BCZ', status: 'PENDING' },
  },
  {
    id: '#0948',
    timestamp: '2024-10-01 14:00:00',
    category: 'budget-update',
    description: 'Council resolution: FY25 amended capital works budget adopted',
    valuation: 2150000,
    status: 'committed',
    message: 'Council has formally resolved to adopt the amended FY25 capital works budget at the 1 October Ordinary Meeting (Resolution 2024/148). Net increase of $2,150,000 approved, primarily for the accelerated CBD drainage upgrade and the Northern Precinct road formation works.',
    metadata: { author: 'Council Secretariat', reference: 'RES-2024-148', status: 'COMMITTED' },
  },
  {
    id: '#0947',
    timestamp: '2024-09-30 16:30:00',
    category: 'budget-update',
    description: 'Q1 close reconciliation – Infrastructure Core Renewal',
    valuation: -8750,
    status: 'committed',
    message: 'End-of-Q1 reconciliation for IF-890 completed. Net adjustment of ($8,750) applied to correct posting errors identified during the Q1 review. All adjustments reviewed and approved by Director of Infrastructure. Reconciliation reference: RECON-IF890-Q1.',
    metadata: { author: 'J. Liu', reference: 'RECON-IF890-Q1', status: 'COMMITTED' },
  },
];

export function formatK(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (abs >= 1000) return `$${Math.round(value / 1000)}k`;
  return `$${value}`;
}

export function formatCurrency(value: number): string {
  if (value < 0) return `(${Math.abs(value).toLocaleString('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 0 })})`;
  return value.toLocaleString('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 0 });
}
