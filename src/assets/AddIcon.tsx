import React from 'react';

const AddIcon = ({ onClick, className }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      onClick={onClick}
      className={className}
    >
      <path
        d="M10 2C14.411 2 18 5.589 18 10C18 14.411 14.411 18 10 18C5.589 18 2 14.411 2 10C2 5.589 5.589 2 10 2ZM10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0ZM15 9H11V5H9V9H5V11H9V15H11V11H15V9Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default AddIcon;
