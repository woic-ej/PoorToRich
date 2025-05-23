import TransactionTypeButton from '@/components/button/TransactionTypeButton';
import DateControlHeader from '@/components/header/DateControlHeader';
import StackedBarChart from '@/pages/ChartPage/components/categories/StackedBarChart';
import CategoryDashBoard from '@/pages/ChartPage/components/categories/CategoryDashBoard';
import PeriodComparisonChart from '@/pages/ChartPage/components/period/PeriodComparisonChart';
import Divider from '@/components/Divider';
import TapBar from '@/components/tapbar/TapBar';
import ReportTypeSelection from '@/pages/ChartPage/components/ReportTypeSelection';
import ReportSummary from '@/pages/ChartPage/components/summary/ReportSummary';
import { useHeaderDateStore } from '@/stores/useHeaderDateStore';

const ChartPage = () => {
  const { chartHeaderDate, setChartHeaderDate } = useHeaderDateStore();
  return (
    <div className="flex flex-col w-full min-h-screen">
      <DateControlHeader headerDate={chartHeaderDate} setHeaderDate={setChartHeaderDate} />
      <div className="grow">
        <div className="w-full flex justify-between items-center p-5">
          <ReportTypeSelection />
          <TransactionTypeButton />
        </div>
        <ReportSummary />
        <StackedBarChart />
        <CategoryDashBoard />
        <Divider />
        <PeriodComparisonChart />
      </div>
      <TapBar page="chart" />
    </div>
  );
};

export default ChartPage;
