import { FC, ReactNode } from 'react';

interface IconButtonProp {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}

export const IconButton: FC<IconButtonProp> = (props) => {
  const { children, onClick, className } = props;

  const defaultStyle = `
    w-9
    h-9
    flex
    items-center
    justify-center
    rounded-lg
    hover:bg-gray-500
    transition-all
    active:scale-95
  `;

  return (
    <button onClick={onClick} className={`${className} ${defaultStyle}`}>
      {children}
    </button>
  );
};
