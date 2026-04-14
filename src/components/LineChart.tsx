import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

type OrdersDay = {
  timestamp: string;
  orders: number;
};

interface Props {
  results: OrdersDay[];
}

export default function LineChart({ results }: Props) {
  const labels = results.map((d) =>
    new Date(d.timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
  );

  const data = {
    labels,
    datasets: [
      {
        label: 'Orders',
        data: results.map((d) => d.orders * -100),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        pointRadius: 4,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Orders per Day' },
    },
    scales: {
      y: { beginAtZero: false },
    },
  };

  return <Line data={data} options={options} />;
}
