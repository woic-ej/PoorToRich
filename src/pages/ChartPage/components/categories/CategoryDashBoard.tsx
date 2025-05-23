import RightArrowButton from '@/components/button/icon/RightArrowButton';
import { useHeaderDateStore } from '@/stores/useHeaderDateStore';
import { useReportTypeStore } from '@/stores/chart/useReportTypeStore';
import { useTransactionReportTypeStore } from '@/stores/chart/useTransactionReportTypeStore';
import { formatNumber } from '@/utils/number';
import { useNavigate } from 'react-router-dom';

const CategoryDashBoard = () => {
  const { chartHeaderDate } = useHeaderDateStore();
  const { currentTransactionType } = useTransactionReportTypeStore();
  const { currentReportType } = useReportTypeStore();
  const navigate = useNavigate();
  const categoryCharts = [
    {
      id: 1,
      color: '#4A90E2',
      name: '주거비',
      rate: 32.8,
      amount: 270000,
    },
    {
      id: 2,
      color: '#7ED321',
      name: '식비',
      rate: 29.2,
      amount: 220000,
    },
    {
      id: 3,
      color: '#33dfab',
      name: '쇼핑',
      rate: 15.0,
      amount: 100000,
    },
    {
      id: 4,
      color: '#FF6F61',
      name: '건강/의료',
      rate: 13.0,
      amount: 100000,
    },
    {
      id: 5,
      color: '#4A90E2',
      name: '가나다라마바사아자차',
      rate: 10.0,
      amount: 10048465000,
    },
  ];

  const handleClick = (
    categoryId: number,
    categoryName: string,
    transactionType: string,
    reportType: string,
    date: Date,
  ) => {
    navigate(`/chart/category-details/${categoryId}`, {
      state: {
        categoryName,
        transactionType,
        reportType,
        date,
      },
    });
  };

  return (
    <div className="flex flex-col pl-8 pr-5 pb-4">
      {categoryCharts.map(categoryItem => (
        <div
          className="flex justify-between gap-3.5 cursor-pointer py-3"
          key={categoryItem.id}
          onClick={() =>
            handleClick(categoryItem.id, categoryItem.name, currentTransactionType, currentReportType, chartHeaderDate)
          }>
          <div className="flex w-fit gap-4.5">
            <span style={{ color: categoryItem.color }}>{categoryItem.name}</span>
            <span>{categoryItem.rate}%</span>
          </div>
          <div className="flex max-w-2/5 w-fit gap-2.5">
            <span className="whitespace-nowrap truncate">{formatNumber(categoryItem.amount)}원</span>
            <div className="w-[2.4rem]">
              <RightArrowButton />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryDashBoard;
