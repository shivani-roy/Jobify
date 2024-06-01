import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const BarChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <BarChart
        data={data}
        margin={{ top: 50 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />

        <Tooltip wrapperStyle={{ width: 100, color: "#1f1d1d" }} />

        <Bar
          dataKey="count"
          fill="#2cb1bc"
          barSize={75}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
