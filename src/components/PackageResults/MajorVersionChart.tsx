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
  "#173fb7",
  "#ff7a43",
  "#176145",
  "#3974ff",
  "#ff8b59",
  "#2a9a70",
  "#7298ff",
  "#f4662a",
  "#53617a",
  "#bbc3d1",
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
      <div className="chart-tooltip p-3 text-sm">
        <p className="mb-2 font-semibold">{data.name}</p>
        <p className="mb-1 text-[var(--color-text-secondary)]">
          Downloads: {data.value.toLocaleString()}
        </p>
        <p className="mb-0 text-[var(--color-text-secondary)]">
          Share: {data.percentage}%
        </p>
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
    <div className="flex w-full flex-col gap-3">
      <div>
        <span className="font-code text-[0.7rem] uppercase tracking-[0.08em] text-[var(--color-text-tertiary)]">
          By major line
        </span>
        <h3 className="mt-1 mb-0 text-lg font-semibold">Major distribution</h3>
      </div>
      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={90}
              dataKey="value"
              stroke="var(--color-bg-surface)"
              strokeWidth={2}
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
      <div className="flex flex-wrap gap-x-3 gap-y-1.5">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-1.5 font-code text-[0.68rem] text-[var(--color-text-secondary)]">
            <span
              className="h-2.5 w-2.5 flex-none rounded-sm"
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
