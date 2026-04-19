import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { formatDateUtc } from '../utils/dateFormatter';

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

type SeatingOption = 'breakfast' | 'lunch' | 'firstDinner' | 'secondDinner';
type SelectedSeating = SeatingOption | typeof ALL_SEATINGS_OPTION;
const ALL_SEATINGS_OPTION = 'all' as const;

const seatingConfig: Record<
  SeatingOption,
  { label: string; color: string; value: (day: SeatingDay) => number }
> = {
  breakfast: {
    label: 'Breakfast',
    color: 'rgba(255, 99, 132, 0.75)',
    value: (day) => day.breakfast,
  },
  lunch: {
    label: 'Lunch',
    color: 'rgba(255, 159, 64, 0.75)',
    value: (day) => day.lunch,
  },
  firstDinner: {
    label: 'First Dinner',
    color: 'rgba(75, 192, 192, 0.75)',
    value: (day) => day.earlyDinner,
  },
  secondDinner: {
    label: 'Second Dinner',
    color: 'rgba(54, 162, 235, 0.75)',
    value: (day) => day.lateDinner,
  },
};

export default function BarChart({ results }: Props) {
  const [selectedSeating, setSelectedSeating] =
    useState<SelectedSeating>(ALL_SEATINGS_OPTION);

  const seatingOptions = useMemo(() => {
    return Object.keys(seatingConfig) as SeatingOption[];
  }, []);

  const labels = useMemo(
    () => results.map((d) => formatDateUtc(d.timestamp)),
    [results],
  );

  const datasets = useMemo(() => {
    return seatingOptions.map((option) => {
      const config = seatingConfig[option];

      return {
        label: config.label,
        data: results.map((day) => config.value(day)),
        backgroundColor: config.color,
      };
    });
  }, [results, seatingOptions]);

  const isAllSeatings = selectedSeating === ALL_SEATINGS_OPTION;

  const visibleDatasets = useMemo(
    () =>
      isAllSeatings
        ? datasets
        : datasets.filter(
            (dataset) => dataset.label === seatingConfig[selectedSeating].label,
          ),
    [datasets, isAllSeatings, selectedSeating],
  );

  const data = {
    labels,
    datasets: visibleDatasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: isAllSeatings, position: 'top' as const },
      title: { display: true, text: 'Customers by Seating per Day' },
    },
    scales: {
      y: { stacked: isAllSeatings },
    },
  };

  return (
    <>
      <label htmlFor="seating-select">Seatings: </label>
      <select
        id="seating-select"
        value={selectedSeating}
        onChange={(event) =>
          setSelectedSeating(event.target.value as SelectedSeating)
        }
      >
        <option value={ALL_SEATINGS_OPTION}>All Seatings</option>
        {seatingOptions.map((option) => (
          <option key={option} value={option}>
            {seatingConfig[option].label}
          </option>
        ))}
      </select>
      <div className="bar-chart-wrapper">
        <Bar data={data} options={options} />
      </div>
    </>
  );
}
