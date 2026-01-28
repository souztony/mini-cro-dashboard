import { useMemo, useState } from "react";
import { mockData } from "../data/mock";
import type { PageKey } from "../data/mock";
import { MetricCard } from "../components/MetricCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function calcConversion(leads: number, views: number) {
  if (views === 0) return 0;
  return (leads / views) * 100;
}

export default function MiniCRODashboard() {
  const [page, setPage] = useState<PageKey>("lp-curso");

  const filtered = useMemo(() => {
    return mockData.filter((d) => d.page === page);
  }, [page]);

  const totals = useMemo(() => {
    const views = filtered.reduce((s, i) => s + i.pageviews, 0);
    const leads = filtered.reduce((s, i) => s + i.leads, 0);
    return {
      views,
      leads,
      conversion: calcConversion(leads, views),
    };
  }, [filtered]);

  const chartData = filtered.map((d) => ({
    date: d.date.slice(5),
    pageviews: d.pageviews,
    leads: d.leads,
  }));

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">📊 Mini CRO Dashboard</h1>

        <select
          className="border rounded px-3 py-2"
          value={page}
          onChange={(e) => setPage(e.target.value as PageKey)}
        >
          <option value="lp-curso">LP Curso</option>
          <option value="lp-seguranca">LP Segurança</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Pageviews" value={totals.views} />
        <MetricCard title="Leads" value={totals.leads} />
        <MetricCard
          title="Conversão"
          value={totals.conversion.toFixed(2) + "%"}
        />
      </div>

      <div className="bg-white p-4 rounded-xl shadow h-[300px]">
        <div className="font-medium mb-2">Tendência</div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="pageviews" strokeWidth={2} />
            <Line type="monotone" dataKey="leads" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <div className="font-medium mb-2">Detalhe por dia</div>
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500">
            <tr>
              <th>Data</th>
              <th>Views</th>
              <th>Leads</th>
              <th>Conversão</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((d) => (
              <tr key={d.date} className="border-t">
                <td>{d.date}</td>
                <td>{d.pageviews}</td>
                <td>{d.leads}</td>
                <td>
                  {calcConversion(d.leads, d.pageviews).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
