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

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#8dd1e1",
  "#a4de6c",
  "#d0ed57",
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
      <h3 className="text-lg font-semibold mb-4 text-center flex-none">
        Version Popularity
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
