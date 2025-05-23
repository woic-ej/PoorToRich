interface Props {
  onClick?: () => void;
}

const PlusButton = ({ onClick }: Props) => {
  return (
    <button className="w-full h-full flex items-center justify-center cursor-pointer" onClick={onClick}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 12C3 11.5858 3.33579 11.25 3.75 11.25H20.25C20.6642 11.25 21 11.5858 21 12C21 12.4142 20.6642 12.75 20.25 12.75H3.75C3.33579 12.75 3 12.4142 3 12Z"
          fill="black"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 3C12.4142 3 12.75 3.33579 12.75 3.75V20.25C12.75 20.6642 12.4142 21 12 21C11.5858 21 11.25 20.6642 11.25 20.25V3.75C11.25 3.33579 11.5858 3 12 3Z"
          fill="black"
        />
      </svg>
    </button>
  );
};

export default PlusButton;
