import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { VersionWithPercentage } from "./types";

interface PopularityChartProps {
  versions: VersionWithPercentage[];
}

// Modern indigo/violet palette with complementary colors
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

const PopularityChart: React.FC<PopularityChartProps> = ({ versions }) => {
  const data = useMemo(() => {
    // Sort by downloads descending
    const sorted = [...versions].sort((a, b) => b.downloads - a.downloads);

    if (sorted.length <= 9) {
      return sorted.map((v) => ({
        name: v.version,
        value: v.downloads,
        percentage: v.percentage,
      }));
    }

    const top9 = sorted.slice(0, 9);
    const others = sorted.slice(9);

    const othersDownloads = others.reduce((sum, v) => sum + v.downloads, 0);
    const othersPercentage = others.reduce((sum, v) => sum + v.percentage, 0);

    return [
      ...top9.map((v) => ({
        name: v.version,
        value: v.downloads,
        percentage: v.percentage,
      })),
      {
        name: "Others",
        value: othersDownloads,
        percentage: parseFloat(othersPercentage.toFixed(2)),
      },
    ];
  }, [versions]);

  return (
    <div className="w-full h-full min-h-[300px] flex flex-col">
      <h3 className="text-sm font-medium text-[var(--color-text-muted)] mb-4 text-center flex-none">
        Version Distribution
      </h3>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
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
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PopularityChart;
