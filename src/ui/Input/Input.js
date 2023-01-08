export const Input = ({
  value,
  htmlFor,
  label,
  id,
  name,
  className,
  containerClasses,
  placeholder,
  type,
  onChange,
  onKeyUp,
}) => (
  <div className={containerClasses}>
    {label && <label htmlFor={htmlFor}>{label}</label>}
    <input
      required
      type={type}
      value={value}
      id={id}
      name={name}
      className={className}
      placeholder={placeholder}
      onChange={onChange}
      onKeyUp={onKeyUp}
    />
  </div>
);
