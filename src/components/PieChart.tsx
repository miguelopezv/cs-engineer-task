import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

type SeatingEntry = {
  seating: string;
  customers: number;
};

interface Props {
  results: SeatingEntry[];
}

export default function PieChart({ results }: Props) {
  const data = {
    labels: results.map((d) => d.seating),
    datasets: [
      {
        data: results.map((d) => d.customers),
        backgroundColor: [
          'rgba(255,  99, 132, 0.75)',
          'rgba(255, 159,  64, 0.75)',
          'rgba( 75, 192, 192, 0.75)',
          'rgba(153, 102, 255, 0.75)',
        ],
        borderColor: [
          'rgba(255,  99, 132, 1)',
          'rgba(255, 159,  64, 1)',
          'rgba( 75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Customers by Seating' },
    },
  };

  return <Pie data={data} options={options} />;
}
