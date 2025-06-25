'use client';

import Metrics from './components/Metrics';
import MonthlySalesChart from './components/MonthlySalesChart';
import MonthlyTarget from './components/MonthlyTarget';
import Statistic from './components/Statistic';

const DashboardView = () => {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <Metrics />
        <MonthlySalesChart />
      </div>
      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>
      <div className="col-span-12">
        <Statistic />
      </div>
    </div>
  );
};

export default DashboardView;
