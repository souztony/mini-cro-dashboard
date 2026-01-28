export type PageKey = "lp-curso" | "lp-seguranca";

export type MetricRow = {
  date: string;
  page: PageKey;
  pageviews: number;
  leads: number;
};

export const mockData: MetricRow[] = [
  { date: "2026-01-01", page: "lp-curso", pageviews: 120, leads: 12 },
  { date: "2026-01-02", page: "lp-curso", pageviews: 140, leads: 16 },
  { date: "2026-01-03", page: "lp-curso", pageviews: 110, leads: 9 },
  { date: "2026-01-04", page: "lp-curso", pageviews: 180, leads: 27 },
  { date: "2026-01-05", page: "lp-curso", pageviews: 200, leads: 30 },

  { date: "2026-01-01", page: "lp-seguranca", pageviews: 90, leads: 6 },
  { date: "2026-01-02", page: "lp-seguranca", pageviews: 100, leads: 7 },
  { date: "2026-01-03", page: "lp-seguranca", pageviews: 130, leads: 15 },
  { date: "2026-01-04", page: "lp-seguranca", pageviews: 150, leads: 21 },
  { date: "2026-01-05", page: "lp-seguranca", pageviews: 170, leads: 20 },
];
