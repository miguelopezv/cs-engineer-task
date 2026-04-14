import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

type SeatingDay = {
  timestamp: string;
  breakfast: number;
  lunch: number;
  earlyDinner: number;
  lateDinner: number;
};

interface Props {
  results: SeatingDay[];
}

export default function BarChart({ results }: Props) {
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
        label: 'Breakfast',
        data: results.map((d) => d.breakfast),
        backgroundColor: 'rgba(255, 99,  132, 0.75)',
      },
      {
        label: 'Lunch',
        data: results.map((d) => d.lunch),
        backgroundColor: 'rgba(255, 159,  64, 0.75)',
      },
      {
        label: 'Early Dinner',
        data: results.map((d) => d.earlyDinner),
        backgroundColor: 'rgba( 75, 192, 192, 0.75)',
      },
      {
        label: 'Late Dinner',
        data: results.map((d) => d.lateDinner),
        backgroundColor: 'rgba( 54, 162, 235, 0.75)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Customers by Seating per Day' },
    },
    scales: {
      y: { stacked: true },
    },
  };

  return <Bar data={data} options={options} />;
}
