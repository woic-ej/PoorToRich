import SelectBox from '@/components/input/SelectBox';
import { useReportTypeStore } from '@/stores/chart/useReportTypeStore';
import { ReportType } from '@/types/reportTypes';

const ReportTypeSelection = () => {
  const { currentReportType, setCurrentReportType } = useReportTypeStore();

  const options = [
    { label: '월별', value: '월별' },
    { label: '연별', value: '연별' },
  ];

  const handleReportSelectClick = (reportType: ReportType) => {
    setCurrentReportType(reportType);
  };

  return (
    <div className="w-[10rem]">
      <SelectBox
        options={options}
        value={currentReportType}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleReportSelectClick(e.target.value as ReportType)}
      />
    </div>
  );
};

export default ReportTypeSelection;
