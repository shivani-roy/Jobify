import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const AreaChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <AreaChart
        data={data}
        margin={{ top: 50 }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />

        <Tooltip wrapperStyle={{ width: 100, color: "#1f1d1d" }} />

        <Area
          type="monotone"
          dataKey="count"
          stroke="#2cb1bc"
          fill="#bef8fd"
          color="red"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
