import { clsx } from 'clsx';
import LoadingSpinner from '@/components/loading/LoadingSpinner';

interface Props {
  label: '카카오로 로그인' | '아이디로 로그인' | '로그인' | '회원가입';
  disabled?: boolean;
  type?: 'submit' | 'button' | 'reset';
  isPending?: boolean;
  onClick?: () => void;
}

const SignButton = ({ label, onClick, isPending, disabled, type = 'button' }: Props) => {
  return (
    <button
      className={clsx(
        'w-full h-[3.6rem] rounded-lg text-md cursor-pointer flex items-center justify-center',
        (label === '아이디로 로그인' || label === '로그인') &&
          (disabled ? 'bg-strokeGray text-defaultGrey' : 'bg-pastelLime text-oliveGreen'),
        label === '카카오로 로그인' && 'bg-[#FEE500] text-[#191919]',
        label === '회원가입' && 'bg-pinkRed text-sunsetRose',
      )}
      type={type}
      disabled={isPending}
      onClick={onClick}>
      {isPending ? <LoadingSpinner size={18} /> : label}
    </button>
  );
};

export default SignButton;
