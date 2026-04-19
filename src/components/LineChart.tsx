import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { formatDateUtc } from '../utils/dateFormatter';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
  const labels = results.map((d) => formatDateUtc(d.timestamp));

  const data = {
    labels,
    datasets: [
      {
        label: 'Orders',
        data: results.map((d) => d.orders),
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
