import { useDraftStore } from '@/stores/useDreftStore';
import { TransactionFormDataType } from '@/types/transactionTypes';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

const useTransactionDraft = () => {
  const { watch, reset } = useFormContext<TransactionFormDataType>();
  const { shouldSave, enableSave } = useDraftStore();
  const formData = watch();
  const [searchParams] = useSearchParams();
  const queryDate = searchParams.get('date');

  useEffect(() => {
    const raw = sessionStorage.getItem('transaction-form-data');
    const parsed = raw ? JSON.parse(raw) : null;

    const sessionDate = parsed?.transactionDate;

    if (parsed) {
      if (!queryDate || sessionDate === queryDate) {
        reset(parsed);
      } else {
        sessionStorage.removeItem('transaction-form-data');
      }
    }
  }, [reset, queryDate]);

  useEffect(() => {
    if (!shouldSave) return;
    sessionStorage.setItem('transaction-form-data', JSON.stringify(formData));
  }, [formData, shouldSave]);

  useEffect(() => {
    return () => {
      enableSave();
    };
  }, []);
};

export default useTransactionDraft;
