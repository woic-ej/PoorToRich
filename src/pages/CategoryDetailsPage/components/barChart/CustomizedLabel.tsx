import { formatNumber } from '@/utils/number';

interface Props {
  x?: number | string;
  y?: number | string;
  width?: number | string;
  value?: number | string;
}

const CustomizedLabel = (props: Props) => {
  const { x, y, width, value = 0 } = props;
  const numericX = Number(x);
  const numericY = Number(y);
  const numericWidth = Number(width);
  const radius = 10;

  const maxLength = 8;
  const truncatedValue = String(value).length > maxLength ? String(value).substring(0, maxLength) + '...' : value;

  return (
    <g>
      <text
        x={numericX + numericWidth / 2}
        y={numericY - radius}
        fill="#00000"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={10}>
        {formatNumber(truncatedValue)}
      </text>
    </g>
  );
};

export default CustomizedLabel;
