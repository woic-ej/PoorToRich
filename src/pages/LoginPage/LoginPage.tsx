import SignButton from '@/pages/LoginPage/components/SignButton';
import Logo from '/image/Logo.png';
import FloatingLabelInput from '@/pages/LoginPage/components/FloatingLabelInput';
import useLoginForm from '@/hooks/login/useLoginForm';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const { errors, isValid, isPending, errorMessage, onSubmit, handleSubmit, registerWithResetError } = useLoginForm();

  return (
    <div className="flex flex-col h-screen items-center justify-center gap-36 bg-vanillaCream">
      <img src={Logo} alt="로고 이미지" className="w-[20rem] aspect-square" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-3/5 gap-10">
        <div className="flex flex-col w-full gap-7">
          <FloatingLabelInput
            label="아이디"
            type="text"
            maxLength={10}
            {...registerWithResetError('username')}
            errorMessage={errors.username?.message}
          />
          <FloatingLabelInput
            label="비밀번호"
            type="password"
            maxLength={15}
            {...registerWithResetError('password')}
            errorMessage={errors.password?.message}
          />
          <span className="text-sm text-sunsetRose">{errorMessage}</span>
        </div>
        <div className="flex flex-col w-full gap-5">
          <SignButton label="로그인" disabled={!isValid || Boolean(errorMessage)} isPending={isPending} type="submit" />
          <SignButton label="회원가입" onClick={() => navigate('/signup')} />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
