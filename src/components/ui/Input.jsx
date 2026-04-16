import PropTypes from 'prop-types';

/**
 * Reusable input component with consistent styling
 */
const Input = ({
  value,
  onChange,
  placeholder,
  name,
  type = 'text',
  className = '',
  inputRef,
  rightElement,
  ...props
}) => {
  const baseStyles = `
    w-full py-2 px-4 
    rounded-full border border-green-600 
    focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
    transition-all duration-200
    placeholder:text-gray-400
  `;

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${baseStyles} ${rightElement ? 'pr-14' : ''} ${className}`}
        {...props}
      />
      {rightElement && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          {rightElement}
        </div>
      )}
    </div>
  );
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  inputRef: PropTypes.object,
  rightElement: PropTypes.node,
};

export default Input;
