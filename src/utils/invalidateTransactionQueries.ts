import { QueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';

const invalidateTransactionQueries = (
  queryClient: QueryClient,
  date: Date,
  categoryId?: number,
  prevCategoryId?: number,
) => {
  const year = format(date, 'yyyy');
  const yearMonth = format(date, 'yyyy-MM');
  const yearMonthDay = format(date, 'yyyy-MM-dd');

  queryClient.invalidateQueries({
    queryKey: ['transaction'],
  });

  // 월별/일별 데이터 조회관련 쿼리키
  queryClient.invalidateQueries({
    queryKey: ['dailyDetails'],
  });
  queryClient.refetchQueries({
    queryKey: ['dailyDetails', yearMonthDay],
  });
  queryClient.invalidateQueries({
    queryKey: ['monthlyTotal'],
  });
  queryClient.refetchQueries({
    queryKey: ['monthlyTotal', yearMonth],
  });

  // 월별/주별 데이터 조회관련 쿼리키
  queryClient.invalidateQueries({
    queryKey: ['yearlySummary'],
  });
  queryClient.refetchQueries({
    queryKey: ['yearlySummary', year],
  });
  queryClient.invalidateQueries({
    queryKey: ['weeklySummary'],
  });
  queryClient.refetchQueries({
    queryKey: ['weeklyDetails'],
  });

  // 차트 데이터 조회관련 쿼리키
  queryClient.invalidateQueries({
    queryKey: ['barChart'],
  });
  queryClient.invalidateQueries({
    queryKey: ['stackedBarChart'],
  });
  queryClient.invalidateQueries({
    queryKey: ['totalAndSavings'],
  });
  queryClient.refetchQueries({
    queryKey: ['categoryLogs', categoryId],
  });

  if (prevCategoryId)
    queryClient.refetchQueries({
      queryKey: ['categoryLogs', prevCategoryId],
    });
};

export default invalidateTransactionQueries;
