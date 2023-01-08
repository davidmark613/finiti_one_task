export const Button = ({ type, className, disabled, onClick, label }) => (
  <button
    type={type}
    className={className}
    disabled={disabled}
    onClick={onClick}
  >
    {label}
  </button>
);