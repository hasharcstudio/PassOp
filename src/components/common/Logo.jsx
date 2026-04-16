import PropTypes from 'prop-types';

/**
 * Logo component for consistent branding
 */
const Logo = ({ size = 'md', showIcon = false, className = '' }) => {
  const sizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  return (
    <div className={`font-bold ${sizes[size]} ${className}`}>
      {showIcon && (
        <img
          className={`inline-block mr-2 ${iconSizes[size]}`}
          src="/icons/PassOP Logo.png"
          alt="PassOP Logo"
        />
      )}
      <span className="text-green-600">&lt;</span>
      <span>Pass</span>
      <span className="text-green-600">OP/&gt;</span>
    </div>
  );
};

Logo.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  showIcon: PropTypes.bool,
  className: PropTypes.string,
};

export default Logo;
