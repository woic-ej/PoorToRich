import TransactionDetailItem from '@/components/detailItem/TransactionDetailItem';
import useGetDailyDetails from '@/hooks/apis/transaction/useGetDailyDetails';
import { clsx } from 'clsx';
import { useCalenderDateStore } from '@/stores/useCalenderDateStore';
import { format } from 'date-fns';
import DailySummeryItem from '@/pages/MainPage/components/daily/DailySummeryItem';
import Skeleton from '@/components/loading/Skeleton';
import { ko } from 'date-fns/locale';
import useScrollToSelectedRef from '@/hooks/useScrollToSelectedRef';
import { handleFetchError } from '@/utils/error/handleFetchError';

const DailyTransactionList = () => {
  const { calenderDate } = useCalenderDateStore();
  const { data: dailyDetails, isPending, isError, error } = useGetDailyDetails(format(calenderDate, 'yyyy-MM-dd'));
  const isEmpty = dailyDetails?.dailyDetails.length === 0;
  const { selectedRef, targetItem } = useScrollToSelectedRef('id', dailyDetails?.dailyDetails);

  if (isPending) {
    return (
      <div className="w-full flex flex-col gap-2.5 border-t border-strokeGray p-5 pb-7">
        <div className="w-full flex justify-end">
          <Skeleton width="w-[15rem]" height="h-[2.4rem]" />
        </div>
        <Skeleton height="h-[3.5rem]" />
        <Skeleton height="h-[3.5rem]" />
        <div className="flex flex-col gap-1.5">
          <Skeleton width="w-[10rem]" height="h-[2.4rem]" />
          <Skeleton width="w-[10rem]" height="h-[2.4rem]" />
          <Skeleton width="w-[10rem]" height="h-[2.4rem]" />
        </div>
      </div>
    );
  }

  if (isError && error) {
    return handleFetchError(error);
  }

  return (
    <div
      className={clsx(
        isEmpty ? 'justify-center items-center grow' : 'max-h-[30rem] ',
        'flex flex-col w-full items-center min-h-[20rem] gap-5 border-t py-5 pb-7 border-strokeGray overflow-y-auto custom-scrollbar',
      )}>
      {isEmpty || !dailyDetails ? (
        <span className="text-defaultGrey">내역이 없습니다.</span>
      ) : (
        <>
          <div className="w-full flex flex-col gap-3.5">
            <p className="w-full text-right px-3 text-defaultGrey">
              {format(calenderDate, 'yyyy.MM.dd EEEE', { locale: ko })}
            </p>
            <div className="w-full flex flex-col items-center gap-2.5">
              {dailyDetails.dailyDetails.map(dailyDetail => (
                <TransactionDetailItem
                  key={dailyDetail.id}
                  selectedRef={selectedRef}
                  targetItem={targetItem}
                  {...dailyDetail}
                />
              ))}
            </div>
          </div>
          <div className="w-[95%] flex flex-col gap-1.5">
            <DailySummeryItem label="수입" amount={dailyDetails.totalIncome.toLocaleString()} />
            <DailySummeryItem label="지출" amount={dailyDetails.totalExpense.toLocaleString()} />
            <DailySummeryItem label="합계" amount={dailyDetails.totalAmount.toLocaleString()} />
          </div>
        </>
      )}
    </div>
  );
};

export default DailyTransactionList;
