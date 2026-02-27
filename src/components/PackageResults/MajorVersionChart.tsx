import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import semver from "semver";
import { VersionWithPercentage } from "./types";

interface MajorVersionChartProps {
  versions: VersionWithPercentage[];
}

const COLORS = [
  "#6366f1", // indigo-500
  "#8b5cf6", // violet-500
  "#a855f7", // purple-500
  "#ec4899", // pink-500
  "#f43f5e", // rose-500
  "#f97316", // orange-500
  "#eab308", // yellow-500
  "#22c55e", // green-500
  "#14b8a6", // teal-500
  "#06b6d4", // cyan-500
];

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: {
    payload: { name: string; value: number; percentage: number };
  }[];
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background border rounded p-2 shadow-sm text-sm">
        <p className="font-medium">{data.name}</p>
        <p>Downloads: {data.value.toLocaleString()}</p>
        <p>Share: {data.percentage}%</p>
      </div>
    );
  }
  return null;
};

const MajorVersionChart: React.FC<MajorVersionChartProps> = ({ versions }) => {
  const data = useMemo(() => {
    const majorMap = new Map<number, { downloads: number; percentage: number }>();

    for (const v of versions) {
      try {
        const major = semver.major(v.version);
        const existing = majorMap.get(major);
        if (existing) {
          existing.downloads += v.downloads;
          existing.percentage += v.percentage;
        } else {
          majorMap.set(major, {
            downloads: v.downloads,
            percentage: v.percentage,
          });
        }
      } catch {
        // skip versions that semver cannot parse
      }
    }

    const sorted = Array.from(majorMap.entries())
      .map(([major, { downloads, percentage }]) => ({
        name: `^${major}`,
        value: downloads,
        percentage: parseFloat(percentage.toFixed(2)),
      }))
      .sort((a, b) => b.value - a.value);

    if (sorted.length <= 9) {
      return sorted;
    }

    const top9 = sorted.slice(0, 9);
    const others = sorted.slice(9);

    const othersDownloads = others.reduce((sum, v) => sum + v.value, 0);
    const othersPercentage = others.reduce((sum, v) => sum + v.percentage, 0);

    return [
      ...top9,
      {
        name: "Others",
        value: othersDownloads,
        percentage: parseFloat(othersPercentage.toFixed(2)),
      },
    ];
  }, [versions]);

  return (
    <div className="w-full flex flex-col gap-3">
      <h3 className="text-sm font-medium text-[var(--color-text-muted)] text-center">
        Major Version Distribution
      </h3>
      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1.5 justify-center">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
            <span
              className="w-2.5 h-2.5 rounded-sm flex-none"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span>{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MajorVersionChart;
