import ModalButton from '@/components/button/ModalButton';
import ModalDimmed from '@/components/modal/ModalDimmed';

interface Props {
  content: string;
  isPending?: boolean;
  onClose?: () => void;
  onClick?: () => void;
}

const DefaultModal = ({ content, isPending, onClose, onClick }: Props) => {
  return (
    <ModalDimmed onClose={onClose}>
      <div
        className="w-[63%] aspect-[2/1] flex flex-col justify-evenly rounded-lg bg-white"
        onClick={e => e.stopPropagation()}>
        <span className="text-center text-md">{content}</span>
        <div className="flex justify-center gap-4">
          <ModalButton label={'예'} onClick={onClick} isPending={isPending} />
          <ModalButton label={'아니요'} onClick={onClose} />
        </div>
      </div>
    </ModalDimmed>
  );
};

export default DefaultModal;
