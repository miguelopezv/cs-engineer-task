import './App.css';
import { BarChart, BubbleChart, LineChart, PieChart } from './components';

import customersBySeating from './data/AvgCustomersBySeating.json';
import customersBySeatingPerDay from './data/CustomersBySeatingPerDay.json';
import ordersByStationPerDay from './data/OrdersByStationPerDay.json';
import ordersPerDay from './data/OrdersPerDay.json';

function App() {
  return (
    <div className="dashboard">
      <h1>Restaurant Dashboard</h1>
      <div className="chart-grid">
        <div className="chart-cell">
          <BarChart results={customersBySeatingPerDay} />
        </div>
        <div className="chart-cell">
          <LineChart results={ordersPerDay} />
        </div>
        <div className="chart-cell">
          <BubbleChart results={ordersByStationPerDay} />
        </div>
        <div className="chart-cell">
          <PieChart results={customersBySeating} />
        </div>
      </div>
    </div>
  );
}

export default App;
