import { updateIncomeTransaction, updateExpenseTransaction } from '@/api/services/transactionService';
import { IncomeExpenseButtonType, TransactionFormDataType } from '@/types/transactionTypes';
import CustomError from '@/utils/CustomError';
import { useMutation } from '@tanstack/react-query';
import { UseFormSetError } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const useUpdateTransaction = ({
  type,
  setError,
}: {
  type: IncomeExpenseButtonType;
  setError: UseFormSetError<TransactionFormDataType>;
}) => {
  const navigate = useNavigate();
  const mutationFn = type === '지출' ? updateExpenseTransaction : updateIncomeTransaction;

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: TransactionFormDataType }) => mutationFn(id, body),
    onSuccess: () => {
      navigate('/');
    },
    onError: (error: CustomError<{ field: keyof TransactionFormDataType }>) => {
      if (error.data)
        setError(error.data.field, {
          type: 'server',
          message: error.message,
        });
    },
  });
};

export default useUpdateTransaction;
