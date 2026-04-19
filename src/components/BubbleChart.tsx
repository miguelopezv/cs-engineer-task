import {
  Chart as ChartJS,
  Legend,
  LinearScale,
  PointElement,
  Tooltip,
  type TooltipItem,
} from 'chart.js';
import { Bubble } from 'react-chartjs-2';
import { formatDateUtc } from '../utils/dateFormatter';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

type StationDay = {
  timestamp: string;
  grill: number;
  salad: number;
  pasta: number;
  pastry: number;
};

interface Props {
  results: StationDay[];
}

// Default 3, can be increased for better visibility of small bubbles
const pctToRadius = (pct: number) =>
  Number.isFinite(pct) ? Math.max(3, pct * 0.35) : 3;

export default function BubbleChart({ results }: Props) {
  const dailyPcts = results.map((d) => {
    const total = d.grill + d.salad + d.pasta + d.pastry;

    if (total <= 0) {
      return {
        ts: new Date(d.timestamp).getTime(),
        grill: 0,
        salad: 0,
        pasta: 0,
        pastry: 0,
      };
    }

    return {
      ts: new Date(d.timestamp).getTime(),
      grill: (d.grill / total) * 100,
      salad: (d.salad / total) * 100,
      pasta: (d.pasta / total) * 100,
      pastry: (d.pastry / total) * 100,
    };
  });

  const data = {
    datasets: [
      {
        label: 'Grill',
        data: results.map((d, i) => ({
          x: new Date(d.timestamp).getTime(),
          y: d.grill,
          r: pctToRadius(dailyPcts[i].grill),
        })),
        backgroundColor: 'rgba(255,  99, 132, 0.6)',
      },
      {
        label: 'Salad',
        data: results.map((d, i) => ({
          x: new Date(d.timestamp).getTime(),
          y: d.salad,
          r: pctToRadius(dailyPcts[i].salad),
        })),
        backgroundColor: 'rgba( 75, 192, 192, 0.6)',
      },
      {
        label: 'Pasta',
        data: results.map((d, i) => ({
          x: new Date(d.timestamp).getTime(),
          y: d.pasta,
          r: pctToRadius(dailyPcts[i].pasta),
        })),
        backgroundColor: 'rgba(255, 159,  64, 0.6)',
      },
      {
        label: 'Pastry',
        data: results.map((d, i) => ({
          x: new Date(d.timestamp).getTime(),
          y: d.pastry,
          r: pctToRadius(dailyPcts[i].pastry),
        })),
        backgroundColor: 'rgba( 54, 162, 235, 0.6)',
      },
    ],
  };

  const timestamps = results.map((d) => new Date(d.timestamp).getTime());
  const xScaleBounds =
    timestamps.length > 0
      ? {
          min: Math.min(...timestamps),
          max: Math.max(...timestamps),
        }
      : {};

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Orders by Station per Day' },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<'bubble'>) => {
            const raw = ctx.raw as { x: number; y: number; r: number };
            const date = formatDateUtc(raw.x);
            const label = ctx.dataset.label ?? '';
            const station = label.toLowerCase() as keyof (typeof dailyPcts)[0];
            const pct = dailyPcts[ctx.dataIndex][station] as number;
            return `${label}: ${raw.y} orders · ${pct.toFixed(1)}% of daily total (${date})`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'linear' as const,
        ...xScaleBounds,
        title: { display: true, text: 'Date' },
        ticks: {
          callback: (value: number | string) => formatDateUtc(Number(value)),
          maxTicksLimit: 10,
        },
      },
      y: { title: { display: true, text: 'Orders' }, beginAtZero: true },
    },
  };

  return <Bubble data={data} options={options} />;
}
